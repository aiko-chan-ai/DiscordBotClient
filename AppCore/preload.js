const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('title', {
	mini: () => {
		ipcRenderer.sendSync('minimize');
	},
	max: () => {
		ipcRenderer.sendSync('max');
	},
	close: () => {
		ipcRenderer.sendSync('close');
	},
});

function getUserPatch(id) {
	return ipcRenderer.sendSync('getUserPatch', id);
}

contextBridge.exposeInMainWorld('electron', {
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
	getSettingProto1(id) {
		return ipcRenderer.sendSync('getSettingProto1', id);
	},
	getUserPatch,
	getPrivateChannelLogin(botId) {
		const privateChannel = ipcRenderer.sendSync('getPrivateChannel', botId);
		const allChannel = Object.values(privateChannel);
		allChannel.unshift({
			type: 1,
			recipients: [
				getUserPatch('1056491867375673424'),
			],
			last_message_id: '1000000000000000000',
			is_spam: false,
			id: '1000000000000000000',
			flags: 0,
		});
		return allChannel;
	},
	getUserExperiments() {
		return ipcRenderer.sendSync('getExperiment', 'user');
	},
	getGuildExperiments() {
		return ipcRenderer.sendSync('getExperiment', 'guild');
	},
	handleOpenPrivateChannel(botId, userId, channelId) {
		return ipcRenderer.sendSync('handlePrivateChannel', 'add', botId, channelId, userId);
	},
	handleClosePrivateChannel(botId, channelId) {
		return ipcRenderer.sendSync('handlePrivateChannel', 'remove', botId, channelId);
	}
});
