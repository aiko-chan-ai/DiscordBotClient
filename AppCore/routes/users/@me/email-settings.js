const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({
		categories: {
			social: true,
			communication: true,
			recommendations_and_events: false,
			tips: false,
			updates_and_announcements: false,
		},
		initialized: true,
	});
});

module.exports = app;
