// Def
var allShards = 0,
	lasestGuildIdVoiceConnect = 0,
	currentShard = 0;
// Bitfield
class BitField {
	constructor(bits = this.constructor.defaultBit) {
		this.bitfield = this.constructor.resolve(bits);
	}
	any(bit) {
		return (
			(this.bitfield & this.constructor.resolve(bit)) !==
			this.constructor.defaultBit
		);
	}
	equals(bit) {
		return this.bitfield === this.constructor.resolve(bit);
	}
	has(bit) {
		bit = this.constructor.resolve(bit);
		return (this.bitfield & bit) === bit;
	}
	missing(bits, ...hasParams) {
		return new this.constructor(bits).remove(this).toArray(...hasParams);
	}
	freeze() {
		return Object.freeze(this);
	}
	add(...bits) {
		let total = this.constructor.defaultBit;
		for (const bit of bits) {
			total |= this.constructor.resolve(bit);
		}
		if (Object.isFrozen(this))
			return new this.constructor(this.bitfield | total);
		this.bitfield |= total;
		return this;
	}
	remove(...bits) {
		let total = this.constructor.defaultBit;
		for (const bit of bits) {
			total |= this.constructor.resolve(bit);
		}
		if (Object.isFrozen(this))
			return new this.constructor(this.bitfield & ~total);
		this.bitfield &= ~total;
		return this;
	}
	serialize(...hasParams) {
		const serialized = {};
		for (const [flag, bit] of Object.entries(this.constructor.FLAGS))
			serialized[flag] = this.has(bit, ...hasParams);
		return serialized;
	}
	toArray(...hasParams) {
		return Object.keys(this.constructor.FLAGS).filter((bit) =>
			this.has(bit, ...hasParams),
		);
	}
	toJSON() {
		return typeof this.bitfield === 'number'
			? this.bitfield
			: this.bitfield.toString();
	}
	valueOf() {
		return this.bitfield;
	}
	*[Symbol.iterator]() {
		yield* this.toArray();
	}
	static resolve(bit) {
		const { defaultBit } = this;
		if (typeof defaultBit === typeof bit && bit >= defaultBit) return bit;
		if (bit instanceof BitField) return bit.bitfield;
		if (Array.isArray(bit))
			return bit
				.map((p) => this.resolve(p))
				.reduce((prev, p) => prev | p, defaultBit);
		if (typeof bit === 'string') {
			if (typeof this.FLAGS[bit] !== 'undefined') return this.FLAGS[bit];
			if (!isNaN(bit))
				return typeof defaultBit === 'bigint'
					? BigInt(bit)
					: Number(bit);
		}
		throw new RangeError('BITFIELD_INVALID', bit);
	}
}
BitField.FLAGS = {};
BitField.defaultBit = 0;
// Intents
const IntentFlags = {
	GUILDS: 1 << 0,
	GUILD_MEMBERS: 1 << 1,
	GUILD_BANS: 1 << 2,
	GUILD_EMOJIS_AND_STICKERS: 1 << 3,
	GUILD_INTEGRATIONS: 1 << 4,
	GUILD_WEBHOOKS: 1 << 5,
	GUILD_INVITES: 1 << 6,
	GUILD_VOICE_STATES: 1 << 7,
	GUILD_PRESENCES: 1 << 8,
	GUILD_MESSAGES: 1 << 9,
	GUILD_MESSAGE_REACTIONS: 1 << 10,
	GUILD_MESSAGE_TYPING: 1 << 11,
	DIRECT_MESSAGES: 1 << 12,
	DIRECT_MESSAGE_REACTIONS: 1 << 13,
	DIRECT_MESSAGE_TYPING: 1 << 14,
	MESSAGE_CONTENT: 1 << 15,
	GUILD_SCHEDULED_EVENTS: 1 << 16,
	AUTO_MODERATION_CONFIGURATION: 1 << 20,
	AUTO_MODERATION_EXECUTION: 1 << 21,
	// https://discord.com/developers/docs/topics/gateway#list-of-intents
};
class Intents extends BitField {}
Intents.FLAGS = IntentFlags;
const getIntents = (...removeIntents) =>
	Object.values(IntentFlags).reduce((a, b) => a + b) -
	(removeIntents
		.flat(2)
		.map((name) => IntentFlags[name] || 0)
		.reduce((a, b) => a + b, 0) || 0);
