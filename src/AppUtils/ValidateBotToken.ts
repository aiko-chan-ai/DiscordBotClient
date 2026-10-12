/* Copyright Elysia © 2025. All rights reserved */

import { createHash } from "node:crypto";

import { net } from "electron";
import { RequestHandler } from "express";
import Constants from "src/AppCore/Constants";

/**
 * The renderer syncs settings and frecency in bursts, so validating every
 * single request against Discord would add a round-trip to each write and
 * risk rate limits. Successful validations are therefore cached briefly,
 * keyed by the SHA-256 of the presented token. Failed validations are never
 * cached: forged or revoked tokens keep hitting the upstream check.
 */
// 60 seconds
const VALIDATION_CACHE_TTL_MS = 60 * 1000;
const VALIDATION_CACHE_MAX_SIZE = 64;

interface ValidationCacheEntry {
    botId: string;
    expiresAt: number;
}

const cacheMap = new Map<string, ValidationCacheEntry>();

/**
 * Evict expired entries from cache to prevent memory leaks
 */
function evictExpiredEntries () {
    const now = Date.now();
    for (const [key, entry] of cacheMap) {
        if (entry.expiresAt <= now) {
            cacheMap.delete(key);
        }
    }
}

export const validateBotToken: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).send({ message: "Missing bot token" });
        return;
    }
    const key = createHash("sha256").update(authorization).digest("base64url");
    const cached = cacheMap.get(key);
    if (cached && cached.expiresAt > Date.now()) {
        res.locals.authenticatedBotId = cached.botId;
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
        const user = await response.json() as { id?: unknown; bot?: unknown };
        if (!user || typeof user.id !== "string" || !/^\d+$/.test(user.id) || user.bot !== true) {
            res.status(403).send({ message: "Expected a valid bot account" });
            return;
        }
        // Evict expired entries periodically
        evictExpiredEntries();
        // Evict oldest if cache is full
        if (cacheMap.size >= VALIDATION_CACHE_MAX_SIZE) {
            const oldestKey = cacheMap.keys().next().value;
            if (oldestKey) cacheMap.delete(oldestKey);
        }
        cacheMap.set(key, { botId: user.id, expiresAt: Date.now() + VALIDATION_CACHE_TTL_MS });
        res.locals.authenticatedBotId = user.id;
    } catch {
        res.status(502).send({ message: "Unable to validate bot token" });
        return;
    }
    next();
};
