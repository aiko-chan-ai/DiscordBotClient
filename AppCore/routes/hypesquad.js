const { Router } = require('express');

const app = Router();

app.all('/online', (req, res) => {
	res.send();
});

module.exports = app;
