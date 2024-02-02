const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({ fingerprint: '', assignments: [], guild_experiments: [] });
});

module.exports = app;
