const {
	app,
	BrowserWindow,
	systemPreferences,
	shell,
	Notification,
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
const { version: DBCVersion } = require('../package.json');
const { version: VencordVersion } = require('../Vencord/manifest.json');
const server = require('./server.js');

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

log.info('App starting...');

function createNotification(
	title,
	description,
	icon,
	silent = false,
	callbackWhenClick = () => {},
) {
	const n = new Notification({
		title,
		body: description,
		icon,
		silent,
	});
	n.once('click', () => {
		typeof callbackWhenClick == 'function' && callbackWhenClick();
		n.close();
	});
	n.show();
}

/**
 *
 * @param {BrowserWindow} win
 * @returns
 */
function createTray(win) {
	const tray = new Tray(
		nativeImage.createFromPath(iconPath).resize({ width: 16 }),
	);
	tray.setToolTip(APP_NAME);
	tray.on('click', () => {
		win.show();
	});
	const menu = Menu.buildFromTemplate([
		{
			label: APP_NAME,
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
			click: checkUpdate,
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
			role: 'quit',
		},
	]);
	tray.setContextMenu(menu);
	return tray;
}

function checkUpdate() {
	log.info('Checking for updates...');
	return new Promise((resolve, reject) => {
		fetch(
			'https://api.github.com/repos/aiko-chan-ai/DiscordBotClient/releases/latest',
		)
			.then((res) => res.json())
			.then((res) => {
				if (res.tag_name !== DBCVersion) {
					createNotification(
						'Update Manager',
						`New version available: ${res.name}`,
						null,
						undefined,
						() => {
							shell.openExternal(
								'https://github.com/aiko-chan-ai/DiscordBotClient/releases',
							);
						},
					);
				} else {
					createNotification(
						'Update Manager',
						`You are using the latest version (v${DBCVersion})`,
					);
				}
			})
			.catch((e) => {
				log.error(e);
				createNotification(
					'Update Manager',
					`Unable to check for updates (v${DBCVersion})`,
					null,
					undefined,
					() => {
						shell.openExternal(
							'https://github.com/aiko-chan-ai/DiscordBotClient/releases',
						);
					},
				);
			})
			.finally(resolve);
	});
}

async function createWindow() {
	let isNotifMinimized = false;
	checkUpdate();
	const primaryDisplay = screen.getPrimaryDisplay();
	const { width, height } = primaryDisplay.workAreaSize;
	// Create the browser window.
	const win = new BrowserWindow({
		width: width/1.2,
		height: height/1.2,
		minWidth: 800,
		minHeight: 600,
		icon: nativeImage.createFromPath(iconPath).resize({ width: 128 }),
		webPreferences: {
			webSecurity: false,
			nodeIntegration: false,
			enableRemoteModule: false,
			preload: path.join(__dirname, 'preload.js'),
			contextIsolation: true,
		},
		frame: false,
		backgroundColor: '#36393f',
		title: 'DiscordBotClient',
		// titleBarStyle: "hidden",
	});

	const tray = createTray(win);

	log.info(`Electron UserData: ${app.getPath('userData')}`);

	// Create the server
	const port = await server(2023, log, win);

	createNotification('Proxy Server', `Proxy server started on port ${port}`);

	if (!app.isPackaged) win.webContents.openDevTools();

	if (systemPreferences && systemPreferences.askForMediaAccess)
		systemPreferences.askForMediaAccess('microphone');

	win.webContents.on('new-window', function (e, url) {
		e.preventDefault();
		return shell.openExternal(url);
	});

	const path_ = path.join(__dirname, '..', 'Vencord');

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
		if (isNotifMinimized) return;
		isNotifMinimized = true;
		createNotification(
			APP_NAME + ' is running in background',
			'You can close the application in the taskbar',
		);
	});

	ipcMain.on('minimize', (event) => {
		win.minimize();
		event.sender.send('minicomplete', true);
	});

	ipcMain.on('max', (event) => {
		if (win.isMaximized()) {
			win.restore();
		} else {
			win.maximize();
		}
	});

	ipcMain.on('close', (event) => {
		win.hide();
		event.sender.send('closecomplete');
	});

	ipcMain.on('show-dialog-request', (event, arg) => {
		dialog.showMessageBox(win, arg).then((result) => {
			event.sender.send('show-dialog-response', result);
		});
	});
}

app.whenReady().then(() => {
	createWindow();
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

// before the app is terminated, clear both timers
app.on('before-quit', () => {
	log.info('App closing...');
});
