const { Router } = require('express');
const request = require('request');

const app = Router();

app.get('/', (req, res) => {
	const fileName = req.params.hash;
	return req
		.pipe(request('https://discord.com/stickers/' + fileName))
		.pipe(res);
});

module.exports = app;
