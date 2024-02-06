const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({
		linked_users: [],
		users: [],
		teen_audit_log: null,
	});
});

module.exports = app;
