const { Router } = require('express');
const multer = require('multer');

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
	return getDataFromRequest(req, res, callback);
});

module.exports = app;