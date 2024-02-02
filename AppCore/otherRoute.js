const { app: ElectronApp } = require('electron');
const path = require('path');
const { DiscordBuildVersion } = require('../package.json');
const { readFileSync } = require('fs');
const Util = require('../AppAssets/Util');
const blacklist = require('./blacklist');

module.exports = function (app) {
	app.all('/bot/*', function (req, res, next) {
		let headers = {
			'user-agent': Util.UserAgent(),
		};
		if (req.headers.authorization) {
			headers.authorization = req.headers.authorization;
		}
		Object.keys(req.headers).forEach((key) => {
			if (
				[
					'cookie',
					'x-',
					'sec-',
					'referer',
					'origin',
					'authorization',
					'user-agent',
				].some((prefix) => key.toLowerCase().startsWith(prefix))
			) {
				return;
			} else {
				headers[key] = req.headers[key];
			}
		});
		req.headers = headers;
		next();
	});

	app.all('/developers/*', (req, res) => {
		return res.redirect('/app');
	});

	app.all('*', (req, res) => {
		if (req.originalUrl.endsWith('.map')) return res.status(404).send();
		if (blacklist.some((_) => req.originalUrl.includes(_)))
			return res.status(404).send({
				message: "Bot can't use this endpoint (blocked)",
			});
		if (!ElectronApp.isPackaged) {
			res.send(
				readFileSync(
					path.resolve(__dirname, '..', 'DiscordCore', 'index.html'),
					'utf8',
				),
			);
		} else {
			getData(
				`https://raw.githubusercontent.com/aiko-chan-ai/DiscordBotClient/${DiscordBuildVersion}/index.html`,
			).then((t) => res.send(t));
		}
	});
};
