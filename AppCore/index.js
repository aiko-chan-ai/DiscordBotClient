const {
	app,
	BrowserWindow,
	systemPreferences,
	shell,
	session,
	Tray,
	Menu,
	nativeImage,
	screen,
	ipcMain,
	Notification,
} = require("electron");
const log = require("electron-log");
const path = require("path");
const fetch = require("node-fetch");
const os = require("os");
const {
	version: VencordVersion,
} = require("../VencordExtension/manifest.json");
const server = require("./server.js");
const { UserAgent } = require("../AppAssets/Util.js");
const ApplicationFlags = require("../AppAssets/ApplicationFlags.js");
const store = require("./ElectronStore.js");
const { PreloadedUserSettings } = require("discord-protos");
const UserPatch = require("../AppAssets/UserPatch");
const Experiments = require("../AppAssets/Experiments.js");

app.commandLine.appendSwitch("allow-insecure-localhost", "true");
app.commandLine.appendSwitch("ignore-certificate-errors");
app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");

const APP_NAME = "DiscordBotClient";

const iconPath = path.join(
	__dirname,
	"..",
	"AppAssets",
	"DiscordBotClient.png"
);

app.setAppUserModelId(APP_NAME);

let shouldQuitApp = false;

log.info("App starting...");

/**
 *
 * @param {BrowserWindow} win
 * @returns
 */
function createTray(win, port) {
	const tray = new Tray(
		nativeImage.createFromPath(iconPath).resize({ width: 16 })
	);
	tray.setToolTip(APP_NAME);
	tray.on("click", () => {
		win.show();
	});
	const menu = Menu.buildFromTemplate([
		{
			label: `${APP_NAME} v${app.getVersion()}`,
			icon: nativeImage.createFromPath(iconPath).resize({ width: 16 }),
			enabled: false,
		},
		{
			type: 'separator',
		},
		{
			label: 'Check for Updates...',
			type: 'normal',
			click: () => checkUpdate(true),
		},
		{
			label: 'Github Repository',
			type: 'normal',
			click: () =>
				shell.openExternal(
					'https://github.com/aiko-chan-ai/DiscordBotClient',
				),
		},
		{
			type: 'separator',
		},
		{
			label: 'Reload App (Force)',
			click: () => {
				app.relaunch();
				shouldQuitApp = true;
				app.quit();
			},
		},
		{
			label: 'Clear AppData (Web Cache)',
			click: () => {
				win.webContents.session
					.clearCache()
					.then(() => win.webContents.session.clearStorageData())
					.then(() => {
						app.relaunch();
						shouldQuitApp = true;
						app.quit();
					});
			},
		},
		{
			label: 'Clear Database (Local)',
			click: () => {
				store.deleteAll()
			},
		},
		{
			label: 'Toggle Developer Tools',
			click: () => {
				win.webContents.toggleDevTools();
			},
		},
		{
			type: 'separator',
		},
		{
			label: 'Quit',
			click: () => {
				shouldQuitApp = true;
				app.quit();
			},
		},
	]);
	tray.setContextMenu(menu);
	return tray;
}

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
	log.debug("Second Instance detected. Quit app...");
	shouldQuitApp = true;
	app.quit();
} else {
	app.whenReady().then(() => {
		createWindow();
		checkUpdate(false);
	});
}

