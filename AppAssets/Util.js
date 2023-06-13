const UserFlags = require('./UserFlags');
const Constants = require('./Constants');

module.exports = class Util {
    static ProfilePatch(userData) {
		const flags = new UserFlags(userData.public_flags);
		const badges = flags.toArray().map((n) => Constants.Badges[n]).filter(o => o);
		if (userData.bot) badges.push(Constants.Badges.BOT_SLASH, Constants.Badges.BOT_AUTOMOD);
		if (
			userData.avatar?.includes('a_') ||
			userData.banner
		) {
			badges.push(Constants.Badges.NITRO, Constants.Badges.GUILD_BOOSTER);
		}
		if (userData.discriminator === '0') badges.push(Constants.Badges.LEGACY_USERNAME);
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
}