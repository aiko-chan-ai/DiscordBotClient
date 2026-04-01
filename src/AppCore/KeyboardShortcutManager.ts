/* Copyright xql.dev © 2026. All rights reserved */

import { app, globalShortcut, ipcMain, BrowserWindow } from "electron";
import EventEmitter from "events";

export interface KeyboardShortcut {
    id: string;
    name: string;
    description: string;
    accelerator: string;
    action: () => void;
    enabled: boolean;
    scope: "global" | "local";
}

export class KeyboardShortcutManager extends EventEmitter {
    private shortcuts: Map<string, KeyboardShortcut> = new Map();
    private windowShortcuts: Map<string, Set<string>> = new Map();

    constructor() {
        super();
        this.registerDefaultShortcuts();
        this.setupIPC();
        
        app.whenReady().then(() => {
            this.registerPendingGlobalShortcuts();
        });
    }

    private registerPendingGlobalShortcuts(): void {
        this.shortcuts.forEach(shortcut => {
            if (shortcut.scope === "global" && shortcut.enabled) {
                globalShortcut.register(shortcut.accelerator, shortcut.action);
            }
        });
    }

    private registerDefaultShortcuts(): void {
        this.register({
            id: "quick-switch",
            name: "Quick Switch",
            description: "Quickly switch between channels/guilds",
            accelerator: "CommandOrControl+K",
            action: () => this.emit("quick-switch"),
            enabled: true,
            scope: "local",
        });

        this.register({
            id: "reload",
            name: "Reload",
            description: "Reload the current page",
            accelerator: "CommandOrControl+R",
            action: () => {
                const win = BrowserWindow.getFocusedWindow();
                if (win) win.webContents.reload();
            },
            enabled: true,
            scope: "local",
        });

        this.register({
            id: "toggle-devtools",
            name: "Toggle DevTools",
            description: "Toggle developer tools",
            accelerator: "F12",
            action: () => {
                const win = BrowserWindow.getFocusedWindow();
                if (win) win.webContents.toggleDevTools();
            },
            enabled: true,
            scope: "local",
        });

        this.register({
            id: "quit",
            name: "Quit Application",
            description: "Quit the application",
            accelerator: "CommandOrControl+Q",
            action: () => app.quit(),
            enabled: true,
            scope: "global",
        });

        this.register({
            id: "hide",
            name: "Hide Window",
            description: "Hide the application window",
            accelerator: "CommandOrControl+H",
            action: () => {
                const win = BrowserWindow.getFocusedWindow();
                if (win) win.hide();
            },
            enabled: true,
            scope: "local",
        });

        this.register({
            id: "new-direct-message",
            name: "New Direct Message",
            description: "Start a new direct message",
            accelerator: "CommandOrControl+N",
            action: () => this.emit("new-dm"),
            enabled: true,
            scope: "local",
        });

        this.register({
            id: "mark-read",
            name: "Mark as Read",
            description: "Mark current channel as read",
            accelerator: "Escape",
            action: () => this.emit("mark-read"),
            enabled: true,
            scope: "local",
        });

        this.register({
            id: "search",
            name: "Search",
            description: "Open search in current guild",
            accelerator: "CommandOrControl+F",
            action: () => this.emit("search"),
            enabled: true,
            scope: "local",
        });

        this.register({
            id: "emoji-picker",
            name: "Emoji Picker",
            description: "Open emoji picker",
            accelerator: "CommandOrControl+E",
            action: () => this.emit("emoji-picker"),
            enabled: true,
            scope: "local",
        });

        this.register({
            id: "gif-picker",
            name: "GIF Picker",
            description: "Open GIF picker",
            accelerator: "CommandOrControl+G",
            action: () => this.emit("gif-picker"),
            enabled: true,
            scope: "local",
        });

        this.register({
            id: "quick-reaction",
            name: "Quick Reaction",
            description: "Add quick reaction to last message",
            accelerator: "CommandOrControl+Shift+\\",
            action: () => this.emit("quick-reaction"),
            enabled: true,
            scope: "local",
        });

        this.register({
            id: "edit-last",
            name: "Edit Last Message",
            description: "Edit your last message",
            accelerator: "ArrowUp",
            action: () => this.emit("edit-last"),
            enabled: true,
            scope: "local",
        });

        this.register({
            id: "navigate-up",
            name: "Navigate Up",
            description: "Navigate to channel above",
            accelerator: "Alt+ArrowUp",
            action: () => this.emit("navigate-up"),
            enabled: true,
            scope: "local",
        });

        this.register({
            id: "navigate-down",
            name: "Navigate Down",
            description: "Navigate to channel below",
            accelerator: "Alt+ArrowDown",
            action: () => this.emit("navigate-down"),
            enabled: true,
            scope: "local",
        });

        this.register({
            id: "navigate-back",
            name: "Navigate Back",
            description: "Go back to previous channel",
            accelerator: "Alt+ArrowLeft",
            action: () => this.emit("navigate-back"),
            enabled: true,
            scope: "local",
        });

        this.register({
            id: "navigate-forward",
            name: "Navigate Forward",
            description: "Go forward to next channel",
            accelerator: "Alt+ArrowRight",
            action: () => this.emit("navigate-forward"),
            enabled: true,
            scope: "local",
        });
    }

