const { Router } = require('express');

const app = Router();

app.get('/gifts', (req, res) => {
	res.send([]);
});

module.exports = app;
