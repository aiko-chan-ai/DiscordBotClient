const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({
		consent_required: false,
		country_code: 'VN',
		promotional_email_opt_in: {
			required: true,
			pre_checked: false,
		},
	});
});

module.exports = app;
