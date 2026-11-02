/* Copyright Elysia © 2025. All rights reserved */

import { contextBridge, ipcRenderer } from "electron";

import { IPCEvent } from "../IPCEvents";

type LogLevel = "log" | "info" | "warn" | "error" | "debug";

class Logger {
    _log (scope: string, level: LogLevel, color: string, args: unknown[]) {
        console[level](
            `%c MainProcess %c %c ${scope || "Unknown"} `,
            `background: ${color}; color: black; font-weight: bold; border-radius: 5px;`,
            "",
            "background: #99d1db; color: black; font-weight: bold; border-radius: 5px;",
            ...args,
        );
    }

    log (scope: string, ...args: unknown[]) {
        this._log(scope, "log", "#a6d189", args);
    }
    info (scope: string, ...args: unknown[]) {
        this._log(scope, "info", "#a6d189", args);
    }
    error (scope: string, ...args: unknown[]) {
        this._log(scope, "error", "#e78284", args);
    }
    warn (scope: string, ...args: unknown[]) {
        this._log(scope, "warn", "#e5c890", args);
    }
    debug (scope: string, ...args: unknown[]) {
        this._log(scope, "debug", "#eebebe", args);
    }
}

const logger = new Logger();
ipcRenderer.on(IPCEvent.LogFromMainProcess, (_event, scope, level: LogLevel, ...args) => {
    logger[level](scope, ...args);
});

contextBridge.exposeInMainWorld("BotClientNative", {
    getBotInfo: (token: string) => {
        return ipcRenderer.invoke(IPCEvent.GetBotInfo, token);
    },
    getBotClientVersion () {
        return ipcRenderer.sendSync(IPCEvent.GetVersion);
    },
    getBotClientName () {
        return ipcRenderer.sendSync(IPCEvent.GetName);
    },
    getPrivateChannelDefault () {
        return {
            type: 1,
            recipients: [ipcRenderer.sendSync(IPCEvent.GetDefaultUserPatch)],
            last_message_id: "1000000000000000000",
            is_spam: false,
            id: "1000000000000000000",
            flags: 0,
        };
    },
    getUserExperiments (allData: Record<string, string>[], botId?: string) {
        return ipcRenderer.sendSync(IPCEvent.GetExperiment, "user", botId, allData);
    },
    getGuildExperiments () {
        return ipcRenderer.sendSync(IPCEvent.GetExperiment, "guild");
    },
    getApexExperiments (botId: string) {
        return ipcRenderer.sendSync(IPCEvent.GetExperiment, "apex", botId);
    },
    closeWindow: () => {
        ipcRenderer.send(IPCEvent.RequestCloseWindow);
    },
    // Vesktop
    close (frameName: string) {
        ipcRenderer.send(IPCEvent.Close, frameName);
    },
    minimize (frameName: string) {
        ipcRenderer.send(IPCEvent.Minimize, frameName);
    },
    maximize (frameName: string) {
        ipcRenderer.send(IPCEvent.Maximize, frameName);
    },
    focus (frameName: string) {
        ipcRenderer.send(IPCEvent.Focus, frameName);
    },
    flashFrame (flag: boolean) {
        ipcRenderer.send(IPCEvent.FlashFrame, flag);
    },
    // Beta Features
    requestOpenMessageEditorWindow () {
        return ipcRenderer.invoke(IPCEvent.RequestOpenMessageEditorWindow);
    },
});

ipcRenderer.on(IPCEvent.MainAppReceiveEditorPort, event => {
    const port = event.ports[0];
    window.postMessage("forward-editor-port", "*", [port]);
});

/*
contextBridge.exposeInMainWorld("ipcRender", {
    // From render to main (1-way)
    send: (channel: string, ...args: unknown[]) => {
        ipcRenderer.send(channel, ...args);
    },
    // From main to render (1-way)
    receive: (channel: string, listener: (...args: unknown[]) => unknown) => {
        ipcRenderer.on(channel, (event, ...args) => listener(...args));
    },
    // From render to main and back again (2-way)
    invoke: (channel: string, ...args: unknown[]) => {
        return ipcRenderer.invoke(channel, args);
    },
});
*/

contextBridge.exposeInMainWorld("protoAPI", {
    GetPreloadedUserSettings: (listener: (botId: string) => unknown) => {
        ipcRenderer.on(IPCEvent.GetPreloadedUserSettings, (event, botId) => listener(botId));
    },
    GetPreloadedUserSettingsResponse: (botId: string, settings: string) => {
        ipcRenderer.send(IPCEvent.GetPreloadedUserSettingsResponse, botId, settings);
    },
    SetPreloadedUserSettings: (listener: (botId: string, settings: string) => unknown) => {
        ipcRenderer.on(IPCEvent.SetPreloadedUserSettings, (event, botId, settings) => listener(botId, settings));
    },
    //
    GetFrecencyUserSettings: (listener: (botId: string) => unknown) => {
        ipcRenderer.on(IPCEvent.GetFrecencyUserSettings, (event, botId) => listener(botId));
    },
    GetFrecencyUserSettingsResponse: (botId: string, settings: string) => {
        ipcRenderer.send(IPCEvent.GetFrecencyUserSettingsResponse, botId, settings);
    },
    SetFrecencyUserSettings: (listener: (botId: string, settings: string) => unknown) => {
        ipcRenderer.on(IPCEvent.SetFrecencyUserSettings, (event, botId, settings) => listener(botId, settings));
    },
});
