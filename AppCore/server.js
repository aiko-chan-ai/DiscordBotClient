const express = require('express');
const https = require('https');
const morgan = require('morgan');
const { Server } = require('lambert-server');
const otherRoute = require('./otherRoute');

const path = require('path');
const Util = require('../AppAssets/Util');

const httpsOptions = {
	key: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDxSqwHuJiZ0l8d
/UOFkzL2svJcB6mzL5Xw73twnsE4fRFbWPDgf3pNFeP5N9LBy/tpH+JFORT617mo
yRdcP50qpYHEDkW/OpBQj0/cih4QH2NzgTplIDU3mXMeytK50y2b/90NCnV04s1E
EpBZIfc51AEPzA09bXjCkW/ZbkCDtjNpjZZFtA+dStst8G0ErUtF6Hxq1d3DNlkV
eGUBVNl/ziKIghI38iUXAJ+F+7Tzl+x/+sQTPmAZmeBbeVvA4RhR3qnHV+HYlQPL
HHjbp9JTGCiDEFgncg/1LOYTdEeQuaggLkcVcqbK3NjM2plKuOOE/qYEQ+EbIEJK
Ye8NawDvAgMBAAECggEAHphvU9NOVkLcmLricu+FSM7L+GtoUzY3dwOGzXLz4SvK
paCTeoPviBK8g39WlAg/ascGM+zXAi+UdRh6g9H1JdEysR92LJdKcUyavcYtpbG1
NJIwS15YISKt/DuPmMx0PhGlf9/RoO6ZRIZuEz9BT+3X7J7dFurooxM58YIPYCPd
PX/i5yDPozvE0CS48l30r0O71wvSA4wu3AWseo85giXu6JabYyPg73OUooJIjC3a
El8bGACPjciEK6pQQ59mX/rFtu+lUQLXzh0z9caPUsL4w6sJ+z76iRfgatKp2CoR
cMzI5q8+chGqrKJ2EFzgZc/hDXQhDOjqIsq14J/UIQKBgQD5EB5mwFIsL1Za6MA7
+4iu8ZKVqD9yTe1jMollWIK9jHY8bZAhuGBUQO5nbuhZxSeSI7x51wjwucXNVOrg
AgX6KlLVTLC3KSBMURzxeC+WIyuhao0mfEB5MkcGXz1kHn+QVelyvMc1lBu1t3bX
e4hgaBPByyGgpXC9194XPxCddwKBgQD4AyRgKeWH3zeYfJea+cYQjf3yQfN7zhAE
mwPudl6FoqXt6fphkKir83HHB0ZG9U/QV2a5aWGf+duH5iIrtnyqdx0+tUQlzDlb
1EqCTmHV/jGMX+1svxCiCMD7p4zwymWqRyaGfAfjR6H/9IPltDxhRDfB3Svo0JCt
zGGwZQE2SQKBgQDSadq1Rg9mAsv6253kTvnHipEjXFPVtp4x6vUGqMMzbeJJ5Ooa
gtDm/UAsJBeqF5T5srU9XfzQmrHQachQXYU9NtpqF3NIGjeOIgzIt5fESIxIv2Lm
O5ygh2hXqsiLt/RfNSWXaIMH8cuDNq7xFw09HVBrrbgIJxzbVe7sRrw7uwKBgF8c
bV3Hk3PI4bxDw6w2L4P3wDSgoCyReMkbXaWclWEwX+veeBvkaxsOUErgek4KE6K1
cfqW9E5ydoMmeWJEKIkDBx8eStUn/bM+tZhFUPXM9tl7jETQ/SL2snOP7NgG9ngX
symN9URvGyxabB6yQRmYHL3nAMjW+zT7lVcdVRqpAoGBAIgRyuhRGs8oHHFBVsEO
lCQjCf9AHFMCFOU615aV1lDV7vfBkDpmerj8KxEW7a8BysuWuAsw/X688CBpxvAj
sxgIZ+p8jk9gveJ+hrcUYB6H3XsADSvsWWRs4HMcx5sdLmr0dY7AWw/L+RDm2RTF
ZWq496s3weGsFXhUdbbTYlVs
-----END PRIVATE KEY-----`,
	cert: `-----BEGIN CERTIFICATE-----
MIIDCTCCAfGgAwIBAgIUBgfOhzCvG1LR/C1kljgq31ilonIwDQYJKoZIhvcNAQEL
BQAwFDESMBAGA1UEAwwJbG9jYWxob3N0MB4XDTI0MDIwNDE1NTk1NFoXDTM0MDIw
MTE1NTk1NFowFDESMBAGA1UEAwwJbG9jYWxob3N0MIIBIjANBgkqhkiG9w0BAQEF
AAOCAQ8AMIIBCgKCAQEA8UqsB7iYmdJfHf1DhZMy9rLyXAepsy+V8O97cJ7BOH0R
W1jw4H96TRXj+TfSwcv7aR/iRTkU+te5qMkXXD+dKqWBxA5FvzqQUI9P3IoeEB9j
c4E6ZSA1N5lzHsrSudMtm//dDQp1dOLNRBKQWSH3OdQBD8wNPW14wpFv2W5Ag7Yz
aY2WRbQPnUrbLfBtBK1LReh8atXdwzZZFXhlAVTZf84iiIISN/IlFwCfhfu085fs
f/rEEz5gGZngW3lbwOEYUd6px1fh2JUDyxx426fSUxgogxBYJ3IP9SzmE3RHkLmo
IC5HFXKmytzYzNqZSrjjhP6mBEPhGyBCSmHvDWsA7wIDAQABo1MwUTAdBgNVHQ4E
FgQUR8iEpvCnUn6djhg2cqYi+TJtpSIwHwYDVR0jBBgwFoAUR8iEpvCnUn6djhg2
cqYi+TJtpSIwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAHDCq
Z3Bdfxu7A06JAoPg5sZDxcFU5Ffa2iabeZDksZofzkhmc4uQd+PGltWtH6pFlHEy
7ExUtiahkYZ1b92nRatOkz27kjAaxoviNXirPPie3eKBLILm8kaD9EYIDGm0Zzwn
t0VBvHVOfV4tuglTRrNE/bUkUfAtdSPV0X9qt9d1hRv5SvxwLXmQP/mrGztHPJwq
MK7bjyhRRaKTuMleXlh1w+Q+Uzl22TttNRCBFb6IKQ4Yox7z0MoD+er2NorcE3bW
aDVY0gxKUZfmbyKs2IBvXIZuKpKjhJHAXw8bxyHjS1qe2ycBGZAh9CskhacKdvkf
3V2GYBPi7OCHXEYUkQ==
-----END CERTIFICATE-----`,
};

const app = express();

app.use(morgan('dev'));

const server = https.createServer(httpsOptions, app);

const route = express.Router();

const lambertServer = new Server({
	app: route,
	server,
	production: true,
	errorHandler: false,
	jsonBody: false,
});

BigInt.prototype.toJSON = function () {
	return this.toString();
};

async function start(port, win) {
	// Reg Route
	lambertServer.registerRoutes(path.resolve(__dirname, `routes`) + path.sep);
	// re-def
	lambertServer.app = app;
	// API v9
	app.all('/bot*', function (req, res, next) {
		let headers = {
			'user-agent': Util.UserAgent(),
		};
		if (req.headers.authorization) {
			headers.authorization = `Bot ${req.headers.authorization
				.replace(/bot/gi, '')
				.trim()}`;
		}
		Object.keys(req.headers).forEach((key) => {
			if (
				[
					'cookie',
					'x-',
					'sec-',
					'referer',
					'origin',
					'authorization',
					'user-agent',
					'host',
				].some((prefix) => key.toLowerCase().startsWith(prefix))
			) {
				return;
			} else {
				headers[key] = req.headers[key];
			}
		});
		req.headers = headers;
		next();
	});

	app.use('/bot/api/v9', route);
	app.use('/bot/api', route);
	app.use(route);

	// otherRoute
	otherRoute(app);

	return new Promise((resolve, reject) => {
		server
			.listen(port)
			.once('listening', () => {
				const address = server.address();
				resolve(address.port);
				console.log(
					`Server listening on https://localhost:${address.port}`,
				);
			})
			.once('error', (err) => {
				resolve(start(port + 1, win));
			});
	});
}

process.on('unhandledRejection', (err) => {
	console.error(err);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
	console.error(err);
});

module.exports = start;
