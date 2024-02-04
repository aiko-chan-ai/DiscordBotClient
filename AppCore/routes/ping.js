const { Router } = require('express');
const { app: Electron } = require('electron');

const app = Router();

app.get('/', (req, res) => {
	res.send({
		code: 0,
		message: 'OK',
		version: Electron.getVersion(),
		isBotClient: true,
	});
});

module.exports = app;