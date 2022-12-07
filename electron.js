const { app, BrowserWindow, systemPreferences, shell, Notification } = require("electron");
const path = require("path");
const fetch = require("node-fetch");
const package = require("./package.json");
const server = require("./server.js");
app.commandLine.appendSwitch('allow-insecure-localhost', 'true');
app.commandLine.appendSwitch('ignore-certificate-errors');
app.setAppUserModelId('DiscordBotClient');

const iconPath = path.join(__dirname, "DiscordBotClient.png");

function checkUpdate() {
    return new Promise((resolve, reject) => {
        fetch("https://api.github.com/repos/aiko-chan-ai/DiscordBotClient/releases/latest")
            .then((res) => res.json())
            .then(res => {
                if (res.tag_name !== package.version) {
                    new Notification({
                        title: 'Update Manager',
                        body: `New version available: ${res.name}}`,
                        icon: iconPath,
                    }).show();
                } else {
                    new Notification({
                        title: 'Update Manager',
                        body: `You are using the latest version.`,
                        icon: iconPath,
                    }).show();
                }
                resolve()
            })
            .catch((e) => {
                console.log(e);
                new Notification({
                    title: 'Update Manager',
                    body: `Unable to check for updates.`,
                    icon: iconPath,
                }).show();
                resolve()
            })
    });
}

async function createWindow() {
    checkUpdate();
    // Await server ...
    const port = await server(2022);

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
        // titleBarStyle: "hidden",
    });

    // win.webContents.openDevTools();

    if (systemPreferences && systemPreferences.askForMediaAccess) systemPreferences.askForMediaAccess("microphone");
    win.webContents.on("new-window", function (e, url) {
        e.preventDefault();
        return shell.openExternal(url);
    });
    
    win.loadURL(`https://localhost:${port}`);
}

app.whenReady().then(() => {
    setTimeout(createWindow, process.platform == "linux" ? 1000 : 0)
});

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