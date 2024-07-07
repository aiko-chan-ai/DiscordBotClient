const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({
		user_sessions: [
			{
				id_hash: 'VjFaa2MyTnRTalZOVjNCb1VqQmFNVlJHWkVkalFUMDk=', // aiko-chan-ai => base64
				approx_last_used_time: new Date().toISOString(),
				client_info: {
					os: 'Windows',
					platform: 'Chrome',
					location: 'Elysia Realm',
				},
			},
		],
	});
});

module.exports = app;
