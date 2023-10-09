const Util = require('../../Util');
const axios = require('axios');
const SnowflakeUtil = require('../../SnowflakeUtil');

module.exports = {
	metadata: {
		default_member_permissions: null,
		type: 1,
		nsfw: false,
		name: 'clear',
		description: 'Clear messages from the channel',
		dm_permission: false,
		contexts: null,
		options: [
			{
				type: 4,
				name: 'amount',
				description: 'Input the number of messages to clear,
				required: true,
				min_value: 2,
				max_value: 100,
			},
		],
	},
	run: async (data, token, io, win) => {
		const applicationId = data.application_id;
		const nonce = data.nonce;
		const channelId = data.channel_id;
		const sessionId = data.session_id;
		const id = data.id;
		const botId = Util.getIDFromToken(token);
		const msg = Util.createMessageReplyCommand(
			'',
			applicationId,
			id,
			channelId,
			'clear',
			botId,
			nonce,
		);
		let i = 0;
		let interval = setInterval(() => {
			i++;
			msg.content = `Clearing ${'.'.repeat(i % 4)}`;
			io.emit('dispatch', {
				t: 'MESSAGE_CREATE',
				session_id: sessionId,
				d: msg,
			});
		}, 500);
		let amount = data.data.options[0].value;

		try {
			const messages = await getMessagesToDelete(channelId, amount, token);
			if (messages.length === 0) {
				msg.content = 'No messages to clear.';
			} else {
				await bulkDelete(channelId, messages, token); //start deleting
				msg.content = `Cleared ${messages.length} messages.`;
			}
		} catch (e) {
			msg.content = 'Failed to clear messages\nError: ' + e.message || 'Unknown error';
		}
		clearInterval(interval);
		io.emit('dispatch', {
			t: 'MESSAGE_CREATE',
			session_id: sessionId,
			d: msg,
		});
	},
};

async function getMessagesToDelete(channelId, amount, token) {
	const cutoffTimestamp = Date.now() - 14 * 24 * 60 * 60 * 1000; 
	const oldId = SnowflakeUtil.generate(cutoffTimestamp);
	const messages = [];


	let lastId = null;
	while (messages.length < amount) {
		const response = await axios.get(
			`https://discord.com/api/v9/channels/${channelId}/messages?limit=100${lastId ? `&before=${lastId}` : ''}`,
			{
				headers: {
					Authorization: token,
					'User-Agent': Util.UserAgent(),
				},
			}
		);

		if (response.data.length === 0) {
			break;
		}

		const validMessages = response.data.filter((m) => BigInt(m.id) > BigInt(oldId));
		messages.push(...validMessages);

		if (validMessages.length < 100) {
			break;
		}

		lastId = validMessages[validMessages.length - 1].id;
	}

	return messages.slice(0, amount);
}

async function bulkDelete(channelId, messages, token) {
	const messageIds = messages.map((m) => m.id);

	await axios.post(
		`https://discord.com/api/v9/channels/${channelId}/messages/bulk-delete`,
		{
			messages: messageIds,
		},
		{
			headers: {
				Authorization: token,
				'User-Agent': Util.UserAgent(),
			},
		}
	);
}
