const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({ guild_affinities: [] });
});

module.exports = app;
