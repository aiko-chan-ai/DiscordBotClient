const { Router } = require('express');
const NitroData = require('../../../../../../AppAssets/NitroData');
const app = Router();

app.get('/', (req, res) => {
	res.send(NitroData[req.params.id]);
});

module.exports = app;
