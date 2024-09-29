const { Router } = require('express');
const Util = require('../../../../AppAssets/Util');

const app = Router();

app.post('/', (req, res) => {
	const callback = (req, res) => {
        const threads = {};
        req.body?.thread_ids.map((threadId) => {
            threads[threadId] = {
				first_message: null,
				owner: null,
			};
        });
		return res.send({
			threads,
		});
	};
	return Util.getDataFromRequest(req, res, callback);
});

module.exports = app;