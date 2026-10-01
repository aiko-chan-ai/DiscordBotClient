/* Copyright Elysia © 2025. All rights reserved */

import { APIApplication, ApplicationFlags, GatewayIntentBits } from "discord-api-types/v10";
import { app, BrowserWindow, dialog } from "electron";
import { ApplicationFlagsBitField, IntentsBitField } from "src/AppUtils/DiscordBitField";
import { ApexExperiment, GuildExperiment, UserExperiment } from "src/AppUtils/Experiments";

import { DiscordBotClient } from ".";
import Constants from "./Constants";
import { IPCEvent } from "./IPCEvents";

export function setupIPCEvents (mainApp: DiscordBotClient) {
    const getWindow = (framename: string) => {
        return mainApp.childWindows.get(framename) ?? mainApp.appWindow;
    };
    mainApp.ipcMain
        .on(IPCEvent.Minimize, (event, frameName) => {
            getWindow(frameName).minimize();
        })
        .on(IPCEvent.Maximize, (event, frameName) => {
            const win = getWindow(frameName);
            if (win.isMaximized()) {
                win.restore();
            } else {
                win.maximize();
            }
        })
        .on(IPCEvent.Close, (event, frameName) => {
            if (frameName) {
                return mainApp.childWindows.get(frameName)?.close();
            }
            mainApp.appWindow.hide();
        })
        .on(IPCEvent.Focus, (event, frameName) => {
            if (!frameName) return mainApp.showApp();
            const win = getWindow(frameName);
            // this.appWindow.focus();
            win.show();
            win.setSkipTaskbar(false);
        })
        .on(IPCEvent.FlashFrame, (event, flag: boolean) => {
            if (!mainApp.appWindow || mainApp.appWindow.isDestroyed() || (flag && mainApp.appWindow.isFocused()))
            { return; }
            mainApp.appWindow.flashFrame(flag);
        })
        .on(IPCEvent.RequestCloseWindow, event => {
            const win = BrowserWindow.fromWebContents(event.sender);
            win?.close();
        });
    mainApp.ipcMain.handle(IPCEvent.GetBotInfo, (event, token) => {
        token = token.replace(/Bot/g, "").trim();
        return mainApp.discordSession
            .fetch("https://canary.discord.com/api/v9/applications/@me?with_counts=true", {
                headers: {
                    Authorization: `Bot ${token}`,
                    "User-Agent": Constants.UserAgentDiscordBot,
                },
            })
            .then(res => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json() as Promise<APIApplication>;
            })
            .then(data => {
                const applicationFlags = new ApplicationFlagsBitField(data.flags);
                const skipIntents = new Set<GatewayIntentBits>([
                    GatewayIntentBits.GuildPresences,
                    GatewayIntentBits.GuildMembers,
                    GatewayIntentBits.MessageContent,
                ]);
                if (
                    applicationFlags.has(ApplicationFlags.GatewayPresence) ||
                    applicationFlags.has(ApplicationFlags.GatewayPresenceLimited)
                ) {
                    skipIntents.delete(GatewayIntentBits.GuildPresences);
                }
                if (
                    applicationFlags.has(ApplicationFlags.GatewayGuildMembers) ||
                    applicationFlags.has(ApplicationFlags.GatewayGuildMembersLimited)
                ) {
                    skipIntents.delete(GatewayIntentBits.GuildMembers);
                }
                if (
                    applicationFlags.has(ApplicationFlags.GatewayMessageContent) ||
                    applicationFlags.has(ApplicationFlags.GatewayMessageContentLimited)
                ) {
                    skipIntents.delete(GatewayIntentBits.MessageContent);
                }
                if (
                    skipIntents.has(GatewayIntentBits.MessageContent) &&
                    !mainApp.config.config.suppress_intent_warning
                ) {
                    dialog.showErrorBox(
                        "MessageContent is required",
                        "You need to enable the MessageContent intent in the application settings.\nIf you want to permanently suppress this warning, change the application settings (accessible from the tray menu via right-click)",
                    );
                    throw new Error("MESSAGE_CONTENT is required.");
                }
                return {
                    success: true,
                    data,
                    intents: IntentsBitField.getIntents(...Array.from(skipIntents)),
                    allShards:
                        Math.ceil(
                            ((
                                data as APIApplication & {
                                    // New field, it reflects the number of guilds that have actually added this application as a bot profile
                                    // @undocumented
                                    bot_approximate_guild_count?: number;
                                }
                            ).bot_approximate_guild_count ??
                                // Old field, it reflects the number of guilds that have added this application as an intergration
                                data.approximate_guild_count ??
                                0) / Number(mainApp.config.config.guilds_per_shard),
                        ) || 1,
                };
            })
            .catch(e => {
                return {
                    success: false,
                    message: e.message,
                };
            });
    });
    mainApp.ipcMain.handle(IPCEvent.RequestOpenMessageEditorWindow, () => {
        return mainApp.openDiscordMessageEditorWindow();
    });
    mainApp.ipcMain
        .on(IPCEvent.GetVersion, event => {
            return (event.returnValue = app.getVersion());
        })
        .on(IPCEvent.GetName, event => {
            return (event.returnValue = app.getName());
        })
        .on(IPCEvent.GetExperiment, (event, type, botId, allData) => {
            if (type === "user") {
                event.returnValue = UserExperiment(allData, botId);
            } else if (type === "guild") {
                event.returnValue = GuildExperiment();
            } else if (type === "apex") {
                event.returnValue = ApexExperiment(botId);
            }
        })
        .on(IPCEvent.GetDefaultUserPatch, event => {
            event.returnValue = Constants.UserDefaultPatch;
        });
}
