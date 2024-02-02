const { Router } = require('express');
const app = Router();

app.get('/', (req, res) => {
	res.send([
		{
			id: '',
			name: '',
			interval: 1,
			interval_count: 1,
			tax_inclusive: true,
			sku_id: '',
			fallback_price: 499,
			fallback_currency: 'eur',
			currency: 'eur',
			price: 4199,
			price_tier: null,
		},
	]);
});

module.exports = app;
