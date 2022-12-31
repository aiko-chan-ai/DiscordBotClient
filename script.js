var dbcloginurl = "aikodbc.github.io"

var extraInfoSpecRequest = ["blocking", "requestHeaders"];
var extraInfoSpecResponse = ["blocking", "responseHeaders"];

if (typeof chrome !== "undefined") {
	if (typeof browser !== "undefined") {
		var fir = true;
		var chr = false;
	} else {
		var fir = false;
		var chr = true;
	}
}

if (chr) extraInfoSpecRequest.push("extraHeaders") && extraInfoSpecResponse.push("extraHeaders");

function handlerStore(details) {
	const url = details.url;
	if (url.includes('store/published-listings/skus/')) {
		if (url.includes('978380684370378762/subscription-plans')) {
			return { redirectUrl: 'https://aikodbc.github.io/store/978380684370378762.json' }
		} else if (url.includes('521842865731534868/subscription-plans')) {
			return { redirectUrl: 'https://aikodbc.github.io/store/521842865731534868.json' }
		} else if (url.includes('521846918637420545/subscription-plans')) {
			return { redirectUrl: 'https://aikodbc.github.io/store/521846918637420545.json' }
		} else if (url.includes('521847234246082599/subscription-plans')) {
			return { redirectUrl: 'https://aikodbc.github.io/store/521847234246082599.json' }
		} else if (url.includes('590663762298667008/subscription-plans')) {
			return { redirectUrl: 'https://aikodbc.github.io/store/590663762298667008.json' }
		}
	} else {
		return;
	}
}

function handlerAssets(details) {
	if (!details.url.includes('/assets/')) return;
	console.log('assets', details.url.split('/assets/')[1])
	if (details.url.includes('02be0d5b4681a76d9def.js') || details.url.includes('087faa3fe576396cad3c.js')) {
		return { redirectUrl: `https://aikodbc.github.io/assets/${details.url.split('/assets/')[1]}` }
	} else {
		return { redirectUrl: `https://discord.com/assets/${details.url.split('/assets/')[1]}` }
	}
}

function handlerAPI(details) {
	if (!details.url.includes('/api/v9')) return;
	const url = `/api/v9${details.url.split('/api/v9')[1]}`
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
	if (blacklist) return { cancel: true };
	if (url.includes('api/download')) {
		return { redirectUrl: 'https://github.com/aiko-chan-ai/DiscordBotClient/releases' };
	}
	if (url.includes('billing/country-code')) {
		return { redirectUrl: 'https://aikodbc.github.io/billingcode.json' };
	}
	if (url.includes('logout')) {
		return { redirectUrl: 'https://aikodbc.github.io/empty' };
	}
	else if (url.includes('/ask') || url.includes('/ack')) {
		return { redirectUrl: 'https://aikodbc.github.io/ack.json' }
	}
	if (
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
		return { redirectUrl: 'https://aikodbc.github.io/emptyarray.json' }
	} else if (
		url.includes('settings-proto') ||
		url.includes('users/@me/settings') ||
		url.includes('billing/subscriptions')
	) {
		return { redirectUrl: 'https://aikodbc.github.io/emptyobject.json' }
	}
	if (url.includes('application-commands/search')) {
		return { redirectUrl: 'https://aikodbc.github.io/application-commands/search.json' }
	}
	if (url.includes('/profile')) {
		return { redirectUrl: 'https://aikodbc.github.io/profile.json' };
	}
}

chrome.webRequest.onBeforeRequest.addListener(function (details) {
	if (chr) if (details.initiator !== "https://" + dbcloginurl) return;
	if (fir) if (!details.originUrl.includes(dbcloginurl)) return;
	if (!details.url.includes(dbcloginurl)) return;
	console.log(details.method, details.url, details.requestHeaders);
	let r = handlerStore(details) || handlerAssets(details) || handlerAPI(details);
	if (r) return r;
}, {
	urls: ["<all_urls>"],
},
["blocking"]);

chrome.webRequest.onBeforeSendHeaders.addListener(
	function (details) {
		if (chr) if (details.initiator !== "https://" + dbcloginurl) return;
		if (fir) if (!details.originUrl.includes(dbcloginurl)) return;
		if (details.url.includes('https://discord.com/assets')) {
			details.requestHeaders = [
				{
					name: 'User-Agent',
					value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
				},
				{
					name: 'Origin',
					value: 'https://discord.com'
				},
				{
					name: 'Referer',
					value: 'https://discord.com'
				}
			]
			console.log('Discord Asset Request', details.requestHeaders);
			return { requestHeaders: details.requestHeaders };
		} else if (details.url.includes('https://discord.com/api')) {
			console.log('Discord API Request', details);
			const arr = [
				'cookie',
				'x-',
				'sec-',
				'referer',
				'user-agent',
			]
			let requestHeaders = details.requestHeaders?.filter((x) => {
				let name = x.name.toLowerCase()
				return !arr.some(a => name.startsWith(a))
			});

			let header = details.requestHeaders.find((e) => e.name.toLowerCase() === "origin");
			if (header) header.value = "https://discord.com";
			else details.requestHeaders.push({ name: "Origin", value: "https://discord.com" });

			requestHeaders.push({ name: "User-Agent", value: 'DiscordBot (https://nodejs.org, 16.0.0)' });

			console.log(
				"Request",
				requestHeaders,
			)

			return { requestHeaders: requestHeaders };
		}
	},
	{
		urls: ["<all_urls>"],
	},
	extraInfoSpecRequest
);


chrome.webRequest.onHeadersReceived.addListener(
	(details) => {
		if (chr) if (details.initiator !== "https://" + dbcloginurl) return;
		if (fir) if (!details.originUrl.includes(dbcloginurl)) return;
		let header = details.responseHeaders.find((e) => e.name.toLowerCase() === "access-control-allow-origin");
		if (header) header.value = "*";
		else details.responseHeaders.push({ name: "Access-Control-Allow-Origin", value: "*" });
		console.log('Discord API Response', details, details.responseHeaders);
		return { responseHeaders: details.responseHeaders };
	},
	{
		urls: ["<all_urls>"],
	},
	extraInfoSpecResponse
);
