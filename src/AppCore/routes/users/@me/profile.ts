/* Copyright Elysia © 2025. All rights reserved */

import { APIApplication, APIGuildMember, APIUser } from "discord-api-types/v10";
import { net } from "electron";
import { Request, Router } from "express";
import Constants from "src/AppCore/Constants";
import Util from "src/AppUtils/Utils";

const app = Router({ mergeParams: true });

app.get(
    "/",
    async (
        req: Request<
            unknown,
            unknown,
            unknown,
            {
                guild_id?: string;
            }
        >,
        res,
    ) => {
        const id = Util.getIDFromToken(req.headers.authorization);
        const { guild_id } = req.query;
        let guild_member = null;
        if (guild_id) {
            guild_member = await net.fetch("https://canary.discord.com/api/v9/guilds/" + guild_id + "/members/" + id, {
                headers: {
                    authorization: req.headers.authorization,
                    "user-agent": Constants.UserAgentDiscordBot,
                } as Record<string, string>,
            })
                .then(r => r.json() as Promise<APIGuildMember>)
                .catch(() => null);
        }
        // Using bio from applications/@me
        // Note:
        // There was a strange behavior that occurred:
        // The Bot’s *Description* field supports up to 400 characters and **does not handle emojis automatically**,
        // whereas the *About Me* tab in the app supports up to 190 characters and **does handle emojis automatically**.
        // As a result, in some specific cases, clicking on the *About Me* tab can trigger an error and cause it to get stuck on the popup:
        // **"Careful - you have unsaved changes!"**
        // > **Emoji handling note**: When the server has an emoji that the bot does not have access to, or if the emoji has been deleted,
        // Discord will automatically remove the emoji's ID.
        let applicationBio: string | null = null;
        try {
            const applicationData = await net.fetch("https://canary.discord.com/api/v9/applications/@me", {
                headers: {
                    Authorization: req.headers.authorization,
                    "User-Agent": Constants.UserAgentDiscordBot,
                } as Record<string, string>,
            }).then(resFetch => {
                return resFetch.json() as Promise<APIApplication>;
            });
            applicationBio = applicationData.description;
        } catch (err) {
            console.error("Error fetching application data:", err);
        }
        net.fetch("https://canary.discord.com/api/v9/users/@me", {
            headers: {
                authorization: req.headers.authorization,
                "user-agent": Constants.UserAgentDiscordBot,
            } as Record<string, string>,
        })
            .then(r => r.json() as Promise<APIUser>)
            .then(d => res.send(Util.ProfilePatch(d, guild_member, guild_id, applicationBio, id)))
            .catch(err => {
                console.error("Error fetching user profile (@me):", err);
                if (!res.headersSent) res.status(500).send({ message: "Internal Server Error" });
            });
    },
);

export default app;
