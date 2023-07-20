const Util = require('../../Util');
const axios = require('axios');
const SnowflakeUtil = require('../../SnowflakeUtil');

module.exports = {
	metadata: {
		default_member_permissions: null,
		type: 1,
		nsfw: false,
		name: 'purge',
		description: 'Delete messages from the channel',
		dm_permission: false,
		contexts: null,
		options: [
			{
				type: 4,
				name: 'amount',
				description: 'Input the amount of messages to delete',
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
			'purge',
			botId,
			nonce,
		);
        let i = 0;
        let interval = setInterval(() => {
            i++;
            msg.content = `Wait a second${'.'.repeat(i%4)}`;
            io.emit('dispatch', {
				t: 'MESSAGE_CREATE',
				session_id: sessionId,
				d: msg,
			});
        }, 500);
        let amount = data.data.options[0].value;
        try {
            const messages = await getMessageDelete(channelId, amount, token);
            await bulkDelete(channelId, messages, token);
            msg.content = `Deleted ${messages.length} messages`;
        } catch (e) {
            msg.content = 'Failed to delete messages\nError: ' + e.message || 'Unknown error';
        }
        clearInterval(interval);
		io.emit('dispatch', {
			t: 'MESSAGE_CREATE',
			session_id: sessionId,
			d: msg,
		});
	},
};


function getMessageDelete(
    channelId,
    amount,
    token,
) {
    return new Promise((resolve, reject) => {
        const oldId = SnowflakeUtil.generate(Date.now() - 1209600000);
        axios.get(
            `https://discord.com/api/v9/channels/${channelId}/messages?limit=${amount}`,
            {
                headers: {
                    Authorization: token,
                    'User-Agent': Util.UserAgent(),
                },
            },
        ).then((res) => {
            resolve(
				res.data
					.filter((m) => BigInt(m.id) > BigInt(oldId))
					.map((m) => m.id),
			);
        }).catch((err) => {
            reject(err);
        });
    });
}

function bulkDelete(
    channelId,
    messages,
    token,
) {
    return new Promise((resolve, reject) => {
        axios.post(
            `https://discord.com/api/v9/channels/${channelId}/messages/bulk-delete`,
            {
                messages,
            },
            {
                headers: {
                    Authorization: token,
                    'User-Agent': Util.UserAgent(),
                },
            },
        ).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
}