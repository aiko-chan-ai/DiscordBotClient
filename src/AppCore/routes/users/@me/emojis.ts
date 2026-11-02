/* Copyright Elysia © 2025. All rights reserved */

// Custom API, Discord doesn't have this endpoint

import { APIApplicationEmoji } from "discord-api-types/v10";
import { net } from "electron";
import { Router } from "express";
import Constants from "src/AppCore/Constants";
import { validateBotToken } from "src/AppUtils/ValidateBotToken";

const app = Router({ mergeParams: true });

const EMOJI_CACHE_MAX_SIZE = 100;
const EMOJI_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface EmojiCacheEntry {
    timeout: number;
    data: APIApplicationEmoji[];
}

const cacheMap = new Map<string, EmojiCacheEntry>();

/**
 * Evict expired entries from cache to prevent memory leaks
 */
function evictExpiredEntries () {
    const now = Date.now();
    for (const [key, entry] of cacheMap) {
        if (entry.timeout <= now) {
            cacheMap.delete(key);
        }
    }
}

app.get("/", validateBotToken, (req, res) => {
    const id = res.locals.authenticatedBotId as string;
    const cached = cacheMap.get(id);
    if (cached && cached.timeout > Date.now()) {
        return res.send(cached.data);
    }
    // Evict expired entries periodically
    evictExpiredEntries();
    // Evict oldest if cache is full
    if (cacheMap.size >= EMOJI_CACHE_MAX_SIZE) {
        const oldestKey = cacheMap.keys().next().value;
        if (oldestKey) cacheMap.delete(oldestKey);
    }
    net.fetch(`https://canary.discord.com/api/v9/applications/${id}/emojis`, {
        headers: {
            authorization: req.headers.authorization,
            "user-agent": Constants.UserAgentDiscordBot,
        } as Record<string, string>,
    })
        .then(r => r.json() as Promise<{ items: APIApplicationEmoji[] }>)
        .then(r => {
            const emojis = r.items.map(emoji => ({
                roles: [],
                require_colons: emoji.require_colons,
                name: emoji.name,
                managed: false,
                id: emoji.id,
                available: true,
                animated: emoji.animated,
                allNamesString: `:${emoji.name}:`,
                guildId: "0",
                type: 1,
            }));
            cacheMap.set(id, {
                timeout: Date.now() + EMOJI_CACHE_TTL_MS,
                data: r.items,
            });
            res.send(r.items);
        })
        .catch(err => {
            console.error("Error fetching emojis:", err);
            res.send([]);
        });
});

export default app;
