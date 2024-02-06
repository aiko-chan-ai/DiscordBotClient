const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send([
		{
			sku_id: '1144059132517826601',
			store_listing_id: '1144059132517826600',
			banner: '1149562891666731108',
			name: 'Smoke',
			summary: "Now you see me, now you don't.",
			unpublished_at: null,
			styles: {
				background_colors: [7546213, 1121600],
				button_colors: [8734662, 12076481],
				confetti_colors: [16069235, 9803263, 11008590, 3350191],
			},
			items: [
				{
					type: 0,
					id: '1144059132517826602',
					sku_id: '1144059132517826601',
					asset: 'a_10b9f886b513b77ccdd67c8784f1a496',
					label: 'Smoke with Green Shining Border, Animated',
				},
			],
			type: 0,
			premium_type: 2,
			category_sku_id: '1144058340327047249',
			purchase_type: 7,
			purchased_at: '2023-09-29T13:13:48.641469+00:00',
		},
		{
			sku_id: '1144058844004233369',
			store_listing_id: '1144058844004233368',
			banner: '1149562891666731108',
			name: 'Futuristic UI',
			summary: 'BEEP BOOP.',
			unpublished_at: null,
			styles: {
				background_colors: [7546213, 1121600],
				button_colors: [8734662, 12076481],
				confetti_colors: [16069235, 9803263, 11008590, 3350191],
			},
			items: [
				{
					type: 0,
					id: '1144058844004233370',
					sku_id: '1144058844004233369',
					asset: 'a_fed43ab12698df65902ba06727e20c0e',
					label: 'Futuristic Interface, Pink, Animated',
				},
			],
			type: 0,
			premium_type: 0,
			category_sku_id: '1144058340327047249',
			purchase_type: 7,
			purchased_at: '2023-09-29T13:13:52.755853+00:00',
		},
		{
			sku_id: '1144058522808614923',
			store_listing_id: '1144058522808614922',
			banner: '1149562891666731108',
			name: 'DISXCORE Headset',
			summary: 'Everything sounds better with these on.',
			unpublished_at: null,
			styles: {
				background_colors: [7546213, 1121600],
				button_colors: [8734662, 12076481],
				confetti_colors: [16069235, 9803263, 11008590, 3350191],
			},
			items: [
				{
					type: 0,
					id: '1144058522808614924',
					sku_id: '1144058522808614923',
					asset: 'a_d3da36040163ee0f9176dfe7ced45cdc',
					label: 'Futuristic Headphones, Blue, Animated',
				},
			],
			type: 0,
			premium_type: 2,
			category_sku_id: '1144058340327047249',
			purchase_type: 7,
			purchased_at: '2023-09-29T13:13:54.878861+00:00',
		},
		{
			sku_id: '1139323098370424932',
			store_listing_id: '1139323097930027069',
			banner: '1149562891666731108',
			name: 'Boost Relic',
			summary: 'Legends say this could power an entire server...',
			unpublished_at: null,
			styles: {
				background_colors: [7546213, 1121600],
				button_colors: [8734662, 12076481],
				confetti_colors: [16069235, 9803263, 11008590, 3350191],
			},
			items: [
				{
					type: 1,
					id: '1139323097930027068',
					sku_id: '1139323098370424932',
				},
			],
			type: 1,
			premium_type: 2,
			category_sku_id: '1144058340327047249',
			purchase_type: 7,
			purchased_at: '2023-11-30T15:42:49.608272+00:00',
		},
		{
			sku_id: '1139323103193878569',
			store_listing_id: '1139323103193878568',
			banner: '1149562891666731108',
			name: 'Cyberspace',
			summary: 'Witness the entire world in motion.',
			unpublished_at: null,
			styles: {
				background_colors: [7546213, 1121600],
				button_colors: [8734662, 12076481],
				confetti_colors: [16069235, 9803263, 11008590, 3350191],
			},
			items: [
				{
					type: 1,
					id: '1139323098370424933',
					sku_id: '1139323103193878569',
				},
			],
			type: 1,
			premium_type: 2,
			category_sku_id: '1144058340327047249',
			purchase_type: 7,
			purchased_at: '2023-11-30T15:43:02.377141+00:00',
		},
	]);
});

module.exports = app;
