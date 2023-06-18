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
		const msg = Util.createMessageReplyCommand(
			'Pong!',
			applicationId,
			id,
			channelId,
			'ping',
			botId,
			nonce,
		);
		io.emit('dispatch', {
			t: 'MESSAGE_CREATE',
			session_id: sessionId,
			d: msg,
		});
	},
};
