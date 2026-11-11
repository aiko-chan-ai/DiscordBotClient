/* Copyright Elysia © 2025. All rights reserved */

import { createHash, timingSafeEqual } from "crypto";
import { net } from "electron";
import { RequestHandler } from "express";
import Constants from "src/AppCore/Constants";

import Util from "./Utils";

const TOKEN_CACHE_TTL_MS = 5 * 60 * 1000;
const tokenCache = new Map<string, { hash: Buffer; expiresAt: number }>();

function hashToken(token: string): Buffer {
    return createHash("sha256")
        .update(
            token
                .trim()
                .replace(/^Bot\s+/i, "")
                .trim(),
        )
        .digest();
}

// Call only after Discord has authenticated this token and returned its identity.
export function cacheValidatedBotToken(botId: string, token: string): void {
    if (typeof botId !== "string" || !/^\d+$/.test(botId)) return;
    tokenCache.delete(botId);
    if (tokenCache.size >= 100) tokenCache.delete(tokenCache.keys().next().value!);
    tokenCache.set(botId, { hash: hashToken(token), expiresAt: Date.now() + TOKEN_CACHE_TTL_MS });
}

export const validateBotToken: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).send({ message: "Missing bot token" });
        return;
    }
    // Decoding is only a cache lookup hint; the full credential must match.
    const cachedId = Util.getIDFromToken(authorization);
    const cached = cachedId && tokenCache.get(cachedId);
    if (cached && cached.expiresAt > Date.now() && timingSafeEqual(cached.hash, hashToken(authorization))) {
        res.locals.authenticatedBotId = cachedId;
        next();
        return;
    }
    try {
        const response = await net.fetch("https://canary.discord.com/api/v10/users/@me", {
            headers: { authorization, "user-agent": Constants.UserAgentDiscordBot },
            signal: AbortSignal.timeout(10000),
            redirect: "error",
        });
        if (!response.ok) {
            const retryAfter = response.headers.get("retry-after");
            if (response.status === 429 && retryAfter) res.setHeader("Retry-After", retryAfter);
            res.status(response.status).send({ message: "Bot token validation failed" });
            return;
        }
        const user = (await response.json()) as { id?: unknown; bot?: unknown };
        if (!user || typeof user.id !== "string" || !/^\d+$/.test(user.id) || user.bot !== true) {
            res.status(403).send({ message: "Expected a valid bot account" });
            return;
        }
        res.locals.authenticatedBotId = user.id;
        cacheValidatedBotToken(user.id, authorization);
    } catch {
        res.status(502).send({ message: "Unable to validate bot token" });
        return;
    }
    next();
};