// Permissions
const VIEW_CHANNEL_PERMISSION = 1024n;
function checkBitfield(permission) {
	return (permission & VIEW_CHANNEL_PERMISSION) === VIEW_CHANNEL_PERMISSION;
}
function checkUserPermission(guild, channel, user) {
	const permission = checkPermissionGuild(guild, channel, user);
	return permission.has('VIEW_CHANNEL');
}

class PermissionsDiscord extends BitField {
	missing(bits, checkAdmin = true) {
		return checkAdmin && this.has(this.constructor.FLAGS.ADMINISTRATOR)
			? []
			: super.missing(bits);
	}
	any(permission, checkAdmin = true) {
		return (
			(checkAdmin && super.has(this.constructor.FLAGS.ADMINISTRATOR)) ||
			super.any(permission)
		);
	}
	has(permission, checkAdmin = true) {
		return (
			(checkAdmin && super.has(this.constructor.FLAGS.ADMINISTRATOR)) ||
			super.has(permission)
		);
	}
	toArray() {
		return super.toArray(false);
	}
}
PermissionsDiscord.FLAGS = {};
Object.entries({
	CREATE_INSTANT_INVITE: '1',
	KICK_MEMBERS: '2',
	BAN_MEMBERS: '4',
	ADMINISTRATOR: '8',
	MANAGE_CHANNELS: '16',
	MANAGE_GUILD: '32',
	CHANGE_NICKNAME: '67108864',
	MANAGE_NICKNAMES: '134217728',
	MANAGE_ROLES: '268435456',
	MANAGE_WEBHOOKS: '536870912',
	MANAGE_GUILD_EXPRESSIONS: '1073741824',
	CREATE_GUILD_EXPRESSIONS: '8796093022208',
	VIEW_AUDIT_LOG: '128',
	VIEW_CHANNEL: '1024',
	VIEW_GUILD_ANALYTICS: '524288',
	VIEW_CREATOR_MONETIZATION_ANALYTICS: '2199023255552',
	MODERATE_MEMBERS: '1099511627776',
	USE_EMBEDDED_ACTIVITIES: '549755813888',
	SEND_MESSAGES: '2048',
	SEND_TTS_MESSAGES: '4096',
	MANAGE_MESSAGES: '8192',
	EMBED_LINKS: '16384',
	ATTACH_FILES: '32768',
	READ_MESSAGE_HISTORY: '65536',
	MENTION_EVERYONE: '131072',
	USE_EXTERNAL_EMOJIS: '262144',
	ADD_REACTIONS: '64',
	USE_APPLICATION_COMMANDS: '2147483648',
	MANAGE_THREADS: '17179869184',
	CREATE_PUBLIC_THREADS: '34359738368',
	CREATE_PRIVATE_THREADS: '68719476736',
	USE_EXTERNAL_STICKERS: '137438953472',
	SEND_MESSAGES_IN_THREADS: '274877906944',
	SEND_VOICE_MESSAGES: '70368744177664',
	USE_CLYDE_AI: '140737488355328',
	CONNECT: '1048576',
	SPEAK: '2097152',
	MUTE_MEMBERS: '4194304',
	DEAFEN_MEMBERS: '8388608',
	MOVE_MEMBERS: '16777216',
	USE_VAD: '33554432',
	PRIORITY_SPEAKER: '256',
	STREAM: '512',
	USE_SOUNDBOARD: '4398046511104',
	USE_EXTERNAL_SOUNDS: '35184372088832',
	SET_VOICE_CHANNEL_STATUS: '281474976710656',
	REQUEST_TO_SPEAK: '4294967296',
	MANAGE_EVENTS: '8589934592',
	CREATE_EVENTS: '17592186044416',
}).forEach(([k, v]) => (PermissionsDiscord.FLAGS[k] = BigInt(v)));
// Object.entries(Vencord.Webpack.Common.PermissionsBits).forEach(([k,v]) => a[k]=v)
PermissionsDiscord.ALL = Object.values(PermissionsDiscord.FLAGS).reduce(
	(all, p) => all | p,
	0n,
);
PermissionsDiscord.DEFAULT = BigInt(104324673);
PermissionsDiscord.defaultBit = BigInt(0);
// Discord.js Bitfield
function checkPermissionGuild(guild, channel, member) {
	if (guild.ownerId == (member?.user?.id || member.userId))
		return new PermissionsDiscord(PermissionsDiscord.ALL).freeze();
	const roles = Object.keys(guild.roles).filter(
		(r) => member.roles.includes(r) || r == guild.id,
	);
	const permissions = new PermissionsDiscord(
		roles.map((role) => guild.roles[role].permissions),
	);
	if (permissions.has(PermissionsDiscord.FLAGS.ADMINISTRATOR)) {
		return new PermissionsDiscord(PermissionsDiscord.ALL).freeze();
	}
	const overwrites = overwritesFor(member, roles, channel);
	return permissions
		.remove(overwrites.everyone?.deny ?? PermissionsDiscord.defaultBit)
		.add(overwrites.everyone?.allow ?? PermissionsDiscord.defaultBit)
		.remove(
			overwrites.roles.length > 0
				? overwrites.roles.map((role) => role.deny)
				: PermissionsDiscord.defaultBit,
		)
		.add(
			overwrites.roles.length > 0
				? overwrites.roles.map((role) => role.allow)
				: PermissionsDiscord.defaultBit,
		)
		.remove(overwrites.member?.deny ?? PermissionsDiscord.defaultBit)
		.add(overwrites.member?.allow ?? PermissionsDiscord.defaultBit)
		.freeze();
}

