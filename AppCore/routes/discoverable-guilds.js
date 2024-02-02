const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({
		total: 0,
		guilds: [],
		offset: 0,
		limit: 100,
	});
});

module.exports = app;
