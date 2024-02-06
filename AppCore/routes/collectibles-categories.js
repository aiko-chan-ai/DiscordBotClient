const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send([
		{
			sku_id: '1197342727608746044',
			store_listing_id: '1197342697200029767',
			banner: '1197343893742694470',
			name: 'Cyberpunk',
			summary: 'Welcome to the neon embrace of the future.',
			unpublished_at: null,
			styles: {
				background_colors: [2102637, 459264],
				button_colors: [4801242, 3552948],
				confetti_colors: [43772, 15774258, 16414587, 3000177, 9739511],
			},
			logo: '1197343875023523930',
			products: [
				{
					sku_id: '1197344326133502032',
					store_listing_id: '1197344306210545775',
					banner: '1197343893742694470',
					name: 'Glitch',
					summary: 'Neurovisor disruption detected, please standby.',
					unpublished_at: null,
					styles: {
						background_colors: [2102637, 459264],
						button_colors: [4801242, 3552948],
						confetti_colors: [
							43772, 15774258, 16414587, 3000177, 9739511,
						],
					},
					currency: 'usd',
					price: 499,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 599,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 499,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1197344345783808161',
							sku_id: '1197344326133502032',
							asset: 'a_e90ebc0114e7bdc30353c8b11953ea41',
							label: 'Something disrupted the neurovisor connection. The signal appears as static over the avatar. Better call Repairs.',
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1197342727608746044',
				},
				{
					sku_id: '1197344396983664670',
					store_listing_id: '1197344381393444905',
					banner: '1197343893742694470',
					name: 'Cybernetic',
					summary:
						'Cybernetic visuals now online. Welcome aboard, runner.',
					unpublished_at: null,
					styles: {
						background_colors: [2102637, 459264],
						button_colors: [4801242, 3552948],
						confetti_colors: [
							43772, 15774258, 16414587, 3000177, 9739511,
						],
					},
					currency: 'usd',
					price: 499,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 599,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 499,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1197344413718949938',
							sku_id: '1197344396983664670',
							asset: 'a_c6b3bc1dc49e5b284dca0b6437831004',
							label: 'A glowing neon HUD overlays the avatar, locking on to a target.',
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1197342727608746044',
				},
				{
					sku_id: '1197344575832981605',
					store_listing_id: '1197344448309370991',
					banner: '1197343893742694470',
					name: 'Digital Sunrise',
					summary: "It's a new day in cyberspace.",
					unpublished_at: null,
					styles: {
						background_colors: [2102637, 459264],
						button_colors: [4801242, 3552948],
						confetti_colors: [
							43772, 15774258, 16414587, 3000177, 9739511,
						],
					},
					currency: 'usd',
					price: 499,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 599,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 499,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1197344598675165204',
							sku_id: '1197344575832981605',
							asset: 'a_cc83efd93ecd6e41857449c3c0ef9b22',
							label: 'After booting up, a wave of neon colors transforms into a sunset that embraces this avatar. Why do I suddenly feel calmer?',
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1197342727608746044',
				},
				{
					sku_id: '1197344636558114986',
					store_listing_id: '1197344616270274570',
					banner: '1197343893742694470',
					name: 'Implant',
					summary: 'Get ready to jack in.',
					unpublished_at: null,
					styles: {
						background_colors: [2102637, 459264],
						button_colors: [4801242, 3552948],
						confetti_colors: [
							43772, 15774258, 16414587, 3000177, 9739511,
						],
					},
					currency: 'usd',
					price: 499,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 599,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 499,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1197344653515690054',
							sku_id: '1197344636558114986',
							asset: 'a_172fa9da0af8698e37f5e5de76637439',
							label: 'A surge of energy pulses through wires perched on top of this avatar. Electricity dangerously crackles over the image. Be careful with this one!',
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1197342727608746044',
				},
				{
					sku_id: '1197344693630009424',
					store_listing_id: '1197344677754576957',
					banner: '1197343893742694470',
					name: 'Nightrunner',
					summary: "Cruisin' the cyber highway.",
					unpublished_at: null,
					styles: {
						background_colors: [2102637, 459264],
						button_colors: [4801242, 3552948],
						confetti_colors: [
							43772, 15774258, 16414587, 3000177, 9739511,
						],
					},
					currency: 'usd',
					price: 499,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 599,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 499,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 1,
							id: '1197344710830862356',
							sku_id: '1197344693630009424',
						},
					],
					type: 1,
					premium_type: 0,
					category_sku_id: '1197342727608746044',
				},
				{
					sku_id: '1197344764174008452',
					store_listing_id: '1197344746121732196',
					banner: '1197343893742694470',
					name: 'Uplink Error',
					summary: 'Anomaly detected, attempting system reset.',
					unpublished_at: null,
					styles: {
						background_colors: [2102637, 459264],
						button_colors: [4801242, 3552948],
						confetti_colors: [
							43772, 15774258, 16414587, 3000177, 9739511,
						],
					},
					currency: 'usd',
					price: 499,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 599,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 499,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 1,
							id: '1197344781060288693',
							sku_id: '1197344764174008452',
						},
					],
					type: 1,
					premium_type: 0,
					category_sku_id: '1197342727608746044',
				},
			],
		},
		{
			sku_id: '1144003461608906824',
			store_listing_id: '1144003461608906823',
			banner: '1149562682983321630',
			name: 'Fantasy',
			summary:
				"You're walking in the forest and notice something magical and shiny.",
			unpublished_at: null,
			styles: {
				background_colors: [1335620, 137742],
				button_colors: [165687, 26954],
				confetti_colors: [
					15706103, 11945665, 5682099, 1737113, 7430319, 11454463,
				],
			},
			logo: '1149562562103484467',
			products: [
				{
					sku_id: '1144003752978829455',
					store_listing_id: '1144003752978829454',
					banner: '1149562682983321630',
					name: 'Flaming Sword',
					summary: 'Slaying the look and the monsters.',
					unpublished_at: null,
					styles: {
						background_colors: [1335620, 137742],
						button_colors: [165687, 26954],
						confetti_colors: [
							15706103, 11945665, 5682099, 1737113, 7430319,
							11454463,
						],
					},
					currency: 'usd',
					price: 699,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 999,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 699,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1144005849740742707',
							sku_id: '1144003752978829455',
							asset: 'a_0f5d6c4dd8ae74662ee9c40722a56cbd',
							label: 'Curved Sword with Pink Gem Engraved in Hilt, Alight with Orange Flames, Animated',
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1144003461608906824',
				},
				{
					sku_id: '1144006094134456352',
					store_listing_id: '1144006094134456351',
					banner: '1149562682983321630',
					name: 'Magical Potion',
					summary: 'Drink at your own risk.',
					unpublished_at: null,
					styles: {
						background_colors: [1335620, 137742],
						button_colors: [165687, 26954],
						confetti_colors: [
							15706103, 11945665, 5682099, 1737113, 7430319,
							11454463,
						],
					},
					currency: 'usd',
					price: 699,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 999,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 699,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1144007738859470929',
							sku_id: '1144006094134456352',
							asset: 'a_1dbc603c181999b9815cb426dfec71a6',
							label: 'Round Glass Bottle with Cork, Bursting with Purple Potion, Animated',
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1144003461608906824',
				},
				{
					sku_id: '1144046002110738634',
					store_listing_id: '1144046002110738633',
					banner: '1149562682983321630',
					name: 'Fairy Sprites',
					summary: 'Here to guide you on your path.',
					unpublished_at: null,
					styles: {
						background_colors: [1335620, 137742],
						button_colors: [165687, 26954],
						confetti_colors: [
							15706103, 11945665, 5682099, 1737113, 7430319,
							11454463,
						],
					},
					currency: 'usd',
					price: 699,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 999,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 699,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1144046002110738635',
							sku_id: '1144046002110738634',
							asset: 'a_fe3c76cac2adf426832a7e495e8329d3',
							label: 'Three Fairy Sprites, Floating and Shining, Yellow, Animated',
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1144003461608906824',
				},
				{
					sku_id: '1144048390594908212',
					store_listing_id: '1144048390594908211',
					banner: '1149562682983321630',
					name: "Wizard's Staff",
					summary: 'How much power does it hold?',
					unpublished_at: null,
					styles: {
						background_colors: [1335620, 137742],
						button_colors: [165687, 26954],
						confetti_colors: [
							15706103, 11945665, 5682099, 1737113, 7430319,
							11454463,
						],
					},
					currency: 'usd',
					price: 699,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 999,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 699,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1144048390594908213',
							sku_id: '1144048390594908212',
							asset: 'a_db9baf0ba7cf449d2b027c06309dbe8d',
							label: "Wizard's Staff with Green Gem, Summoning a Branch of Green Crystals, Animated",
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1144003461608906824',
				},
				{
					sku_id: '1144048977138946230',
					store_listing_id: '1144048977138946229',
					banner: '1149562682983321630',
					name: 'Glowing Runes',
					summary: 'I wonder what these symbols mean.',
					unpublished_at: null,
					styles: {
						background_colors: [1335620, 137742],
						button_colors: [165687, 26954],
						confetti_colors: [
							15706103, 11945665, 5682099, 1737113, 7430319,
							11454463,
						],
					},
					currency: 'usd',
					price: 699,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 999,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 699,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1144048977138946231',
							sku_id: '1144048977138946230',
							asset: 'a_d650e22f6c4bab4fc0969e9d35edbcb0',
							label: 'Circle of Blue Rune Stones, Glowing and Pulsing, Animated',
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1144003461608906824',
				},
				{
					sku_id: '1144049316009353338',
					store_listing_id: '1144049316009353337',
					banner: '1149562682983321630',
					name: 'Defensive Shield',
					summary: 'Use against pointy things.',
					unpublished_at: null,
					styles: {
						background_colors: [1335620, 137742],
						button_colors: [165687, 26954],
						confetti_colors: [
							15706103, 11945665, 5682099, 1737113, 7430319,
							11454463,
						],
					},
					currency: 'usd',
					price: 699,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 999,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 699,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1144049316009353339',
							sku_id: '1144049316009353338',
							asset: 'a_29a0533cb3de61aa8179810188f3830d',
							label: 'Shield with Blue Gem Below a Branch of Green Leaves, Resting Against a Stone, Catching Arrows, Animated',
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1144003461608906824',
				},
				{
					sku_id: '1144049603109470370',
					store_listing_id: '1144049603109470369',
					banner: '1149562682983321630',
					name: 'Skull Medallion',
					summary: 'Earned through unknown means.',
					unpublished_at: null,
					styles: {
						background_colors: [1335620, 137742],
						button_colors: [165687, 26954],
						confetti_colors: [
							15706103, 11945665, 5682099, 1737113, 7430319,
							11454463,
						],
					},
					currency: 'usd',
					price: 699,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 999,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 699,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1144049603109470371',
							sku_id: '1144049603109470370',
							asset: 'a_9d67a1cbf81fe7197c871e94f619b04b',
							label: 'Skull Medallion Hanging from Pink Band, Rotating and Activating with Energy, Animated',
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1144003461608906824',
				},
				{
					sku_id: '1144049924397334651',
					store_listing_id: '1144049924397334650',
					banner: '1149562682983321630',
					name: 'Treasure and Key',
					summary: 'What glorious treasures lie within?',
					unpublished_at: null,
					styles: {
						background_colors: [1335620, 137742],
						button_colors: [165687, 26954],
						confetti_colors: [
							15706103, 11945665, 5682099, 1737113, 7430319,
							11454463,
						],
					},
					currency: 'usd',
					price: 699,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 999,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 699,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1144049924397334652',
							sku_id: '1144049924397334651',
							asset: 'a_4c9f2ec29c05755456dbce45d8190ed4',
							label: 'Gold Key with Red Gem, Unlocking a Treasure Chest Filled with Gold Coins, Animated',
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1144003461608906824',
				},
				{
					sku_id: '1139323092645183591',
					store_listing_id: '1139323092645183590',
					banner: '1149562682983321630',
					name: 'Hydro Blast',
					summary: 'Time to make a splash.',
					unpublished_at: null,
					styles: {
						background_colors: [1335620, 137742],
						button_colors: [165687, 26954],
						confetti_colors: [
							15706103, 11945665, 5682099, 1737113, 7430319,
							11454463,
						],
					},
					currency: 'usd',
					price: 849,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 1199,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 849,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 1,
							id: '1139323075519852625',
							sku_id: '1139323092645183591',
						},
					],
					type: 1,
					premium_type: 0,
					category_sku_id: '1144003461608906824',
				},
				{
					sku_id: '1139323093991575696',
					store_listing_id: '1139323093991575695',
					banner: '1149562682983321630',
					name: 'Sakura Dreams',
					summary: 'Close your eyes, and breathe.',
					unpublished_at: null,
					styles: {
						background_colors: [1335620, 137742],
						button_colors: [165687, 26954],
						confetti_colors: [
							15706103, 11945665, 5682099, 1737113, 7430319,
							11454463,
						],
					},
					currency: 'usd',
					price: 849,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 1199,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 849,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 1,
							id: '1174460912699191336',
							sku_id: '1139323093991575696',
						},
					],
					type: 1,
					premium_type: 0,
					category_sku_id: '1144003461608906824',
				},
				{
					sku_id: '1139323099251232828',
					store_listing_id: '1139323098810822697',
					banner: '1149562682983321630',
					name: 'Mystic Vines',
					summary:
						'Why touch grass when you can touch magical vines?',
					unpublished_at: null,
					styles: {
						background_colors: [1335620, 137742],
						button_colors: [165687, 26954],
						confetti_colors: [
							15706103, 11945665, 5682099, 1737113, 7430319,
							11454463,
						],
					},
					currency: 'usd',
					price: 849,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 1199,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 849,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 1,
							id: '1139323098810822696',
							sku_id: '1139323099251232828',
						},
					],
					type: 1,
					premium_type: 0,
					category_sku_id: '1144003461608906824',
				},
				{
					sku_id: '1139323099687436419',
					store_listing_id: '1139323099687436418',
					banner: '1149562682983321630',
					name: 'Pixie Dust',
					summary: 'Did a pixie sneeze nearby?',
					unpublished_at: null,
					styles: {
						background_colors: [1335620, 137742],
						button_colors: [165687, 26954],
						confetti_colors: [
							15706103, 11945665, 5682099, 1737113, 7430319,
							11454463,
						],
					},
					currency: 'usd',
					price: 849,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 1199,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 849,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 1,
							id: '1139323099251232829',
							sku_id: '1139323099687436419',
						},
					],
					type: 1,
					premium_type: 0,
					category_sku_id: '1144003461608906824',
				},
			],
		},
		{
			sku_id: '1144302037593497701',
			store_listing_id: '1144302037593497700',
			banner: '1149563322232995880',
			name: 'Anime',
			summary: 'Senpai will definitely notice you.',
			unpublished_at: null,
			styles: {
				background_colors: [4946352, 986682],
				button_colors: [9061825, 1271959],
				confetti_colors: [
					2923481, 14969472, 16770304, 12298453, 4120019, 14858081,
				],
			},
			logo: '1149563319296995408',
			products: [
				{
					sku_id: '1154896005045694555',
					store_listing_id: '1154895977845625043',
					banner: '1149563322232995880',
					name: 'Radiating Energy',
					summary: 'Over EIGHT-THOUSAND-NINE-HUNDRED-NINETY-NINE!',
					unpublished_at: null,
					styles: {
						background_colors: [4946352, 986682],
						button_colors: [9061825, 1271959],
						confetti_colors: [
							2923481, 14969472, 16770304, 12298453, 4120019,
							14858081,
						],
					},
					currency: 'usd',
					price: 549,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 799,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 549,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1154896010255015996',
							sku_id: '1154896005045694555',
							asset: 'a_c7e1751e8122f1b475cb3006966fb28c',
							label: 'Radiating Energy Circle with Lightning, Anime-Style, Purple, Animated',
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1144302037593497701',
				},
				{
					sku_id: '1144305233707671573',
					store_listing_id: '1144305233707671572',
					banner: '1149563322232995880',
					name: 'Soul Leaving Body',
					summary: 'Can I just disappear right now?',
					unpublished_at: null,
					styles: {
						background_colors: [4946352, 986682],
						button_colors: [9061825, 1271959],
						confetti_colors: [
							2923481, 14969472, 16770304, 12298453, 4120019,
							14858081,
						],
					},
					currency: 'usd',
					price: 549,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 799,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 549,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1144305233707671574',
							sku_id: '1144305233707671573',
							asset: 'a_c3c09bd122898be35093d0d59850f627',
							label: 'Wavy Ghost with Shocked Expression, Anime-Style, Animated',
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1144302037593497701',
				},
				{
					sku_id: '1144307257807491094',
					store_listing_id: '1144307257807491093',
					banner: '1149563322232995880',
					name: 'Sweat Drops',
					summary: '*laughs nervously*',
					unpublished_at: null,
					styles: {
						background_colors: [4946352, 986682],
						button_colors: [9061825, 1271959],
						confetti_colors: [
							2923481, 14969472, 16770304, 12298453, 4120019,
							14858081,
						],
					},
					currency: 'usd',
					price: 549,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 799,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 549,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1144307257807491095',
							sku_id: '1144307257807491094',
							asset: 'a_55c9d0354290afa8b7fe47ea9bd7dbcf',
							label: 'Sweat Drops with Question Mark Speech Bubble, Anime-Style, Blue, Animated',
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1144302037593497701',
				},
				{
					sku_id: '1144307629225672846',
					store_listing_id: '1144307629225672845',
					banner: '1149563322232995880',
					name: 'Starry Eyed',
					summary: "Feelin' sparkly.",
					unpublished_at: null,
					styles: {
						background_colors: [4946352, 986682],
						button_colors: [9061825, 1271959],
						confetti_colors: [
							2923481, 14969472, 16770304, 12298453, 4120019,
							14858081,
						],
					},
					currency: 'usd',
					price: 549,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 799,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 549,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1144307629225672847',
							sku_id: '1144307629225672846',
							asset: 'a_d72066b8cecbadd9fc951913ebcc384f',
							label: 'Twinkling Lines and Stars, Anime-Style, Orange and Yellow, Animated',
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1144302037593497701',
				},
				{
					sku_id: '1144307957425778779',
					store_listing_id: '1144307957425778778',
					banner: '1149563322232995880',
					name: 'In Love',
					summary: 'uwu',
					unpublished_at: null,
					styles: {
						background_colors: [4946352, 986682],
						button_colors: [9061825, 1271959],
						confetti_colors: [
							2923481, 14969472, 16770304, 12298453, 4120019,
							14858081,
						],
					},
					currency: 'usd',
					price: 549,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 799,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 549,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1144307957425778780',
							sku_id: '1144307957425778779',
							asset: 'a_8ffa2ba9bff18e96b76c2e66fd0d7fa3',
							label: 'Speech Bubble with Lovestruck Expression and Floating Hearts, Anime-Style, Pink and White, Animated',
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1144302037593497701',
				},
				{
					sku_id: '1144308196723408958',
					store_listing_id: '1144308196723408957',
					banner: '1149563322232995880',
					name: 'Shocked',
					summary: 'Nani?!!',
					unpublished_at: null,
					styles: {
						background_colors: [4946352, 986682],
						button_colors: [9061825, 1271959],
						confetti_colors: [
							2923481, 14969472, 16770304, 12298453, 4120019,
							14858081,
						],
					},
					currency: 'usd',
					price: 549,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 799,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 549,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1174460891727663244',
							sku_id: '1144308196723408958',
							asset: 'a_b98e8b204d59882fb7f9f7c86922c0bf',
							label: 'Thick Exclamation Lines with Japanese Hiragana Speech Bubble, Anime-Style, Pink, Animated',
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1144302037593497701',
				},
				{
					sku_id: '1144308439720394944',
					store_listing_id: '1144308439720394943',
					banner: '1149563322232995880',
					name: 'Angry',
					summary: 'How dare you.',
					unpublished_at: null,
					styles: {
						background_colors: [4946352, 986682],
						button_colors: [9061825, 1271959],
						confetti_colors: [
							2923481, 14969472, 16770304, 12298453, 4120019,
							14858081,
						],
					},
					currency: 'usd',
					price: 549,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 799,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 549,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 0,
							id: '1144308439720394945',
							sku_id: '1144308439720394944',
							asset: 'a_3c97a2d37f433a7913a1c7b7a735d000',
							label: 'Anger Symbol with Exclamation Mark Speech Bubble, Anime-Style, Red, Animated',
						},
					],
					type: 0,
					premium_type: 0,
					category_sku_id: '1144302037593497701',
				},
				{
					sku_id: '1139323100568244355',
					store_listing_id: '1139323100127834224',
					banner: '1149563322232995880',
					name: 'Magic Hearts',
					summary: 'Moon Prism Power, Make Up!',
					unpublished_at: null,
					styles: {
						background_colors: [4946352, 986682],
						button_colors: [9061825, 1271959],
						confetti_colors: [
							2923481, 14969472, 16770304, 12298453, 4120019,
							14858081,
						],
					},
					currency: 'usd',
					price: 849,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 1199,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 849,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 1,
							id: '1139323100127834223',
							sku_id: '1139323100568244355',
						},
					],
					type: 1,
					premium_type: 0,
					category_sku_id: '1144302037593497701',
				},
				{
					sku_id: '1139323093551165533',
					store_listing_id: '1139323093114962022',
					banner: '1149563322232995880',
					name: 'Shatter',
					summary: 'Ouch, my windows!',
					unpublished_at: null,
					styles: {
						background_colors: [4946352, 986682],
						button_colors: [9061825, 1271959],
						confetti_colors: [
							2923481, 14969472, 16770304, 12298453, 4120019,
							14858081,
						],
					},
					currency: 'usd',
					price: 849,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 1199,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 849,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 1,
							id: '1139323093114962021',
							sku_id: '1139323093551165533',
						},
					],
					type: 1,
					premium_type: 0,
					category_sku_id: '1144302037593497701',
				},
				{
					sku_id: '1139323101008642101',
					store_listing_id: '1139323101008642100',
					banner: '1149563322232995880',
					name: 'Shuriken Strike',
					summary: 'Every side is the pointy end.',
					unpublished_at: null,
					styles: {
						background_colors: [4946352, 986682],
						button_colors: [9061825, 1271959],
						confetti_colors: [
							2923481, 14969472, 16770304, 12298453, 4120019,
							14858081,
						],
					},
					currency: 'usd',
					price: 849,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 1199,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 849,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 1,
							id: '1139323100568244356',
							sku_id: '1139323101008642101',
						},
					],
					type: 1,
					premium_type: 0,
					category_sku_id: '1144302037593497701',
				},
				{
					sku_id: '1139323101881061466',
					store_listing_id: '1139323101444845691',
					banner: '1149563322232995880',
					name: 'Power Surge',
					summary: "You're about to witness true power.",
					unpublished_at: null,
					styles: {
						background_colors: [4946352, 986682],
						button_colors: [9061825, 1271959],
						confetti_colors: [
							2923481, 14969472, 16770304, 12298453, 4120019,
							14858081,
						],
					},
					currency: 'usd',
					price: 849,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 1199,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 849,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
					},
					items: [
						{
							type: 1,
							id: '1139323101444845690',
							sku_id: '1139323101881061466',
						},
					],
					type: 1,
					premium_type: 0,
					category_sku_id: '1144302037593497701',
				},
			],
		},
		{
			sku_id: '1144058340327047249',
			store_listing_id: '1144058340327047248',
			banner: '1149562891666731108',
			name: 'DISXCORE',
			summary: 'Available to use with an active Nitro subscription.',
			unpublished_at: null,
			styles: {
				background_colors: [7546213, 1121600],
				button_colors: [8734662, 12076481],
				confetti_colors: [16069235, 9803263, 11008590, 3350191],
			},
			logo: '1149562888290320414',
			products: [
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
					currency: 'usd',
					price: 0,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 999,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 0,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
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
					currency: 'usd',
					price: 0,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 999,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 0,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
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
					premium_type: 2,
					category_sku_id: '1144058340327047249',
				},
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
					currency: 'usd',
					price: 0,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 999,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 0,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
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
					currency: 'usd',
					price: 0,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 999,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 0,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
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
					currency: 'usd',
					price: 0,
					prices: {
						0: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 999,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
						4: {
							country_prices: {
								country_code: null,
								prices: [
									{
										amount: 0,
										currency: 'usd',
										exponent: 2,
									},
								],
							},
						},
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
				},
			],
		},
	]);
});

module.exports = app;
