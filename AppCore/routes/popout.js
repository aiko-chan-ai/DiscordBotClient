const { Router } = require('express');
const request = require('request');

const app = Router();

app.get('/*', (req, res) => {
	return req.pipe(request('https://discord.com' + req.originalUrl)).pipe(res);
});

module.exports = app;
