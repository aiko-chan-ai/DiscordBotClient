const { Router } = require('express');

const app = Router();

app.all('/', (req, res) => {
	res.send({ token: null });
});

module.exports = app;
