const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.redirect('https://discord.com/developers/docs/intro');
});

module.exports = app;
