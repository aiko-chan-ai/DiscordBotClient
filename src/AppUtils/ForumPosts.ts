/* Copyright Elysia © 2025. All rights reserved */

import { APIMessage } from "discord-api-types/v10";
import { net } from "electron";
import Constants from "src/AppCore/Constants";

export class ForumPostError extends Error {
    constructor (
        public status: number,
        public retryAfter: string | null = null,
    ) {
        super("Unable to fetch forum post previews");
    }
}

export async function getForumPosts (threadIds: string[], authorization: string) {
    const threads: Record<string, { first_message: APIMessage | null; owner: APIMessage["author"] | null }> = {};
    // Forum starter messages have the same ID as their thread. Bound parallel REST requests.
    for (let offset = 0; offset < threadIds.length; offset += 4) {
        await Promise.all(
            threadIds.slice(offset, offset + 4).map(async threadId => {
                const response = await net.fetch(
                    `https://canary.discord.com/api/v9/channels/${threadId}/messages/${threadId}`,
                    {
                        headers: { authorization, "user-agent": Constants.UserAgentDiscordBot },
                        signal: AbortSignal.timeout(10000),
                        redirect: "error",
                    },
                );
                const body = await response.json();
                // Only Unknown Message means deleted; permissions, rate limits and missing channels must remain errors.
                if (!response.ok && !(response.status === 404 && body.code === 10008)) {
                    throw new ForumPostError(response.status, response.headers.get("retry-after"));
                }
                const message = response.ok ? (body as APIMessage) : null;
                if (message && (message.id !== threadId || message.channel_id !== threadId || !message.author)) {
                    throw new ForumPostError(502);
                }
                threads[threadId] = { first_message: message, owner: message?.author ?? null };
            }),
        );
    }
    return threads;
}
