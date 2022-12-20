const { app, BrowserWindow, systemPreferences, shell, Notification } = require("electron");

const log = require('electron-log');

const path = require("path");
const fetch = require("node-fetch");
const package = require("./package.json");
const server = require("./server.js");
app.commandLine.appendSwitch('allow-insecure-localhost', 'true');
app.commandLine.appendSwitch('ignore-certificate-errors');
app.setAppUserModelId('DiscordBotClient');

function createNotification(title, description, silent = false, callbackWhenClick) {
    const n = new Notification({
        title,
        body: description,
        icon: iconPath,
        silent,
    });
    n.once('click', typeof callbackWhenClick === 'function' ? callbackWhenClick : () => {
        n.close();
    });
    n.show();
}

log.info('App starting...');

const iconPath = path.join(__dirname, "DiscordBotClient.png");

function checkUpdate() {
    log.info('Checking for updates...');
    return new Promise((resolve, reject) => {
        fetch("https://api.github.com/repos/aiko-chan-ai/DiscordBotClient/releases/latest")
            .then((res) => res.json())
            .then(res => {
                if (res.tag_name !== package.version) {
                    createNotification('Update Manager', `New version available: ${res.name}`);
                } else {
                    createNotification('Update Manager', `You are using the latest version (v${package.version})`);
                }
                resolve()
            })
            .catch((e) => {
                log.error(e);
                createNotification('Update Manager', `Unable to check for updates (v${package.version})`);
                resolve()
            })
    });
}

async function createWindow() {
    checkUpdate();
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        icon: iconPath,
        webPreferences: {
            webSecurity: false,
            nodeIntegration: false,
            enableRemoteModule: false,
            contextIsolation: true,
        },
        title: "DiscordBotClient",
        // titleBarStyle: "hidden",
    });

    win.setProgressBar(1.01);

    // Create the server
    const port = await server(2022, log);

    createNotification('Proxy Server', `Proxy server started on port ${port}`);

    if (!app.isPackaged) win.webContents.openDevTools();

    if (systemPreferences && systemPreferences.askForMediaAccess) systemPreferences.askForMediaAccess("microphone");
    win.webContents.on("new-window", function (e, url) {
        e.preventDefault();
        return shell.openExternal(url);
    });
    
    win.loadURL(`https://localhost:${port}`);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// before the app is terminated, clear both timers
app.on('before-quit', () => {
    log.info('App closing...');
});