const { app, BrowserWindow, systemPreferences, shell } = require("electron");
const path = require("path");
const server = require("./server.js");
app.commandLine.appendSwitch('allow-insecure-localhost', 'true');
app.commandLine.appendSwitch('ignore-certificate-errors');

async function createWindow() {
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