const { contextBridge, ipcRenderer, app } = require('electron');

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
	getPackageNode: () => {
		return {
			version: app.getVersion(),
		};
	},
	requestCheckUpdate: () => {
		return new Promise((resolve) => {
			ipcRenderer.send('check-update');
			ipcRenderer.once('check-update-response', (event, response) => {
				resolve(response);
			});
		});
	},
	requestIntents: flags => {
		return new Promise((resolve, reject) => {
			ipcRenderer.send('get-intents', flags);
			ipcRenderer.once('get-intents-response', (event, response) => {
				resolve(response);
			});
		});
	},
	getBotInfo: token => {
		return new Promise((resolve, reject) => {
			ipcRenderer.send('get-bot-info', token);
			ipcRenderer.once('get-bot-info-response', (event, response) => {
				resolve(response);
			});
		});
	}
});
