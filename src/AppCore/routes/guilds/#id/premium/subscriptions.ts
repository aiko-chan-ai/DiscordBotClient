/* Copyright Elysia © 2025. All rights reserved */

import { DiscordSnowflake } from "@sapphire/snowflake";
import { APIGuild } from "discord-api-types/v10";
import { net } from "electron";
import { Request, Router } from "express";
import Constants from "src/AppCore/Constants";

const app = Router({ mergeParams: true });

function createFakeBoost (guildId: string) {
    const botId = DiscordSnowflake.generate().toString();
    return {
        id: DiscordSnowflake.generate().toString(),
        user_id: botId,
        guild_id: guildId,
        ended: false,
        pause_ends_at: null,
        user: {
            id: botId,
            username: "elysia",
            global_name: "DiscordBotClient",
            avatar: null,
            avatar_decoration_data: null,
            collectibles: null,
            discriminator: "0",
            public_flags: 0,
            primary_guild: null,
            clan: null,
        },
    };
}

app.get(
    "/",
    (
        req: Request<{
            id: string;
        }>,
        res,
    ) => {
        return net
            .fetch("https://canary.discord.com/api/v9/guilds/" + req.params.id, {
                headers: {
                    authorization: req.headers.authorization,
                    "user-agent": Constants.UserAgentDiscordBot,
                } as Record<string, string>,
            })
            .then(r => r.json() as Promise<APIGuild>)
            .then(object => {
                if (object.premium_subscription_count && object.premium_subscription_count > 0) {
                    const data = [];
                    const guildId = req.params.id;
                    for (let i = 0; i < object.premium_subscription_count; i++) {
                        data.push(createFakeBoost(guildId));
                    }
                    res.send(data);
                } else {
                    res.send([]);
                }
            })
            .catch(() => {
                res.send([]);
            });
    },
);

export default app;
