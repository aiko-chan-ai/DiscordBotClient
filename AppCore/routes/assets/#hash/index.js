const { Router } = require('express');
const path = require('path');
const { readdirSync, readFileSync } = require('fs');
const request = require('request');
const { app: ElectronApp } = require('electron');
const { DiscordBuildVersion } = require('../../../../package.json');

const app = Router();

const patchList = readdirSync(
	path.resolve(__dirname, '..', '..', '..', '..', 'DiscordCore', 'src'),
);

app.get('/', (req, res) => {
	const fileName = req.params.hash;
	if (fileName.endsWith('.map')) {
		return res.status(404).send();
	}
	if (patchList.includes(fileName)) {
		res.set('Cache-Control', 'no-store');
		console.log('Load script target', fileName);
		if (!ElectronApp.isPackaged) {
			res.send(
				readFileSync(
					path.resolve(
						__dirname,
						'..',
						'..',
						'..',
						'..',
						'DiscordCore',
						'src',
						fileName,
					),
					'utf8',
				).toString(),
			);
		} else {
			return request(
				`https://raw.githubusercontent.com/aiko-chan-ai/DiscordBotClient/${DiscordBuildVersion}/src/${fileName}`,
			).pipe(res);
		}
	} else {
		return req
			.pipe(request('https://discord.com/assets/' + fileName))
			.pipe(res);
	}
});

module.exports = app;
