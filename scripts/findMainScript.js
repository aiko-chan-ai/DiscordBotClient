const { app, BrowserWindow } = require('electron');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

const URL = 'https://discord.com/channels/@me';

const folder = path.resolve('.', 'DiscordCore');

if (!fs.existsSync(folder)) {
	fs.mkdirSync(folder, {
		recursive: true,
	});
}

const HTMLPath = path.resolve(folder, 'index.html');

const createWindow = async () => {
	const mainWindow = new BrowserWindow({
		show: false,
	});
	await fetch(URL)
		.then((r) => r.text())
		.then((text) => {
			fs.writeFileSync(HTMLPath, text);
			require('./patchHTML')();
			const sentry = text
				.split('\n')
				.find((s) => s.trim().startsWith('SENTRY_TAGS'));
			console.log('[Discord] Build', sentry.trim());
		});
	app.quit();
	mainWindow.loadURL(URL);
	mainWindow.webContents.session.webRequest.onBeforeRequest(
		(details, callback) => {
			if (
				details.url.startsWith('https://discord.com/assets/') &&
				details.url.endsWith('.js')
			) {
				console.log('[Discord]', details.url);
				fetch(details.url)
					.then((r) => r.text())
					.then((text) => {
						if (text.includes('_doIdentify')) {
							app.quit();
							console.log(
								'[Discord] Got _doIdentify from',
								details.url,
							);
							app.quit();
						}
					});
			}
			callback({ cancel: false });
		},
	);
};

app.whenReady().then(() => {
	createWindow();
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
