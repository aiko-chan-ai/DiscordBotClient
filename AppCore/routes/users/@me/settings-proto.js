const { Router } = require('express');
const {
	PreloadedUserSettings,
	FrecencyUserSettings,
} = require('discord-protos');
const multer = require('multer');
const _ = require('lodash');
const store = require('../../../ElectronStore');
const Util = require('../../../../AppAssets/Util');
const SettingProto = require('../../../../AppAssets/SettingProto');

const app = Router();

function getDataFromRequest(req, res, callback) {
	var data = '';
	// check content-type
	if (req.headers['content-type'] !== 'application/json') {
		return multer().any()(req, res, function (err) {
			if (err) {
				console.error('Multer Error:', err);
			}
			callback(req, res);
		});
	}
	req.on('data', function (chunk) {
		data += chunk;
	});
	req.on('end', function () {
		req.rawBody = data;
		if (data) {
			try {
				req.body = JSON.parse(data);
			} catch (e) {
				req.body = undefined;
				console.error('JSON Parse Error:', e);
			}
			callback(req, res);
		}
	});
}

app.all('/1', (req, res) => {
	const uid = Util.getIDFromToken(req.headers.authorization);
	if (!uid)
		return res.send({
			settings: '',
		});
	const userData = store.get(uid);
	if (req.method.toUpperCase() == 'GET') {
		return res.send({
			settings: PreloadedUserSettings.toBase64({
				...userData.settingProto.data1,
				guildFolders: { folders: [], guildPositions: [] },
			}),
		});
	}
	const callback = (req, res) => {
		const decoded = PreloadedUserSettings.fromBase64(req.body?.settings);
		store.set(
			uid,
			{
				settingProto: {
					data1: decoded,
				},
			},
			false,
			'overwrite',
		);
		return res.send({
			settings: PreloadedUserSettings.toBase64(
				store.get(uid).settingProto.data1,
			),
		});
	};
	return getDataFromRequest(req, res, callback);
});

app.all('/2', (req, res) => {
	return res.send({
		settings: FrecencyUserSettings.toBase64(SettingProto.data2),
	});
});

module.exports = app;