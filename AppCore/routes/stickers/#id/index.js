const { Router } = require('express');
const request = require('request');

const app = Router();

app.get('/', (req, res) => {
	req.pipe(request('https://discord.com/stickers/' + req.params.id)).pipe(
		res,
	);
});

module.exports = app;
