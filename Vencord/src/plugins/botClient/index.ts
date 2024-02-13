/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {
    ApplicationCommandInputType,
    ApplicationCommandOptionType,
    findOption,
    OptionalMessageOption,
    RequiredMessageOption,
    sendBotMessage,
} from "@api/Commands";
import { definePluginSettings } from "@api/Settings";
import { Logger } from "@utils/Logger";
import { Devs } from "@utils/constants";
import { getCurrentChannel, getCurrentGuild } from "@utils/discord";
import definePlugin, { OptionType } from "@utils/types";
import { findByPropsLazy, findByProps } from "@webpack";
import {
    RestAPI,
    UserStore,
    ChannelStore,
    GuildMemberStore,
    SelectedGuildStore,
    SelectedChannelStore,
    PresenceStore,
    PermissionStore,
    PermissionsBits,
    FluxDispatcher,
} from "@webpack/common";

const EPOCH = 1_420_070_400_000;
let INCREMENT = BigInt(0);

const GetToken = findByPropsLazy("getToken");
const LoginToken = findByPropsLazy("loginToken");
const murmurhash = findByPropsLazy("v3");
const getAPIBaseURL = findByPropsLazy('getAPIBaseURL');

const BotClientLogger = new Logger('BotClient', '#ff88f3');

// PermissionStore.computePermissions is not the same function and doesn't work here
const PermissionUtil = findByPropsLazy(
    "computePermissions",
    "canEveryoneRole"
) as {
    computePermissions({ ...args }): bigint;
};

class SnowflakeUtil extends null {
    static generate(timestamp: Date | number = Date.now()) {
        if (timestamp instanceof Date) timestamp = timestamp.getTime();
        if (typeof timestamp !== "number" || isNaN(timestamp)) {
            throw new TypeError(
                `"timestamp" argument must be a number (received ${isNaN(timestamp) ? "NaN" : typeof timestamp
                })`
            );
        }
        if (INCREMENT >= 4095n) INCREMENT = BigInt(0);

        // Assign WorkerId as 1 and ProcessId as 0:
        return (
            (BigInt(timestamp - EPOCH) << 22n) |
            (1n << 17n) |
            INCREMENT++
        ).toString();
    }

    static deconstruct(snowflake) {
        const bigIntSnowflake = BigInt(snowflake);
        return {
            timestamp: Number(bigIntSnowflake >> 22n) + EPOCH,
            get date() {
                return new Date(this.timestamp);
            },
            workerId: Number((bigIntSnowflake >> 17n) & 0b11111n),
            processId: Number((bigIntSnowflake >> 12n) & 0b11111n),
            increment: Number(bigIntSnowflake & 0b111111111111n),
            binary: bigIntSnowflake.toString(2).padStart(64, "0"),
        };
    }

    static timestampFrom(snowflake) {
        return Number(BigInt(snowflake) >> 22n) + EPOCH;
    }

    static get EPOCH() {
        return EPOCH;
    }
}

