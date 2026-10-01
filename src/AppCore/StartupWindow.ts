/* Copyright Elysia © 2025. All rights reserved */

import { app, BrowserWindow, dialog, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import path from "path";

export type StartupState = { phase: "starting" | "loading" | "error"; message: string };

export class StartupWindow {
    readonly window: BrowserWindow;
    private state: StartupState = { phase: "starting", message: "Starting..." };
    private timer?: ReturnType<typeof setTimeout>;

    constructor (retry: () => void, quit: () => void) {
        this.window = new BrowserWindow({
            width: 300,
            height: 350,
            resizable: false,
            maximizable: false,
            frame: false,
            show: false,
            backgroundColor: "#282b30",
            title: "DiscordBotClient",
            autoHideMenuBar: true,
            webPreferences: {
                preload: path.join(__dirname, "StartupPreload.js"),
                contextIsolation: true,
                sandbox: true,
                nodeIntegration: false,
                partition: "startup",
            },
        });
        const contents = this.window.webContents;
        const isOwner = (event: IpcMainEvent | IpcMainInvokeEvent) =>
            event.sender === contents && event.senderFrame === contents.mainFrame;
        contents.ipc.handle("startup:get-state", event => (isOwner(event) ? this.state : undefined));
        contents.ipc.on("startup:retry", event => {
            if (isOwner(event) && this.state.phase === "error") retry();
        });
        contents.ipc.on("startup:quit", event => {
            if (isOwner(event)) quit();
        });
        contents.setWindowOpenHandler(() => ({ action: "deny" }));
        contents.on("will-navigate", event => event.preventDefault());
        this.window.on("close", quit);
        this.window.on("closed", () => clearTimeout(this.timer));
        this.window.once("ready-to-show", () => this.show());
        void this.window.loadFile(path.join(app.getAppPath(), "assets", "startup", "index.html")).catch(() => {
            if (this.window.isDestroyed()) return;
            dialog.showErrorBox(
                "Startup failed",
                "The startup screen could not be loaded. Please reinstall DiscordBotClient.",
            );
            quit();
        });
    }

    show () {
        if (!this.window.isDestroyed()) this.window.show();
    }

    loading () {
        this.update({ phase: "loading", message: "Loading DBC..." });
        clearTimeout(this.timer);
        this.timer = setTimeout(
            () => this.fail("DBC is taking too long to start. Check your connection and try again."),
            45000,
        );
    }

    fail (message: string) {
        clearTimeout(this.timer);
        this.update({ phase: "error", message });
        this.show();
    }

    private update (state: StartupState) {
        this.state = state;
        if (!this.window.isDestroyed()) this.window.webContents.send("startup:state", state);
    }

    finish () {
        clearTimeout(this.timer);
        if (!this.window.isDestroyed()) this.window.destroy();
    }
}
