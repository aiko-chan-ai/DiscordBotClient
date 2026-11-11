/* Copyright Elysia © 2025. All rights reserved */

import {
    APIPublicThreadChannel,
    APIThreadMember,
    RESTGetAPIChannelThreadsArchivedPublicResult,
} from "discord-api-types/v10";
import { net } from "electron";
import { Request, Router } from "express";
import Constants from "src/AppCore/Constants";
import { ForumPostError, getForumPosts } from "src/AppUtils/ForumPosts";
import { validateBotToken } from "src/AppUtils/ValidateBotToken";

const app = Router({ mergeParams: true });

const CACHE_MAX_SIZE = 200;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

interface ThreadCacheEntry {
    timestamps: number[];
    createdAt: number;
}

const mapCache = new Map<string, ThreadCacheEntry>();

function getOrCreateCacheEntry(cacheKey: string): number[] {
    const existing = mapCache.get(cacheKey);
    if (existing && Date.now() - existing.createdAt < CACHE_TTL_MS) {
        return existing.timestamps;
    }
    // Evict expired entry or create new
    mapCache.delete(cacheKey);
    // Evict oldest entries if cache is full
    if (mapCache.size >= CACHE_MAX_SIZE) {
        const oldestKey = mapCache.keys().next().value;
        if (oldestKey) mapCache.delete(oldestKey);
    }
    const entry: ThreadCacheEntry = { timestamps: [], createdAt: Date.now() };
    mapCache.set(cacheKey, entry);
    return entry.timestamps;
}

app.all(
    "/",
    validateBotToken,
    async (
        req: Request<
            {
                id: string;
            },
            unknown,
            unknown,
            {
                archived?: "true" | "false";
                sort_by?: "last_message_time" | "archive_time" | "creation_time";
                sort_order?: "asc" | "desc";
                limit?: string;
                tag_setting?: "include" | "exclude" | "only";
                offset?: string;
                name?: string;
                tag?: string;
            }
        >,
        res,
    ) => {
        const channelId = req.params.id;
        const { archived, name, tag, limit, offset } = req.query;
        if (tag || name) {
            return res.send({
                threads: [],
                members: [],
                has_more: false,
                total_results: 0,
                first_messages: [],
            }); // Discord API limitation
        }
        let threads: APIPublicThreadChannel[] = [];
        let members: APIThreadMember[] = [];
        let public_has_more = false;
        const set = getOrCreateCacheEntry(`${res.locals.authenticatedBotId}:${channelId}`);
        const pageOffset = Math.max(parseInt(offset || "0", 10) || 0, 0);
        const pageLimit = Math.min(Math.max(parseInt(limit || "25", 10) || 25, 1), 100);
        const before = pageOffset > 0 ? set[pageOffset - 1] : undefined;
        if (pageOffset > 0 && before === undefined)
            return res.status(400).send({ message: "Load previous thread pages first" });
        try {
            if (archived === "true") {
                const response = await net.fetch(
                    `https://canary.discord.com/api/v9/channels/${channelId}/threads/archived/public?limit=${pageLimit}${
                        before ? `&before=${new Date(before).toISOString()}` : ""
                    }`,
                    {
                        signal: AbortSignal.timeout(10000),
                        redirect: "error",
                        headers: {
                            authorization: req.headers.authorization,
                            "user-agent": Constants.UserAgentDiscordBot,
                        } as Record<string, string>,
                    },
                );
                if (!response.ok) {
                    const retryAfter = response.headers.get("retry-after");
                    if (retryAfter) res.setHeader("Retry-After", retryAfter);
                    return res.status(response.status).send({ message: "Unable to fetch archived threads" });
                }
                const publicThread = (await response.json()) as RESTGetAPIChannelThreadsArchivedPublicResult;
                threads = (publicThread.threads as APIPublicThreadChannel[]) || [];
                members = publicThread.members || [];
                public_has_more = publicThread.has_more === true;
            }
            for (let i = 0; i < threads.length; i++) {
                const timestamp = threads[i].thread_metadata?.archive_timestamp ?? 0;
                set[pageOffset + i] = new Date(timestamp).getTime();
            }
            const posts = await getForumPosts(
                threads.map(thread => thread.id),
                req.headers.authorization!,
            );
            const finalData = {
                threads: threads,
                members,
                has_more: public_has_more,
                total_results: set.length,
                first_messages: Object.values(posts).flatMap(post => (post.first_message ? [post.first_message] : [])),
                owners: Object.values(posts).flatMap(post => (post.owner ? [post.owner] : [])),
            };
            res.send(finalData);
        } catch (error) {
            if (error instanceof ForumPostError && error.retryAfter) res.setHeader("Retry-After", error.retryAfter);
            res.status(error instanceof ForumPostError ? error.status : 502).send({
                message: "Unable to load archived threads",
            });
        }
    },
);

export default app;
