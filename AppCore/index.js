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
	dialog,
} = require('electron');
const log = require('electron-log');
const path = require('path');
const fetch = require('node-fetch');
const { autoUpdater } = require('electron-updater');
const {
	version: VencordVersion,
} = require('../VencordExtension/manifest.json');
const server = require('./server.js');
const { UserAgent } = require('../AppAssets/Util.js');
const ApplicationFlags = require('../AppAssets/ApplicationFlags.js');
const store = require('./ElectronStore.js');
const { PreloadedUserSettings } = require('discord-protos');
const UserPatch = require('../AppAssets/UserPatch');

app.commandLine.appendSwitch('allow-insecure-localhost', 'true');
app.commandLine.appendSwitch('ignore-certificate-errors');
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');

const APP_NAME = 'DiscordBotClient';

const iconPath = path.join(
	__dirname,
	'..',
	'AppAssets',
	'DiscordBotClient.png',
);

app.setAppUserModelId(APP_NAME);

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

let firstTime = true;
let shouldQuitApp = false;

log.info('App starting...');

/**
 *
 * @param {BrowserWindow} win
 * @returns
 */
function createTray(win, port) {
	const tray = new Tray(
		nativeImage.createFromPath(iconPath).resize({ width: 16 }),
	);
	tray.setToolTip(APP_NAME);
	tray.on('click', () => {
		win.show();
	});
	const menu = Menu.buildFromTemplate([
		{
			label: `${APP_NAME} v${app.getVersion()} (Port: ${port})`,
			icon: nativeImage.createFromPath(iconPath).resize({ width: 16 }),
			enabled: false,
		},
		{
			type: 'separator',
		},
		{
			label: 'Check for Updates...',
			type: 'normal',
			visible: process.platform !== 'darwin',
			click: () => autoUpdater.checkForUpdatesAndNotify(),
		},
		{
			label: 'Github Repository',
			type: 'normal',
			visible: process.platform !== 'darwin',
			click: () =>
				shell.openExternal(
					'https://github.com/aiko-chan-ai/DiscordBotClient',
				),
		},
		{
			type: 'separator',
		},
		{
			label: 'Reload',
			click: () => {
				win.reload();
			},
		},
		{
			label: 'Clear AppData',
			click: () => {
				win.webContents.session
					.clearCache()
					.then(() => win.webContents.session.clearStorageData())
					.then(() => {
						app.relaunch();
						app.quit();
					});
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
			preload: path.join(__dirname, 'Preload.js'),
			contextIsolation: true,
		},
		frame: false,
		backgroundColor: '#36393f',
		title: 'DiscordBotClient',
	});

	// Patch UserAgent (Switch Plan B SDP > Unified Plan)
	win.webContents.setUserAgent(
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
	);

	log.info(`Electron UserData: ${app.getPath('userData')}`);

	// Create the server
	const port = await server(2024, win);

	createTray(win, port);

	if (!app.isPackaged) win.webContents.openDevTools();

	if (systemPreferences && systemPreferences.askForMediaAccess)
		systemPreferences.askForMediaAccess('microphone');

	win.webContents.on('new-window', function (e, url) {
		e.preventDefault();
		return shell.openExternal(url);
	});

	const path_ = path.join(__dirname, '..', 'VencordExtension');

	win.setTitle(APP_NAME + ' Loading Vencord from ' + path_ + '...');
	await session.defaultSession.loadExtension(path_);
	log.info('Vencord-Web Extension loaded, version: ' + VencordVersion);

	win.loadURL(`https://localhost:${port}`);

	win.webContents.on('did-start-loading', () => {
		win.setProgressBar(2, { mode: 'indeterminate' });
	});

	win.webContents.on('did-stop-loading', () => {
		win.setTitle(APP_NAME);
		win.setProgressBar(-1);
	});

	win.on('close', (event) => {
		if (!shouldQuitApp) {
			event.preventDefault();
			win.hide();
		}
	});

	session.defaultSession.webRequest.onHeadersReceived(
		{
			urls: ['https://raw.githubusercontent.com/*'],
		},
		(details, callback) => {
			// set content-type header to text/css
			details.responseHeaders['content-type'] = 'text/css';
			callback({ responseHeaders: details.responseHeaders });
		},
	);

	win.on('hide', function (e) {
		e.preventDefault();
	});

	ipcMain.on('minimize', (event) => {
		win.minimize();
		event.returnValue = true;
	});

	ipcMain.on('max', (event) => {
		if (win.isMaximized()) {
			win.restore();
		} else {
			win.maximize();
		}
		event.returnValue = true;
	});

	ipcMain.on('close', (event) => {
		win.hide();
		event.returnValue = true;
	});

	ipcMain.on('get-bot-info', async (event, token) => {
		token = token.replace(/Bot/g, '').trim();
		fetch(`https://discord.com/api/v9/applications/@me?with_counts=true`, {
			headers: {
				Authorization: `Bot ${token}`,
				'User-Agent': UserAgent(),
			},
		})
			.then((res) => {
				if (!res.ok) throw new Error(res.statusText);
				return res.json();
			})
			.then((data) => {
				event.sender.send('get-bot-info-response', {
					success: true,
					data,
				});
			})
			.catch((e) => {
				event.sender.send('get-bot-info-response', {
					success: false,
					message: e.message,
				});
			});
	});

	ipcMain.on('get-intents', (event, flags_) => {
		const flags = new ApplicationFlags(flags_).toArray();
		const skip = [];
		if (!flags.find((f) => f.includes('GATEWAY_PRESENCE'))) {
			skip.push('GUILD_PRESENCES');
		}
		if (!flags.find((f) => f.includes('GATEWAY_GUILD_MEMBERS'))) {
			skip.push('GUILD_MEMBERS');
		}
		if (!flags.find((f) => f.includes('GATEWAY_MESSAGE_CONTENT'))) {
			throw new Error('MESSAGE_CONTENT is required');
		}
		event.returnValue = {
			success: true,
			message: `Skip intents: ${skip.join(', ')}`,
			skip,
		};
	});

	ipcMain.on('getElectronVersion', (event) => {
		return (event.returnValue = process.versions.electron);
	});

	ipcMain.on('getBotClientVersion', (event) => {
		return (event.returnValue = app.getVersion());
	});

	ipcMain.on('getSettingProto1', (event, uid) => {
		const userData = store.get(uid);
		event.returnValue = PreloadedUserSettings.toBase64(
			userData.settingProto.data1,
		);
	});

	ipcMain.on('getUserPatch', (event, uid) => {
		event.returnValue = UserPatch[uid];
	});
}

app.whenReady().then(() => {
	createWindow();
	// autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.on('before-quit', (event) => {
	log.info('App closing...');
});

autoUpdater.on('error', (error) => {
	dialog.showErrorBox(
		'Error: ',
		error == null ? 'unknown' : (error.stack || error).toString(),
	);
});

autoUpdater.on('update-available', () => {
	dialog
		.showMessageBox({
			type: 'info',
			title: 'Found Updates',
			message: 'Found updates, do you want update now?',
			buttons: ['Sure', 'No'],
		})
		.then((buttonIndex) => {
			if (buttonIndex === 0) {
				autoUpdater.downloadUpdate();
			}
		});
});

autoUpdater.on('update-not-available', () => {
	if (firstTime) {
		firstTime = false;
		dialog.showMessageBox({
			title: 'No Updates',
			message: 'Current version is up-to-date.',
		});
	} else {
		log.info('Current version is up-to-date.');
	}
});

autoUpdater.on('update-downloaded', () => {
	dialog
		.showMessageBox({
			title: 'Install Updates',
			message:
				'Updates downloaded, application will be quit for update...',
		})
		.then(() => {
			setImmediate(() => autoUpdater.quitAndInstall());
		});
});
