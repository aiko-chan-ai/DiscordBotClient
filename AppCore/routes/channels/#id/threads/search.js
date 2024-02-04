const { Router } = require('express');
const fetch = require('node-fetch');
const Util = require('../../../../../AppAssets/Util');

const app = Router();

app.all('/', (req, res) => {
	const channelId = req.params.id;
    const {
        archived,
        sort_by,
        sort_order,
        limit,
        tag_setting,
        offset
    } = req.query;
    fetch(
		`https://discord.com/api/v9/channels/${channelId}/threads/archived/public`,
		{
			headers: {
				authorization: req.headers.authorization,
				'user-agent': Util.UserAgent(),
			},
		},
	)
		.then((r) => r.json())
		.then((d) =>
			res.send({
				most_recent_messages: [],
				first_messages: [],
				...d,
				total_results: d.threads?.length ?? 0,
			}),
		)
		.catch((r) =>
			res.send({
				threads: [],
				members: [],
				has_more: false,
				total_results: 0,
			}),
		);
});

module.exports = app;
