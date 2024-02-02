const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({ token: null });
});

module.exports = app;
