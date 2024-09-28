const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({
		referrals_remaining: 0,
		sent_user_ids: [],
		refresh_at: null,
		has_eligible_friends: true,
		recipient_status: {},
		is_eligible_for_incentive: false,
		is_qualified_for_incentive: false,
		referral_incentive_status: 0,
	});
});

module.exports = app;
