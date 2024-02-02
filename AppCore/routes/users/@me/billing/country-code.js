const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({ country_code: 'VN' });
});

module.exports = app;
