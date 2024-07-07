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
		// Check Nitro Type
		if (userData.premium_type > 0) {
			badges.push(Constants.Badges.NITRO);
			if (userData.premium_type == 2) {
				badges.push(Constants.Badges.GUILD_BOOSTER);
			}
		}
		// Old username
		if (userData.discriminator === '0')
			badges.push(Constants.Badges.LEGACY_USERNAME);
		return {
			user: userData,
			connected_accounts: [],
			premium_since: null,
			// Force enable Nitro features (Bot)
			premium_type: userData.bot ? 2 : userData.premium_type,
			premium_guild_since: null,
			profile_themes_experiment_bucket: 4,
			mutual_guilds: [],
			mutual_friends: [],
			mutual_friends_count: 0,
			application_role_connections: [],
			user_profile: {
				bio: userData.bio,
				accent_color: userData.accent_color,
				banner: userData.banner,
				pronouns: userData.pronouns,
				profile_effect: null,
				theme_colors: null,
				popout_animation_particle_type: null,
				emoji: null,
			},
			badges,
			guild_badges: [],
			legacy_username: null,
		};
	}
	static getIDFromToken(token) {
		token = token.replace(/^(Bot|Bearer)\s*/i, '');
		return Buffer.from(token.split('.')[0], 'base64').toString();
	}
	static UserAgent() {
		return `DiscordBot (https://github.com/aiko-chan-ai/DiscordBotClient, v${version})`;
	}
};
