const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({
		activities: [],
		applications: [],
		assets: {},
	});
});

module.exports = app;
