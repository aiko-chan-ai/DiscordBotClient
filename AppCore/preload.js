const { contextBridge, ipcRenderer } = require('electron');
const package = require('../package.json');

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
		return package;
	},
	requestCheckUpdate: () => {
		return new Promise((resolve) => {
			ipcRenderer.send('check-update');
			ipcRenderer.once('check-update-response', (event, response) => {
				resolve(response);
			});
		});
	},
	requestIntents: token => {
		return new Promise((resolve, reject) => {
			ipcRenderer.send('get-intents', token);
			ipcRenderer.once('get-intents-response', (event, response) => {
				resolve(response);
			});
		});
	}
});
