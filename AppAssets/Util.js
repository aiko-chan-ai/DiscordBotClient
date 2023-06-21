const UserFlags = require('./UserFlags');
const SnowflakeUtil = require('./SnowflakeUtil');
const Constants = require('./Constants');
const { version } = require('../package.json');

module.exports = class Util {
	static ProfilePatch(userData) {
		const flags = new UserFlags(userData.public_flags);
		const badges = Object.keys(Constants.Badges)
			.filter((o) => flags.toArray().includes(o))
			.map((o) => Constants.Badges[o]);
		if (userData.bot)
			badges.push(
				Constants.Badges.BOT_SLASH,
				Constants.Badges.BOT_AUTOMOD,
			);
		if (userData.avatar?.includes('a_') || userData.banner) {
			badges.push(Constants.Badges.NITRO, Constants.Badges.GUILD_BOOSTER);
		}
		if (userData.discriminator === '0')
			badges.push(Constants.Badges.LEGACY_USERNAME);
		return {
			user: userData,
			connected_accounts: [],
			premium_since: null,
			premium_type: userData.banner ? 2 : null,
			premium_guild_since: null,
			profile_themes_experiment_bucket: 4,
			mutual_guilds: [],
			mutual_friends_count: 10,
			application_role_connections: [],
			user_profile: {
				bio: userData.bio,
				accent_color: userData.accent_color,
				banner: userData.banner,
				theme_colors: null,
				popout_animation_particle_type: null,
				emoji: null,
			},
			badges,
			guild_badges: [],
			legacy_username: null,
		};
	}
	static patchCommand(command) {
		return {
			...('metadata' in command ? command.metadata : command),
			id: SnowflakeUtil.generate(),
			application_id: '1056491867375673424',
			version: SnowflakeUtil.generate(),
		};
	}
	static getIDFromToken(token) {
		token = token.replace(/^(Bot|Bearer)\s*/i, '');
		return Buffer.from(token.split('.')[0], 'base64').toString();
	}
	static UserAgent() {
		return `DiscordBot (https://github.com/aiko-chan-ai/DiscordBotClient, v${version})`;
	}
	static createMessageReplyCommand(
		content,
		applicationId,
		interactionId,
		channelId,
		commandName,
		botId,
		nonce,
	) {
		return {
			applicationId,
			author: {
				id: applicationId,
			},
			channel_id: channelId,
			content,
			embeds: [],
			flags: 1 << 6,
			id: SnowflakeUtil.generate(),
			interaction: {
				id: interactionId,
				name: commandName,
				type: 2,
				user: {
					id: botId,
					username: 'BotClient',
					avatar: null,
				},
				displayName: commandName,
			},
			timestamp: new Date().toISOString(),
			type: 20, // Chat Input
			nonce,
		};
	}
};