async function createWindow() {
	const primaryDisplay = screen.getPrimaryDisplay();
	const { width, height } = primaryDisplay.workAreaSize;
	// Create the browser window.
	const win = new BrowserWindow({
		width: width * 0.9,
		height: height * 0.9,
		minWidth: 800,
		minHeight: 600,
		icon: nativeImage.createFromPath(iconPath).resize({ width: 128 }),
		webPreferences: {
			webSecurity: false,
			nodeIntegration: false,
			enableRemoteModule: false,
			preload: path.join(__dirname, "preload.js"),
			contextIsolation: true,
		},
		frame: false,
		backgroundColor: "#36393f",
		title: "DiscordBotClient",
	});

	// Patch UserAgent (Switch Plan B SDP > Unified Plan)
	win.webContents.setUserAgent(
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
	);

	log.info(`Electron UserData: ${app.getPath("userData")}`);

	// Create the server
	const port = await server(2024, win);

	createTray(win, port);

	if (!app.isPackaged) win.webContents.openDevTools();

	if (systemPreferences && systemPreferences.askForMediaAccess)
		systemPreferences.askForMediaAccess("microphone");

	win.webContents.setWindowOpenHandler(({ url }) => {
		if (url === `https://localhost:${port}/popout`) {
			return {
				action: "allow",
				overrideBrowserWindowOptions: {
					parent: win,
					modal: true,
					icon: nativeImage.createFromPath(iconPath).resize({ width: 128 }),
					autoHideMenuBar: true,
					width: 800,
					height: 600,
					minWidth: 800,
					minHeight: 600,
				},
			};
		}
		shell.openExternal(url);
		return { action: "deny" };
	});

	const path_ = path.join(__dirname, "..", "VencordExtension");

	win.setTitle(APP_NAME + " Loading Vencord from " + path_ + "...");
	await session.defaultSession.loadExtension(path_);
	log.info("Vencord-Web Extension loaded, version: " + VencordVersion);

	win.loadURL(
		require("../package.json").testVencord
			? "https://canary.discord.com/channels/@me"
			: `https://localhost:${port}`
	);

	win.webContents.on("did-start-loading", () => {
		win.setProgressBar(2, { mode: "indeterminate" });
	});

	win.webContents.on("did-stop-loading", () => {
		win.setTitle(APP_NAME);
		win.setProgressBar(-1);
	});

	win.webContents.on("console-message", (ev, level, message, line, file) => {
		if (
			level == 3 &&
			message.includes(
				"Cannot set properties of undefined (setting 'Vencord_settingsDirty')"
			) &&
			app.isPackaged
		) {
			log.info("Vencord error, reload...");
			setTimeout(() => win.reload(), 2000).unref();
		}
	});

	win.on("close", (event) => {
		if (!shouldQuitApp) {
			event.preventDefault();
			win.hide();
		}
	});

	session.defaultSession.webRequest.onHeadersReceived(
		{
			urls: ["https://raw.githubusercontent.com/*"],
		},
		(details, callback) => {
			// set content-type header to text/css
			details.responseHeaders["content-type"] = "text/css";
			callback({ responseHeaders: details.responseHeaders });
		}
	);

	win.on("hide", function (e) {
		e.preventDefault();
	});

	ipcMain.on("minimize", (event) => {
		win.minimize();
		event.returnValue = true;
	});

	ipcMain.on("max", (event) => {
		if (win.isMaximized()) {
			win.restore();
		} else {
			win.maximize();
		}
		event.returnValue = true;
	});

	ipcMain.on("close", (event) => {
		win.hide();
		event.returnValue = true;
	});

	ipcMain.on("get-bot-info", async (event, token) => {
		token = token.replace(/Bot/g, "").trim();
		fetch(`https://discord.com/api/v9/applications/@me?with_counts=true`, {
			headers: {
				Authorization: `Bot ${token}`,
				"User-Agent": UserAgent(),
			},
		})
			.then((res) => {
				if (!res.ok) throw new Error(res.statusText);
				return res.json();
			})
			.then((data) => {
				event.sender.send("get-bot-info-response", {
					success: true,
					data,
				});
			})
			.catch((e) => {
				event.sender.send("get-bot-info-response", {
					success: false,
					message: e.message,
				});
			});
	});

	ipcMain.on("get-intents", (event, flags_) => {
		const flags = new ApplicationFlags(flags_).toArray();
		const skip = [];
		if (!flags.find((f) => f.includes("GATEWAY_PRESENCE"))) {
			skip.push("GUILD_PRESENCES");
		}
		if (!flags.find((f) => f.includes("GATEWAY_GUILD_MEMBERS"))) {
			skip.push("GUILD_MEMBERS");
		}
		if (!flags.find((f) => f.includes("GATEWAY_MESSAGE_CONTENT"))) {
			return (event.returnValue = {
				success: false,
				message: "MESSAGE_CONTENT is required",
				skip: [],
			});
		}
		event.returnValue = {
			success: true,
			message: `Skip intents: ${skip.join(", ")}`,
			skip,
		};
	});

	ipcMain.on("getElectronVersion", (event) => {
		return (event.returnValue = process.versions.electron);
	});

	ipcMain.on("getBotClientVersion", (event) => {
		return (event.returnValue = app.getVersion());
	});

	ipcMain.on("getSettingProto1", (event, uid) => {
		const userData = store.get(uid);
		event.returnValue = PreloadedUserSettings.toBase64({
			...userData.settingProto.data1,
			guildFolders: { folders: [], guildPositions: [] },
		});
	});

	ipcMain.on("getUserPatch", (event, uid) => {
		event.returnValue = UserPatch[uid];
	});

	ipcMain.on("getExperiment", (event, type) => {
		if (type == "user") {
			event.returnValue = Experiments.User;
		} else if (type == "guild") {
			event.returnValue = Experiments.Guild;
		}
	});

	ipcMain.on(
		"handlePrivateChannel",
		(event, type, botId, channelId, userId) => {
			log.log('handlePrivateChannel', type, botId, channelId, userId);
			if (type == "add") {
				const userData = store.get(botId);
				userData.privateChannel[channelId] = {
					type: 1,
					recipients: [
						{
							id: userId,
						},
					],
					last_message_id: null,
					is_spam: false,
					id: channelId,
					flags: 0,
				};
				store.set(botId, userData, true);
			} else if (type == "remove") {
				const userData = store.get(botId);
				delete userData.privateChannel[channelId];
				store.set(botId, userData, true);
			} else if (type == "clear") {
				store.deleteDMs(botId);
			}
			event.returnValue = true;
		}
	);

	ipcMain.on("getPrivateChannel", (event, uid) => {
		const userData = store.get(uid);
		event.returnValue = userData.privateChannel;
	});
}

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		shouldQuitApp = true;
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.on("before-quit", (event) => {
	log.info("App closing...");
});

