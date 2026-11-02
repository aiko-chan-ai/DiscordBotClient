/* Copyright Elysia © 2025. All rights reserved */

import { APIPublicThreadChannel, APIThreadList, APIThreadMember } from "discord-api-types/v10";
import { net } from "electron";
import { Request, Router } from "express";
import Constants from "src/AppCore/Constants";
import { validateBotToken } from "src/AppUtils/ValidateBotToken";

const app = Router({ mergeParams: true });

const CACHE_MAX_SIZE = 200;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

interface ThreadCacheEntry {
    timestamps: Set<number>;
    createdAt: number;
}

const mapCache = new Map<string, ThreadCacheEntry>();

function getOrCreateCacheEntry (cacheKey: string): Set<number> {
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
    const entry: ThreadCacheEntry = { timestamps: new Set<number>(), createdAt: Date.now() };
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
        let { sort_by, sort_order } = req.query;
        const { archived, tag_setting, name, tag, limit, offset } = req.query;
        // Force set
        sort_by = "archive_time";
        sort_order = "desc";
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
        const first_messages: unknown[] = [];
        const public_has_more = false;
        const set = getOrCreateCacheEntry(`${res.locals.authenticatedBotId}:${channelId}`);
        const before = Array.from(set)[Math.max((parseInt(offset || "0", 10) || 0) - 1, 0)];
        if (archived === "true") {
            const response = await net
                .fetch(
                    `https://canary.discord.com/api/v9/channels/${channelId}/threads/archived/public?limit=${parseInt(limit || "25") || 25}${
                        before ? `&before=${new Date(before).toISOString()}` : ""
                    }`,
                    {
                        headers: {
                            authorization: req.headers.authorization,
                            "user-agent": Constants.UserAgentDiscordBot,
                        } as Record<string, string>,
                    },
                );
            if (!response.ok) return res.status(response.status).send({ message: "Unable to fetch archived threads" });
            const publicThread = await response.json() as APIThreadList;
            threads = (publicThread.threads as APIPublicThreadChannel[]) || [];
            members = publicThread.members || [];
            // first_messages = publicThread.first_messages || [];
            // public_has_more = publicThread.has_more || false;
        }
        /*
	function sorting(a = 0, b = 0) {
		if (sort_order === 'asc') {
			return a > b ? 1 : a < b ? -1 : 0; // Ascending order
		} else {
			return a < b ? 1 : a > b ? -1 : 0; // Descending order
		}
	}
	switch (sort_by) {
		case 'archive_time': {
			threads = threads.sort((a, b) =>
				sorting(
					new Date(a.thread_metadata.archive_timestamp)?.getTime(),
					new Date(a.thread_metadata.archive_timestamp)?.getTime(),
				),
			);
			break;
		}
		case 'creation_time': {
			threads = threads.sort((a, b) =>
				sorting(
					new Date(a.thread_metadata.create_timestamp)?.getTime(),
					new Date(a.thread_metadata.create_timestamp)?.getTime(),
				),
			);
			break;
		}
		case 'last_message_time':
		default: {
			threads = threads.sort((a, b) =>
				sorting(BigInt(a.last_message_id), BigInt(b.last_message_id)),
			);
			break;
		}
	}
	*/
        for (let i = 0; i < threads.length; i++) {
            const timestamp = threads[i].thread_metadata?.archive_timestamp ?? 0;
            set.add(new Date(timestamp).getTime());
        }
        const finalData = {
            threads: threads,
            members,
            has_more: public_has_more,
            total_results: set.size,
            first_messages,
        };
        res.send(finalData);
    },
);

export default app;