export default definePlugin({
    name: "BotClient",
    description:
        "Patch the current version of Discord to allow the use of bot accounts",
    authors: [Devs.Ely],
    enabledByDefault: true,
    dependencies: ["CommandsAPI"],
    settings: definePluginSettings({
        showMemberList: {
            description: "Allow fetching member list sidebar",
            type: OptionType.BOOLEAN,
            default: true,
            restartNeeded: false,
        },
        memberListInterval: {
            description:
                "The amount of time the member list sidebar is refreshed (seconds)\nDon't set the time too low if you don't want your client to lag",
            type: OptionType.NUMBER,
            default: 5,
            restartNeeded: false,
        },
    }),
    patches: [
        {
            find: `{type:"LOGOUT"}`,
            replacement: [
                {
                    // If user account is already logged in, proceed to log out
                    match: /if\(\w+\.user\.bot\){/,
                    replace: "$&}else{",
                },
            ],
        },
        {
            // Bot account caused the error
            find: "hasFetchedCredentials(){",
            replacement: [
                {
                    match: /hasFetchedCredentials\(\){/,
                    replace: "$&return true;",
                },
                {
                    match: /getCredentials\(\){return/,
                    replace: "$& [];",
                },
            ],
        },
        {
            // Remove/Patch unused bot ws opcode
            find: "voiceServerPing(){",
            replacement: [
                {
                    match: /embeddedActivityClose\(((\w+,?)+)?\){/,
                    replace: "$& return;",
                },
                {
                    match: /updateGuildSubscriptions\((\w+)\){/,
                    replace: function (str, ...args) {
                        const data = args[0];
                        return str + `const threadId = Object.values(${data})?.[0]?.thread_member_lists?.[0];
if (threadId) {
    getThreadMembers(threadId).then(r => {
        if (!r.length) return;
        let i = {
            threadId,
            guildId: Object.keys(${data})?.[0],
            members: r.map(_ => ({
                ..._,
                presence: null,
            })),
            type: "THREAD_MEMBER_LIST_UPDATE",
        };
        Vencord.Webpack.Common.FluxDispatcher.dispatch(i);
    });
}
return;
                        `;
                    },
                },
                {
                    match: /callConnect\(((\w+,?)+)?\){/,
                    replace: "$& return;",
                },
                {
                    match: /lobbyConnect\(((\w+,?)+)?\){/,
                    replace: "$& return;",
                },
                {
                    match: /lobbyDisconnect\(((\w+,?)+)?\){/,
                    replace: "$& return;",
                },
                {
                    match: /lobbyVoiceStatesUpdate\(((\w+,?)+)?\){/,
                    replace: "$& return;",
                },
                {
                    match: /streamCreate\(((\w+,?)+)?\){/,
                    replace: "$& return;",
                },
                {
                    match: /streamWatch\(((\w+,?)+)?\){/,
                    replace: "$& return;",
                },
                {
                    match: /streamPing\(((\w+,?)+)?\){/,
                    replace: "$& return;",
                },
                {
                    match: /streamDelete\(((\w+,?)+)?\){/,
                    replace: "$& return;",
                },
                {
                    match: /streamSetPaused\(((\w+,?)+)?\){/,
                    replace: "$& return;",
                },
                {
                    match: /remoteCommand\(((\w+,?)+)?\){/,
                    replace: "$& return;",
                },
                {
                    // Leave / Switch VoiceChannel
                    match: /voiceStateUpdate\((\w+)\){/,
                    replace: (str, ...args) => {
                        const data = args[0];
                        return (
                            str +
                            `
if (${data}.guildId) {
  if (${data}.guildId !== lasestGuildIdVoiceConnect) {
    // Disconnect
    this.send(4, {
        guild_id: lasestGuildIdVoiceConnect,
        channel_id: null,
        self_mute: ${data}.selfMute,
        self_deaf: ${data}.selfDeaf,
    });
    // Switch Guild
    lasestGuildIdVoiceConnect = ${data}.guildId;
  }
} else {
  ${data}.guildId = (lasestGuildIdVoiceConnect === 0) ? null : lasestGuildIdVoiceConnect;
  lasestGuildIdVoiceConnect = 0;
}`
                        );
                    },
                },
            ],
        },
        {
            // Patch opcode 2 (identify) and events
            find: "window.GLOBAL_ENV.GATEWAY_ENDPOINT;",
            replacement: [
                {
                    // Patch Close code
                    match: /(_handleClose\()(\w+)(,)(\w+)(,)(\w+)(\){)/,
                    replace: function (str, ...args) {
                        let closeCode = args[3];
                        return (
                            str +
                            `
if (${closeCode} === 4013) {
    showToast("Login Failure: Invalid intent(s), Logout...", 2);
    ${closeCode} = 4004;
} else if (${closeCode} === 4014) {
    showToast("Login Failure: Disallowed intent(s), Logout...", 2);
    ${closeCode} = 4004;
}`
                        );
                    },
                },
                // Event
                {
                    match: /(_handleDispatch\()(\w+)(,)(\w+)(,)(\w+)(\){)/,
                    replace: function (str, ...args) {
                        let data = args[1];
                        let eventName = args[3];
                        let N = args[5];
                        return (
                            str +
                            `
if ("MESSAGE_CREATE" === ${eventName} && !${data}.guild_id && !Vencord.Webpack.findByProps("getChannel", "getBasicChannel")?.getChannel(${data}.channel_id)) {
    return fetchChannel(${data}.channel_id).then(i => this.dispatcher.receiveDispatch(i, "CHANNEL_CREATE", ${N})).catch((err) => {
        const i = {
            type: 1,
            recipients: [${data}.author ?? ${data}.user ?? {
                id: ${data}.user_id
            }],
            last_message_id: ${data}.id,
            is_spam: !1,
            id: ${data}.channel_id,
            flags: 0
        };
        this.dispatcher.receiveDispatch(i, "CHANNEL_CREATE", ${N});
    }).finally(() => this.dispatcher.receiveDispatch(${data}, ${eventName}, ${N}));
}
if ("READY_SUPPLEMENTAL" === ${eventName}) {
    // Patch Status
    const status = Vencord.Webpack.Common.StatusSettingsStores.StatusSetting.getSetting() || 'online';
    const customStatus = Vencord.Webpack.Common.StatusSettingsStores.CustomStatusSetting.getSetting();
    const activities = [];
    if (customStatus) {
        activities.push({
            "name": "Custom Status",
            "type": 4,
            "state": customStatus.text,
            // Bot cannot use emoji;
        });
    }
    // WS Send;
    Vencord.Webpack.findByProps('getSocket').getSocket().send(3, {
        status,
        since: null,
        activities,
        afk: false
    });
}
if ("READY" === ${eventName}) {
${data}.users = [
	...(${data}.users || []),
	electron.getOwner(),
];
${data}.user_settings_proto = electron.getSettingProto1(${data}.user.id);
${data}.user_guild_settings = {
	entries: [],
	version: 0,
	partial: !1,
};
(${data}.user.premium = !0),
(${data}.user.premium_type = 1),
(${data}.user.mfa_enabled = 1),
(${data}.user.phone = '+1234567890'),
(${data}.user.verified = !0),
(${data}.user.nsfw_allowed = !0),
(${data}.user.email = 'DiscordBotClient@aiko.com');
${data}.tutorial = null;
${data}.sessions = [];
${data}.relationships = [];
${data}.read_state = {
	version: 1196697,
	partial: false,
	entries: [],
};
${data}.private_channels = electron.getPrivateChannelLogin();
${data}.guild_join_requests = [];
${data}.guild_experiments = electron.getGuildExperiments();
${data}.friend_suggestion_count = 0;
${data}.experiments = electron.getUserExperiments();
${data}.connected_accounts = [];
${data}.auth_session_id_hash = "G0V9YBhBm+PElWFlIJLj9zN5vGAbRD9uKB9iZnl5VEk=";
${data}.analytics_token = null;
${data}.auth = {
	authenticator_types: [2, 3],
}
${data}.consents = {
	personalization: {
		consented: true,
	},
};
}
`
                        );
                    },
                },
                // _doIdentify
                {
                    match: /(this\.token=)(\w+)(,)(\w+)(\.verbose\("\[IDENTIFY\]"\);)/,
                    replace: function (str, ...args) {
                        let varToken = args[1];
                        return (
                            str +
                            `
${varToken} = ${varToken}.replace(/bot/gi,"").trim();
const botInfo = await electron.getBotInfo(${varToken});
this.token = ${varToken};
console.log(botInfo);
if (!botInfo.success) {
	showToast("Login Failure: " + botInfo.message, 2);
	return this._handleClose(!0, 4004, botInfo.message);
}
const intentsData = electron.requestIntents(botInfo.data.flags);
if (!intentsData.success) {
	showToast("Login Failure: " + intentsData.message, 2);
	return this._handleClose(!0, 4004, intentsData.message);
}
const intents = getIntents(...intentsData.skip);
allShards = Math.ceil(parseInt(botInfo.data.approximate_guild_count) / 100) || 1;
if (currentShard + 1 >= allShards) {
    currentShard = 0;
}
showToast('Bot Intents: ' + intents, 1);
showToast(\`Shard ID: \${currentShard} (All: \${allShards})\`, 1);
                        `
                        );
                    },
                },
                // Sharding
                {
                    match: /(token:\w+)(,capabilities:)/,
                    replace: function (str, ...args) {
                        return `${args[0]},intents,shard: [parseInt(currentShard), allShards]${args[1]}`;
                    },
                },
            ],
        },
        {
            // Bot account caused the error
            find: "users_size:JSON.stringify",
            replacement: [
                {
                    match: /users_size:JSON.stringify\(\w+\)\.length/,
                    replace: "users_size:0",
                },
                {
                    match: /read_states_size:JSON.stringify\(\w+\)\.length/,
                    replace: "read_states_size:0",
                },
            ],
        },
        {
            // Bot account caused the error
            find: "notificationSettings:{",
            replacement: [
                {
                    match: /(notificationSettings:{flags:)([\w\.]+)},/,
                    replace: function (str, ...args) {
                        return args[0] + "0},";
                    },
                },
            ],
        },
        {
            // Patch getToken & setToken function
            find: "this.encryptAndStoreTokens()",
            replacement: [
                {
                    match: /(getToken\()(\w)(\){)(.+)(},setToken)/,
                    replace: function (str, ...args) {
                        let varToken = args[1];
                        let arrayToken = args[3].match(/\w+\[\w+\]:\w+/)?.[0];
                        let body = `
this.init();
let t = ${varToken} ? ${arrayToken}
return t ? \`Bot \${t.replace(/bot/gi,"").trim()}\` : null`;
                        return `${args[0]}${args[1]}${args[2]}${body}${args[4]}`;
                    },
                },
                {
                    match: /,setToken\((\w+),(\w+)\){/,
                    replace: function (str, ...args) {
                        const token = args[0];
                        const id = args[1];
                        return str + `if(${token}){${token}=${token}.replace(/bot/gi,"").trim()}`;
                    },
                },
            ],
        },
        {
            find: "STARTED_ONBOARDING=8",
            replacement: [
                {
                    match: /STARTED_ONBOARDING=8/,
                    replace: 'STARTED_ONBOARDING=4294967296',
                }
            ]
        },
        {
            // Don't delete localStorage
            find: "delete window.localStorage",
            replacement: [
                {
                    match: "delete window.localStorage",
                    replace: "",
                },
            ],
        },
        // Patch some unusable bot modules/methods
        {
            find: "resolveInvite:",
            replacement: [
                {
                    match: /,acceptInvite\(\w+\){/,
                    replace: `$& showToast('Discord Bot Client cannot join guilds',2);
                    return Promise.reject("Discord Bot Client cannot join guilds");`,
                },
            ],
        },
        {
            find: "loadTemplatesForGuild:",
            replacement: [
                {
                    match: /loadTemplatesForGuild:/,
                    replace:
                        '$& () => Promise.reject("Discord Bot Client cannot use Guild Templates"), loadTemplatesForGuild_:',
                },
            ],
        },
        // Fix Copy Webhook URL
        {
            find: "SUPPORTS_COPY:",
            replacement: [{
                match: /(function \w+\()(\w+)(\){)/,
                replace: function (str, ...args) {
                    const text = args[1];
                    return args[0] + args[1] + args[2] + `
if (URL.canParse(${text})) {
    ${text} = ${text}.replace(/https:\\/\\/localhost:\\d+/, "https://discord.com");
    ${text} = ${text}.replace(/\/bot/, '');
}
                    `;
                },
            }],
        }
    ],
    commands: [
        {
            name: "ping",
            description: "Ping pong!",
            inputType: ApplicationCommandInputType.BOT,
            execute: (opts, ctx) => {
                sendBotMessage(ctx.channel.id, { content: "Pong!" });
            },
        },
        {
            name: "purge",
            description: "Delete messages from the channel",
            inputType: ApplicationCommandInputType.BOT,
            options: [
                {
                    name: "amount",
                    description: "Input the amount of messages to delete",
                    required: true,
                    type: ApplicationCommandOptionType.INTEGER,
                },
            ],
            execute: async (opts, ctx) => {
                const amount = findOption<number>(opts, "amount", 2);
                if (amount < 2 || amount > 100) {
                    sendBotMessage(ctx.channel.id, {
                        content: `Invalid messages (2<=${amount}<=100)`,
                    });
                } else {
                    const oldId = SnowflakeUtil.generate(
                        Date.now() - 1209600000
                    );
                    const { body } = await RestAPI.get({
                        url: `/channels/${ctx.channel.id}/messages?limit=${amount}`,
                    });
                    const messages = body
                        .filter((m) => BigInt(m.id) > BigInt(oldId))
                        .map((m) => m.id);
                    try {
                        await RestAPI.post({
                            url: `/channels/${ctx.channel.id}/messages/bulk-delete`,
                            body: {
                                messages,
                            },
                        });
                        sendBotMessage(ctx.channel.id, {
                            content: `Deleted ${messages.length} messages`,
                        });
                    } catch {
                        sendBotMessage(ctx.channel.id, {
                            content: "Failed to delete messages",
                        });
                    }
                }
            },
        },
        {
            name: "switchshard",
            description: "Login with another shard ID",
            inputType: ApplicationCommandInputType.BOT,
            options: [
                {
                    name: "id",
                    description: "Shard ID",
                    required: true,
                    type: ApplicationCommandOptionType.INTEGER,
                },
            ],
            execute: async (opts, ctx) => {
                const id = findOption<number>(opts, "id", 0);
                if (id < 0 || id + 1 >= window.allShards) {
                    sendBotMessage(ctx.channel.id, {
                        content: `Invalid shardId (0<=${id}<=${window.allShards - 1
                            })`,
                    });
                } else {
                    window.currentShard = id;
                    LoginToken.loginToken(GetToken.getToken());
                }
            },
        },
        {
            name: "switchtoken",
            description: "Login with another bot",
            inputType: ApplicationCommandInputType.BOT,
            options: [
                {
                    name: "token",
                    description: "Bot token",
                    required: true,
                    type: ApplicationCommandOptionType.STRING,
                },
            ],
            execute: async (opts, ctx) => {
                const token = findOption<string>(opts, "token", "");
                if (
                    !/(mfa\.[a-z0-9_-]{20,})|([a-z0-9_-]{23,28}\.[a-z0-9_-]{6,7}\.[a-z0-9_-]{27})/i.test(
                        token
                    )
                ) {
                    sendBotMessage(ctx.channel.id, {
                        content: `Invalid token`,
                    });
                } else {
                    window.currentShard = 0;
                    LoginToken.loginToken(token);
                }
            },
        },
        {
            name: 'embed',
            description: 'Creates an embed with the specified color in the specified channel',
            inputType: ApplicationCommandInputType.BOT,
            options: [
                {
                    type: ApplicationCommandOptionType.STRING,
                    name: 'text',
                    description:
                        'Input text (separate the title from the description with |)',
                    required: true,
                },
                {
                    type: ApplicationCommandOptionType.STRING,
                    name: 'color',
                    description: 'Input color in hex format. Example: #fedbca',
                    required: false,
                },
            ],
            execute: async (opts, ctx) => {
                let color = findOption<string>(opts, "color", "#000000");
                const text = findOption<string>(opts, "text", "");
                if (color.startsWith('#')) {
                    color = color.slice(1);
                }
                if (color.length > 6 || Number.isNaN(parseInt(color, 16))) {
                    return sendBotMessage(ctx.channel.id, {
                        content: `"#${color}" is not a valid color. Please enter a color in the \`#ffffff\` format. (hex)`,
                    });
                }
                let inputColor = parseInt(color, 16);
                // Resolve the text to title and description
                let [title, description] = text.split('|');
                getAPIBaseURL.post({
                    url: `/channels/${ctx.channel.id}/messages`,
                    body: {
                        embeds: [
                            {
                                title,
                                description:
                                    description && description.trim().length > 0
                                        ? description
                                        : undefined,
                                color: inputColor,
                            },
                        ],
                    },
                }).then(() => {
                    return sendBotMessage(ctx.channel.id, {
                        content: 'Embed sent!',
                    });
                }).catch((e) => {
                    return sendBotMessage(ctx.channel.id, {
                        content: 'Error sending embed.\n' + e.message,
                    });
                });
            },
        }
    ],
    start() {
        // Patch modules
        [
            "acceptFriendRequest",
            "addRelationship",
            "cancelFriendRequest",
            "clearPendingRelationships",
            "confirmClearPendingRelationships",
            "fetchRelationships",
            "removeFriend",
            "removeRelationship",
            "sendRequest",
            "unblockUser",
            "updateRelationship",
        ].forEach(
            (a) =>
            (findByProps("fetchRelationships")[a] = function () {
                window.showToast(
                    "Discord Bot Client cannot use Relationships Module",
                    2
                );
                return Promise.reject(
                    "Discord Bot Client cannot use Relationships Module"
                );
            })
        );

        const doRefreshMemberList = () => {
            if (this.settings.store.memberListInterval < 1) {
                this.settings.store.memberListInterval = 1;
            }
            BotClientLogger.info('Update MemberList: Interval', this.settings.store.memberListInterval * 1000);
            setTimeout(() => {
                doRefreshMemberList();
            }, this.settings.store.memberListInterval * 1000);
            if (!this.settings.store.showMemberList) return;
            const channel = getCurrentChannel();
            if (
                !channel ||
                !channel.guild_id ||
                channel.isDM() ||
                channel.isGroupDM() ||
                channel.isMultiUserDM() ||
                channel.isGuildVoice() ||
                channel.isGuildStageVoice() ||
                channel.isDirectory()
            ) {
                BotClientLogger.error('Update MemberList: Invalid Channel', channel);
                return false;
            }
            const guild = getCurrentGuild();
            if (!guild) return;
            // MemberListId
            const allow: string[] = [];
            const deny: string[] = [];
            const arrayMemberListId: string[] = [];
            const allId = Object.keys(channel.permissionOverwrites);
            for (const id of allId) {
                if (
                    window.checkBitfield(channel.permissionOverwrites[id].allow)
                ) {
                    allow.push(id);
                }
                if (
                    window.checkBitfield(channel.permissionOverwrites[id].deny)
                ) {
                    deny.push(id);
                }
            }
            allow.sort();
            deny.sort();
            // @ts-ignore
            const everyonePerms = new PermissionsDiscord(
                guild.roles[guild.id].permissions
            );
            if (deny.length) {
                arrayMemberListId.push(
                    ...allow.map((i) => `allow:${i}`),
                    ...deny.map((i) => `deny:${i}`)
                );
            } else if (!everyonePerms.has("VIEW_CHANNEL")) {
                arrayMemberListId.push(
                    ...allow.map((i) => `allow:${i}`),
                    ...deny.map((i) => `deny:${i}`)
                );
            }
            const memberListId =
                arrayMemberListId.length == 0
                    ? "everyone"
                    : murmurhash.v3(arrayMemberListId.join(","));
            // Sort role
            const roleSort = Object.values(guild.roles)
                .filter((r) => r.hoist)
                .sort((x, y) => y.position - x.position);
            // GuildMembers Patch
            const allMembers = Object.values(GuildMemberStore.getMembers(guild.id));
            let member_count = allMembers.length;
            const convertMembersToRaw = allMembers
                .filter(
                    (m) =>
                        PermissionUtil.computePermissions({
                            user: { id: m.userId },
                            context: guild,
                            overwrites: channel.permissionOverwrites,
                            member: m,
                        }) & PermissionsBits.VIEW_CHANNEL
                )
                .map((data) => {
                    const m: any = {
                        user: {
                            id: data.userId,
                        },
                        roles: data.roles,
                        premium_since: data.premiumSince,
                        pending: data.isPending,
                        nick: data.nick,
                        joined_at: data.joinedAt,
                        flags: (data as any).flags,
                        communication_disabled_until:
                            data.communicationDisabledUntil,
                        avatar: data.avatar,
                        status: PresenceStore.getStatus(data.userId) || 'offline',
                    };
                    const role = roleSort.find(r => m.roles.includes(r.id));
                    m.hoistRoleId = role?.id
                    if (!role) m.position = 0;
                    else m.position = role.position;
                    return m;
                });
            const membersOnline = convertMembersToRaw.filter(m => m.status !== 'offline').sort((x, y) => y.position - x.position);
            const membersOffline = convertMembersToRaw.length > 1000 ? [] : convertMembersToRaw.filter(m => m.status == 'offline').sort((x, y) => y.position - x.position);
            // Group
            function getGroup(arr, off) {
                let all: any[] = []
                let all2: any[] = []
                const list_ = {}
                for (const member of arr) {
                    list_[member.hoistRoleId || 'online'] = {
                        group: {
                            id: member.hoistRoleId || 'online',
                            count: (list_[member.hoistRoleId || 'online']?.group?.count || 0) + 1
                        },
                        members: [member, ...(list_[member.hoistRoleId || 'online']?.members || [])]
                    }
                }
                for (const key in list_) {
                    list_[key].members.sort((x, y) =>
                        (x.nick || x.user.username || '').localeCompare(
                            y.nick || y.user.username || '',
                        ),
                    );
                    all.push({
                        group: list_[key].group
                    });
                    all2.push(list_[key].group);
                    all = [...all, ...(list_[key].members.map(m => {
                        return {
                            member: m
                        }
                    }))]
                }
                if (off.length > 0) {
                    let d = {
                        id: "offline",
                        count: off.length
                    }
                    all.push({
                        group: d
                    });
                    all2.push(d);
                    all = [...all, ...(off.map(m => {
                        return {
                            member: m
                        }
                    }))]
                }
                return {
                    ops: all,
                    group: all2,
                }
            }
            let groups = getGroup(membersOnline, membersOffline);
            // WS
            groups.ops.sort((a, b) => (guild.roles[b.id]?.position || 0) - (guild.roles[a.id]?.position || 0))
            groups.group.sort((a, b) => (guild.roles[b.id]?.position || 0) - (guild.roles[a.id]?.position || 0))
            let ops = [{
                items: groups.ops,
                op: "SYNC",
                range: [0, 99]
            }];
            FluxDispatcher.dispatch({
                guildId: guild.id,
                id: memberListId,
                ops,
                groups: groups.group,
                onlineCount: membersOnline.length,
                memberCount: member_count,
                type: 'GUILD_MEMBER_LIST_UPDATE',
            });
        }

        if (this.settings.store.memberListInterval) {
            setTimeout(() => {
                doRefreshMemberList();
            }, this.settings.store.memberListInterval * 1000);
        }
    },
});
