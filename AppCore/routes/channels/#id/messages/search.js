const { Router } = require('express');
const crypto = require('node:crypto');

const app = Router();

app.all('/', (req, res) => {
	const salt = Math.random().toString();
	const hash = crypto
		.createHash('md5')
		.update(salt + 'elysia')
		.digest('hex');
	return res.status(200).send({
		analytics_id: hash,
		doing_deep_historical_index: false,
		total_results: 0,
		messages: [],
	});
});

module.exports = app;
