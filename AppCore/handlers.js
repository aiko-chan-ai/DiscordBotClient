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

// patch
BigInt.prototype.toJSON = function () {
	return this.toString();
};

const defaultDataEmailSetting = {
	categories: {
		social: true,
		communication: true,
		recommendations_and_events: false,
		tips: false,
		updates_and_announcements: false,
	},
	initialized: true,
};

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
	if (
		url.includes('oauth2/') &&
		!url.includes('assets') &&
		!url.includes('rpc')
	) {
		return res.status(404).send({
			message: "Bot can't use this endpoint (blocked)",
		});
	}
	if (url.includes('application-commands/search')) {
		const Url = new URL(`https://discord.com${url}`);
		switch (Url.searchParams.get('type')) {
			// type: Slash commands
			case '1': {
				res.status(200).send({
					application_commands: Array.from(
						Commands.Slash,
						([name, value]) => Util.patchCommand(value),
					),
					applications: Url.searchParams.has('application_id')
						? null
						: [
								{
									id: '1056491867375673424',
									name: 'aiko-chan-ai',
									icon: '93fb88f6b8c0a2a33c437d0fff4c6625',
									description: '',
									summary: '',
									type: null,
									bot: UserPatch['1056491867375673424'],
								},
						  ],
					cursor: null,
				});
				break;
			}
			default: {
				res.status(200).send({
					application_commands: [],
					applications: [],
					cursor: null,
				});
				break;
			}
		}
		return;
	}
	if (url.includes('/interactions')) {
		if (req.method.toUpperCase() == 'POST') {
			const callback = (req, res) => {
				const commandData = JSON.parse(req.body?.payload_json);
				// console.log(commandData);
				const idInteraction = SnowflakeUtil.generate();
				commandData.id = idInteraction;
				io.emit('dispatch', {
					session_id: commandData.session_id,
					t: 'INTERACTION_CREATE',
					d: {
						id: idInteraction,
						nonce: commandData.nonce,
					},
				});
				const command = Commands.Slash.get(commandData.data.name);
				if (command) {
					command.run(
						commandData,
						req.headers.authorization,
						io,
						win,
					);
					io.emit('dispatch', {
						t: 'INTERACTION_SUCCESS',
						session_id: commandData.session_id,
						d: {
							id: idInteraction,
							nonce: commandData.nonce,
						},
					});
				} else {
					io.emit('dispatch', {
						session_id: commandData.session_id,
						t: 'INTERACTION_FAILURE',
						d: {
							id: idInteraction,
							nonce: commandData.nonce,
						},
					});
				}
				return res.status(204).send();
			};
			return getDataFromRequest(req, res, callback);
		}
	}
	if (url.includes('/profile')) {
		const BotToken = req.headers.authorization;
		const url_ = new URL(`https://discord.com${url}`);
		const id = url_.pathname.match(/\d{17,19}/)[0];
		const botId = Util.getIDFromToken(BotToken);
		return axios
			.get(`https://discord.com/api/v9/users/${id}`, {
				headers: {
					Authorization: BotToken,
					'Content-Type': 'application/json',
					'User-Agent': userAgent,
				},
			})
			.then(({ data }) => {
				return res.status(200).send(Util.ProfilePatch(data));
			})
			.catch(() => {
				return res.status(200).send(Util.ProfilePatch({ id }));
			});
	}
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
	if (url.includes('settings-proto/2')) {
		return res.send({
			settings: '',
		});
	}
	if (url.includes('/threads/search?archived=true')) {
		// TODO: fix this
		const cid = /\d{17,19}/.exec(url)[0];
		return axios
			.get(
				`https://discord.com/api/v9/channels/${cid}/threads/archived/public`,
				{
					headers: {
						authorization: req.headers.authorization,
						'user-agent': userAgent,
					},
				},
			)
			.then((response) => {
				res.status(200).send({
					...response.data,
					total_results: response.data.threads?.length || 0,
				});
			})
			.catch((err) => {
				res.status(404).send({
					message: err.message,
					error: err.stack,
					debug: {
						channelId: cid,
					},
				});
			});
	}
	return req.pipe(request('https://discord.com' + url)).pipe(res);
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
