const { Router } = require('express');
const Util = require('../../../../AppAssets/Util');
const fetch = require('node-fetch');
const request = require('request');

const app = Router();

app.get('/', (req, res) => {
	fetch('https://discord.com/api/v9/users/' + req.params.id, {
		headers: {
			authorization: req.headers.authorization,
			'user-agent': Util.UserAgent(),
		},
	})
		.then((r) => r.json())
		.then((d) => res.send(Util.ProfilePatch(d)));
});

app.patch('/', (req, res) => {
	return req.pipe(request('https://discord.com/api/v9/users/@me')).pipe(res);
});

module.exports = app;
