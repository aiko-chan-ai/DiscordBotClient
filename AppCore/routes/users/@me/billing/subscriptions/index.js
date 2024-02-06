const { Router } = require('express');
const Util = require('../../../../../../AppAssets/Util');
const SnowflakeUtil = require('../../../../../../AppAssets/SnowflakeUtil');

const app = Router();

app.get('/', (req, res) => {
	res.send([
		{
			id: SnowflakeUtil.generate(),
			type: 1,
			created_at: new Date().toISOString(),
			canceled_at: null,
			current_period_start: new Date().toISOString(),
			current_period_end: new Date(
				Date.now() + 31536000000, // 1 year
			).toISOString(),
			status: 1,
			payment_source_id: null,
			payment_gateway: 3,
			payment_gateway_plan_id: 'premium_tier_2_yearly',
			payment_gateway_subscription_id: '540000000000000',
			items: [
				{
					id: SnowflakeUtil.generate(),
					plan_id: '511651885459963904',
					quantity: 1,
				},
			],
			currency: 'usd',
			country_code: null,
			user_id: Util.getIDFromToken(req.headers.authorization),
			pause_ends_at: null,
			use_storekit_resubscribe: false,
			streak_started_at: new Date(
				Date.now() - 31536000000, // 1 year
			).toISOString(),
			metadata: {},
			price: null,
		},
	]);
});

module.exports = app;
