const express = require('express');
const https = require('https');
const morgan = require('morgan');
const { Server } = require('lambert-server');
const otherRoute = require('./otherRoute');

const path = require('path');
const Util = require('../AppAssets/Util');

const httpsOptions = {
	key: `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAlq7z1DK1qfpPdMKRcDmkw3gkILI2wJo73acB7gfzIWly+zV2
JW139F7cg0GNep6I71s15A56OCGhQzVsF4cC5MdL+UGu4QYdFtweUTE1iUD1Lndg
GQ8w+L2PtROkcXTOu4yRBVpPxT8twlwWTeIZgdALrK3KrHhzc0X51EV8apcOy7mG
5JOxS8sfWhHJ0gmAL8ALvP52KH1TeCccbe5g/NSATxIvGT3vqF8ziCNjTsNoH3Cs
qAG7aE6ZKMN1kVuSEUHtbXIG2LofH4l40tdk/0Et91WtA5GYgA+CIWShRZXGIaPv
0LJKQor6ZKH3CYp3c05Rs3180LUKze3dvUHV4wIDAQABAoIBAHID/YFhwW3Vdgu+
MXg+VbqGDKgk0SMZURUdimtG3qQ4ewUz5araUvq4UJiMoHXYwXqDhJqEjdwtLi2B
ncGLqhfb6VO4bI/eJWKnudTrrDunyB2ZvEAZ6487OCLmsvYaUVc+PHlVZai1bnVz
YnkaDPzZpAvMEOBB3/GoUCpbTZIEg7Y3KGv7FZDTixkSvFGxGpg0wGtZ2uvc6nI5
BE8mg0JwA+aYd6IdgznLsrs5tRomeBH/k5o2rbpS/lG3P3zH8SsTru3SDYq/L3R9
KGn/l+RaQzbQW1gT1tDYCP3eQgTdg2M4e7aLf0pchcQzXxodaLNPrFG1Kb7KyZvU
eeiMq8ECgYEAxORpHTz/REIysd5rPBYYQiyaENzW3PbuXjUJdMHn/qe0dT+ksDmb
V/8QBCDjh0MKyUlQkzUz1QpkedaoUb+lSlCRQiAKoZf2e8+2UnlV+VAfGB0RDlwU
vMaYF/cgTNIgA4vemIupYBwfqenbw/SVGYKt+gYwTv3KxuMhy2xjZmECgYEAw+tL
hpgxcEZYrVl3P4v/I1YeAtiLOMAcDl8dT76YWuIlX88OL3+FKN0UH8rh1u+Kqc8x
rfe3A91wPod2RsjCFkfuYtMHSNr/n9gmtvLZuYNlbSjJJiKMhYyxhM3D3lGBAKjX
cNQoNyC8f4gNITzsY/NRtyDgJrSCwaPS1J1FGsMCgYEAkIfK0XexOn4NkJvgw97E
N+9duPsjjliFagoswtSEZF7fDSKG1gWzjsjhDObHnscL5+41g5oOTliuoPF95WR1
BTRXLN8wbqaKfSBgifIftj+mU6EioBPf9SMjCpSR1VJ5xaCq6fe7gZ2jcKsGc7Xa
rTtMUriwRYvvike4ywbpgIECgYEAmCH78bX4neBiN6nDKXtCUWQrxbX01cqHfrlo
/2VW1SvKLc2QjF2PPx385HscR1SW7ilPwHEckkm/QS7bLzfxTm/osqB/hZlY6fxk
g6esXZukhNEo8Q3e5E1OA3vsXpQXgjWZpal42OX4uWciGu89+JcWmwdSR3vgFRFr
Q2IkKRUCgYBZ5nhRj5Niy7PwYT5mL7mnvrsFi60B7KpYUCxHguQLOl/vhOK1nl19
DwlMNc2nhq3Ws8x3AmfjHCMTIjONqTWWZEBAKvsfHwohAak84CfhJsWAzUft4YHz
415tQXMB16yY98sVFCX7f4lwhikBGZwHgwZgJLqyCRqY/0OxfWXKfw==
-----END RSA PRIVATE KEY-----`,
	cert: `-----BEGIN CERTIFICATE-----
MIID7zCCAtegAwIBAgIUc0V/MaAGJ7cUn90w2SnROYsKCFcwDQYJKoZIhvcNAQEL
BQAwgYYxCzAJBgNVBAYTAlVTMRIwEAYDVQQIDAlXYXNpbmd0b24xFDASBgNVBAcM
C0xvcyBBbmdlbGVzMQ0wCwYDVQQKDARBaWtvMQ0wCwYDVQQLDARBaWtvMQ0wCwYD
VQQDDARBaWtvMSAwHgYJKoZIhvcNAQkBFhFhaWtvQGNpbm5hbW9uLmNvbTAeFw0y
MjA4MjIxNjU2MDNaFw0yMzA4MjIxNjU2MDNaMIGGMQswCQYDVQQGEwJVUzESMBAG
A1UECAwJV2FzaW5ndG9uMRQwEgYDVQQHDAtMb3MgQW5nZWxlczENMAsGA1UECgwE
QWlrbzENMAsGA1UECwwEQWlrbzENMAsGA1UEAwwEQWlrbzEgMB4GCSqGSIb3DQEJ
ARYRYWlrb0BjaW5uYW1vbi5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEK
AoIBAQCWrvPUMrWp+k90wpFwOaTDeCQgsjbAmjvdpwHuB/MhaXL7NXYlbXf0XtyD
QY16nojvWzXkDno4IaFDNWwXhwLkx0v5Qa7hBh0W3B5RMTWJQPUud2AZDzD4vY+1
E6RxdM67jJEFWk/FPy3CXBZN4hmB0AusrcqseHNzRfnURXxqlw7LuYbkk7FLyx9a
EcnSCYAvwAu8/nYofVN4Jxxt7mD81IBPEi8ZPe+oXzOII2NOw2gfcKyoAbtoTpko
w3WRW5IRQe1tcgbYuh8fiXjS12T/QS33Va0DkZiAD4IhZKFFlcYho+/QskpCivpk
ofcJindzTlGzfXzQtQrN7d29QdXjAgMBAAGjUzBRMB0GA1UdDgQWBBQLnrBodw0Z
71upliqlOxu5Jw8q4TAfBgNVHSMEGDAWgBQLnrBodw0Z71upliqlOxu5Jw8q4TAP
BgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3DQEBCwUAA4IBAQAUKShsDAWWmDbIzTBk
jAkJTpJac78o3C3H0Crb73PgXajjBK/Py9fMeROMa8LBXAW7CmB6XOhiJl8n8Ufm
l70ErDRAmr7UDEyJBfd8EEoe+MpqL1mD8GKR4A5Z+0eZVzX2MmlbSOS1woqmHEFe
8O4NsgbfncAg04e9WLDUXASzt+wgNlrbwbZw1FjThIbApfGGVfR9+Q8/aUir17yr
GP+KLYaM2zefuyVYNx73IWqLpyHkC+fT3kDmTWvs2ozOyCTu420k1Kpygb5YrodU
MXMU3kbLmHTA/2AqctrTPCND+sZRHPZySuxhMmDrGViKfSzvxA6VQTWcziqUWXWX
31dP
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
			headers.authorization = req.headers.authorization;
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
