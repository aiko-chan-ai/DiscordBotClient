/* Copyright Elysia © 2025. All rights reserved */

import { contextBridge, ipcRenderer } from "electron";

import type { SettingsAPI } from "../../shared/Settings";

// Sandboxed preloads may only require Electron; shared contracts are type-only.
const settingsAPI: SettingsAPI = {
    get: () => ipcRenderer.invoke("settings:get"),
    save: value => ipcRenderer.invoke("settings:save", value),
};
contextBridge.exposeInMainWorld("settingsAPI", settingsAPI);
