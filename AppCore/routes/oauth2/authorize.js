const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.redirect('/app');
});

module.exports = app;
