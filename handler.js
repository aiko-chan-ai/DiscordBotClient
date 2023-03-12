const fs = require('fs');
const path = require('path');
const request = require('request');
const axios = require('axios');
const { PreloadedUserSettings } = require('discord-protos');
const settingDefault = require('./setting-proto.js');
const { version } = require('./package.json');
const nitro = require('./assets/nitro.js');
const msg = require('./assets/msg.js');
const UserData = require('./assets/user.js');
const Profile = require('./assets/profile.js');
const userAgent = `DiscordBot (https://github.com/aiko-chan-ai/DiscordBotClient, v${version})`;

const cacheSettings = new Map(); // <id, settings>

function getDataFromRequest(req, res, callback) {
	var data = '';
	req.on('data', function (chunk) {
		data += chunk;
	});
	req.on('end', function () {
		req.rawBody = data;
		if (data && data.indexOf('{') > -1) {
			req.body = JSON.parse(data);
		}
		callback(req, res);
	});
}

module.exports = function (app) {
	const handlerRequest = (url, req, res) => {
		// Author:
		if (url.endsWith('users/1056491867375673424')) {
			return res.send(UserData);
		}
		if (url.includes('users/1056491867375673424/profile')) {
			return res.send(Profile);
		}
		if (url.includes('channels/1000000000000000000/messages')) {
			return res.send(msg);
		}
		// nitro
		if (url.includes('store/published-listings/skus/')) {
			if (url.includes('978380684370378762/subscription-plans')) {
				return res.send(nitro['978380684370378762']);
			} else if (url.includes('521842865731534868/subscription-plans')) {
				return res.send(nitro['521842865731534868']);
			} else if (url.includes('521846918637420545/subscription-plans')) {
				return res.send(nitro['521846918637420545']);
			} else if (url.includes('521847234246082599/subscription-plans')) {
				return res.send(nitro['521847234246082599']);
			} else if (url.includes('590663762298667008/subscription-plans')) {
				return res.send(nitro['590663762298667008']);
			}
		}
		if (url.includes('billing/subscriptions')) {
			return res.send([]);
		}
		if (url.includes('auth/logout')) {
			return res.status(204).send();
		}
		const blacklist = [
			'entitlements/gifts',
			'outbound-promotions/codes',
			'experiments',
			'entitlements',
			'science',
			'affinities',
			'users/@me/harvest',
			'auth/',
			'applications/public',
			'notes',
		].some((path) => url.includes(path));
		if (blacklist)
			return res.status(404).send({
				message: 'Bot is not authorized to access this endpoint :))',
			});
		if (
			url.includes('oauth2/') &&
			!url.includes('assets') &&
			!url.includes('rpc')
		) {
			return res.status(404).send({
				message: 'Bot is not authorized to access this endpoint :))',
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
			return res.status(200).send({
				applications: [],
				application_commands: [],
				cursor: null,
			});
		} else if (url.includes('/profile')) {
			const BotToken = req.headers.authorization;
			const url_ = new URL(`https://discord.com${url}`);
			const id = url_.pathname.match(/\d{17,19}/)[0];
			// const guild_id = url_.searchParams.get('guild_id');
			axios
				.get(`https://discord.com/api/v9/users/${id}`, {
					headers: {
						Authorization: BotToken,
						'Content-Type': 'application/json',
						'User-Agent': userAgent,
					},
				})
				.then(({ data }) => {
					return res.status(200).send({
						user: data,
						connected_accounts: [],
						premium_since: null,
						premium_type: data.banner ? 2 : null,
						premium_guild_since: null,
						profile_themes_experiment_bucket: -1,
						mutual_friends_count: 0,
						mutual_guilds: [],
						user_profile: {
							bio: null,
							accent_color: data.accent_color,
							banner: data.banner,
							popout_animation_particle_type: null,
							emoji: null,
						},
					});
				})
				.catch(() => {
					return res.status(200).send({
						user: {},
						connected_accounts: [],
						premium_since: null,
						premium_type: null,
						premium_guild_since: null,
						profile_themes_experiment_bucket: -1,
						user_profile: {},
					});
				});
		} else if (
			[
				'users/@me/mentions',
				'billing/',
				'activities/guilds',
				'interactions',
				'premium/subscription',
				'relationships',
				'messages/search',
				'store/published-listings/skus',
			].some((path) => url.includes(path))
		) {
			return res.status(200).send([]);
		} else if (url.includes('settings-proto/1')) {
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
				const settings = cacheSettings.get(uid) || settingDefault;
				const decoded = PreloadedUserSettings.fromBase64(
					req.body.settings,
				);
				settings.data1 = Object.assign(settings.data1, decoded);
				cacheSettings.set(uid, settings);
				return res.send({
					settings: PreloadedUserSettings.toBase64(settings.data1),
				});
			};
			return getDataFromRequest(req, res, callback);
		} else if (url.includes('settings-proto/2')) {
			return res.send({
				settings: '',
			});
		} else if (url.includes('/threads/search?archived=true')) {
			const cid = /\d{17,19}/.exec(url)[0];
			axios
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
					res.status(200).send(response.data);
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
		} else if (url.includes('/ask') || url.includes('/ack')) {
			return res.status(200).send({ token: null });
		} else if (url.includes('billing/country-code')) {
			return res.status(200).send({
				country_code: 'VN',
			});
		} else if (url.includes('logout')) {
			return res.status(200).send();
		} else {
			return req.pipe(request('https://discord.com' + url)).pipe(res);
		}
	};

	app.get('/ping', function (req, res) {
		res.status(200).send('pong');
	});

	app.all('/d/*', function (req, res) {
		const str = req.originalUrl;
		const trs = str.slice('\x32');
		console.log('URL Request', trs);
		let headers = {
			'user-agent': userAgent,
			authorization: `${req.headers.authorization}`,
		};
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
	app.all('/assets*', function (req, res) {
		const str = req.originalUrl;
		const trs = str;
		console.log('Require Assets:', trs);
		const patchList = fs.readdirSync(path.resolve(__dirname, 'script'));
		if (patchList.some((patch) => trs.endsWith(patch))) {
			res.set('Cache-Control', 'no-store');
			console.log('Load script target', trs);
			return res.sendFile(
				path.resolve(__dirname, 'script', trs.replace('/assets/', '')),
			);
		}
		return req.pipe(request('https://discord.com' + trs)).pipe(res);
		if (trs.endsWith('js')) {
			request(
				'https://discord.com' + trs,
				undefined,
				(err, res, body) => {
					if (err) {
						return console.log(err);
					}
					if (body.includes('._handleDispatch=function(')) {
						console.log('Script target: ', trs);
					}
				},
			);
		}
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
		res.sendFile(path.resolve(__dirname, '404.html'));
	});
};
