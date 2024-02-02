const { Router } = require('express');
const Util = require('../../../../AppAssets/Util');
const fetch = require('node-fetch');

const app = Router();

app.get('/', (req, res) => {
	fetch('https://discord.com/api/v9/users/@me', {
		headers: {
			authorization: req.headers.authorization,
			'user-agent': Util.UserAgent(),
		},
	})
		.then((r) => r.json())
		.then((d) => res.send(Util.ProfilePatch(d)));
});

module.exports = app;
