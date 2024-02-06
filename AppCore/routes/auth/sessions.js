const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({
		user_sessions: [
			{
				id_hash: 'G0V9YBhBm+PElWFlIJLj9zN5vGAbRD9uKB9iZnl5VEk=',
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
