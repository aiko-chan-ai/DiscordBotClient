const Util = require('../../Util');
const regex =
	/(mfa\.[a-z0-9_-]{20,})|([a-z0-9_-]{23,28}\.[a-z0-9_-]{6,7}\.[a-z0-9_-]{27})/i;

module.exports = {
	metadata: {
		default_member_permissions: null,
		type: 1,
		nsfw: false,
		name: 'switchtoken',
		description: 'Login with another token',
		dm_permission: true,
		contexts: null,
		options: [
			{
				type: 3,
				name: 'token',
				description: 'Bot token',
				required: true,
			},
		],
	},
	run(data, token, io) {
		const applicationId = data.application_id;
		const nonce = data.nonce;
		const channelId = data.channel_id;
		const sessionId = data.session_id;
		const id = data.id;
		const botId = Util.getIDFromToken(token);
		const msg = Util.createMessageReplyCommand(
			regex.test(data.data.options[0].value)
				? 'Waiting...'
				: 'Token is invalid',
			applicationId,
			id,
			channelId,
			'switchtoken',
			botId,
			nonce,
		);
		io.emit('dispatch', {
			t: 'MESSAGE_CREATE',
			session_id: sessionId,
			d: msg,
		});
		if (regex.test(data.data.options[0].value)) {
			io.emit('dispatch', {
				t: 'SWITCH_TOKEN',
				session_id: sessionId,
				d: data.data.options[0].value,
			});
		}
	},
};
