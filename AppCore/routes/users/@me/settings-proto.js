const { Router } = require('express');

const app = Router();

app.all('/1', (req, res) => {
	res.send({
		code: 0,
		message: 'OK',
	});
});

app.all('/2', (req, res) => {
	res.send({
		settings: '',
	});
});

module.exports = app;
