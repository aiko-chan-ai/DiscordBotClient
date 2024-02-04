const { Router } = require('express');

const app = Router();

app.get('/', (req, res) => {
	const guildId = req.params.id;
    res.send({
		guild_id: guildId,
		prompts: [],
		default_channel_ids: [],
		enabled: false,
		mode: 0,
		below_requirements: false,
		responses: [],
		onboarding_prompts_seen: {},
		onboarding_responses_seen: {},
	});
});

module.exports = app;
