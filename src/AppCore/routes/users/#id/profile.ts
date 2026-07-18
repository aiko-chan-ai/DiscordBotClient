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
    if (guild_id) {
        guild_member = await net.fetch(
            "https://canary.discord.com/api/v9/guilds/" +
				guild_id +
				"/members/" +
				req.params.id,
            {
                headers: {
                    authorization: req.headers.authorization,
                    "user-agent": Constants.UserAgentDiscordBot,
                } as Record<string, string>,
            },
        )
            .then(r => r.json() as Promise<APIGuildMember>)
            .catch(() => null);
    }
    let bio = null;
    const botId = Util.getIDFromToken(req.headers.authorization);
    if (req.params.id === botId) {
        // Using bio from applications/@me
        const applicationData = await net.fetch(
            "https://canary.discord.com/api/v9/applications/@me",
            {
                headers: {
                    Authorization: req.headers.authorization,
                    "User-Agent": Constants.UserAgentDiscordBot,
                } as Record<string, string>,
            },
        ).then(resF => {
            return resF.json() as Promise<APIApplication>;
        });
        bio = applicationData.description;
    }
    net.fetch("https://canary.discord.com/api/v9/users/" + req.params.id, {
        headers: {
            authorization: req.headers.authorization,
            "user-agent": Constants.UserAgentDiscordBot,
        } as Record<string, string>,
    })
        .then(r => r.json() as Promise<APIUser>)
        .then(d =>
            res.send(Util.ProfilePatch(d, guild_member, (guild_id as string) ?? null, bio, botId)),
        )
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
