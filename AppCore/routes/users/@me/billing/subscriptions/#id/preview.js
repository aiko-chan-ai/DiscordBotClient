const { Router } = require('express');
const SnowflakeUtil = require('../../../../../../../AppAssets/SnowflakeUtil');

const app = Router();

app.all('/', (req, res) => {
	res.send({
		id: SnowflakeUtil.generate(),
		invoice_items: [
			{
				id: SnowflakeUtil.generate(),
				amount: 4972,
				discounts: [],
				subscription_plan_id: '511651885459963904',
				subscription_plan_price: 4972,
				quantity: 1,
				proration: false,
				tenant_metadata: {},
			},
		],
		total: 4972,
		subtotal: 4972,
		currency: 'usd',
		tax: 0,
		tax_inclusive: true,
		subscription_period_start: new Date().toISOString(),
		subscription_period_end: new Date(
			Date.now() + 31536000000, // 1 year
		).toISOString(),
	});
});

module.exports = app;
