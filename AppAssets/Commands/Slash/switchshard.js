const Util = require('../../Util');
const regex =
	/(mfa\.[a-z0-9_-]{20,})|([a-z0-9_-]{23,28}\.[a-z0-9_-]{6,7}\.[a-z0-9_-]{27})/i;

module.exports = {
	metadata: {
		default_member_permissions: null,
		type: 1,
		nsfw: false,
		name: 'switchshard',
		description: 'Login with another shard ID',
		dm_permission: true,
		contexts: null,
		options: [
			{
				type: 4,
				name: 'id',
				description: 'Shard ID',
				required: true,
				min_value: 0,
			},
		],
	},
	run(data, token, io, win) {
		const applicationId = data.application_id;
		const nonce = data.nonce;
		const channelId = data.channel_id;
		const sessionId = data.session_id;
		const id = data.id;
		const botId = Util.getIDFromToken(token);
		const msg = Util.createMessageReplyCommand(
			'Waiting...',
			applicationId,
			id,
			channelId,
			'switchshard',
			botId,
			nonce,
		);
        const allShard = win.map.get(botId) || 1;
        const shardId = data.data.options[0].value;
        if (shardId >= allShard) {
            msg.content = `Invalid shard ID: ${shardId} (Max ID: ${allShard - 1})`;
            return io.emit('dispatch', {
				t: 'MESSAGE_CREATE',
				session_id: sessionId,
				d: msg,
			});
        } else {
            return io.emit('dispatch', {
				t: 'SWITCH_SHARD_ID',
				session_id: sessionId,
				d: {
					id: data.data.options[0].value,
                    token,
				},
			});
        }
	},
};
