const { Router } = require('express');
const { app: Electron } = require('electron');

const app = Router();

app.get('/', (req, res) => {
	res.send([]);
});

module.exports = app;
