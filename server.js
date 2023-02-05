const express = require("express");
const request = require("request");
const http = require("https");
const axios = require("axios");
const fetch = require("node-fetch");

async function getData(url) {
  const html = await fetch(url);
  return await html.text();
}

const UserData = {
  "id": "1056491867375673424",
  "username": "aiko-chan-ai",
  "display_name": null,
  "avatar": "93fb88f6b8c0a2a33c437d0fff4c6625",
  "avatar_decoration": null,
  "discriminator": "0000",
  "public_flags": 1,
  "flags": 1,
  "bot": true,
  "system": true,
  "banner": null,
  "banner_color": null,
  "accent_color": null,
  "bio": ""
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

let logger;


let html = '';

let scriptTarget = {};

const patchList = [
  '02be0d5b4681a76d9def',
  '087faa3fe576396cad3c',
]

const handlerRequest = (url, req, res) => {
    // Author:
    if (url.endsWith('users/1056491867375673424')) {
      return res.send(UserData);
    }
    if (url.includes('users/1056491867375673424/profile')) {
      return res.send({
        "user": UserData,
        "connected_accounts": [],
        "premium_since": null,
        "premium_type": null,
        "premium_guild_since": null,
        "profile_themes_experiment_bucket": 4,
        "user_profile": {
          "bio": "",
          "accent_color": null,
          "banner": null,
          "theme_colors": null,
          "popout_animation_particle_type": null,
          "emoji": null
        }
      });
    }
    if (url.includes('channels/1000000000000000000/messages')) {
      return res.send([
        {
          "id": "1000000000000000000",
          "type": 0,
          "content": `**Word From Developers**
Thanks for using our client! <:Kanna_Heart:882480441075040257> 
I started this as a hobby project and stayed since ya'll loved it. <:TeriSmile:1048682023839088640> 
And I kid you not, I've never had these many users before!? <a:aqua:857071030689202196>
<a:mikupaylak:863287070407786516> If you had fun, please leave a star on the repo <:github:889092230063734795> 
https://github.com/aiko-chan-ai/DiscordBotClient
It really motivates me to work on the project! <:elylove:1065888090549407785>`,
          "channel_id": "1000000000000000000",
          "author": UserData,
          "attachments": [],
          "embeds": [],
          "mentions": [],
          "mention_roles": [],
          "pinned": false,
          "mention_everyone": false,
          "tts": false,
          "timestamp": "2023-01-01T12:00:00.000000+00:00",
          "edited_timestamp": null,
          "flags": 16,
          "components": [
            {
              "type": 1,
              "components": [
                {
                  "type": 2,
                  "style": 5,
                  "label": "Github",
                  "emoji": {
                    "name": "github",
                    "id": "889092230063734795"
                  },
                  "url": "https://github.com/aiko-chan-ai/DiscordBotClient"
                },
                {
                  "type": 2,
                  "style": 5,
                  "label": "Download App",
                  "emoji": {
                    "name": "taive",
                    "id": "863716659159891998"
                  },
                  "url": "https://github.com/aiko-chan-ai/DiscordBotClient/releases"
                },
                {
                  "type": 2,
                  "style": 5,
                  "label": "Bugs",
                  "emoji": {
                    "name": "BugHunter_lvl1",
                    "id": "873790531887579187"
                  },
                  "url": "https://github.com/aiko-chan-ai/DiscordBotClient/issues"
                }
              ]
            }
          ]
        }
      ])
    }
        //
    // Nitro
    if (url.includes('store/published-listings/skus/')) {
      if (url.includes('978380684370378762/subscription-plans')) {
        return res.send([{ "id": "978380692553465866", "name": "Nitro Basic Monthly", "interval": 1, "interval_count": 1, "tax_inclusive": true, "sku_id": "978380684370378762", "discount_price": 299, "fallback_price": 299, "fallback_currency": "usd", "currency": "vnd", "price": 42000, "price_tier": null, "prices": { "0": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 42000, "exponent": 0 }, { "currency": "usd", "amount": 184, "exponent": 2 }] }, "payment_source_prices": {} }, "1": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 67954, "exponent": 0 }, { "currency": "usd", "amount": 299, "exponent": 2 }] }, "payment_source_prices": {} }, "3": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 42000, "exponent": 0 }, { "currency": "usd", "amount": 184, "exponent": 2 }] }, "payment_source_prices": {} }, "4": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 42000, "exponent": 0 }, { "currency": "usd", "amount": 184, "exponent": 2 }] }, "payment_source_prices": {} } } }, { "id": "1024422698568122368", "name": "Nitro Basic Yearly", "interval": 2, "interval_count": 1, "tax_inclusive": true, "sku_id": "978380684370378762", "discount_price": 2999, "fallback_price": 2999, "fallback_currency": "usd", "currency": "vnd", "price": 419000, "price_tier": null, "prices": { "0": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 419000, "exponent": 0 }, { "currency": "usd", "amount": 1760, "exponent": 2 }] }, "payment_source_prices": {} }, "1": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 2999, "exponent": 2 }, { "currency": "vnd", "amount": 679540, "exponent": 0 }] }, "payment_source_prices": {} }, "3": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 419000, "exponent": 0 }, { "currency": "usd", "amount": 1760, "exponent": 2 }] }, "payment_source_prices": {} }, "4": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 419000, "exponent": 0 }, { "currency": "usd", "amount": 1760, "exponent": 2 }] }, "payment_source_prices": {} } } }])
      } else if (url.includes('521842865731534868/subscription-plans')) {
        return res.send([{ "id": "511651860671627264", "name": "Nitro Yearly (Legacy)", "interval": 2, "interval_count": 1, "tax_inclusive": true, "sku_id": "521842865731534868", "currency": "usd", "price": 4999, "price_tier": null, "prices": { "0": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 4999, "exponent": 2 }] }, "payment_source_prices": {} }, "3": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 4999, "exponent": 2 }] }, "payment_source_prices": {} }, "4": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 4999, "exponent": 2 }] }, "payment_source_prices": {} } } }, { "id": "511651856145973248", "name": "Nitro Monthly (Legacy)", "interval": 1, "interval_count": 1, "tax_inclusive": true, "sku_id": "521842865731534868", "currency": "usd", "price": 499, "price_tier": null, "prices": { "0": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 499, "exponent": 2 }] }, "payment_source_prices": {} }, "3": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 499, "exponent": 2 }] }, "payment_source_prices": {} }, "4": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 499, "exponent": 2 }] }, "payment_source_prices": {} } } }])
      } else if (url.includes('521846918637420545/subscription-plans')) {
        return res.send([{ "id": "511651871736201216", "name": "Nitro Classic Monthly", "interval": 1, "interval_count": 1, "tax_inclusive": true, "sku_id": "521846918637420545", "fallback_price": 499, "fallback_currency": "usd", "currency": "vnd", "price": 56000, "price_tier": null, "prices": { "0": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 56000, "exponent": 0 }, { "currency": "usd", "amount": 246, "exponent": 2 }] }, "payment_source_prices": {} }, "1": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 113409, "exponent": 0 }, { "currency": "usd", "amount": 499, "exponent": 2 }] }, "payment_source_prices": {} }, "3": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 56000, "exponent": 0 }, { "currency": "usd", "amount": 246, "exponent": 2 }] }, "payment_source_prices": {} }, "4": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 56000, "exponent": 0 }, { "currency": "usd", "amount": 246, "exponent": 2 }] }, "payment_source_prices": {} } } }, { "id": "511651876987469824", "name": "Nitro Classic Yearly", "interval": 2, "interval_count": 1, "tax_inclusive": true, "sku_id": "521846918637420545", "fallback_price": 4999, "fallback_currency": "usd", "currency": "vnd", "price": 560000, "price_tier": null, "prices": { "0": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 560000, "exponent": 0 }, { "currency": "usd", "amount": 2464, "exponent": 2 }] }, "payment_source_prices": {} }, "1": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 1136136, "exponent": 0 }, { "currency": "usd", "amount": 4999, "exponent": 2 }] }, "payment_source_prices": {} }, "3": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 560000, "exponent": 0 }, { "currency": "usd", "amount": 2464, "exponent": 2 }] }, "payment_source_prices": {} }, "4": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 560000, "exponent": 0 }, { "currency": "usd", "amount": 2464, "exponent": 2 }] }, "payment_source_prices": {} } } }])
      } else if (url.includes('521847234246082599/subscription-plans')) {
        return res.send([{ "id": "511651880837840896", "name": "Nitro Monthly", "interval": 1, "interval_count": 1, "tax_inclusive": true, "sku_id": "521847234246082599", "fallback_price": 999, "fallback_currency": "usd", "currency": "vnd", "price": 113000, "price_tier": null, "prices": { "0": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 113000, "exponent": 0 }, { "currency": "usd", "amount": 497, "exponent": 2 }] }, "payment_source_prices": {} }, "1": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 227045, "exponent": 0 }, { "currency": "usd", "amount": 999, "exponent": 2 }] }, "payment_source_prices": {} }, "3": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 113000, "exponent": 0 }, { "currency": "usd", "amount": 497, "exponent": 2 }] }, "payment_source_prices": {} }, "4": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 113000, "exponent": 0 }, { "currency": "usd", "amount": 497, "exponent": 2 }] }, "payment_source_prices": {} } } }, { "id": "642251038925127690", "name": "Nitro 3 Month", "interval": 1, "interval_count": 3, "tax_inclusive": true, "sku_id": "521847234246082599", "currency": "usd", "price": 2849, "price_tier": null, "prices": { "0": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 2849, "exponent": 2 }] }, "payment_source_prices": {} }, "1": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 2849, "exponent": 2 }] }, "payment_source_prices": {} }, "3": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 2849, "exponent": 2 }] }, "payment_source_prices": {} }, "4": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 2849, "exponent": 2 }] }, "payment_source_prices": {} } } }, { "id": "511651885459963904", "name": "Nitro Yearly", "interval": 2, "interval_count": 1, "tax_inclusive": true, "sku_id": "521847234246082599", "fallback_price": 9999, "fallback_currency": "usd", "currency": "vnd", "price": 1130000, "price_tier": null, "prices": { "0": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 1130000, "exponent": 0 }, { "currency": "usd", "amount": 4972, "exponent": 2 }] }, "payment_source_prices": {} }, "1": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 2272500, "exponent": 0 }, { "currency": "usd", "amount": 9999, "exponent": 2 }] }, "payment_source_prices": {} }, "3": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 1130000, "exponent": 0 }, { "currency": "usd", "amount": 4972, "exponent": 2 }] }, "payment_source_prices": {} }, "4": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 1130000, "exponent": 0 }, { "currency": "usd", "amount": 4972, "exponent": 2 }] }, "payment_source_prices": {} } } }, { "id": "944037208325619722", "name": "Nitro 6 Month", "interval": 1, "interval_count": 6, "tax_inclusive": true, "sku_id": "521847234246082599", "currency": "usd", "price": 5499, "price_tier": null, "prices": { "0": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 5499, "exponent": 2 }] }, "payment_source_prices": {} }, "1": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 5499, "exponent": 2 }] }, "payment_source_prices": {} }, "3": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 5499, "exponent": 2 }] }, "payment_source_prices": {} }, "4": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 5499, "exponent": 2 }] }, "payment_source_prices": {} } } }])
      } else if (url.includes('590663762298667008/subscription-plans')) {
        return res.send([{ "id": "944037355453415424", "name": "Server Boost 3 Month", "interval": 1, "interval_count": 3, "tax_inclusive": true, "sku_id": "590663762298667008", "currency": "usd", "price": 1427, "price_tier": null, "prices": { "0": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 1427, "exponent": 2 }] }, "payment_source_prices": {} }, "3": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 999, "exponent": 2 }] }, "payment_source_prices": {} }, "4": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 999, "exponent": 2 }] }, "payment_source_prices": {} } } }, { "id": "944037391444738048", "name": "Server Boost 6 Month", "interval": 1, "interval_count": 6, "tax_inclusive": true, "sku_id": "590663762298667008", "currency": "usd", "price": 2750, "price_tier": null, "prices": { "0": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 2750, "exponent": 2 }] }, "payment_source_prices": {} }, "3": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 1925, "exponent": 2 }] }, "payment_source_prices": {} }, "4": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "usd", "amount": 1925, "exponent": 2 }] }, "payment_source_prices": {} } } }, { "id": "590665532894740483", "name": "Server Boost Monthly", "interval": 1, "interval_count": 1, "tax_inclusive": true, "sku_id": "590663762298667008", "fallback_price": 499, "fallback_currency": "usd", "currency": "vnd", "price": 113409, "price_tier": null, "prices": { "0": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 113409, "exponent": 0 }, { "currency": "usd", "amount": 499, "exponent": 2 }] }, "payment_source_prices": {} }, "3": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 79386, "exponent": 0 }, { "currency": "usd", "amount": 349, "exponent": 2 }] }, "payment_source_prices": {} }, "4": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 79386, "exponent": 0 }, { "currency": "usd", "amount": 349, "exponent": 2 }] }, "payment_source_prices": {} } } }, { "id": "590665538238152709", "name": "Server Boost Yearly", "interval": 2, "interval_count": 1, "tax_inclusive": true, "sku_id": "590663762298667008", "fallback_price": 4999, "fallback_currency": "usd", "currency": "vnd", "price": 1136136, "price_tier": null, "prices": { "0": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 1136136, "exponent": 0 }, { "currency": "usd", "amount": 4999, "exponent": 2 }] }, "payment_source_prices": {} }, "3": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 795295, "exponent": 0 }, { "currency": "usd", "amount": 3499, "exponent": 2 }] }, "payment_source_prices": {} }, "4": { "country_prices": { "country_code": "VN", "prices": [{ "currency": "vnd", "amount": 795295, "exponent": 0 }, { "currency": "usd", "amount": 3499, "exponent": 2 }] }, "payment_source_prices": {} } } }])
      }
    }
    if (url.includes('billing/subscriptions')) {
      return res.send([])
    }
    if (url.includes('invites') && req.method.toUpperCase() == 'POST') {
      return res.status(401).send()
    }
    if (url.includes('auth/logout')) {
      return res.status(204).send()
    }
    const blacklist = [
      'entitlements/gifts',
      'outbound-promotions/codes',
      'experiments',
      'entitlements',
      'science',
      'affinities',
      'users/@me/harvest',
      'oauth2',
      'auth/',
      'applications/public',
      'notes'
    ].some(path => url.includes(path));
    if (blacklist) return res.status(404).send({
      message: 'Bot is not authorized to access this endpoint :))'
    });
    if (url.includes('api/download')) {
      return res.redirect('https://github.com/aiko-chan-ai/DiscordBotClient/releases');
    }
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
        'premium/subscription',
        'relationships',
        'messages/search',
        'store/published-listings/skus',
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
    else if (url.includes('/ask') || url.includes('/ack')) {
      return res.status(200).send({ token: null })
    }
    else if (url.includes('billing/country-code')) {
      return res.status(200).send({
        country_code: "VN"
      });
    } else if (url.includes('logout')) {
      return res.status(200).send();
    }
    else {
      return req.pipe(request("https://discord.com" + url)).pipe(res);
    }
}


