/* Copyright Elysia © 2025. All rights reserved */

import { contextBridge, ipcRenderer } from "electron";

import type { StartupState } from "../Windows/StartupWindow";

// Keep this sandboxed preload self-contained: only Electron is required at runtime.
contextBridge.exposeInMainWorld("startupAPI", {
    getState: () => ipcRenderer.invoke("startup:get-state"),
    onStateChanged: (callback: (state: StartupState) => void) => {
        const listener = (_event: Electron.IpcRendererEvent, state: StartupState) => callback(state);
        ipcRenderer.on("startup:state", listener);
        return () => ipcRenderer.removeListener("startup:state", listener);
    },
    retry: () => ipcRenderer.send("startup:retry"),
    quit: () => ipcRenderer.send("startup:quit"),
});
