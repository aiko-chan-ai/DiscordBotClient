const { Router } = require('express');
const fetch = require('node-fetch');
const Util = require('../../../../../AppAssets/Util');

const app = Router();

app.all('/', async (req, res) => {
	const channelId = req.params.id;
	const {
		archived,
		sort_by,
		sort_order,
		limit,
		tag_setting,
		offset,
		name,
		tag,
	} = req.query;
	if (tag) {
		return res.send({
			threads: [],
			members: [],
			has_more: false,
			total_results: 0,
			first_messages: [],
		}); // Discord API limitation
	}
	let threads = [];
	const members = [];
	const first_messages = [];
	const data = await Promise.allSettled([
		archived
			? fetch(
					`https://discord.com/api/v9/channels/${channelId}/threads/archived/public`,
					{
						headers: {
							authorization: req.headers.authorization,
							'user-agent': Util.UserAgent(),
						},
					},
			  ).then((r) => r.json())
			: Promise.reject('not archived'),
		archived
			? fetch(
					`https://discord.com/api/v9/channels/${channelId}/threads/archived/private`,
					{
						headers: {
							authorization: req.headers.authorization,
							'user-agent': Util.UserAgent(),
						},
					},
			  ).then((r) => r.json())
			: Promise.reject('not archived'),
	]);
	data.map((r) => {
		if (r.status === 'fulfilled' && r.value?.threads) {
			threads.push(...r.value.threads);
			if (r.value.members) members.push(...r.value.members);
			if (r.value.first_messages)
				first_messages.push(...r.value.first_messages);
		}
	});
	function sorting(a = 0, b = 0) {
		if (sort_order === 'asc') {
			return a > b ? 1 : a < b ? -1 : 0; // Ascending order
		} else {
			return a < b ? 1 : a > b ? -1 : 0; // Descending order
		}
	}
	switch (sort_by) {
		case 'archive_time': {
			threads = threads.sort((a, b) =>
				sorting(
					new Date(a.thread_metadata.archive_timestamp)?.getTime(),
					new Date(a.thread_metadata.archive_timestamp)?.getTime(),
				),
			);
			break;
		}
		case 'creation_time': {
			threads = threads.sort((a, b) =>
				sorting(
					new Date(a.thread_metadata.create_timestamp)?.getTime(),
					new Date(a.thread_metadata.create_timestamp)?.getTime(),
				),
			);
			break;
		}
		case 'last_message_time':
		default: {
			threads = threads.sort((a, b) =>
				sorting(BigInt(a.last_message_id), BigInt(b.last_message_id)),
			);
			break;
		}
	}
	res.send({
		threads,
		members,
		has_more: false,
		total_results: threads.length,
		first_messages,
	});
});

module.exports = app;
