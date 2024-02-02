const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({
		code: 0,
		message: 'OK',
	});
});

module.exports = app;
