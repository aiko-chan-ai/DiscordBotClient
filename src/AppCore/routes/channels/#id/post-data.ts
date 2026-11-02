/* Copyright Elysia © 2025. All rights reserved */

import { json, Router } from "express";
import { ForumPostError, getForumPosts } from "src/AppUtils/ForumPosts";
import { validateBotToken } from "src/AppUtils/ValidateBotToken";

const app = Router({ mergeParams: true });

app.post("/", validateBotToken, json({ limit: "32kb" }), async (req, res) => {
    const ids: unknown = req.body?.thread_ids;
    if (!Array.isArray(ids) || ids.length > 100 || ids.some(id => typeof id !== "string" || !/^[1-9]\d{16,19}$/.test(id))) {
        return res.status(400).send({ message: "Expected up to 100 thread IDs" });
    }
    try {
        return res.send({ threads: await getForumPosts([...new Set(ids)], req.headers.authorization!) });
    } catch (error) {
        if (error instanceof ForumPostError && error.retryAfter) res.setHeader("Retry-After", error.retryAfter);
        return res.status(error instanceof ForumPostError ? error.status : 502).send({ message: "Unable to fetch forum post previews" });
    }
});

export default app;
