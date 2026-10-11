/* Copyright Elysia © 2025. All rights reserved */

import { net } from "electron";
import { RequestHandler } from "express";
import Constants from "src/AppCore/Constants";

export const validateBotToken: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).send({ message: "Missing bot token" });
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
        res.locals.authenticatedBotId = user.id;
    } catch {
        res.status(502).send({ message: "Unable to validate bot token" });
        return;
    }
    next();
};
