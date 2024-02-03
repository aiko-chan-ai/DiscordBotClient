const { Router } = require('express');
const multer = require('multer');
const Util = require('../../../../AppAssets/Util');

const app = Router();

function getDataFromRequest(req, res, callback) {
	var data = '';
	// check content-type
	if (req.headers['content-type'] !== 'application/json') {
		return multer().any()(req, res, function (err) {
			if (err) {
				console.error('Multer Error:', err);
			}
			callback(req, res);
		});
	}
	req.on('data', function (chunk) {
		data += chunk;
	});
	req.on('end', function () {
		req.rawBody = data;
		if (data) {
			try {
				req.body = JSON.parse(data);
			} catch (e) {
				req.body = undefined;
				console.error('JSON Parse Error:', e);
			}
			callback(req, res);
		}
	});
}

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
	return getDataFromRequest(req, res, callback);
});

module.exports = app;
