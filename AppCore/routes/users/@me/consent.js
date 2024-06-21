const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({
		personalization: {
			consented: false,
		},
		usage_statistics: {
			consented: false,
		},
	});
});

module.exports = app;
