/* Copyright Elysia © 2025. All rights reserved */

import { randomUUID } from "crypto";
import {
    app,
    BrowserWindow,
    dialog,
    ipcMain,
    Menu,
    MessageChannelMain,
    Notification,
    NotificationConstructorOptions,
    protocol,
    screen,
    session,
    shell,
    systemPreferences,
    Tray,
} from "electron";
import contextMenu from "electron-context-menu";
import { scope } from "electron-log";
import { autoUpdater } from "electron-updater";
import EventEmitter from "events";
import fs from "fs";
import path from "path";

import server from "./APIServer";
import GlobalConfig from "./Config";
import Constants from "./Constants";
import { IPCEvent } from "./IPCEvents";
import { setupIPCEvents } from "./IPCManager";
import messageEditor from "./MessageEditorServer";

export class DiscordBotClient extends EventEmitter {
    logger = scope(Constants.AppName);
    #shouldQuitApp = false;
    win!: BrowserWindow;
    tray!: Tray;
    port!: number;
    customSession?: Electron.Session;
    childWindows = new Map<string, BrowserWindow>();
    editorWindow?: BrowserWindow;
    config = GlobalConfig;
    ipcMain = ipcMain;

    // Beta Features
    messageEditorPort!: number;

    constructor () {
        super();
        this.logger.log("App starting...");
        this.initApp();
    }
    initTray (menu: Electron.Menu) {
        if (!this.tray) {
            this.tray = new Tray(Constants.icon16);
        }
        this.tray.setToolTip(`${Constants.AppName} v${app.getVersion()}`);
        this.tray.on("click", () => {
            this.win.show();
        });
        this.tray.setContextMenu(menu);
    }
    setupTray () {
        const menu = Menu.buildFromTemplate([
            {
                label: `${Constants.AppName} v${app.getVersion()}`,
                icon: Constants.icon16,
                enabled: false,
            },
            {
                type: "separator",
            },
            {
                label: "Check for Updates...",
                type: "normal",
                click: () => {
                    this.checkingForUpdates(true);
                },
            },
            {
                label: "Github Repository",
                type: "normal",
                click: () => shell.openExternal(`https://github.com/${Constants.GithubRepo}`),
            },
            {
                type: "separator",
            },
            {
                label: "Reload",
                click: () => {
                    this.win.reload();
                },
            },
            {
                label: "Relaunch",
                click: () => this.relaunch(),
            },
            {
                label: "Settings (Config Editor)",
                click: () => {
                    this.openConfigEditorWindow();
                },
            },
            {
                label: "Delete all application data and relaunch",
                click: async () => {
                    const result = await dialog.showMessageBox(this.win, {
                        type: "warning",
                        buttons: ["Cancel", "Delete and Relaunch"],
                        defaultId: 0,
                        cancelId: 0,
                        title: "Confirm Data Deletion",
                        message: "Are you sure you want to delete all application data?",
                        detail:
                            "The following data will be permanently deleted:\n" +
                            "\n• Discord HTTP request cache" +
                            "\n• Data stored in session cache (cleared by clearCache)" +
                            "\n• Data stored in browser storage (cleared by clearStorageData)" +
                            "\n• Local databases: PrivateChannel, UserSetting, Frequency" +
                            "\n\nAll saved settings and cached data will be lost. This action cannot be undone.",
                    });

                    if (result.response === 1) {
                        try {
                            await this.win.webContents.session.clearCache();
                            await this.win.webContents.session.flushStorageData();
                            await this.win.webContents.session.clearStorageData({
                                storages: [
                                    "cookies",
                                    "filesystem",
                                    "indexdb",
                                    "localstorage",
                                    "shadercache",
                                    "serviceworkers",
                                    "cachestorage",
                                ],
                            });
                            this.relaunch();
                        } catch (err) {
                            console.error("Failed to clear app data:", err);
                        }
                    } else {
                        console.log("User canceled data deletion.");
                    }
                },
            },

            {
                label: "Toggle DevTools",
                click: () => {
                    this.win.webContents.toggleDevTools();
                },
            },
            {
                type: "separator",
            },
            {
                label: "Quit",
                click: () => this.quit(),
            },
        ]);
        this.initTray(menu);
    }
    async initApp () {
        this.port = await server();
        this.messageEditorPort = await messageEditor();
        app.setAppUserModelId(Constants.AppID);
        const enabledFeatures = new Set(app.commandLine.getSwitchValue("enable-features").split(","));
        const disabledFeatures = new Set(app.commandLine.getSwitchValue("disable-features").split(","));
        // Allow Localhost SSL
        app.commandLine.appendSwitch("allow-insecure-localhost", "true");
        app.commandLine.appendSwitch("ignore-certificate-errors");
        app.commandLine.appendSwitch("host-rules", `MAP ${Constants.CustomDiscordDomain} 127.0.0.1:${this.port}`);
        // Vesktop
        // Disable renderer backgrounding to prevent the app from unloading when in the background
        // https://github.com/electron/electron/issues/2822
        // https://github.com/GoogleChrome/chrome-launcher/blob/5a27dd574d47a75fec0fb50f7b774ebf8a9791ba/docs/chrome-flags-for-tools.md#task-throttling
        app.commandLine.appendSwitch("disable-renderer-backgrounding");
        app.commandLine.appendSwitch("disable-background-timer-throttling");
        app.commandLine.appendSwitch("disable-backgrounding-occluded-windows");
        // Disable proxy
        app.commandLine.appendSwitch("no-proxy-server");
        // Enable & Disable Chromium Features
        Constants.enableFeatures.forEach(feature => {
            enabledFeatures.add(feature);
        });
        Constants.disableFeatures.forEach(feature => {
            disabledFeatures.add(feature);
        });
        const enabledFeaturesArray = Array.from(enabledFeatures).filter(Boolean);
        const disabledFeaturesArray = Array.from(disabledFeatures).filter(Boolean);
        if (enabledFeaturesArray.length) {
            app.commandLine.appendSwitch("enable-features", enabledFeaturesArray.join(","));
            this.logger.log("Enabled Chromium features:", enabledFeaturesArray.join(", "));
        }

        if (disabledFeaturesArray.length) {
            app.commandLine.appendSwitch("disable-features", disabledFeaturesArray.join(","));
            this.logger.log("Disabled Chromium features:", disabledFeaturesArray.join(", "));
        }
        // App Event
        app.on("window-all-closed", () => {
            if (process.platform !== "darwin") this.quit();
        });

        app.on("before-quit", event => {
            // MacOS: Set flag to really quit app
            this.#shouldQuitApp = true;
            this.logger.info("App closing...");
            this.logger.info("=".repeat(50));
        });

        app.on("second-instance", (event, commandLine, workingDirectory, additionalData) => {
            const myWindow = BrowserWindow.getAllWindows()?.[0];
            if (myWindow) {
                myWindow.show();
            }
        });

        // Patch UserAgent (Switch Plan B SDP > Unified Plan)
        app.userAgentFallback = app.userAgentFallback.replace(/Electron\/[\d.]+/, "");

        // Handle second instance
        const gotTheLock = app.requestSingleInstanceLock();
        if (!gotTheLock) {
            this.logger.debug("Second Instance detected. Quit app...");
            this.#shouldQuitApp = true;
            app.quit();
        } else {
            protocol.registerSchemesAsPrivileged([
                {
                    scheme: "https",
                    privileges: {
                        standard: true,
                        bypassCSP: true,
                        allowServiceWorkers: true,
                        supportFetchAPI: true,
                        corsEnabled: true,
                        stream: true,
                    },
                },
            ]);
            app.whenReady().then(async () => {
                this.logger.info("Creating session...");
                this.customSession = session.fromPartition("persist:elysia_dbc");
                // Enable DoH (Cloudflare)
                app.configureHostResolver({
                    enableBuiltInResolver: true,
                    secureDnsMode: "secure",
                    enableHappyEyeballs: true,
                    enableAdditionalDnsQueryTypes: true,
                    secureDnsServers: ["https://cloudflare-dns.com/dns-query"],
                });
                this.checkingForUpdates(false);
                this.createWindow();
                app.on("activate", () => {
                    if (BrowserWindow.getAllWindows().length === 0) {
                        this.createWindow();
                    } else {
                        this.win?.show();
                    }
                });
            });
        }

        // Create context menu
        contextMenu({
            showLearnSpelling: false,
            showSearchWithGoogle: false,
            showCopyImageAddress: true,
            showInspectElement: true,
            showSaveImage: true,
            showSaveImageAs: true,
            showSaveVideo: true,
            showSaveVideoAs: true,
        });

        setupIPCEvents(this);
    }
    get session () {
        if (this.customSession) {
            return this.customSession;
        } else {
            return session.defaultSession;
        }
    }
    async sessionPatch () {
        // Disable stripe.com
        this.session.webRequest.onBeforeRequest(
            {
                urls: ["https://*.stripe.com/*"],
            },
            (details, callback) => {
                // Cancel all requests to stripe.com
                callback({
                    cancel: true,
                });
            },
        );
        /*
        // Rule 1: Remove all CSP headers
        this.session.webRequest.onHeadersReceived(
            { urls: ["<all_urls>"], types: ["mainFrame", "subFrame"] },
            (details, callback) => {
                if (!details.responseHeaders) {
                    return callback({ responseHeaders: details.responseHeaders });
                }
                // Remove both CSP and CSP-report-only
                delete details.responseHeaders["content-security-policy"];
                delete details.responseHeaders["Content-Security-Policy"];
                delete details.responseHeaders["content-security-policy-report-only"];
                delete details.responseHeaders["Content-Security-Policy-Report-Only"];
                callback({ responseHeaders: details.responseHeaders });
            },
        );
        */
        // Rule 2: Force CSS content-type on GitHub raw URLs
        this.session.webRequest.onHeadersReceived(
            {
                urls: ["https://raw.githubusercontent.com/*"],
                types: ["stylesheet"],
            },
            (details, callback) => {
                if (!details.responseHeaders) {
                    return callback({ responseHeaders: details.responseHeaders });
                }
                const url = new URL(details.url);
                if (url.pathname.endsWith(".css")) {
                    // Override Content-Type
                    details.responseHeaders["content-type"] = ["text/css"];
                }
                callback({ responseHeaders: details.responseHeaders });
            },
        );
        // Load Vencord-Web Extension
        if (fs.existsSync(Constants.VencordExtensionPath)) {
            try {
                const extension = await this.session.extensions.loadExtension(Constants.VencordExtensionPath);
                this.logger.info(`Loaded Vencord Extension v${extension.version} from ${Constants.VencordExtensionPath}`);
            } catch (err) {
                this.logger.error("Failed to load Vencord extension:", err);
            }
        } else {
            this.logger.warn(`Vencord extension not found at ${Constants.VencordExtensionPath}, running without extension.`);
        }
    }
    async createWindow () {
        this.setupTray();
        const primaryDisplay = screen.getPrimaryDisplay();
        const { width, height } = primaryDisplay.workAreaSize;
        // Create the browser window.
        this.win = new BrowserWindow({
            width: Math.floor(width * 0.9),
            height: Math.floor(height * 0.9),
            minWidth: 940,
            minHeight: 500,
            icon: Constants.icon128,
            webPreferences: {
                webSecurity: false,
                sandbox: false,
                preload: path.join(__dirname, "ElectronPreload.js"),
                session: this.session,
            },
            backgroundColor: "#36393f",
            titleBarStyle: "hidden",
            frame: false,
            title: Constants.AppName,
            trafficLightPosition: { x: 10, y: 10 },
        });
        // BrowserWindow Event
        this.win.on("close", event => {
            if (!this.#shouldQuitApp) {
                event.preventDefault();
                this.win.hide();
            }
        });
        this.win.on("focus", () => {
            this.win.flashFrame(false);
        });

        await this.sessionPatch();

        this.logger.info(`Electron UserData: ${app.getPath("userData")}`);
        // Microphone
        if (process.platform === "darwin") {
            this.session.setPermissionRequestHandler(async (_webContents, permission, callback, details) => {
                let granted = true;
                if ("mediaTypes" in details) {
                    if (details.mediaTypes?.includes("audio")) {
                        granted &&= await systemPreferences.askForMediaAccess("microphone");
                    }
                    if (details.mediaTypes?.includes("video")) {
                        granted = false;
                    }
                }
                callback(granted);
            });
        }
        // webContents
        if (!app.isPackaged) this.win.webContents.openDevTools();
        // Discord popout
        this.win.webContents.setWindowOpenHandler(({ url }) => {
            this.logger.log("WindowOpenHandler", url);
            switch (url) {
                case "about:blank":
                    return {
                        action: "allow",
                        overrideBrowserWindowOptions: {
                            icon: Constants.icon128,
                            frame: true,
                            autoHideMenuBar: true,
                            width: 1080,
                            height: 720,
                            webPreferences: {
                                webSecurity: false,
                            },
                        },
                    };
                case "https://discord.com/popout":
                case "https://ptb.discord.com/popout":
                case "https://canary.discord.com/popout":
                case `https://localhost:${this.port}/popout`:
                    return {
                        action: "allow",
                        overrideBrowserWindowOptions: {
                            icon: Constants.icon128,
                            frame: true,
                            autoHideMenuBar: true,
                            width: 1080,
                            height: 720,
                            // titleBarStyle: "hidden",
                            webPreferences: {
                                webSecurity: false,
                            },
                        },
                    };
            }

            if (
                [
                    "https://checkout.paypal.com/web",
                    "https://discord.com/connections",
                    "https://ptb.discord.com/connections",
                    "https://canary.discord.com/connections",
                    `https://localhost:${this.port}/connections`,
                ].some(e => url.includes(e))
            ) {
                return { action: "deny" };
            }

            let protocolHandle: string;

            try {
                protocolHandle = new URL(url).protocol;
            } catch {
                return { action: "deny" };
            }

            switch (protocolHandle) {
                case "http:":
                case "https:":
                case "mailto:":
                case "steam:":
                case "spotify:":
                    shell.openExternal(url);
            }

            return { action: "deny" };
        });
        // WebContents Event
        this.win.webContents
            .on("will-navigate", (event, navigationUrl) => {
                try {
                    const parsed = new URL(navigationUrl);
                    const isAllowedHost =
                        parsed.hostname === Constants.CustomDiscordDomain ||
                        parsed.hostname === "localhost" ||
                        parsed.hostname === "127.0.0.1";
                    const isAllowedProtocol = parsed.protocol === "https:" || (parsed.protocol === "http:" && parsed.hostname !== Constants.CustomDiscordDomain);
                    if (!isAllowedHost || !isAllowedProtocol) {
                        event.preventDefault();
                        shell.openExternal(navigationUrl);
                    }
                } catch {
                    event.preventDefault();
                }
            })
            .on("did-create-window", (window, details) => {
                window.show();
                window.on("closed", () => {
                    this.childWindows.delete(details.frameName);
                });
                this.childWindows.get(details.frameName)?.close();
                this.childWindows.set(details.frameName, window);
            })
            .on("did-start-loading", () => {
                this.win.setProgressBar(2, { mode: "indeterminate" });
            })
            .on("did-stop-loading", () => {
                this.win.setTitle(Constants.AppName);
                this.win.setProgressBar(-1);
            });

        this.win.loadURL(`https://${Constants.CustomDiscordDomain}`);
    }
    showNotification (options: NotificationConstructorOptions, callback?: () => unknown) {
        const notif = new Notification(options);
        function handleClick () {
            notif.close();
            if (callback && typeof callback === "function") callback();
        }
        if (callback && typeof callback === "function") notif.once("click", handleClick);
        setTimeout(() => {
            notif.close();
            notif.removeListener("click", handleClick);
        }, 15000).unref();
        notif.show();
    }
    checkingForUpdates (forceEmitted = false) {
        if (!app.isPackaged) {
            // autoUpdater.forceDevUpdateConfig = true; // ! Test
            if (forceEmitted) {
                this.showNotification({
                    title: "Update Manager",
                    body: "Auto-updates are disabled in development mode.",
                    silent: false,
                });
            }
            return Promise.resolve(false);
        }

        autoUpdater.logger = scope("AutoUpdater");
        autoUpdater.disableWebInstaller = true;

        // Auto download only on Windows and Linux
        // Mac requires code signing for auto-update to work properly
        autoUpdater.autoDownload = process.platform !== "darwin";

        autoUpdater.removeAllListeners();

        return new Promise(resolve => {
            autoUpdater.on("update-available", info => {
                const releaseUrl = `https://github.com/${Constants.GithubRepo}/releases/tag/v${info.version}`;

                if (process.platform === "darwin") {
                    this.showNotification(
                        {
                            title: `New version available: ${info.version}`,
                            body: "Please download the new version manually (MacOS)",
                            silent: false,
                        },
                        () => {
                            shell.openExternal(releaseUrl);
                        },
                    );
                    resolve(true);
                    return;
                }

                this.showNotification(
                    {
                        title: "Update Manager",
                        body: `A new version (${info.version}) is available and is being downloaded in the background.`,
                        silent: false,
                    },
                    () => {
                        shell.openExternal(releaseUrl);
                    },
                );
            });

            autoUpdater.on("update-not-available", info => {
                if (forceEmitted) {
                    this.showNotification({
                        title: "Update Manager",
                        body: `You are using the latest version (v${app.getVersion()})`,
                        silent: false,
                    });
                }
                resolve(true);
            });

            autoUpdater.on("error", err => {
                // Only log error, show notification if forced
                this.logger.error("Error in auto-updater: " + err);
                if (forceEmitted) {
                    this.showNotification(
                        {
                            title: "Update Manager",
                            body: `Error checking for updates: ${err.message}`,
                            silent: false,
                        },
                        () => {
                            shell.openExternal(`https://github.com/${Constants.GithubRepo}/releases`);
                        },
                    );
                }
                resolve(false);
            });

            autoUpdater.on("download-progress", progressObj => {
                const percent = Math.round(progressObj.percent);
                this.logger.debug(`Downloaded ${percent}%`);
                if (this.tray && !this.tray.isDestroyed()) {
                    this.tray.setToolTip(`${Constants.AppName} v${app.getVersion()} - Downloading: ${percent}%`);
                }
            });

            autoUpdater.on("update-downloaded", info => {
                if (this.tray && !this.tray.isDestroyed()) {
                    this.tray.setToolTip(`${Constants.AppName} v${app.getVersion()}`);
                }

                dialog
                    .showMessageBox(this.win, {
                        type: "info",
                        title: "Update Ready",
                        message: `Version ${info.version} has been downloaded. Restart the application to apply the updates?`,
                        buttons: ["Restart", "Later"],
                    })
                    .then(returnValue => {
                        if (returnValue.response === 0) autoUpdater.quitAndInstall(true, true);
                    });
                resolve(true);
            });

            autoUpdater.checkForUpdates();
        });
    }
    relaunch () {
        this.#shouldQuitApp = true;
        app.relaunch();
        app.quit();
    }
    quit () {
        this.#shouldQuitApp = true;
        app.quit();
    }
    // Editor Window
    openConfigEditorWindow () {
        if (this.editorWindow && !this.editorWindow.isDestroyed()) {
            this.editorWindow.show();
            return;
        }
        this.editorWindow = new BrowserWindow({
            width: 1080,
            height: 720,
            minWidth: 800,
            minHeight: 600,
            webPreferences: {
                webSecurity: false,
                sandbox: false,
                preload: path.join(__dirname, "ConfigEditorPreload.js"),
            },
            icon: Constants.icon128,
            frame: true,
            autoHideMenuBar: true,
            /*
            ...(process.platform === "darwin" && {
                titleBarStyle: "hidden",
                trafficLightPosition: { x: 10, y: 10 },
            }),
            */
        });
        this.editorWindow.loadFile(Constants.ConfigEditorHTMLPath);
        this.editorWindow.on("closed", () => {
            this.editorWindow = undefined;
        });
    }

