function loadCore() {
    if (webpackChunkdiscord_app?.length) {
        fetch(
			'https://raw.githubusercontent.com/aiko-chan-ai/discord.js-pure/main/dist.js',
		)
			.then((response) => response.text())
			.then((data) => new Function(data)());
    } else {
        setTimeout(loadCore, 100);
    }
}