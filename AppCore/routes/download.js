const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	return res.redirect(
		'https://github.com/aiko-chan-ai/DiscordBotClient/releases',
	);
});

module.exports = app;
