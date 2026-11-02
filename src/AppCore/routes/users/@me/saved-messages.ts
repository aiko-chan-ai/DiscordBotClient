/* Copyright Elysia © 2025. All rights reserved */

import { Router } from "express";

const app = Router({ mergeParams: true });

app.all("/", (req, res) => {
    res.send({
        reminders: [],
        bookmark_ids: [],
        results: [],
    });
});

app.get("/bookmarks", (_req, res) => {
    res.send({ results: [], has_more: false });
});

export default app;
