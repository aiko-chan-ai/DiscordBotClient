const { Router } = require('express');
const UserPatch = require('../../../../AppAssets/UserPatch');
const app = Router();

app.get('/', (req, res) => {
	res.send(UserPatch[1056491867375673424]);
});

app.all('/*', (req, res) => {
	res.status(404).send();
});

module.exports = app;