function overwritesFor(member, roles, channel) {
	if (!member) return [];
	const roleOverwrites = [];
	let memberOverwrites;
	let everyoneOverwrites;

	for (const overwrite of Object.values(channel.permissionOverwrites)) {
		if (overwrite.id === channel.guild_id) {
			everyoneOverwrites = overwrite;
		} else if (roles.includes(overwrite.id)) {
			roleOverwrites.push(overwrite);
		} else if (overwrite.id === (member?.user?.id || member.userId)) {
			memberOverwrites = overwrite;
		}
	}

	return {
		everyone: everyoneOverwrites,
		roles: roleOverwrites,
		member: memberOverwrites,
	};
}
// Replace Login Screen
var i;
function recreateNode(el) {
	el.parentNode.replaceChild(el.cloneNode(true), el);
	return document.getElementsByClassName(el.className)[0];
}
function getElementByXpath(path) {
	return document.evaluate(
		path,
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null,
	).singleNodeValue;
}
function replaceLoginScreen() {
	let buttonLogin = document.querySelector(
		'#app-mount > div.appAsidePanelWrapper__714a6 > div.notAppAsidePanel__9d124 > div.app_b1f720 > div > div > div > div > form > div.centeringWrapper__319b0 > div > div.mainLoginContainer__58502 > div.block__8bc50.marginTop20_d88ee7 > button.marginBottom8_f4aae3.button__47891.button_afdfd9.lookFilled__19298.colorBrand_b2253e.sizeLarge__9049d.fullWidth__7c3e8.grow__4c8a4',
	);
	if (buttonLogin) {
		clearInterval(i);
		buttonLogin = recreateNode(buttonLogin);
		buttonLogin.addEventListener('click', () => {
			const input = document.querySelectorAll(
				'[class*="inputDefault"]',
			)[0];
			Vencord.Webpack.findByProps('loginToken').loginToken(input.value);
		});
		const email = document.querySelector(
			'#app-mount > div.appAsidePanelWrapper__714a6 > div.notAppAsidePanel__9d124 > div.app_b1f720 > div > div > div > div > form > div.centeringWrapper__319b0 > div > div.mainLoginContainer__58502 > div.block__8bc50.marginTop20_d88ee7 > div.marginBottom20__64605',
		);
		email.parentElement.removeChild(email);
		const input_ = document.querySelector('#\\:r2\\:');
		if (!input_) return;
		input_.innerHTML = `Bot Token`;
		input_.id = 'token';
		const QR = document.querySelector(
			'#app-mount > div.appAsidePanelWrapper__714a6 > div.notAppAsidePanel__9d124 > div.app_b1f720 > div > div > div > div > form > div.centeringWrapper__319b0 > div > div.transitionGroup__9763d.qrLogin_ce8b2d',
		);
		QR.parentElement.removeChild(QR);
		const dot = document.querySelector(
			'#app-mount > div.appAsidePanelWrapper__714a6 > div.notAppAsidePanel__9d124 > div.app_b1f720 > div > div > div > div > form > div.centeringWrapper__319b0 > div > div.verticalSeparator_af74b3',
		);
		dot.parentElement.removeChild(dot);
		const need_an_acc = document.querySelector(
			'#app-mount > div.appAsidePanelWrapper__714a6 > div.notAppAsidePanel__9d124 > div.app_b1f720 > div > div > div > div > form > div.centeringWrapper__319b0 > div > div > div.block__8bc50.marginTop20_d88ee7 > div.marginTop4__3faba > span',
		);
		need_an_acc.innerHTML = 'Need a bot?';
		let reg = document.querySelector(
			'#app-mount > div.appAsidePanelWrapper__714a6 > div.notAppAsidePanel__9d124 > div.app_b1f720 > div > div > div > div > form > div.centeringWrapper__319b0 > div > div > div.block__8bc50.marginTop20_d88ee7 > div.marginTop4__3faba > button',
		);
		reg.innerHTML = 'Create one here';
		reg = recreateNode(reg);
		reg.addEventListener('click', () => {
			window.open('https://discord.com/developers/applications');
		});
		let forgot_pw = document.querySelector(
			'#app-mount > div.appAsidePanelWrapper__714a6 > div.notAppAsidePanel__9d124 > div.app_b1f720 > div > div > div > div > form > div.centeringWrapper__319b0 > div > div > div.block__8bc50.marginTop20_d88ee7 > button.marginBottom20__64605.marginTop4__3faba.linkButton_ba7970.button_afdfd9.lookLink__93965.lowSaturationUnderline__95e71.colorLink_b651e5.sizeMin__94642.grow__4c8a4',
		);
		forgot_pw.innerHTML = '';
	}
}
i = setInterval(() => {
	if (!window.Vencord) {
		return;
	}
	replaceLoginScreen();
}, 250);
// Vencord
function showToast(message, type, { position, timeout } = {}) {
	Vencord.Webpack.Common.Toasts.show({
		message,
		id: (Math.random() || Math.random()).toString(36).slice(2),
		type,
		options: {
			timeout,
			position,
		},
	});
}
function fetchChannel(channelId) {
	return new Promise((resolve, reject) => {
		Vencord.Webpack.findByProps('getAPIBaseURL')
			.get({
				url: `/channels/${channelId}`,
			})
			.then((d) => resolve(d.body))
			.catch(() => reject(false));
	});
}
function getThreadMembers(threadId) {
	return new Promise((resolve) => {
		Vencord.Webpack.findByProps('getAPIBaseURL')
			.get({
				url: `/channels/${threadId}/thread-members?with_member=true`,
			})
			.then((d) => resolve(d.body))
			.catch(() => resolve([]));
	});
}