const { Router } = require('express');
const DiscoveryGuilds = require('../../AppAssets/DiscoveryGuilds');

const app = Router();

app.get('/', (req, res) => {
	const type = req.query.categories || 'default';
	res.send(
		DiscoveryGuilds[type] || {
			total: 0,
			guilds: [],
			offset: 0,
			limit: 100,
		},
	);
});

module.exports = app;
