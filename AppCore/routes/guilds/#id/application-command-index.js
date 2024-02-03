const { Router } = require('express');
const SnowflakeUtil = require('../../../../AppAssets/SnowflakeUtil');

const app = Router();

app.get('/', (req, res) => {
	res.send({
		applications: [],
		application_commands: [],
		version: SnowflakeUtil.generate(),
	});
});

module.exports = app;
