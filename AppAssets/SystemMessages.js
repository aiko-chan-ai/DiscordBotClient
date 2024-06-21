const UserData = require('./UserPatch.js');
module.exports = [
	// MessageData
	{
		id: '1000000000000000000',
		type: 0,
		channel_id: '1000000000000000000', // If you want to use it, must set ChannelId to 1000000000000000000
		author: UserData['1056491867375673424'], // Custom User Data here
		attachments: [],
		content: null,
		embeds: [
			{
				type: 'rich',
				description: `Thanks for using my client! <:Kanna_Heart:882480441075040257>
I started this as a hobby project and stayed since ya'll loved it. <:TeriSmile:1048682023839088640>
And I kid you not, I've never had these many users before!? <a:aqua:857071030689202196>

<a:mikupaylak:863287070407786516> If you had fun, please leave a star on the [repo](https://github.com/aiko-chan-ai/DiscordBotClient) <:github:889092230063734795>
It really motivates me to work on the project! <:elylove:1065888090549407785>`,
				color: 16750296,
				timestamp: '2022-11-29T16:56:00.000Z',
				author: {
					name: 'Foreword',
					icon_url: 'https://i.imgur.com/ThXsjjS.png',
				},
				thumbnail: {
					url: 'https://cdn.discordapp.com/avatars/1056491867375673424/93fb88f6b8c0a2a33c437d0fff4c6625.png',
					width: 128,
					height: 128,
				},
				footer: {
					text: 'Elysia',
				},
			},
		], // Custom Embed Data here
		mentions: [],
		mention_roles: [],
		pinned: false,
		mention_everyone: false,
		tts: false,
		timestamp: new Date().toISOString(),
		edited_timestamp: null,
		flags: 16,
		components: [
			{
				type: 1,
				components: [
					{
						type: 2,
						style: 5,
						label: 'Github',
						emoji: {
							name: 'github',
							id: '889092230063734795',
						},
						url: 'https://github.com/aiko-chan-ai/DiscordBotClient',
					},
					{
						type: 2,
						style: 5,
						label: 'Download App',
						emoji: {
							name: 'taive',
							id: '863716659159891998',
						},
						url: 'https://github.com/aiko-chan-ai/DiscordBotClient/releases',
					},
					{
						type: 2,
						style: 5,
						label: 'Bugs',
						emoji: {
							name: 'BugHunter_lvl1',
							id: '873790531887579187',
						},
						url: 'https://github.com/aiko-chan-ai/DiscordBotClient/issues',
					},
				],
			},
		], // Custom Msg Components Data here
	},
];