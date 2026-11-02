/* Copyright Elysia © 2025. All rights reserved */

import { app, BrowserWindow, dialog, IpcMainEvent, IpcMainInvokeEvent, screen, shell } from "electron";
import path from "path";

export type StartupState = { phase: "starting" | "loading" | "ready" | "error"; message?: string };

export class StartupWindow {
    readonly window: BrowserWindow;
    private state: StartupState = { phase: "starting" };
    private timer?: ReturnType<typeof setTimeout>;
    private animationDone = false;
    private revealApplication?: () => void;
    private animationWait?: { resolve: (completed: boolean) => void; timer: ReturnType<typeof setTimeout> };

    constructor (retry: () => void, quit: () => void) {
        const area = screen.getPrimaryDisplay().workAreaSize;
        this.window = new BrowserWindow({
            width: Math.max(940, Math.floor(area.width * 0.9)),
            height: Math.max(500, Math.floor(area.height * 0.9)),
            resizable: false,
            maximizable: false,
            frame: false,
            show: false,
            transparent: true,
            hasShadow: false,
            backgroundColor: "#00000000",
            title: "DiscordBotClient",
            autoHideMenuBar: true,
            webPreferences: {
                preload: path.join(__dirname, "..", "Preloads", "StartupPreload.js"),
                contextIsolation: true,
                sandbox: true,
                nodeIntegration: false,
                partition: "startup",
                backgroundThrottling: false,
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
        contents.ipc.handle("startup:artwork-credit", event => {
            if (isOwner(event)) return shell.openExternal("https://www.mihoyo.com/");
        });
        contents.ipc.on("startup:animation-finished", event => {
            if (!isOwner(event)) return;
            this.animationDone = true;
            this.settleAnimation(true);
        });
        contents.ipc.on("startup:reveal", event => {
            if (!isOwner(event) || this.state.phase !== "ready") return;
            const reveal = this.revealApplication;
            this.revealApplication = undefined;
            reveal?.();
        });
        contents.setWindowOpenHandler(() => ({ action: "deny" }));
        contents.on("will-navigate", event => event.preventDefault());
        this.window.on("close", quit);
        this.window.on("closed", () => {
            clearTimeout(this.timer);
            this.settleAnimation(false);
        });
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
        this.update({ phase: "loading" });
        clearTimeout(this.timer);
        this.timer = setTimeout(
            () => this.fail("DBC is taking too long to start. Check your connection and try again."),
            45000,
        );
    }

    fail (message: string) {
        clearTimeout(this.timer);
        this.settleAnimation(false);
        this.update({ phase: "error", message });
        this.show();
    }

    private update (state: StartupState) {
        this.state = state;
        if (!this.window.isDestroyed()) this.window.webContents.send("startup:state", state);
    }

    waitForAnimation (reveal?: () => void): Promise<boolean> {
        if (this.window.isDestroyed() || this.state.phase === "error") return Promise.resolve(false);
        clearTimeout(this.timer);
        this.revealApplication = reveal;
        this.update({ phase: "ready" });
        if (this.animationDone) return Promise.resolve(true);
        return new Promise(resolve => {
            // Decorative renderer failures must not trap a successfully loaded application.
            this.animationWait = { resolve, timer: setTimeout(() => this.settleAnimation(true), 15000) };
        });
    }

    private settleAnimation (completed: boolean) {
        const pending = this.animationWait;
        this.animationWait = undefined;
        this.revealApplication = undefined;
        if (!pending) return;
        clearTimeout(pending.timer);
        pending.resolve(completed);
    }

    finish () {
        clearTimeout(this.timer);
        this.settleAnimation(false);
        if (!this.window.isDestroyed()) this.window.destroy();
    }
}
