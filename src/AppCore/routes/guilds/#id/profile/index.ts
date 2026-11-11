/* Copyright Elysia © 2025. All rights reserved */

import { APIGuild, APIGuildMember } from "discord-api-types/v10";
import { net } from "electron";
import { Request, Response, Router } from "express";
import Constants from "src/AppCore/Constants";
import Util from "src/AppUtils/Utils";

const app = Router({ mergeParams: true });

// Convert Guild object to GuildProfile object
// with_counts

// Ref: https://github.com/discord-userdoccers/discord-userdoccers/pull/346

function convertGuildObjectToGuildProfileObject (guild: APIGuild & { code?: number }) {
    if (!guild.id && guild.code) {
        return {
            isError: true,
            data: guild,
        };
    }
    return {
        isError: false,
        data: {
            id: guild.id,
            name: guild.name,
            icon_hash: guild.icon,
            member_count: guild.approximate_member_count,
            online_count: guild.approximate_presence_count,
            description: guild.description,
            banner_hash: guild.banner,
            game_application_ids: [],
            game_activity: {},
            tag: null,
            badge: 0,
            badge_color_primary: "#ff0000", // ?
            badge_color_secondary: "#800000", // ?
            badge_hash: null,
            traits: [],
            features: guild.features,
            visibility: 2,
            custom_banner_hash: null,
            premium_subscription_count: guild.premium_subscription_count,
            premium_tier: guild.premium_tier,
        },
    };
}

app.get(
    "/",
    async (
        req: Request<{
            id: string;
        }>,
        res,
    ) => {
        net.fetch(`https://canary.discord.com/api/v9/guilds/${req.params.id}?with_counts=true`, {
            method: "GET",
            headers: req.headers as Record<string, string>,
        })
            .then(r => r.json() as Promise<APIGuild & { code?: number }>)
            .then(guild => {
                const data = convertGuildObjectToGuildProfileObject(guild);
                return res.status(data.isError ? 403 : 200).send(data.data);
            })
            .catch(err => {
                console.error("Error in /guilds/:id/profile GET:", err);
                res.status(500).send({
                    message: "Internal Server Error (/guilds/:id/profile)",
                    code: 500,
                });
            });
    },
);

export interface ModifyCurrentGuildProfile {
    name: string;
    description: string;
    icon: string | null;
    custom_banner: string | null;
    // ?
    visibility: number;
    brand_color_primary: unknown;
    traits: unknown[];
    game_application_ids: unknown[];
}

const callbackEditCurrentGuild = (
    reqCallback: Request<
        {
            id: string;
        },
        unknown,
        ModifyCurrentGuildProfile
    >,
    resCallback: Response,
) => {
    const guildId = reqCallback.params.id;
    const body: Record<string, unknown> = {};
    if ("name" in reqCallback.body) body.name = reqCallback.body.name;
    if ("description" in reqCallback.body) body.description = reqCallback.body.description;
    if ("icon" in reqCallback.body) body.icon = reqCallback.body.icon;
    if ("custom_banner" in reqCallback.body) body.banner = reqCallback.body.custom_banner;
    net.fetch(`https://canary.discord.com/api/v10/guilds/${guildId}`, {
        headers: {
            authorization: reqCallback.headers.authorization,
            "user-agent": Constants.UserAgentDiscordBot,
            "Content-Type": "application/json",
        } as Record<string, string>,
        method: "PATCH",
        body: JSON.stringify(body),
    })
        .then(r => r.json() as Promise<APIGuild>)
        .then(guild => {
            const data = convertGuildObjectToGuildProfileObject(guild);
            return resCallback.status(data.isError ? 403 : 200).send(data.data);
        })
        .catch(err => {
            console.error("Error in /guilds/:id/profile PATCH (guild):", err);
            if (!resCallback.headersSent) resCallback.status(500).send({ message: "Internal Server Error", code: 500 });
        });
};

app.patch("/", async (req, res) => {
    return Util.getDataFromRequest(req, res, callbackEditCurrentGuild);
});

export interface ModifyCurrentGuildMemberProfile {
    /**
     * The guild-specific nickname of the member (1-32 characters)
     *
     * Permission: CHANGE_NICKNAME
     */
    nick?: string | null;
    /**
     * The member's guild avatar; can only be changed for premium users and bots
     */
    avatar?: string | null;
    /**
     * The ID of the member's guild avatar decoration; can only be changed for premium users
     */
    avatar_decoration_id?: string | null;
    /**
     * The SKU ID of the member's guild avatar decoration; can only be changed for premium users
     */
    avatar_decoration_sku_id?: string | null;
    /**
     * The member's equipped collectibles; can only be changed for premium users
     */
    collectibles?: unknown | null;
    /**
     * The display name font to use; can only be changed for premium users
     */
    display_name_font_id?: number | null;
    /**
     * The display name effect to use; can only be changed for premium users
     */
    display_name_effect_id?: number | null;
    /**
     * The display name colors to use encoded as an array of integers representing hexadecimal color codes (max 2); can only be changed for premium users
     */
    display_name_colors?: number;
    /**
     * The member's guild pronouns (max 40 characters)
     */
    pronouns?: string | null;
    /**
     * The member's guild bio (max 190 characters); can only be changed for premium users and bots
     */
    bio?: string | null;
    /**
     * The member's guild banner; can only be changed for premium users and bots
     */
    banner?: string | null;
}

const callbackEditCurrentMember = (
    reqCallback: Request<
        {
            id: string;
        },
        unknown,
        ModifyCurrentGuildMemberProfile
    >,
    resCallback: Response,
) => {
    const guildId = reqCallback.params.id;
    const body: Record<string, unknown> = {};
    if ("nick" in reqCallback.body) body.nick = reqCallback.body.nick;
    if ("avatar" in reqCallback.body) body.avatar = reqCallback.body.avatar;
    if ("avatar_description" in reqCallback.body) body.avatar_description = reqCallback.body.avatar_description;
    if ("banner" in reqCallback.body) body.banner = reqCallback.body.banner;
    if ("bio" in reqCallback.body) body.bio = reqCallback.body.bio;
    net.fetch(`https://canary.discord.com/api/v10/guilds/${guildId}/members/@me`, {
        headers: {
            authorization: reqCallback.headers.authorization,
            "user-agent": Constants.UserAgentDiscordBot,
            "Content-Type": "application/json",
        } as Record<string, string>,
        method: "PATCH",
        body: JSON.stringify(body),
    })
        .then(r => r.json() as Promise<APIGuildMember>)
        .then(d => {
            return resCallback.send({
                guild_id: guildId,
                pronouns: "",
                bio: body.bio || "",
                banner: d.banner,
                accent_color: null,
                theme_colors: null,
                popout_animation_particle_type: null,
                emoji: null,
                profile_effect: null,
            });
        })
        .catch(err => {
            console.error("Error in /guilds/:id/profile PATCH (member):", err);
            if (!resCallback.headersSent) resCallback.status(500).send({ message: "Internal Server Error", code: 500 });
        });
};

app.patch("/@me", async (req, res) => {
    return Util.getDataFromRequest(req, res, callbackEditCurrentMember);
});

// ??? WTF discord ???
app.patch("/%40me", async (req, res) => {
    return Util.getDataFromRequest(req, res, callbackEditCurrentMember);
});

export default app;
