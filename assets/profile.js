const UserData = require('./user.js');

module.exports = {
	user: UserData,
	connected_accounts: [],
	mutual_friends_count: 0,
	mutual_guilds: [],
	premium_since: null,
	premium_type: null,
	premium_guild_since: null,
	profile_themes_experiment_bucket: 4,
	user_profile: {
		bio: '',
		accent_color: null,
		banner: null,
		theme_colors: null,
		popout_animation_particle_type: null,
		emoji: null,
	},
};