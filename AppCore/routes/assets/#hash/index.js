const { Router } = require('express');
const request = require('request');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const package = require('../../../../package.json');

const staticFolder = path.resolve('.', 'AppAssets', 'assets');

if (package.cacheAssets && !fs.existsSync(staticFolder)) {
	fs.mkdirSync(staticFolder);
}

const app = Router();

app.get('/', async (req, res) => {
	const fileName = req.params.hash;
	if (fileName.endsWith('.map')) {
		return res.status(404).send();
	}
	else if (fileName.endsWith('.js') && package.cacheAssets) {
		// Readdir
		if (fs.readdirSync(staticFolder).includes(fileName)) {
			res.type('.js');
			res.send(
				fs.readFileSync(path.resolve(staticFolder, fileName), 'utf8'),
			);
		} else {
			const f = await fetch('https://dis-proxy.stormgalaxy.com/assets/' + fileName);
			const content = await f.text();
			fs.writeFileSync(path.resolve(staticFolder, fileName), content);
			res.type('.js');
			res.send(content);
		}
	} else if (fileName.endsWith('.css') && package.cacheAssets) {
		// Readdir
		if (fs.readdirSync(staticFolder).includes(fileName)) {
			res.type('.css');
			res.send(
				fs.readFileSync(path.resolve(staticFolder, fileName), 'utf8'),
			);
		} else {
			const f = await fetch('https://dis-proxy.stormgalaxy.com/assets/' + fileName);
			const content = await f.text();
			fs.writeFileSync(path.resolve(staticFolder, fileName), content);
			res.type('.css');
			res.send(content);
		}
	} else if (fileName.endsWith('.svg') && package.cacheAssets) {
		// Readdir
		if (fs.readdirSync(staticFolder).includes(fileName)) {
			res.type('.svg');
			res.send(
				fs.readFileSync(path.resolve(staticFolder, fileName), 'utf8'),
			);
		} else {
			const f = await fetch('https://dis-proxy.stormgalaxy.com/assets/' + fileName);
			const content = await f.text();
			fs.writeFileSync(path.resolve(staticFolder, fileName), content);
			res.type('.svg');
			res.send(content);
		}
	}
	else {
		return req
			.pipe(request('https://dis-proxy.stormgalaxy.com/assets/' + fileName))
			.pipe(res);
	}
});

module.exports = app;