app.all('/d/*', function (req, res) {
  const str = req.originalUrl;
  const trs = str.slice('\x32');
  (0, logger?.info || console.log)('URL Request', trs);
  let headers = {
    'user-agent': 'DiscordBot (https://nodejs.org, 16.0.0)',
    authorization: `${req.headers.authorization}`,
  }
  Object.keys(req.headers).forEach(key => {
    if ([
      'cookie',
      'x-',
      'sec-',
      'referer',
      'origin',
      'authorization',
      'user-agent',
    ].some(prefix => key.toLowerCase().startsWith(prefix))) {
      return;
    } else {
      headers[key] = req.headers[key];
    }
  });
  req.headers = headers;
  handlerRequest(trs, req, res);
});
app.all('/sticker*', function (req, res) {
  const str = req.originalUrl;
  const trs = str;
  req.pipe(request("https://discord.com" + trs)).pipe(res);
});
app.all('/asset*', function (req, res) {
  const str = req.originalUrl;
  const trs = str;
  (0, logger?.info || console.log)('Require Assets:', trs);
  if (patchList.some(patch => trs.endsWith(`${patch}.js`))) {
    res.set('Cache-Control', 'no-store');
    (0, logger?.info || console.log)('Load script target', trs);
    return res.send(scriptTarget[trs.replace('/assets/', '').replace('.js', '')]);
  }
  req.pipe(request("https://discord.com" + trs)).pipe(res);
});
// Some request ...
app.all('/oauth2/authorize', (req, res) => {
  res.redirect('/app')
});

app.all('/developers/*', (req, res) => {
  if (req.originalUrl.includes('developers/docs/intro')) {
    return res.redirect('https://discord.com/developers/docs/intro');
  } else {
    return res.redirect('/app');
  }
});

app.all("*", (req, res) => {
  res.send(html);
});

// Catch unhandled promise rejections
process.on('unhandledRejection', (err) => {
  (0, logger?.error || console.error)(err);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  (0, logger?.error || console.error)(err);
});

async function start(port, log_) {
  if (!logger) logger = log_;
  if (!html) {
    html = await getData('https://raw.githubusercontent.com/aiko-chan-ai/DiscordBotClient/main/404.html')
  }
  if (!Object.keys(scriptTarget).length) {
    await Promise.all(patchList.map(async script => {
      scriptTarget[script] = await getData(`https://raw.githubusercontent.com/aiko-chan-ai/DiscordBotClient/main/script/${script}.js`)
    }));
  }
  return new Promise((resolve, reject) => {
    http.createServer(httpsOptions, app)
      .listen(port, () => {
        resolve(port);
        (0, logger?.info || console.log)(`Server is running on port ${port}`);
      }).once('error', (err) => {
        resolve(start(port + 1, log_));
      });
  });
}

module.exports = start;