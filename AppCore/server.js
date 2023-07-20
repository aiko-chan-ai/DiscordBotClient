const express = require('express');
const https = require('https');
const fs = require('fs');
const fetch = require('node-fetch');
const morgan = require('morgan');
const path = require('path');
const { dialog, app: ElectronApp } = require('electron');
const { Server } = require('socket.io');
const { DiscordBuildVersion } = require('../package.json');
const APP_NAME = 'DiscordBotClient';

const handlerRequest = require('./handlers');

async function getData(url) {
	try {
		const html = await fetch(url);
		return await html.text();
	} catch {
		return null;
	}
}

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
// Log all requests
app.use(morgan('dev'));
// Logger from Electron
let logger;
let html = '';
let scriptTarget = {};
const patchList = ['9a287279797be8995feb'];

const server = https.createServer(httpsOptions, app);

const io = new Server(server);

app.io = io;

// Catch unhandled promise rejections
process.on('unhandledRejection', (err) => {
	(0, logger?.error || console.error)(err);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
	(0, logger?.error || console.error)(err);
});

async function start(port, log_, win) {
	if (!logger) logger = log_;
	if (!html) {
		win.setTitle(APP_NAME + ' Loading Discord.html...');
		if (!ElectronApp.isPackaged) {
			html = fs.readFileSync(path.resolve(
                __dirname,
                '..',
                'DiscordCore',
                'index.html',
            ), 'utf8');
		} else {
			html = await getData(
				`https://raw.githubusercontent.com/aiko-chan-ai/DiscordBotClient/${DiscordBuildVersion}/index.html`,
			);
		}
	}
	if (!Object.keys(scriptTarget).length) {
		for (const script of patchList) {
			win.setTitle(APP_NAME + ` Patch ${script}.js...`);
			if (!ElectronApp.isPackaged) {
				scriptTarget[script] = fs.readFileSync(
					path.resolve(
                        __dirname,
                        '..',
                        'DiscordCore',
                        'src',
                        `${script}.js`,
                    ),
					'utf8',
				);
			} else {
				scriptTarget[script] = await getData(
					`https://raw.githubusercontent.com/aiko-chan-ai/DiscordBotClient/${DiscordBuildVersion}/src/${script}.js`,
				);
			}
		}
	}
	if (!html || Object.values(scriptTarget).some((v) => !v)) {
		dialog.showErrorBox(
			'Error',
			'Failed to load the required files. Please try again.',
		);
		process.exit(1);
	}
	handlerRequest(app, logger, html, patchList, scriptTarget, win);
	return new Promise((resolve, reject) => {
		server
			.listen(port, () => {
				resolve(port);
				(0, logger?.info || console.log)(
					`Server is running on port ${port}`,
				);
			})
			.once('error', (err) => {
				resolve(start(port + 1, log_));
			});
	});
}

module.exports = start;
