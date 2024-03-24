const { Router } = require('express');
const crypto = require('node:crypto');
const app = Router();

app.get('/', async (req, res) => {
	const salt = Math.random().toString();
	const hash = crypto
		.createHash('md5')
		.update(salt + 'Elysia')
		.digest('hex');
	return res.status(200).send({
		analytics_id: hash,
		doing_deep_historical_index: false,
		total_results: 0,
		messages: [],
		members: [],
		threads: [],
	});
});

module.exports = app;
