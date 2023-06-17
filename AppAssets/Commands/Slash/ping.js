const SnowflakeUtil = require('../../SnowflakeUtil');
const Util = require('../../Util');

module.exports = {
	metadata: {
		default_member_permissions: null,
		type: 1,
		nsfw: false,
		name: 'ping',
		description: 'Ping pong!',
		dm_permission: true,
		contexts: null,
	},
	run(data, token, io) {
		const applicationId = data.application_id;
		const nonce = data.nonce;
		const channelId = data.channel_id;
		const sessionId = data.session_id;
		const id = data.id;
        const botId = Util.getIDFromToken(token);
		const msg = {
			applicationId,
			author: {
				id: applicationId,
			},
			channel_id: channelId,
			content: 'Pong!',
			embeds: [],
			flags: 1 << 6,
			// Ephemeral | 1 << 6
			// Normal | 0
			id: SnowflakeUtil.generate(),
			interaction: {
				id,
				name: 'ping',
				type: 2,
				user: {
					id: botId,
					username: 'BotClient',
					avatar: null,
				},
				displayName: 'ping',
			},
			timestamp: new Date().toISOString(),
			type: 20, // Chat Input
			nonce,
		};
		io.emit('dispatch', {
			t: 'MESSAGE_CREATE',
			session_id: sessionId,
			d: msg,
		});
	},
};