    // Beta
    openDiscordMessageEditorWindow () {
        const editorWindow = new BrowserWindow({
            width: 1080,
            height: 720,
            minWidth: 800,
            minHeight: 600,
            parent: this.win,
            modal: true,
            webPreferences: {
                webSecurity: false,
                sandbox: false,
                preload: path.join(__dirname, "MessageEditorPreload.js"),
                partition: "temp:" + randomUUID(), // Use a temporary session for the message editor
            },
            icon: Constants.icon128,
            frame: true,
            autoHideMenuBar: true,
            /*
            ...(process.platform === "darwin" && {
                titleBarStyle: "hidden",
                trafficLightPosition: { x: 10, y: 10 },
            }),
            */
        });
        editorWindow.loadURL(`http://localhost:${this.messageEditorPort}`);
        // Handle Message Editor Ports
        editorWindow.webContents.ipc.once(IPCEvent.MessageEditorReactReady, () => {
            this.logger.debug("Message Editor is ready. Setting up MessageChannel...");
            const { port1, port2 } = new MessageChannelMain();
            editorWindow.webContents.postMessage(IPCEvent.MessageEditorReceivePort, null, [port2]);
            this.win.webContents.postMessage(IPCEvent.MainAppReceiveEditorPort, null, [port1]);
        });
    }

    get app () {
        return app;
    }
}
