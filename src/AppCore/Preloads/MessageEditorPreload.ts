/* Copyright Elysia © 2025. All rights reserved */

import { contextBridge, ipcRenderer } from "electron";

import { IPCEvent } from "../IPCEvents";

// The const enum inlines IPC channel names, keeping this sandboxed preload self-contained.
contextBridge.exposeInMainWorld("electronAPI", {
    reactReady: () => ipcRenderer.send(IPCEvent.MessageEditorReactReady),
    closeWindow: () => ipcRenderer.send(IPCEvent.MessageEditorClose),
});

ipcRenderer.once(IPCEvent.MessageEditorReceivePort, event => {
    window.postMessage("forward-editor-port", "*", [event.ports[0]]);
});
