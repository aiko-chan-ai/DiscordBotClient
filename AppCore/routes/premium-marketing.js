const { Router } = require('express');

const app = Router();

app.all('/', (req, res) => {
	res.send([]);
});

module.exports = app;
