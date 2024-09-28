const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');
const package = require('../package.json');

const URL = 'https://discord.com/channels/@me';

const folder = path.resolve('.', 'DiscordCore');

if (!fs.existsSync(folder)) {
	fs.mkdirSync(folder, {
		recursive: true,
	});
}

const HTMLPath = path.resolve(folder, 'index.html');

fetch(URL)
	.then((r) => r.text())
	.then((text) => {
		fs.writeFileSync(HTMLPath, text);
		if (!package.testVencord) {
			console.log('[Discord] Patching HTML + CSS + JS');
			require('./patchHTML')();
		}
		const sentry = text
			.split('\n')
			.find((s) => s.trim().startsWith('SENTRY_TAGS'));
		console.log('[Discord] Build', sentry.trim());
	});
