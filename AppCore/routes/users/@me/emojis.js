// Custom API, Discord doesn't have this endpoint
const fetch = require('node-fetch');
const Util = require('../../../../AppAssets/Util');

const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	const id = Util.getIDFromToken(req.headers.authorization);
	fetch(`https://discord.com/api/v9/applications/${id}/emojis`, {
		headers: {
			authorization: req.headers.authorization,
			'user-agent': Util.UserAgent(),
		},
	})
		.then((r) => r.json())
		.then((r) => {
			// Emoji
			r.items.map((emoji, i) => {
                return {
					roles: [],
					require_colons: emoji.require_colons,
					name: emoji.name,
					managed: false,
					id: emoji.id,
					available: true,
					animated: emoji.animated,
					allNamesString: `:${emoji.name}:`,
					guildId: '0',
					type: 1,
				};
			});
			res.send(r.items);
		})
		.catch(() => {
            res.send([]);
        });
});

module.exports = app;
