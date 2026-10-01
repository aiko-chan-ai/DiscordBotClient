/* Copyright Elysia © 2026. All rights reserved */

import { randomUUID } from "crypto";
import { BrowserWindow, dialog, MessageChannelMain, net, protocol, session, WebContents } from "electron";
import { realpath } from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";

import Constants from "./Constants";
import { IPCEvent } from "./IPCEvents";

const scheme = "dbc-editor";
const editorURL = `${scheme}://app/`;

// Register all application schemes together before app.ready; Electron accepts this call only once.
protocol.registerSchemesAsPrivileged([
    {
        scheme,
        privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true },
    },
]);

export class MessageEditorWindow {
    readonly window: BrowserWindow;

    constructor (parent: BrowserWindow, recipient: WebContents) {
        const editorSession = session.fromPartition(`editor:${randomUUID()}`);
        editorSession.protocol.handle(scheme, async request => {
            if (request.method !== "GET") return new Response(null, { status: 405 });
            try {
                const url = new URL(request.url);
                if (url.host !== "app" || url.username || url.password) return new Response(null, { status: 403 });
                const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
                if (/[\\:\0]/.test(pathname)) return new Response(null, { status: 403 });
                const directory = await realpath(Constants.EditorHTMLFolderPath);
                const filename = await realpath(path.resolve(directory, `.${pathname}`));
                const relative = path.relative(directory, filename);
                // Check canonical paths too, so symlinks cannot expose files outside the editor bundle.
                if (
                    !relative ||
                    relative === ".." ||
                    relative.startsWith(`..${path.sep}`) ||
                    path.isAbsolute(relative)
                ) {
                    return new Response(null, { status: 403 });
                }
                return await net.fetch(pathToFileURL(filename).href);
            } catch {
                return new Response(null, { status: 404 });
            }
        });
        this.window = new BrowserWindow({
            width: 1080,
            height: 720,
            minWidth: 800,
            minHeight: 600,
            parent,
            modal: true,
            show: false,
            icon: Constants.icon128,
            title: "DiscordBotClient — Message Editor",
            autoHideMenuBar: true,
            webPreferences: {
                session: editorSession,
                preload: path.join(__dirname, "MessageEditorPreload.js"),
                sandbox: true,
                contextIsolation: true,
                nodeIntegration: false,
                webSecurity: true,
            },
        });
        const contents = this.window.webContents;
        const isOwner = (event: Electron.IpcMainEvent) =>
            event.sender === contents &&
            event.senderFrame === contents.mainFrame &&
            event.senderFrame.url === editorURL;
        const ready = (event: Electron.IpcMainEvent) => {
            if (!isOwner(event) || recipient.isDestroyed()) return;
            contents.ipc.removeListener(IPCEvent.MessageEditorReactReady, ready);
            const { port1, port2 } = new MessageChannelMain();
            contents.postMessage(IPCEvent.MessageEditorReceivePort, null, [port2]);
            recipient.postMessage(IPCEvent.MainAppReceiveEditorPort, null, [port1]);
        };
        contents.ipc.on(IPCEvent.MessageEditorReactReady, ready);
        contents.ipc.on("app:message_editor_close", event => {
            if (isOwner(event)) this.window.close();
        });
        contents.setWindowOpenHandler(() => ({ action: "deny" }));
        contents.on("will-navigate", event => event.preventDefault());
        contents.on("will-frame-navigate", event => event.preventDefault());
        this.window.on("closed", () => editorSession.protocol.unhandle(scheme));
        this.window.once("ready-to-show", () => this.window.show());
        void this.window.loadURL(editorURL).catch(() => {
            if (this.window.isDestroyed()) return;
            dialog.showErrorBox(
                "Message Editor could not open",
                "The editor files are missing or could not load. Rebuild or reinstall DiscordBotClient.",
            );
            this.window.destroy();
        });
    }
}
