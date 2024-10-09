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

	if (oldPatch) {
		console.log('[Discord] Removing old patch');
		oldPatch.parentNode.removeChild(oldPatch);
	}

	const replaceEnv = {
		API_ENDPOINT: "'//' + 'discord.stormgalaxy.com' + '/api'",
		WEBAPP_ENDPOINT: "'//' + 'discord.stormgalaxy.com'",
		ASSET_ENDPOINT: "'//' + 'discord.stormgalaxy.com'",
		MIGRATION_DESTINATION_ORIGIN:
			"window.location.protocol + '//' + 'discord.stormgalaxy.com'",
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
			console.log('[Discord] Patch GLOBAL_ENV');
		}
	});

	const newScript = document.createElement('script');
	newScript.setAttribute('id', 'patch-bot-client');
	newScript.textContent = fs.readFileSync(path.resolve('.', 'scripts', 'patchScript.js')).toString();
	document.head.prepend(newScript);
	console.log('[Discord] Add custom JS');

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

	console.log('[Discord] Patch UI + CSS');

	const modifiedHtml = dom.serialize();

    fs.writeFileSync(HTMLPath, modifiedHtml);
};