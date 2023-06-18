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
});
