const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({
		classifications: [],
		guild_classifications: [],
		account_standing: {
			state: 100,
		},
	});
});

module.exports = app;
