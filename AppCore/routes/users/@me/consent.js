const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({
		personalization: {
			consented: true,
		},
		usage_statistics: {
			consented: true,
		},
	});
});

module.exports = app;
