const { Router } = require('express');
const crypto = require('crypto');
const app = Router();

function makeISODate(addYear = 0) {
    const date = new Date();
    date.setFullYear(date.getFullYear() + addYear);
    return date.toISOString().replace('Z', '000+00:00');
}

app.get('/', (req, res) => {
    const randomData = crypto.randomBytes(16);
	res.send({
		request_id: crypto.createHash('md5').update(randomData).digest('hex'),
		entries: [],
		entries_hash: 0,
		expired_at: makeISODate(10),
		refresh_stale_inbox_after_ms: 3_000_000,
		refresh_token: Buffer.from(
			JSON.stringify({
				created_at: makeISODate(),
				content_hash: crypto
					.createHash('sha256')
					.update(randomData)
					.digest('base64'),
			}),
			'utf-8',
		).toString('base64'),
		wait_ms_until_next_fetch: 3_000_000,
	});
});

module.exports = app;
