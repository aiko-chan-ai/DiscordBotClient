const express = require("express");
const fs = require("fs");
const path = require("path");
const request = require("request");
const axios = require("axios");

const port = 2022;

const app = express();


const indexHTML = fs.readFileSync(path.join(__dirname, "404.html"), { encoding: "utf8" });
const html = indexHTML;
const handlerRequest = (url, bot, req, res) => {
    if (bot == true) {
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
            return res.send({})
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
app.all('/assets*', function (req, res) {
    const str = req.originalUrl;
    const trs = str;
    console.log('Require Assets:', trs);
    const patchList = [
        '02be0d5b4681a76d9def.js',
        '087faa3fe576396cad3c.js',
    ]
    if (patchList.some(patch => trs.endsWith(patch))) {
        res.set('Cache-Control', 'no-store');
        console.log('Load script target', trs);
        return res.send(fs.readFileSync(path.resolve(__dirname, 'script', trs.replace('/assets/', '')), { encoding: 'utf8' }));
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

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});

// Catch unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(err);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error(err);
});