app.on(
	"second-instance",
	(event, commandLine, workingDirectory, additionalData) => {
		const myWindow = BrowserWindow.getAllWindows()?.[0];
		if (myWindow) {
			myWindow.show();
		}
	}
);

/**
 *
 * @param {string} latest
 * @param {string} current
 * @returns
 */
function checkLatestVersion(latest, current) {
	if (latest.startsWith("v")) latest = latest.slice(1);
	const [latestMajor, latestMinor, latestPatch] = latest.split(".");
	const [currentMajor, currentMinor, currentPatch] = current.split(".");
	if (latestMajor > currentMajor) {
		return true;
	} else if (latestMajor == currentMajor) {
		if (latestMinor > currentMinor) {
			return true;
		} else if (latestMinor == currentMinor) {
			if (latestPatch > currentPatch) {
				return true;
			}
		}
	}
	return false;
}

function createNotification(
	title,
	description,
	icon,
	silent = false,
	urlOpenWhenClick
) {
	const n = new Notification({
		title,
		body: description,
		icon,
		silent,
	});
	n.on("click", (e) => {
		e.preventDefault();
		if (urlOpenWhenClick) shell.openExternal(urlOpenWhenClick);
		n.close();
	});
	n.show();
}

function checkUpdate(force = false) {
	log.info("Checking for updates...");
	return new Promise((resolve) => {
		fetch(
			"https://api.github.com/repos/aiko-chan-ai/DiscordBotClient/releases/latest"
		)
			.then((res) => res.json())
			.then((res) => {
				if (!app.isPackaged) {
					createNotification(
						`Test mode`,
						`Electron v${app.getVersion()} - ${os.platform()}`,
						undefined,
						undefined,
						"https://github.com/aiko-chan-ai/DiscordBotClient/releases"
					);
				} else if (checkLatestVersion(res.tag_name, app.getVersion())) {
					createNotification(
						`New version available: ${res.name}`,
						`Click here to open the update page`,
						undefined,
						undefined,
						"https://github.com/aiko-chan-ai/DiscordBotClient/releases"
					);
				} else if (force) {
					createNotification(
						"Update Manager",
						`You are using the latest version (v${app.getVersion()})`,
						undefined,
						undefined,
						"https://github.com/aiko-chan-ai/DiscordBotClient/releases"
					);
				}
			})
			.catch((e) => {
				log.error(e);
				createNotification(
					"Update Manager",
					`Unable to check for updates (v${app.getVersion()})`,
					undefined,
					undefined,
					"https://github.com/aiko-chan-ai/DiscordBotClient/releases"
				);
			})
			.finally(() => resolve(true));
	});
}
