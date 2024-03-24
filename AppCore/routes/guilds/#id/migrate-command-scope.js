const { Router } = require('express');

const app = Router();

app.post('/', (req, res) => {
	res.send({
		integration_ids_with_app_commands: [],
	});
});

module.exports = app;
