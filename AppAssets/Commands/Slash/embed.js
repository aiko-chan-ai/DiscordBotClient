const Util = require('../../Util');
const SnowflakeUtil = require('../../SnowflakeUtil');
const axios = require('axios');

module.exports = {
	metadata: {
		default_member_permissions: null,
		type: 1,
		nsfw: false,
		name: 'embed',
		description:
			'Creates an embed with the specified color in the specified channel',
		dm_permission: true,
		contexts: null,
		options: [
			{
				type: 3,
				name: 'color',
				description: 'Input color in hex format. Example: #fedbca',
				required: true,
			},
			{
				type: 3,
				name: 'text',
				description:
					'Input text (separate the title from the description with |)',
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
		let color = data.data.options[0].value;
		const text = data.data.options[1].value;
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
		// Resolve the color to decimal
		if (color.startsWith('#')) {
			color = color.slice(1);
		}
		if (color.length > 6 || Number.isNaN(parseInt(color, 16))) {
			msg.content = `"${data.data.options[0].value}" is not a valid color. Please enter a color in the \`#ffffff\` format. (hex)`;
			return io.emit('dispatch', {
				t: 'MESSAGE_CREATE',
				session_id: sessionId,
				d: msg,
			});
		}
		color = parseInt(color, 16);
		// Resolve the text to title and description
		let [title, description] = text.split('|');
		msg.content = 'Sending...';
		io.emit('dispatch', {
			t: 'MESSAGE_CREATE',
			session_id: sessionId,
			d: msg,
		});
		axios
			.post(
				`https://discord.com/api/v9/channels/${channelId}/messages`,
				{
					embeds: [
						{
							title,
							description:
								description && description.trim().length > 0
									? description
									: undefined,
							color,
						},
					],
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: token,
						'User-Agent': Util.UserAgent(),
					},
				},
			)
			.then((r) => {
				msg.content = 'Embed sent!';
				io.emit('dispatch', {
					t: 'MESSAGE_CREATE',
					session_id: sessionId,
					d: msg,
				});
			})
			.catch((e) => {
				msg.content = 'Error sending embed.\n' + e.message;
				io.emit('dispatch', {
					t: 'MESSAGE_CREATE',
					session_id: sessionId,
					d: msg,
				});
			});
	},
};
