const { PreloadedUserSettings } = require('discord-protos');
const defaultSetting = require('../AppAssets/SettingProto');

console.log(PreloadedUserSettings.toBase64(defaultSetting.data1));
