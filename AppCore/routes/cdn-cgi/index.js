const { Router } = require('express');

const app = Router();

app.all('*', (req, res) => {
	res.status(204).send('console.log("ok")');
});

module.exports = app;
