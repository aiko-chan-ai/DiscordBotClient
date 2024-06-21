const { Router } = require('express');

const app = Router();

app.put('/', (req, res) => {
	res.status(403).send({
		message: 'Apps are not allowed to vote on polls. No rights! :)',
		code: 20001,
	});
});

module.exports = app;
