const { Router } = require('express');

const app = Router();

app.all('/', (req, res) => {
	res.send({
		application_commands: [],
        applications: [],
        cursor: null,
	});
});

module.exports = app;
