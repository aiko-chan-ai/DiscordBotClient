const { app, BrowserWindow, systemPreferences, shell, Notification } = require("electron");
const path = require("path");
const fetch = require("node-fetch");
const package = require("./package.json");
const server = require("./server.js");
app.commandLine.appendSwitch('allow-insecure-localhost', 'true');
app.commandLine.appendSwitch('ignore-certificate-errors');

function checkUpdate() {
    return new Promise((resolve, reject) => {
        fetch("https://api.github.com/repos/aiko-chan-ai/DiscordBotClient/releases/latest")
            .then((res) => res.json())
            .then(res => {
                if (res.tag_name !== package.version) {
                    new Notification({
                        title: 'Update Manager',
                        body: `New version available: ${res.name}}`,
                        icon: './DiscordBotClient.png',
                    }).show();
                } else {
                    new Notification({
                        title: 'Update Manager',
                        body: `You are using the latest version.`,
                        icon: './DiscordBotClient.png',
                    }).show();
                }
                resolve()
            })
            .catch((e) => {
                console.log(e);
                new Notification({
                    title: 'Update Manager',
                    body: `Unable to check for updates.`,
                    icon: './DiscordBotClient.png',
                }).show();
                resolve()
            })
    });
}

async function createWindow() {
    checkUpdate();
    // Await server ...
    let port = 2022;
    let res_ = await server(port);
    while (!res_) {
        port++;
        res_ = await server(port);
    }
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        icon: path.join(__dirname, "/DiscordBotClient.png"),
        webPreferences: {
            webSecurity: true,
            nodeIntegration: false,
            enableRemoteModule: false,
            contextIsolation: true,
        },
    });

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