const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.status(204).send();
});

module.exports = app;
