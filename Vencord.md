# Vencord for Discord Bot Client

This is the readme file for the repo [VencordDBC](https://github.com/aiko-chan-ai/VencordDBC), summarizing what I have added/modified in the original repository (I did not include this in the original repo's readme because it might get lost).

## All Changes Made So Far:

### `browser/manifest.json`
- **Summary:** Allows the extension to operate on any URL (specifically localhost).
- **Changes:**
    ```json
    "host_permissions": [
        "*://*.discord.com/*",
        "https://raw.githubusercontent.com/*",
        "<all_urls>"
    ],
    "content_scripts": [
        {
            "run_at": "document_start",
            "matches": ["*://*.discord.com/*", "<all_urls>"],
            "js": ["content.js"],
            "all_frames": true,
            "world": "ISOLATED"
        },
        {
            "run_at": "document_start",
            "matches": ["*://*.discord.com/*", "<all_urls>"],
            "js": ["dist/Vencord.js"],
            "all_frames": true,
            "world": "MAIN"
        }
    ],
    "web_accessible_resources": [
        {
            "resources": ["dist/*", "third-party/*"],
            "matches": ["*://*.discord.com/*", "<all_urls>"]
        }
    ],
    ```

### `scripts/build/buildWeb.mjs`
- **Summary:** Automatically creates an Extension file and moves it to the root folder containing Discord Bot Client.
- **Changes:**
    ```js
    import { readFileSync, existsSync, renameSync, rmSync } from "fs";

    // Move folder (BotClient only)
    if (existsSync("../VencordExtension"))
        rmSync("../VencordExtension", { recursive: true });
    renameSync("dist/chromium-unpacked", "../VencordExtension");
    rmSync("dist", { recursive: true });
    console.info("Moved folder Extension to ../VencordExtension");
    ```

### `src/plugins/_core/settings.tsx`
- **Summary:** Displays DBC version in settings.
- **Changes:**
    ```ts
    get botClientVersion() {
        return window.electron?.getBotClientVersion();
    },
    getInfoRows() {
        const { electronVersion, chromiumVersion, additionalInfo, botClientVersion } = this;

        const rows = [`Vencord ${gitHash}${additionalInfo}`];

        if (botClientVersion) rows.push(`BotClient ${botClientVersion}`);
        if (electronVersion) rows.push(`Electron ${electronVersion}`);
        if (chromiumVersion) rows.push(`Chromium ${chromiumVersion}`);

        return rows;
    },
    ```

### `src/plugins/botClient/**/*`
- **Summary:** Contains botClient plugin and necessary components.

### `src/webpack/patchWebpack.ts`
- **Summary:** Ensures that the extension works properly.
- **Changes:**
    ```js
    if ((stack?.includes("discord.com") || stack?.includes("discordapp.com") || stack?.includes("localhost")) && String(this.e).includes("Promise.all")) ...
    if ((stack?.includes("discord.com") || stack?.includes("discordapp.com") || stack?.includes("localhost")) && !Array.isArray(v)) ...
    ```

The above is a summary of the changes to help contributors identify what has been modified compared to the original Vencord repository.
