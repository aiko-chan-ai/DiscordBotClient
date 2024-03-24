const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send();
});

app.post('/', (req, res) => {
    res.status(403).send({
		message: 'Bots cannot use this endpoint (blocked)',
		code: 20001,
	});
})

module.exports = app;
