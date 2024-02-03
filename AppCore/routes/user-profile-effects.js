const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	res.send({
		profile_effect_configs: [
			{
				type: 1,
				id: '1139323075519852625',
				sku_id: '1139323092645183591',
				title: 'Hydro Blast',
				description: 'Time to make a splash.',
				accessibilityLabel:
					"A powerful stream of water swirls and twirls in the air. Wait, where's it headed off to?!",
				animationType: 2,
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/splash/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/splash/reducedMotion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/splash/intro.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 2880,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/splash/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 5760,
						loopDelay: 5760,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1139323093114962021',
				sku_id: '1139323093551165533',
				title: 'Shatter',
				description: 'Ouch, my windows!',
				accessibilityLabel:
					"Rippling flames travel across a layer of glass, shattering it. How bittersweet that the glass, molded by fire's embrace, be undone by the very flames that forged it.",
				animationType: 1,
				staticFrameSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-9-25/earthquake/static.png',
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/earthquake/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/earthquake/reducedMotion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-10-5/earthquake/intro.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2e46d5d2d9e/earthquake/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 2880,
						loopDelay: 2880,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1139323100127834223',
				sku_id: '1139323100568244355',
				title: 'Magic Hearts',
				description: 'Moon Prism Power, Make Up!',
				accessibilityLabel:
					'Hearts are beating and shimmering upon the profile, binding you under its charm.',
				animationType: 2,
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/magic-girl/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/magic-girl/reducedMotion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/magic-girl/intro.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 2880,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/magic-girl/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 5760,
						loopDelay: 5760,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1174460912699191336',
				sku_id: '1139323093991575696',
				title: 'Sakura Dreams',
				description: 'Close your eyes, and breathe.',
				accessibilityLabel:
					"Sakura petals gently flutter in the breeze under sunlight... a true display of nature's beauty and elegance.",
				animationType: 1,
				staticFrameSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/sakura/static.png',
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/sakura/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/sakura/reducedMotion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-12-13/sakura/intro.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2e46d5d2d9e/sakura/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 2880,
						loopDelay: 2880,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1139323101444845690',
				sku_id: '1139323101881061466',
				title: 'Power Surge',
				description: "You're about to witness true power.",
				accessibilityLabel:
					'A surge of power erupts, surrounding the profile with an aura of intense energy. Those who gaze upon it will be left in awe.',
				animationType: 2,
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/sayan/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/sayan/reducedMotion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-9-25/sayan/intro.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 2400,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-9-25/sayan/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2480,
						start: 4960,
						loopDelay: 4960,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1139323100568244356',
				sku_id: '1139323101008642101',
				title: 'Shuriken Strike',
				description: 'Every side is the pointy end.',
				accessibilityLabel:
					"Three shurikens are thrown, spinning furiously until they finally strike their target. Ow, those must've hurt.",
				animationType: 1,
				staticFrameSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/shuriken/static3.png',
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/shuriken/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/shuriken/reducedMotion3.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-10-5/shuriken/intro3.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2e46d5d2d9e/shuriken/loop3.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2000,
						start: 2880,
						loopDelay: 2000,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1139323098810822696',
				sku_id: '1139323099251232828',
				title: 'Mystic Vines',
				description:
					'Why touch grass when you can touch magical vines?',
				accessibilityLabel:
					'Magical vines grow and wrap around the outer edges of the profile. Is Mother Nature feeling extra affectionate today?',
				animationType: 1,
				staticFrameSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2e46d5d2d9e/vines/static.png',
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2e46d5d2d9e/vines/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2e46d5d2d9e/vines/reducedMotion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-10-11/vines/intro.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 3071,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-10-11/vines/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2988,
						start: 2905,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-10-11/vines/intro-glow.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 2573,
						start: 1666,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1139323099251232829',
				sku_id: '1139323099687436419',
				title: 'Pixie Dust',
				description: 'Did a pixie sneeze nearby?',
				accessibilityLabel:
					'Glimmering pixie dust and sparkles adorn the outer edges of the profile, casting a radiant glow.',
				animationType: 2,
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/fairy/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/fairy/reducedMotion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/fairy/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 0,
						loopDelay: 2880,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1139323095304392864',
				sku_id: '1139323095744790568',
				title: 'Discord-Os',
				description: "Bet you can't have just one bowl.",
				accessibilityLabel:
					"Cereal and milk pour in from the heavens, flooding the profile in delicious, nutritious goodness. You can't beat the classics.",
				animationType: 2,
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-9-25/cereal/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-9-25/cereal/reducedMotion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-9-25/cereal/intro.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 2880,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-9-25/cereal/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 5760,
						loopDelay: 5760,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1139323095744790569',
				sku_id: '1139323096180994169',
				title: 'Breakfast Plate',
				description: 'The best meal for any time of day.',
				accessibilityLabel:
					'Eggs, bacon, berries, and toast unite to form a breakfast meal, arranged with a smile. You can hear the bellies of profile admirers everywhere rumbling.',
				animationType: 2,
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-9-25/plate/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-9-25/plate/reducedMotion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-9-25/plate/intro.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 2880,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-9-25/plate/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 5760,
						loopDelay: 5760,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1139323101881061467',
				sku_id: '1158572178179108968',
				title: 'Ghoulish Graffiti',
				description: 'Did I scare you?',
				accessibilityLabel:
					"Graffiti-esque stars are strobing across the profile. But wait, you notice there's something written in the stars... 'BOO!' Did we get ya?",
				animationType: 2,
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-10-11/punk-girl/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/punk-girl/reducedMotion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-10-11/punk-girl/intro.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 2573,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-10-11/punk-girl/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2000,
						start: 5146,
						loopDelay: 4000,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1139323102753468546',
				sku_id: '1158572275507937342',
				title: 'Dark Omens',
				description: 'Who keeps summoning these things?',
				accessibilityLabel:
					'A ghastly portal suddenly appears, summoning three ghostly spirits to haunt your enemies - no one gets to beat you in a game and get away with it.',
				animationType: 2,
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/ghost-skull/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/ghost-skull/reducedMotion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/ghost-skull/intro.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 2880,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/ghost-skull/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 5760,
						loopDelay: 5760,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1139323094431973427',
				sku_id: '1158572263411556373',
				title: 'Zombie Slime',
				description: "I don't think you should touch that.",
				accessibilityLabel:
					'Out of nowhere, a glob of slime suddently drops from above, forming into a skull before vaporizing in the air. Did someone just curse you?',
				animationType: 2,
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/zombie-slime/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/zombie-slime/reducedMotion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/zombie-slime/intro.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 2880,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/zombie-slime/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 5760,
						loopDelay: 5760,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1159277016571449404',
				sku_id: '1159280677246742548',
				title: 'Fall Foliage',
				description: 'Getting ready for sweater weather.',
				accessibilityLabel:
					'A cascade of autumn leaves gently sway and fall from their trees towards the earth. Shall we make the biggest leaf pile the world has ever seen?',
				animationType: 1,
				staticFrameSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-10-11/leaves/static.png',
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-9-25/leaves/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-9-25/leaves/reducedMotion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-10-11/leaves/intro-branch.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-10-11/leaves/intro-leaves.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 2988,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-10-11/leaves/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 3984,
						start: 5760,
						loopDelay: 7968,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1159275733764550728',
				sku_id: '1159280847262859364',
				title: 'Lillypad Life',
				description: '*ribbit*',
				accessibilityLabel:
					'Under drizzling rain, a frog hops onto a floating lilypad, then hops away... perhaps never to be seen again. Farewell, frog friend.',
				animationType: 2,
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-9-25/rain/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-9-25/rain/reducedMotion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-9-25/rain/intro.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 2880,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-9-25/rain/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 5760,
						loopDelay: 5760,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1146328960481886318',
				sku_id: '1146328960951668776',
				title: 'Deck the halls',
				description: 'Keep out of reach from cats',
				accessibilityLabel:
					'Festive string lights wrap around the user profile',
				animationType: 1,
				staticFrameSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-22/deck-the-halls/thumbnail.png',
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-22/deck-the-halls/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-22/deck-the-halls/thumbnail.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-28/deck-the-halls/intro.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 1750,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-22/deck-the-halls/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 1250,
						start: 1750,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1146328960951668777',
				sku_id: '1146328961417224193',
				title: 'Snowy Shenanigans',
				description: 'Gone in a flurry.',
				accessibilityLabel:
					"In a sudden gust of snow and wind, a snowman sweeps into and out of view, leaving behind a flurry of snow in his wake. Who knows if we'll ever see him again...",
				animationType: 1,
				staticFrameSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-28/snowy-shenanigans/reducedMotion.png',
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-28/snowy-shenanigans/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-28/snowy-shenanigans/reducedMotion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-28/snowy-shenanigans/intro.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 4168,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-22/snowy-shenanigans/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 8334,
						start: 4168,
						loopDelay: 8334,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1179493515126898809',
				sku_id: '1179493515118514195',
				title: 'Goozilla',
				description: "Wait a second, what's my profile even made of?!",
				accessibilityLabel:
					'A clawed paw slashes and tears through the profile. Out oozes... slimy green goo? Gross!',
				animationType: 1,
				staticFrameSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-29/goozilla/static.png',
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-29/goozilla/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-29/goozilla/reduced-motion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-29/goozilla/intro-claw.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 4250,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-29/goozilla/intro-slime.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 4250,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-29/goozilla/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 3000,
						start: 4250,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1179493515126898812',
				sku_id: '1179493515126898811',
				title: 'Heartzilla',
				description: 'Is this what they mean when they say love hurts?',
				accessibilityLabel:
					'A clawed paw slashes and tears through the profile. Out floods... red hearts! How cute!',
				animationType: 1,
				staticFrameSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-29/heartzilla/static.png',
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-29/heartzilla/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-29/heartzilla/reduced-motion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-30/heartzilla/intro.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 3750,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-29/heartzilla/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 4000,
						start: 3750,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1179493515126898815',
				sku_id: '1179493515126898814',
				title: 'Monster Pop',
				description: 'POP goes the monster.',
				accessibilityLabel:
					"A purple, cheeky little creature floats across the screen. It's so adorable~~ wo-woah woahhh it just exploded!",
				animationType: 1,
				staticFrameSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-29/monster-pop/static.png',
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-29/monster-pop/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-29/monster-pop/reduced-motion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-30/monster-pop/intro-monster.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 3917,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-30/monster-pop/intro-glass.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 3917,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 101,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-29/monster-pop/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2083,
						start: 3917,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1197344710830862356',
				sku_id: '1197344693630009424',
				title: 'Nightrunner',
				description: "Cruisin' the cyber highway.",
				accessibilityLabel:
					'A slick-looking car cruises through a futuristic city, dodging obstacles and speeding off in a neon glow of superspeed light.',
				animationType: 2,
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2024-1-16/cyberpunk-nightrunner/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2024-1-16/cyberpunk-nightrunner/reduced-motion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2024-1-19/cyberpunk-nightrunner/intro.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 2960,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2024-1-18/cyberpunk-nightrunner/idle.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2960,
						start: 5920,
						loopDelay: 5920,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 101,
					},
				],
			},
			{
				type: 1,
				id: '1197344781060288693',
				sku_id: '1197344764174008452',
				title: 'Uplink Error',
				description: 'Anomaly detected, attempting system reset.',
				accessibilityLabel:
					'Uh oh, looks like the data of this profile is fractured. Glitches flicker across screen in a series of surprisingly aesthetically pleasing colors.',
				animationType: 2,
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2024-1-16/cyberpunk-uplinkerror/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2024-1-16/cyberpunk-uplinkerror/reduced-motion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2024-1-19/cyberpunk-uplinkerror/intro.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 2880,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2024-1-18/cyberpunk-uplinkerror/idle.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 5760,
						loopDelay: 5760,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 101,
					},
				],
			},
			{
				type: 1,
				id: '1202061575339376741',
				sku_id: '1202061726212947968',
				title: 'Dragon Dance',
				description: 'No evil spirits on my watch.',
				accessibilityLabel:
					'A dragon glides into view on top of the profile, circling a few times before taking rest at the very top.',
				animationType: 1,
				staticFrameSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2024-01-31/dragon-dance/static.png',
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2024-01-31/dragon-dance/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2024-01-31/dragon-dance/reduced-motion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2024-02-01/dragon-dance/intro.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 3360,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2024-02-02/dragon-dance/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 8560,
						start: 2880,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 101,
					},
				],
			},
			{
				type: 1,
				id: '1202058906738622514',
				sku_id: '1202059628112777256',
				title: 'Fortune Flurry',
				description: 'May fortune come your way!',
				accessibilityLabel:
					'A slew of red envelopes ride the wind and rush through the profile.',
				animationType: 1,
				staticFrameSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2024-01-31/fortune-flurry/static.png',
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2024-01-31/fortune-flurry/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2024-01-31/fortune-flurry/reduced-motion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2024-02-01/fortune-flurry/frame.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2024-02-01/fortune-flurry/intro.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 3280,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 101,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2024-02-01/fortune-flurry/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 10000,
						start: 2880,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 102,
					},
				],
			},
			{
				type: 1,
				id: '1202061433689350204',
				sku_id: '1202061510529257522',
				title: 'Midnight Celebration',
				description: 'Protection and prosperity guaranteed.',
				accessibilityLabel:
					'Fireworks ignite and light up the profile surrounded by ornamental designs.',
				animationType: 1,
				staticFrameSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2024-01-31/midnight-celebration/static.png',
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2024-01-31/midnight-celebration/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2024-01-31/midnight-celebration/reduced-motion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2024-02-01/midnight-celebration/frame.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2024-02-01/midnight-celebration/intro.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 2880,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 101,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2024-02-01/midnight-celebration/fireworks.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 3200,
						loopDelay: 5760,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 102,
					},
				],
			},
			{
				type: 1,
				id: '1139323097930027068',
				sku_id: '1139323098370424932',
				title: 'Boost Relic',
				description: 'Legends say this could power an entire server...',
				accessibilityLabel:
					'Boost Relic. Legends say this could power an entire server...',
				animationType: 2,
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-7/boost-relic/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-7/boost-relic/reducedMotion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-20/boost-relic/intro.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 2880,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-20/boost-relic/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 5760,
						loopDelay: 5760,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
			{
				type: 1,
				id: '1139323098370424933',
				sku_id: '1139323103193878569',
				title: 'Cyberspace',
				description: 'Witness the entire world in motion.',
				accessibilityLabel:
					'Cyberspace. Witness the entire world in motion.',
				animationType: 2,
				thumbnailPreviewSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-7/cyberspace/thumbnail.png',
				reducedMotionSrc:
					'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-7/cyberspace/reducedMotion.png',
				effects: [
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-20/cyberspace/intro.png',
						loop: false,
						height: 880,
						width: 450,
						duration: 2880,
						start: 0,
						loopDelay: 0,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
					{
						src: 'https://cdn.discordapp.com/assets/profile_effects/effects/2023-11-20/cyberspace/loop.png',
						loop: true,
						height: 880,
						width: 450,
						duration: 2880,
						start: 5760,
						loopDelay: 5760,
						position: {
							x: 0,
							y: 0,
						},
						zIndex: 100,
					},
				],
			},
		],
	});
});

module.exports = app;
