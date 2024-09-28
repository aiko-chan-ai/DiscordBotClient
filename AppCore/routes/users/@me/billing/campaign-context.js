const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send([
		{
			campaign: 2,
			is_eligible: false,
		},
	]);
});

module.exports = app;
