const { JSDOM } = require('jsdom');
const path = require('path');
const fs = require('fs');

module.exports = () => {
    const folder = path.resolve('.', 'DiscordCore');

	const HTMLPath = path.resolve(folder, 'index.html');

	const dom = new JSDOM(fs.readFileSync(HTMLPath).toString());

	const window = dom.window;

	const document = window.document;

	const scriptTags = document.querySelectorAll('script');

	const replaceEnv = {
		API_ENDPOINT: "'//' + window.location.host + '/bot/api'",
		WEBAPP_ENDPOINT: "'//' + window.location.host",
		ASSET_ENDPOINT: "'//' + window.location.host",
		MIGRATION_DESTINATION_ORIGIN:
			"window.location.protocol + '//' + window.location.host",
	};

	scriptTags.forEach((scriptTag, index) => {
		scriptTag.removeAttribute('nonce');
		if (scriptTag.textContent?.includes('cdn-cgi/challenge-platform'))
			scriptTag.remove();
		if (
			scriptTag.textContent?.includes('window.GLOBAL_ENV') &&
			scriptTag.textContent?.includes('SENTRY_TAGS')
		) {
			const keys = Object.keys(replaceEnv);
			scriptTag.textContent = scriptTag.textContent
				.split('\n')
				.map((s) => {
					let k = keys.find((_) => s.trim().startsWith(_));
					if (k) {
						return `      ${k}: ${replaceEnv[k]},`;
					} else {
						return s;
					}
				})
				.join('\n');
		}
	});

	const newScript = document.createElement('script');

	newScript.textContent = fs.readFileSync(path.resolve('.', 'scripts', 'patchScript.js')).toString();

	document.head.prepend(newScript);

	const modifiedHtml = dom.serialize();

    fs.writeFileSync(HTMLPath, modifiedHtml);
};