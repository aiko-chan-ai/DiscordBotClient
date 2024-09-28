const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({
		users: [],
		next_index: 0,
	});
});

module.exports = app;
