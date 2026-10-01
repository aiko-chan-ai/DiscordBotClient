/* Copyright Elysia © 2025. All rights reserved */

import { contextBridge, ipcRenderer } from "electron";

// Keep the sandboxed preload self-contained; the editor only receives its dedicated port.
contextBridge.exposeInMainWorld("electronAPI", {
    reactReady: () => ipcRenderer.send("app:message_editor_ready"), // IPCEvent.MessageEditorReactReady
    closeWindow: () => ipcRenderer.send("app:message_editor_close"), // IPCEvent.RequestCloseWindow
});

ipcRenderer.once("app:message_editor_receive_port", event => {
    window.postMessage("forward-editor-port", "*", [event.ports[0]]);
});
