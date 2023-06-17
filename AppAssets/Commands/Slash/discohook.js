const Util = require('../../Util');
const SnowflakeUtil = require('../../SnowflakeUtil');
const axios = require('axios');

module.exports = {
	metadata: {
		id: '', // skip
		application_id: '', // skip
		version: '', // skip
		default_member_permissions: null,
		type: 1,
		nsfw: false,
		name: 'discohook',
		description: 'Send messages created with Discohook',
		dm_permission: true,
		contexts: null,
		options: [
			{
				type: 3,
				name: 'url',
				description:
					'Input the Discohook URL (share.discohook.app | discohook.org)',
				required: true,
			},
		],
	},
	async run(data, token, io) {
		const applicationId = data.application_id;
		const nonce = data.nonce;
		const channelId = data.channel_id;
		const sessionId = data.session_id;
		const id = data.id;
		const botId = Util.getIDFromToken(token);
		const url = data.data.options[0].value;
		const msg = {
			applicationId,
			author: {
				id: applicationId,
			},
			channel_id: channelId,
			content: '',
			embeds: [],
			flags: 1 << 6,
			// Ephemeral | 1 << 6
			// Normal | 0
			id: SnowflakeUtil.generate(),
			interaction: {
				id,
				name: 'embed',
				type: 2,
				user: {
					id: botId,
					username: 'BotClient',
					avatar: null,
				},
				displayName: 'embed',
			},
			timestamp: new Date().toISOString(),
			type: 20, // Chat Input
			nonce,
		};
		let Url;
		try {
			let ok = 0;
			let fail = 0;
			Url = new URL(url);
			if (Url.hostname === 'share.discohook.app') {
				const response = await axios.get(url);
				Url = new URL(response.request.res.responseUrl);
			}
			if ('discohook.org' !== Url.hostname) {
				throw new Error('Invalid URL');
			}
			let data = Url.searchParams.get('data'); // base64
			if (!data) {
				throw new Error('Invalid URL');
			}
			data = JSON.parse(Buffer.from(data, 'base64').toString());
			const messages = data.messages;
			for (let i = 0; i < messages.length; i++) {
				const message = messages[i].data;
				msg.content = `Sending message ${i + 1} of ${
					messages.length
				}...`;
				io.emit('dispatch', {
					t: 'MESSAGE_CREATE',
					session_id: sessionId,
					d: msg,
				});
				await axios
					.post(
						`https://discord.com/api/v9/channels/${channelId}/messages`,
						message,
						{
							headers: {
								'Content-Type': 'application/json',
								Authorization: token,
								'User-Agent': Util.UserAgent(),
							},
						},
					)
					.then((r) => {
						ok++;
					})
					.catch((e) => {
						fail++;
					});
			}
			msg.content = `Sent ${ok} messages, ${fail} failed.`;
			io.emit('dispatch', {
				t: 'MESSAGE_CREATE',
				session_id: sessionId,
				d: msg,
			});
		} catch (e) {
			msg.content =
				'Invalid URL\n' +
				`\`${url}\` is not a valid URL (\`share.discohook.app\` | \`discohook.org\`) or the URL is not accessible.`;
			io.emit('dispatch', {
				t: 'MESSAGE_CREATE',
				session_id: sessionId,
				d: msg,
			});
			return;
		}
	},
};