    private setupIPC(): void {
        ipcMain.handle("shortcut:register", (_, shortcut: Omit<KeyboardShortcut, "action">) => {
            this.register({
                ...shortcut,
                action: () => this.emit(shortcut.id),
            });
            return true;
        });

        ipcMain.handle("shortcut:unregister", (_, id: string) => {
            return this.unregister(id);
        });

        ipcMain.handle("shortcut:update", (_, id: string, accelerator: string) => {
            return this.updateAccelerator(id, accelerator);
        });

        ipcMain.handle("shortcut:list", () => {
            return this.getAllShortcuts();
        });

        ipcMain.handle("shortcut:trigger", (_, id: string) => {
            this.trigger(id);
            return true;
        });
    }

    register(shortcut: KeyboardShortcut): void {
        this.shortcuts.set(shortcut.id, shortcut);

        if (shortcut.scope === "global" && shortcut.enabled && app.isReady()) {
            globalShortcut.register(shortcut.accelerator, shortcut.action);
        }

        this.emit("registered", shortcut);
    }

    unregister(id: string): boolean {
        const shortcut = this.shortcuts.get(id);
        if (!shortcut) return false;

        if (shortcut.scope === "global") {
            globalShortcut.unregister(shortcut.accelerator);
        }

        this.shortcuts.delete(id);
        this.emit("unregistered", id);
        return true;
    }

    updateAccelerator(id: string, accelerator: string): boolean {
        const shortcut = this.shortcuts.get(id);
        if (!shortcut) return false;

        if (shortcut.scope === "global" && shortcut.enabled) {
            globalShortcut.unregister(shortcut.accelerator);
        }

        shortcut.accelerator = accelerator;

        if (shortcut.scope === "global" && shortcut.enabled) {
            globalShortcut.register(accelerator, shortcut.action);
        }

        this.emit("updated", shortcut);
        return true;
    }

    enable(id: string): boolean {
        const shortcut = this.shortcuts.get(id);
        if (!shortcut) return false;

        shortcut.enabled = true;

        if (shortcut.scope === "global") {
            globalShortcut.register(shortcut.accelerator, shortcut.action);
        }

        return true;
    }

    disable(id: string): boolean {
        const shortcut = this.shortcuts.get(id);
        if (!shortcut) return false;

        shortcut.enabled = false;

        if (shortcut.scope === "global") {
            globalShortcut.unregister(shortcut.accelerator);
        }

        return true;
    }

    trigger(id: string): boolean {
        const shortcut = this.shortcuts.get(id);
        if (!shortcut || !shortcut.enabled) return false;

        shortcut.action();
        return true;
    }

    getShortcut(id: string): KeyboardShortcut | undefined {
        return this.shortcuts.get(id);
    }

    getAllShortcuts(): KeyboardShortcut[] {
        return Array.from(this.shortcuts.values());
    }

    getShortcutsByScope(scope: "global" | "local"): KeyboardShortcut[] {
        return this.getAllShortcuts().filter(s => s.scope === scope);
    }

    bindToWindow(windowId: number, shortcutIds: string[]): void {
        this.windowShortcuts.set(String(windowId), new Set(shortcutIds));
    }

    unbindFromWindow(windowId: number): void {
        this.windowShortcuts.delete(String(windowId));
    }

    dispose(): void {
        globalShortcut.unregisterAll();
        this.shortcuts.clear();
        this.windowShortcuts.clear();
    }
}

export default new KeyboardShortcutManager();
