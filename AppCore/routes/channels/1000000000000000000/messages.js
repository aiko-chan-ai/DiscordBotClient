const { Router } = require('express');
const SystemMessages = require('../../../../AppAssets/SystemMessages');
const app = Router();

app.all('/', (req, res) => {
	switch (req.method.toLowerCase()) {
		case 'delete':
		case 'patch':
		case 'post': {
			return res.status(403).send('Forbidden');
		}
		default: {
			return res.send(SystemMessages);
		}
	}
});

app.all('/*', (req, res) => {
	res.status(404).send();
});

module.exports = app;
