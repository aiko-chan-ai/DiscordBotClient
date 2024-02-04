const { Router } = require('express');
const request = require('request');

const app = Router();

app.get('/', (req, res) => {
	const fileName = req.params.hash;
	if (fileName.endsWith('.map')) {
		return res.status(404).send();
	}
	return req
		.pipe(request('https://discord.com/assets/' + fileName))
		.pipe(res);
});

module.exports = app;
