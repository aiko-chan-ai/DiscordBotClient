const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('title', {
	mini: () => {
		ipcRenderer.send('minimize');
	},
	max: () => {
		ipcRenderer.send('max');
	},
	close: () => {
		ipcRenderer.send('close');
	},
});

contextBridge.exposeInMainWorld('electron', {
	showDialog: (options) => {
		return new Promise((resolve) => {
			ipcRenderer.send('show-dialog-request', options);
			ipcRenderer.once('show-dialog-response', (event, response) => {
				resolve(response);
			});
		});
	},
	requestCheckUpdate: () => {
		return new Promise((resolve) => {
			ipcRenderer.send('check-update');
			ipcRenderer.once('check-update-response', (event, response) => {
				resolve(response);
			});
		});
	},
	requestIntents: (flags) => {
		return ipcRenderer.sendSync('get-intents', flags);
	},
	getBotInfo: (token) => {
		return new Promise((resolve, reject) => {
			ipcRenderer.send('get-bot-info', token);
			ipcRenderer.once('get-bot-info-response', (event, response) => {
				resolve(response);
			});
		});
	},
	getElectronVersion() {
		return ipcRenderer.sendSync('getElectronVersion');
	},
	getBotClientVersion() {
		return ipcRenderer.sendSync('getBotClientVersion');
	},
});
