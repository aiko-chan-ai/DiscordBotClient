const { app: ElectronApp } = require('electron');
const path = require('path');
const { DiscordBuildVersion } = require('../package.json');
const { readFileSync } = require('fs');
const blacklist = require('./blacklist');
const request = require('request');

module.exports = function (app) {
	app.all('/developers/*', (req, res) => {
		return res.redirect('/app');
	});

	app.use((req, res, next) => {
		if (req.originalUrl.endsWith('.map')) return res.status(404).send();
		if (blacklist.some((_) => req.originalUrl.includes(_)))
			return res.status(404).send({
				message: "Bot can't use this endpoint (blocked)",
			});
		if (req.originalUrl.includes('/bot/api')) {
			return req
				.pipe(request('https://discord.com' + req.originalUrl.slice(4)))
				.pipe(res);
		}
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
