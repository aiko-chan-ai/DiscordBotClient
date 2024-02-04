const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({ user_affinities: [], inverse_user_affinities: [] });
});

module.exports = app;
