/* Copyright Elysia © 2025. All rights reserved */

import { APIApplication, ApplicationFlags, GatewayIntentBits } from "discord-api-types/v10";
import { app, BrowserWindow, dialog, IpcMainEvent, IpcMainInvokeEvent, WebContents } from "electron";
import { ApplicationFlagsBitField, IntentsBitField } from "src/AppUtils/DiscordBitField";
import { ApexExperiment, GuildExperiment, UserExperiment } from "src/AppUtils/Experiments";

import type { DiscordBotClient } from ".";
import Constants from "./Constants";
import { IPCEvent } from "./IPCEvents";

export function isTrustedAppFrame (event: IpcMainEvent | IpcMainInvokeEvent, contents: WebContents | undefined): boolean {
    if (!contents || event.sender !== contents || event.senderFrame !== contents.mainFrame) return false;
    try {
        return new URL(event.senderFrame.url).origin === `https://${Constants.CustomDiscordDomain}`;
    } catch {
        return false;
    }
}

export function isAllowedPopoutURL (url: string, port: number): boolean {
    if (url === "about:blank") return true;
    try {
        const parsed = new URL(url);
        return parsed.pathname === "/popout" && [
            "https://discord.com",
            "https://ptb.discord.com",
            "https://canary.discord.com",
            `https://localhost:${port}`,
        ].includes(parsed.origin);
    } catch {
        return false;
    }
}

export function setupIPCEvents (mainApp: DiscordBotClient) {
    const getWindow = (event: IpcMainEvent, frameName?: string): BrowserWindow | undefined => {
        if (!event.senderFrame || event.senderFrame !== event.sender.mainFrame) return;
        if (isTrustedAppFrame(event, mainApp.discordWebContents)) {
            return frameName ? mainApp.childWindows.get(frameName) : mainApp.appWindow;
        }
        const senderWindow = BrowserWindow.fromWebContents(event.sender);
        if (!senderWindow || ![...mainApp.childWindows.values()].includes(senderWindow)) return;
        if (isAllowedPopoutURL(event.senderFrame.url, mainApp.port)) return senderWindow;
    };
    mainApp.ipcMain
        .on(IPCEvent.Minimize, (event, frameName) => {
            getWindow(event, frameName)?.minimize();
        })
        .on(IPCEvent.Maximize, (event, frameName) => {
            const win = getWindow(event, frameName);
            if (!win) return;
            if (win.isMaximized()) {
                win.restore();
            } else {
                win.maximize();
            }
        })
        .on(IPCEvent.Close, (event, frameName) => {
            const win = getWindow(event, frameName);
            if (!win) return;
            if (win === mainApp.appWindow) win.hide();
            else win.close();
        })
        .on(IPCEvent.Focus, (event, frameName) => {
            const win = getWindow(event, frameName);
            if (!win) return;
            if (win === mainApp.appWindow && !frameName) return mainApp.showApp();
            // this.appWindow.focus();
            win.show();
            win.setSkipTaskbar(false);
        })
        .on(IPCEvent.FlashFrame, (event, flag: boolean) => {
            if (!getWindow(event) || !mainApp.appWindow || mainApp.appWindow.isDestroyed() || (flag && mainApp.appWindow.isFocused()))
            { return; }
            mainApp.appWindow.flashFrame(flag);
        })
        .on(IPCEvent.RequestCloseWindow, event => {
            getWindow(event)?.close();
        });
    mainApp.ipcMain.handle(IPCEvent.GetBotInfo, (event, token) => {
        if (!isTrustedAppFrame(event, mainApp.discordWebContents)) throw new Error("Unauthorized IPC sender.");
        if (typeof token !== "string" || token.length > 512) throw new Error("Invalid bot token.");
        token = token.replace(/Bot /gi, "").trim();
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
    mainApp.ipcMain.handle(IPCEvent.RequestOpenMessageEditorWindow, event => {
        if (!isTrustedAppFrame(event, mainApp.discordWebContents)) throw new Error("Unauthorized IPC sender.");
        return mainApp.openDiscordMessageEditorWindow();
    });
    mainApp.ipcMain
        .on(IPCEvent.GetVersion, event => {
            event.returnValue = isTrustedAppFrame(event, mainApp.discordWebContents) ? app.getVersion() : null;
        })
        .on(IPCEvent.GetName, event => {
            event.returnValue = isTrustedAppFrame(event, mainApp.discordWebContents) ? app.getName() : null;
        })
        .on(IPCEvent.GetExperiment, (event, type, botId, allData) => {
            if (!isTrustedAppFrame(event, mainApp.discordWebContents)) {
                event.returnValue = null;
            } else if (type === "user") {
                event.returnValue = UserExperiment(allData, botId);
            } else if (type === "guild") {
                event.returnValue = GuildExperiment();
            } else if (type === "apex") {
                event.returnValue = ApexExperiment(botId);
            } else {
                event.returnValue = null;
            }
        })
        .on(IPCEvent.GetDefaultUserPatch, event => {
            event.returnValue = isTrustedAppFrame(event, mainApp.discordWebContents) ? Constants.UserDefaultPatch : null;
        });
}
