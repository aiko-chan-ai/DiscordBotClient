const request = require('request');
const axios = require('axios');
const { PreloadedUserSettings } = require('discord-protos');
const crypto = require('crypto');
const Store = require('electron-store');
const multer = require('multer');

const settingDefault = require('../AppAssets/SettingProto');

const NitroData = require('../AppAssets/NitroData');
const UserPatch = require('../AppAssets/UserPatch');
const Util = require('../AppAssets/Util');
const SystemMessages = require('../AppAssets/SystemMessages');
const Commands = require('../AppAssets/Commands/index');
const SnowflakeUtil = require('../AppAssets/SnowflakeUtil');

const userAgent = Util.UserAgent();

const text = 'elysia-chan'; // idk :3

const cacheSettings = new Store(); // <id, settings>
const emailSettings = new Map(); // <id, settings>

const interactionCache = new Map(); // <any, any>

/**
 * @type {import('socket.io').Server}
 */
let io;

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

const handlerRequest = (url, req, res) => {
	// Author:
	if (/users\/\d{17,19}/.exec(url)) {
		const id = url.match(/users\/(\d{17,19})/)[1];
		const UserData = UserPatch[id];
		if (url.includes('profile') && UserData) {
			return res.send(Util.ProfilePatch(UserData));
		} else if (UserData) {
			return res.send(UserData);
		}
	}
	if (url.includes('channels/1000000000000000000/messages')) {
		switch (req.method.toLowerCase()) {
			case 'delete':
			case 'patch':
			case 'post': {
				return res.status(403).send('Forbidden');
			}
			default: {
				return res.send(SystemMessages);
			}
		}
	}
	if (url.includes('voice-channel-effects')) {
		return res.status(200).send();
	}
	// Store
	if (url.includes('store/published-listings/skus/')) {
		const id = url.match(/(\d{17,19})\/subscription-plans/)[1];
		return res.send(NitroData[id]);
	}
	if (
		url.includes('billing/subscriptions') ||
		url.includes('entitlements/gifts')
	) {
		return res.send([]);
	}
	if (url.includes('auth/logout')) {
		return res.status(204).send();
	}
	const blacklist = [
		'outbound-promotions/codes',
		'entitlements',
		'experiments',
		'science',
		'affinities',
		'auth/',
		'applications/public',
		'notes',
		'roles/member-counts',
		'member-ids',
		'connections/configuration',
		'users/@me/mfa/totp',
		'users/@me/disable',
		'users/@me/delete',
		'users/@me/harvest',
		'connections/eligibility',
		'activities/shelf',
	].some((path) => url.includes(path));
	if (blacklist)
		return res.status(404).send({
			message: "Bot can't use this endpoint (blocked)",
		});
	if (
		url.includes('oauth2/') &&
		!url.includes('assets') &&
		!url.includes('rpc')
	) {
		return res.status(404).send({
			message: "Bot can't use this endpoint (blocked)",
		});
	}
	if (url.includes('api/download')) {
		return res.redirect(
			'https://github.com/aiko-chan-ai/DiscordBotClient/releases',
		);
	}
	if (url.includes('hypesquad/online')) {
		return res.status(204).send();
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
					command.run(commandData, req.headers.authorization, io);
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
				return res
					.status(200)
					.send(Util.ProfilePatch(data, botId == id));
			})
			.catch(() => {
				return res.status(200).send(Util.ProfilePatch({ id }));
			});
	}
	if (
		[
			'users/@me/mentions',
			'billing/',
			'activities/guilds',
			'premium/subscription',
			'relationships',
			'store/published-listings/skus',
		].some((path) => url.includes(path))
	) {
		return res.status(200).send([]);
	}
	if (url.includes('onboarding')) {
		return res
			.status(404)
			.send('Bot can use this endpoint but it will crash the client :<');
	}
	if (url.includes('/onboarding-responses')) {
		if (req.method.toUpperCase() == 'POST') {
			const callback = (req, res) => {
				const guild_id = /\d{17,19}/.exec(url)[0];
				const BotToken = req.headers.authorization;
				const uid = Buffer.from(
					BotToken.replace('Bot ', '').split('.')[0],
					'base64',
				).toString();
				let data = {
					...req.body,
					guild_id,
					user_id: uid,
				};
				delete data.update_roles_and_channels;
				res.status(200).send(data);
			};
			return getDataFromRequest(req, res, callback);
		}
	}
	if (url.includes('messages/search')) {
		const salt = Math.random().toString();
		const hash = crypto
			.createHash('md5')
			.update(salt + text)
			.digest('hex');
		return res.status(200).send({
			analytics_id: hash,
			doing_deep_historical_index: false,
			total_results: 0,
			messages: [],
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
	if (url.includes('users/@me/email-settings')) {
		return res.send(defaultDataEmailSetting);
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
	if (url.includes('api/v9/users/@me') && req.method.toUpperCase() == 'GET') {
		return axios
			.get(`https://discord.com/api/v9/users/@me`, {
				headers: {
					authorization: req.headers.authorization,
					'user-agent': userAgent,
				},
			})
			.then((response) => {
				let data = response.data;
				data.premium = true;
				data.premium_type = 1; // Nitro Classic
				data.mfa_enabled = 1; // Enable 2FA
				data.flags = '476111'; // All flags
				data.public_flags = '476111'; // All flags
				data.phone = '+1234567890'; // Fake phone
				data.verified = true; // verify
				data.nsfw_allowed = true; // Allow nsfw (ios)
				data.email = 'DiscordBotClient@aiko.com'; // fake email, not a real one
				data.purchased_flags = 3;
				res.status(200).send(data);
			})
			.catch((err) => {
				res.status(404).send();
			});
	}
	if (url.includes('/ack')) {
		return res.status(200).send({ token: null });
	}
	if (url.includes('billing/country-code')) {
		return res.status(200).send({
			country_code: 'VN',
		});
	}
	if (url.includes('logout')) {
		return res.status(200).send();
	}
	return req.pipe(request('https://discord.com' + url)).pipe(res);
};

/**
 * @param {import('socket.io').Server} io
 */
function handlerIO(io) {
	io.on('connection', (socket) => {
		console.log('A user connected');
		socket.on('disconnect', () => {
			console.log('User disconnected');
		});
	});
}

module.exports = function (app, logger, html, patchList, scriptTarget) {
	io = app.io;

	handlerIO(io);

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
		handlerRequest(trs, req, res);
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
		if (patchList.some((patch) => trs.endsWith(`${patch}.js`))) {
			res.set('Cache-Control', 'no-store');
			(0, logger?.info || console.log)('Load script target', trs);
			return res.send(
				scriptTarget[trs.replace('/assets/', '').replace('.js', '')],
			);
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
		res.send(html);
	});
};
