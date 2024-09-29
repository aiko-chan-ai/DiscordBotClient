const { Router } = require('express');
const Util = require('../../../../AppAssets/Util');

const app = Router();

app.post('/', (req, res) => {
	const callback = (req, res) => {
		const BotToken = req.headers.authorization;
		const uid = Util.getIDFromToken(BotToken);
		let data = {
			...req.body,
			guild_id: req.params.id,
			user_id: uid,
		};
		res.status(200).send(data);
	};
	return Util.getDataFromRequest(req, res, callback);
});

module.exports = app;
