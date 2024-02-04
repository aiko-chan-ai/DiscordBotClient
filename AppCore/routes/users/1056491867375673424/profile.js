const { Router } = require('express');
const Util = require('../../../../AppAssets/Util');
const UserPatch = require('../../../../AppAssets/UserPatch');

const app = Router();

app.get('/', (req, res) => {
	res.send(Util.ProfilePatch(UserPatch['1056491867375673424']));
});

module.exports = app;
