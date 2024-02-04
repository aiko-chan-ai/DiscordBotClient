const { ipcRenderer, app: ElectronApp } = require('electron');
const request = require('request');
const axios = require('axios');
const { PreloadedUserSettings } = require('discord-protos');
const crypto = require('crypto');
const Store = require('electron-store');
const multer = require('multer');
const path = require('path');
const { DiscordBuildVersion } = require('../package.json');

const settingDefault = require('../AppAssets/SettingProto');

const NitroData = require('../AppAssets/NitroData');
const UserPatch = require('../AppAssets/UserPatch');
const Util = require('../AppAssets/Util');
const SystemMessages = require('../AppAssets/SystemMessages');
const Commands = require('../AppAssets/Commands/index');
const SnowflakeUtil = require('../AppAssets/SnowflakeUtil');
const DiscoveryGuilds = require('../AppAssets/DiscoveryGuilds');
const { readdirSync, readFileSync } = require('fs');

const userAgent = Util.UserAgent();

const text = 'elysia-chan'; // idk :3

const cacheSettings = new Store(); // <id, settings>
const emailSettings = new Map(); // <id, settings>

const interactionCache = new Map(); // <any, any>

const patchList = readdirSync(
	path.resolve(__dirname, '..', 'DiscordCore', 'src'),
);

async function getData(url) {
	try {
		const html = await fetch(url);
		return await html.text();
	} catch {
		return null;
	}
}

const multer = require('multer');
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

const handlerRequest = (url, req, res, win) => {
	// Store
	if (url.includes('settings-proto/1')) {
		// parse userid from header
		const BotToken = req.headers.authorization;
		const uid = Buffer.from(
			BotToken.replace('Bot ', '').split('.')[0],
			'base64',
		).toString();
		if (cacheSettings.get(uid) == undefined) {
			cacheSettings.set(uid, settingDefault);
		}
		if (req.method.toUpperCase() == 'GET')
			return res.send({
				settings: PreloadedUserSettings.toBase64(
					cacheSettings.get(uid).data1,
				),
			});
		const callback = (req, res) => {
			const BotToken = req.headers.authorization;
			const uid = Buffer.from(
				BotToken.replace('Bot ', '').split('.')[0],
				'base64',
			).toString();
			if (cacheSettings.get(uid) == undefined) {
				cacheSettings.set(uid, settingDefault);
			}
			const settings = cacheSettings.get(uid);
			const decoded = PreloadedUserSettings.fromBase64(req.body.settings);
			settings.data1 = Object.assign(settings.data1, decoded);
			cacheSettings.set(uid, settings);
			return res.send({
				settings: PreloadedUserSettings.toBase64(settings.data1),
			});
		};
		return getDataFromRequest(req, res, callback);
	}
};

module.exports = function (app, win) {
	app.get('/ping', function (req, res) {
		res.status(200).send('pong');
	});

	app.all('/d/*', function (req, res) {
		const str = req.originalUrl;
		const trs = str.slice('\x32');
		let headers = {
			'user-agent': userAgent,
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
		handlerRequest(trs, req, res, win);
	});

	app.all('/sticker*', function (req, res) {
		const str = req.originalUrl;
		const trs = str;
		req.pipe(request('https://discord.com' + trs)).pipe(res);
	});

	app.all('/asset*', function (req, res) {
		const str = req.originalUrl;
		const trs = str;
		if (trs.endsWith('.map')) {
			return res.status(404).send();
		}
		const fileName = patchList.find(v => trs.includes(v))
		if (fileName) {
			res.set('Cache-Control', 'no-store');
			console.log('Load script target', trs);
			if (!ElectronApp.isPackaged) {
				res.send(
					readFileSync(
						path.resolve(
							__dirname,
							'..',
							'DiscordCore',
							'src',
							fileName,
						),
						'utf8',
					).toString(),
				);
			} else {
				getData(
					`https://raw.githubusercontent.com/aiko-chan-ai/DiscordBotClient/${DiscordBuildVersion}/src/${fileName}`,
				).then((r) => res.send(r));
			}
		}
		return req.pipe(request('https://discord.com' + trs)).pipe(res);
	});
	// Some request ...
	app.all('/oauth2/authorize', (req, res) => {
		res.redirect('/app');
	});
	app.all('/developers/*', (req, res) => {
		if (req.originalUrl.includes('developers/docs/intro')) {
			return res.redirect('https://discord.com/developers/docs/intro');
		} else {
			return res.redirect('/app');
		}
	});
	app.all('*', (req, res) => {
		if (req.originalUrl.endsWith('.map')) return res.status(404).send();
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
