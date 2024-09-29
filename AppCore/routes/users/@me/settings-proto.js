const { Router } = require('express');
const {
	PreloadedUserSettings,
	FrecencyUserSettings,
} = require('discord-protos');
const _ = require('lodash');
const store = require('../../../ElectronStore');
const Util = require('../../../../AppAssets/Util');
const SettingProto = require('../../../../AppAssets/SettingProto');

const app = Router();

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
	return Util.getDataFromRequest(req, res, callback);
});

app.all('/2', (req, res) => {
	return res.send({
		settings: FrecencyUserSettings.toBase64(SettingProto.data2),
	});
});

module.exports = app;