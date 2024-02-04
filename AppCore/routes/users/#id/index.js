const { Router } = require('express');
const request = require('request');

const app = Router();

app.all('/', (req, res) => {
	req.pipe(request('https://discord.com' + req.originalUrl.slice(4))).pipe(
		res,
	);
});

module.exports = app;
