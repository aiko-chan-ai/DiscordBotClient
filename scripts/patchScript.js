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