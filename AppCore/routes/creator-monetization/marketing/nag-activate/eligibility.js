const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({
		eligible_guilds: [],
	});
});

module.exports = app;
