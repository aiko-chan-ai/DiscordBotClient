/* Copyright Elysia © 2025. All rights reserved */

import { APIApplication, APIGuildMember, APIUser } from "discord-api-types/v10";
import { net } from "electron";
import { Request, Router } from "express";
import Constants from "src/AppCore/Constants";
import Util from "src/AppUtils/Utils";

const app = Router({ mergeParams: true });

app.get("/", async (req: Request<{ id: string }>, res) => {
    const { guild_id } = req.query;
    let guild_member: APIGuildMember | null = null;
    const botId = Util.getIDFromToken(req.headers.authorization);
    const isCurrentUser = req.params.id === botId;
    if (guild_id) {
        if (isCurrentUser) {
            // ??? https://canary.discord.com/api/v9/users/@me/guilds/${guild_id}/member
            const body: Record<string, unknown> = {
                avatar_decoration_id: null,
            };
            // ??? monkey patching
            guild_member = await net
                .fetch(`https://canary.discord.com/api/v10/guilds/${guild_id}/members/@me`, {
                    headers: {
                        authorization: req.headers.authorization,
                        "user-agent": Constants.UserAgentDiscordBot,
                        "Content-Type": "application/json",
                    } as Record<string, string>,
                    method: "PATCH",
                    body: JSON.stringify(body),
                })
                .then(r => r.json() as Promise<APIGuildMember>);
        } else {
            guild_member = await net
                .fetch(`https://canary.discord.com/api/v9/guilds/${guild_id}/members/${req.params.id}`, {
                    headers: {
                        authorization: req.headers.authorization,
                        "user-agent": Constants.UserAgentDiscordBot,
                    } as Record<string, string>,
                })
                .then(r => r.json() as Promise<APIGuildMember>)
                .catch(() => null);
        }
    }
    let bio: string | null = null;
    if (isCurrentUser) {
        // Using bio from applications/@me
        try {
            const applicationData = await net
                .fetch("https://canary.discord.com/api/v9/applications/@me", {
                    headers: {
                        Authorization: req.headers.authorization,
                        "User-Agent": Constants.UserAgentDiscordBot,
                    } as Record<string, string>,
                })
                .then(resF => {
                    return resF.json() as Promise<APIApplication>;
                });
            bio = applicationData.description;
        } catch (err) {
            console.error("Error fetching application data:", err);
        }
    }
    net.fetch("https://canary.discord.com/api/v9/users/" + req.params.id, {
        headers: {
            authorization: req.headers.authorization,
            "user-agent": Constants.UserAgentDiscordBot,
        } as Record<string, string>,
    })
        .then(r => r.json() as Promise<APIUser>)
        .then(d => res.send(Util.ProfilePatch(d, guild_member, (guild_id as string) ?? null, bio)))
        .catch(err => {
            console.error("Error fetching user profile (/:id):", err);
            if (!res.headersSent) res.status(500).send({ message: "Internal Server Error" });
        });
});

app.patch("/", (req, res) => {
    req.url = "/api/v9/users/@me";
    return Util.proxy(req, res);
});

export default app;
