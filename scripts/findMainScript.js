const { app, BrowserWindow } = require('electron');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

const URL = 'https://discord.com/channels/@me';

const folder = path.resolve('.', 'DiscordCore');

const HTMLPath = path.resolve(folder, 'index.html');

const createWindow = async () => {
	const mainWindow = new BrowserWindow({
		show: false,
	});
	await fetch(URL)
		.then((r) => r.text())
		.then((text) => {
			if (fs.existsSync(path.resolve(folder, 'oldIndex.html'))) {
				console.log('[Discord] Cannot update');
			} else {
				fs.renameSync(HTMLPath, path.resolve(folder, 'oldIndex.html'));
			}
			fs.writeFileSync(HTMLPath, text);
			require('./patchHTML')();
			const sentry = text
				.split('\n')
				.find((s) => s.trim().startsWith('SENTRY_TAGS'));
			console.log('[Discord] Build', sentry.trim());
		});
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
							const split = details.url.split('/');
							fs.writeFileSync(
								path.resolve(
									folder,
									'src',
									split[split.length - 1],
								),
								text,
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
