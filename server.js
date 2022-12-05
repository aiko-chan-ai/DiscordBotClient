const express = require("express");
const request = require("request");
const http = require("https");
const axios = require("axios");
const fetch = require("node-fetch");

async function getData (url) {
  const html = await fetch(url);
  return await html.text();
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
-----END CERTIFICATE-----`
}

const app = express();


let html = '';

let scriptTarget = '';

const handlerRequest = (url, bot, req, res) => {
  if (bot == true) {
    const blacklist = [
      'entitlements/gifts',
      'outbound-promotions/codes',
      'experiments',
      'entitlements',
      'subscription-plans',
      'subscription-slots',
      'science',
      'affinities',
      'users/@me/harvest',
      'oauth2',
    ].some(path => url.includes(path));
    if (blacklist) return res.status(404).send({
      message: 'Bot is not authorized to access this endpoint :))'
    });
    if (url.includes('application-commands/search')) {
      return res.status(200).send({
        "applications": [],
        "application_commands": [],
        "cursor": null
      });
    } else if (url.includes('/profile')) {
      return res.status(200).send({
        user: {},
        connected_accounts: [],
        premium_since: null,
        premium_type: null,
        premium_guild_since: null,
        profile_themes_experiment_bucket: -1,
        user_profile: {}
      });
    } else if (
      [
        'users/@me/mentions',
        'billing/',
        'activities/guilds',
        'interactions',
        'premium/subscriptions',
        'relationships',
        'messages/search',
      ].some(path => url.includes(path))
    ) {
      return res.status(200).send([]);
    } else if (
      url.includes('settings-proto') ||
      url.includes('users/@me/settings')
    ) {
      return res.status(200).send({});
    } else if (url.includes('/threads/search?archived=true')) {
      const cid = /\d{17,19}/.exec(url)[0];
      axios.get(`https://discord.com/api/v9/channels/${cid}/threads/archived/public`, {
        headers: {
          authorization: req.headers.authorization,
          'user-agent': req.headers['user-agent']
        },
      })
        .then(response => {
          res.status(200).send(response.data);
        })
        .catch(err => {
          res.status(404).send({
            message: err.message,
            error: err.stack,
            debug: {
              channelId: cid,
            }
          });
        })
    }
    else if (url.includes('/ask')) {
      return res.status(200).send({ token: null })
    }
    else if (url.includes('billing/country-code')) {
      return res.status(200).send({
        country_code: "VN"
      });
    } else if (url.includes('logout')) {
      return res.status(200).send('');
    }
    else {
      return req.pipe(request("https://discord.com" + url)).pipe(res);
    }
  }
}


app.all('/d/*', function (req, res) {
  const str = req.originalUrl;
  const trs = str.slice('\x32');
  console.log('URL Request', trs);
  if (req.headers?.authorization) {
    req.headers.authorization = `Bot ${req.headers.authorization}`;
    delete req.headers['User-Agent'];
    req.headers['user-agent'] = 'DiscordBot (https://nodejs.org, 16.0.0)'
  }
  handlerRequest(trs, true, req, res);
});
app.all('/sticker*', function (req, res) {
  const str = req.originalUrl;
  const trs = str;
  req.pipe(request("https://discord.com" + trs)).pipe(res);
});
app.all('/asset*', function (req, res) {
  const str = req.originalUrl;
  const trs = str;
  console.log('Require Assets:', trs);
  if (trs.includes('02be0d5b4681a76d9def.js') && trs.endsWith('.js')) {
    res.set('Cache-Control', 'no-store');
    console.log('Load script target');
    return res.send(scriptTarget);
  }
  req.pipe(request("https://discord.com" + trs)).pipe(res);
});
app.all("*", (req, res) => {
  res.send(html);
});

// Catch unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(err);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(err);
});

module.exports = async function (port) {
  if (!html) {
    html = await getData('https://raw.githubusercontent.com/aiko-chan-ai/DiscordBotClient/main/404.html')
  }
  if (!scriptTarget) {
    scriptTarget = await getData('https://raw.githubusercontent.com/aiko-chan-ai/DiscordBotClient/main/script/02be0d5b4681a76d9def.js')
  }
  return new Promise((resolve, reject) => {
    http.createServer(httpsOptions, app)
      .listen(port, () => {
        resolve(true);
        console.log(`Server is running on port ${port}`);
      }).once('error', (err) => {
        resolve(false);
      });
  });
}