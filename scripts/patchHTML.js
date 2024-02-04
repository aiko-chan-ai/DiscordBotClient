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

	const oldPatch = document.getElementById('patch-bot-client');

	if (oldPatch) oldPatch.parentNode.removeChild(oldPatch);

	const replaceEnv = {
		API_ENDPOINT: "'//' + window.location.host + '/bot/api'",
		WEBAPP_ENDPOINT: "'//' + window.location.host",
		// ASSET_ENDPOINT: "'//' + window.location.host",
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
	newScript.setAttribute('id', 'patch-bot-client');
	newScript.textContent = fs.readFileSync(path.resolve('.', 'scripts', 'patchScript.js')).toString();
	document.head.prepend(newScript);

	const appMount = document.getElementById('app-mount');
	appMount.parentNode.removeChild(appMount);

	const newStyle = document.createElement('style');
	newStyle.setAttribute('id', 'css-bot-client');
	newStyle.textContent = fs
		.readFileSync(path.resolve('.', 'scripts', 'patchCss.css'))
		.toString();

	const newMain = document.createElement('main');
	newMain.innerHTML = fs
		.readFileSync(path.resolve('.', 'scripts', 'patchMain.html'))
		.toString();

	document.body.prepend(newMain);
	document.body.prepend(newStyle);

	const modifiedHtml = dom.serialize();

    fs.writeFileSync(HTMLPath, modifiedHtml);
};