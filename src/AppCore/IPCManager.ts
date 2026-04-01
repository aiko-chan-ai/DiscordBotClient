/* Copyright Elysia © 2025. All rights reserved */

import { APIApplication, ApplicationFlags, GatewayIntentBits } from "discord-api-types/v10";
import { app, BrowserWindow, dialog } from "electron";
import { ApplicationFlagsBitField, IntentsBitField } from "src/AppUtils/DiscordBitField";
import { ApexExperiment, GuildExperiment, UserExperiment } from "src/AppUtils/Experiments";

import { DiscordBotClient } from ".";
import Constants from "./Constants";
import { IPCEvent } from "./IPCEvents";

export function setupIPCEvents(mainApp: DiscordBotClient) {
    const getWindow = (framename: string) => {
        return mainApp.childWindows.get(framename) ?? mainApp.win;
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
            mainApp.win.hide();
        })
        .on(IPCEvent.Focus, (event, frameName) => {
            const win = getWindow(frameName);
            win.show();
            win.setSkipTaskbar(false);
        })
        .on(IPCEvent.FlashFrame, (event, flag: boolean) => {
            if (!mainApp.win || mainApp.win.isDestroyed() || (flag && mainApp.win.isFocused())) return;
            mainApp.win.flashFrame(flag);
        })
        .on(IPCEvent.RequestCloseWindow, event => {
            const win = BrowserWindow.fromWebContents(event.sender);
            win?.close();
        });

    mainApp.ipcMain.handle("multibot:get-all", () => mainApp.multiBotManager.getAllBots());
    mainApp.ipcMain.handle("multibot:get-active", () => mainApp.multiBotManager.getActiveBot());
    mainApp.ipcMain.handle("multibot:add", (_, name: string, token: string, avatar?: string) =>
        mainApp.multiBotManager.addBot(name, token, avatar),
    );
    mainApp.ipcMain.handle("multibot:switch", (_, id: string) => mainApp.multiBotManager.switchBot(id));
    mainApp.ipcMain.handle("multibot:remove", (_, id: string) => mainApp.multiBotManager.removeBot(id));

    mainApp.ipcMain.handle("templates:get-all", () => mainApp.templateManager.getAllTemplates());
    mainApp.ipcMain.handle("templates:create", (_, name: string, content?: string, embeds?: unknown[]) =>
        mainApp.templateManager.createTemplate(name, content, embeds as never),
    );
    mainApp.ipcMain.handle("templates:update", (_, id: string, updates: unknown) =>
        mainApp.templateManager.updateTemplate(id, updates as never),
    );
    mainApp.ipcMain.handle("templates:delete", (_, id: string) => mainApp.templateManager.deleteTemplate(id));
    mainApp.ipcMain.handle("templates:search", (_, query: string) => mainApp.templateManager.searchTemplates(query));

    mainApp.ipcMain.handle("scheduled:get-pending", () => mainApp.scheduledMessages.getPendingMessages());
    mainApp.ipcMain.handle("scheduled:cancel", (_, id: string) => mainApp.scheduledMessages.cancel(id));

    mainApp.ipcMain.handle("themes:get-all", () => mainApp.themeManager.getAllThemes());
    mainApp.ipcMain.handle("themes:get-active", () => mainApp.themeManager.getActiveTheme());
    mainApp.ipcMain.handle("themes:create", (_, name: string, css: string) =>
        mainApp.themeManager.createTheme(name, css),
    );
    mainApp.ipcMain.handle("themes:activate", (_, id: string) => mainApp.themeManager.activateTheme(id));
    mainApp.ipcMain.handle("themes:deactivate", () => mainApp.themeManager.deactivateTheme());
    mainApp.ipcMain.handle("themes:get-css", () => mainApp.themeManager.getCombinedCSS());

    mainApp.ipcMain.handle("shortcuts:list", () => mainApp.keyboardShortcuts.getAllShortcuts());
    mainApp.ipcMain.handle("shortcuts:trigger", (_, id: string) => mainApp.keyboardShortcuts.trigger(id));

    mainApp.ipcMain.handle("notifications:get-filters", () => mainApp.notificationFilters.getAllFilters());
    mainApp.ipcMain.handle("notifications:set-dnd", (_, enabled: boolean) =>
        mainApp.notificationFilters.setDoNotDisturb(enabled),
    );

    mainApp.ipcMain.handle("secure:save", (_, key: string, value: string) =>
        mainApp.secureStorage.saveSecureData(key, value),
    );
    mainApp.ipcMain.handle("secure:load", (_, key: string) => mainApp.secureStorage.loadSecureData(key));
    mainApp.ipcMain.handle("secure:delete", (_, key: string) => mainApp.secureStorage.deleteSecureData(key));
    mainApp.ipcMain.handle(IPCEvent.GetBotInfo, (event, token) => {
        token = token.replace(/Bot/g, "").trim();
        return mainApp.session
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
                            (data.approximate_guild_count ?? 0) / Number(mainApp.config.config.guilds_per_shard),
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
    // Config Editor
    mainApp.ipcMain.handle(IPCEvent.MonacoEditorGetConfig, event => {
        return mainApp.config.toString();
    });
    mainApp.ipcMain.handle(IPCEvent.MonacoEditorGetAutoComplete, event => {
        return mainApp.config.monacoAutoComplete();
    });
    mainApp.ipcMain.handle(IPCEvent.MonacoEditorSaveConfig, (event, config) => {
        // Validate and save the config
        try {
            mainApp.config.loadConfig(config);
            mainApp.config.save();
            mainApp.logger.info("Config saved successfully");
            return true;
        } catch (e) {
            mainApp.logger.error("Invalid config:", e);
            dialog.showErrorBox("Invalid Config", `The provided config is invalid: ${(e as Error).message}`);
            return false;
        }
    });
}
