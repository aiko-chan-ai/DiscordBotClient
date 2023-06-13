// Vencord 3680c26
// Standalone: true
// Platform: Universal
'use strict';
var Vencord = (() => {
	var iT = Object.create;
	var Gr = Object.defineProperty;
	var rT = Object.getOwnPropertyDescriptor;
	var sT = Object.getOwnPropertyNames;
	var aT = Object.getPrototypeOf,
		lT = Object.prototype.hasOwnProperty;
	var cf = ((e) =>
		typeof require < 'u'
			? require
			: typeof Proxy < 'u'
			? new Proxy(e, {
					get: (t, n) => (typeof require < 'u' ? require : t)[n],
			  })
			: e)(function (e) {
		if (typeof require < 'u') return require.apply(this, arguments);
		throw new Error('Dynamic require of "' + e + '" is not supported');
	});
	var m = (e, t) => () => (e && (t = e((e = 0))), t);
	var Mi = (e, t) => () => (
			t || e((t = { exports: {} }).exports, t), t.exports
		),
		me = (e, t) => {
			for (var n in t) Gr(e, n, { get: t[n], enumerable: !0 });
		},
		uf = (e, t, n, i) => {
			if ((t && typeof t == 'object') || typeof t == 'function')
				for (let r of sT(t))
					!lT.call(e, r) &&
						r !== n &&
						Gr(e, r, {
							get: () => t[r],
							enumerable: !(i = rT(t, r)) || i.enumerable,
						});
			return e;
		};
	var Wa = (e, t, n) => (
			(n = e != null ? iT(aT(e)) : {}),
			uf(
				t || !e || !e.__esModule
					? Gr(n, 'default', { value: e, enumerable: !0 })
					: n,
				e,
			)
		),
		Mo = (e) => uf(Gr({}, '__esModule', { value: !0 }), e);
	var d,
		o,
		a = m(() => {
			'use strict';
			(d = Symbol.for('react.fragment')),
				(o = (...e) =>
					(o = Vencord.Webpack.Common.React.createElement)(...e));
		});
	var Mn = {};
	me(Mn, {
		clear: () => mT,
		createStore: () => df,
		del: () => pT,
		delMany: () => dT,
		entries: () => hT,
		get: () => Qe,
		getMany: () => uT,
		keys: () => fT,
		promisifyRequest: () => gt,
		set: () => Ve,
		setMany: () => cT,
		update: () => qo,
		values: () => gT,
	});
	function gt(e) {
		return new Promise((t, n) => {
			(e.oncomplete = e.onsuccess = () => t(e.result)),
				(e.onabort = e.onerror = () => n(e.error));
		});
	}
	function df(e, t) {
		let n = indexedDB.open(e);
		n.onupgradeneeded = () => n.result.createObjectStore(t);
		let i = gt(n);
		return (r, s) => i.then((l) => s(l.transaction(t, r).objectStore(t)));
	}
	function nn() {
		return qa || (qa = df('VencordData', 'VencordStore')), qa;
	}
	function Qe(e, t = nn()) {
		return t('readonly', (n) => gt(n.get(e)));
	}
	function Ve(e, t, n = nn()) {
		return n('readwrite', (i) => (i.put(t, e), gt(i.transaction)));
	}
	function cT(e, t = nn()) {
		return t(
			'readwrite',
			(n) => (e.forEach((i) => n.put(i[1], i[0])), gt(n.transaction)),
		);
	}
	function uT(e, t = nn()) {
		return t('readonly', (n) => Promise.all(e.map((i) => gt(n.get(i)))));
	}
	function qo(e, t, n = nn()) {
		return n(
			'readwrite',
			(i) =>
				new Promise((r, s) => {
					i.get(e).onsuccess = function () {
						try {
							i.put(t(this.result), e), r(gt(i.transaction));
						} catch (l) {
							s(l);
						}
					};
				}),
		);
	}
	function pT(e, t = nn()) {
		return t('readwrite', (n) => (n.delete(e), gt(n.transaction)));
	}
	function dT(e, t = nn()) {
		return t(
			'readwrite',
			(n) => (e.forEach((i) => n.delete(i)), gt(n.transaction)),
		);
	}
	function mT(e = nn()) {
		return e('readwrite', (t) => (t.clear(), gt(t.transaction)));
	}
	function Ka(e, t) {
		return (
			(e.openCursor().onsuccess = function () {
				!this.result || (t(this.result), this.result.continue());
			}),
			gt(e.transaction)
		);
	}
	function fT(e = nn()) {
		return e('readonly', (t) => {
			if (t.getAllKeys) return gt(t.getAllKeys());
			let n = [];
			return Ka(t, (i) => n.push(i.key)).then(() => n);
		});
	}
	function gT(e = nn()) {
		return e('readonly', (t) => {
			if (t.getAll) return gt(t.getAll());
			let n = [];
			return Ka(t, (i) => n.push(i.value)).then(() => n);
		});
	}
	function hT(e = nn()) {
		return e('readonly', (t) => {
			if (t.getAll && t.getAllKeys)
				return Promise.all([gt(t.getAllKeys()), gt(t.getAll())]).then(
					([i, r]) => i.map((s, l) => [s, r[l]]),
				);
			let n = [];
			return e('readonly', (i) =>
				Ka(i, (r) => n.push([r.key, r.value])).then(() => n),
			);
		});
	}
	var qa,
		Pn = m(() => {
			'use strict';
			a();
		});
	var Pi,
		Ya = m(() => {
			'use strict';
			a();
			Pi = class {
				set = new Set();
				get changeCount() {
					return this.set.size;
				}
				get hasChanges() {
					return this.changeCount > 0;
				}
				handleChange(t) {
					this.set.delete(t) || this.set.add(t);
				}
				add(t) {
					return this.set.add(t);
				}
				remove(t) {
					return this.set.delete(t);
				}
				getChanges() {
					return this.set.values();
				}
				map(t) {
					return [...this.getChanges()].map(t);
				}
			};
		});
	var on,
		Ii = m(() => {
			a();
			on = '3680c26';
		});
	var Hr,
		mf = m(() => {
			a();
			Hr = 'Vendicated/Vencord';
		});
	var zt,
		yT,
		Za,
		zr,
		p,
		Xa,
		w = m(() => {
			'use strict';
			a();
			Ii();
			mf();
			(zt = 'webpackChunkdiscord_app'),
				(yT = 'Vencord.Webpack.Common.React'),
				(Za = `Vencord/${on}${
					Hr ? ` (https://github.com/${Hr})` : ''
				}`),
				(zr = '1026515880080842772'),
				(p = Object.freeze({
					Ven: { name: 'Vendicated', id: 343383572805058560n },
					Arjix: { name: 'ArjixWasTaken', id: 674710789138939916n },
					Cyn: { name: 'Cynosphere', id: 150745989836308480n },
					Megu: { name: 'Megumin', id: 545581357812678656n },
					botato: { name: 'botato', id: 440990343899643943n },
					obscurity: { name: 'obscurity', id: 336678828233588736n },
					rushii: { name: 'rushii', id: 295190422244950017n },
					Glitch: { name: 'Glitchy', id: 269567451199569920n },
					Samu: { name: 'Samu', id: 702973430449832038n },
					Animal: { name: 'Animal', id: 118437263754395652n },
					MaiKokain: { name: 'Mai', id: 722647978577363026n },
					echo: { name: 'ECHO', id: 712639419785412668n },
					katlyn: { name: 'katlyn', id: 250322741406859265n },
					nea: { name: 'nea', id: 310702108997320705n },
					Nuckyz: { name: 'Nuckyz', id: 235834946571337729n },
					D3SOX: { name: 'D3SOX', id: 201052085641281538n },
					Nickyux: { name: 'Nickyux', id: 427146305651998721n },
					mantikafasi: {
						name: 'mantikafasi',
						id: 287555395151593473n,
					},
					Xinto: { name: 'Xinto', id: 423915768191647755n },
					JacobTm: { name: 'Jacob.Tm', id: 302872992097107991n },
					DustyAngel47: {
						name: 'DustyAngel47',
						id: 714583473804935238n,
					},
					BanTheNons: { name: 'BanTheNons', id: 460478012794863637n },
					BigDuck: { name: 'BigDuck', id: 1024588272623681609n },
					AverageReactEnjoyer: {
						name: 'Average React Enjoyer',
						id: 1004904120056029256n,
					},
					adryd: { name: 'adryd', id: 0n },
					Tyman: { name: 'Tyman', id: 487443883127472129n },
					afn: { name: 'afn', id: 420043923822608384n },
					KraXen72: { name: 'KraXen72', id: 379304073515499530n },
					kemo: { name: 'kemo', id: 299693897859465228n },
					dzshn: { name: 'dzshn', id: 310449948011528192n },
					Ducko: { name: 'Ducko', id: 506482395269169153n },
					jewdev: { name: 'jewdev', id: 222369866529636353n },
					Luna: { name: 'Luny', id: 821472922140803112n },
					Vap: { name: 'Vap0r1ze', id: 454072114492866560n },
					KingFish: { name: 'King Fish', id: 499400512559382538n },
					Commandtechno: {
						name: 'Commandtechno',
						id: 296776625432035328n,
					},
					TheSun: { name: 'ActuallyTheSun', id: 406028027768733696n },
					axyie: { name: "'ax", id: 273562710745284628n },
					pointy: { name: 'pointy', id: 99914384989519872n },
					SammCheese: {
						name: 'Samm-Cheese',
						id: 372148345894076416n,
					},
					zt: { name: 'zt', id: 289556910426816513n },
					captain: { name: 'Captain', id: 347366054806159360n },
					nick: { name: 'nick', id: 347884694408265729n, badge: !1 },
					whqwert: { name: 'whqwert', id: 586239091520176128n },
					lewisakura: { name: 'lewisakura', id: 96269247411400704n },
					RuiNtD: { name: 'RuiNtD', id: 157917665162297344n },
					hunt: { name: 'hunt-g', id: 222800179697287168n },
					cloudburst: { name: 'cloudburst', id: 892128204150685769n },
					Aria: { name: 'Syncxv', id: 549244932213309442n },
					TheKodeToad: {
						name: 'TheKodeToad',
						id: 706152404072267788n,
					},
					LordElias: { name: 'LordElias', id: 319460781567639554n },
					juby: { name: 'Juby210', id: 324622488644616195n },
					Alyxia: { name: 'Alyxia Sother', id: 952185386350829688n },
					Remty: { name: 'Remty', id: 335055032204656642n },
					skyevg: { name: 'skyevg', id: 1090310844283363348n },
					Dziurwa: { name: 'Dziurwa', id: 787017887877169173n },
					AutumnVN: { name: 'AutumnVN', id: 393694671383166998n },
					pylix: { name: 'pylix', id: 492949202121261067n },
					Tyler: { name: '\\\\GGTyler\\\\', id: 143117463788191746n },
					RyanCaoDev: { name: 'RyanCaoDev', id: 952235800110694471n },
					Strencher: { name: 'Strencher', id: 415849376598982656n },
					FieryFlames: { name: 'Fiery', id: 890228870559698955n },
					KannaDev: { name: 'Kanna', id: 317728561106518019n },
					carince: { name: 'carince', id: 818323528755314698n },
					PandaNinjas: {
						name: 'PandaNinjas',
						id: 455128749071925248n,
					},
					CatNoir: { name: 'CatNoir', id: 260371016348336128n },
					outfoxxed: { name: 'outfoxxed', id: 837425748435796060n },
					UwUDev: { name: 'UwU', id: 691413039156690994n },
					amia: { name: 'amia', id: 142007603549962240n },
					ImLvna: { name: 'Luna <3', id: 174200708818665472n },
                    // BotClient dev
					Elysia: { name: 'Elysia', id: 721746046543331449n },
				})),
				(Xa = (() =>
					Object.freeze(
						Object.fromEntries(
							Object.entries(p)
								.filter((e) => e[1].id !== 0n)
								.map(([e, t]) => [t.id, t]),
						),
					))());
		});
	function Ct(e, t = 300) {
		let n;
		return function (...i) {
			clearTimeout(n),
				(n = setTimeout(() => {
					e(...i);
				}, t));
		};
	}
	var Ko = m(() => {
		'use strict';
		a();
	});
	function On(e) {
		let t;
		return () => t ?? (t = e());
	}
	function ct(e) {
		let t = Object.assign(function () {}, {
			[ff]: void 0,
			[Wr]: () => (t[ff] ??= e()),
		});
		return new Proxy(t, jr);
	}
	var gf,
		jr,
		Wr,
		ff,
		rn = m(() => {
			'use strict';
			a();
			(gf = ['arguments', 'caller', 'prototype']),
				(jr = {}),
				(Wr = Symbol.for('vencord.lazy.get')),
				(ff = Symbol.for('vencord.lazy.cached'));
			for (let e of [
				'apply',
				'construct',
				'defineProperty',
				'deleteProperty',
				'get',
				'getOwnPropertyDescriptor',
				'getPrototypeOf',
				'has',
				'isExtensible',
				'ownKeys',
				'preventExtensions',
				'set',
				'setPrototypeOf',
			])
				jr[e] = (t, ...n) => Reflect[e](t[Wr](), ...n);
			jr.ownKeys = (e) => {
				let t = e[Wr](),
					n = Reflect.ownKeys(t);
				for (let i of gf) n.includes(i) || n.push(i);
				return n;
			};
			jr.getOwnPropertyDescriptor = (e, t) => {
				if (typeof t == 'string' && gf.includes(t))
					return Reflect.getOwnPropertyDescriptor(e, t);
				let n = Reflect.getOwnPropertyDescriptor(e[Wr](), t);
				return n && Object.defineProperty(e, t, n), n;
			};
		});
	var Z,
		Se = m(() => {
			'use strict';
			a();
			Z = class {
				constructor(t, n = 'white') {
					this.name = t;
					this.color = n;
				}
				static makeTitle(t, n) {
					return [
						'%c %c %s ',
						'',
						`background: ${t}; color: black; font-weight: bold; border-radius: 5px;`,
						n,
					];
				}
				_log(t, n, i, r = '') {
					console[t](
						`%c Vencord %c %c ${this.name} ${r}`,
						`background: ${n}; color: black; font-weight: bold; border-radius: 5px;`,
						'',
						`background: ${this.color}; color: black; font-weight: bold; border-radius: 5px;`,
						...i,
					);
				}
				log(...t) {
					this._log('log', '#a6d189', t);
				}
				info(...t) {
					this._log('info', '#a6d189', t);
				}
				error(...t) {
					this._log('error', '#e78284', t);
				}
				errorCustomFmt(t, ...n) {
					this._log('error', '#e78284', n, t);
				}
				warn(...t) {
					this._log('warn', '#e5c890', t);
				}
				debug(...t) {
					this._log('debug', '#eebebe', t);
				}
			};
		});
	var vT,
		sn,
		qr = m(() => {
			'use strict';
			a();
			Se();
			(vT = (e, t, n) => t), (sn = vT);
		});
	function Yr(e) {
		if (_n !== void 0) throw 'no.';
		(Ft = e.push([[Symbol('Vencord')], {}, (t) => t])),
			(_n = Ft.c),
			e.pop();
	}
	function Ce(e, t = !0) {
		return ct(() => ht(e, t));
	}
	function Yo(e, t = !0) {
		if (typeof e != 'function')
			throw new Error(
				'Invalid filter. Expected a function got ' + typeof e,
			);
		let n = [];
		for (let i in _n) {
			let r = _n[i];
			if (!!r?.exports) {
				if (e(r.exports)) n.push(r.exports);
				else if (typeof r.exports != 'object') continue;
				if (r.exports.default && e(r.exports.default))
					n.push(t ? r.exports.default : r.exports);
				else
					for (let s in r.exports)
						if (s.length <= 3) {
							let l = r.exports[s];
							l && e(l) && n.push(l);
						}
			}
		}
		return n;
	}
	function Ye(e, t) {
		return ct(() => yf(e, t));
	}
	function an(...e) {
		return ht(Y.byProps(...e));
	}
	function P(...e) {
		return Ce(Y.byProps(...e));
	}
	function He(...e) {
		return ht(Y.byCode(...e));
	}
	function ce(...e) {
		return Ce(Y.byCode(...e));
	}
	function ST(e) {
		return ht(Y.byStoreName(e));
	}
	function ue(e) {
		return Ce(Y.byStoreName(e));
	}
	function Ze(e, t) {
		if (typeof e == 'string') e = Y.byProps(e);
		else if (Array.isArray(e)) e = Y.byProps(...e);
		else if (typeof e != 'function')
			throw new Error(
				'filter must be a string, string[] or function, got ' +
					typeof e,
			);
		let [n, i] = ht(e, !0, !0);
		if (n) return void t(n, i);
		hf.set(e, t);
	}
	function bT(e) {
		Va.add(e);
	}
	function TT(e) {
		Va.delete(e);
	}
	function el(...e) {
		let t = {},
			n = Ft.m;
		e: for (let i in n) {
			let r = n[i].original ?? n[i],
				s = r.toString();
			for (let l of e)
				if (
					(typeof l == 'string' && !s.includes(l)) ||
					(l instanceof RegExp && !l.test(s))
				)
					continue e;
			t[i] = r;
		}
		return t;
	}
	function tl(e) {
		let t = Ft.m[e];
		if (!t) return null;
		let n = `
// [EXTRACTED] WebpackModule${e}
// WARNING: This module was extracted to be more easily readable.
//          This module is NOT ACTUALLY USED! This means putting breakpoints will have NO EFFECT!!

${t.toString()}
//# sourceURL=ExtractedWebpackModule${e}
`;
		return (0, eval)(n);
	}
	var Ja,
		Kr,
		Qa,
		Ft,
		_n,
		Y,
		hf,
		Va,
		ht,
		Ri,
		Zr,
		yf,
		_ = m(() => {
			'use strict';
			a();
			rn();
			Se();
			qr();
			(Ja = new Z('Webpack')),
				(Qa = new Promise((e) => (Kr = e))),
				(Y = {
					byProps: (...e) =>
						e.length === 1
							? (t) => t[e[0]] !== void 0
							: (t) => e.every((n) => t[n] !== void 0),
					byCode:
						(...e) =>
						(t) => {
							if (typeof t != 'function') return !1;
							let n = Function.prototype.toString.call(t);
							for (let i of e) if (!n.includes(i)) return !1;
							return !0;
						},
					byStoreName: (e) => (t) => t.constructor?.displayName === e,
				}),
				(hf = new Map()),
				(Va = new Set());
			ht = sn('find', function (t, n = !0, i = !1) {
				if (typeof t != 'function')
					throw new Error(
						'Invalid filter. Expected a function got ' + typeof t,
					);
				for (let r in _n) {
					let s = _n[r];
					if (!!s?.exports) {
						if (t(s.exports))
							return i ? [s.exports, Number(r)] : s.exports;
						if (typeof s.exports == 'object') {
							if (s.exports.default && t(s.exports.default)) {
								let l = n ? s.exports.default : s.exports;
								return i ? [l, Number(r)] : l;
							}
							for (let l in s.exports)
								if (l.length <= 3) {
									let c = s.exports[l];
									if (c && t(c))
										return i ? [c, Number(r)] : c;
								}
						}
					}
				}
				if (!i) {
					let r = new Error(
						"Didn't find module matching this filter",
					);
					Ja.warn(r);
				}
				return i ? [null, null] : null;
			});
			(Ri = sn('findBulk', function (...t) {
				if (!Array.isArray(t))
					throw new Error(
						'Invalid filters. Expected function[] got ' + typeof t,
					);
				let { length: n } = t;
				if (n === 0) throw new Error('Expected at least two filters.');
				if (n === 1) return ht(t[0]);
				let i = t,
					r = 0,
					s = Array(n);
				e: for (let l in _n) {
					let c = _n[l];
					if (!!c?.exports)
						for (let u = 0; u < n; u++) {
							let h = i[u];
							if (h !== void 0) {
								if (h(c.exports)) {
									if (
										((s[u] = c.exports),
										(i[u] = void 0),
										++r === n)
									)
										break e;
									break;
								}
								if (typeof c.exports == 'object') {
									if (
										c.exports.default &&
										h(c.exports.default)
									) {
										if (
											((s[u] = c.exports.default),
											(i[u] = void 0),
											++r === n)
										)
											break e;
										break;
									}
									for (let f in c.exports)
										if (f.length <= 3) {
											let v = c.exports[f];
											if (v && h(v)) {
												if (
													((s[u] = v),
													(i[u] = void 0),
													++r === n)
												)
													break e;
												continue e;
											}
										}
								}
							}
						}
				}
				if (r !== n) {
					let l = new Error(
						`Got ${n} filters, but only found ${r} modules!`,
					);
					Ja.warn(l);
				}
				return s;
			})),
				(Zr = sn('findModuleId', function (t) {
					for (let i in Ft.m)
						if (Ft.m[i].toString().includes(t)) return Number(i);
					let n = new Error(
						`Didn't find module with code:
` + t,
					);
					return Ja.warn(n), null;
				})),
				(yf = sn('mapMangledModule', function (t, n) {
					let i = {},
						r = Zr(t);
					if (r === null) return i;
					let s = Ft(r);
					e: for (let l in s) {
						let c = s[l];
						for (let u in n)
							if (n[u](c)) {
								i[u] = c;
								continue e;
							}
					}
					return i;
				}));
		});
	function Po(e, t) {
		for (let n in t) {
			let i = t[n];
			typeof i == 'object' && !Array.isArray(i)
				? ((e[n] ??= {}), Po(e[n], i))
				: (e[n] ??= i);
		}
		return e;
	}
	function J(...e) {
		return e.filter(Boolean).join(' ');
	}
	function no(e) {
		return new Promise((t) => setTimeout(t, e));
	}
	function ln(e, t = 'Copied to clipboard!') {
		jt.SUPPORTS_COPY
			? jt.copy(e)
			: (t = 'Your browser does not support copying to clipboard'),
			Q.show({ message: t, id: Q.genId(), type: Q.Type.SUCCESS });
	}
	function wT(e) {
		return typeof e == 'object' && e !== null && !Array.isArray(e);
	}
	function nl(e) {
		try {
			return new URL(e);
		} catch {
			return null;
		}
	}
	function Xr(e) {
		return e;
	}
	var ol,
		MT,
		Ci,
		de = m(() => {
			'use strict';
			a();
			x();
			w();
			ol = (e) => {
				let t = e.getBoundingClientRect(),
					n = Math.max(
						document.documentElement.clientHeight,
						window.innerHeight,
					);
				return !(t.bottom < 0 || t.top - n >= 0);
			};
			(MT = navigator.userAgent.includes('Mobi')),
				(Ci = (e) => Object.hasOwn(Xa, e));
		});
	function ut(e, t) {
		let n = Object.assign(
				{ fallbackValue: null, deps: [], onError: null },
				t,
			),
			[i, r] = V({ value: n.fallbackValue, error: null, pending: !0 });
		return (
			tt(() => {
				let s = !0;
				return (
					i.pending || r({ ...i, pending: !0 }),
					e()
						.then((l) => {
							!s ||
								(r({ value: l, error: null, pending: !1 }),
								n.onSuccess?.(l));
						})
						.catch((l) => {
							!s ||
								(r({ value: null, error: l, pending: !1 }),
								n.onError?.(l));
						}),
					() => void (s = !1)
				);
			}, n.deps),
			[i.value, i.error, i.pending]
		);
	}
	function Bt(e) {
		let t = Zo((n) => n + 1, 0);
		return e ? t : t[1];
	}
	function oe(e) {
		let t = On(e);
		return (n) => {
			let i = t();
			return o(i, { ...n });
		};
	}
	var vf,
		ye = m(() => {
			'use strict';
			a();
			x();
			rn();
			de();
			vf = (e = !1) => {
				let t = I.useRef(null),
					[n, i] = V(!1);
				return [
					(s) => {
						t.current?.disconnect(),
							(t.current = null),
							s &&
								((ol(s) && (i(!0), e)) ||
									((t.current = new IntersectionObserver(
										(l) => {
											for (let c of l)
												c.target === s &&
													(c.isIntersecting && e
														? (i(!0),
														  t.current?.disconnect(),
														  (t.current = null))
														: i(c.isIntersecting));
										},
									)),
									t.current.observe(s)));
					},
					n,
				];
			};
		});
	function il(e, t) {
		let n = function () {
				throw new Error(`Vencord could not find the ${e} Component`);
			},
			i = oe(() => n);
		return (
			Ze(t, (r) => {
				(n = r), Object.assign(i, r);
			}),
			i
		);
	}
	function yt(e, t) {
		Ze(Y.byStoreName(e), t);
	}
	var rl = m(() => {
		'use strict';
		a();
		ye();
		_();
	});
	var y,
		At,
		R,
		Nt,
		W,
		Ne,
		Jr,
		q,
		$t,
		Qr,
		Io,
		Wt,
		Ai,
		Sf,
		bf,
		Vr,
		Ni,
		In,
		PT,
		pt,
		Tf = m(() => {
			'use strict';
			a();
			_();
			rl();
			(y = {}),
				(In = il(
					'Timestamp',
					Y.byCode(
						'.Messages.MESSAGE_EDITED_TIMESTAMP_A11Y_LABEL.format',
					),
				)),
				(PT = il('Flex', ['Justify', 'Align', 'Wrap'])),
				(pt = P('buttonWrapper', 'buttonContent'));
			Ze('FormItem', (e) => {
				({
					useToken: Ni,
					Card: At,
					Button: R,
					FormSwitch: Nt,
					Tooltip: W,
					TextInput: Ne,
					TextArea: Jr,
					Text: q,
					Select: $t,
					SearchableSelect: Qr,
					Slider: Io,
					ButtonLooks: Wt,
					TabBar: bf,
					Popout: Ai,
					Dialog: Sf,
					Paginator: Vr,
				} = e),
					(y = e);
			});
		});
	var F,
		Fn,
		xf = m(() => {
			'use strict';
			a();
			_();
			F = {};
			Ze('MenuItem', (e) => (F = e));
			Fn = Ye('type:"CONTEXT_MENU_OPEN"', {
				open: Y.byCode('stopPropagation'),
				openLazy: (e) => e.toString().length < 50,
				close: Y.byCode('CONTEXT_MENU_CLOSE'),
			});
		});
	var I,
		V,
		tt,
		Ut,
		qt,
		Zo,
		wf,
		Ro,
		Mf = m(() => {
			'use strict';
			a();
			_();
			Ro = P('createPortal', 'render');
			Ze('useState', (e) => {
				(I = e),
					({
						useEffect: tt,
						useState: V,
						useMemo: Ut,
						useRef: qt,
						useReducer: Zo,
						useCallback: wf,
					} = I);
			});
		});
	var sl,
		cn,
		al,
		et,
		es,
		ki,
		oo,
		IT,
		le,
		U,
		fe,
		Xo,
		X,
		ke,
		Kt,
		un,
		Li,
		ll,
		Be,
		Pf = m(() => {
			'use strict';
			a();
			_();
			rl();
			(sl = P('connectStores')),
				(al = P('openPrivateChannel')),
				(ll = Ye('"MaskedLinkStore"', {
					openUntrustedLink: Y.byCode('.apply(this,arguments)'),
				})),
				(Be = ce('useStateFromStores'));
			yt('UserStore', (e) => (U = e));
			yt('ChannelStore', (e) => (X = e));
			yt('SelectedChannelStore', (e) => (fe = e));
			yt('SelectedGuildStore', (e) => (Xo = e));
			yt('GuildStore', (e) => (le = e));
			yt('GuildMemberStore', (e) => (ke = e));
			yt('RelationshipStore', (e) => (Kt = e));
			yt('PermissionStore', (e) => (et = e));
			yt('PresenceStore', (e) => (oo = e));
			yt('ReadStateStore', (e) => (ki = e));
			yt('GuildChannelStore', (e) => (es = e));
			yt('MessageStore', (e) => (cn = e));
			yt('WindowStore', (e) => (Li = e));
			yt('EmojiStore', (e) => (un = e));
		});
	var If = {};
	var Rf = m(() => {
		'use strict';
		a();
	});
	var Cf = {};
	var Af = m(() => {
		'use strict';
		a();
	});
	var Nf = {};
	var kf = m(() => {
		'use strict';
		a();
	});
	var L,
		cl,
		Yt,
		Zt,
		Co,
		nt,
		Jo,
		Pe,
		vt,
		RT,
		CT,
		Q,
		Rn,
		jt,
		Ei,
		ts,
		io,
		Lf = m(() => {
			'use strict';
			a();
			_();
			(cl = Ce((e) => e.emitter?._events?.INSERT_TEXT)),
				(Yt = P('getAPIBaseURL', 'get')),
				(Zt = P('parseTwoDigitYear')),
				(Co = P('highlight')),
				(nt = Ce((e) => e.Messages?.['en-US']));
			Ze(['fromTimestamp', 'extractTimestamp'], (e) => (Jo = e));
			(RT = { MESSAGE: 0, SUCCESS: 1, FAILURE: 2, CUSTOM: 3 }),
				(CT = { TOP: 0, BOTTOM: 1 }),
				(Q = {
					Type: RT,
					Position: CT,
					genId: () =>
						(Math.random() || Math.random()).toString(36).slice(2),
				}),
				(Rn = { fetchUser: ce('.USER(', 'getUser') }),
				(jt = Ye(
					'document.queryCommandEnabled("copy")||document.queryCommandSupported("copy")',
					{
						copy: Y.byCode('.default.copy('),
						SUPPORTS_COPY: (e) => typeof e == 'boolean',
					},
				)),
				(Ei = Ye('transitionToGuild - ', {
					transitionTo: Y.byCode('transitionTo -'),
					transitionToGuild: Y.byCode('transitionToGuild -'),
					goBack: Y.byCode('goBack()'),
					goForward: Y.byCode('goForward()'),
				}));
			Ze(['dispatch', 'subscribe'], (e) => {
				L = e;
				let t = () => {
					e.unsubscribe('CONNECTION_OPEN', t), Kr();
				};
				e.subscribe('CONNECTION_OPEN', t);
			});
			Ze('showToast', (e) => {
				(Q.show = e.showToast), (Q.pop = e.popToast);
			});
			Ze(['show', 'close'], (e) => (vt = e));
			Ze('parseTopic', (e) => (Pe = e));
			Ze(['open', 'saveAccountChanges'], (e) => (ts = e));
			io = Ce((e) => typeof e.ADMINISTRATOR == 'bigint');
		});
	var ul = {};
	me(ul, {
		Alerts: () => vt,
		Button: () => R,
		ButtonLooks: () => Wt,
		ButtonWrapperClasses: () => pt,
		Card: () => At,
		ChannelStore: () => X,
		Clipboard: () => jt,
		ComponentDispatch: () => cl,
		ComponentTypes: () => If,
		ContextMenu: () => Fn,
		Dialog: () => Sf,
		EmojiStore: () => un,
		Flex: () => PT,
		Flux: () => sl,
		FluxDispatcher: () => L,
		Forms: () => y,
		GuildChannelStore: () => es,
		GuildMemberStore: () => ke,
		GuildStore: () => le,
		MaskedLinkStore: () => ll,
		Menu: () => F,
		MenuTypes: () => Cf,
		MessageStore: () => cn,
		NavigationRouter: () => Ei,
		Paginator: () => Vr,
		Parser: () => Pe,
		PermissionStore: () => et,
		PermissionsBits: () => io,
		PoggerModeSettingsStore: () => IT,
		Popout: () => Ai,
		PresenceStore: () => oo,
		PrivateChannelsStore: () => al,
		React: () => I,
		ReactDOM: () => Ro,
		ReadStateStore: () => ki,
		RelationshipStore: () => Kt,
		RestAPI: () => Yt,
		SearchableSelect: () => Qr,
		Select: () => $t,
		SelectedChannelStore: () => fe,
		SelectedGuildStore: () => Xo,
		SettingsRouter: () => ts,
		Slider: () => Io,
		SnowflakeUtils: () => Jo,
		Switch: () => Nt,
		TabBar: () => bf,
		Text: () => q,
		TextArea: () => Jr,
		TextInput: () => Ne,
		Timestamp: () => In,
		Toasts: () => Q,
		Tooltip: () => W,
		UserStore: () => U,
		UserUtils: () => Rn,
		UtilTypes: () => Nf,
		WindowStore: () => Li,
		hljs: () => Co,
		i18n: () => nt,
		moment: () => Zt,
		useCallback: () => wf,
		useEffect: () => tt,
		useMemo: () => Ut,
		useReducer: () => Zo,
		useRef: () => qt,
		useState: () => V,
		useStateFromStores: () => Be,
		useToken: () => Ni,
	});
	var x = m(() => {
		'use strict';
		a();
		Tf();
		xf();
		Mf();
		Pf();
		Rf();
		Af();
		kf();
		Lf();
	});
	function ns() {
		return X.getChannel(fe.getChannelId());
	}
	function pl() {
		return le.getGuild(ns()?.guild_id);
	}
	function kT(e) {
		al.openPrivateChannel(e);
	}
	function Di() {
		return AT.getCurrentValue()?.appearance?.theme;
	}
	function Bn(e) {
		cl.dispatchToLastSubscribed('INSERT_TEXT', {
			rawText: e,
			plainText: e,
		});
	}
	function LT(e, t, n, i) {
		let r = {
			content: '',
			invalidEmojis: [],
			tts: !1,
			validNonShortcutEmojis: [],
			...t,
		};
		return NT.sendMessage(e, r, n, i);
	}
	var AT,
		NT,
		os,
		$n = m(() => {
			'use strict';
			a();
			_();
			x();
			(AT = Ce((e) =>
				e.ProtoClass?.typeName.endsWith('PreloadedUserSettings'),
			)),
				(NT = P('editMessage', 'sendMessage'));
			os = ((n) => (
				(n[(n.Dark = 1)] = 'Dark'), (n[(n.Light = 2)] = 'Light'), n
			))(os || {});
		});
	function is(e) {
		return Boolean(e);
	}
	function ET(e) {
		return e != null;
	}
	var dl = m(() => {
		'use strict';
		a();
	});
	var Ao,
		rs = m(() => {
			'use strict';
			a();
			({ localStorage: Ao } = window);
		});
	var Ef,
		G,
		Xe = m(() => {
			'use strict';
			a();
			(Ef = ''), (G = {});
			for (let e of ['top', 'bottom', 'left', 'right'])
				for (let t of [8, 16, 20]) {
					let n = `vc-m-${e}-${t}`;
					(G[`${e}${t}`] = n), (Ef += `.${n}{margin-${e}:${t}px;}`);
				}
			document.addEventListener(
				'DOMContentLoaded',
				() =>
					document.head.append(
						Object.assign(document.createElement('style'), {
							textContent: Ef,
							id: 'vencord-margins',
						}),
					),
				{ once: !0 },
			);
		});
	function Oi(e, t) {
		return ss.openModalLazy(e, t);
	}
	function be(e, t, n) {
		return ss.openModal(e, t, n);
	}
	function Gn(e, t) {
		return ss.closeModal(e, t);
	}
	function ml() {
		return ss.closeAllModals();
	}
	var Un,
		pn,
		Ie,
		$e,
		Le,
		ot,
		St,
		ss,
		ze = m(() => {
			'use strict';
			a();
			_();
			ye();
			(Un = ((r) => (
				(r.SMALL = 'small'),
				(r.MEDIUM = 'medium'),
				(r.LARGE = 'large'),
				(r.DYNAMIC = 'dynamic'),
				r
			))(Un || {})),
				(pn = Ye('.closeWithCircleBackground', {
					ModalRoot: Y.byCode('.root'),
					ModalHeader: Y.byCode('.header'),
					ModalContent: Y.byCode('.content'),
					ModalFooter: Y.byCode('.footerSeparator'),
					ModalCloseButton: Y.byCode('.closeWithCircleBackground'),
				})),
				(Ie = oe(() => pn.ModalRoot)),
				($e = oe(() => pn.ModalHeader)),
				(Le = oe(() => pn.ModalContent)),
				(ot = oe(() => pn.ModalFooter)),
				(St = oe(() => pn.ModalCloseButton)),
				(ss = Ye('onCloseRequest:null!=', {
					openModal: Y.byCode('onCloseRequest:null!='),
					closeModal: Y.byCode('onCloseCallback&&'),
					openModalLazy: (e) =>
						e?.length === 1 &&
						Y.byCode('.apply(this,arguments)')(e),
					closeAllModals: Y.byCode('.value.key,'),
				}));
		});
	function DT(e, t, n) {
		let i = t;
		if (t in e) return void n(e[i]);
		Object.defineProperty(e, t, {
			set(r) {
				delete e[i], (e[i] = r), n(r);
			},
			configurable: !0,
			enumerable: !1,
		});
	}
	var Df = m(() => {
		'use strict';
		a();
	});
	function fl(e) {
		let t = !1,
			n;
		return function () {
			return t ? n : ((t = !0), (n = e.apply(this, arguments)));
		};
	}
	var gl = m(() => {
		'use strict';
		a();
	});
	function No(e) {
		if (typeof e == 'string') return e;
		let t = e.source.replaceAll('\\i', '[A-Za-z_$][\\w$]*');
		return new RegExp(t, e.flags);
	}
	function as(e, t) {
		let n = `Vencord.Plugins.plugins[${JSON.stringify(t)}]`;
		return typeof e != 'function'
			? e.replaceAll('$self', n)
			: (...i) => e(...i).replaceAll('$self', n);
	}
	function hl(e, t) {
		if (e.get) {
			let n = e.get;
			e.get = function () {
				return t(n.call(this));
			};
		} else e.value && (e.value = t(e.value));
		return e;
	}
	function _i(e, t) {
		let n = Object.getOwnPropertyDescriptors(e);
		(n.match = hl(n.match, No)),
			(n.replace = hl(n.replace, (i) => as(i, t))),
			Object.defineProperties(e, n);
	}
	var Fi = m(() => {
		'use strict';
		a();
	});
	var dn,
		Qo = m(() => {
			'use strict';
			a();
			dn = class {
				constructor(t = 1 / 0) {
					this.maxSize = t;
				}
				queue = [];
				promise;
				next() {
					let t = this.queue.shift();
					t
						? (this.promise = Promise.resolve()
								.then(t)
								.finally(() => this.next()))
						: (this.promise = void 0);
				}
				run() {
					this.promise || this.next();
				}
				push(t) {
					this.size >= this.maxSize && this.queue.shift(),
						this.queue.push(t),
						this.run();
				}
				unshift(t) {
					this.size >= this.maxSize && this.queue.pop(),
						this.queue.unshift(t),
						this.run();
				}
				get size() {
					return this.queue.length;
				}
			};
		});
	function Of(e, t, n) {
		return n === !1 ? (t ? e.slice(0, -1) : e) : e[0];
	}
	function Bi(e, t, n = !1) {
		let i = Zt.duration(e, t),
			r = zT.map((u) => ({ amount: i[u](), unit: u })),
			s = 0;
		e: for (let u = 0; u < r.length; u++)
			if (!(r[u].amount === 0 || !(u + 1 < r.length))) {
				for (let h = u + 1; h < r.length; h++)
					if (r[h].amount !== 0) continue e;
				s = r.length - (u + 1);
			}
		r = s === 0 ? r : r.slice(0, -s);
		let l = r.findIndex(({ unit: u }) => u === 'days');
		if (l !== -1) {
			let u = r[l],
				h = u.amount % 7;
			h === 0 ? r.splice(l, 1) : (u.amount = h);
		}
		let c = '';
		for (; r.length; ) {
			let { amount: u, unit: h } = r.shift();
			c.length && (c += r.length ? ', ' : ' and '),
				(u > 0 || c.length) && (c += `${u} ${Of(h, u === 1, n)}`);
		}
		return c.length ? c : `0 ${Of(t, !1, n)}`;
	}
	function jT(e, t = (n) => n) {
		let { length: n } = e;
		if (n === 0) return '';
		if (n === 1) return t(e[0]);
		let i = '';
		for (let r = 0; r < n; r++)
			(i += t(e[r])),
				n - r > 2 ? (i += ', ') : n - r > 1 && (i += ' and ');
		return i;
	}
	function $i(e, t) {
		let n = '```';
		return `${n}${t || ''}
${e.replaceAll('```', '\\`\\`\\`')}
${n}`;
	}
	var OT,
		_T,
		FT,
		yl,
		BT,
		$T,
		UT,
		GT,
		HT,
		ko,
		zT,
		ro = m(() => {
			'use strict';
			a();
			x();
			(OT = (e) => e.split(/(?=[A-Z])/).map((t) => t.toLowerCase())),
				(_T = (e) => e.toLowerCase().split('_')),
				(FT = (e) => e.toLowerCase().split('-')),
				(yl = (e) => e.split(/(?=[A-Z])/).map((t) => t.toLowerCase())),
				(BT = (e) => e.toLowerCase().split(' ')),
				($T = (e) =>
					e
						.map((t, n) =>
							n ? t[0].toUpperCase() + t.slice(1) : t,
						)
						.join('')),
				(UT = (e) => e.join('_').toUpperCase()),
				(GT = (e) => e.join('-').toLowerCase()),
				(HT = (e) =>
					e.map((t) => t[0].toUpperCase() + t.slice(1)).join('')),
				(ko = (e) =>
					e.map((t) => t[0].toUpperCase() + t.slice(1)).join(' ')),
				(zT = [
					'years',
					'months',
					'weeks',
					'days',
					'hours',
					'minutes',
					'seconds',
				]);
		});
	var vl = {};
	me(vl, {
		ChangeList: () => Pi,
		Devs: () => p,
		DevsById: () => Xa,
		Logger: () => Z,
		Margins: () => G,
		ModalCloseButton: () => St,
		ModalContent: () => Le,
		ModalFooter: () => ot,
		ModalHeader: () => $e,
		ModalRoot: () => Ie,
		ModalSize: () => Un,
		Modals: () => pn,
		Queue: () => dn,
		REACT_GLOBAL: () => yT,
		SUPPORT_CHANNEL_ID: () => zr,
		Theme: () => os,
		VENCORD_USER_AGENT: () => Za,
		WEBPACK_CHUNK: () => zt,
		canonicalizeDescriptor: () => hl,
		canonicalizeMatch: () => No,
		canonicalizeReplace: () => as,
		canonicalizeReplacement: () => _i,
		checkIntersecting: () => ol,
		classes: () => J,
		closeAllModals: () => ml,
		closeModal: () => Gn,
		copyWithToast: () => ln,
		debounce: () => Ct,
		formatDuration: () => Bi,
		getCurrentChannel: () => ns,
		getCurrentGuild: () => pl,
		getTheme: () => Di,
		gitHash: () => on,
		gitRemote: () => Hr,
		humanFriendlyJoin: () => jT,
		identity: () => Xr,
		insertTextIntoChatInputBox: () => Bn,
		isMobile: () => MT,
		isNonNullish: () => ET,
		isObject: () => wT,
		isPluginDev: () => Ci,
		isTruthy: () => is,
		localStorage: () => Ao,
		makeCodeblock: () => $i,
		makeLazy: () => On,
		mergeDefaults: () => Po,
		onceDefined: () => DT,
		onlyOnce: () => fl,
		openModal: () => be,
		openModalLazy: () => Oi,
		openPrivateChannel: () => kT,
		parseUrl: () => nl,
		proxyLazy: () => ct,
		sendMessage: () => LT,
		sleep: () => no,
		wordsFromCamel: () => OT,
		wordsFromKebab: () => FT,
		wordsFromPascal: () => yl,
		wordsFromSnake: () => _T,
		wordsFromTitle: () => BT,
		wordsToCamel: () => $T,
		wordsToKebab: () => GT,
		wordsToPascal: () => HT,
		wordsToSnake: () => UT,
		wordsToTitle: () => ko,
	});
	var Sl = m(() => {
		'use strict';
		a();
		Ya();
		w();
		Ko();
		$n();
		dl();
		rn();
		rs();
		Se();
		Xe();
		de();
		ze();
		Df();
		gl();
		Fi();
		Qo();
		ro();
	});
	var Bf = m(() => {});
	function Hn(e) {
		return o(
			'div',
			{ ...e, className: J(e.className, 'vc-error-card') },
			e.children,
		);
	}
	var Ui = m(() => {
		'use strict';
		a();
		Bf();
		de();
	});
	var KT,
		$f,
		Uf,
		bl,
		k,
		re = m(() => {
			'use strict';
			a();
			Se();
			Xe();
			ye();
			x();
			Ui();
			(KT = '#e78284'),
				($f = new Z('React ErrorBoundary', KT)),
				(Uf = {}),
				(bl = oe(
					() =>
						class extends I.PureComponent {
							state = { error: Uf, stack: '', message: '' };
							static getDerivedStateFromError(t) {
								let n = t?.stack ?? '',
									i = t?.message || String(t);
								if (t instanceof Error && n) {
									let r = n.indexOf(`
`);
									r !== -1 &&
										((i = n.slice(0, r)),
										(n = n
											.slice(r + 1)
											.replace(
												/https:\/\/\S+\/assets\//g,
												'',
											)));
								}
								return { error: t, stack: n, message: i };
							}
							componentDidCatch(t, n) {
								this.props.onError?.({
									error: t,
									errorInfo: n,
									props: this.props.wrappedProps,
								}),
									$f.error(
										`A component threw an Error
`,
										t,
									),
									$f.error(
										'Component Stack',
										n.componentStack,
									);
							}
							render() {
								if (this.state.error === Uf)
									return this.props.children;
								if (this.props.noop) return null;
								if (this.props.fallback)
									return o(this.props.fallback, {
										children: this.props.children,
										...this.state,
									});
								let t =
									this.props.message ||
									'An error occurred while rendering this Component. More info can be found below and in your console.';
								return o(
									Hn,
									{ style: { overflow: 'hidden' } },
									o('h1', null, 'Oh no!'),
									o('p', null, t),
									o(
										'code',
										null,
										this.state.message,
										!!this.state.stack &&
											o(
												'pre',
												{ className: G.top8 },
												this.state.stack,
											),
									),
								);
							}
						},
				));
			bl.wrap = (e, t) => (n) =>
				o(bl, { ...t, wrappedProps: n }, o(e, { ...n }));
			k = bl;
		});
	function g(e) {
		return e;
	}
	var T = m(() => {
		'use strict';
		a();
	});
	var Tl,
		Gf = m(() => {
			'use strict';
			a();
			w();
			T();
			Tl = g({
				name: 'AlwaysAnimate',
				description:
					'Animates anything that can be animated, besides status emojis.',
				authors: [p.FieryFlames],
				patches: [
					{
						find: '.canAnimate',
						all: !0,
						replacement: {
							match: /\.canAnimate\b/g,
							replace: '.canAnimate || true',
						},
					},
				],
			});
		});
	var xl,
		Hf = m(() => {
			'use strict';
			a();
			w();
			T();
			xl = g({
				name: 'AlwaysTrust',
				description:
					'Removes the annoying untrusted domain and suspicious file popup',
				authors: [p.zt],
				patches: [
					{
						find: '.displayName="MaskedLinkStore"',
						replacement: {
							match: /\.isTrustedDomain=function\(.\){return.+?};/,
							replace:
								'.isTrustedDomain=function(){return true};',
						},
					},
					{
						find: '"7z","ade","adp"',
						replacement: {
							match: /JSON\.parse\('\[.+?'\)/,
							replace: '[]',
						},
					},
				],
			});
		});
	var zf = m(() => {});
	var ls,
		wl = m(() => {
			'use strict';
			a();
			zf();
			E();
			re();
			de();
			x();
			ls = k.wrap(
				function ({
					title: t,
					body: n,
					richBody: i,
					color: r,
					icon: s,
					onClick: l,
					onClose: c,
					image: u,
					permanent: h,
					className: f,
					dismissOnClick: v,
				}) {
					let { timeout: S, position: b } = it([
							'notifications.timeout',
							'notifications.position',
						]).notifications,
						A = Be([Li], () => Li.isFocused()),
						[C, D] = V(!1),
						[B, O] = V(0),
						K = Ut(() => Date.now(), [S, C, A]);
					tt(() => {
						if (C || !A || S === 0 || h) return void O(0);
						let j = setInterval(() => {
							let z = Date.now() - K;
							z >= S ? c() : O(z);
						}, 10);
						return () => clearInterval(j);
					}, [S, C, A]);
					let ee = B / S;
					return o(
						'button',
						{
							className: J('vc-notification-root', f),
							style:
								b === 'bottom-right'
									? { bottom: '1rem' }
									: { top: '3rem' },
							onClick: () => {
								l?.(), v !== !1 && c();
							},
							onContextMenu: (j) => {
								j.preventDefault(), j.stopPropagation(), c();
							},
							onMouseEnter: () => D(!0),
							onMouseLeave: () => D(!1),
						},
						o(
							'div',
							{ className: 'vc-notification' },
							s &&
								o('img', {
									className: 'vc-notification-icon',
									src: s,
									alt: '',
								}),
							o(
								'div',
								{ className: 'vc-notification-content' },
								o(
									'div',
									{ className: 'vc-notification-header' },
									o(
										'h2',
										{ className: 'vc-notification-title' },
										t,
									),
									o(
										'button',
										{
											className:
												'vc-notification-close-btn',
											onClick: (j) => {
												j.preventDefault(),
													j.stopPropagation(),
													c();
											},
										},
										o(
											'svg',
											{
												width: '24',
												height: '24',
												viewBox: '0 0 24 24',
												role: 'img',
												'aria-labelledby':
													'vc-notification-dismiss-title',
											},
											o(
												'title',
												{
													id: 'vc-notification-dismiss-title',
												},
												'Dismiss Notification',
											),
											o('path', {
												fill: 'currentColor',
												d: 'M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z',
											}),
										),
									),
								),
								o(
									'div',
									null,
									i ??
										o(
											'p',
											{ className: 'vc-notification-p' },
											n,
										),
								),
							),
						),
						u &&
							o('img', {
								className: 'vc-notification-img',
								src: u,
								alt: '',
							}),
						S !== 0 &&
							!h &&
							o('div', {
								className: 'vc-notification-progressbar',
								style: {
									width: `${(1 - ee) * 100}%`,
									backgroundColor:
										r || 'var(--brand-experiment)',
								},
							}),
					);
				},
				{ onError: ({ props: e }) => e.onClose() },
			);
		});
	var Il = {};
	me(Il, {
		classNameFactory: () => Ue,
		classNameToSelector: () => Wf,
		compileStyle: () => Pl,
		disableStyle: () => bt,
		enableStyle: () => Je,
		isStyleEnabled: () => Ml,
		requireStyle: () => Gi,
		setStyleClassNames: () => ZT,
		styleMap: () => jf,
		toggleStyle: () => YT,
	});
	function Gi(e) {
		let t = jf.get(e);
		if (!t) throw new Error(`Style "${e}" does not exist`);
		return t;
	}
	function Je(e) {
		let t = Gi(e);
		return t.dom?.isConnected
			? !1
			: (t.dom ||
					((t.dom = document.createElement('style')),
					(t.dom.dataset.vencordName = t.name)),
			  Pl(t),
			  document.head.appendChild(t.dom),
			  !0);
	}
	function bt(e) {
		let t = Gi(e);
		return t.dom?.isConnected ? (t.dom.remove(), (t.dom = null), !0) : !1;
	}
	var jf,
		YT,
		Ml,
		ZT,
		Pl,
		Wf,
		Ue,
		je = m(() => {
			'use strict';
			a();
			jf = window.VencordStyles ??= new Map();
			(YT = (e) => (Ml(e) ? bt(e) : Je(e))),
				(Ml = (e) => Gi(e).dom?.isConnected ?? !1),
				(ZT = (e, t, n = !0) => {
					let i = Gi(e);
					(i.classNames = t), n && Ml(i.name) && Pl(i);
				}),
				(Pl = (e) => {
					if (!e.dom) throw new Error('Style has no DOM element');
					e.dom.textContent = e.source.replace(
						/\[--(\w+)\]/g,
						(t, n) => {
							let i = e.classNames[n];
							return i ? Wf(i) : t;
						},
					);
				}),
				(Wf = (e, t = '') =>
					e
						.split(' ')
						.map((n) => `.${t}${n}`)
						.join('')),
				(Ue =
					(e = '') =>
					(...t) => {
						let n = new Set();
						for (let i of t)
							typeof i == 'string'
								? n.add(i)
								: Array.isArray(i)
								? i.forEach((r) => n.add(r))
								: typeof i == 'object' &&
								  Object.entries(i).forEach(
										([r, s]) => s && n.add(r),
								  );
						return Array.from(n, (i) => e + i).join(' ');
					});
		});
	var qf,
		Kf = m(() => {
			a();
			qf = (e = 21) =>
				crypto
					.getRandomValues(new Uint8Array(e))
					.reduce(
						(t, n) => (
							(n &= 63),
							n < 36
								? (t += n.toString(36))
								: n < 62
								? (t += (n - 26).toString(36).toUpperCase())
								: n > 62
								? (t += '-')
								: (t += '_'),
							t
						),
						'',
					);
		});
	async function Zf(e) {
		if (e.noPersist) return;
		let t = M.notifications.logLimit;
		t !== 0 &&
			(await qo(cs, (n) => {
				let i = n ?? [],
					{
						onClick: r,
						onClose: s,
						richBody: l,
						permanent: c,
						noPersist: u,
						dismissOnClick: h,
						...f
					} = e;
				return (
					i.unshift({ ...f, timestamp: Date.now(), id: qf() }),
					i.length > t && t !== 200 && (i.length = t),
					i
				);
			}),
			Hi.forEach((n) => n()));
	}
	async function XT(e) {
		let t = await Yf(),
			n = t.findIndex((i) => i.timestamp === e);
		n !== -1 && (t.splice(n, 1), await Ve(cs, t), Hi.forEach((i) => i()));
	}
	function JT() {
		let [e, t] = Zo((s) => s + 1, 0);
		tt(() => (Hi.add(t), () => void Hi.delete(t)), []);
		let [n, i, r] = ut(Yf, { fallbackValue: [], deps: [e] });
		return [n, r];
	}
	function QT({ data: e }) {
		let [t, n] = V(!1),
			i = I.useRef(null);
		return (
			tt(() => {
				let r = i.current,
					s = () => {
						if (r.clientHeight === 0)
							return requestAnimationFrame(s);
						r.style.height = `${r.clientHeight}px`;
					};
				s();
			}, []),
			o(
				'div',
				{ className: Vo('wrapper', { removing: t }), ref: i },
				o(ls, {
					...e,
					permanent: !0,
					dismissOnClick: !1,
					onClose: () => {
						t || (n(!0), setTimeout(() => XT(e.timestamp), 200));
					},
					richBody: o(
						'div',
						{ className: Vo('body') },
						e.body,
						o(In, {
							timestamp: Zt(e.timestamp),
							className: Vo('timestamp'),
						}),
					),
				}),
			)
		);
	}
	function VT({ log: e, pending: t }) {
		return !e.length && !t
			? o(
					'div',
					{ className: Vo('container') },
					o('div', { className: Vo('empty') }),
					o(
						y.FormText,
						{ style: { textAlign: 'center' } },
						'No notifications yet',
					),
			  )
			: o(
					'div',
					{ className: Vo('container') },
					e.map((n) => o(QT, { data: n, key: n.id })),
			  );
	}
	function ex({ modalProps: e, close: t }) {
		let [n, i] = JT();
		return o(
			Ie,
			{ ...e, size: 'large' },
			o(
				$e,
				null,
				o(
					q,
					{ variant: 'heading-lg/semibold', style: { flexGrow: 1 } },
					'Notification Log',
				),
				o(St, { onClick: t }),
			),
			o(Le, null, o(VT, { log: n, pending: i })),
			o(
				ot,
				null,
				o(
					R,
					{
						disabled: n.length === 0,
						onClick: () => {
							vt.show({
								title: 'Are you sure?',
								body: `This will permanently remove ${
									n.length
								} notification${
									n.length === 1 ? '' : 's'
								}. This action cannot be undone.`,
								async onConfirm() {
									await Ve(cs, []), Hi.forEach((r) => r());
								},
								confirmText: 'Do it!',
								confirmColor: 'vc-notification-log-danger-btn',
								cancelText: 'Nevermind',
							});
						},
					},
					'Clear Notification Log',
				),
			),
		);
	}
	function us() {
		let e = be((t) => o(ex, { modalProps: t, close: () => Gn(e) }));
	}
	var cs,
		Yf,
		Vo,
		Hi,
		ps = m(() => {
			'use strict';
			a();
			Pn();
			E();
			je();
			ze();
			ye();
			x();
			Kf();
			wl();
			(cs = 'notification-log'),
				(Yf = async () => (await Qe(cs)) ?? []),
				(Vo = Ue('vc-notification-log-')),
				(Hi = new Set());
		});
	function ox() {
		if (!Rl) {
			let e = document.createElement('div');
			(e.id = 'vc-notification-container'),
				document.body.append(e),
				(Rl = Ro.createRoot(e));
		}
		return Rl;
	}
	function ix(e, t) {
		let n = ox();
		return new Promise((i) => {
			n.render(
				o(ls, {
					key: t,
					...e,
					onClose: () => {
						e.onClose?.(), n.render(null), i();
					},
				}),
			);
		});
	}
	function rx() {
		if (typeof Notification > 'u') return !1;
		let { useNative: e } = M.notifications;
		return e === 'always'
			? !0
			: e === 'not-focused'
			? !document.hasFocus()
			: !1;
	}
	async function Xf() {
		return (
			Notification.permission === 'granted' ||
			(Notification.permission !== 'denied' &&
				(await Notification.requestPermission()) === 'granted')
		);
	}
	async function ge(e) {
		if ((Zf(e), rx() && (await Xf()))) {
			let {
					title: t,
					body: n,
					icon: i,
					image: r,
					onClick: s = null,
					onClose: l = null,
				} = e,
				c = new Notification(t, { body: n, icon: i, image: r });
			(c.onclick = s), (c.onclose = l);
		} else tx.push(() => ix(e, nx++));
	}
	var tx,
		Rl,
		nx,
		Jf = m(() => {
			'use strict';
			a();
			E();
			Qo();
			x();
			wl();
			ps();
			(tx = new dn()), (nx = 42);
		});
	var Cl = {};
	me(Cl, { requestPermission: () => Xf, showNotification: () => ge });
	var so = m(() => {
		'use strict';
		a();
		Jf();
	});
	function sg(e, t) {
		return gx(e, t || {}, 0, 0);
	}
	function ag(e, t) {
		return dx(e, t);
	}
	var Tt,
		kt,
		ds,
		ms,
		fs,
		Ll,
		tg,
		ng,
		og,
		El,
		ig,
		sx,
		Qf,
		Dl,
		zn,
		pe,
		Cn,
		lo,
		pe,
		pe,
		pe,
		pe,
		Wi,
		pe,
		ax,
		lx,
		cx,
		ux,
		Al,
		mn,
		Nl,
		Fl,
		rg,
		px,
		ao,
		dx,
		jn,
		zi,
		kl,
		Ol,
		Vf,
		ji,
		_l,
		eg,
		mx,
		Bl,
		fx,
		gx,
		hx,
		yx,
		lg = m(() => {
			a();
			(Tt = Uint8Array),
				(kt = Uint16Array),
				(ds = Uint32Array),
				(ms = new Tt([
					0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3,
					4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0,
				])),
				(fs = new Tt([
					0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8,
					9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0,
				])),
				(Ll = new Tt([
					16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14,
					1, 15,
				])),
				(tg = function (e, t) {
					for (var n = new kt(31), i = 0; i < 31; ++i)
						n[i] = t += 1 << e[i - 1];
					for (var r = new ds(n[30]), i = 1; i < 30; ++i)
						for (var s = n[i]; s < n[i + 1]; ++s)
							r[s] = ((s - n[i]) << 5) | i;
					return [n, r];
				}),
				(ng = tg(ms, 2)),
				(og = ng[0]),
				(El = ng[1]);
			(og[28] = 258), (El[258] = 28);
			(ig = tg(fs, 0)), (sx = ig[0]), (Qf = ig[1]), (Dl = new kt(32768));
			for (pe = 0; pe < 32768; ++pe)
				(zn = ((pe & 43690) >>> 1) | ((pe & 21845) << 1)),
					(zn = ((zn & 52428) >>> 2) | ((zn & 13107) << 2)),
					(zn = ((zn & 61680) >>> 4) | ((zn & 3855) << 4)),
					(Dl[pe] = (((zn & 65280) >>> 8) | ((zn & 255) << 8)) >>> 1);
			(Cn = function (e, t, n) {
				for (var i = e.length, r = 0, s = new kt(t); r < i; ++r)
					e[r] && ++s[e[r] - 1];
				var l = new kt(t);
				for (r = 0; r < t; ++r) l[r] = (l[r - 1] + s[r - 1]) << 1;
				var c;
				if (n) {
					c = new kt(1 << t);
					var u = 15 - t;
					for (r = 0; r < i; ++r)
						if (e[r])
							for (
								var h = (r << 4) | e[r],
									f = t - e[r],
									v = l[e[r] - 1]++ << f,
									S = v | ((1 << f) - 1);
								v <= S;
								++v
							)
								c[Dl[v] >>> u] = h;
				} else
					for (c = new kt(i), r = 0; r < i; ++r)
						e[r] && (c[r] = Dl[l[e[r] - 1]++] >>> (15 - e[r]));
				return c;
			}),
				(lo = new Tt(288));
			for (pe = 0; pe < 144; ++pe) lo[pe] = 8;
			for (pe = 144; pe < 256; ++pe) lo[pe] = 9;
			for (pe = 256; pe < 280; ++pe) lo[pe] = 7;
			for (pe = 280; pe < 288; ++pe) lo[pe] = 8;
			Wi = new Tt(32);
			for (pe = 0; pe < 32; ++pe) Wi[pe] = 5;
			(ax = Cn(lo, 9, 0)),
				(lx = Cn(lo, 9, 1)),
				(cx = Cn(Wi, 5, 0)),
				(ux = Cn(Wi, 5, 1)),
				(Al = function (e) {
					for (var t = e[0], n = 1; n < e.length; ++n)
						e[n] > t && (t = e[n]);
					return t;
				}),
				(mn = function (e, t, n) {
					var i = (t / 8) | 0;
					return ((e[i] | (e[i + 1] << 8)) >> (t & 7)) & n;
				}),
				(Nl = function (e, t) {
					var n = (t / 8) | 0;
					return (
						(e[n] | (e[n + 1] << 8) | (e[n + 2] << 16)) >> (t & 7)
					);
				}),
				(Fl = function (e) {
					return ((e + 7) / 8) | 0;
				}),
				(rg = function (e, t, n) {
					(t == null || t < 0) && (t = 0),
						(n == null || n > e.length) && (n = e.length);
					var i = new (
						e.BYTES_PER_ELEMENT == 2
							? kt
							: e.BYTES_PER_ELEMENT == 4
							? ds
							: Tt
					)(n - t);
					return i.set(e.subarray(t, n)), i;
				}),
				(px = [
					'unexpected EOF',
					'invalid block type',
					'invalid length/literal',
					'invalid distance',
					'stream finished',
					'no stream handler',
					,
					'no callback',
					'invalid UTF-8 data',
					'extra field too long',
					'date not in range 1980-2099',
					'filename too long',
					'stream finishing',
					'invalid zip data',
				]),
				(ao = function (e, t, n) {
					var i = new Error(t || px[e]);
					if (
						((i.code = e),
						Error.captureStackTrace &&
							Error.captureStackTrace(i, ao),
						!n)
					)
						throw i;
					return i;
				}),
				(dx = function (e, t, n) {
					var i = e.length;
					if (!i || (n && n.f && !n.l)) return t || new Tt(0);
					var r = !t || n,
						s = !n || n.i;
					n || (n = {}), t || (t = new Tt(i * 3));
					var l = function (Ur) {
							var wi = t.length;
							if (Ur > wi) {
								var Wo = new Tt(Math.max(wi * 2, Ur));
								Wo.set(t), (t = Wo);
							}
						},
						c = n.f || 0,
						u = n.p || 0,
						h = n.b || 0,
						f = n.l,
						v = n.d,
						S = n.m,
						b = n.n,
						A = i * 8;
					do {
						if (!f) {
							c = mn(e, u, 1);
							var C = mn(e, u + 1, 3);
							if (((u += 3), C))
								if (C == 1)
									(f = lx), (v = ux), (S = 9), (b = 5);
								else if (C == 2) {
									var K = mn(e, u, 31) + 257,
										ee = mn(e, u + 10, 15) + 4,
										j = K + mn(e, u + 5, 31) + 1;
									u += 14;
									for (
										var z = new Tt(j),
											te = new Tt(19),
											$ = 0;
										$ < ee;
										++$
									)
										te[Ll[$]] = mn(e, u + $ * 3, 7);
									u += ee * 3;
									for (
										var Re = Al(te),
											ne = (1 << Re) - 1,
											Fe = Cn(te, Re, 1),
											$ = 0;
										$ < j;

									) {
										var Ee = Fe[mn(e, u, ne)];
										u += Ee & 15;
										var D = Ee >>> 4;
										if (D < 16) z[$++] = D;
										else {
											var at = 0,
												qe = 0;
											for (
												D == 16
													? ((qe = 3 + mn(e, u, 3)),
													  (u += 2),
													  (at = z[$ - 1]))
													: D == 17
													? ((qe = 3 + mn(e, u, 7)),
													  (u += 3))
													: D == 18 &&
													  ((qe =
															11 + mn(e, u, 127)),
													  (u += 7));
												qe--;

											)
												z[$++] = at;
										}
									}
									var ft = z.subarray(0, K),
										Ge = z.subarray(K);
									(S = Al(ft)),
										(b = Al(Ge)),
										(f = Cn(ft, S, 1)),
										(v = Cn(Ge, b, 1));
								} else ao(1);
							else {
								var D = Fl(u) + 4,
									B = e[D - 4] | (e[D - 3] << 8),
									O = D + B;
								if (O > i) {
									s && ao(0);
									break;
								}
								r && l(h + B),
									t.set(e.subarray(D, O), h),
									(n.b = h += B),
									(n.p = u = O * 8),
									(n.f = c);
								continue;
							}
							if (u > A) {
								s && ao(0);
								break;
							}
						}
						r && l(h + 131072);
						for (
							var Ke = (1 << S) - 1, Ot = (1 << b) - 1, Ht = u;
							;
							Ht = u
						) {
							var at = f[Nl(e, u) & Ke],
								xn = at >>> 4;
							if (((u += at & 15), u > A)) {
								s && ao(0);
								break;
							}
							if ((at || ao(2), xn < 256)) t[h++] = xn;
							else if (xn == 256) {
								(Ht = u), (f = null);
								break;
							} else {
								var _t = xn - 254;
								if (xn > 264) {
									var $ = xn - 257,
										tn = ms[$];
									(_t = mn(e, u, (1 << tn) - 1) + og[$]),
										(u += tn);
								}
								var wn = v[Nl(e, u) & Ot],
									Rt = wn >>> 4;
								wn || ao(3), (u += wn & 15);
								var Ge = sx[Rt];
								if (Rt > 3) {
									var tn = fs[Rt];
									(Ge += Nl(e, u) & ((1 << tn) - 1)),
										(u += tn);
								}
								if (u > A) {
									s && ao(0);
									break;
								}
								r && l(h + 131072);
								for (var lt = h + _t; h < lt; h += 4)
									(t[h] = t[h - Ge]),
										(t[h + 1] = t[h + 1 - Ge]),
										(t[h + 2] = t[h + 2 - Ge]),
										(t[h + 3] = t[h + 3 - Ge]);
								h = lt;
							}
						}
						(n.l = f),
							(n.p = Ht),
							(n.b = h),
							(n.f = c),
							f && ((c = 1), (n.m = S), (n.d = v), (n.n = b));
					} while (!c);
					return h == t.length ? t : rg(t, 0, h);
				}),
				(jn = function (e, t, n) {
					n <<= t & 7;
					var i = (t / 8) | 0;
					(e[i] |= n), (e[i + 1] |= n >>> 8);
				}),
				(zi = function (e, t, n) {
					n <<= t & 7;
					var i = (t / 8) | 0;
					(e[i] |= n), (e[i + 1] |= n >>> 8), (e[i + 2] |= n >>> 16);
				}),
				(kl = function (e, t) {
					for (var n = [], i = 0; i < e.length; ++i)
						e[i] && n.push({ s: i, f: e[i] });
					var r = n.length,
						s = n.slice();
					if (!r) return [Bl, 0];
					if (r == 1) {
						var l = new Tt(n[0].s + 1);
						return (l[n[0].s] = 1), [l, 1];
					}
					n.sort(function (j, z) {
						return j.f - z.f;
					}),
						n.push({ s: -1, f: 25001 });
					var c = n[0],
						u = n[1],
						h = 0,
						f = 1,
						v = 2;
					for (
						n[0] = { s: -1, f: c.f + u.f, l: c, r: u };
						f != r - 1;

					)
						(c = n[n[h].f < n[v].f ? h++ : v++]),
							(u = n[h != f && n[h].f < n[v].f ? h++ : v++]),
							(n[f++] = { s: -1, f: c.f + u.f, l: c, r: u });
					for (var S = s[0].s, i = 1; i < r; ++i)
						s[i].s > S && (S = s[i].s);
					var b = new kt(S + 1),
						A = Ol(n[f - 1], b, 0);
					if (A > t) {
						var i = 0,
							C = 0,
							D = A - t,
							B = 1 << D;
						for (
							s.sort(function (z, te) {
								return b[te.s] - b[z.s] || z.f - te.f;
							});
							i < r;
							++i
						) {
							var O = s[i].s;
							if (b[O] > t)
								(C += B - (1 << (A - b[O]))), (b[O] = t);
							else break;
						}
						for (C >>>= D; C > 0; ) {
							var K = s[i].s;
							b[K] < t ? (C -= 1 << (t - b[K]++ - 1)) : ++i;
						}
						for (; i >= 0 && C; --i) {
							var ee = s[i].s;
							b[ee] == t && (--b[ee], ++C);
						}
						A = t;
					}
					return [new Tt(b), A];
				}),
				(Ol = function (e, t, n) {
					return e.s == -1
						? Math.max(Ol(e.l, t, n + 1), Ol(e.r, t, n + 1))
						: (t[e.s] = n);
				}),
				(Vf = function (e) {
					for (var t = e.length; t && !e[--t]; );
					for (
						var n = new kt(++t),
							i = 0,
							r = e[0],
							s = 1,
							l = function (u) {
								n[i++] = u;
							},
							c = 1;
						c <= t;
						++c
					)
						if (e[c] == r && c != t) ++s;
						else {
							if (!r && s > 2) {
								for (; s > 138; s -= 138) l(32754);
								s > 2 &&
									(l(
										s > 10
											? ((s - 11) << 5) | 28690
											: ((s - 3) << 5) | 12305,
									),
									(s = 0));
							} else if (s > 3) {
								for (l(r), --s; s > 6; s -= 6) l(8304);
								s > 2 && (l(((s - 3) << 5) | 8208), (s = 0));
							}
							for (; s--; ) l(r);
							(s = 1), (r = e[c]);
						}
					return [n.subarray(0, i), t];
				}),
				(ji = function (e, t) {
					for (var n = 0, i = 0; i < t.length; ++i) n += e[i] * t[i];
					return n;
				}),
				(_l = function (e, t, n) {
					var i = n.length,
						r = Fl(t + 2);
					(e[r] = i & 255),
						(e[r + 1] = i >>> 8),
						(e[r + 2] = e[r] ^ 255),
						(e[r + 3] = e[r + 1] ^ 255);
					for (var s = 0; s < i; ++s) e[r + s + 4] = n[s];
					return (r + 4 + i) * 8;
				}),
				(eg = function (e, t, n, i, r, s, l, c, u, h, f) {
					jn(t, f++, n), ++r[256];
					for (
						var v = kl(r, 15),
							S = v[0],
							b = v[1],
							A = kl(s, 15),
							C = A[0],
							D = A[1],
							B = Vf(S),
							O = B[0],
							K = B[1],
							ee = Vf(C),
							j = ee[0],
							z = ee[1],
							te = new kt(19),
							$ = 0;
						$ < O.length;
						++$
					)
						te[O[$] & 31]++;
					for (var $ = 0; $ < j.length; ++$) te[j[$] & 31]++;
					for (
						var Re = kl(te, 7), ne = Re[0], Fe = Re[1], Ee = 19;
						Ee > 4 && !ne[Ll[Ee - 1]];
						--Ee
					);
					var at = (h + 5) << 3,
						qe = ji(r, lo) + ji(s, Wi) + l,
						ft =
							ji(r, S) +
							ji(s, C) +
							l +
							14 +
							3 * Ee +
							ji(te, ne) +
							(2 * te[16] + 3 * te[17] + 7 * te[18]);
					if (at <= qe && at <= ft)
						return _l(t, f, e.subarray(u, u + h));
					var Ge, Ke, Ot, Ht;
					if ((jn(t, f, 1 + (ft < qe)), (f += 2), ft < qe)) {
						(Ge = Cn(S, b, 0)),
							(Ke = S),
							(Ot = Cn(C, D, 0)),
							(Ht = C);
						var xn = Cn(ne, Fe, 0);
						jn(t, f, K - 257),
							jn(t, f + 5, z - 1),
							jn(t, f + 10, Ee - 4),
							(f += 14);
						for (var $ = 0; $ < Ee; ++$)
							jn(t, f + 3 * $, ne[Ll[$]]);
						f += 3 * Ee;
						for (var _t = [O, j], tn = 0; tn < 2; ++tn)
							for (var wn = _t[tn], $ = 0; $ < wn.length; ++$) {
								var Rt = wn[$] & 31;
								jn(t, f, xn[Rt]),
									(f += ne[Rt]),
									Rt > 15 &&
										(jn(t, f, (wn[$] >>> 5) & 127),
										(f += wn[$] >>> 12));
							}
					} else (Ge = ax), (Ke = lo), (Ot = cx), (Ht = Wi);
					for (var $ = 0; $ < c; ++$)
						if (i[$] > 255) {
							var Rt = (i[$] >>> 18) & 31;
							zi(t, f, Ge[Rt + 257]),
								(f += Ke[Rt + 257]),
								Rt > 7 &&
									(jn(t, f, (i[$] >>> 23) & 31),
									(f += ms[Rt]));
							var lt = i[$] & 31;
							zi(t, f, Ot[lt]),
								(f += Ht[lt]),
								lt > 3 &&
									(zi(t, f, (i[$] >>> 5) & 8191),
									(f += fs[lt]));
						} else zi(t, f, Ge[i[$]]), (f += Ke[i[$]]);
					return zi(t, f, Ge[256]), f + Ke[256];
				}),
				(mx = new ds([
					65540, 131080, 131088, 131104, 262176, 1048704, 1048832,
					2114560, 2117632,
				])),
				(Bl = new Tt(0)),
				(fx = function (e, t, n, i, r, s) {
					var l = e.length,
						c = new Tt(i + l + 5 * (1 + Math.ceil(l / 7e3)) + r),
						u = c.subarray(i, c.length - r),
						h = 0;
					if (!t || l < 8)
						for (var f = 0; f <= l; f += 65535) {
							var v = f + 65535;
							v >= l && (u[h >> 3] = s),
								(h = _l(u, h + 1, e.subarray(f, v)));
						}
					else {
						for (
							var S = mx[t - 1],
								b = S >>> 13,
								A = S & 8191,
								C = (1 << n) - 1,
								D = new kt(32768),
								B = new kt(C + 1),
								O = Math.ceil(n / 3),
								K = 2 * O,
								ee = function (ja) {
									return (
										(e[ja] ^
											(e[ja + 1] << O) ^
											(e[ja + 2] << K)) &
										C
									);
								},
								j = new ds(25e3),
								z = new kt(288),
								te = new kt(32),
								$ = 0,
								Re = 0,
								f = 0,
								ne = 0,
								Fe = 0,
								Ee = 0;
							f < l;
							++f
						) {
							var at = ee(f),
								qe = f & 32767,
								ft = B[at];
							if (((D[qe] = ft), (B[at] = qe), Fe <= f)) {
								var Ge = l - f;
								if (($ > 7e3 || ne > 24576) && Ge > 423) {
									(h = eg(
										e,
										u,
										0,
										j,
										z,
										te,
										Re,
										ne,
										Ee,
										f - Ee,
										h,
									)),
										(ne = $ = Re = 0),
										(Ee = f);
									for (var Ke = 0; Ke < 286; ++Ke) z[Ke] = 0;
									for (var Ke = 0; Ke < 30; ++Ke) te[Ke] = 0;
								}
								var Ot = 2,
									Ht = 0,
									xn = A,
									_t = (qe - ft) & 32767;
								if (Ge > 2 && at == ee(f - _t))
									for (
										var tn = Math.min(b, Ge) - 1,
											wn = Math.min(32767, f),
											Rt = Math.min(258, Ge);
										_t <= wn && --xn && qe != ft;

									) {
										if (e[f + Ot] == e[f + Ot - _t]) {
											for (
												var lt = 0;
												lt < Rt &&
												e[f + lt] == e[f + lt - _t];
												++lt
											);
											if (lt > Ot) {
												if (
													((Ot = lt),
													(Ht = _t),
													lt > tn)
												)
													break;
												for (
													var Ur = Math.min(
															_t,
															lt - 2,
														),
														wi = 0,
														Ke = 0;
													Ke < Ur;
													++Ke
												) {
													var Wo =
															(f -
																_t +
																Ke +
																32768) &
															32767,
														oT = D[Wo],
														sf =
															(Wo - oT + 32768) &
															32767;
													sf > wi &&
														((wi = sf), (ft = Wo));
												}
											}
										}
										(qe = ft),
											(ft = D[qe]),
											(_t += (qe - ft + 32768) & 32767);
									}
								if (Ht) {
									j[ne++] =
										268435456 | (El[Ot] << 18) | Qf[Ht];
									var af = El[Ot] & 31,
										lf = Qf[Ht] & 31;
									(Re += ms[af] + fs[lf]),
										++z[257 + af],
										++te[lf],
										(Fe = f + Ot),
										++$;
								} else (j[ne++] = e[f]), ++z[e[f]];
							}
						}
						(h = eg(e, u, s, j, z, te, Re, ne, Ee, f - Ee, h)),
							!s && h & 7 && (h = _l(u, h + 1, Bl));
					}
					return rg(c, 0, i + Fl(h) + r);
				}),
				(gx = function (e, t, n, i, r) {
					return fx(
						e,
						t.level == null ? 6 : t.level,
						t.mem == null
							? Math.ceil(
									Math.max(
										8,
										Math.min(13, Math.log(e.length)),
									) * 1.5,
							  )
							: 12 + t.mem,
						n,
						i,
						!r,
					);
				});
			(hx = typeof TextDecoder < 'u' && new TextDecoder()), (yx = 0);
			try {
				hx.decode(Bl, { stream: !0 }), (yx = 1);
			} catch {}
		});
	async function cg() {
		return ((await Qe('Vencord_cloudSecret')) ?? {})[An().origin];
	}
	async function vx(e) {
		await qo(
			'Vencord_cloudSecret',
			(t) => ((t ??= {}), (t[An().origin] = e), t),
		);
	}
	async function $l() {
		await qo(
			'Vencord_cloudSecret',
			(e) => ((e ??= {}), delete e[An().origin], e),
		);
	}
	async function ug() {
		if ((await cg()) !== void 0) {
			M.cloud.authenticated = !0;
			return;
		}
		try {
			let i = await fetch(new URL('/v1/oauth/settings', An()));
			var { clientId: e, redirectUri: t } = await i.json();
		} catch {
			ge({
				title: 'Cloud Integration',
				body: "Setup failed (couldn't retrieve OAuth configuration).",
			}),
				(M.cloud.authenticated = !1);
			return;
		}
		let { OAuth2AuthorizeModal: n } = an('OAuth2AuthorizeModal');
		be((i) =>
			o(n, {
				...i,
				scopes: ['identify'],
				responseType: 'code',
				redirectUri: t,
				permissions: 0n,
				clientId: e,
				cancelCompletesFlow: !1,
				callback: async ({ location: r }) => {
					if (!r) {
						M.cloud.authenticated = !1;
						return;
					}
					try {
						let s = await fetch(r, {
								headers: new Headers({
									Accept: 'application/json',
								}),
							}),
							{ secret: l } = await s.json();
						l
							? (gs.info('Authorized with secret'),
							  await vx(l),
							  ge({
									title: 'Cloud Integration',
									body: 'Cloud integrations enabled!',
							  }),
							  (M.cloud.authenticated = !0))
							: (ge({
									title: 'Cloud Integration',
									body: 'Setup failed (no secret returned?).',
							  }),
							  (M.cloud.authenticated = !1));
					} catch (s) {
						gs.error('Failed to authorize', s),
							ge({
								title: 'Cloud Integration',
								body: `Setup failed (${s.toString()}).`,
							}),
							(M.cloud.authenticated = !1);
					}
				},
			}),
		);
	}
	async function ei() {
		let e = U.getCurrentUser().id,
			t = await cg();
		return window.btoa(`${t}:${e}`);
	}
	var gs,
		An,
		Ul = m(() => {
			'use strict';
			a();
			Pn();
			so();
			E();
			_();
			x();
			Se();
			ze();
			(gs = new Z('Cloud', '#39b7e0')), (An = () => new URL(M.cloud.url));
		});
	function hs(e) {
		let t = document.createElement('a');
		(t.href = URL.createObjectURL(e)),
			(t.download = e.name),
			document.body.appendChild(t),
			t.click(),
			setImmediate(() => {
				URL.revokeObjectURL(t.href), document.body.removeChild(t);
			});
	}
	var Gl = m(() => {
		'use strict';
		a();
	});
	async function pg(e) {
		try {
			var t = JSON.parse(e);
		} catch (n) {
			throw (
				(console.log(e),
				new Error('Failed to parse JSON: ' + String(n)))
			);
		}
		if ('settings' in t && 'quickCss' in t)
			Object.assign(Nn, t.settings),
				await VencordNative.settings.set(
					JSON.stringify(t.settings, null, 4),
				),
				await VencordNative.quickCss.set(t.quickCss);
		else
			throw new Error(
				'Invalid Settings. Is this even a Vencord Settings file?',
			);
	}
	async function dg() {
		let e = JSON.parse(VencordNative.settings.get()),
			t = await VencordNative.quickCss.get();
		return JSON.stringify({ settings: e, quickCss: t }, null, 4);
	}
	async function mg() {
		let e = 'vencord-settings-backup.json',
			t = await dg(),
			n = new TextEncoder().encode(t);
		hs(new File([n], e, { type: 'application/json' }));
	}
	async function gg(e = !0) {
		if (!1) {
			if (t)
				try {
				} catch (n) {}
		} else {
			let t = document.createElement('input');
			(t.type = 'file'),
				(t.style.display = 'none'),
				(t.accept = 'application/json'),
				(t.onchange = async () => {
					let n = t.files?.[0];
					if (!n) return;
					let i = new FileReader();
					(i.onload = async () => {
						try {
							await pg(i.result), e && Sx();
						} catch (r) {
							new Z('SettingsSync').error(r), e && bx(r);
						}
					}),
						i.readAsText(n);
				}),
				document.body.appendChild(t),
				t.click(),
				setImmediate(() => document.body.removeChild(t));
		}
	}
	async function ti() {
		let e = await dg();
		try {
			let t = await fetch(new URL('/v1/settings', An()), {
				method: 'PUT',
				headers: new Headers({
					Authorization: await ei(),
					'Content-Type': 'application/octet-stream',
				}),
				body: sg(new TextEncoder().encode(e)),
			});
			if (!t.ok) {
				fn.error(`Failed to sync up, API returned ${t.status}`),
					ge({
						title: 'Cloud Settings',
						body: `Could not synchronize settings to cloud (API returned ${t.status}).`,
						color: 'var(--red-360)',
					});
				return;
			}
			let { written: n } = await t.json();
			(Nn.cloud.settingsSyncVersion = n),
				VencordNative.settings.set(JSON.stringify(Nn, null, 4)),
				fn.info('Settings uploaded to cloud successfully'),
				ge({
					title: 'Cloud Settings',
					body: 'Synchronized your settings to the cloud!',
					color: 'var(--green-360)',
					noPersist: !0,
				});
		} catch (t) {
			fn.error('Failed to sync up', t),
				ge({
					title: 'Cloud Settings',
					body: `Could not synchronize settings to the cloud (${t.toString()}).`,
					color: 'var(--red-360)',
				});
		}
	}
	async function ys(e = !0, t = !1) {
		try {
			let n = await fetch(new URL('/v1/settings', An()), {
				method: 'GET',
				headers: new Headers({
					Authorization: await ei(),
					Accept: 'application/octet-stream',
					'If-None-Match': M.cloud.settingsSyncVersion.toString(),
				}),
			});
			if (n.status === 404)
				return (
					fn.info('No settings on the cloud'),
					e &&
						ge({
							title: 'Cloud Settings',
							body: 'There are no settings in the cloud.',
							noPersist: !0,
						}),
					!1
				);
			if (n.status === 304)
				return (
					fn.info('Settings up to date'),
					e &&
						ge({
							title: 'Cloud Settings',
							body: 'Your settings are up to date.',
							noPersist: !0,
						}),
					!1
				);
			if (!n.ok)
				return (
					fn.error(`Failed to sync down, API returned ${n.status}`),
					ge({
						title: 'Cloud Settings',
						body: `Could not synchronize settings from the cloud (API returned ${n.status}).`,
						color: 'var(--red-360)',
					}),
					!1
				);
			let i = Number(n.headers.get('etag')),
				r = M.cloud.settingsSyncVersion;
			if (!t && i < r) {
				e &&
					ge({
						title: 'Cloud Settings',
						body: 'Your local settings are newer than the cloud ones.',
						noPersist: !0,
					});
				return;
			}
			let s = await n.arrayBuffer(),
				l = new TextDecoder().decode(ag(new Uint8Array(s)));
			return (
				await pg(l),
				(Nn.cloud.settingsSyncVersion = i),
				VencordNative.settings.set(JSON.stringify(Nn, null, 4)),
				fn.info('Settings loaded from cloud successfully'),
				e &&
					ge({
						title: 'Cloud Settings',
						body: 'Your settings have been updated! Click here to restart to fully apply changes!',
						color: 'var(--green-360)',
						onClick: () => window.DiscordNative.app.relaunch(),
						noPersist: !0,
					}),
				!0
			);
		} catch (n) {
			return (
				fn.error('Failed to sync down', n),
				ge({
					title: 'Cloud Settings',
					body: `Could not synchronize settings from the cloud (${n.toString()}).`,
					color: 'var(--red-360)',
				}),
				!1
			);
		}
	}
	async function hg() {
		try {
			let e = await fetch(new URL('/v1/settings', An()), {
				method: 'DELETE',
				headers: new Headers({ Authorization: await ei() }),
			});
			if (!e.ok) {
				fn.error(`Failed to delete, API returned ${e.status}`),
					ge({
						title: 'Cloud Settings',
						body: `Could not delete settings (API returned ${e.status}).`,
						color: 'var(--red-360)',
					});
				return;
			}
			fn.info('Settings deleted from cloud successfully'),
				ge({
					title: 'Cloud Settings',
					body: 'Settings deleted from cloud!',
					color: 'var(--green-360)',
				});
		} catch (e) {
			fn.error('Failed to delete', e),
				ge({
					title: 'Cloud Settings',
					body: `Could not delete settings (${e.toString()}).`,
					color: 'var(--red-360)',
				});
		}
	}
	var fg,
		Sx,
		bx,
		fn,
		qi = m(() => {
			'use strict';
			a();
			so();
			E();
			x();
			lg();
			Ul();
			Se();
			Gl();
			(fg = (e, t) => Q.show({ type: e, message: t, id: Q.genId() })),
				(Sx = () =>
					fg(
						Q.Type.SUCCESS,
						'Settings successfully imported. Restart to apply changes!',
					)),
				(bx = (e) =>
					fg(
						Q.Type.FAILURE,
						`Failed to import settings: ${String(e)}`,
					));
			fn = new Z('Cloud:Settings', '#39b7e0');
		});
	var zl = {};
	me(zl, {
		PlainSettings: () => Nn,
		Settings: () => M,
		addSettingsListener: () => Ss,
		definePluginSettings: () => N,
		migratePluginSettings: () => xx,
		useSettings: () => it,
	});
	function Hl(e, t = e, n = '') {
		return (vg[n] ??= new Proxy(e, {
			get(i, r) {
				let s = i[r];
				if (!(r in i)) {
					if (n === 'plugins' && r in Te)
						return (i[r] = Hl(
							{
								enabled:
									Te[r].required ??
									Te[r].enabledByDefault ??
									!1,
							},
							t,
							`plugins.${r}`,
						));
					if (n.startsWith('plugins.')) {
						let l = n.slice(8);
						if (l in Te) {
							let c = Te[l].options?.[r];
							if (!c) return s;
							if ('default' in c) return (i[r] = c.default);
							if (c.type === 4) {
								let u = c.options.find((h) => h.default);
								return u && (i[r] = u.value), u?.value;
							}
						}
					}
					return s;
				}
				return typeof s == 'object' && !Array.isArray(s) && s !== null
					? Hl(s, t, `${n}${n && '.'}${r}`)
					: s;
			},
			set(i, r, s) {
				if (i[r] === s) return !0;
				i[r] = s;
				let l = `${n}${n && '.'}${r}`;
				delete vg[l];
				for (let c of vs) (!c._path || c._path === l) && c(s, l);
				return (
					(Nn.cloud.settingsSyncVersion = Date.now()),
					(Ao.Vencord_settingsDirty = !0),
					Tx(),
					VencordNative.settings.set(JSON.stringify(t, null, 4)),
					!0
				);
			},
		}));
	}
	function it(e) {
		let [, t] = I.useReducer(() => ({}), {}),
			n = e ? (i, r) => e.includes(r) && t() : t;
		return I.useEffect(() => (vs.add(n), () => void vs.delete(n)), []), M;
	}
	function Ss(e, t) {
		(t._path = e), vs.add(t);
	}
	function xx(e, ...t) {
		let { plugins: n } = co;
		if (!(e in n)) {
			for (let i of t)
				if (i in n) {
					Sg.info(`Migrating settings from old name ${i} to ${e}`),
						(n[e] = n[i]),
						delete n[i],
						VencordNative.settings.set(JSON.stringify(co, null, 4));
					break;
				}
		}
	}
	function N(e, t) {
		let n = {
			get store() {
				if (!n.pluginName)
					throw new Error(
						'Cannot access settings before plugin is initialized',
					);
				return M.plugins[n.pluginName];
			},
			use: (i) =>
				it(i?.map((r) => `plugins.${n.pluginName}.${r}`)).plugins[
					n.pluginName
				],
			def: e,
			checks: t ?? {},
			pluginName: '',
			withPrivateSettings() {
				return this;
			},
		};
		return n;
	}
	var Sg,
		yg,
		co,
		Tx,
		vs,
		vg,
		Nn,
		M,
		E = m(() => {
			'use strict';
			a();
			Ko();
			rs();
			Se();
			de();
			qi();
			T();
			x();
			ni();
			(Sg = new Z('Settings')),
				(yg = {
					notifyAboutUpdates: !0,
					autoUpdate: !1,
					autoUpdateNotification: !0,
					useQuickCss: !0,
					themeLinks: [],
					enableReactDevtools: !1,
					frameless: !1,
					transparent: !1,
					winCtrlQ: !1,
					macosTranslucency: !1,
					disableMinSize: !1,
					winNativeTitleBar: !1,
					plugins: {},
					notifications: {
						timeout: 5e3,
						position: 'bottom-right',
						useNative: 'not-focused',
						logLimit: 50,
					},
					cloud: {
						authenticated: !1,
						url: 'https://api.vencord.dev/',
						settingsSync: !1,
						settingsSyncVersion: 0,
					},
				});
			try {
				(co = JSON.parse(VencordNative.settings.get())), Po(co, yg);
			} catch (e) {
				(co = Po({}, yg)),
					Sg.error(
						`An error occurred while loading the settings. Corrupt settings file?
`,
						e,
					);
			}
			(Tx = Ct(async () => {
				M.cloud.settingsSync &&
					M.cloud.authenticated &&
					(await ti(), delete Ao.Vencord_settingsDirty);
			}, 6e4)),
				(vs = new Set()),
				(vg = {});
			(Nn = co), (M = Hl(co));
		});
	var jl,
		bg = m(() => {
			'use strict';
			a();
			E();
			w();
			T();
			jl = g({
				name: 'AnonymiseFileNames',
				authors: [p.obscurity],
				description: 'Anonymise uploaded file names',
				patches: [
					{
						find: 'instantBatchUpload:function',
						replacement: {
							match: /uploadFiles:(.{1,2}),/,
							replace:
								'uploadFiles:(...args)=>(args[0].uploads.forEach(f=>f.filename=$self.anonymise(f.filename)),$1(...args)),',
						},
					},
				],
				options: {
					method: {
						description: 'Anonymising method',
						type: 4,
						options: [
							{
								label: 'Random Characters',
								value: 0,
								default: !0,
							},
							{ label: 'Consistent', value: 1 },
							{ label: 'Timestamp (4chan-like)', value: 2 },
						],
					},
					randomisedLength: {
						description: 'Random characters length',
						type: 1,
						default: 7,
						disabled: () =>
							M.plugins.AnonymiseFileNames.method !== 0,
					},
					consistent: {
						description: 'Consistent filename',
						type: 0,
						default: 'image',
						disabled: () =>
							M.plugins.AnonymiseFileNames.method !== 1,
					},
				},
				anonymise(e) {
					let t = 'image',
						n = e.lastIndexOf('.'),
						i = n !== -1 ? e.slice(n) : '';
					switch (M.plugins.AnonymiseFileNames.method) {
						case 0:
							let r =
								'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
							t = Array.from(
								{
									length: M.plugins.AnonymiseFileNames
										.randomisedLength,
								},
								() => r[Math.floor(Math.random() * r.length)],
							).join('');
							break;
						case 1:
							t = M.plugins.AnonymiseFileNames.consistent;
							break;
						case 2:
							t = `${Math.floor(Date.now() / 1e3)}${Math.floor(
								window.performance.now(),
							)}`;
							break;
					}
					return t + i;
				},
			});
		});
	function bs() {
		return o(
			'svg',
			{
				'aria-hidden': 'true',
				height: '16',
				viewBox: '0 0 16 16',
				width: '16',
				style: { marginRight: '0.5em', transform: 'translateY(2px)' },
			},
			o('path', {
				fill: '#db61a2',
				'fill-rule': 'evenodd',
				d: 'M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z',
			}),
		);
	}
	var Wl = m(() => {
		'use strict';
		a();
	});
	function Ki(e) {
		return o(
			R,
			{
				...e,
				look: R.Looks.LINK,
				color: R.Colors.TRANSPARENT,
				onClick: () =>
					VencordNative.native.openExternal(
						'https://github.com/sponsors/Vendicated',
					),
			},
			o(bs, null),
			'Donate',
		);
	}
	var ql = m(() => {
		'use strict';
		a();
		x();
		Wl();
	});
	function ae(e) {
		return (
			(e.style ??= {}),
			(e.style.display = 'flex'),
			(e.style.gap ??= '1em'),
			(e.style.flexDirection ||= e.flexDirection),
			delete e.flexDirection,
			o('div', { ...e }, e.children)
		);
	}
	var xt = m(() => {
		'use strict';
		a();
	});
	async function Tg(e = !1) {
		Kl = {};
		let t = {};
		e && (t.cache = 'no-cache');
		let i = (
			await fetch(
				'https://gist.githubusercontent.com/Vendicated/51a3dd775f6920429ec6e9b735ca7f01/raw/badges.csv',
				t,
			).then((r) => r.text())
		).trim().split(`
`);
		if (i.shift() !== 'id,tooltip,image') {
			new Z('BadgeAPI').error('Invalid badges.csv file!');
			return;
		}
		for (let r of i) {
			let [s, l, c] = r.split(',');
			(Kl[s] ??= []).push({ image: c, description: l });
		}
	}
	var wx,
		Mx,
		Kl,
		Yl,
		xg = m(() => {
			'use strict';
			a();
			xs();
			ql();
			re();
			xt();
			Wl();
			w();
			Se();
			Xe();
			de();
			ze();
			T();
			x();
			(wx =
				'https://cdn.discordapp.com/attachments/1033680203433660458/1092089947126780035/favicon.png'),
				(Mx = {
					description: 'Vencord Contributor',
					image: wx,
					position: 0,
					props: {
						style: { borderRadius: '50%', transform: 'scale(0.9)' },
					},
					shouldShow: ({ user: e }) => Ci(e.id),
					link: 'https://github.com/Vendicated/Vencord',
				}),
				(Kl = {});
			Yl = g({
				name: 'BadgeAPI',
				description: 'API to add badges to users.',
				authors: [p.Megu, p.Ven, p.TheSun],
				required: !0,
				patches: [
					{
						find: 'Messages.PROFILE_USER_BADGES,role:',
						replacement: [
							{
								match: /(?<=(\i)\.isTryItOutFlow,)(.{0,300})null==\i\?void 0:(\i)\.getBadges\(\)/,
								replace: (e, t, n, i) =>
									`vencordProps=${t},${n}Vencord.Api.Badges._getBadges(vencordProps).concat(${i}?.getBadges()??[])`,
							},
							{
								match: /alt:" ","aria-hidden":!0,src:(?=(\i)\.src)/g,
								replace: '...$1.props,$& $1.image??',
							},
							{
								match: /children:function(?<=(\i)\.(?:tooltip|description),spacing:\d.+?)/g,
								replace:
									'children:$1.component ? () => $self.renderBadgeComponent($1) : function',
							},
							{
								match: /onClick:function(?=.{0,200}href:(\i)\.link)/,
								replace: 'onClick:$1.onClick??function',
							},
						],
					},
				],
				toolboxActions: {
					async 'Refetch Badges'() {
						await Tg(!0),
							Q.show({
								id: Q.genId(),
								message: 'Successfully refetched badges!',
								type: Q.Type.SUCCESS,
							});
					},
				},
				async start() {
					Vencord.Api.Badges.addBadge(Mx), await Tg();
				},
				renderBadgeComponent: k.wrap(
					(e) => {
						let t = e.component;
						return o(t, { ...e });
					},
					{ noop: !0 },
				),
				getDonorBadges(e) {
					return Kl[e]?.map((t) => ({
						...t,
						position: 0,
						props: {
							style: {
								borderRadius: '50%',
								transform: 'scale(0.9)',
							},
						},
						onClick() {
							let n = be((i) =>
								o(
									k,
									{
										noop: !0,
										onError: () => {
											Gn(n),
												VencordNative.native.openExternal(
													'https://github.com/sponsors/Vendicated',
												);
										},
									},
									o(
										pn.ModalRoot,
										{ ...i },
										o(
											pn.ModalHeader,
											null,
											o(
												ae,
												{
													style: {
														width: '100%',
														justifyContent:
															'center',
													},
												},
												o(
													y.FormTitle,
													{
														tag: 'h2',
														style: {
															width: '100%',
															textAlign: 'center',
															margin: 0,
														},
													},
													o(bs, null),
													'Vencord Donor',
												),
											),
										),
										o(
											pn.ModalContent,
											null,
											o(
												ae,
												null,
												o('img', {
													role: 'presentation',
													src: 'https://cdn.discordapp.com/emojis/1026533070955872337.png',
													alt: '',
													style: { margin: 'auto' },
												}),
												o('img', {
													role: 'presentation',
													src: 'https://cdn.discordapp.com/emojis/1026533090627174460.png',
													alt: '',
													style: { margin: 'auto' },
												}),
											),
											o(
												'div',
												{ style: { padding: '1em' } },
												o(
													y.FormText,
													null,
													'This Badge is a special perk for Vencord Donors',
												),
												o(
													y.FormText,
													{ className: G.top20 },
													'Please consider supporting the development of Vencord by becoming a donor. It would mean a lot!!',
												),
											),
										),
										o(
											pn.ModalFooter,
											null,
											o(
												ae,
												{
													style: {
														width: '100%',
														justifyContent:
															'center',
													},
												},
												o(Ki, null),
											),
										),
									),
								),
							);
						},
					}));
				},
			});
		});
	var Zl,
		wg = m(() => {
			'use strict';
			a();
			w();
			T();
			Zl = g({
				name: 'CommandsAPI',
				authors: [p.Arjix],
				description: 'Api required by anything that uses commands',
				patches: [
					{
						find: '"giphy","tenor"',
						replacement: [
							{
								match: /(?<=\w=)(\w)(\.filter\(.{0,30}giphy)/,
								replace: 'Vencord.Api.Commands._init($1)$2',
							},
						],
					},
					{
						find: 'Unexpected value for option',
						replacement: {
							match: /,(.{1,2})\.execute\((.{1,2}),(.{1,2})\)]/,
							replace: (e, t, n, i) =>
								`,Vencord.Api.Commands._handleCommand(${t}, ${n}, ${i})]`,
						},
					},
					{
						find: '.source,children',
						replacement: {
							match: /(?<=:(.{1,3})\.displayDescription\}.{0,200}\.source,children:)[^}]+/,
							replace: '$1.plugin||($&)',
						},
					},
				],
			});
		});
	var Xl,
		Mg = m(() => {
			'use strict';
			a();
			w();
			T();
			Xl = g({
				name: 'ContextMenuAPI',
				description:
					'API for adding/removing items to/from context menus.',
				authors: [p.Nuckyz, p.Ven],
				required: !0,
				patches: [
					{
						find: '\u266B (\u3064\uFF61\u25D5\u203F\u203F\u25D5\uFF61)\u3064 \u266A',
						replacement: {
							match: /(?<=function \i\((\i)\){)(?=var \i,\i=\i\.navId)/,
							replace: (e, t) =>
								`Vencord.Api.ContextMenu._patchContextMenu(${t});`,
						},
					},
					{
						find: '.Menu,{',
						all: !0,
						replacement: {
							match: /Menu,{(?<=\.jsxs?\)\(\i\.Menu,{)/g,
							replace:
								"$&contextMenuApiArguments:typeof arguments!=='undefined'?arguments:[],",
						},
					},
				],
			});
		});
	var Jl,
		Pg = m(() => {
			'use strict';
			a();
			w();
			T();
			Jl = g({
				name: 'MemberListDecoratorsAPI',
				description:
					'API to add decorators to member list (both in servers and DMs)',
				authors: [p.TheSun],
				patches: [
					{
						find: 'lostPermissionTooltipText,',
						replacement: {
							match: /Fragment,{children:\[(.{30,80})\]/,
							replace:
								'Fragment,{children:Vencord.Api.MemberListDecorators.__addDecoratorsToList(this.props).concat($1)',
						},
					},
					{
						find: 'PrivateChannel.renderAvatar',
						replacement: {
							match: /(subText:(.{1,2})\.renderSubtitle\(\).{1,50}decorators):(.{30,100}:null)/,
							replace:
								'$1:Vencord.Api.MemberListDecorators.__addDecoratorsToList($2.props).concat($3)',
						},
					},
				],
			});
		});
	var Ql,
		Ig = m(() => {
			'use strict';
			a();
			w();
			T();
			Ql = g({
				name: 'MessageAccessoriesAPI',
				description: 'API to add message accessories.',
				authors: [p.Cyn],
				patches: [
					{
						find: '.Messages.REMOVE_ATTACHMENT_BODY',
						replacement: {
							match: /(.container\)?,children:)(\[[^\]]+\])(}\)\};return)/,
							replace: (e, t, n, i) =>
								`${t}Vencord.Api.MessageAccessories._modifyAccessories(${n},this.props)${i}`,
						},
					},
				],
			});
		});
	var Vl,
		Rg = m(() => {
			'use strict';
			a();
			w();
			T();
			Vl = g({
				name: 'MessageDecorationsAPI',
				description: 'API to add decorations to messages',
				authors: [p.TheSun],
				patches: [
					{
						find: '.withMentionPrefix',
						replacement: {
							match: /(.roleDot.{10,50}{children:.{1,2})}\)/,
							replace:
								'$1.concat(Vencord.Api.MessageDecorations.__addDecorationsToMessage(arguments[0]))})',
						},
					},
				],
			});
		});
	var ec,
		Cg = m(() => {
			'use strict';
			a();
			w();
			T();
			ec = g({
				name: 'MessageEventsAPI',
				description: 'Api required by anything using message events.',
				authors: [p.Arjix, p.hunt, p.Ven],
				patches: [
					{
						find: '"MessageActionCreators"',
						replacement: {
							match: /\beditMessage:(function\(.+?\))\{/,
							replace:
								'editMessage:async $1{await Vencord.Api.MessageEvents._handlePreEdit(...arguments);',
						},
					},
					{
						find: '.handleSendMessage=',
						replacement: {
							match: /(props\.chatInputType.+?\.then\(\()(function.+?var (\i)=\i\.\i\.parse\((\i),.+?var (\i)=\i\.\i\.getSendMessageOptionsForReply\(\i\);)(?<=\)\(({.+?})\)\.then.+?)/,
							replace: (e, t, n, i, r, s, l) =>
								`${t}async ${n}if(await Vencord.Api.MessageEvents._handlePreSend(${r}.id,${i},${l},${s}))return{shoudClear:true,shouldRefocus:true};`,
						},
					},
					{
						find: '("interactionUsernameProfile',
						replacement: {
							match: /var \i=(\i)\.id,\i=(\i)\.id;return \i\.useCallback\(\(?function\((\i)\){/,
							replace: (e, t, n, i) =>
								`var _msg=${t},_chan=${n};${e}Vencord.Api.MessageEvents._handleClick(_msg, _chan, ${i});`,
						},
					},
				],
			});
		});
	var tc,
		Ag = m(() => {
			'use strict';
			a();
			w();
			T();
			tc = g({
				name: 'MessagePopoverAPI',
				description: 'API to add buttons to message popovers.',
				authors: [p.KingFish, p.Ven, p.Nuckyz],
				patches: [
					{
						find: 'Messages.MESSAGE_UTILITIES_A11Y_LABEL',
						replacement: {
							match: /\i&&!\i\?\(0,\i\.jsxs?\)\(.{0,200}renderEmojiPicker:.{0,500}\?(\i)\(\{key:"reply-other"/,
							replace: (e, t) => {
								let n = e.match(/message:(.{1,3}),/)?.[1];
								if (!n)
									throw new Error(
										'Could not find message variable',
									);
								return `...Vencord.Api.MessagePopover._buildPopoverElements(${n},${t}),${e}`;
							},
						},
					},
				],
			});
		});
	var nc,
		Ng = m(() => {
			'use strict';
			a();
			w();
			T();
			nc = g({
				name: 'NoticesAPI',
				description: 'Fixes notices being automatically dismissed',
				authors: [p.Ven],
				required: !0,
				patches: [
					{
						find: 'displayName="NoticeStore"',
						replacement: [
							{
								match: /(?=;\i=null;.{0,70}getPremiumSubscription)/g,
								replace:
									';if(Vencord.Api.Notices.currentNotice)return false',
							},
							{
								match: /(?<=,NOTICE_DISMISS:function\(\i\){)(?=if\(null==(\i)\))/,
								replace: (e, t) =>
									`if(${t}.id=="VencordNotice")return(${t}=null,Vencord.Api.Notices.nextNotice(),true);`,
							},
						],
					},
				],
			});
		});
	var oc,
		kg = m(() => {
			'use strict';
			a();
			w();
			T();
			oc = g({
				name: 'ServerListAPI',
				authors: [p.kemo],
				description:
					'Api required for plugins that modify the server list',
				patches: [
					{
						find: 'Messages.DISCODO_DISABLED',
						replacement: {
							match: /(Messages\.DISCODO_DISABLED\);return)(.*?homeIcon.*?)(\}function)/,
							replace:
								'$1[$2].concat(Vencord.Api.ServerList.renderAll(Vencord.Api.ServerList.ServerListRenderPosition.Above))$3',
						},
					},
					{
						find: 'Messages.SERVERS,children',
						replacement: {
							match: /(Messages\.SERVERS,children:)(.+?default:return null\}\}\)\))/,
							replace:
								'$1Vencord.Api.ServerList.renderAll(Vencord.Api.ServerList.ServerListRenderPosition.In).concat($2)',
						},
					},
				],
			});
		});
	var ic,
		Lg = m(() => {
			'use strict';
			a();
			w();
			T();
			ic = g({
				name: 'SettingsStoreAPI',
				description:
					"Patches Discord's SettingsStores to expose their group and name",
				authors: [p.Nuckyz],
				patches: [
					{
						find: '"textAndImages","renderSpoilers"',
						replacement: [
							{
								match: /(?<=INFREQUENT_USER_ACTION.{0,20}),useSetting:function/,
								replace:
									',settingsStoreApiGroup:arguments[0],settingsStoreApiName:arguments[1]$&',
							},
						],
					},
				],
			});
		});
	var lc = {};
	me(lc, {
		currentNotice: () => Yi,
		nextNotice: () => Eg,
		noticesQueue: () => sc,
		popNotice: () => ac,
		showNotice: () => Zi,
	});
	function ac() {
		rc.dismiss();
	}
	function Eg() {
		(Yi = sc.shift()), Yi && rc.show(...Yi, 'VencordNotice');
	}
	function Zi(e, t, n) {
		sc.push(['GENERIC', e, t, n]), Yi || Eg();
	}
	var rc,
		sc,
		Yi,
		ws = m(() => {
			'use strict';
			a();
			_();
			Ze(
				(e) => e.show && e.dismiss && !e.suppressAll,
				(e) => (rc = e),
			);
			(sc = []), (Yi = null);
		});
	function We(e) {
		return (
			e.disabled &&
				((e.style ??= {}),
				(e.style.pointerEvents = 'none'),
				(e['aria-disabled'] = !0)),
			o('a', { role: 'link', target: '_blank', ...e }, e.children)
		);
	}
	var Wn = m(() => {
		'use strict';
		a();
	});
	async function Dg(e, t) {
		return (await Px.getAsset(e, [t, void 0]))[0];
	}
	async function Rx(e) {
		let t = {};
		return await Ix(t, e), t.application;
	}
	var Px,
		Ix,
		Og,
		oi,
		cc,
		_g = m(() => {
			'use strict';
			a();
			ws();
			Wn();
			w();
			T();
			_();
			x();
			(Px = Ye(
				'getAssetImage: size must === [number, number] for Twitch',
				{ getAsset: Y.byCode('apply(') },
			)),
				(Ix = ce('.APPLICATION_RPC('));
			Og = {};
			cc = g({
				name: 'WebRichPresence (arRPC)',
				description:
					'Client plugin for arRPC to enable RPC on Discord Web (experimental)',
				authors: [p.Ducko],
				settingsAboutComponent: () =>
					o(
						d,
						null,
						o(y.FormTitle, { tag: 'h3' }, 'How to use arRPC'),
						o(
							y.FormText,
							null,
							o(
								We,
								{
									href: 'https://github.com/OpenAsar/arrpc/tree/main#server',
								},
								'Follow the instructions in the GitHub repo',
							),
							' to get the server running, and then enable the plugin.',
						),
					),
				async start() {
					if ('armcord' in window) return;
					if (
						(oi && oi.close(),
						(oi = new WebSocket('ws://127.0.0.1:1337')),
						(oi.onmessage = async (t) => {
							let n = JSON.parse(t.data);
							if (
								(n.activity?.assets?.large_image &&
									(n.activity.assets.large_image = await Dg(
										n.activity.application_id,
										n.activity.assets.large_image,
									)),
								n.activity?.assets?.small_image &&
									(n.activity.assets.small_image = await Dg(
										n.activity.application_id,
										n.activity.assets.small_image,
									)),
								n.activity)
							) {
								let i = n.activity.application_id;
								Og[i] ||= await Rx(i);
								let r = Og[i];
								n.activity.name ||= r.name;
							}
							L.dispatch({ type: 'LOCAL_ACTIVITY_UPDATE', ...n });
						}),
						!(await new Promise((t) =>
							setTimeout(
								() => t(oi.readyState === WebSocket.OPEN),
								1e3,
							),
						)))
					) {
						Zi(
							'Failed to connect to arRPC, is it running?',
							'Retry',
							() => {
								ac(), this.start();
							},
						);
						return;
					}
					Q.show({
						message: 'Connected to arRPC',
						type: Q.Type.SUCCESS,
						id: Q.genId(),
						options: { duration: 1e3, position: Q.Position.BOTTOM },
					});
				},
				stop() {
					L.dispatch({
						type: 'LOCAL_ACTIVITY_UPDATE',
						activity: null,
					}),
						oi.close();
				},
			});
		});
	var uc,
		Fg = m(() => {
			'use strict';
			a();
			w();
			T();
			uc = g({
				name: 'BANger',
				description:
					'Replaces the GIF in the ban dialogue with a custom one.',
				authors: [p.Xinto, p.Glitch],
				patches: [
					{
						find: 'BAN_CONFIRM_TITLE.',
						replacement: {
							match: /src:\w\(\d+\)/g,
							replace:
								'src: Vencord.Settings.plugins.BANger.source',
						},
					},
				],
				options: {
					source: {
						description:
							'Source to replace ban GIF with (Video or Gif)',
						type: 0,
						default: 'https://i.imgur.com/wp5q52C.mp4',
						restartNeeded: !0,
					},
				},
			});
		});
	var Bg = m(() => {});
	function Ax(e) {
		let t = Vencord.Plugins.plugins.BetterFolders.Guilds(e),
			n = t.props.children?.props?.children?.[1]?.props;
		if (n?.children) {
			let i = n.children.find(
				(r) => r?.props?.['aria-label'] === nt.Messages.SERVERS,
			);
			i && (n.children = i);
		}
		return t;
	}
	var Cx,
		$g,
		Ug,
		Gg,
		Hg,
		zg,
		jg = m(() => {
			'use strict';
			a();
			E();
			je();
			re();
			_();
			x();
			(Cx = Ue('vc-bf-')),
				($g = P('sidebar', 'guilds')),
				(Ug = P('a', 'animated', 'useTransition')),
				(Gg = ue('ChannelRTCStore')),
				(Hg = ue('ExpandedGuildFolderStore'));
			zg = k.wrap(
				() => {
					let e = Be([Hg], () => Hg.getExpandedFolders()),
						t = Be([Gg], () => Gg.isFullscreenInContext()),
						n = document.querySelector(`.${$g.guilds}`),
						i = !!e.size,
						r = Cx('folder-sidebar', { fullscreen: t }),
						s = o(Ax, {
							className: $g.guilds,
							bfGuildFolders: Array.from(e),
						});
					return !n || !M.plugins.BetterFolders.sidebarAnim
						? i
							? o('div', { className: r }, s)
							: null
						: o(
								Ug.Transition,
								{
									items: i,
									from: { width: 0 },
									enter: {
										width: n.getBoundingClientRect().width,
									},
									leave: { width: 0 },
									config: { duration: 200 },
								},
								(l, c) =>
									c &&
									o(
										Ug.animated.div,
										{ style: l, className: r },
										s,
									),
						  );
				},
				{ noop: !0 },
			);
		});
	var Nx,
		kx,
		pc,
		dc,
		qn,
		mc,
		Wg = m(() => {
			'use strict';
			a();
			Bg();
			E();
			w();
			T();
			_();
			x();
			jg();
			(Nx = Ce((e) => e.prototype?.convertToFolder)),
				(kx = ue('SortedGuildStore')),
				(pc = ue('ExpandedGuildFolderStore')),
				(dc = P('move', 'toggleGuildFolderExpand')),
				(qn = N({
					sidebar: {
						type: 3,
						description:
							'Display servers from folder on dedicated sidebar',
						default: !0,
					},
					sidebarAnim: {
						type: 3,
						description: 'Animate opening the folder sidebar',
						default: !0,
					},
					closeAllFolders: {
						type: 3,
						description:
							'Close all folders when selecting a server not in a folder',
						default: !1,
					},
					closeAllHomeButton: {
						type: 3,
						description:
							'Close all folders when clicking on the home button',
						default: !1,
					},
					closeOthers: {
						type: 3,
						description:
							'Close other folders when opening a folder',
						default: !1,
					},
					forceOpen: {
						type: 3,
						description:
							'Force a folder to open when switching to a server of that folder',
						default: !1,
					},
				})),
				(mc = g({
					name: 'BetterFolders',
					description:
						'Shows server folders on dedicated sidebar and adds folder related improvements',
					authors: [p.juby, p.AutumnVN],
					patches: [
						{
							find: '("guildsnav")',
							predicate: () => qn.store.sidebar,
							replacement: [
								{
									match: /(\i)\(\){return \i\(\(0,\i\.jsx\)\("div",{className:\i\(\)\.guildSeparator}\)\)}/,
									replace: '$&$self.Separator=$1;',
								},
								{
									match: /\i\(\(function\(\i,\i,\i\){var \i=\i\.key;return.+\(\i\)},\i\)}\)\)/,
									replace:
										'arguments[0].bfHideServers?null:$&',
								},
								{
									match: /(\i)\.themeOverride,(.{15,25}\(function\(\){var \i=)(\i\.\i\.getGuildsTree\(\))/,
									replace:
										'$1.themeOverride,bfPatch=$1.bfGuildFolders,$2bfPatch?$self.getGuildsTree(bfPatch,$3):$3',
								},
								{
									match: /return(\(0,\i\.jsx\))(\(\i,{)(folderNode:\i,setNodeRef:\i\.setNodeRef,draggable:!0,.+},\i\.id\));case/,
									replace:
										"var bfHideServers=typeof bfPatch==='undefined',folder=$1$2bfHideServers,$3;return !bfHideServers&&arguments[1]?[$1($self.Separator,{}),folder]:folder;case",
								},
								{
									match: /\("guildsnav"\);return\(0,\i\.jsx\)\(.{1,6},{navigator:\i,children:\(0,\i\.jsx\)\(/,
									replace: '$&$self.Guilds=',
								},
							],
						},
						{
							find: 'APPLICATION_LIBRARY,render',
							predicate: () => qn.store.sidebar,
							replacement: {
								match: /(\(0,\i\.jsx\))\(\i\..,{className:\i\(\)\.guilds,themeOverride:\i}\)/,
								replace: '$&,$1($self.FolderSideBar,{})',
							},
						},
						{
							find: '("guildsnav")',
							predicate: () => qn.store.closeAllHomeButton,
							replacement: {
								match: ',onClick:function(){if(!__OVERLAY__){',
								replace: '$&$self.closeFolders();',
							},
						},
					],
					settings: qn,
					start() {
						let e = (t) =>
							kx
								.getGuildFolders()
								.find((n) => n.guildIds.includes(t));
						L.subscribe(
							'CHANNEL_SELECT',
							(this.onSwitch = (t) => {
								if (
									!(
										!qn.store.closeAllFolders &&
										!qn.store.forceOpen
									) &&
									this.lastGuildId !== t.guildId
								) {
									this.lastGuildId = t.guildId;
									let n = e(t.guildId);
									n?.folderId
										? qn.store.forceOpen &&
										  !pc.isFolderExpanded(n.folderId) &&
										  dc.toggleGuildFolderExpand(n.folderId)
										: qn.store.closeAllFolders &&
										  this.closeFolders();
								}
							}),
						),
							L.subscribe(
								'TOGGLE_GUILD_FOLDER_EXPAND',
								(this.onToggleFolder = (t) => {
									qn.store.closeOthers &&
										!this.dispatching &&
										L.wait(() => {
											let n = pc.getExpandedFolders();
											if (n.size > 1) {
												this.dispatching = !0;
												for (let i of n)
													i !== t.folderId &&
														dc.toggleGuildFolderExpand(
															i,
														);
												this.dispatching = !1;
											}
										});
								}),
							);
					},
					stop() {
						L.unsubscribe('CHANNEL_SELECT', this.onSwitch),
							L.unsubscribe(
								'TOGGLE_GUILD_FOLDER_EXPAND',
								this.onToggleFolder,
							);
					},
					FolderSideBar: zg,
					getGuildsTree(e, t) {
						let n = new Nx();
						return (
							(n.root.children = t.root.children.filter((i) =>
								e.includes(i.id),
							)),
							(n.nodes = e.map((i) => t.nodes[i])),
							n
						);
					},
					closeFolders() {
						for (let e of pc.getExpandedFolders())
							dc.toggleGuildFolderExpand(e);
					},
				}));
		});
	var fc,
		qg = m(() => {
			'use strict';
			a();
			w();
			T();
			fc = g({
				name: 'BetterGifAltText',
				authors: [p.Ven],
				description:
					"Change GIF alt text from simply being 'GIF' to containing the gif tags / filename",
				patches: [
					{
						find: 'onCloseImage=',
						replacement: {
							match: /(return.{0,10}\.jsx.{0,50}isWindowFocused)/,
							replace: '$self.altify(e);$1',
						},
					},
					{
						find: 'preload:"none","aria',
						replacement: {
							match: /(?<==(.{1,3})\.alt.{0,20})\?.{0,5}\.Messages\.GIF/,
							replace: "?($1.alt='GIF',$self.altify($1))",
						},
					},
				],
				altify(e) {
					if (e.alt !== 'GIF') return e.alt;
					let t = e.original || e.src;
					try {
						t = decodeURI(t);
					} catch {}
					let n = t
						.slice(t.lastIndexOf('/') + 1)
						.replace(/\d/g, '')
						.replace(/.gif$/, '')
						.split(/[,\-_ ]+/g)
						.slice(0, 20)
						.join(' ');
					return (
						n.length > 300 && (n = n.slice(0, 300) + '...'),
						n && (e.alt += ` - ${n}`),
						e.alt
					);
				},
			});
		});
	var gc,
		Kg = m(() => {
			'use strict';
			a();
			E();
			w();
			T();
			gc = g({
				name: 'BetterNotesBox',
				description:
					'Hide notes or disable spellcheck (Configure in settings!!)',
				authors: [p.Ven],
				patches: [
					{
						find: 'hideNote:',
						all: !0,
						predicate: () =>
							Vencord.Settings.plugins.BetterNotesBox.hide,
						replacement: {
							match: /hideNote:.+?(?=[,}])/g,
							replace: 'hideNote:true',
						},
					},
					{
						find: 'Messages.NOTE_PLACEHOLDER',
						replacement: {
							match: /\.NOTE_PLACEHOLDER,/,
							replace:
								'$&spellCheck:!Vencord.Settings.plugins.BetterNotesBox.noSpellCheck,',
						},
					},
				],
				options: {
					hide: {
						type: 3,
						description: 'Hide notes',
						default: !1,
						restartNeeded: !0,
					},
					noSpellCheck: {
						type: 3,
						description: 'Disable spellcheck in notes',
						disabled: () => M.plugins.BetterNotesBox.hide,
						default: !1,
					},
				},
			});
		});
	var hc,
		Yg = m(() => {
			'use strict';
			a();
			E();
			w();
			T();
			x();
			hc = g({
				name: 'BetterRoleDot',
				authors: [p.Ven],
				description:
					'Copy role colour on RoleDot (accessibility setting) click. Also allows using both RoleDot and coloured names simultaneously',
				patches: [
					{
						find: '.dotBorderBase',
						replacement: {
							match: /,viewBox:"0 0 20 20"/,
							replace:
								"$&,onClick:()=>$self.copyToClipBoard(arguments[0].color),style:{cursor:'pointer'}",
						},
					},
					{
						find: '"dot"===',
						all: !0,
						predicate: () => M.plugins.BetterRoleDot.bothStyles,
						replacement: {
							match: /"(?:username|dot)"===\i(?!\.\i)/g,
							replace: 'true',
						},
					},
				],
				options: {
					bothStyles: {
						type: 3,
						description: 'Show both role dot and coloured names',
						default: !1,
					},
				},
				copyToClipBoard(e) {
					jt.copy(e),
						Q.show({
							message: 'Copied to Clipboard!',
							type: Q.Type.SUCCESS,
							id: Q.genId(),
							options: {
								duration: 1e3,
								position: Q.Position.BOTTOM,
							},
						});
				},
			});
		});
	var yc,
		Zg = m(() => {
			'use strict';
			a();
			w();
			T();
			yc = g({
				name: 'BetterUploadButton',
				authors: [p.obscurity, p.Ven],
				description:
					'Upload with a single click, open menu with right click',
				patches: [
					{
						find: 'Messages.CHAT_ATTACH_UPLOAD_OR_INVITE',
						replacement: {
							match: /CHAT_ATTACH_UPLOAD_OR_INVITE,onDoubleClick:(.+?:void 0)\},(.{1,3})\)/,
							replace: (e, t, n) =>
								`${e.slice(
									0,
									-1,
								)},{onClick:${t},onContextMenu:${n}.onClick})`,
						},
					},
				],
			});
		});
	function Xg() {
		Xi.textContent = `
        .vc-nsfw-img [class^=imageWrapper] img,
        .vc-nsfw-img [class^=wrapperPaused] video {
            filter: blur(${M.plugins.BlurNSFW.blurAmount}px);
            transition: filter 0.2s;
        }
        .vc-nsfw-img [class^=imageWrapper]:hover img,
        .vc-nsfw-img [class^=wrapperPaused]:hover video {
            filter: unset;
        }
        `;
	}
	var Xi,
		vc,
		Jg = m(() => {
			'use strict';
			a();
			E();
			w();
			T();
			vc = g({
				name: 'BlurNSFW',
				description: 'Blur attachments in NSFW channels until hovered',
				authors: [p.Ven],
				patches: [
					{
						find: '.embedWrapper,embed',
						replacement: [
							{
								match: /(\.renderEmbed=.+?(.)=.\.props)(.+?\.embedWrapper)/g,
								replace:
									"$1,vcProps=$2$3+(vcProps.channel.nsfw?' vc-nsfw-img':'')",
							},
							{
								match: /(\.renderAttachments=.+?(.)=this\.props)(.+?\.embedWrapper)/g,
								replace:
									"$1,vcProps=$2$3+(vcProps.channel.nsfw?' vc-nsfw-img':'')",
							},
						],
					},
				],
				options: {
					blurAmount: {
						type: 1,
						description: 'Blur Amount',
						default: 10,
						onChange: Xg,
					},
				},
				start() {
					(Xi = document.createElement('style')),
						(Xi.id = 'VcBlurNsfw'),
						document.head.appendChild(Xi),
						Xg();
				},
				stop() {
					Xi?.remove();
				},
			});
		});
	function Lx(e) {
		let t = M.plugins.CallTimer.format === 'human',
			n = (f) => (t ? f : f.toString().padStart(2, '0')),
			i = (f) => (t ? f : ''),
			r = t ? ' ' : ':',
			s = Math.floor(e / 864e5),
			l = Math.floor((e % 864e5) / 36e5),
			c = Math.floor(((e % 864e5) % 36e5) / 6e4),
			u = Math.floor((((e % 864e5) % 36e5) % 6e4) / 1e3),
			h = '';
		return (
			s && (h += `${s}d `),
			(l || h) && (h += `${n(l)}${i('h')}${r}`),
			(c || h || !t) && (h += `${n(c)}${i('m')}${r}`),
			(h += `${n(u)}${i('s')}`),
			h
		);
	}
	var Sc,
		Qg = m(() => {
			'use strict';
			a();
			E();
			re();
			w();
			T();
			x();
			Sc = g({
				name: 'CallTimer',
				description: 'Adds a timer to vcs',
				authors: [p.Ven],
				startTime: 0,
				interval: void 0,
				options: {
					format: {
						type: 4,
						description:
							'The timer format. This can be any valid moment.js format',
						options: [
							{
								label: '30d 23:00:42',
								value: 'stopwatch',
								default: !0,
							},
							{ label: '30d 23h 00m 42s', value: 'human' },
						],
					},
				},
				patches: [
					{
						find: '.renderConnectionStatus=',
						replacement: {
							match: /(?<=renderConnectionStatus=.+\.channel,children:)\w/,
							replace:
								'[$&, $self.renderTimer(this.props.channel.id)]',
						},
					},
				],
				renderTimer(e) {
					return o(k, { noop: !0 }, o(this.Timer, { channelId: e }));
				},
				Timer({ channelId: e }) {
					let [t, n] = I.useState(0),
						i = I.useMemo(() => Date.now(), [e]);
					return (
						I.useEffect(() => {
							let r = setInterval(() => n(Date.now() - i), 1e3);
							return () => {
								clearInterval(r), n(0);
							};
						}, [e]),
						o(
							'p',
							{ style: { margin: 0 } },
							'Connected for ',
							Lx(t),
						)
					);
				},
			});
		});
	var Ic = {};
	me(Ic, {
		_handleClick: () => Ox,
		_handlePreEdit: () => Dx,
		_handlePreSend: () => Ex,
		addClickListener: () => Mc,
		addPreEditListener: () => Kn,
		addPreSendListener: () => rt,
		removeClickListener: () => Pc,
		removePreEditListener: () => Yn,
		removePreSendListener: () => st,
	});
	async function Ex(e, t, n, i) {
		n.replyOptions = i;
		for (let r of Tc)
			try {
				let s = await r(e, t, n);
				if (s && s.cancel === !0) return !0;
			} catch (s) {
				bc.error(
					`MessageSendHandler: Listener encountered an unknown error
`,
					s,
				);
			}
		return !1;
	}
	async function Dx(e, t, n) {
		for (let i of xc)
			try {
				await i(e, t, n);
			} catch (r) {
				bc.error(
					`MessageEditHandler: Listener encountered an unknown error
`,
					r,
				);
			}
	}
	function rt(e) {
		return Tc.add(e), e;
	}
	function Kn(e) {
		return xc.add(e), e;
	}
	function st(e) {
		return Tc.delete(e);
	}
	function Yn(e) {
		return xc.delete(e);
	}
	function Ox(e, t, n) {
		e = cn.getMessage(t.id, e.id) ?? e;
		for (let i of wc)
			try {
				i(e, t, n);
			} catch (r) {
				bc.error(
					`MessageClickHandler: Listener encountered an unknown error
`,
					r,
				);
			}
	}
	function Mc(e) {
		return wc.add(e), e;
	}
	function Pc(e) {
		return wc.delete(e);
	}
	var bc,
		Tc,
		xc,
		wc,
		gn = m(() => {
			'use strict';
			a();
			Se();
			x();
			(bc = new Z('MessageEvents', '#e5c890')),
				(Tc = new Set()),
				(xc = new Set());
			wc = new Set();
		});
	var Vg,
		eh = m(() => {
			'use strict';
			a();
			Vg = [
				'action_object_map',
				'action_type_map',
				'action_ref_map',
				'spm@*.aliexpress.com',
				'scm@*.aliexpress.com',
				'aff_platform',
				'aff_trace_key',
				'algo_expid@*.aliexpress.*',
				'algo_pvid@*.aliexpress.*',
				'btsid',
				'ws_ab_test',
				'pd_rd_*@amazon.*',
				'_encoding@amazon.*',
				'psc@amazon.*',
				'tag@amazon.*',
				'ref_@amazon.*',
				'pf_rd_*@amazon.*',
				'pf@amazon.*',
				'crid@amazon.*',
				'keywords@amazon.*',
				'sprefix@amazon.*',
				'sr@amazon.*',
				'ie@amazon.*',
				'node@amazon.*',
				'qid@amazon.*',
				'callback@bilibili.com',
				'cvid@bing.com',
				'form@bing.com',
				'sk@bing.com',
				'sp@bing.com',
				'sc@bing.com',
				'qs@bing.com',
				'pq@bing.com',
				'sc_cid',
				'mkt_tok',
				'trk',
				'trkCampaign',
				'ga_*',
				'gclid',
				'gclsrc',
				'hmb_campaign',
				'hmb_medium',
				'hmb_source',
				'spReportId',
				'spJobID',
				'spUserID',
				'spMailingID',
				'itm_*',
				's_cid',
				'elqTrackId',
				'elqTrack',
				'assetType',
				'assetId',
				'recipientId',
				'campaignId',
				'siteId',
				'mc_cid',
				'mc_eid',
				'pk_*',
				'sc_campaign',
				'sc_channel',
				'sc_content',
				'sc_medium',
				'sc_outcome',
				'sc_geo',
				'sc_country',
				'nr_email_referer',
				'vero_conv',
				'vero_id',
				'yclid',
				'_openstat',
				'mbid',
				'cmpid',
				'cid',
				'c_id',
				'campaign_id',
				'Campaign',
				'hash@ebay.*',
				'fb_action_ids',
				'fb_action_types',
				'fb_ref',
				'fb_source',
				'fbclid',
				'refsrc@facebook.com',
				'hrc@facebook.com',
				'gs_l',
				'gs_lcp@google.*',
				'ved@google.*',
				'ei@google.*',
				'sei@google.*',
				'gws_rd@google.*',
				'gs_gbg@google.*',
				'gs_mss@google.*',
				'gs_rn@google.*',
				'_hsenc',
				'_hsmi',
				'__hssc',
				'__hstc',
				'hsCtaTracking',
				'source@sourceforge.net',
				'position@sourceforge.net',
				't@*.twitter.com',
				's@*.twitter.com',
				'ref_*@*.twitter.com',
				'tt_medium',
				'tt_content',
				'lr@yandex.*',
				'redircnt@yandex.*',
				'feature@youtube.com',
				'kw@youtube.com',
				'wt_zmc',
				'utm_source',
				'utm_content',
				'utm_medium',
				'utm_campaign',
				'utm_term',
				'si@open.spotify.com',
			];
		});
	var th,
		_x,
		Rc,
		nh = m(() => {
			'use strict';
			a();
			gn();
			w();
			T();
			eh();
			(th = /[\\^$.*+?()[\]{}|]/g),
				(_x = RegExp(th.source)),
				(Rc = g({
					name: 'ClearURLs',
					description: 'Removes tracking garbage from URLs',
					authors: [p.adryd],
					dependencies: ['MessageEventsAPI'],
					escapeRegExp(e) {
						return e && _x.test(e)
							? e.replace(th, '\\$&')
							: e || '';
					},
					createRules() {
						let e = Vg;
						(this.universalRules = new Set()),
							(this.rulesByHost = new Map()),
							(this.hostRules = new Map());
						for (let t of e) {
							let n = t.split('@'),
								i = new RegExp(
									'^' +
										this.escapeRegExp(n[0]).replace(
											/\\\*/,
											'.+?',
										) +
										'$',
								);
							if (!n[1]) {
								this.universalRules.add(i);
								continue;
							}
							let r = new RegExp(
									'^(www\\.)?' +
										this.escapeRegExp(n[1])
											.replace(/\\\./, '\\.')
											.replace(/^\\\*\\\./, '(.+?\\.)?')
											.replace(/\\\*/, '.+?') +
										'$',
								),
								s = r.toString();
							this.hostRules.set(s, r),
								this.rulesByHost.get(s) == null &&
									this.rulesByHost.set(s, new Set()),
								this.rulesByHost.get(s).add(i);
						}
					},
					removeParam(e, t, n) {
						(t === e || (e instanceof RegExp && e.test(t))) &&
							n.delete(t);
					},
					replacer(e) {
						try {
							var t = new URL(e);
						} catch {
							return e;
						}
						return t.searchParams.entries().next().done
							? e
							: (this.universalRules.forEach((n) => {
									t.searchParams.forEach((i, r, s) => {
										this.removeParam(n, r, s);
									});
							  }),
							  this.hostRules.forEach((n, i) => {
									!n.test(t.hostname) ||
										this.rulesByHost.get(i).forEach((r) => {
											t.searchParams.forEach(
												(s, l, c) => {
													this.removeParam(r, l, c);
												},
											);
										});
							  }),
							  t.toString());
					},
					onSend(e) {
						e.content.match(/http(s)?:\/\//) &&
							(e.content = e.content.replace(
								/(https?:\/\/[^\s<]+[^<.,:;"'>)|\]\s])/g,
								(t) => this.replacer(t),
							));
					},
					start() {
						this.createRules(),
							(this.preSend = rt((e, t) => this.onSend(t))),
							(this.preEdit = Kn((e, t, n) => this.onSend(n)));
					},
					stop() {
						st(this.preSend), Yn(this.preEdit);
					},
				}));
		});
	var Cc,
		oh = m(() => {
			'use strict';
			a();
			w();
			T();
			Cc = g({
				name: 'ColorSighted',
				description:
					'Removes the colorblind-friendly icons from statuses, just like 2015-2017 Discord',
				authors: [p.lewisakura],
				patches: [
					{
						find: 'Masks.STATUS_ONLINE',
						replacement: {
							match: /Masks\.STATUS_(?:IDLE|DND|STREAMING|OFFLINE)/g,
							replace: 'Masks.STATUS_ONLINE',
						},
					},
					{
						find: '.AVATAR_STATUS_MOBILE_16;',
						replacement: {
							match: /(\.fromIsMobile,.+?)\i.status/,
							replace: (e, t) => `${t}"online"`,
						},
					},
				],
			});
		});
	function Ms() {
		window.VencordDesktopNative.app.relaunch();
	}
	var Ji = m(() => {
		'use strict';
		a();
	});
	var Fx,
		Ac,
		ih = m(() => {
			'use strict';
			a();
			w();
			Ji();
			Fi();
			T();
			_();
			_();
			x();
			(Fx = (e) => () => {
				throw new Error(`'${e}' is Discord Desktop only.`);
			}),
				(Ac = g({
					name: 'ConsoleShortcuts',
					description:
						'Adds shorter Aliases for many things on the window. Run `shortcutList` for a list.',
					authors: [p.Ven],
					getShortcuts() {
						function e(n) {
							let i = new Map();
							return function (...r) {
								let s = String(r);
								if (i.has(s)) return i.get(s);
								let l = Yo(n(...r)),
									c = (() => {
										switch (l.length) {
											case 0:
												return null;
											case 1:
												return l[0];
											default:
												let u = [...new Set(l)];
												return (
													u.length > 1 &&
														console.warn(
															`Warning: This filter matches ${l.length} modules. Make it more specific!
`,
															u,
														),
													l[0]
												);
										}
									})();
								return c && s && i.set(s, c), c;
							};
						}
						let t;
						return {
							wp: Vencord.Webpack,
							wpc: Ft.c,
							wreq: Ft,
							wpsearch: el,
							wpex: tl,
							wpexs: (n) =>
								Vencord.Webpack.extract(
									Vencord.Webpack.findModuleId(n),
								),
							find: e((n) => n),
							findAll: Yo,
							findByProps: e(Y.byProps),
							findAllByProps: (...n) => Yo(Y.byProps(...n)),
							findByCode: e(Y.byCode),
							findAllByCode: (n) => Yo(Y.byCode(n)),
							findStore: e(Y.byStoreName),
							PluginsApi: Vencord.Plugins,
							plugins: Vencord.Plugins.plugins,
							React: I,
							Settings: Vencord.Settings,
							Api: Vencord.Api,
							reload: () => location.reload(),
							restart: Fx('restart'),
							canonicalizeMatch: No,
							canonicalizeReplace: as,
							canonicalizeReplacement: _i,
							fakeRender: (n, i) => {
								let r = t?.deref(),
									s =
										r?.closed === !1
											? r
											: window.open(
													'about:blank',
													'Fake Render',
													'popup,width=500,height=500',
											  );
								(t = new WeakRef(s)),
									s.focus(),
									Ro.render(
										I.createElement(n, i),
										s.document.body,
									);
							},
						};
					},
					start() {
						let e = this.getShortcuts();
						window.shortcutList = e;
						for (let [t, n] of Object.entries(e)) window[t] = n;
					},
					stop() {
						delete window.shortcutList;
						for (let e in this.getShortcuts()) delete window[e];
					},
				}));
		});
	var kc = {};
	me(kc, {
		UpdateLogger: () => rh,
		changes: () => Ps,
		checkForUpdates: () => ah,
		getRepo: () => Bx,
		isNewer: () => Nc,
		isOutdated: () => uo,
		maybePromptToUpdate: () => Qi,
		update: () => lh,
		updateError: () => sh,
	});
	async function Is(e) {
		let t = await e;
		if (t.ok) return t.value;
		throw ((sh = t.error), t.error);
	}
	async function ah() {
		return (
			(Ps = await Is(VencordNative.updater.getUpdates())),
			Ps.some((e) => e.hash === on)
				? ((Nc = !0), (uo = !1))
				: (uo = Ps.length > 0)
		);
	}
	async function lh() {
		if (!uo) return !0;
		let e = await Is(VencordNative.updater.update());
		if (e && ((uo = !1), !(await Is(VencordNative.updater.rebuild()))))
			throw new Error(
				'The Build failed. Please try manually building the new update',
			);
		return e;
	}
	async function Qi(e, t = !1) {
		return;
		try {
			if (await ah()) {
				let i = confirm(e);
				if (i && Nc)
					return alert(
						'Your local copy has more recent commits. Please stash or reset them.',
					);
				i && (await lh(), Ms());
			}
		} catch (n) {
			rh.error(n),
				alert(
					'That also failed :( Try updating or re-installing with the installer!',
				);
		}
	}
	var rh,
		uo,
		Nc,
		sh,
		Ps,
		Bx,
		ii = m(() => {
			'use strict';
			a();
			Ii();
			Se();
			Ji();
			(rh = new Z('Updater', 'white')), (uo = !1), (Nc = !1);
			Bx = () => Is(VencordNative.updater.getRepo());
		});
	var po,
		Lc,
		Ec,
		Rs,
		Dc,
		Oc,
		ch = m(() => {
			'use strict';
			a();
			so();
			E();
			w();
			Se();
			ze();
			T();
			ii();
			x();
			(po = new Z('CrashHandler')),
				(Lc = N({
					attemptToPreventCrashes: {
						type: 3,
						description:
							'Whether to attempt to prevent Discord crashes.',
						default: !0,
					},
					attemptToNavigateToHome: {
						type: 3,
						description:
							'Whether to attempt to navigate to the home when preventing Discord crashes.',
						default: !1,
					},
				})),
				(Ec = 0),
				(Rs = 0),
				(Dc = !1),
				(Oc = g({
					name: 'CrashHandler',
					description:
						'Utility plugin for handling and possibly recovering from Crashes without a restart',
					authors: [p.Nuckyz],
					enabledByDefault: !0,
					popAllModals: void 0,
					settings: Lc,
					patches: [
						{
							find: '.Messages.ERRORS_UNEXPECTED_CRASH',
							replacement: {
								match: /(?=this\.setState\()/,
								replace: '$self.handleCrash(this)||',
							},
						},
						{
							find: 'dispatch({type:"MODAL_POP_ALL"})',
							replacement: {
								match: /"MODAL_POP_ALL".+?};(?<=(\i)=function.+?)/,
								replace: (e, t) =>
									`${e}$self.popAllModals=${t};`,
							},
						},
					],
					handleCrash(e) {
						if (Date.now() - Rs <= 1e3 && !Dc) return !0;
						if (((Dc = !1), ++Ec > 5)) {
							try {
								ge({
									color: '#eed202',
									title: 'Discord has crashed!',
									body: 'Awn :( Discord has crashed more than five times, not attempting to recover.',
									noPersist: !0,
								});
							} catch {}
							return (Rs = Date.now()), !1;
						}
						setTimeout(() => Ec--, 6e4);
						try {
							return (
								Ec === 1 &&
									Qi(
										'Uh oh, Discord has just crashed... but good news, there is a Vencord update available that might fix this issue! Would you like to update now?',
										!0,
									),
								Lc.store.attemptToPreventCrashes
									? (this.handlePreventCrash(e), !0)
									: !1
							);
						} catch (t) {
							return po.error('Failed to handle crash', t), !1;
						} finally {
							Rs = Date.now();
						}
					},
					handlePreventCrash(e) {
						if (Date.now() - Rs >= 1e3)
							try {
								ge({
									color: '#eed202',
									title: 'Discord has crashed!',
									body: 'Attempting to recover...',
									noPersist: !0,
								});
							} catch {}
						try {
							L.dispatch({ type: 'CONTEXT_MENU_CLOSE' });
						} catch (t) {
							po.debug('Failed to close open context menu.', t);
						}
						try {
							this.popAllModals?.();
						} catch (t) {
							po.debug('Failed to close old modals.', t);
						}
						try {
							ml();
						} catch (t) {
							po.debug('Failed to close all open modals.', t);
						}
						try {
							L.dispatch({ type: 'USER_PROFILE_MODAL_CLOSE' });
						} catch (t) {
							po.debug('Failed to close user popout.', t);
						}
						try {
							L.dispatch({ type: 'LAYER_POP_ALL' });
						} catch (t) {
							po.debug('Failed to pop all layers.', t);
						}
						if (Lc.store.attemptToNavigateToHome)
							try {
								Ei.transitionTo('/channels/@me');
							} catch (t) {
								po.debug('Failed to navigate to home', t);
							}
						try {
							(Dc = !0), e.forceUpdate();
						} catch (t) {
							po.debug(
								'Failed to update crash handler component.',
								t,
							);
						}
					},
				}));
		});
	async function uh(e) {
		return (await Hx.getAsset(As.store.appID, [e, void 0]))[0];
	}
	async function dh() {
		let {
			appID: e,
			appName: t,
			details: n,
			state: i,
			type: r,
			startTime: s,
			endTime: l,
			imageBig: c,
			imageBigTooltip: u,
			imageSmall: h,
			imageSmallTooltip: f,
			buttonOneText: v,
			buttonOneURL: S,
			buttonTwoText: b,
			buttonTwoURL: A,
		} = As.store;
		if (!t) return;
		let C = {
			application_id: e || '0',
			name: t,
			state: i,
			details: n,
			type: r,
			flags: 1 << 0,
		};
		s && ((C.timestamps = { start: s }), l && (C.timestamps.end = l)),
			v &&
				((C.buttons = [v, b].filter(is)),
				(C.metadata = { button_urls: [S, A].filter(is) })),
			c && (C.assets = { large_image: await uh(c), large_text: u }),
			h &&
				(C.assets = {
					...C.assets,
					small_image: await uh(h),
					small_text: f,
				});
		for (let D in C) {
			if (D === 'type') continue;
			let B = C[D];
			(!B || B.length === 0) && delete C[D];
		}
		return C;
	}
	async function Vi(e) {
		let t = await dh();
		L.dispatch({
			type: 'LOCAL_ACTIVITY_UPDATE',
			activity: e ? null : t,
			socketId: 'CustomRPC',
		});
	}
	var $x,
		Ux,
		Gx,
		Hx,
		Xt,
		ph,
		Cs,
		zx,
		As,
		_c,
		mh = m(() => {
			'use strict';
			a();
			E();
			Wn();
			w();
			dl();
			ye();
			T();
			_();
			x();
			($x = ce('onOpenGameProfile')),
				(Ux = P('activity', 'buttonColor')),
				(Gx = P('profileColors')),
				(Hx = Ye(
					'getAssetImage: size must === [number, number] for Twitch',
					{ getAsset: Y.byCode('apply(') },
				));
			(Xt = (e) => ({ type: 0, description: e, onChange: Vi })),
				(ph = (e) => ({ type: 1, description: e, onChange: Vi })),
				(Cs = (e, t, n) => ({ label: e, value: t, default: n })),
				(zx = (e, t) => ({
					type: 4,
					description: e,
					onChange: Vi,
					options: t,
				})),
				(As = N({
					appID: Xt(
						'The ID of the application for the rich presence.',
					),
					appName: Xt('The name of the presence.'),
					details: Xt('Line 1 of rich presence.'),
					state: Xt('Line 2 of rich presence.'),
					type: zx('Type of presence', [
						Cs('Playing', 0, !0),
						Cs('Listening', 2),
						Cs('Watching', 3),
						Cs('Competing', 5),
					]),
					startTime: ph('Unix Timestamp for beginning of activity.'),
					endTime: ph('Unix Timestamp for end of activity.'),
					imageBig: Xt('Sets the big image to the specified image.'),
					imageBigTooltip: Xt(
						'Sets the tooltip text for the big image.',
					),
					imageSmall: Xt(
						'Sets the small image to the specified image.',
					),
					imageSmallTooltip: Xt(
						'Sets the tooltip text for the small image.',
					),
					buttonOneText: Xt('The text for the first button'),
					buttonOneURL: Xt('The URL for the first button'),
					buttonTwoText: Xt('The text for the second button'),
					buttonTwoURL: Xt('The URL for the second button'),
				}));
			_c = g({
				name: 'CustomRPC',
				description: 'Allows you to set a custom rich presence.',
				authors: [p.captain],
				start: Vi,
				stop: () => Vi(!0),
				settings: As,
				settingsAboutComponent: () => {
					let e = ut(dh);
					return o(
						d,
						null,
						o(y.FormTitle, { tag: 'h2' }, 'NOTE:'),
						o(
							y.FormText,
							null,
							'You will need to ',
							o(
								We,
								{
									href: 'https://discord.com/developers/applications',
								},
								'create an application',
							),
							' and get its ID to use this plugin.',
						),
						o(y.FormDivider, null),
						o(
							'div',
							{
								style: { width: '284px' },
								className: Gx.profileColors,
							},
							e[0] &&
								o($x, {
									activity: e[0],
									className: Ux.activity,
									channelId: fe.getChannelId(),
									guild: le.getGuild(
										Xo.getLastSelectedGuildId(),
									),
									application: { id: As.store.appID },
									user: U.getCurrentUser(),
								}),
						),
					);
				},
			});
		});
	var Fc,
		fh = m(() => {
			'use strict';
			a();
			w();
			T();
			Fc = g({
				name: 'DisableDMCallIdle',
				description:
					'Disables automatically getting kicked from a DM voice call after 5 minutes.',
				authors: [p.Nuckyz],
				patches: [
					{
						find: '.Messages.BOT_CALL_IDLE_DISCONNECT',
						replacement: {
							match: /(?<=function \i\(\){)(?=.{1,100}\.Messages\.BOT_CALL_IDLE_DISCONNECT)/,
							replace: 'return;',
						},
					},
				],
			});
		});
	var $c = {};
	me($c, {
		_patchContextMenu: () => qx,
		addContextMenuPatch: () => we,
		addGlobalContextMenuPatch: () => jx,
		findGroupChildrenByChildId: () => Lt,
		globalPatches: () => Ns,
		navPatches: () => er,
		removeContextMenuPatch: () => Ae,
		removeGlobalContextMenuPatch: () => Wx,
	});
	function we(e, t) {
		Array.isArray(e) || (e = [e]);
		for (let n of e) {
			let i = er.get(n);
			i || ((i = new Set()), er.set(n, i)), i.add(t);
		}
	}
	function jx(e) {
		Ns.add(e);
	}
	function Ae(e, t) {
		let i = (Array.isArray(e) ? e : [e]).map(
			(r) => er.get(r)?.delete(t) ?? !1,
		);
		return Array.isArray(e) ? i : i[0];
	}
	function Wx(e) {
		return Ns.delete(e);
	}
	function Lt(e, t, n) {
		for (let i of t) {
			if (i == null) continue;
			if (
				(Array.isArray(e) && e.some((s) => i.props?.id === s)) ||
				i.props?.id === e
			)
				return n ?? null;
			let r = i.props?.children;
			if (r) {
				Array.isArray(r) || ((r = [r]), (i.props.children = r));
				let s = Lt(e, r, r);
				if (s !== null) return s;
			}
		}
		return null;
	}
	function qx(e) {
		e.contextMenuApiArguments ??= [];
		let t = er.get(e.navId);
		if ((Array.isArray(e.children) || (e.children = [e.children]), t))
			for (let n of t)
				try {
					let i = n(e.children, ...e.contextMenuApiArguments);
					Bc.has(e) || i?.();
				} catch (i) {
					gh.error(`Patch for ${e.navId} errored,`, i);
				}
		for (let n of Ns)
			try {
				let i = n(e.navId, e.children, ...e.contextMenuApiArguments);
				Bc.has(e) || i?.();
			} catch (i) {
				gh.error('Global patch errored,', i);
			}
		Bc.add(e);
	}
	var gh,
		er,
		Ns,
		Bc,
		Jt = m(() => {
			'use strict';
			a();
			Se();
			(gh = new Z('ContextMenu')), (er = new Map()), (Ns = new Set());
			Bc = new WeakSet();
		});
	function ks({ value: e, onChange: t, validate: n }) {
		let [i, r] = I.useState(e),
			[s, l] = I.useState();
		function c(u) {
			r(u);
			let h = n(u);
			h === !0 ? (l(void 0), t(u)) : l(h);
		}
		return o(
			d,
			null,
			o(Ne, { type: 'text', value: i, onChange: c, error: s }),
		);
	}
	var Uc = m(() => {
		'use strict';
		a();
		x();
	});
	function Gc(e) {
		return e.t === 'Emoji'
			? `${location.protocol}//${window.GLOBAL_ENV.CDN_HOST}/emojis/${
					e.id
			  }.${e.isAnimated ? 'gif' : 'png'}`
			: `${location.origin}/stickers/${e.id}.${Zx[e.format_type]}`;
	}
	async function Sh(e) {
		let t = Kx.getStickerById(e);
		if (t) return t;
		let { body: n } = await Yt.get({ url: `/stickers/${e}` });
		return L.dispatch({ type: 'STICKER_FETCH_SUCCESS', sticker: n }), n;
	}
	async function Xx(e, t) {
		let n = new FormData();
		n.append('name', t.name),
			n.append('tags', t.tags),
			n.append('description', t.description),
			n.append('file', await bh(Gc(t)));
		let { body: i } = await Yt.post({
			url: `/guilds/${e}/stickers`,
			body: n,
		});
		L.dispatch({
			type: 'GUILD_STICKERS_CREATE_SUCCESS',
			guildId: e,
			sticker: { ...i, user: U.getCurrentUser() },
		});
	}
	async function Jx(e, t) {
		let n = await bh(Gc(t)),
			i = await new Promise((r) => {
				let s = new FileReader();
				(s.onload = () => r(s.result)), s.readAsDataURL(n);
			});
		return Yx({ guildId: e, name: t.name.split('~')[0], image: i });
	}
	function Qx(e) {
		let t = U.getCurrentUser().id;
		return Object.values(le.getGuilds())
			.filter((n) => {
				if (
					!(
						n.ownerId === t ||
						BigInt(et.getGuildPermissions({ id: n.id }) & hh) === hh
					)
				)
					return !1;
				if (e.t === 'Sticker') return !0;
				let { isAnimated: r } = e,
					s = n.getMaxEmojiSlots(),
					{ emojis: l } = un.getGuilds()[n.id],
					c = 0;
				for (let u of l) u.animated === r && c++;
				return c < s;
			})
			.sort((n, i) => n.name.localeCompare(i.name));
	}
	async function bh(e) {
		let t = await fetch(e);
		if (!t.ok) throw new Error(`Failed to fetch ${e} - ${t.status}`);
		return t.blob();
	}
	async function Vx(e, t) {
		try {
			t.t === 'Sticker' ? await Xx(e, t) : await Jx(e, t),
				Q.show({
					message: `Successfully cloned ${t.name} to ${
						le.getGuild(e)?.name ?? 'your server'
					}!`,
					type: Q.Type.SUCCESS,
					id: Q.genId(),
				});
		} catch (n) {
			new Z('EmoteCloner').error('Failed to clone', t.name, 'to', e, n),
				Q.show({
					message: 'Oopsie something went wrong :( Check console!!!',
					type: Q.Type.FAILURE,
					id: Q.genId(),
				});
		}
	}
	function nw({ data: e }) {
		let [t, n] = I.useState(!1),
			[i, r] = I.useState(e.name),
			[s, l] = I.useReducer((u) => u + 1, 0),
			c = I.useMemo(() => Qx(e), [e.id, s]);
		return o(
			d,
			null,
			o(y.FormTitle, { className: G.top20 }, 'Custom Name'),
			o(ks, {
				value: i,
				onChange: (u) => {
					(e.name = u), r(u);
				},
				validate: (u) =>
					(e.t === 'Emoji' &&
						u.length > 2 &&
						u.length < 32 &&
						tw.test(u)) ||
					(e.t === 'Sticker' && u.length > 2 && u.length < 30) ||
					'Name must be between 2 and 32 characters and only contain alphanumeric characters',
			}),
			o(
				'div',
				{
					style: {
						display: 'flex',
						flexWrap: 'wrap',
						gap: '1em',
						padding: '1em 0.5em',
						justifyContent: 'center',
						alignItems: 'center',
					},
				},
				c.map((u) =>
					o(
						W,
						{ text: u.name },
						({ onMouseLeave: h, onMouseEnter: f }) =>
							o(
								'div',
								{
									onMouseLeave: h,
									onMouseEnter: f,
									role: 'button',
									'aria-label': 'Clone to ' + u.name,
									'aria-disabled': t,
									style: {
										borderRadius: '50%',
										backgroundColor:
											'var(--background-secondary)',
										display: 'inline-flex',
										justifyContent: 'center',
										alignItems: 'center',
										width: '4em',
										height: '4em',
										cursor: t ? 'not-allowed' : 'pointer',
										filter: t ? 'brightness(50%)' : 'none',
									},
									onClick: t
										? void 0
										: async () => {
												n(!0),
													Vx(u.id, e).finally(() => {
														l(), n(!1);
													});
										  },
								},
								u.icon
									? o('img', {
											'aria-hidden': !0,
											style: {
												borderRadius: '50%',
												width: '100%',
												height: '100%',
											},
											src: u.getIconURL(512, !0),
											alt: u.name,
									  })
									: o(
											y.FormText,
											{
												style: {
													fontSize: ew(u.acronym),
													width: '100%',
													overflow: 'hidden',
													whiteSpace: 'nowrap',
													textAlign: 'center',
													cursor: t
														? 'not-allowed'
														: 'pointer',
												},
											},
											u.acronym,
									  ),
							),
					),
				),
			),
		);
	}
	function Ls(e, t) {
		return o(F.MenuItem, {
			id: 'emote-cloner',
			key: 'emote-cloner',
			label: `Clone ${e}`,
			action: () =>
				Oi(async () => {
					let n = await t(),
						i = { t: e, ...n },
						r = Gc(i);
					return (s) =>
						o(
							Ie,
							{ ...s },
							o(
								$e,
								null,
								o('img', {
									role: 'presentation',
									'aria-hidden': !0,
									src: r,
									alt: '',
									height: 24,
									width: 24,
									style: { marginRight: '0.5em' },
								}),
								o(y.FormText, null, 'Clone ', i.name),
							),
							o(Le, null, o(nw, { data: i })),
						);
				}),
		});
	}
	function Th(e) {
		return new URL(e).pathname.endsWith('.gif');
	}
	var hh,
		Kx,
		Yx,
		Zx,
		ew,
		tw,
		yh,
		vh,
		Hc,
		xh = m(() => {
			'use strict';
			a();
			Jt();
			Uc();
			w();
			Se();
			Xe();
			ze();
			T();
			_();
			x();
			(hh = 1n << 30n),
				(Kx = ue('StickersStore')),
				(Yx = ce('"EMOJI_UPLOAD_START"', 'GUILD_EMOJIS(')),
				(Zx = [, 'png', 'png', 'json', 'gif']);
			(ew = (e) => [20, 20, 18, 18, 16, 14, 12][e.length] ?? 4),
				(tw = /^\w+$/i);
			(yh = (e, t) => () => {
				let {
					favoriteableId: n,
					itemHref: i,
					itemSrc: r,
					favoriteableType: s,
				} = t ?? {};
				if (!n) return;
				let l = (() => {
					switch (s) {
						case 'emoji':
							let c = t.message.content.match(
								RegExp(
									`<a?:(\\w+)(?:~\\d+)?:${n}>|https://cdn\\.discordapp\\.com/emojis/${n}\\.`,
								),
							);
							if (!c) return;
							let u = c[1] ?? 'FakeNitroEmoji';
							return Ls('Emoji', () => ({
								id: n,
								name: u,
								isAnimated: Th(i ?? r),
							}));
						case 'sticker':
							return t.message.stickerItems.find(
								(f) => f.id === n,
							)?.format_type === 3
								? void 0
								: Ls('Sticker', () => Sh(n));
					}
				})();
				l && Lt('copy-link', e)?.push(l);
			}),
				(vh = (e, t) => () => {
					let { id: n, name: i, type: r } = t?.target?.dataset ?? {};
					if (!!n)
						if (r === 'emoji' && i) {
							let s = t.target.firstChild;
							e.push(
								Ls('Emoji', () => ({
									id: n,
									name: i,
									isAnimated: s && Th(s.src),
								})),
							);
						} else
							r === 'sticker' &&
								!t.target.className?.includes('lottieCanvas') &&
								e.push(Ls('Sticker', () => Sh(n)));
				}),
				(Hc = g({
					name: 'EmoteCloner',
					description:
						'Allows you to clone Emotes & Stickers to your own server (right click them)',
					tags: ['StickerCloner'],
					authors: [p.Ven, p.Nuckyz],
					start() {
						we('message', yh), we('expression-picker', vh);
					},
					stop() {
						Ae('message', yh), Ae('expression-picker', vh);
					},
				}));
		});
	var zc,
		jc,
		Wc,
		wh = m(() => {
			'use strict';
			a();
			E();
			re();
			Ui();
			w();
			Xe();
			T();
			_();
			x();
			(zc = P('key', 'removeBuildOverride')),
				(jc = N({
					enableIsStaff: {
						description: 'Enable isStaff',
						type: 3,
						default: !1,
						restartNeeded: !0,
					},
					forceStagingBanner: {
						description:
							'Whether to force Staging banner under user area.',
						type: 3,
						default: !1,
						restartNeeded: !0,
					},
				})),
				(Wc = g({
					name: 'Experiments',
					description: 'Enable Access to Experiments in Discord!',
					authors: [p.Megu, p.Ven, p.Nickyux, p.BanTheNons, p.Nuckyz],
					settings: jc,
					patches: [
						{
							find: 'Object.defineProperties(this,{isDeveloper',
							replacement: {
								match: /(?<={isDeveloper:\{[^}]+?,get:function\(\)\{return )\w/,
								replace: 'true',
							},
						},
						{
							find: 'type:"user",revision',
							replacement: {
								match: /!(\i)&&"CONNECTION_OPEN".+?;/g,
								replace: '$1=!0;',
							},
						},
						{
							find: '.isStaff=function(){',
							predicate: () => jc.store.enableIsStaff,
							replacement: [
								{
									match: /return\s*?(\i)\.hasFlag\((\i\.\i)\.STAFF\)}/,
									replace: (e, t, n) =>
										`return Vencord.Webpack.Common.UserStore.getCurrentUser().id===${t}.id||${t}.hasFlag(${n}.STAFF)}`,
								},
								{
									match: /hasFreePremium=function\(\){return this.isStaff\(\)\s*?\|\|/,
									replace:
										'hasFreePremium=function(){return ',
								},
							],
						},
						{
							find: '.Messages.DEV_NOTICE_STAGING',
							predicate: () => jc.store.forceStagingBanner,
							replacement: {
								match: /"staging"===window\.GLOBAL_ENV\.RELEASE_CHANNEL/,
								replace: 'true',
							},
						},
						{
							find: 'H1,title:"Experiments"',
							replacement: {
								match: 'title:"Experiments",children:[',
								replace: '$&$self.WarningCard(),',
							},
						},
					],
					settingsAboutComponent: () => {
						let e = navigator.platform.includes('Mac'),
							t = e ? 'cmd' : 'ctrl',
							n = e ? 'opt' : 'alt';
						return o(
							I.Fragment,
							null,
							o(y.FormTitle, { tag: 'h3' }, 'More Information'),
							o(
								y.FormText,
								{ variant: 'text-md/normal' },
								'You can enable client DevTools',
								' ',
								o('kbd', { className: zc.key }, t),
								' +',
								' ',
								o('kbd', { className: zc.key }, n),
								' +',
								' ',
								o('kbd', { className: zc.key }, 'O'),
								' ',
								'after enabling ',
								o('code', null, 'isStaff'),
								' below',
							),
							o(
								y.FormText,
								null,
								'and then toggling ',
								o('code', null, 'Enable DevTools'),
								' in the ',
								o('code', null, 'Developer Options'),
								' tab in settings.',
							),
						);
					},
					WarningCard: k.wrap(
						() =>
							o(
								Hn,
								{
									id: 'vc-experiments-warning-card',
									className: G.bottom16,
								},
								o(y.FormTitle, { tag: 'h2' }, 'Hold on!!'),
								o(
									y.FormText,
									null,
									'Experiments are unreleased Discord features. They might not work, or even break your client or get your account disabled.',
								),
								o(
									y.FormText,
									{ className: G.top8 },
									"Only use experiments if you know what you're doing. Vencord is not responsible for any damage caused by enabling experiments.",
								),
							),
						{ noop: !0 },
					),
				}));
		});
	var qc,
		Mh = m(() => {
			'use strict';
			a();
			w();
			T();
			qc = g({
				name: 'F8Break',
				description:
					'Pause the client when you press F8 with DevTools (+ breakpoints) open.',
				authors: [p.lewisakura],
				start() {
					window.addEventListener('keydown', this.event);
				},
				stop() {
					window.removeEventListener('keydown', this.event);
				},
				event(e) {
					if (e.code === 'F8') debugger;
				},
			});
		});
	var Es,
		Ph,
		ow,
		Ih,
		Rh,
		Ch,
		tr = m(() => {
			'use strict';
			a();
			rn();
			(Es = On(() =>
				import('https://unpkg.com/gifenc@1.0.3/dist/gifenc.esm.js'),
			)),
				(Ph = On(async () => {
					let e = {},
						t = new Proxy(window, { set: (n, i, r) => (e[i] = r) });
					return (
						Function(
							'self',
							await fetch(
								'https://cdnjs.cloudflare.com/ajax/libs/apng-canvas/2.1.1/apng-canvas.min.js',
							).then((n) => n.text()),
						)(t),
						e.APNG
					);
				})),
				(ow = 'https://unpkg.com/@vap/shiki-worker@0.0.8/dist'),
				(Ih = `${ow}/index.min.js`),
				(Rh = 'https://unpkg.com/@vap/shiki@0.10.3/dist/onig.wasm'),
				(Ch = On(() =>
					import('https://unpkg.com/stegcloak-dist@1.0.0/index.js'),
				));
		});
	function Nh(e, t) {
		if (!t) return;
		let n = t.fields.find((r) => r.localName === e);
		return n
			? Object.values(n).find((r) => typeof r == 'function')?.()
			: void 0;
	}
	var iw,
		rw,
		nr,
		Zc,
		Ah,
		Lo,
		Eo,
		Ds,
		sw,
		aw,
		Kc,
		Yc,
		Os,
		Me,
		Xc,
		kh = m(() => {
			'use strict';
			a();
			gn();
			E();
			w();
			tr();
			$n();
			rn();
			Se();
			T();
			_();
			x();
			(iw = 0),
				(rw = ce('UPLOAD_FILE_LIMIT_ERROR')),
				(nr = ue('UserSettingsProtoStore')),
				(Zc = Ce(
					(e) =>
						e.ProtoClass?.typeName ===
						'discord_protos.discord_users.v1.PreloadedUserSettings',
				)),
				(Ah = P('readerFactory')),
				(Lo = ue('StickersStore'));
			(Eo = ct(() => Nh('appearance', Zc.ProtoClass))),
				(Ds = ct(() => Nh('clientThemeSettings', Eo))),
				(sw = 1n << 18n),
				(aw = 1n << 37n),
				(Kc = /\/emojis\/(\d+?)\.(png|webp|gif)/),
				(Yc = /\/stickers\/(\d+?)\./),
				(Os = /\/attachments\/\d+?\/\d+?\/(\d+?)\.gif/),
				(Me = N({
					enableEmojiBypass: {
						description: 'Allow sending fake emojis',
						type: 3,
						default: !0,
						restartNeeded: !0,
					},
					emojiSize: {
						description: 'Size of the emojis when sending',
						type: 5,
						default: 48,
						markers: [32, 48, 64, 128, 160, 256, 512],
					},
					transformEmojis: {
						description:
							'Whether to transform fake emojis into real ones',
						type: 3,
						default: !0,
						restartNeeded: !0,
					},
					enableStickerBypass: {
						description: 'Allow sending fake stickers',
						type: 3,
						default: !0,
						restartNeeded: !0,
					},
					stickerSize: {
						description: 'Size of the stickers when sending',
						type: 5,
						default: 160,
						markers: [32, 64, 128, 160, 256, 512],
					},
					transformStickers: {
						description:
							'Whether to transform fake stickers into real ones',
						type: 3,
						default: !0,
						restartNeeded: !0,
					},
					transformCompoundSentence: {
						description:
							'Whether to transform fake stickers and emojis in compound sentences (sentences with more content than just the fake emoji or sticker link)',
						type: 3,
						default: !1,
					},
					enableStreamQualityBypass: {
						description: 'Allow streaming in nitro quality',
						type: 3,
						default: !0,
						restartNeeded: !0,
					},
				})),
				(Xc = g({
					name: 'FakeNitro',
					authors: [
						p.Arjix,
						p.D3SOX,
						p.Ven,
						p.obscurity,
						p.captain,
						p.Nuckyz,
						p.AutumnVN,
					],
					description:
						'Allows you to stream in nitro quality, send fake emojis/stickers and use client themes.',
					dependencies: ['MessageEventsAPI'],
					settings: Me,
					patches: [
						{
							find: '.PREMIUM_LOCKED;',
							predicate: () => Me.store.enableEmojiBypass,
							replacement: [
								{
									match: /(?<=(\i)=\i\.intention)/,
									replace: (e, t) =>
										`,fakeNitroIntention=${t}`,
								},
								{
									match: /\.(?:canUseEmojisEverywhere|canUseAnimatedEmojis)\(\i(?=\))/g,
									replace:
										'$&,typeof fakeNitroIntention!=="undefined"?fakeNitroIntention:void 0',
								},
								{
									match: /(&&!\i&&)!(\i)(?=\)return \i\.\i\.DISALLOW_EXTERNAL;)/,
									replace: (e, t, n) =>
										`${t}(!${n}&&(typeof fakeNitroIntention==="undefined"||![${3},${4}].includes(fakeNitroIntention)))`,
								},
								{
									match: /if\(!\i\.available/,
									replace: (e) =>
										`${e}&&(typeof fakeNitroIntention==="undefined"||![${3},${4}].includes(fakeNitroIntention))`,
								},
							],
						},
						{
							find: 'canUseAnimatedEmojis:function',
							predicate: () => Me.store.enableEmojiBypass,
							replacement: {
								match: /((?:canUseEmojisEverywhere|canUseAnimatedEmojis):function\(\i)\){(.+?\))/g,
								replace: (e, t, n) =>
									`${t},fakeNitroIntention){${n}||fakeNitroIntention==null||[${3},${4}].includes(fakeNitroIntention)`,
							},
						},
						{
							find: 'canUseStickersEverywhere:function',
							predicate: () => Me.store.enableStickerBypass,
							replacement: {
								match: /canUseStickersEverywhere:function\(\i\){/,
								replace: '$&return true;',
							},
						},
						{
							find: '"SENDABLE"',
							predicate: () => Me.store.enableStickerBypass,
							replacement: {
								match: /(\w+)\.available\?/,
								replace: 'true?',
							},
						},
						{
							find: 'canStreamHighQuality:function',
							predicate: () => Me.store.enableStreamQualityBypass,
							replacement: [
								'canUseHighVideoUploadQuality',
								'canStreamHighQuality',
								'canStreamMidQuality',
							].map((e) => ({
								match: new RegExp(`${e}:function\\(\\i\\){`),
								replace: '$&return true;',
							})),
						},
						{
							find: 'STREAM_FPS_OPTION.format',
							predicate: () => Me.store.enableStreamQualityBypass,
							replacement: {
								match: /(userPremiumType|guildPremiumTier):.{0,10}TIER_\d,?/g,
								replace: '',
							},
						},
						{
							find: 'canUseClientThemes:function',
							replacement: {
								match: /canUseClientThemes:function\(\i\){/,
								replace: '$&return true;',
							},
						},
						{
							find: '.displayName="UserSettingsProtoStore"',
							replacement: [
								{
									match: /CONNECTION_OPEN:function\((\i)\){/,
									replace: (e, t) =>
										`${e}$self.handleProtoChange(${t}.userSettingsProto,${t}.user);`,
								},
								{
									match: /=(\i)\.local;/,
									replace: (e, t) =>
										`${e}${t}.local||$self.handleProtoChange(${t}.settings.proto);`,
								},
							],
						},
						{
							find: 'updateTheme:function',
							replacement: {
								match: /(function \i\(\i\){var (\i)=\i\.backgroundGradientPresetId.+?)(\i\.\i\.updateAsync.+?theme=(.+?);.+?\),\i\))/,
								replace: (e, t, n, i, r) =>
									`${t}$self.handleGradientThemeSelect(${n},${r},()=>${i});`,
							},
						},
						{
							find: '["strong","em","u","text","inlineCode","s","spoiler"]',
							replacement: [
								{
									predicate: () => Me.store.transformEmojis,
									match: /1!==(\i)\.length\|\|1!==\i\.length/,
									replace: (e, t) =>
										`${e}||$self.shouldKeepEmojiLink(${t}[0])`,
								},
								{
									predicate: () =>
										Me.store.transformEmojis ||
										Me.store.transformStickers,
									match: /(?=return{hasSpoilerEmbeds:\i,content:(\i)})/,
									replace: (e, t) =>
										`${t}=$self.patchFakeNitroEmojisOrRemoveStickersLinks(${t},arguments[2]?.formatInline);`,
								},
							],
						},
						{
							find: 'renderEmbeds=function',
							replacement: [
								{
									predicate: () =>
										Me.store.transformEmojis ||
										Me.store.transformStickers,
									match: /(renderEmbeds=function\((\i)\){)(.+?embeds\.map\(\(function\((\i)\){)/,
									replace: (e, t, n, i, r) =>
										`${t}const fakeNitroMessage=${n};${i}if($self.shouldIgnoreEmbed(${r},fakeNitroMessage))return null;`,
								},
								{
									predicate: () => Me.store.transformStickers,
									match: /renderStickersAccessories=function\((\i)\){var (\i)=\(0,\i\.\i\)\(\i\),/,
									replace: (e, t, n) =>
										`${e}${n}=$self.patchFakeNitroStickers(${n},${t}),`,
								},
								{
									predicate: () => Me.store.transformStickers,
									match: /renderAttachments=function\(\i\){var (\i)=\i.attachments.+?;/,
									replace: (e, t) =>
										`${e}${t}=$self.filterAttachments(${t});`,
								},
							],
						},
						{
							find: '.STICKER_IN_MESSAGE_HOVER,',
							predicate: () => Me.store.transformStickers,
							replacement: [
								{
									match: /var (\i)=\i\.renderableSticker,.{0,50}closePopout.+?channel:\i,closePopout:\i,/,
									replace: (e, t) =>
										`${e}renderableSticker:${t},`,
								},
								{
									match: /(emojiSection.{0,50}description:)(\i)(?<=(\i)\.sticker,.+?)(?=,)/,
									replace: (e, t, n, i) =>
										`${t}$self.addFakeNotice("STICKER",${n},!!${i}.renderableSticker?.fake)`,
								},
							],
						},
						{
							find: '.Messages.EMOJI_POPOUT_PREMIUM_JOINED_GUILD_DESCRIPTION',
							predicate: () => Me.store.transformEmojis,
							replacement: {
								match: /((\i)=\i\.node,\i=\i\.emojiSourceDiscoverableGuild)(.+?return )(.{0,450}Messages\.EMOJI_POPOUT_PREMIUM_JOINED_GUILD_DESCRIPTION.+?}\))/,
								replace: (e, t, n, i, r) =>
									`${t},fakeNitroNode=${n}${i}$self.addFakeNotice("EMOJI",${r},fakeNitroNode.fake)`,
							},
						},
					],
					get guildId() {
						return pl()?.id;
					},
					get canUseEmotes() {
						return (U.getCurrentUser().premiumType ?? 0) > 0;
					},
					get canUseStickers() {
						return (U.getCurrentUser().premiumType ?? 0) > 1;
					},
					handleProtoChange(e, t) {
						if (
							e == null ||
							typeof e == 'string' ||
							!nr ||
							(!e.appearance && !Eo)
						)
							return;
						if (
							(t?.premium_type ??
								U?.getCurrentUser()?.premiumType ??
								0) !== 2 &&
							((e.appearance ??= Eo.create()),
							nr.settings.appearance?.theme != null &&
								(e.appearance.theme =
									nr.settings.appearance.theme),
							nr.settings.appearance?.clientThemeSettings
								?.backgroundGradientPresetId?.value != null &&
								Ds)
						) {
							let i = Ds.create({
								backgroundGradientPresetId: {
									value: nr.settings.appearance
										.clientThemeSettings
										.backgroundGradientPresetId.value,
								},
							});
							(e.appearance.clientThemeSettings ??= i),
								(e.appearance.clientThemeSettings.backgroundGradientPresetId =
									i.backgroundGradientPresetId);
						}
					},
					handleGradientThemeSelect(e, t, n) {
						if (
							(U?.getCurrentUser()?.premiumType ?? 0) === 2 ||
							e == null
						)
							return n();
						if (!Eo || !Ds || !Ah) return;
						let r = Zc.getCurrentValue().appearance,
							s =
								r != null
									? Eo.fromBinary(Eo.toBinary(r), Ah)
									: Eo.create();
						s.theme = t;
						let l = Ds.create({
							backgroundGradientPresetId: { value: e },
						});
						(s.clientThemeSettings ??= l),
							(s.clientThemeSettings.backgroundGradientPresetId =
								l.backgroundGradientPresetId);
						let c = Zc.ProtoClass.create();
						(c.appearance = s),
							L.dispatch({
								type: 'USER_SETTINGS_PROTO_UPDATE',
								local: !0,
								partial: !0,
								settings: { type: 1, proto: c },
							});
					},
					trimContent(e) {
						let t = e[0];
						typeof t == 'string' && (e[0] = t.trimStart()),
							e[0] === '' && e.shift();
						let n = e.length - 1,
							i = e[n];
						typeof i == 'string' && (e[n] = i.trimEnd()),
							e[n] === '' && e.pop();
					},
					clearEmptyArrayItems(e) {
						return e.filter((t) => t != null);
					},
					ensureChildrenIsArray(e) {
						Array.isArray(e.props.children) ||
							(e.props.children = [e.props.children]);
					},
					patchFakeNitroEmojisOrRemoveStickersLinks(e, t) {
						if (
							(e.length > 1 || typeof e[0]?.type == 'string') &&
							!Me.store.transformCompoundSentence
						)
							return e;
						let n = e.length,
							i = (c) => {
								if (Me.store.transformEmojis) {
									let u = c.props.href.match(Kc);
									if (u) {
										let h = null;
										try {
											h = new URL(c.props.href);
										} catch {}
										let f =
											un.getCustomEmojiById(u[1])?.name ??
											h?.searchParams.get('name') ??
											'FakeNitroEmoji';
										return Pe.defaultRules.customEmoji.react(
											{
												jumboable:
													!t &&
													e.length === 1 &&
													typeof e[0].type !=
														'string',
												animated: u[2] === 'gif',
												emojiId: u[1],
												name: f,
												fake: !0,
											},
											void 0,
											{ key: String(n++) },
										);
									}
								}
								if (Me.store.transformStickers) {
									if (Yc.test(c.props.href)) return null;
									let u = c.props.href.match(Os);
									if (u && Lo.getStickerById(u[1]))
										return null;
								}
								return c;
							},
							r = (c) =>
								c?.props?.trusted != null
									? i(c)
									: c?.props?.children != null
									? Array.isArray(c.props.children)
										? ((c.props.children = l(
												c.props.children,
										  )),
										  c.props.children.length === 0
												? null
												: c)
										: ((c.props.children = s(
												c.props.children,
										  )),
										  c)
									: c,
							s = (c) => {
								let u = r(c);
								if (u?.type === 'ul' || u?.type === 'ol') {
									if (
										(this.ensureChildrenIsArray(u),
										u.props.children.length === 0)
									)
										return null;
									let h = !1;
									for (let [
										f,
										v,
									] of u.props.children.entries()) {
										if (v == null) {
											delete u.props.children[f];
											continue;
										}
										this.ensureChildrenIsArray(v),
											v.props.children.length > 0
												? (h = !0)
												: delete u.props.children[f];
									}
									if (!h) return null;
									u.props.children =
										this.clearEmptyArrayItems(
											u.props.children,
										);
								}
								return u;
							},
							l = (c) => {
								for (let [u, h] of c.entries()) c[u] = s(h);
								return (
									(c = this.clearEmptyArrayItems(c)),
									this.trimContent(c),
									c
								);
							};
						try {
							return l(window._.cloneDeep(e));
						} catch (c) {
							return new Z('FakeNitro').error(c), e;
						}
					},
					patchFakeNitroStickers(e, t) {
						let n = [],
							i = t.content.split(/\s/);
						Me.store.transformCompoundSentence
							? n.push(...i)
							: i.length === 1 && n.push(i[0]),
							n.push(
								...t.attachments
									.filter(
										(r) => r.content_type === 'image/gif',
									)
									.map((r) => r.url),
							);
						for (let r of n) {
							if (
								!Me.store.transformCompoundSentence &&
								!r.startsWith('http')
							)
								continue;
							let s = r.match(Yc);
							if (s) {
								let c = null;
								try {
									c = new URL(r);
								} catch {}
								let u =
									Lo.getStickerById(s[1])?.name ??
									c?.searchParams.get('name') ??
									'FakeNitroSticker';
								e.push({
									format_type: 1,
									id: s[1],
									name: u,
									fake: !0,
								});
								continue;
							}
							let l = r.match(Os);
							if (l) {
								if (!Lo.getStickerById(l[1])) continue;
								let c =
									Lo.getStickerById(l[1])?.name ??
									'FakeNitroSticker';
								e.push({
									format_type: 2,
									id: l[1],
									name: c,
									fake: !0,
								});
							}
						}
						return e;
					},
					shouldIgnoreEmbed(e, t) {
						let n = t.content.split(/\s/);
						if (n.length > 1 && !Me.store.transformCompoundSentence)
							return !1;
						switch (e.type) {
							case 'image': {
								if (
									!Me.store.transformCompoundSentence &&
									!n.includes(e.url) &&
									!n.includes(e.image.proxyURL)
								)
									return !1;
								if (Me.store.transformEmojis && Kc.test(e.url))
									return !0;
								if (Me.store.transformStickers) {
									if (Yc.test(e.url)) return !0;
									let i = e.url.match(Os);
									if (i && Lo.getStickerById(i[1])) return !0;
								}
								break;
							}
						}
						return !1;
					},
					filterAttachments(e) {
						return e.filter((t) => {
							if (t.content_type !== 'image/gif') return !0;
							let n = t.url.match(Os);
							return !(n && Lo.getStickerById(n[1]));
						});
					},
					shouldKeepEmojiLink(e) {
						return e.target && Kc.test(e.target);
					},
					addFakeNotice(e, t, n) {
						if (!n) return t;
						switch (((t = Array.isArray(t) ? t : [t]), e)) {
							case 'STICKER':
								return (
									t.push(
										' This is a FakeNitro sticker and renders like a real sticker only for you. Appears as a link to non-plugin users.',
									),
									t
								);
							case 'EMOJI':
								return (
									t.push(
										' This is a FakeNitro emoji and renders like a real emoji only for you. Appears as a link to non-plugin users.',
									),
									t
								);
						}
					},
					hasPermissionToUseExternalEmojis(e) {
						let t = X.getChannel(e);
						return !t ||
							t.isDM() ||
							t.isGroupDM() ||
							t.isMultiUserDM()
							? !0
							: et.can(sw, t);
					},
					hasPermissionToUseExternalStickers(e) {
						let t = X.getChannel(e);
						return !t ||
							t.isDM() ||
							t.isGroupDM() ||
							t.isMultiUserDM()
							? !0
							: et.can(aw, t);
					},
					getStickerLink(e) {
						return `https://media.discordapp.net/stickers/${e}.png?size=${M.plugins.FakeNitro.stickerSize}`;
					},
					async sendAnimatedSticker(e, t, n) {
						let [
								{ parseURL: i },
								{ GIFEncoder: r, quantize: s, applyPalette: l },
							] = await Promise.all([Ph(), Es()]),
							{ frames: c, width: u, height: h } = await i(e),
							f = new r(),
							v = M.plugins.FakeNitro.stickerSize,
							S = document.createElement('canvas');
						(S.width = v), (S.height = v);
						let b = S.getContext('2d', { willReadFrequently: !0 }),
							A = v / Math.max(u, h);
						b.scale(A, A);
						let C;
						for (let B of c) {
							let {
								left: O,
								top: K,
								width: ee,
								height: j,
								img: z,
								delay: te,
								blendOp: $,
								disposeOp: Re,
							} = B;
							(C = b.getImageData(O, K, ee, j)),
								$ === 0 && b.clearRect(O, K, ee, j),
								b.drawImage(z, O, K, ee, j);
							let { data: ne } = b.getImageData(0, 0, v, v),
								Fe = s(ne, 256),
								Ee = l(ne, Fe);
							f.writeFrame(Ee, v, v, {
								transparent: !0,
								palette: Fe,
								delay: te,
							}),
								Re === 1
									? b.clearRect(O, K, ee, j)
									: Re === 2 && b.putImageData(C, O, K);
						}
						f.finish();
						let D = new File([f.bytesView()], `${t}.gif`, {
							type: 'image/gif',
						});
						rw([D], X.getChannel(n), iw);
					},
					start() {
						let e = Me.store;
						if (!e.enableEmojiBypass && !e.enableStickerBypass)
							return;
						function t(n, i) {
							return !n[i] || /\s/.test(n[i]) ? '' : ' ';
						}
						(this.preSend = rt((n, i, r) => {
							let { guildId: s } = this;
							e: {
								if (!e.enableStickerBypass) break e;
								let l = Lo.getStickerById(r.stickers?.[0]);
								if (!l || 'pack_id' in l) break e;
								let c =
									this.canUseStickers &&
									this.hasPermissionToUseExternalStickers(n);
								if (
									l.available !== !1 &&
									(c || l.guild_id === s)
								)
									break e;
								let u = this.getStickerLink(l.id);
								if (l.format_type === 2)
									return (
										this.sendAnimatedSticker(u, l.id, n),
										{ cancel: !0 }
									);
								(r.stickers.length = 0),
									(i.content += ` ${u}&name=${encodeURIComponent(
										l.name,
									)}`);
							}
							if (e.enableEmojiBypass) {
								let l =
									this.canUseEmotes &&
									this.hasPermissionToUseExternalEmojis(n);
								for (let c of i.validNonShortcutEmojis) {
									if (
										!c.require_colons ||
										(c.available !== !1 && l) ||
										(c.guildId === s && !c.animated)
									)
										continue;
									let u = `<${c.animated ? 'a' : ''}:${
											c.originalName || c.name
										}:${c.id}>`,
										h = c.url.replace(
											/\?size=\d+/,
											'?' +
												new URLSearchParams({
													size: M.plugins.FakeNitro
														.emojiSize,
													name: encodeURIComponent(
														c.name,
													),
												}),
										);
									i.content = i.content.replace(
										u,
										(f, v, S) =>
											`${t(S, v - 1)}${h}${t(
												S,
												v + f.length,
											)}`,
									);
								}
							}
							return { cancel: !1 };
						})),
							(this.preEdit = Kn((n, i, r) => {
								if (!e.enableEmojiBypass) return;
								let s =
										this.canUseEmotes &&
										this.hasPermissionToUseExternalEmojis(
											n,
										),
									{ guildId: l } = this;
								r.content = r.content.replace(
									/(?<!\\)<a?:(?:\w+):(\d+)>/gi,
									(c, u, h, f) => {
										let v = un.getCustomEmojiById(u);
										if (
											v == null ||
											!v.require_colons ||
											(v.available !== !1 && s) ||
											(v.guildId === l && !v.animated)
										)
											return c;
										let S = v.url.replace(
											/\?size=\d+/,
											'?' +
												new URLSearchParams({
													size: M.plugins.FakeNitro
														.emojiSize,
													name: encodeURIComponent(
														v.name,
													),
												}),
										);
										return `${t(f, h - 1)}${S}${t(
											f,
											h + c.length,
										)}`;
									},
								);
							}));
					},
					stop() {
						st(this.preSend), Yn(this.preEdit);
					},
				}));
		});
	function Lh(...e) {
		let t = {};
		function n(r) {
			for (let s = e.length - 1; s >= 0; s--) if (r in e[s]) return e[s];
			return t;
		}
		let i = {
			ownKeys() {
				return e.reduce(
					(r, s) => (r.push(...Reflect.ownKeys(s)), r),
					Reflect.ownKeys(t),
				);
			},
		};
		for (let r of [
			'defineProperty',
			'deleteProperty',
			'get',
			'getOwnPropertyDescriptor',
			'has',
			'set',
		])
			i[r] = function (s, ...l) {
				return Reflect[r](n(l[0]), ...l);
			};
		return new Proxy(t, i);
	}
	var Eh,
		Dh = m(() => {
			'use strict';
			a();
			Eh = Lh;
			typeof module < 'u' && (module.exports = Lh);
		});
	function lw(e, t) {
		let n = `[#${e.toString(16).padStart(6, '0')},#${t
				.toString(16)
				.padStart(6, '0')}]`,
			i = '',
			r = Array.from(n)
				.map((s) => s.codePointAt(0))
				.filter((s) => s >= 32 && s <= 127)
				.map((s) => String.fromCodePoint(s + 917504))
				.join('');
		return (i || '') + ' ' + r;
	}
	function cw(e) {
		if (e == null) return null;
		let t = e.match(
			/\u{e005b}\u{e0023}([\u{e0061}-\u{e0066}\u{e0041}-\u{e0046}\u{e0030}-\u{e0039}]+?)\u{e002c}\u{e0023}([\u{e0061}-\u{e0066}\u{e0041}-\u{e0046}\u{e0030}-\u{e0039}]+?)\u{e005d}/u,
		);
		if (t != null) {
			let n = [...t[0]]
				.map((r) => String.fromCodePoint(r.codePointAt(0) - 917504))
				.join('');
			return n
				.substring(1, n.length - 1)
				.split(',')
				.map((r) => parseInt(r.replace('#', '0x'), 16));
		} else return null;
	}
	var Oh,
		Jc,
		_h = m(() => {
			'use strict';
			a();
			E();
			re();
			w();
			Xe();
			de();
			T();
			x();
			Dh();
			(Oh = N({
				nitroFirst: {
					description: 'Default color source if both are present',
					type: 4,
					options: [
						{ label: 'Nitro colors', value: !0, default: !0 },
						{ label: 'Fake colors', value: !1 },
					],
				},
			})),
				(Jc = g({
					name: 'FakeProfileThemes',
					description:
						'Allows profile theming by hiding the colors in your bio thanks to invisible 3y3 encoding',
					authors: [p.Alyxia, p.Remty],
					patches: [
						{
							find: 'getUserProfile=',
							replacement: {
								match: /(?<=getUserProfile=function\(\i\){return )(\i\[\i\])/,
								replace: '$self.colorDecodeHook($1)',
							},
						},
						{
							find: '.USER_SETTINGS_PROFILE_THEME_ACCENT',
							replacement: {
								match: /RESET_PROFILE_THEME}\)(?<=},color:(\i).+?},color:(\i).+?)/,
								replace:
									'$&,$self.addCopy3y3Button({primary:$1,accent:$2})',
							},
						},
					],
					settingsAboutComponent: () =>
						o(
							y.FormSection,
							null,
							o(y.FormTitle, { tag: 'h3' }, 'Usage'),
							o(
								y.FormText,
								null,
								'After enabling this plugin, you will see custom colors in the profiles of other people using compatible plugins. ',
								o('br', null),
								'To set your own colors:',
								o(
									'ul',
									null,
									o(
										'li',
										null,
										'\u2022 go to your profile settings',
									),
									o(
										'li',
										null,
										'\u2022 choose your own colors in the Nitro preview',
									),
									o(
										'li',
										null,
										'\u2022 click the "Copy 3y3" button',
									),
									o(
										'li',
										null,
										'\u2022 paste the invisible text anywhere in your bio',
									),
								),
								o('br', null),
								o('b', null, 'Please note:'),
								' if you are using a theme which hides nitro ads, you should disable it temporarily to set colors.',
							),
						),
					settings: Oh,
					colorDecodeHook(e) {
						if (e) {
							if (Oh.store.nitroFirst && e.themeColors) return e;
							let t = cw(e.bio);
							if (t)
								return Eh(e, {
									premiumType: 2,
									themeColors: t,
								});
						}
						return e;
					},
					addCopy3y3Button: k.wrap(
						function ({ primary: e, accent: t }) {
							return o(
								R,
								{
									onClick: () => {
										let n = lw(e, t);
										ln(n);
									},
									color: R.Colors.PRIMARY,
									size: R.Sizes.XLARGE,
									className: G.left16,
								},
								'Copy 3y3',
							);
						},
						{ noop: !0 },
					),
				}));
		});
	function Qc() {
		return `-${Jo.fromTimestamp(Date.now())}`;
	}
	function ie(e, t) {
		let n = uw({ channelId: e, content: '', embeds: [] });
		return pw.receiveMessage(e, Po(t, n)), t;
	}
	function De(e, t, n) {
		return e.find((i) => i.name === t)?.value || n;
	}
	var uw,
		pw,
		Vc = m(() => {
			'use strict';
			a();
			de();
			_();
			x();
			(uw = ce('username:"Clyde"')), (pw = P('receiveMessage'));
		});
	var Zn,
		hn,
		eu,
		_s = m(() => {
			'use strict';
			a();
			(Zn = ((v) => (
				(v[(v.SUB_COMMAND = 1)] = 'SUB_COMMAND'),
				(v[(v.SUB_COMMAND_GROUP = 2)] = 'SUB_COMMAND_GROUP'),
				(v[(v.STRING = 3)] = 'STRING'),
				(v[(v.INTEGER = 4)] = 'INTEGER'),
				(v[(v.BOOLEAN = 5)] = 'BOOLEAN'),
				(v[(v.USER = 6)] = 'USER'),
				(v[(v.CHANNEL = 7)] = 'CHANNEL'),
				(v[(v.ROLE = 8)] = 'ROLE'),
				(v[(v.MENTIONABLE = 9)] = 'MENTIONABLE'),
				(v[(v.NUMBER = 10)] = 'NUMBER'),
				(v[(v.ATTACHMENT = 11)] = 'ATTACHMENT'),
				v
			))(Zn || {})),
				(hn = ((s) => (
					(s[(s.BUILT_IN = 0)] = 'BUILT_IN'),
					(s[(s.BUILT_IN_TEXT = 1)] = 'BUILT_IN_TEXT'),
					(s[(s.BUILT_IN_INTEGRATION = 2)] = 'BUILT_IN_INTEGRATION'),
					(s[(s.BOT = 3)] = 'BOT'),
					(s[(s.PLACEHOLDER = 4)] = 'PLACEHOLDER'),
					s
				))(hn || {})),
				(eu = ((i) => (
					(i[(i.CHAT_INPUT = 1)] = 'CHAT_INPUT'),
					(i[(i.USER = 2)] = 'USER'),
					(i[(i.MESSAGE = 3)] = 'MESSAGE'),
					i
				))(eu || {}));
		});
	var ou = {};
	me(ou, {
		ApplicationCommandInputType: () => hn,
		ApplicationCommandOptionType: () => Zn,
		ApplicationCommandType: () => eu,
		BUILT_IN: () => mo,
		OptionalMessageOption: () => fo,
		RequiredMessageOption: () => Do,
		_handleCommand: () => mw,
		_init: () => dw,
		commands: () => tu,
		findOption: () => De,
		generateId: () => Qc,
		prepareOption: () => nu,
		registerCommand: () => ri,
		sendBotMessage: () => ie,
		unregisterCommand: () => or,
	});
	function nu(e) {
		return (
			(e.displayName ||= e.name),
			(e.displayDescription ||= e.description),
			e.options?.forEach((t, n, i) => {
				t === Fh ? (i[n] = fo) : t === Bh && (i[n] = Do),
					t.choices?.forEach((r) => (r.displayName ||= r.name)),
					nu(i[n]);
			}),
			e
		);
	}
	function fw(e, t) {
		e.options?.forEach((n) => {
			if (n.type !== 1)
				throw new Error(
					'When specifying sub-command options, all options must be sub-commands.',
				);
			let i = {
				...e,
				...n,
				type: 1,
				name: `${e.name} ${n.name}`,
				id: `${n.name}-${e.id}`,
				displayName: `${e.name} ${n.name}`,
				subCommandPath: [
					{ name: n.name, type: n.type, displayName: n.name },
				],
				rootCommand: e,
			};
			ri(i, t);
		});
	}
	function ri(e, t) {
		if (!mo) {
			console.warn(
				'[CommandsAPI]',
				`Not registering ${e.name} as the CommandsAPI hasn't been initialised.`,
				'Please restart to use commands',
			);
			return;
		}
		if (mo.some((n) => n.name === e.name))
			throw new Error(`Command '${e.name}' already exists.`);
		if (
			((e.isVencordCommand = !0),
			(e.id ??= `-${mo.length + 1}`),
			(e.applicationId ??= '-1'),
			(e.type ??= 1),
			(e.inputType ??= 1),
			(e.plugin ||= t),
			nu(e),
			e.options?.[0]?.type === 1)
		) {
			fw(e, t);
			return;
		}
		(tu[e.name] = e), mo.push(e);
	}
	function or(e) {
		let t = mo.findIndex((n) => n.name === e);
		return t === -1 ? !1 : (mo.splice(t, 1), delete tu[e], !0);
	}
	var mo,
		tu,
		Fh,
		Bh,
		fo,
		Do,
		dw,
		mw,
		wt = m(() => {
			'use strict';
			a();
			ro();
			Vc();
			_s();
			Vc();
			_s();
			(tu = {}),
				(Fh = Symbol('OptionalMessageOption')),
				(Bh = Symbol('RequiredMessageOption')),
				(fo = Fh),
				(Do = Bh),
				(dw = function (e) {
					try {
						(mo = e),
							(fo = e.find((t) => t.name === 'shrug').options[0]),
							(Do = e.find((t) => t.name === 'me').options[0]);
					} catch {
						console.error('Failed to load CommandsApi');
					}
					return e;
				}),
				(mw = function (e, t, n) {
					if (!e.isVencordCommand) return e.execute(t, n);
					let i = (r) => {
						let s = `An Error occurred while executing command "${e.name}"`,
							l =
								r instanceof Error
									? r.stack || r.message
									: String(r);
						console.error(s, r),
							ie(n.channel.id, {
								content: `${s}:
${$i(l)}`,
								author: { username: 'Vencord' },
							});
					};
					try {
						let r = e.execute(t, n);
						return r instanceof Promise ? r.catch(i) : r;
					} catch (r) {
						return i(r);
					}
				});
		});
	function $h({ text: e, color: t }) {
		return o(
			'div',
			{
				className: 'vc-plugins-badge',
				style: {
					backgroundColor: t,
					justifySelf: 'flex-end',
					marginLeft: 'auto',
				},
			},
			e,
		);
	}
	var Uh = m(() => {
		'use strict';
		a();
	});
	function Gh({
		option: e,
		pluginSettings: t,
		definedSettings: n,
		id: i,
		onChange: r,
		onError: s,
	}) {
		let l = t[i] ?? e.default,
			[c, u] = I.useState(l ?? !1),
			[h, f] = I.useState(null);
		I.useEffect(() => {
			s(h !== null);
		}, [h]);
		let v = [
			{ label: 'Enabled', value: !0, default: l === !0 },
			{
				label: 'Disabled',
				value: !1,
				default: typeof l > 'u' || l === !1,
			},
		];
		function S(b) {
			let A = e.isValid?.call(n, b) ?? !0;
			typeof A == 'string'
				? f(A)
				: A
				? (f(null), u(b), r(b))
				: f('Invalid input provided.');
		}
		return o(
			y.FormSection,
			null,
			o(y.FormTitle, null, e.description),
			o($t, {
				isDisabled: e.disabled?.call(n) ?? !1,
				options: v,
				placeholder: e.placeholder ?? 'Select an option',
				maxVisibleItems: 5,
				closeOnSelect: !0,
				select: S,
				isSelected: (b) => b === c,
				serialize: (b) => String(b),
				...e.componentProps,
			}),
			h && o(y.FormText, { style: { color: 'var(--text-danger)' } }, h),
		);
	}
	var Hh = m(() => {
		'use strict';
		a();
		x();
	});
	function zh({ option: e, onChange: t, onError: n }) {
		return e.component({ setValue: t, setError: n, option: e });
	}
	var jh = m(() => {
		'use strict';
		a();
	});
	function iu({
		option: e,
		pluginSettings: t,
		definedSettings: n,
		id: i,
		onChange: r,
		onError: s,
	}) {
		function l(S) {
			return e.type === 2 ? BigInt(S) : Number(S);
		}
		let [c, u] = I.useState(`${t[i] ?? e.default ?? 0}`),
			[h, f] = I.useState(null);
		I.useEffect(() => {
			s(h !== null);
		}, [h]);
		function v(S) {
			let b = e.isValid?.call(n, S) ?? !0;
			f(null),
				typeof b == 'string' ? f(b) : b || f('Invalid input provided.'),
				e.type === 1 && BigInt(S) >= gw
					? (u(`${Number.MAX_SAFE_INTEGER}`), r(l(S)))
					: (u(S), r(l(S)));
		}
		return o(
			y.FormSection,
			null,
			o(y.FormTitle, null, e.description),
			o(Ne, {
				type: 'number',
				pattern: '-?[0-9]+',
				value: c,
				onChange: v,
				placeholder: e.placeholder ?? 'Enter a number',
				disabled: e.disabled?.call(n) ?? !1,
				...e.componentProps,
			}),
			h && o(y.FormText, { style: { color: 'var(--text-danger)' } }, h),
		);
	}
	var gw,
		Wh = m(() => {
			'use strict';
			a();
			T();
			x();
			gw = BigInt(Number.MAX_SAFE_INTEGER);
		});
	function qh({
		option: e,
		pluginSettings: t,
		definedSettings: n,
		onChange: i,
		onError: r,
		id: s,
	}) {
		let l = t[s] ?? e.options?.find((S) => S.default)?.value,
			[c, u] = I.useState(l ?? null),
			[h, f] = I.useState(null);
		I.useEffect(() => {
			r(h !== null);
		}, [h]);
		function v(S) {
			let b = e.isValid?.call(n, S) ?? !0;
			typeof b == 'string'
				? f(b)
				: b
				? (f(null), u(S), i(S))
				: f('Invalid input provided.');
		}
		return o(
			y.FormSection,
			null,
			o(y.FormTitle, null, e.description),
			o($t, {
				isDisabled: e.disabled?.call(n) ?? !1,
				options: e.options,
				placeholder: e.placeholder ?? 'Select an option',
				maxVisibleItems: 5,
				closeOnSelect: !0,
				select: v,
				isSelected: (S) => S === c,
				serialize: (S) => String(S),
				...e.componentProps,
			}),
			h && o(y.FormText, { style: { color: 'var(--text-danger)' } }, h),
		);
	}
	var Kh = m(() => {
		'use strict';
		a();
		x();
	});
	function go(e, t, n = 1) {
		let i = [];
		for (let r = e; r <= t; r += n) i.push(Math.round(r * 100) / 100);
		return i;
	}
	function Yh({
		option: e,
		pluginSettings: t,
		definedSettings: n,
		id: i,
		onChange: r,
		onError: s,
	}) {
		let l = t[i] ?? e.default,
			[c, u] = I.useState(null);
		I.useEffect(() => {
			s(c !== null);
		}, [c]);
		function h(f) {
			let v = e.isValid?.call(n, f) ?? !0;
			typeof v == 'string'
				? u(v)
				: v
				? (u(null), r(f))
				: u('Invalid input provided.');
		}
		return o(
			y.FormSection,
			null,
			o(y.FormTitle, null, e.description),
			o(Io, {
				disabled: e.disabled?.call(n) ?? !1,
				markers: e.markers,
				minValue: e.markers[0],
				maxValue: e.markers[e.markers.length - 1],
				initialValue: l,
				onValueChange: h,
				onValueRender: (f) => String(f.toFixed(2)),
				stickToMarkers: e.stickToMarkers ?? !0,
				...e.componentProps,
			}),
		);
	}
	var ru = m(() => {
		'use strict';
		a();
		x();
	});
	function Zh({
		option: e,
		pluginSettings: t,
		definedSettings: n,
		id: i,
		onChange: r,
		onError: s,
	}) {
		let [l, c] = I.useState(t[i] ?? e.default ?? null),
			[u, h] = I.useState(null);
		I.useEffect(() => {
			s(u !== null);
		}, [u]);
		function f(v) {
			let S = e.isValid?.call(n, v) ?? !0;
			typeof S == 'string'
				? h(S)
				: S
				? (h(null), c(v), r(v))
				: h('Invalid input provided.');
		}
		return o(
			y.FormSection,
			null,
			o(y.FormTitle, null, e.description),
			o(Ne, {
				type: 'text',
				value: l,
				onChange: f,
				placeholder: e.placeholder ?? 'Enter a value',
				disabled: e.disabled?.call(n) ?? !1,
				...e.componentProps,
			}),
			u && o(y.FormText, { style: { color: 'var(--text-danger)' } }, u),
		);
	}
	var Xh = m(() => {
		'use strict';
		a();
		x();
	});
	var ir = m(() => {
		'use strict';
		a();
		Uh();
		Hh();
		jh();
		Wh();
		Kh();
		ru();
		Xh();
	});
	var su,
		Jh = m(() => {
			'use strict';
			a();
			wt();
			E();
			ir();
			w();
			T();
			su = g({
				name: 'Fart2',
				authors: [p.Animal],
				description:
					'Enable farting v2, a slash command that allows you to perform or request that someone perform a little toot.',
				dependencies: ['CommandsAPI'],
				commands: [
					{
						name: 'fart',
						description:
							'A simple command in which you may either request that a user do a little toot for you, or conduct one yourself.',
						options: [
							{
								type: 6,
								name: 'user',
								description:
									'A Discord\u2122 user of which you would humbly request a toot from.',
								required: !1,
							},
						],
						execute(e) {
							let t = new Audio(
								'https://raw.githubusercontent.com/ItzOnlyAnimal/AliuPlugins/main/fart.mp3',
							);
							return (
								(t.volume = M.plugins.Fart2.volume),
								t.play(),
								{
									content: e[0]
										? `<@${e[0].value}> fart`
										: 'fart',
								}
							);
						},
					},
				],
				options: {
					volume: {
						description: 'how loud you wanna fart (aka volume)',
						type: 5,
						markers: go(0, 1, 0.1),
						default: 0.5,
						stickToMarkers: !1,
					},
				},
			});
		});
	var au,
		Qh = m(() => {
			'use strict';
			a();
			w();
			T();
			x();
			au = g({
				name: 'FavoriteEmojiFirst',
				authors: [p.Aria, p.Ven],
				description:
					'Puts your favorite emoji first in the emoji autocomplete.',
				patches: [
					{
						find: '.activeCommandOption',
						replacement: [
							{
								match: /=\i\(\i\.selectedIndex\);(?=.+?state:(\i),isInPopoutExperiment:\i)/,
								replace: '$&$self.sortEmojis($1);',
							},
							{
								match: /,maxCount:(\i)(.+?)=(\i)\.slice\(0,(\1-\i\.length)\)/,
								replace:
									',maxCount:Infinity$2=($3.sliceTo=$4,$3)',
							},
						],
					},
				],
				sortEmojis({ query: e }) {
					if (
						e?.type !== 'EMOJIS_AND_STICKERS' ||
						e.typeInfo?.sentinel !== ':' ||
						!e.results?.emojis?.length
					)
						return;
					let t = un.getDisambiguatedEmojiContext();
					e.results.emojis = e.results.emojis
						.sort((n, i) => {
							let r = t.isFavoriteEmojiWithoutFetchingLatest(n),
								s = t.isFavoriteEmojiWithoutFetchingLatest(i);
							return r && !s ? -1 : !r && s ? 1 : 0;
						})
						.slice(0, e.results.emojis.sliceTo ?? 10);
				},
			});
		});
	var lu,
		Vh = m(() => {
			'use strict';
			a();
			w();
			T();
			x();
			lu = g({
				name: 'FixInbox',
				description:
					"Fixes the Unreads Inbox from crashing Discord when you're in lots of guilds.",
				authors: [p.Megu],
				patches: [
					{
						find: 'INBOX_OPEN:function',
						replacement: {
							match: /INBOX_OPEN:function.+?\{/,
							replace: '$&return true;',
						},
					},
				],
				settingsAboutComponent() {
					return o(
						y.FormSection,
						null,
						o(y.FormTitle, { tag: 'h3' }, "What's the problem?"),
						o(
							y.FormText,
							{ style: { marginBottom: 8 } },
							"By default, Discord emits a GUILD_SUBSCRIPTIONS event for every guild you're in. When you're in a lot of guilds, this can cause the gateway to ratelimit you. This causes the client to crash and get stuck in an infinite ratelimit loop as it tries to reconnect.",
						),
						o(y.FormTitle, { tag: 'h3' }, 'How does it work?'),
						o(
							y.FormText,
							null,
							"This plugin works by stopping the client from sending GUILD_SUBSCRIPTIONS events to the gateway when you open the unreads inbox. This means that not all unreads will be shown, instead only already-subscribed guilds' unreads will be shown, but your client won't crash anymore.",
						),
					);
				},
			});
		});
	var cu,
		ey = m(() => {
			'use strict';
			a();
			w();
			T();
			x();
			cu = g({
				name: 'ForceOwnerCrown',
				description:
					'Force the owner crown next to usernames even if the server is large.',
				authors: [p.D3SOX, p.Nickyux],
				patches: [
					{
						find: '.renderOwner=',
						replacement: {
							match: /isOwner;return null!=(\w+)?&&/g,
							replace:
								'isOwner;if($self.isGuildOwner(this.props)){$1=true;}return null!=$1&&',
						},
					},
				],
				isGuildOwner(e) {
					if (e?.channel?.type === 3) return !1;
					let t = e?.guildId ?? e?.channel?.guild_id,
						n = e?.user?.id;
					if (t && n) {
						let i = le.getGuild(t);
						if (i) return i.ownerId === n;
						console.error('[ForceOwnerCrown] failed to get guild', {
							guildId: t,
							guild: i,
							props: e,
						});
					} else
						console.error(
							'[ForceOwnerCrown] no guildId or userId',
							{ guildId: t, userId: n, props: e },
						);
					return !1;
				},
			});
		});
	var uu,
		hw,
		pu,
		ty = m(() => {
			'use strict';
			a();
			wt();
			w();
			T();
			_();
			x();
			(uu = P('createFriendInvite')),
				(hw = P('v4', 'v1')),
				(pu = g({
					name: 'FriendInvites',
					description:
						'Create and manage friend invite links via slash commands (/create friend invite, /view friend invites, /revoke friend invites).',
					authors: [p.afn, p.Dziurwa],
					dependencies: ['CommandsAPI'],
					commands: [
						{
							name: 'create friend invite',
							description: 'Generates a friend invite link.',
							inputType: 3,
							execute: async (e, t) => {
								if (!U.getCurrentUser().phone)
									return ie(t.channel.id, {
										content:
											'You need to have a phone number connected to your account to create a friend invite!',
									});
								let n = hw.v4(),
									i = await Yt.post({
										url: '/friend-finder/find-friends',
										body: {
											modified_contacts: {
												[n]: [1, '', ''],
											},
											phone_contact_methods_count: 1,
										},
									}).then((r) =>
										uu.createFriendInvite({
											code: r.body
												.invite_suggestions[0][3],
											recipient_phone_number_or_email: n,
											contact_visibility: 1,
											filter_visibilities: [],
											filtered_invite_suggestions_index: 1,
										}),
									);
								ie(t.channel.id, {
									content: `
                        discord.gg/${i.code} \xB7
                        Expires: <t:${
							new Date(i.expires_at).getTime() / 1e3
						}:R> \xB7
                        Max uses: \`${i.max_uses}\`
                    `
										.trim()
										.replace(/\s+/g, ' '),
								});
							},
						},
						{
							name: 'view friend invites',
							description:
								'View a list of all generated friend invites.',
							inputType: 3,
							execute: async (e, t) => {
								let i = (await uu.getAllFriendInvites()).map(
									(r) =>
										`
                    _discord.gg/${r.code}_ \xB7
                    Expires: <t:${
						new Date(r.expires_at).getTime() / 1e3
					}:R> \xB7
                    Times used: \`${r.uses}/${r.max_uses}\`
                    `
											.trim()
											.replace(/\s+/g, ' '),
								);
								ie(t.channel.id, {
									content:
										i.join(`
`) || 'You have no active friend invites!',
								});
							},
						},
						{
							name: 'revoke friend invites',
							description:
								'Revokes all generated friend invites.',
							inputType: 3,
							execute: async (e, t) => (
								await uu.revokeFriendInvites(),
								void ie(t.channel.id, {
									content:
										'All friend invites have been revoked.',
								})
							),
						},
					],
				}));
		});
	var mu = {};
	me(mu, { getSettingStore: () => ny, getSettingStoreLazy: () => du });
	function ny(e, t) {
		if (!M.plugins.SettingsStoreAPI.enabled)
			throw new Error(
				'Cannot use SettingsStoreAPI without setting as dependency.',
			);
		return yw?.find(
			(n) =>
				n?.settingsStoreApiGroup === e && n?.settingsStoreApiName === t,
		);
	}
	function du(e, t) {
		return ct(() => ny(e, t));
	}
	var yw,
		fu = m(() => {
			'use strict';
			a();
			rn();
			Se();
			_();
			E();
			yw = ct(() => {
				let e = Zr('"textAndImages","renderSpoilers"');
				if (e == null)
					return new Z('SettingsStoreAPI').error(
						"Didn't find stores module.",
					);
				let t = Ft(e);
				if (t != null)
					return Object.values(t).filter(
						(n) => n?.settingsStoreApiGroup,
					);
			});
		});
	var gu,
		oy = m(() => {
			a();
			(window.VencordStyles ??= new Map()).set(
				'src/plugins/gameActivityToggle/style.css',
				{
					name: 'src/plugins/gameActivityToggle/style.css',
					source: `[class*="withTagAsButton"] {
    min-width: 88px;
}
`,
					classNames: {},
					dom: null,
				},
			);
			gu = 'src/plugins/gameActivityToggle/style.css';
		});
	function Sw(e) {
		return function () {
			return o(
				'svg',
				{ width: '24', height: '24', viewBox: '0 96 960 960' },
				o('path', {
					fill: 'currentColor',
					d: 'M182 856q-51 0-79-35.5T82 734l42-300q9-60 53.5-99T282 296h396q60 0 104.5 39t53.5 99l42 300q7 51-21 86.5T778 856q-21 0-39-7.5T706 826l-90-90H344l-90 90q-15 15-33 22.5t-39 7.5Zm498-240q17 0 28.5-11.5T720 576q0-17-11.5-28.5T680 536q-17 0-28.5 11.5T640 576q0 17 11.5 28.5T680 616Zm-80-120q17 0 28.5-11.5T640 456q0-17-11.5-28.5T600 416q-17 0-28.5 11.5T560 456q0 17 11.5 28.5T600 496ZM310 616h60v-70h70v-60h-70v-70h-60v70h-70v60h70v70Z',
				}),
				!e &&
					o('line', {
						x1: '920',
						y1: '280',
						x2: '40',
						y2: '880',
						stroke: 'var(--status-danger)',
						'stroke-width': '80',
					}),
			);
		};
	}
	function bw() {
		let e = iy?.useSetting();
		return o(vw, {
			tooltipText: e ? 'Disable Game Activity' : 'Enable Game Activity',
			icon: Sw(e),
			role: 'switch',
			'aria-checked': !e,
			onClick: () => iy?.updateSetting((t) => !t),
		});
	}
	var iy,
		vw,
		hu,
		ry = m(() => {
			'use strict';
			a();
			fu();
			je();
			re();
			w();
			T();
			_();
			oy();
			(iy = du('status', 'showCurrentGame')),
				(vw = ce('Button.Sizes.NONE,disabled:'));
			hu = g({
				name: 'GameActivityToggle',
				description:
					'Adds a button next to the mic and deafen button to toggle game activity.',
				authors: [p.Nuckyz],
				dependencies: ['SettingsStoreAPI'],
				patches: [
					{
						find: '.Messages.ACCOUNT_SPEAKING_WHILE_MUTED',
						replacement: {
							match: /this\.renderNameZone\(\).+?children:\[/,
							replace: '$&$self.GameActivityToggleButton(),',
						},
					},
				],
				GameActivityToggleButton: k.wrap(bw, { noop: !0 }),
				start() {
					Je(gu);
				},
				stop() {
					bt(gu);
				},
			});
		});
	var Tw,
		yu,
		sy = m(() => {
			'use strict';
			a();
			w();
			$n();
			T();
			_();
			(Tw = Ye('name:"expression-picker-last-active-view"', {
				close: Y.byCode('activeView:null', 'setState'),
			})),
				(yu = g({
					name: 'GifPaste',
					description:
						'Makes picking a gif in the gif picker insert a link into the chatbox instead of instantly sending it',
					authors: [p.Ven],
					patches: [
						{
							find: '.handleSelectGIF=',
							replacement: {
								match: /\.handleSelectGIF=function.+?\{/,
								replace:
									'.handleSelectGIF=function(gif){return $self.handleSelect(gif);',
							},
						},
					],
					handleSelect(e) {
						e && (Bn(e.url + ' '), Tw.close());
					},
				}));
		});
	var vu = {};
	me(vu, {
		_buildPopoverElements: () => ww,
		addButton: () => yn,
		buttons: () => Fs,
		removeButton: () => vn,
	});
	function yn(e, t) {
		Fs.set(e, t);
	}
	function vn(e) {
		Fs.delete(e);
	}
	function ww(e, t) {
		let n = [];
		for (let [i, r] of Fs.entries())
			try {
				let s = r(e);
				s && ((s.key ??= i), n.push(t(s)));
			} catch (s) {
				xw.error(`[${i}]`, s);
			}
		return n;
	}
	var xw,
		Fs,
		Oo = m(() => {
			'use strict';
			a();
			Se();
			(xw = new Z('MessagePopover')), (Fs = new Map());
		});
	var rr,
		ly,
		Mw,
		Pw,
		sr,
		ay,
		Iw,
		Su,
		cy = m(() => {
			'use strict';
			a();
			Pn();
			Oo();
			w();
			T();
			x();
			(ly = 'HideAttachments_HiddenIds'),
				(Mw = () =>
					o(
						'svg',
						{
							viewBox: '0 0 24 24',
							fill: 'currentColor',
							'aria-hidden': 'true',
						},
						o('path', {
							d: 'M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Zm0-2h14V5H5v14Zm1-2h12l-3.75-5-3 4L9 13Zm-1 2V5v14Z',
						}),
					)),
				(Pw = () =>
					o(
						'svg',
						{
							viewBox: '0 0 24 24',
							fill: 'currentColor',
							'aria-hidden': 'true',
						},
						o('path', {
							d: 'm21 18.15-2-2V5H7.85l-2-2H19q.825 0 1.413.587Q21 4.175 21 5Zm-1.2 4.45L18.2 21H5q-.825 0-1.413-.587Q3 19.825 3 19V5.8L1.4 4.2l1.4-1.4 18.4 18.4ZM6 17l3-4 2.25 3 .825-1.1L5 7.825V19h11.175l-2-2Zm7.425-6.425ZM10.6 13.4Z',
						}),
					)),
				(sr = new Set()),
				(ay = () => Qe(ly).then((e) => ((sr = e ?? new Set()), sr))),
				(Iw = (e) => Ve(ly, e)),
				(Su = g({
					name: 'HideAttachments',
					description:
						'Hide attachments and Embeds for individual messages via hover button',
					authors: [p.Ven],
					dependencies: ['MessagePopoverAPI'],
					async start() {
						(rr = document.createElement('style')),
							(rr.id = 'VencordHideAttachments'),
							document.head.appendChild(rr),
							await ay(),
							await this.buildCss(),
							yn('HideAttachments', (e) => {
								if (!e.attachments.length && !e.embeds.length)
									return null;
								let t = sr.has(e.id);
								return {
									label: t
										? 'Show Attachments'
										: 'Hide Attachments',
									icon: t ? Mw : Pw,
									message: e,
									channel: X.getChannel(e.channel_id),
									onClick: () => this.toggleHide(e.id),
								};
							});
					},
					stop() {
						rr.remove(), sr.clear(), vn('HideAttachments');
					},
					async buildCss() {
						let e = [...sr]
							.map((t) => `#message-accessories-${t}`)
							.join(',');
						rr.textContent = `
        :is(${e}) [class*="embedWrapper"] {
            /* important is not necessary, but add it to make sure bad themes won't break it */
            display: none !important;
        }
        :is(${e})::after {
            content: "Attachments hidden";
            color: var(--text-muted);
            font-size: 80%;
        }
        `;
					},
					async toggleHide(e) {
						let t = await ay();
						t.delete(e) || t.add(e),
							await Iw(t),
							await this.buildCss();
					},
				}));
		});
	var bu,
		uy = m(() => {
			'use strict';
			a();
			w();
			T();
			bu = g({
				name: 'iLoveSpam',
				description: "Do not hide messages from 'likely spammers'",
				authors: [p.botato, p.Animal],
				patches: [
					{
						find: '),{hasFlag:',
						replacement: {
							match: /(if\((.{1,2})<=1<<30\)return)/,
							replace: 'if($2===(1<<20)){return false};$1',
						},
					},
				],
			});
		});
	function Aw() {
		return o(
			'svg',
			{
				className: si.overlayToggleIconOff,
				height: '24',
				width: '24',
				viewBox: '0 0 32 26',
				'aria-hidden': !0,
				role: 'img',
			},
			o(
				'g',
				{ fill: 'none', fillRule: 'evenodd' },
				o('path', {
					className: si.fill,
					fill: 'currentColor',
					d: 'M 16 8 C 7.664063 8 1.25 15.34375 1.25 15.34375 L 0.65625 16 L 1.25 16.65625 C 1.25 16.65625 7.097656 23.324219 14.875 23.9375 C 15.246094 23.984375 15.617188 24 16 24 C 16.382813 24 16.753906 23.984375 17.125 23.9375 C 24.902344 23.324219 30.75 16.65625 30.75 16.65625 L 31.34375 16 L 30.75 15.34375 C 30.75 15.34375 24.335938 8 16 8 Z M 16 10 C 18.203125 10 20.234375 10.601563 22 11.40625 C 22.636719 12.460938 23 13.675781 23 15 C 23 18.613281 20.289063 21.582031 16.78125 21.96875 C 16.761719 21.972656 16.738281 21.964844 16.71875 21.96875 C 16.480469 21.980469 16.242188 22 16 22 C 15.734375 22 15.476563 21.984375 15.21875 21.96875 C 11.710938 21.582031 9 18.613281 9 15 C 9 13.695313 9.351563 12.480469 9.96875 11.4375 L 9.9375 11.4375 C 11.71875 10.617188 13.773438 10 16 10 Z M 16 12 C 14.34375 12 13 13.34375 13 15 C 13 16.65625 14.34375 18 16 18 C 17.65625 18 19 16.65625 19 15 C 19 13.34375 17.65625 12 16 12 Z M 7.25 12.9375 C 7.09375 13.609375 7 14.285156 7 15 C 7 16.753906 7.5 18.394531 8.375 19.78125 C 5.855469 18.324219 4.105469 16.585938 3.53125 16 C 4.011719 15.507813 5.351563 14.203125 7.25 12.9375 Z M 24.75 12.9375 C 26.648438 14.203125 27.988281 15.507813 28.46875 16 C 27.894531 16.585938 26.144531 18.324219 23.625 19.78125 C 24.5 18.394531 25 16.753906 25 15 C 25 14.285156 24.90625 13.601563 24.75 12.9375 Z',
				}),
				o('rect', {
					className: si.fill,
					x: '3',
					y: '26',
					width: '26',
					height: '2',
					transform: 'rotate(-45 2 20)',
				}),
			),
		);
	}
	function Nw({ forceWhite: e }) {
		return o(
			'svg',
			{
				className: si.overlayToggleIconOn,
				height: '24',
				width: '24',
				viewBox: '0 0 32 26',
			},
			o('path', {
				className: e ? '' : si.fill,
				fill: e ? 'var(--white-500)' : '',
				d: 'M 16 8 C 7.664063 8 1.25 15.34375 1.25 15.34375 L 0.65625 16 L 1.25 16.65625 C 1.25 16.65625 7.097656 23.324219 14.875 23.9375 C 15.246094 23.984375 15.617188 24 16 24 C 16.382813 24 16.753906 23.984375 17.125 23.9375 C 24.902344 23.324219 30.75 16.65625 30.75 16.65625 L 31.34375 16 L 30.75 15.34375 C 30.75 15.34375 24.335938 8 16 8 Z M 16 10 C 18.203125 10 20.234375 10.601563 22 11.40625 C 22.636719 12.460938 23 13.675781 23 15 C 23 18.613281 20.289063 21.582031 16.78125 21.96875 C 16.761719 21.972656 16.738281 21.964844 16.71875 21.96875 C 16.480469 21.980469 16.242188 22 16 22 C 15.734375 22 15.476563 21.984375 15.21875 21.96875 C 11.710938 21.582031 9 18.613281 9 15 C 9 13.695313 9.351563 12.480469 9.96875 11.4375 L 9.9375 11.4375 C 11.71875 10.617188 13.773438 10 16 10 Z M 16 12 C 14.34375 12 13 13.34375 13 15 C 13 16.65625 14.34375 18 16 18 C 17.65625 18 19 16.65625 19 15 C 19 13.34375 17.65625 12 16 12 Z M 7.25 12.9375 C 7.09375 13.609375 7 14.285156 7 15 C 7 16.753906 7.5 18.394531 8.375 19.78125 C 5.855469 18.324219 4.105469 16.585938 3.53125 16 C 4.011719 15.507813 5.351563 14.203125 7.25 12.9375 Z M 24.75 12.9375 C 26.648438 14.203125 27.988281 15.507813 28.46875 16 C 27.894531 16.585938 26.144531 18.324219 23.625 19.78125 C 24.5 18.394531 25 16.753906 25 15 C 25 14.285156 24.90625 13.601563 24.75 12.9375 Z',
			}),
		);
	}
	function dy({ activity: e, forceWhite: t, forceLeftMargin: n }) {
		let i = Bt();
		return o(
			W,
			{ text: 'Toggle activity' },
			({ onMouseLeave: r, onMouseEnter: s }) =>
				o(
					'div',
					{
						onMouseLeave: r,
						onMouseEnter: s,
						className: si.overlayToggleIcon,
						role: 'button',
						'aria-label': 'Toggle activity',
						tabIndex: 0,
						style: n ? { marginLeft: '2px' } : void 0,
						onClick: (l) => Lw(l, e, i),
					},
					Qt.has(e.id) ? o(Aw, null) : o(Nw, { forceWhite: t }),
				),
		);
	}
	function kw({ activity: e }) {
		return o(
			'div',
			{
				className: `${Rw.tryItOutBadge} ${Cw.baseShapeRound}`,
				style: { padding: '0px 2px' },
			},
			o(dy, { activity: e, forceWhite: !0 }),
		);
	}
	function Lw(e, t, n) {
		e.stopPropagation(),
			Qt.has(t.id) ? Qt.delete(t.id) : Qt.set(t.id, t),
			n(),
			Tu();
	}
	async function Tu() {
		await Ve('IgnoreActivities_ignoredActivities', Qt);
	}
	var si,
		Rw,
		Cw,
		py,
		Qt,
		xu,
		my = m(() => {
			'use strict';
			a();
			Pn();
			re();
			w();
			ye();
			T();
			_();
			x();
			(si = P('overlayToggleIconOff', 'overlayToggleIconOn')),
				(Rw = P('tryItOutBadge', 'tryItOutBadgeIcon')),
				(Cw = P(
					'baseShapeRound',
					'baseShapeRoundLeft',
					'baseShapeRoundRight',
				)),
				(py = ue('RunningGameStore'));
			(Qt = new Map()),
				(xu = g({
					name: 'IgnoreActivities',
					authors: [p.Nuckyz],
					description:
						'Ignore certain activities (like games and actual activities) from showing up on your status. You can configure which ones are ignored from the Registered Games and Activities tabs.',
					patches: [
						{
							find: '.Messages.SETTINGS_GAMES_TOGGLE_OVERLAY',
							replacement: {
								match: /!(\i)(\)return null;var \i=(\i)\.overlay.+?children:)(\[.{0,70}overlayStatusText.+?\])(?=}\)}\(\))/,
								replace: (e, t, n, i, r) =>
									`false${n}(${t}?${r}:[]).concat(Vencord.Plugins.plugins.IgnoreActivities.renderToggleGameActivityButton(${i}))`,
							},
						},
						{
							find: '.overlayBadge',
							replacement: {
								match: /(?<=\(\)\.badgeContainer.+?(\i)\.name}\):null)/,
								replace: (e, t) =>
									`,$self.renderToggleActivityButton(${t})`,
							},
						},
						{
							find: '.displayName="LocalActivityStore"',
							replacement: {
								match: /LISTENING.+?\)\);(?<=(\i)\.push.+?)/,
								replace: (e, t) =>
									`${e}${t}=${t}.filter($self.isActivityNotIgnored);`,
							},
						},
					],
					async start() {
						let e =
							(await Qe('IgnoreActivities_ignoredActivities')) ??
							new Map();
						if (Array.isArray(e)) {
							for (let t of e) Qt.set(t, { id: t, type: 0 });
							await Tu();
						} else Qt = e;
						if (Qt.size !== 0) {
							let t = py.getGamesSeen();
							for (let n of Qt.values())
								n.type === 0 &&
									(t.some(
										(i) =>
											i.id === n.id || i.exePath === n.id,
									) ||
										Qt.delete(n.id));
							await Tu();
						}
					},
					renderToggleGameActivityButton(e) {
						return o(
							k,
							{ noop: !0 },
							o(dy, {
								activity: { id: e.id ?? e.exePath, type: 0 },
								forceLeftMargin: !0,
							}),
						);
					},
					renderToggleActivityButton(e) {
						return o(
							k,
							{ noop: !0 },
							o(kw, { activity: { id: e.id, type: 1 } }),
						);
					},
					isActivityNotIgnored(e) {
						if (e.type === 0) {
							if (e.application_id !== void 0)
								return !Qt.has(e.application_id);
							{
								let t = py
									.getRunningGames()
									.find((n) => n.name === e.name)?.exePath;
								if (t) return !Qt.has(t);
							}
						}
						return !0;
					},
				}));
		});
	var ar,
		wu = m(() => {
			'use strict';
			a();
			ar = 'vc-imgzoom-magnify-modal';
		});
	function Mu(e, t) {
		e() ? t() : requestAnimationFrame(() => Mu(e, t));
	}
	var fy = m(() => {
		'use strict';
		a();
	});
	var Pu,
		gy = m(() => {
			'use strict';
			a();
			x();
			wu();
			Iu();
			fy();
			Pu = ({ instance: e, size: t, zoom: n }) => {
				let [i, r] = V(!1),
					[s, l] = V({ x: 0, y: 0 }),
					[c, u] = V({ x: 0, y: 0 }),
					[h, f] = V(0),
					v = qt(!1),
					S = qt(n),
					b = qt(t),
					A = qt(null),
					C = qt(null),
					D = qt(null),
					B = qt(null);
				if (
					(I.useLayoutEffect(() => {
						let K = (ne) => {
								ne.key === 'Shift' && (v.current = !0);
							},
							ee = (ne) => {
								ne.key === 'Shift' && (v.current = !1);
							},
							j = () => {
								C.current.currentTime = D.current.currentTime;
							},
							z = (ne) => {
								if (e.state.mouseOver && e.state.mouseDown) {
									let Fe = b.current / 2,
										Ee = { x: ne.pageX, y: ne.pageY },
										at = -(
											(Ee.x -
												A.current.getBoundingClientRect()
													.left) *
												S.current -
											Fe
										),
										qe = -(
											(Ee.y -
												A.current.getBoundingClientRect()
													.top) *
												S.current -
											Fe
										);
									l({ x: ne.x - Fe, y: ne.y - Fe }),
										u({ x: at, y: qe }),
										f(1);
								} else f(0);
							},
							te = (ne) => {
								e.state.mouseOver &&
									ne.button === 0 &&
									((S.current = Oe.store.zoom),
									(b.current = Oe.store.size),
									document.getElementById('image-context') &&
										L.dispatch({
											type: 'CONTEXT_MENU_CLOSE',
										}),
									z(ne),
									f(1));
							},
							$ = () => {
								f(0),
									Oe.store.saveZoomValues &&
										((Oe.store.zoom = S.current),
										(Oe.store.size = b.current));
							},
							Re = async (ne) => {
								if (
									e.state.mouseOver &&
									e.state.mouseDown &&
									!v.current
								) {
									let Fe =
										S.current +
										(ne.deltaY / 100) *
											(Oe.store.invertScroll ? -1 : 1) *
											Oe.store.zoomSpeed;
									(S.current = Fe <= 1 ? 1 : Fe), z(ne);
								}
								if (
									e.state.mouseOver &&
									e.state.mouseDown &&
									v.current
								) {
									let Fe =
										b.current +
										ne.deltaY *
											(Oe.store.invertScroll ? -1 : 1) *
											Oe.store.zoomSpeed;
									(b.current = Fe <= 50 ? 50 : Fe), z(ne);
								}
							};
						return (
							Mu(
								() => e.state.readyState === 'READY',
								() => {
									let ne = document.getElementById(ar);
									(A.current = ne),
										ne.firstElementChild.setAttribute(
											'draggable',
											'false',
										),
										e.props.animated &&
											((D.current =
												ne.querySelector('video')),
											D.current.addEventListener(
												'timeupdate',
												j,
											)),
										r(!0);
								},
							),
							document.addEventListener('keydown', K),
							document.addEventListener('keyup', ee),
							document.addEventListener('mousemove', z),
							document.addEventListener('mousedown', te),
							document.addEventListener('mouseup', $),
							document.addEventListener('wheel', Re),
							() => {
								document.removeEventListener('keydown', K),
									document.removeEventListener('keyup', ee),
									document.removeEventListener(
										'mousemove',
										z,
									),
									document.removeEventListener(
										'mousedown',
										te,
									),
									document.removeEventListener('mouseup', $),
									document.removeEventListener('wheel', Re),
									Oe.store.saveZoomValues &&
										((Oe.store.zoom = S.current),
										(Oe.store.size = b.current));
							}
						);
					}, []),
					!i)
				)
					return null;
				let O = A.current.getBoundingClientRect();
				return o(
					'div',
					{
						className: 'vc-imgzoom-lens',
						style: {
							opacity: h,
							width: b.current + 'px',
							height: b.current + 'px',
							transform: `translate(${s.x}px, ${s.y}px)`,
						},
					},
					e.props.animated
						? o('video', {
								ref: C,
								style: {
									position: 'absolute',
									left: `${c.x}px`,
									top: `${c.y}px`,
								},
								width: `${O.width * S.current}px`,
								height: `${O.height * S.current}px`,
								poster: e.props.src,
								src: D.current?.src ?? e.props.src,
								autoPlay: !0,
								loop: !0,
						  })
						: o('img', {
								ref: B,
								style: {
									position: 'absolute',
									transform: `translate(${c.x}px, ${c.y}px)`,
								},
								width: `${O.width * S.current}px`,
								height: `${O.height * S.current}px`,
								src: e.props.src,
								alt: '',
						  }),
				);
			};
		});
	var Ru,
		hy = m(() => {
			a();
			(window.VencordStyles ??= new Map()).set(
				'src/plugins/imageZoom/styles.css',
				{
					name: 'src/plugins/imageZoom/styles.css',
					source: `.vc-imgzoom-lens {
    position: absolute;
    inset: 0;
    z-index: 9999;
    border: 2px solid grey;
    border-radius: 50%;
    overflow: hidden;
    cursor: none;
    box-shadow: inset 0 0 10px 2px grey;
    filter: drop-shadow(0 0 2px grey);
    pointer-events: none;
}

/* make the carousel take up less space so we can click the backdrop and exit out of it */
[class|="carouselModal"] {
    height: fit-content;
    box-shadow: none;
}

[class*="modalCarouselWrapper"] {
    height: fit-content;
    top: 50%;
    transform: translateY(-50%);
}

[class|="wrapper"]:has(> #vc-imgzoom-magnify-modal) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
`,
					classNames: {},
					dom: null,
				},
			);
			Ru = 'src/plugins/imageZoom/styles.css';
		});
	var Oe,
		yy,
		Cu,
		Iu = m(() => {
			'use strict';
			a();
			Jt();
			E();
			je();
			ir();
			w();
			Ko();
			T();
			x();
			gy();
			wu();
			hy();
			(Oe = N({
				saveZoomValues: {
					type: 3,
					description: 'Whether to save zoom and lens size values',
					default: !0,
				},
				preventCarouselFromClosingOnClick: {
					type: 3,
					description:
						'Allow the image modal in the image slideshow thing / carousel to remain open when clicking on the image',
					default: !0,
				},
				invertScroll: {
					type: 3,
					description: 'Invert scroll',
					default: !0,
				},
				zoom: {
					description: 'Zoom of the lens',
					type: 5,
					markers: go(1, 50, 4),
					default: 2,
					stickToMarkers: !1,
				},
				size: {
					description: 'Radius / Size of the lens',
					type: 5,
					markers: go(50, 1e3, 50),
					default: 100,
					stickToMarkers: !1,
				},
				zoomSpeed: {
					description: 'How fast the zoom / lens size changes',
					type: 5,
					markers: go(0.1, 5, 0.2),
					default: 0.5,
					stickToMarkers: !1,
				},
			})),
				(yy = (e) => () => {
					e.push(
						o(
							F.MenuGroup,
							{ id: 'image-zoom' },
							o(F.MenuControlItem, {
								id: 'zoom',
								label: 'Zoom',
								control: (t, n) =>
									o(F.MenuSliderControl, {
										ref: n,
										...t,
										minValue: 1,
										maxValue: 50,
										value: Oe.store.zoom,
										onChange: Ct(
											(i) => (Oe.store.zoom = i),
											100,
										),
									}),
							}),
							o(F.MenuControlItem, {
								id: 'size',
								label: 'Lens Size',
								control: (t, n) =>
									o(F.MenuSliderControl, {
										ref: n,
										...t,
										minValue: 50,
										maxValue: 1e3,
										value: Oe.store.size,
										onChange: Ct(
											(i) => (Oe.store.size = i),
											100,
										),
									}),
							}),
							o(F.MenuControlItem, {
								id: 'zoom-speed',
								label: 'Zoom Speed',
								control: (t, n) =>
									o(F.MenuSliderControl, {
										ref: n,
										...t,
										minValue: 0.1,
										maxValue: 5,
										value: Oe.store.zoomSpeed,
										onChange: Ct(
											(i) => (Oe.store.zoomSpeed = i),
											100,
										),
										renderValue: (i) => `${i.toFixed(3)}x`,
									}),
							}),
						),
					);
				}),
				(Cu = g({
					name: 'ImageZoom',
					description:
						'Lets you zoom in to images and gifs. Use scroll wheel to zoom in and shift + scroll wheel to increase lens radius / size',
					authors: [p.Aria],
					tags: ['ImageUtilities'],
					patches: [
						{
							find: '"renderLinkComponent","maxWidth"',
							replacement: {
								match: /(return\(.{1,100}\(\)\.wrapper.{1,100})(src)/,
								replace: `$1id: '${ar}',$2`,
							},
						},
						{
							find: 'handleImageLoad=',
							replacement: [
								{
									match: /(render=function\(\){.{1,500}limitResponsiveWidth.{1,600})onMouseEnter:/,
									replace:
										'$1...$self.makeProps(this),onMouseEnter:',
								},
								{
									match: /componentDidMount=function\(\){/,
									replace: '$&$self.renderMagnifier(this);',
								},
								{
									match: /componentWillUnmount=function\(\){/,
									replace: '$&$self.unMountMagnifier();',
								},
							],
						},
						{
							find: '.carouselModal,',
							replacement: {
								match: /onClick:(\i),/,
								replace:
									'onClick:$self.settings.store.preventCarouselFromClosingOnClick ? () => {} : $1,',
							},
						},
					],
					settings: Oe,
					currentMagnifierElement: null,
					element: null,
					Magnifier: Pu,
					root: null,
					makeProps(e) {
						return {
							onMouseOver: () => this.onMouseOver(e),
							onMouseOut: () => this.onMouseOut(e),
							onMouseDown: (t) => this.onMouseDown(t, e),
							onMouseUp: () => this.onMouseUp(e),
							id: e.props.id,
						};
					},
					renderMagnifier(e) {
						e.props.id === ar &&
							(this.currentMagnifierElement ||
								((this.currentMagnifierElement = o(Pu, {
									size: Oe.store.size,
									zoom: Oe.store.zoom,
									instance: e,
								})),
								(this.root = Ro.createRoot(this.element)),
								this.root.render(
									this.currentMagnifierElement,
								)));
					},
					unMountMagnifier() {
						this.root?.unmount(),
							(this.currentMagnifierElement = null),
							(this.root = null);
					},
					onMouseOver(e) {
						e.setState((t) => ({ ...t, mouseOver: !0 }));
					},
					onMouseOut(e) {
						e.setState((t) => ({ ...t, mouseOver: !1 }));
					},
					onMouseDown(e, t) {
						e.button === 0 &&
							t.setState((n) => ({ ...n, mouseDown: !0 }));
					},
					onMouseUp(e) {
						e.setState((t) => ({ ...t, mouseDown: !1 }));
					},
					start() {
						Je(Ru),
							we('image-context', yy),
							(this.element = document.createElement('div')),
							this.element.classList.add('MagnifierContainer'),
							document.body.appendChild(this.element);
					},
					stop() {
						bt(Ru),
							this.root && this.root.unmount(),
							this.element?.remove(),
							Ae('image-context', yy);
					},
				}));
		});
	function Ew(e) {
		let t = e?.message?.content,
			[n, i] = I.useState('password');
		return o(
			Ie,
			{ ...e },
			o($e, null, o(y.FormTitle, { tag: 'h4' }, 'Decrypt Message')),
			o(
				Le,
				null,
				o(
					y.FormTitle,
					{ tag: 'h5', style: { marginTop: '10px' } },
					'Secret',
				),
				o(Ne, { defaultValue: t, disabled: !0 }),
				o(y.FormTitle, { tag: 'h5' }, 'Password'),
				o(Ne, { style: { marginBottom: '20px' }, onChange: i }),
			),
			o(
				ot,
				null,
				o(
					R,
					{
						color: R.Colors.GREEN,
						onClick: () => {
							let r = Au(t, n, !0);
							!r ||
								!e?.message ||
								(Vencord.Plugins.plugins.InvisibleChat.buildEmbed(
									e?.message,
									r,
								),
								e.onClose());
						},
					},
					'Decrypt',
				),
				o(
					R,
					{
						color: R.Colors.TRANSPARENT,
						look: R.Looks.LINK,
						style: { left: 15, position: 'absolute' },
						onClick: e.onClose,
					},
					'Cancel',
				),
			),
		);
	}
	function vy(e) {
		be((t) => o(Ew, { ...t, ...e }));
	}
	var Sy = m(() => {
		'use strict';
		a();
		ze();
		x();
		Bs();
	});
	function Dw(e) {
		let [t, n] = I.useState(''),
			[i, r] = I.useState(''),
			[s, l] = I.useState('password'),
			[c, u] = I.useState(!1),
			h = t && (c || (i && /\w \w/.test(i)));
		return o(
			Ie,
			{ ...e },
			o($e, null, o(y.FormTitle, { tag: 'h4' }, 'Encrypt Message')),
			o(
				Le,
				null,
				o(
					y.FormTitle,
					{ tag: 'h5', style: { marginTop: '10px' } },
					'Secret',
				),
				o(Ne, {
					onChange: (f) => {
						n(f);
					},
				}),
				o(
					y.FormTitle,
					{ tag: 'h5', style: { marginTop: '10px' } },
					'Cover (2 or more Words!!)',
				),
				o(Ne, {
					disabled: c,
					onChange: (f) => {
						r(f);
					},
				}),
				o(
					y.FormTitle,
					{ tag: 'h5', style: { marginTop: '10px' } },
					'Password',
				),
				o(Ne, {
					style: { marginBottom: '20px' },
					defaultValue: 'password',
					onChange: (f) => {
						l(f);
					},
				}),
				o(
					Nt,
					{
						value: c,
						onChange: (f) => {
							u(f);
						},
					},
					"Don't use a Cover",
				),
			),
			o(
				ot,
				null,
				o(
					R,
					{
						color: R.Colors.GREEN,
						disabled: !h,
						onClick: () => {
							if (!h) return;
							let f = xy(t, s, c ? 'd d' : i),
								v = c ? f.replaceAll('d', '') : f;
							!v || (Bn(v), e.onClose());
						},
					},
					'Send',
				),
				o(
					R,
					{
						color: R.Colors.TRANSPARENT,
						look: R.Looks.LINK,
						style: { left: 15, position: 'absolute' },
						onClick: () => {
							e.onClose();
						},
					},
					'Cancel',
				),
			),
		);
	}
	function by() {
		be((e) => o(Dw, { ...e }));
	}
	var Ty = m(() => {
		'use strict';
		a();
		$n();
		ze();
		x();
		Bs();
	});
	function Ow() {
		return o(
			'svg',
			{
				fill: 'var(--header-secondary)',
				width: 24,
				height: 24,
				viewBox: '0 0 64 64',
			},
			o('path', {
				d: 'M 32 9 C 24.832 9 19 14.832 19 22 L 19 27.347656 C 16.670659 28.171862 15 30.388126 15 33 L 15 49 C 15 52.314 17.686 55 21 55 L 43 55 C 46.314 55 49 52.314 49 49 L 49 33 C 49 30.388126 47.329341 28.171862 45 27.347656 L 45 22 C 45 14.832 39.168 9 32 9 z M 32 13 C 36.963 13 41 17.038 41 22 L 41 27 L 23 27 L 23 22 C 23 17.038 27.037 13 32 13 z',
			}),
		);
	}
	function _w() {
		return o(
			W,
			{ text: 'This message has a hidden message! (InvisibleChat)' },
			({ onMouseEnter: e, onMouseLeave: t }) =>
				o('img', {
					'aria-label': 'Hidden Message Indicator (InvisibleChat)',
					onMouseEnter: e,
					onMouseLeave: t,
					src: 'https://github.com/SammCheese/invisible-chat/raw/NewReplugged/src/assets/lock.png',
					width: 20,
					height: 20,
					style: { transform: 'translateY(4p)', paddingInline: 4 },
				}),
		);
	}
	function Fw(e) {
		return e.type.analyticsName !== 'normal'
			? null
			: o(
					W,
					{ text: 'Encrypt Message' },
					({ onMouseEnter: t, onMouseLeave: n }) =>
						o(
							'div',
							{ style: { display: 'flex' } },
							o(
								R,
								{
									'aria-haspopup': 'dialog',
									'aria-label': 'Encrypt Message',
									size: '',
									look: Wt.BLANK,
									onMouseEnter: t,
									onMouseLeave: n,
									innerClassName: pt.button,
									onClick: () => by(),
									style: { padding: '0 2px', scale: '0.9' },
								},
								o(
									'div',
									{ className: pt.buttonWrapper },
									o(
										'svg',
										{
											'aria-hidden': !0,
											role: 'img',
											width: '32',
											height: '32',
											viewBox: '0 0 64 64',
											style: { scale: '1.1' },
										},
										o('path', {
											fill: 'currentColor',
											d: 'M 32 9 C 24.832 9 19 14.832 19 22 L 19 27.347656 C 16.670659 28.171862 15 30.388126 15 33 L 15 49 C 15 52.314 17.686 55 21 55 L 43 55 C 46.314 55 49 52.314 49 49 L 49 33 C 49 30.388126 47.329341 28.171862 45 27.347656 L 45 22 C 45 14.832 39.168 9 32 9 z M 32 13 C 36.963 13 41 17.038 41 22 L 41 27 L 23 27 L 23 22 C 23 17.038 27.037 13 32 13 z',
										}),
									),
								),
							),
						),
			  );
	}
	function xy(e, t, n) {
		return Nu.hide(e + '\u200B', t, n);
	}
	function Au(e, t, n) {
		let i = Nu.reveal(e, t);
		return n ? i.replace('\u200B', '') : i;
	}
	function Bw(e) {
		return e.endsWith('\u200B');
	}
	async function $w(e) {
		let t = wy.store.savedPasswords.split(',').map((i) => i.trim());
		if (!e?.content || !t?.length) return !1;
		let { content: n } = e;
		/^\W/.test(e.content) && (n = `d ${e.content}d`);
		for (let i = 0; i < t.length; i++) {
			let r = Au(n, t[i], !1);
			if (Bw(r)) return r;
		}
		return !1;
	}
	var Nu,
		wy,
		ku,
		Bs = m(() => {
			'use strict';
			a();
			Oo();
			E();
			re();
			w();
			tr();
			T();
			x();
			Sy();
			Ty();
			(wy = N({
				savedPasswords: {
					type: 0,
					default: 'password, Password',
					description: 'Saved Passwords (Seperated with a , )',
				},
			})),
				(ku = g({
					name: 'InvisibleChat',
					description:
						'Encrypt your Messages in a non-suspicious way!',
					authors: [p.SammCheese],
					dependencies: ['MessagePopoverAPI'],
					patches: [
						{
							find: '.Messages.MESSAGE_EDITED,',
							replacement: {
								match: /var .,.,.=(.)\.className,.=.\.message,.=.\.children,.=.\.content,.=.\.onUpdate/gm,
								replace:
									'try {$1 && $self.INV_REGEX.test($1.content[0]) ? $1.content.push($self.indicator()) : null } catch {};$&',
							},
						},
						{
							find: '.activeCommandOption',
							replacement: {
								match: /(.)\.push.{1,30}disabled:(\i),.{1,20}\},"gift"\)\)/,
								replace:
									'$&;try{$2||$1.push($self.chatBarIcon(arguments[0]))}catch{}',
							},
						},
					],
					EMBED_API_URL: 'https://embed.sammcheese.net',
					INV_REGEX: new RegExp(
						/( \u200c|\u200d |[\u2060-\u2064])[^\u200b]/,
					),
					URL_REGEX: new RegExp(
						/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
					),
					settings: wy,
					async start() {
						let { default: e } = await Ch();
						(Nu = new e(!0, !1)),
							yn('invDecrypt', (t) =>
								this.INV_REGEX.test(t?.content)
									? {
											label: 'Decrypt Message',
											icon: this.popOverIcon,
											message: t,
											channel: X.getChannel(t.channel_id),
											onClick: async () => {
												await $w(t).then((n) =>
													n
														? void this.buildEmbed(
																t,
																n,
														  )
														: void vy({
																message: t,
														  }),
												);
											},
									  }
									: null,
							);
					},
					stop() {
						vn('invDecrypt');
					},
					async getEmbed(e) {
						let { body: t } = await Yt.post({
							url: '/unfurler/embed-urls',
							body: { urls: [e] },
						});
						return await t.embeds[0];
					},
					async buildEmbed(e, t) {
						let n = t.match(this.URL_REGEX);
						e.embeds.push({
							type: 'rich',
							title: 'Decrypted Message',
							color: '0x45f5f5',
							description: t,
							footer: {
								text: 'Made with \u2764\uFE0F by c0dine and Sammy!',
							},
						}),
							n?.length &&
								e.embeds.push(
									await this.getEmbed(new URL(n[0])),
								),
							this.updateMessage(e);
					},
					updateMessage: (e) => {
						L.dispatch({ type: 'MESSAGE_UPDATE', message: e });
					},
					chatBarIcon: k.wrap(Fw, { noop: !0 }),
					popOverIcon: () => o(Ow, null),
					indicator: k.wrap(_w, { noop: !0 }),
				}));
		});
	function My(e, t) {
		!X.hasChannel(t) || Ei.transitionTo(`/channels/${e ?? '@me'}/${t}`);
	}
	var $s,
		Vt,
		Lu,
		Py = m(() => {
			'use strict';
			a();
			Pn();
			w();
			T();
			x();
			$s = !1;
			Lu = g({
				name: 'KeepCurrentChannel',
				description:
					'Attempt to navigate to the channel you were in before switching accounts or loading Discord.',
				authors: [p.Nuckyz],
				flux: {
					LOGOUT(e) {
						({ isSwitchingAccount: $s } = e);
					},
					CONNECTION_OPEN() {
						!$s ||
							(($s = !1),
							Vt?.channelId && My(Vt.guildId, Vt.channelId));
					},
					async CHANNEL_SELECT({ guildId: e, channelId: t }) {
						$s ||
							((Vt = { guildId: e, channelId: t }),
							await Ve('KeepCurrentChannel_previousData', Vt));
					},
				},
				async start() {
					(Vt = await Qe('KeepCurrentChannel_previousData')),
						Vt
							? Vt.channelId && My(Vt.guildId, Vt.channelId)
							: ((Vt = {
									guildId: Xo.getGuildId(),
									channelId: fe.getChannelId() ?? null,
							  }),
							  await Ve('KeepCurrentChannel_previousData', Vt));
				},
			});
		});
	async function Eu(e) {
		return (await Hw.getAsset(Du, [e, void 0]))[0];
	}
	function zw(e) {
		L.dispatch({
			type: 'LOCAL_ACTIVITY_UPDATE',
			activity: e,
			socketId: 'LastFM',
		});
	}
	var Du,
		Uw,
		Iy,
		Gw,
		Hw,
		Sn,
		Ou,
		Ry = m(() => {
			'use strict';
			a();
			E();
			Wn();
			w();
			Se();
			T();
			_();
			x();
			(Du = '1108588077900898414'),
				(Uw = '2a96cbd8b46e442fc41c2b86b821562f'),
				(Iy = new Z('LastFMRichPresence')),
				(Gw = P('getLocalPresence')),
				(Hw = Ye(
					'getAssetImage: size must === [number, number] for Twitch',
					{ getAsset: Y.byCode('apply(') },
				));
			(Sn = N({
				username: { description: 'last.fm username', type: 0 },
				apiKey: { description: 'last.fm api key', type: 0 },
				shareUsername: {
					description: 'show link to last.fm profile',
					type: 3,
					default: !1,
				},
				hideWithSpotify: {
					description: 'hide last.fm presence if spotify is running',
					type: 3,
					default: !0,
				},
				statusName: {
					description: 'text shown in status',
					type: 0,
					default: 'some music',
				},
				useListeningStatus: {
					description:
						'show "Listening to" status instead of "Playing"',
					type: 3,
					default: !1,
				},
				missingArt: {
					description: 'When album or album art is missing',
					type: 4,
					options: [
						{
							label: 'Use large Last.fm logo',
							value: 'lastfmLogo',
							default: !0,
						},
						{
							label: 'Use generic placeholder',
							value: 'placeholder',
						},
					],
				},
			})),
				(Ou = g({
					name: 'LastFMRichPresence',
					description: 'Little plugin for Last.fm rich presence',
					authors: [p.dzshn, p.RuiNtD],
					settingsAboutComponent: () =>
						o(
							d,
							null,
							o(
								y.FormTitle,
								{ tag: 'h3' },
								'How to get an API key',
							),
							o(
								y.FormText,
								null,
								'An API key is required to fetch your current track. To get one, you can visit ',
								o(
									We,
									{
										href: 'https://www.last.fm/api/account/create',
									},
									'this page',
								),
								' and fill in the following information: ',
								o('br', null),
								' ',
								o('br', null),
								'Application name: Discord Rich Presence ',
								o('br', null),
								'Application description: (personal use) ',
								o('br', null),
								' ',
								o('br', null),
								'And copy the API key (not the shared secret!)',
							),
						),
					settings: Sn,
					start() {
						this.updatePresence(),
							(this.updateInterval = setInterval(() => {
								this.updatePresence();
							}, 16e3));
					},
					stop() {
						clearInterval(this.updateInterval);
					},
					async fetchTrackData() {
						if (!Sn.store.username || !Sn.store.apiKey) return null;
						try {
							let e = new URLSearchParams({
									method: 'user.getrecenttracks',
									api_key: Sn.store.apiKey,
									user: Sn.store.username,
									limit: '1',
									format: 'json',
								}),
								t = await fetch(
									`https://ws.audioscrobbler.com/2.0/?${e}`,
								);
							if (!t.ok) throw `${t.status} ${t.statusText}`;
							let n = await t.json();
							if (n.error)
								return (
									Iy.error(
										'Error from Last.fm API',
										`${n.error}: ${n.message}`,
									),
									null
								);
							let i = n.recenttracks?.track[0];
							return i?.['@attr']?.nowplaying
								? {
										name: i.name || 'Unknown',
										album: i.album['#text'],
										artist: i.artist['#text'] || 'Unknown',
										url: i.url,
										imageUrl: i.image?.find(
											(r) => r.size === 'large',
										)?.['#text'],
								  }
								: null;
						} catch (e) {
							return (
								Iy.error('Failed to query Last.fm API', e), null
							);
						}
					},
					async updatePresence() {
						zw(await this.getActivity());
					},
					getLargeImage(e) {
						if (e.imageUrl && !e.imageUrl.includes(Uw))
							return e.imageUrl;
						if (Sn.store.missingArt === 'placeholder')
							return 'placeholder';
					},
					async getActivity() {
						if (Sn.store.hideWithSpotify) {
							for (let r of Gw.getActivities())
								if (r.type === 2 && r.application_id !== Du)
									return null;
						}
						let e = await this.fetchTrackData();
						if (!e) return null;
						let t = this.getLargeImage(e),
							n = t
								? {
										large_image: await Eu(t),
										large_text: e.album || void 0,
										small_image: await Eu('lastfm-small'),
										small_text: 'Last.fm',
								  }
								: {
										large_image: await Eu('lastfm-large'),
										large_text: e.album || void 0,
								  },
							i = [{ label: 'View Song', url: e.url }];
						return (
							Sn.store.shareUsername &&
								i.push({
									label: 'Last.fm Profile',
									url: `https://www.last.fm/user/${Sn.store.username}`,
								}),
							{
								application_id: Du,
								name: Sn.store.statusName,
								details: e.name,
								state: e.artist,
								assets: n,
								buttons: i.map((r) => r.label),
								metadata: { button_urls: i.map((r) => r.url) },
								type: Sn.store.useListeningStatus ? 2 : 0,
								flags: 1,
							}
						);
					},
				}));
		});
	var Cy,
		_u,
		Ay = m(() => {
			'use strict';
			a();
			w();
			T();
			(Cy = [
				'Eyrokac',
				"Rdcg$l`'k|~n",
				'H`tf$d&iajo+d`{"',
				'Sucqplh`(Eclhualva()&',
				"Lncgmka'8KNMDC,shpanf'`x./,",
				'Ioqweijnfn*IeuvfvAotkfxo./,',
				"Hd{#cp\x7Ft$)nbd!{lq%mig~*\x7Fh`v#mk&sm{gx nd#idjb(a\x7Ffao\"bja&amdkge!Rlo\xECkhf)hyedfjjb*'^hzdrdmm$lu'|ao+mnqw$fijxh~bbmg#Tjm\xEEefd+fnp#lpkffz5",
				'h',
				`sijklm&cam*rot"hjjq'|ak\x7F xmv#wc'ep*mawmvvlrb(|ynr>"Aqq&cgg-\x7F ugoh%rom)e\x7Fhdpp%$`,
				'Tnfb}"u\'~`nno!kp$vvhfzeyee"a}%Tfam*Xh`fls%Jboldos-"lj`&hn)~ce!`jcbct|)gdbhnf$wikm$zgaxkmc%afely+og"144?\'ign+iu%p$qisiefr gpfa$',
				"Ndtfv%ahfgk+ghtf$|ir(|z' Oguaw&`ggdj mgw$|ir(me|n",
				"(!\u0363\xB3$\u0359\u0290'\u0369\xB9#",
				'(\uFF88\u25D7\u30ED\u25D1,\uFF8F-2\uFF6C\uFF95\u272C',
				'Ynw#hjil(ze+psgwp|&sgmkr!',
				"Tikmolh`(fl+a!dvjk\x7F'y|e\x7Fe/,-",
				'3/3750?5><9>885:7',
				'mdmt',
				'Wdn`khc+(oxbeof',
				'Ig"zkp*\'g{*xolglj`&~g|*gowg/$mgt(Eclm`.#ticf{l*xed"wl`&Kangj igbhqn\'d`dn `v#lqrw{3%$bhv-h|)kangj_imwhlhb',
				'Tscmw%Tnoa~x',
				'I\u2018f#npus(ec`e!vl$lhsm{`ncu"ekw&f(defeov-$Rnf|)sdu\u2018pf$wcam{ceg!vl$du\'D`d~x-"jw%oi(okht-"DJP)Kag\x7Fs,!mq$du\'A\u2010|n sg`akrkq)~jkdl#pj&diefbnf"jp)&@F\\*{ltq#Hlhrp\'',
				'Ynw$v`&cg`dl fml`%rhlhs*',
				"Dnl$p%qhz{s' hv$w%hh|aceg!;#gpvt(fl+cndea`&dg|fon&v#wjjqm(",
				'\uD83D)pft`gs(ec`e!13$qojmz#',
				`a!njcmr'ide~nu"lb%rheoedldpz$lu'gbkr`,
				'dn"zkp&kg\x7Fo4',
				'hnpqkw',
				'sn"fau\x7F',
				'Sn"tmqnh}}*musvkaw&flf&+ldv$w%lr{}*aulr#vlao|)cetn"jp$',
				"Dxkmc%ot(hhxomwwai\x7F'{hln",
				`hd{#}js&(pe~'sg#gprb(3#"`,
				'hd{b${',
				'<;vqkijbq33271:56<3799?24944:',
				`Thof$lu'ofdn,!qsefc'az*bnrcma+&Om{o+iu"\`khct$)bnrd"bcdoi&`,
				"snofplkb{)c\x7F'r\"lod\x7F'|f*aurv#cpno`abchijklmno",
			]),
				(_u = g({
					name: 'LoadingQuotes',
					description: 'Replace Discords loading quotes',
					authors: [p.Ven, p.KraXen72],
					patches: [
						{
							find: '.LOADING_DID_YOU_KNOW',
							replacement: {
								match: /\._loadingText=.+?random\(.+?;/s,
								replace: '._loadingText=$self.quote;',
							},
						},
					],
					xor(e) {
						let t = 'read if cute',
							n = Array.from(
								e,
								(i, r) => i.charCodeAt(0) ^ r % t.length,
							);
						return String.fromCharCode(...n);
					},
					get quote() {
						return this.xor(
							Cy[Math.floor(Math.random() * Cy.length)],
						);
					},
				}));
		});
	function jw() {
		let { id: e, guild_id: t } = Be([fe], () => ns()),
			{ groups: n } = Be([ky], () => ky.getProps(t, e)),
			i = Be([Ny], () => Ny.getMemberCount(t));
		if (i == null) return null;
		let r =
			n.length === 1 && n[0].id === 'unknown'
				? 0
				: n.reduce((s, l) => s + (l.id === 'offline' ? 0 : l.count), 0);
		return o(
			ae,
			{
				id: 'vc-membercount',
				style: {
					marginTop: '1em',
					marginBottom: '-.5em',
					paddingInline: '1em',
					justifyContent: 'center',
					alignContent: 'center',
					gap: 0,
				},
			},
			o(
				W,
				{ text: `${r} Online in this Channel`, position: 'bottom' },
				(s) =>
					o(
						'div',
						{ ...s },
						o('span', {
							style: {
								backgroundColor: 'var(--green-360)',
								width: '12px',
								height: '12px',
								borderRadius: '50%',
								display: 'inline-block',
								marginRight: '0.5em',
							},
						}),
						o('span', { style: { color: 'var(--green-360)' } }, r),
					),
			),
			o(
				W,
				{ text: `${i} Total Server Members`, position: 'bottom' },
				(s) =>
					o(
						'div',
						{ ...s },
						o('span', {
							style: {
								width: '6px',
								height: '6px',
								borderRadius: '50%',
								border: '3px solid var(--primary-400)',
								display: 'inline-block',
								marginRight: '0.5em',
								marginLeft: '1em',
							},
						}),
						o(
							'span',
							{ style: { color: 'var(--primary-400)' } },
							i,
						),
					),
			),
		);
	}
	var Ny,
		ky,
		Fu,
		Ly = m(() => {
			'use strict';
			a();
			re();
			xt();
			w();
			$n();
			T();
			_();
			x();
			(Ny = ue('GuildMemberCountStore')), (ky = ue('ChannelMemberStore'));
			Fu = g({
				name: 'MemberCount',
				description:
					'Shows the amount of online & total members in the server member list',
				authors: [p.Ven, p.Commandtechno],
				patches: [
					{
						find: '.isSidebarVisible,',
						replacement: {
							match: /(var (\i)=\i\.className.+?children):\[(\i\.useMemo[^}]+"aria-multiselectable")/,
							replace:
								"$1:[$2.startsWith('members')?$self.render():null,$3",
						},
					},
				],
				render: k.wrap(jw, { noop: !0 }),
			});
		});
	var Bu,
		Ey,
		Dy,
		Ww,
		lr,
		$u,
		Oy = m(() => {
			'use strict';
			a();
			gn();
			E();
			w();
			T();
			_();
			x();
			(Bu = !1),
				(Ey = (e) => e.key === 'Backspace' && (Bu = !0)),
				(Dy = (e) => e.key === 'Backspace' && (Bu = !1)),
				(Ww = 1n << 4n),
				(lr = N({
					enableDeleteOnClick: {
						type: 3,
						description: 'Enable delete on click',
						default: !0,
					},
					enableDoubleClickToEdit: {
						type: 3,
						description: 'Enable double click to edit',
						default: !0,
					},
					enableDoubleClickToReply: {
						type: 3,
						description: 'Enable double click to reply',
						default: !0,
					},
					requireModifier: {
						type: 3,
						description:
							'Only do double click actions when shift/ctrl is held',
						default: !1,
					},
				})),
				($u = g({
					name: 'MessageClickActions',
					description:
						'Hold Backspace and click to delete, double click to edit/reply',
					authors: [p.Ven],
					dependencies: ['MessageEventsAPI'],
					settings: lr,
					start() {
						let e = P('deleteMessage', 'startEditMessage'),
							t = P('isEditing', 'isEditingAny');
						document.addEventListener('keydown', Ey),
							document.addEventListener('keyup', Dy),
							(this.onClick = Mc((n, i, r) => {
								let s = n.author.id === U.getCurrentUser().id;
								if (Bu)
									lr.store.enableDeleteOnClick &&
										(s || et.can(Ww, i)) &&
										(n.deleted
											? L.dispatch({
													type: 'MESSAGE_DELETE',
													channelId: i.id,
													id: n.id,
													mlDeleted: !0,
											  })
											: e.deleteMessage(i.id, n.id),
										r.preventDefault());
								else {
									if (
										r.detail < 2 ||
										(lr.store.requireModifier &&
											!r.ctrlKey &&
											!r.shiftKey)
									)
										return;
									if (s) {
										if (
											!lr.store.enableDoubleClickToEdit ||
											t.isEditing(i.id, n.id)
										)
											return;
										e.startEditMessage(
											i.id,
											n.id,
											n.content,
										),
											r.preventDefault();
									} else {
										if (!lr.store.enableDoubleClickToReply)
											return;
										L.dispatch({
											type: 'CREATE_PENDING_REPLY',
											channel: i,
											message: n,
											shouldMention:
												!M.plugins.NoReplyMention
													.enabled,
											showMentionToggle:
												i.guild_id !== null,
										});
									}
								}
							}));
					},
					stop() {
						Pc(this.onClick),
							document.removeEventListener('keydown', Ey),
							document.removeEventListener('keyup', Dy);
					},
				}));
		});
	var Gu = {};
	me(Gu, {
		_modifyAccessories: () => qw,
		accessories: () => Us,
		addAccessory: () => cr,
		removeAccessory: () => Uu,
	});
	function cr(e, t, n) {
		Us.set(e, { callback: t, position: n });
	}
	function Uu(e) {
		Us.delete(e);
	}
	function qw(e, t) {
		for (let n of Us.values()) {
			let i = n.callback(t);
			if (i != null) {
				if (!Array.isArray(i)) i = [i];
				else if (i.length === 0) continue;
				e.splice(
					n.position != null
						? n.position < 0
							? e.length + n.position
							: n.position
						: e.length,
					0,
					...i.filter((r) => r != null),
				);
			}
		}
		return e;
	}
	var Us,
		Gs = m(() => {
			'use strict';
			a();
			Us = new Map();
		});
	async function Xw(e, t) {
		let n = ai.get(t);
		if (n) return n.message;
		ai.set(t, { fetched: !1 });
		let r = (
			await Yt.get({
				url: `/channels/${e}/messages`,
				query: { limit: 1, around: t },
				retries: 2,
			}).catch(() => null)
		)?.body?.[0];
		if (!r) return;
		let s = cn.getMessages(r.channel_id).receiveMessage(r).get(r.id);
		return ai.set(s.id, { message: s, fetched: !0 }), s;
	}
	function Jw(e) {
		let t = [];
		for (let {
			content_type: n,
			height: i,
			width: r,
			url: s,
			proxy_url: l,
		} of e.attachments ?? [])
			n?.startsWith('image/') &&
				t.push({ height: i, width: r, url: s, proxyURL: l });
		for (let { type: n, image: i, thumbnail: r, url: s } of e.embeds ?? [])
			n === 'image'
				? t.push({ ...(i ?? r) })
				: s &&
				  n === 'gifv' &&
				  !By.test(s) &&
				  t.push({ height: r.height, width: r.width, url: s });
		return t;
	}
	function Qw(e, t) {
		return !e && !t
			? ''
			: e
			? t
				? `[no content, ${e} attachment${
						e !== 1 ? 's' : ''
				  } and ${t} embed${t !== 1 ? 's' : ''}]`
				: `[no content, ${e} attachment${e !== 1 ? 's' : ''}]`
			: `[no content, ${t} embed${t !== 1 ? 's' : ''}]`;
	}
	function Vw(e) {
		return !!(
			e.components.length ||
			e.attachments.some((t) => !t.content_type?.startsWith('image/')) ||
			e.embeds.some(
				(t) =>
					t.type !== 'image' && (t.type !== 'gifv' || By.test(t.url)),
			)
		);
	}
	function e2(e, t) {
		if (e > t) {
			let s = Math.min(e, 400);
			return { width: s, height: Math.round(t / (e / s)) };
		}
		let r = Math.min(t, 300);
		return { width: Math.round(e / (t / r)), height: r };
	}
	function t2(e, t) {
		return new Proxy(e, {
			get(n, i) {
				return i === 'vencordEmbeddedBy'
					? t
					: Reflect.get(...arguments);
			},
		});
	}
	function n2({ message: e }) {
		let t = e.vencordEmbeddedBy ?? [],
			n = [],
			i = null;
		for (; (i = Hu.exec(e.content)) !== null; ) {
			let [r, s, l, c] = i;
			if (t.includes(c)) continue;
			let u = X.getChannel(l);
			if (!u || (s !== '@me' && !et.can(1024n, u))) continue;
			let h = ai.get(c)?.message;
			if (!h)
				if (((h ??= cn.getMessage(l, c)), h))
					ai.set(c, { message: h, fetched: !0 });
				else {
					let S = { ...e };
					delete S.embeds,
						delete S.interaction,
						Zw.push(() =>
							Xw(l, c).then(
								(b) =>
									b &&
									L.dispatch({
										type: 'MESSAGE_UPDATE',
										message: S,
									}),
							),
						);
					continue;
				}
			let f = { message: t2(h, [...t, e.id]), channel: u, guildID: s },
				v = zu.store.automodEmbeds;
			n.push(
				v === 'always' || (v === 'prefer' && !Vw(h))
					? o(i2, { ...f })
					: o(o2, { ...f }),
			);
		}
		return n.length ? o(d, null, n) : null;
	}
	function o2({ message: e, channel: t, guildID: n }) {
		let i = n === '@me',
			r = !i && le.getGuild(t.guild_id),
			s = U.getUser(X.getChannel(t.id).recipients?.[0]);
		return o(Kw, {
			embed: {
				rawDescription: '',
				color: 'var(--background-secondary)',
				author: {
					name: o(
						q,
						{ variant: 'text-xs/medium', tag: 'span' },
						o(
							'span',
							null,
							i ? 'Direct Message - ' : r.name + ' - ',
						),
						i ? Pe.parse(`<@${s.id}>`) : Pe.parse(`<#${t.id}>`),
					),
					iconProxyURL: r
						? `https://${window.GLOBAL_ENV.CDN_HOST}/icons/${r.id}/${r.icon}.png`
						: `https://${window.GLOBAL_ENV.CDN_HOST}/avatars/${s.id}/${s.avatar}`,
				},
			},
			renderDescription: () =>
				o(
					'div',
					{
						key: e.id,
						className: J(
							_y.message,
							zu.store.messageBackgroundColor && _y.searchResult,
						),
					},
					o(Yw, {
						id: `message-link-embeds-${e.id}`,
						message: e,
						channel: t,
						subscribeToComponentDispatch: !1,
					}),
				),
		});
	}
	function i2(e) {
		let { message: t, channel: n, guildID: i } = e,
			r = i === '@me',
			s = Jw(t),
			{ parse: l } = Pe;
		return o(Fy, {
			channel: n,
			childrenAccessories: o(
				q,
				{ color: 'text-muted', variant: 'text-xs/medium', tag: 'span' },
				l(r ? `<@${X.getChannel(n.id).recipients[0]}>` : `<#${n.id}>`),
				o(
					'span',
					null,
					r
						? ' - Direct Message'
						: ' - ' + le.getGuild(n.guild_id)?.name,
				),
			),
			compact: !1,
			content: o(
				d,
				null,
				t.content || t.attachments.length <= s.length
					? l(t.content)
					: [Qw(t.attachments.length, t.embeds.length)],
				s.map((c) => {
					let { width: u, height: h } = e2(c.width, c.height);
					return o(
						'div',
						null,
						o('img', { src: c.url, width: u, height: h }),
					);
				}),
			),
			hideTimestamp: !1,
			message: t,
			_messageEmbed: 'automod',
		});
	}
	var ai,
		Kw,
		Yw,
		_y,
		Fy,
		Hu,
		By,
		Zw,
		zu,
		ju,
		$y = m(() => {
			'use strict';
			a();
			Gs();
			E();
			re();
			w();
			de();
			Qo();
			ye();
			T();
			_();
			x();
			(ai = new Map()),
				(Kw = oe(() => He('.inlineMediaEmbed'))),
				(Yw = oe(() =>
					ht((e) =>
						e.type
							?.toString()
							?.includes('["message","compact","className",'),
					),
				)),
				(_y = P('message', 'searchResult')),
				(Fy = () => null),
				(Hu =
					/(?<!<)https?:\/\/(?:\w+\.)?discord(?:app)?\.com\/channels\/(\d{17,20}|@me)\/(\d{17,20})\/(\d{17,20})/g),
				(By = /^https:\/\/(?:www\.)?tenor\.com\//),
				(Zw = new dn()),
				(zu = N({
					messageBackgroundColor: {
						description:
							'Background color for messages in rich embeds',
						type: 3,
					},
					automodEmbeds: {
						description:
							'Use automod embeds instead of rich embeds (smaller but less info)',
						type: 4,
						options: [
							{
								label: 'Always use automod embeds',
								value: 'always',
							},
							{
								label: "Prefer automod embeds, but use rich embeds if some content can't be shown",
								value: 'prefer',
							},
							{
								label: 'Never use automod embeds',
								value: 'never',
								default: !0,
							},
						],
					},
					clearMessageCache: {
						type: 6,
						description: 'Clear the linked message cache',
						component: () =>
							o(
								R,
								{ onClick: () => ai.clear() },
								'Clear the linked message cache',
							),
					},
				}));
			ju = g({
				name: 'MessageLinkEmbeds',
				description:
					'Adds a preview to messages that link another message',
				authors: [p.TheSun, p.Ven],
				dependencies: ['MessageAccessoriesAPI'],
				patches: [
					{
						find: '.embedCard',
						replacement: [
							{
								match: /function (\i)\(\i\){var \i=\i\.message,\i=\i\.channel.{0,200}\.hideTimestamp/,
								replace: '$self.AutoModEmbed=$1;$&',
							},
						],
					},
				],
				set AutoModEmbed(e) {
					Fy = e;
				},
				settings: zu,
				start() {
					cr(
						'messageLinkEmbed',
						(e) =>
							Hu.test(e.message.content)
								? ((Hu.lastIndex = 0),
								  o(k, null, o(n2, { message: e.message })))
								: null,
						4,
					);
				},
			});
		});
	var Uy = m(() => {});
	var Wu,
		Gy = m(() => {
			a();
			(window.VencordStyles ??= new Map()).set(
				'src/plugins/messageLogger/deleteStyleOverlay.css',
				{
					name: 'src/plugins/messageLogger/deleteStyleOverlay.css',
					source: `.messagelogger-deleted {
    background-color: rgba(240 71 71 / 15%) !important;
}
`,
					classNames: {},
					dom: null,
				},
			);
			Wu = 'src/plugins/messageLogger/deleteStyleOverlay.css';
		});
	var qu,
		Hy = m(() => {
			a();
			(window.VencordStyles ??= new Map()).set(
				'src/plugins/messageLogger/deleteStyleText.css',
				{
					name: 'src/plugins/messageLogger/deleteStyleText.css',
					source: `/* Message content highlighting */
.messagelogger-deleted [class*="contents-"] > :is(div, h1, h2, h3, p) {
    color: #f04747 !important;
}

/* Embed highlighting */
.messagelogger-deleted article :is(div, span, h1, h2, h3, p) {
    color: #f04747 !important;
}

.messagelogger-deleted a {
    color: #be3535 !important;
    text-decoration: underline;
}
`,
					classNames: {},
					dom: null,
				},
			);
			qu = 'src/plugins/messageLogger/deleteStyleText.css';
		});
	function zy() {
		M.plugins.MessageLogger.deleteStyle === 'text'
			? (Je(qu), bt(Wu))
			: (bt(qu), Je(Wu));
	}
	var r2,
		jy,
		Wy,
		qy,
		Ku,
		Ky = m(() => {
			'use strict';
			a();
			Uy();
			Jt();
			E();
			je();
			re();
			w();
			Se();
			T();
			_();
			x();
			Gy();
			Hy();
			r2 = P('edited', 'communicationDisabled', 'isSystemMessage');
			(jy = 'ml-remove-history'),
				(Wy = 'ml-toggle-style'),
				(qy = (e, t) => () => {
					let { message: n } = t,
						{
							deleted: i,
							editHistory: r,
							id: s,
							channel_id: l,
						} = n;
					if (!i && !r?.length) return;
					e: {
						if (!i) break e;
						let c = document.getElementById(
							`chat-messages-${l}-${s}`,
						);
						if (!c) break e;
						e.push(
							o(F.MenuItem, {
								id: Wy,
								key: Wy,
								label: 'Toggle Deleted Highlight',
								action: () =>
									c.classList.toggle('messagelogger-deleted'),
							}),
						);
					}
					e.push(
						o(F.MenuItem, {
							id: jy,
							key: jy,
							label: 'Remove Message History',
							color: 'danger',
							action: () => {
								i
									? L.dispatch({
											type: 'MESSAGE_DELETE',
											channelId: l,
											id: s,
											mlDeleted: !0,
									  })
									: (n.editHistory = []);
							},
						}),
					);
				}),
				(Ku = g({
					name: 'MessageLogger',
					description:
						'Temporarily logs deleted and edited messages.',
					authors: [p.rushii, p.Ven],
					start() {
						zy(), we('message', qy);
					},
					stop() {
						Ae('message', qy);
					},
					renderEdit(e) {
						return o(
							k,
							{ noop: !0 },
							o(
								'div',
								{ className: 'messagelogger-edited' },
								Pe.parse(e.content),
								o(
									In,
									{
										timestamp: e.timestamp,
										isEdited: !0,
										isInline: !1,
									},
									o(
										'span',
										{ className: r2.edited },
										' ',
										'(',
										nt.Messages.MESSAGE_EDITED,
										')',
									),
								),
							),
						);
					},
					makeEdit(e, t) {
						return {
							timestamp: Zt?.call(e.edited_timestamp),
							content: t.content,
						};
					},
					options: {
						deleteStyle: {
							type: 4,
							description: 'The style of deleted messages',
							default: 'text',
							options: [
								{
									label: 'Red text',
									value: 'text',
									default: !0,
								},
								{ label: 'Red overlay', value: 'overlay' },
							],
							onChange: () => zy(),
						},
						ignoreBots: {
							type: 3,
							description: 'Whether to ignore messages by bots',
							default: !1,
						},
						ignoreSelf: {
							type: 3,
							description:
								'Whether to ignore messages by yourself',
							default: !1,
						},
					},
					handleDelete(e, t, n) {
						try {
							let c = function (u) {
								let h = e.get(u);
								if (!h) return;
								let f = 64;
								t.mlDeleted ||
								(h.flags & f) === f ||
								(r && h.author?.bot) ||
								(s && h.author?.id === l)
									? (e = e.remove(u))
									: (e = e.update(u, (S) =>
											S.set('deleted', !0).set(
												'attachments',
												S.attachments.map(
													(b) => (
														(b.deleted = !0), b
													),
												),
											),
									  ));
							};
							var i = c;
							if (e == null || (!n && !e.has(t.id))) return e;
							let { ignoreBots: r, ignoreSelf: s } =
									M.plugins.MessageLogger,
								l = U.getCurrentUser().id;
							n ? t.ids.forEach(c) : c(t.id);
						} catch (r) {
							new Z('MessageLogger').error(
								'Error during handleDelete',
								r,
							);
						}
						return e;
					},
					patches: [
						{
							find: 'displayName="MessageStore"',
							replacement: [
								{
									match: /MESSAGE_DELETE:function\((\w)\){var .+?((?:\w{1,2}\.){2})getOrCreate.+?},/,
									replace:
										'MESSAGE_DELETE:function($1){   var cache = $2getOrCreate($1.channelId);   cache = $self.handleDelete(cache, $1, false);   $2commit(cache);},',
								},
								{
									match: /MESSAGE_DELETE_BULK:function\((\w)\){var .+?((?:\w{1,2}\.){2})getOrCreate.+?},/,
									replace:
										'MESSAGE_DELETE_BULK:function($1){   var cache = $2getOrCreate($1.channelId);   cache = $self.handleDelete(cache, $1, true);   $2commit(cache);},',
								},
								{
									match: /(MESSAGE_UPDATE:function\((\w)\).+?)\.update\((\w)/,
									replace:
										"$1.update($3,m =>   (($2.message.flags & 64) === 64 || (Vencord.Settings.plugins.MessageLogger.ignoreBots && $2.message.author?.bot) || (Vencord.Settings.plugins.MessageLogger.ignoreSelf && $2.message.author?.id === Vencord.Webpack.Common.UserStore.getCurrentUser().id)) ? m :   $2.message.content !== m.editHistory?.[0]?.content && $2.message.content !== m.content ?       m.set('editHistory',[...(m.editHistory || []), $self.makeEdit($2.message, m)]) :       m).update($3",
								},
								{
									match: /(?<=getLastEditableMessage=.{0,200}\.find\(\(function\((\i)\)\{)return/,
									replace: 'return !$1.deleted &&',
								},
							],
						},
						{
							find: 'isFirstMessageInForumPost=function',
							replacement: [
								{
									match: /(\w)\.customRenderedContent=(\w)\.customRenderedContent;/,
									replace:
										'$1.customRenderedContent = $2.customRenderedContent;$1.deleted = $2.deleted || false;$1.editHistory = $2.editHistory || [];',
								},
							],
						},
						{
							find: 'THREAD_STARTER_MESSAGE?null===',
							replacement: [
								{
									match: /interactionData:(\w)\.interactionData/,
									replace:
										'interactionData:$1.interactionData,deleted:$1.deleted,editHistory:$1.editHistory,attachments:$1.attachments',
								},
								{
									match: /attachments:(\w{1,2})\((\w)\)/,
									replace:
										'attachments: $1((() => {   let old = arguments[1]?.attachments;   if (!old) return $2;   let new_ = $2.attachments?.map(a => a.id) ?? [];   let diff = old.filter(a => !new_.includes(a.id));   old.forEach(a => a.deleted = true);   $2.attachments = [...diff, ...$2.attachments];   return $2;})()),deleted: arguments[1]?.deleted,editHistory: arguments[1]?.editHistory',
								},
								{
									match: /(\((\w)\){return null==\2\.attachments.+?)spoiler:/,
									replace:
										'$1deleted: arguments[0]?.deleted,spoiler:',
								},
							],
						},
						{
							find: '["className","attachment","inlineMedia"',
							replacement: [
								{
									match: /((\w)\.className,\w=\2\.attachment),/,
									replace:
										'$1,deleted=$2.attachment?.deleted,',
								},
								{
									match: /\["className","attachment","inlineMedia".+?className:/,
									replace:
										"$& (deleted ? 'messagelogger-deleted-attachment ' : '') +",
								},
							],
						},
						{
							find: 'Message must not be a thread starter message',
							replacement: [
								{
									match: /\)\("li",\{(.+?),className:/,
									replace:
										')("li",{$1,className:(arguments[0].message.deleted ? "messagelogger-deleted " : "")+',
								},
							],
						},
						{
							find: 'Messages.MESSAGE_EDITED,")"',
							replacement: [
								{
									match: /(\)\("div",\{id:.+?children:\[)/,
									replace:
										'$1 (arguments[0].message.editHistory.length > 0 ? arguments[0].message.editHistory.map(edit => $self.renderEdit(edit)) : null), ',
								},
							],
						},
						{
							find: 'displayName="ReferencedMessageStore"',
							replacement: [
								{
									match: /MESSAGE_DELETE:function\((\w)\).+?},/,
									replace: 'MESSAGE_DELETE:function($1){},',
								},
								{
									match: /MESSAGE_DELETE_BULK:function\((\w)\).+?},/,
									replace:
										'MESSAGE_DELETE_BULK:function($1){},',
								},
							],
						},
						{
							find: 'id:"remove-reactions"',
							replacement: [
								{
									match: /children:(\[""===.+?\])/,
									replace:
										'children:arguments[0].message.deleted?[]:$1',
								},
							],
						},
					],
				}));
		});
	function Yy(e) {
		ri(
			{
				name: e.name,
				description: e.name,
				inputType: 1,
				execute: async (t, n) =>
					(await Hs(e.name))
						? (M.plugins.MessageTags.clyde &&
								ie(n.channel.id, {
									author: kn,
									content: `${ho} The tag **${e.name}** has been sent!`,
								}),
						  {
								content: e.message.replaceAll(
									'\\n',
									`
`,
								),
						  })
						: (ie(n.channel.id, {
								author: kn,
								content: `${ho} The tag **${e.name}** does not exist anymore! Please reload ur Discord to fix :)`,
						  }),
						  { content: `/${e.name}` }),
				[s2]: !0,
			},
			'CustomTags',
		);
	}
	var ho,
		js,
		s2,
		kn,
		zs,
		Hs,
		a2,
		l2,
		Yu,
		Zy = m(() => {
			'use strict';
			a();
			wt();
			Pn();
			E();
			w();
			T();
			(ho = '<:luna:1035316192220553236>'),
				(js = 'MessageTags_TAGS'),
				(s2 = Symbol('MessageTags')),
				(kn = { id: '821472922140803112', bot: !1 }),
				(zs = () => Qe(js).then((e) => e ?? [])),
				(Hs = (e) =>
					Qe(js).then(
						(t) => (t ?? []).find((n) => n.name === e) ?? null,
					)),
				(a2 = async (e) => {
					let t = await zs();
					return t.push(e), Ve(js, t), t;
				}),
				(l2 = async (e) => {
					let t = await zs();
					return (
						(t = await t.filter((n) => n.name !== e)), Ve(js, t), t
					);
				});
			Yu = g({
				name: 'MessageTags',
				description:
					'Allows you to save messages and to use them with a simple command.',
				authors: [p.Luna],
				options: {
					clyde: {
						name: 'Clyde message on send',
						description:
							'If enabled, clyde will send you an ephemeral message when a tag was used.',
						type: 3,
						default: !0,
					},
				},
				dependencies: ['CommandsAPI'],
				async start() {
					for (let e of await zs()) Yy(e);
				},
				commands: [
					{
						name: 'tags',
						description: 'Manage all the tags for yourself',
						inputType: 0,
						options: [
							{
								name: 'create',
								description: 'Create a new tag',
								type: 1,
								options: [
									{
										name: 'tag-name',
										description:
											'The name of the tag to trigger the response',
										type: 3,
										required: !0,
									},
									{
										name: 'message',
										description:
											'The message that you will send when using this tag',
										type: 3,
										required: !0,
									},
								],
							},
							{
								name: 'list',
								description: 'List all tags from yourself',
								type: 1,
								options: [],
							},
							{
								name: 'delete',
								description: 'Remove a tag from your yourself',
								type: 1,
								options: [
									{
										name: 'tag-name',
										description:
											'The name of the tag to trigger the response',
										type: 3,
										required: !0,
									},
								],
							},
							{
								name: 'preview',
								description:
									'Preview a tag without sending it publicly',
								type: 1,
								options: [
									{
										name: 'tag-name',
										description:
											'The name of the tag to trigger the response',
										type: 3,
										required: !0,
									},
								],
							},
						],
						async execute(e, t) {
							switch (e[0].name) {
								case 'create': {
									let n = De(e[0].options, 'tag-name', ''),
										i = De(e[0].options, 'message', '');
									if (await Hs(n))
										return ie(t.channel.id, {
											author: kn,
											content: `${ho} A Tag with the name **${n}** already exists!`,
										});
									let r = {
										name: n,
										enabled: !0,
										message: i,
									};
									Yy(r),
										await a2(r),
										ie(t.channel.id, {
											author: kn,
											content: `${ho} Successfully created the tag **${n}**!`,
										});
									break;
								}
								case 'delete': {
									let n = De(e[0].options, 'tag-name', '');
									if (!(await Hs(n)))
										return ie(t.channel.id, {
											author: kn,
											content: `${ho} A Tag with the name **${n}** does not exist!`,
										});
									or(n),
										await l2(n),
										ie(t.channel.id, {
											author: kn,
											content: `${ho} Successfully deleted the tag **${n}**!`,
										});
									break;
								}
								case 'list': {
									ie(t.channel.id, {
										author: kn,
										embeds: [
											{
												title: 'All Tags:',
												description:
													(await zs()).map(
														(n) =>
															`\`${
																n.name
															}\`: ${n.message
																.slice(0, 72)
																.replaceAll(
																	'\\n',
																	' ',
																)}${
																n.message
																	.length > 72
																	? '...'
																	: ''
															}`,
													).join(`
`) || `${ho} Woops! There are no tags yet, use \`/tags create\` to create one!`,
												color: 14122879,
												type: 'rich',
											},
										],
									});
									break;
								}
								case 'preview': {
									let n = De(e[0].options, 'tag-name', ''),
										i = await Hs(n);
									if (!i)
										return ie(t.channel.id, {
											author: kn,
											content: `${ho} A Tag with the name **${n}** does not exist!`,
										});
									ie(t.channel.id, {
										author: kn,
										content: i.message.replaceAll(
											'\\n',
											`
`,
										),
									});
									break;
								}
								default: {
									ie(t.channel.id, {
										author: kn,
										content: 'Invalid sub-command',
									});
									break;
								}
							}
						},
					},
				],
			});
		});
	function c2(e) {
		let t = '';
		for (let n = 0; n < e.length; n++)
			t += n % 2 ? e[n].toUpperCase() : e[n].toLowerCase();
		return t;
	}
	var Zu,
		Xy = m(() => {
			'use strict';
			a();
			wt();
			w();
			T();
			Zu = g({
				name: 'MoreCommands',
				description: 'echo, lenny, mock',
				authors: [p.Arjix, p.echo, p.Samu],
				dependencies: ['CommandsAPI'],
				commands: [
					{
						name: 'echo',
						description: 'Sends a message as Clyde (locally)',
						options: [fo],
						inputType: 3,
						execute: (e, t) => {
							let n = De(e, 'message', '');
							ie(t.channel.id, { content: n });
						},
					},
					{
						name: 'lenny',
						description: 'Sends a lenny face',
						options: [fo],
						execute: (e) => ({
							content:
								De(e, 'message', '') +
								' ( \u0361\xB0 \u035C\u0296 \u0361\xB0)',
						}),
					},
					{
						name: 'mock',
						description: 'mOcK PeOpLe',
						options: [Do],
						execute: (e) => ({ content: c2(De(e, 'message', '')) }),
					},
				],
			});
		});
	var Xu,
		Jy = m(() => {
			'use strict';
			a();
			wt();
			w();
			T();
			Xu = g({
				name: 'MoreKaomoji',
				description:
					'Adds more Kaomoji to discord. \u30FD(\xB4\u25BD`)/',
				authors: [p.JacobTm],
				dependencies: ['CommandsAPI'],
				commands: [
					{
						name: 'dissatisfaction',
						description: ' \uFF1E\uFE4F\uFF1C',
					},
					{ name: 'smug', description: ' \u0CA0_\u0CA0' },
					{ name: 'happy', description: ' \u30FD(\xB4\u25BD`)/' },
					{ name: 'crying', description: ' \u0CA5_\u0CA5' },
					{
						name: 'angry',
						description: ' \u30FD(\uFF40\u0414\xB4)\uFF89',
					},
					{
						name: 'anger',
						description: ' \u30FD(\uFF4F`\u76BF\u2032\uFF4F)\uFF89',
					},
					{ name: 'joy', description: ' <(\uFFE3\uFE36\uFFE3)>' },
					{
						name: 'blush',
						description:
							'\u0AEE \u02F6\u1D54 \u1D55 \u1D54\u02F6 \u10D0',
					},
					{
						name: 'confused',
						description: '(\u2022\u0E34_\u2022\u0E34)?',
					},
					{ name: 'sleeping', description: '(\u1D17_\u1D17)' },
					{ name: 'laughing', description: 'o(\u2267\u25BD\u2266)o' },
				].map((e) => ({
					...e,
					options: [fo],
					execute: (t) => ({
						content: De(t, 'message', '') + e.description,
					}),
				})),
			});
		});
	function m2(e) {
		yo.store.tagSettings ??= Ju;
		let [t, n] = V(yo.store.tagSettings),
			i = (r) => {
				n(r), e.setValue(r);
			};
		return o(
			ae,
			{ flexDirection: 'column' },
			li.map((r) =>
				o(
					At,
					{ style: { padding: '1em 1em 0' } },
					o(
						y.FormTitle,
						{ style: { width: 'fit-content' } },
						o(
							W,
							{ text: r.description },
							({ onMouseEnter: s, onMouseLeave: l }) =>
								o(
									'div',
									{ onMouseEnter: s, onMouseLeave: l },
									r.displayName,
									' Tag ',
									o(Xn, { type: Xn.Types[r.name] }),
								),
						),
					),
					o(Ne, {
						type: 'text',
						value: t[r.name]?.text ?? r.displayName,
						placeholder: `Text on tag (default: ${r.displayName})`,
						onChange: (s) => {
							(t[r.name].text = s), i(t);
						},
						className: G.bottom16,
					}),
					o(
						Nt,
						{
							value: t[r.name]?.showInChat ?? !0,
							onChange: (s) => {
								(t[r.name].showInChat = s), i(t);
							},
							hideBorder: !0,
						},
						'Show in messages',
					),
					o(
						Nt,
						{
							value: t[r.name]?.showInNotChat ?? !0,
							onChange: (s) => {
								(t[r.name].showInNotChat = s), i(t);
							},
							hideBorder: !0,
						},
						'Show in member list and profiles',
					),
				),
			),
		);
	}
	var u2,
		p2,
		d2,
		Xn,
		Qy,
		li,
		Ju,
		yo,
		Qu,
		Vy = m(() => {
			'use strict';
			a();
			E();
			xt();
			w();
			Xe();
			T();
			_();
			x();
			(u2 = '1081004946872352958'),
				(p2 = P('computePermissions', 'canEveryoneRole')),
				(d2 = P(
					'SEND_MESSAGES',
					'VIEW_CREATOR_MONETIZATION_ANALYTICS',
				)),
				(Xn = Ce((e) => e.Types?.[0] === 'BOT')),
				(Qy = (e, t) => !!e?.webhookId && t.isNonUserBot()),
				(li = [
					{
						name: 'WEBHOOK',
						displayName: 'Webhook',
						description: 'Messages sent by webhooks',
						condition: Qy,
					},
					{
						name: 'OWNER',
						displayName: 'Owner',
						description: 'Owns the server',
						condition: (e, t, n) =>
							le.getGuild(n?.guild_id)?.ownerId === t.id,
					},
					{
						name: 'ADMINISTRATOR',
						displayName: 'Admin',
						description: 'Has the administrator permission',
						permissions: ['ADMINISTRATOR'],
					},
					{
						name: 'MODERATOR_STAFF',
						displayName: 'Staff',
						description: 'Can manage the server, channels or roles',
						permissions: [
							'MANAGE_GUILD',
							'MANAGE_CHANNELS',
							'MANAGE_ROLES',
						],
					},
					{
						name: 'MODERATOR',
						displayName: 'Mod',
						description: 'Can manage messages or kick/ban people',
						permissions: [
							'MANAGE_MESSAGES',
							'KICK_MEMBERS',
							'BAN_MEMBERS',
						],
					},
					{
						name: 'VOICE_MODERATOR',
						displayName: 'VC Mod',
						description: 'Can manage voice chats',
						permissions: [
							'MOVE_MEMBERS',
							'MUTE_MEMBERS',
							'DEAFEN_MEMBERS',
						],
					},
				]),
				(Ju = Object.fromEntries(
					li.map(({ name: e, displayName: t }) => [
						e,
						{ text: t, showInChat: !0, showInNotChat: !0 },
					]),
				));
			(yo = N({
				dontShowForBots: {
					description:
						"Don't show extra tags for bots (excluding webhooks)",
					type: 3,
				},
				dontShowBotTag: {
					description:
						'Only show extra tags for bots / Hide [BOT] text',
					type: 3,
				},
				tagSettings: { type: 6, component: m2, description: 'fill me' },
			})),
				(Qu = g({
					name: 'MoreUserTags',
					description:
						'Adds tags for webhooks and moderative roles (owner, admin, etc.)',
					authors: [p.Cyn, p.TheSun, p.RyanCaoDev, p.LordElias],
					settings: yo,
					patches: [
						{
							find: '.BOT=0]="BOT"',
							replacement: [
								{
									match: /(\i)\[.\.BOT=0\]="BOT";/,
									replace: '$&$1=$self.addTagVariants($1);',
								},
							],
						},
						{
							find: '.DISCORD_SYSTEM_MESSAGE_BOT_TAG_TOOLTIP;',
							replacement: [
								{
									match: /(switch\((\i)\){.+?)case (\i(?:\.\i)?)\.BOT:default:(\i)=(\i\.\i\.Messages)\.BOT_TAG_BOT/,
									replace: (e, t, n, i, r, s) =>
										`${t}default:{${r} = $self.getTagText(${i}[${n}], ${s})}`,
								},
								{
									match: /(\i)=(\i)===\i(?:\.\i)?\.ORIGINAL_POSTER/,
									replace: '$1=$self.isOPTag($2)',
								},
								{
									match: /children:\[(?=\i,\(0,\i\.jsx\)\("span",{className:\i\(\)\.botText,children:(\i)}\)\])/,
									replace:
										"'data-tag':$1.toLowerCase(),children:[",
								},
							],
						},
						{
							find: '.Types.ORIGINAL_POSTER',
							replacement: {
								match: /return null==(\i)\?null:\(0,/,
								replace:
									"$1=$self.getTag({...arguments[0],origType:$1,location:'chat'});$&",
							},
						},
						{
							find: '.renderBot=function(){',
							replacement: {
								match: /this.props.user;return null!=(\i)&&.{0,10}\?(.{0,50})\.botTag/,
								replace:
									"this.props.user;var type=$self.getTag({...this.props,origType:$1.bot?0:null,location:'not-chat'});return type!==null?$2.botTag,type",
							},
						},
						{
							find: '.hasAvatarForGuild(null==',
							replacement: {
								match: /(?=usernameIcon:)/,
								replace:
									'moreTags_channelId:arguments[0].channelId,',
							},
						},
						{
							find: 'copyMetaData:"User Tag"',
							replacement: {
								match: /(?=,botClass:)/,
								replace:
									',moreTags_channelId:arguments[0].moreTags_channelId',
							},
						},
						{
							find: ',botType:',
							replacement: {
								match: /,botType:(\i\((\i)\)),/g,
								replace:
									",botType:$self.getTag({user:$2,channelId:arguments[0].moreTags_channelId,origType:$1,location:'not-chat'}),",
							},
						},
					],
					start() {
						if (!yo.store.tagSettings)
							if (!yo.store.visibility_WEBHOOK)
								yo.store.tagSettings = Ju;
							else {
								let e = { ...Ju };
								Object.entries(
									Vencord.PlainSettings.plugins.MoreUserTags,
								).forEach(([t, n]) => {
									let [i, r] = t.split('_');
									if (i === 'visibility')
										switch (n) {
											case 'always':
												break;
											case 'chat':
												e[r].showInNotChat = !1;
												break;
											case 'not-chat':
												e[r].showInChat = !1;
												break;
											case 'never':
												(e[r].showInChat = !1),
													(e[r].showInNotChat = !1);
												break;
										}
									(yo.store.tagSettings = e),
										delete Vencord.Settings.plugins
											.MoreUserTags[t];
								});
							}
					},
					getPermissions(e, t) {
						let n = le.getGuild(t?.guild_id);
						if (!n) return [];
						let i = p2.computePermissions({
							user: e,
							context: n,
							overwrites: t.permissionOverwrites,
						});
						return Object.entries(d2)
							.map(([r, s]) => (i & s ? r : ''))
							.filter(Boolean);
					},
					addTagVariants(e) {
						let t = 100;
						return (
							li.forEach(({ name: n }) => {
								(e[n] = ++t),
									(e[t] = n),
									(e[`${n}-BOT`] = ++t),
									(e[t] = `${n}-BOT`),
									(e[`${n}-OP`] = ++t),
									(e[t] = `${n}-OP`);
							}),
							e
						);
					},
					isOPTag: (e) =>
						e === Xn.Types.ORIGINAL_POSTER ||
						li.some((t) => e === Xn.Types[`${t.name}-OP`]),
					getTagText(e, t) {
						if (!e) return t.BOT_TAG_BOT;
						let [n, i] = e.split('-'),
							r = li.find(({ name: l }) => n === l);
						if (
							!r ||
							(i === 'BOT' &&
								n !== 'WEBHOOK' &&
								this.settings.store.dontShowForBots)
						)
							return t.BOT_TAG_BOT;
						let s =
							yo.store.tagSettings?.[r.name]?.text ||
							r.displayName;
						switch (i) {
							case 'OP':
								return `${t.BOT_TAG_FORUM_ORIGINAL_POSTER} \u2022 ${s}`;
							case 'BOT':
								return `${t.BOT_TAG_BOT} \u2022 ${s}`;
							default:
								return s;
						}
					},
					getTag({
						message: e,
						user: t,
						channelId: n,
						origType: i,
						location: r,
						channel: s,
					}) {
						if (r === 'chat' && t.id === '1')
							return Xn.Types.OFFICIAL;
						if (t.id === u2) return Xn.Types.AI;
						let l = typeof i == 'number' ? i : null;
						if (((s ??= X.getChannel(n)), !s)) return l;
						let c = this.settings.store,
							u = this.getPermissions(t, s);
						for (let h of li)
							if (
								!(
									r === 'chat' &&
									!c.tagSettings[h.name].showInChat
								) &&
								!(
									r === 'not-chat' &&
									!c.tagSettings[h.name].showInNotChat
								) &&
								(h.permissions?.some((f) => u.includes(f)) ||
									h.condition?.(e, t, s))
							) {
								s.isForumPost() && s.ownerId === t.id
									? (l = Xn.Types[`${h.name}-OP`])
									: t.bot && !Qy(e, t) && !c.dontShowBotTag
									? (l = Xn.Types[`${h.name}-BOT`])
									: (l = Xn.Types[h.name]);
								break;
							}
						return l;
					},
				}));
		});
	function g2(e, t) {
		let n = 0,
			i = 0;
		for (; (i = e.indexOf(t, i) + 1) !== 0; ) n++;
		return n;
	}
	function h2(e, t) {
		if (!t.global) throw new Error('pattern must be global');
		let n = 0;
		for (; t.test(e); ) n++;
		return n;
	}
	function v2(e) {
		let t = g2(e, ep) + h2(e, y2);
		return Math.min(t, 10);
	}
	function Vu() {
		if (!ur.store.triggerWhenUnfocused && !document.hasFocus()) return;
		let e = document.createElement('audio');
		(e.src = f2), (e.volume = ur.store.volume), e.play();
	}
	var ep,
		f2,
		ur,
		tp,
		y2,
		ev = m(() => {
			'use strict';
			a();
			E();
			ru();
			w();
			de();
			T();
			x();
			(ep = '\u{1F5FF}'),
				(f2 =
					'https://raw.githubusercontent.com/MeguminSama/VencordPlugins/main/plugins/moyai/moyai.mp3'),
				(ur = N({
					volume: {
						description:
							'Volume of the \u{1F5FF}\u{1F5FF}\u{1F5FF}',
						type: 5,
						markers: go(0, 1, 0.1),
						default: 0.5,
						stickToMarkers: !1,
					},
					triggerWhenUnfocused: {
						description:
							'Trigger the \u{1F5FF} even when the window is unfocused',
						type: 3,
						default: !0,
					},
					ignoreBots: {
						description: 'Ignore bots',
						type: 3,
						default: !0,
					},
				})),
				(tp = g({
					name: 'Moyai',
					authors: [p.Megu, p.Nuckyz],
					description:
						'\u{1F5FF}\u{1F5FF}\u{1F5FF}\u{1F5FF}\u{1F5FF}\u{1F5FF}\u{1F5FF}\u{1F5FF}',
					settings: ur,
					flux: {
						async MESSAGE_CREATE({
							optimistic: e,
							type: t,
							message: n,
							channelId: i,
						}) {
							if (
								e ||
								t !== 'MESSAGE_CREATE' ||
								n.state === 'SENDING' ||
								(ur.store.ignoreBots && n.author?.bot) ||
								!n.content ||
								i !== fe.getChannelId()
							)
								return;
							let r = v2(n.content);
							for (let s = 0; s < r; s++) Vu(), await no(300);
						},
						MESSAGE_REACTION_ADD({
							optimistic: e,
							type: t,
							channelId: n,
							userId: i,
							emoji: r,
						}) {
							if (
								e ||
								t !== 'MESSAGE_REACTION_ADD' ||
								(ur.store.ignoreBots && U.getUser(i)?.bot) ||
								n !== fe.getChannelId()
							)
								return;
							let s = r.name.toLowerCase();
							(s !== ep &&
								!s.includes('moyai') &&
								!s.includes('moai')) ||
								Vu();
						},
						VOICE_CHANNEL_EFFECT_SEND({ emoji: e }) {
							if (!e?.name) return;
							let t = e.name.toLowerCase();
							(t !== ep &&
								!t.includes('moyai') &&
								!t.includes('moai')) ||
								Vu();
						},
					},
				}));
			y2 = /<a?:\w*moy?ai\w*:\d{17,20}>/gi;
		});
	function S2({ modalProps: e }) {
		return o(
			Ie,
			{ ...e, size: 'medium' },
			o(
				Le,
				null,
				o(
					'div',
					{
						style: {
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							textAlign: 'center',
							height: '100%',
							padding: '8px 0',
							gap: '16px',
						},
					},
					o(
						q,
						{ variant: 'text-lg/semibold' },
						'You seem to have been affected by a bug that caused DM notifications to be muted and break if you used the MuteNewGuild plugin.',
					),
					o(
						q,
						{ variant: 'text-lg/semibold' },
						"If you haven't received any notifications for private messages, this is why. This issue is now fixed, so they should work again. Please verify, and in case they are still broken, ask for help in the Vencord support channel!",
					),
					o(
						q,
						{ variant: 'text-lg/semibold' },
						"We're very sorry for any inconvenience caused by this issue :(",
					),
				),
			),
			o(
				ot,
				null,
				o(
					'div',
					{
						style: {
							display: 'flex',
							justifyContent: 'center',
							width: '100%',
						},
					},
					o(
						R,
						{
							onClick: e.onClose,
							size: R.Sizes.MEDIUM,
							color: R.Colors.BRAND,
						},
						'Understood!',
					),
				),
			),
		);
	}
	var np,
		Ws,
		op,
		tv = m(() => {
			'use strict';
			a();
			E();
			w();
			ze();
			T();
			_();
			x();
			np = ue('UserGuildSettingsStore');
			(Ws = N({
				guild: { description: 'Mute Guild', type: 3, default: !0 },
				everyone: {
					description: 'Suppress @everyone and @here',
					type: 3,
					default: !0,
				},
				role: {
					description: 'Suppress All Role @mentions',
					type: 3,
					default: !0,
				},
			})),
				(op = g({
					name: 'MuteNewGuild',
					description: 'Mutes newly joined guilds',
					authors: [p.Glitch, p.Nuckyz, p.carince],
					patches: [
						{
							find: ',acceptInvite:function',
							replacement: {
								match: /INVITE_ACCEPT_SUCCESS.+?;(\i)=null.+?;/,
								replace: (e, t) =>
									`${e}$self.handleMute(${t});`,
							},
						},
					],
					settings: Ws,
					handleMute(e) {
						e === '@me' ||
							e === 'null' ||
							e == null ||
							an(
								'updateGuildNotificationSettings',
							).updateGuildNotificationSettings(e, {
								muted: Ws.store.guild,
								suppress_everyone: Ws.store.everyone,
								suppress_roles: Ws.store.role,
							});
					},
					start() {
						let [e, t, n] = [
							np.isMuted(null),
							np.isSuppressEveryoneEnabled(null),
							np.isSuppressRolesEnabled(null),
						];
						(e || t || n) &&
							(an(
								'updateGuildNotificationSettings',
							).updateGuildNotificationSettings(null, {
								muted: !1,
								suppress_everyone: !1,
								suppress_roles: !1,
							}),
							be((i) => o(S2, { modalProps: i })));
					},
				}));
		});
	var b2,
		ip,
		nv = m(() => {
			'use strict';
			a();
			E();
			w();
			T();
			_();
			(b2 = P('getRelationships', 'isBlocked')),
				(ip = g({
					name: 'NoBlockedMessages',
					description:
						'Hides all blocked messages from chat completely.',
					authors: [p.rushii, p.Samu],
					patches: [
						{
							find: 'safety_prompt:"DMSpamExperiment",response:"show_redacted_messages"',
							replacement: [
								{
									match: /\.collapsedReason;return/,
									replace:
										'.collapsedReason;return null;return;',
								},
							],
						},
						...[
							'displayName="MessageStore"',
							'displayName="ReadStateStore"',
						].map((e) => ({
							find: e,
							predicate: () =>
								M.plugins.NoBlockedMessages
									.ignoreBlockedMessages === !0,
							replacement: [
								{
									match: /(?<=MESSAGE_CREATE:function\((\i)\){)/,
									replace: (t, n) =>
										`if($self.isBlocked(${n}.message))return;`,
								},
							],
						})),
					],
					options: {
						ignoreBlockedMessages: {
							description:
								'Completely ignores (recent) incoming messages from blocked users (locally).',
							type: 3,
							default: !1,
							restartNeeded: !0,
						},
					},
					isBlocked: (e) => b2.isBlocked(e.author.id),
				}));
		});
	var rp,
		ov = m(() => {
			'use strict';
			a();
			w();
			T();
			rp = g({
				name: 'NoDevtoolsWarning',
				description:
					"Disables the 'HOLD UP' banner in the console. As a side effect, also prevents Discord from hiding your token, which prevents random logouts.",
				authors: [p.Ven],
				patches: [
					{
						find: 'setDevtoolsCallbacks',
						replacement: {
							match: /if\(.{0,10}\|\|"0.0.0"!==.{0,2}\.remoteApp\.getVersion\(\)\)/,
							replace: 'if(false)',
						},
					},
				],
			});
		});
	var sp,
		iv = m(() => {
			'use strict';
			a();
			w();
			T();
			sp = g({
				name: 'NoF1',
				description: 'Disables F1 help bind.',
				authors: [p.Cyn],
				patches: [
					{
						find: ',"f1"],comboKeysBindGlobal:',
						replacement: {
							match: ',"f1"],comboKeysBindGlobal:',
							replace: '],comboKeysBindGlobal:',
						},
					},
				],
			});
		});
	var T2,
		pr,
		ap,
		rv = m(() => {
			'use strict';
			a();
			E();
			w();
			T();
			_();
			(T2 = P('getMessageRequestsCount')),
				(pr = N({
					hideFriendRequestsCount: {
						type: 3,
						description: 'Hide incoming friend requests count',
						default: !0,
						restartNeeded: !0,
					},
					hideMessageRequestsCount: {
						type: 3,
						description: 'Hide message requests count',
						default: !0,
						restartNeeded: !0,
					},
					hidePremiumOffersCount: {
						type: 3,
						description: 'Hide nitro offers count',
						default: !0,
						restartNeeded: !0,
					},
				})),
				(ap = g({
					name: 'NoPendingCount',
					description:
						'Removes the ping count of incoming friend requests, message requests, and nitro offers.',
					authors: [p.amia],
					settings: pr,
					patches: [
						{
							find: '.getPendingCount=',
							predicate: () => pr.store.hideFriendRequestsCount,
							replacement: {
								match: /(?<=\.getPendingCount=function\(\)\{)/,
								replace: 'return 0;',
							},
						},
						{
							find: '.getMessageRequestsCount=',
							predicate: () => pr.store.hideMessageRequestsCount,
							replacement: {
								match: /(?<=\.getMessageRequestsCount=function\(\)\{)/,
								replace: 'return 0;',
							},
						},
						{
							find: '.getSpamChannelsCount(),',
							predicate: () => pr.store.hideMessageRequestsCount,
							replacement: {
								match: /(?<=getSpamChannelsCount\(\),\i=)\i\.getMessageRequestsCount\(\)/,
								replace: '$self.getRealMessageRequestCount()',
							},
						},
						{
							find: 'showProgressBadge:',
							predicate: () => pr.store.hidePremiumOffersCount,
							replacement: {
								match: /\(function\(\){return \i\.\i\.getUnacknowledgedOffers\(\i\)\.length}\)/,
								replace: '(function(){return 0})',
							},
						},
					],
					getRealMessageRequestCount() {
						return T2.getMessageRequestChannelIds().size;
					},
				}));
		});
	var lp,
		sv = m(() => {
			'use strict';
			a();
			w();
			T();
			lp = g({
				name: 'NoProfileThemes',
				description: 'Completely removes Nitro profile themes',
				authors: [p.TheKodeToad],
				patches: [
					{
						find: '.NITRO_BANNER,',
						replacement: {
							match: /=(?=\i\.\i\.isPremiumAtLeast\(null==(\i))/,
							replace: '=$1?.banner&&',
						},
					},
					{
						find: '().avatarPositionPremiumNoBanner,default:',
						replacement: {
							match: /\.avatarPositionPremiumNoBanner(?=,default:\i\(\)\.(\i))/,
							replace: '.$1',
						},
					},
					{
						find: '.hasThemeColors=function(){',
						replacement: {
							match: /(?<=key:"canUsePremiumProfileCustomization",get:function\(\){return)/,
							replace: ' false;',
						},
					},
				],
			});
		});
	var qs,
		cp,
		av = m(() => {
			'use strict';
			a();
			E();
			w();
			T();
			(qs = N({
				userList: {
					description:
						'List of users to allow or exempt pings for (separated by commas or spaces)',
					type: 0,
					default: '1234567890123445,1234567890123445',
				},
				shouldPingListed: {
					description: 'Behaviour',
					type: 4,
					options: [
						{ label: 'Do not ping the listed users', value: !1 },
						{
							label: 'Only ping the listed users',
							value: !0,
							default: !0,
						},
					],
				},
				inverseShiftReply: {
					description:
						"Invert Discord's shift replying behaviour (enable to make shift reply mention user)",
					type: 3,
					default: !1,
				},
			})),
				(cp = g({
					name: 'NoReplyMention',
					description: 'Disables reply pings by default',
					authors: [p.DustyAngel47, p.axyie, p.pylix, p.outfoxxed],
					settings: qs,
					shouldMention(e, t) {
						let n = qs.store.userList.includes(e.author.id),
							i = qs.store.shouldPingListed ? n : !n;
						return qs.store.inverseShiftReply ? t !== i : !t && i;
					},
					patches: [
						{
							find: ',"Message")}function',
							replacement: {
								match: /:(\i),shouldMention:!(\i)\.shiftKey/,
								replace:
									':$1,shouldMention:$self.shouldMention($1,$2.shiftKey)',
							},
						},
					],
				}));
		});
	var up,
		lv = m(() => {
			'use strict';
			a();
			w();
			T();
			up = g({
				name: 'NoScreensharePreview',
				description: 'Disables screenshare previews from being sent.',
				authors: [p.Nuckyz],
				patches: [
					{
						find: '("ApplicationStreamPreviewUploadManager")',
						replacement: [
							'\\i\\.default\\.makeChunkedRequest\\(',
							'\\i\\.\\i\\.post\\({url:',
						].map((e) => ({
							match: new RegExp(
								`(?=return\\[(\\d),${e}\\i\\.\\i\\.STREAM_PREVIEW.+?}\\)\\];)`,
							),
							replace: (t, n) =>
								`return[${n},Promise.resolve({body:"",status:204})];`,
						})),
					},
				],
			});
		});
	var pp,
		cv = m(() => {
			'use strict';
			a();
			w();
			T();
			pp = g({
				name: 'NoTrack',
				description:
					"Disable Discord's tracking ('science'), metrics and Sentry crash reporting",
				authors: [p.Cyn, p.Ven, p.Nuckyz],
				required: !0,
				patches: [
					{
						find: 'TRACKING_URL:',
						replacement: { match: /^.+$/, replace: '()=>{}' },
					},
					{
						find: 'window.DiscordSentry=',
						replacement: { match: /^.+$/, replace: '()=>{}' },
					},
					{
						find: '.METRICS,',
						replacement: [
							{
								match: /this\._intervalId.+?12e4\)/,
								replace: '',
							},
							{
								match: /(?<=increment=function\(\i\){)/,
								replace: 'return;',
							},
						],
					},
				],
			});
		});
	var dp,
		uv = m(() => {
			'use strict';
			a();
			w();
			T();
			dp = g({
				name: 'NoUnblockToJump',
				description:
					'Allows you to jump to messages of blocked users without unblocking them',
				authors: [p.dzshn],
				patches: [
					{
						find: '.id,"Search Results"',
						replacement: {
							match: /if\(.{1,10}\)(.{1,10}\.show\({.{1,50}UNBLOCK_TO_JUMP_TITLE)/,
							replace: 'if(false)$1',
						},
					},
					{
						find: 'renderJumpButton=function()',
						replacement: {
							match: /if\(.{1,10}\)(.{1,10}\.show\({.{1,50}UNBLOCK_TO_JUMP_TITLE)/,
							replace: 'if(false)$1',
						},
					},
					{
						find: 'flash:!0,returnMessageId',
						replacement: {
							match: /.\?(.{1,10}\.show\({.{1,50}UNBLOCK_TO_JUMP_TITLE)/,
							replace: 'false?$1',
						},
					},
				],
			});
		});
	var mp,
		pv = m(() => {
			'use strict';
			a();
			w();
			T();
			mp = g({
				name: 'NSFWGateBypass',
				description:
					'Allows you to access NSFW channels without setting/verifying your age',
				authors: [p.Commandtechno],
				patches: [
					{
						find: '.nsfwAllowed=null',
						replacement: {
							match: /(\w+)\.nsfwAllowed=/,
							replace: '$1.nsfwAllowed=true;',
						},
					},
				],
			});
		});
	var fp,
		dv = m(() => {
			'use strict';
			a();
			w();
			T();
			fp = g({
				name: 'oneko',
				description: 'cat follow mouse (real)',
				authors: [p.Ven, p.adryd],
				start() {
					fetch(
						'https://raw.githubusercontent.com/adryd325/oneko.js/5977144dce83e4d71af1de005d16e38eebeb7b72/oneko.js',
					)
						.then((e) => e.text())
						.then((e) =>
							e.replace(
								'./oneko.gif',
								'https://raw.githubusercontent.com/adryd325/oneko.js/14bab15a755d0e35cd4ae19c931d96d306f99f42/oneko.gif',
							),
						)
						.then(eval);
				},
				stop() {
					clearInterval(window.onekoInterval),
						delete window.onekoInterval,
						document.getElementById('oneko')?.remove();
				},
			});
		});
	function fv(e) {
		Object.assign(gv.__getLocalVars().state, {
			enabled: e,
			settingsVisible: e,
		});
	}
	function hv(e) {
		let t = {
			screenshakeEnabledLocations: { 0: !0, 1: !0, 2: !0 },
			shakeIntensity: 1,
			confettiSize: 16,
			confettiCount: 5,
			combosRequiredCount: 1,
		};
		switch (e) {
			case 0: {
				Object.assign(t, {
					screenshakeEnabledLocations: { 0: !0, 1: !1, 2: !1 },
					combosRequiredCount: 5,
				});
				break;
			}
			case 1: {
				Object.assign(t, { confettiSize: 12, confettiCount: 8 });
				break;
			}
			case 2: {
				Object.assign(t, {
					shakeIntensity: 20,
					confettiSize: 25,
					confettiCount: 15,
				});
				break;
			}
		}
		Object.assign(gv.__getLocalVars().state, t);
	}
	var gv,
		mv,
		gp,
		yv = m(() => {
			'use strict';
			a();
			E();
			w();
			T();
			_();
			(gv = ue('PoggermodeSettingsStore')),
				(mv = N({
					superIntensePartyMode: {
						description: 'Party intensity',
						type: 4,
						options: [
							{ label: 'Normal', value: 0, default: !0 },
							{ label: 'Better', value: 1 },
							{ label: 'Project X', value: 2 },
						],
						restartNeeded: !1,
						onChange: hv,
					},
				})),
				(gp = g({
					name: 'Party mode \u{1F389}',
					description:
						'Allows you to use party mode cause the party never ends \u2728',
					authors: [p.UwUDev],
					settings: mv,
					start() {
						fv(!0), hv(mv.store.superIntensePartyMode);
					},
					stop() {
						fv(!1);
					},
				}));
		});
	var vv = m(() => {});
	var Sv = m(() => {});
	function ci({
		height: e = 24,
		width: t = 24,
		className: n,
		children: i,
		viewBox: r,
		...s
	}) {
		return o(
			'svg',
			{
				className: J(n, 'vc-icon'),
				role: 'img',
				width: t,
				height: e,
				viewBox: r,
				...s,
			},
			i,
		);
	}
	function Ks({ height: e = 24, width: t = 24, className: n }) {
		return o(
			ci,
			{
				height: e,
				width: t,
				className: J(n, 'vc-link-icon'),
				viewBox: '0 0 24 24',
			},
			o(
				'g',
				{ fill: 'none', 'fill-rule': 'evenodd' },
				o('path', {
					fill: 'currentColor',
					d: 'M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0 5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24 2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24zm2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0 5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.43l-.47.47a2.982 2.982 0 0 0 0 4.24 2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24.973.973 0 0 1 0-1.42z',
				}),
				o('rect', { width: t, height: e }),
			),
		);
	}
	function bv(e) {
		return o(
			ci,
			{
				...e,
				className: J(e.className, 'vc-copy-icon'),
				viewBox: '0 0 24 24',
			},
			o(
				'g',
				{ fill: 'currentColor' },
				o('path', { d: 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1z' }),
				o('path', {
					d: 'M15 5H8c-1.1 0-1.99.9-1.99 2L6 21c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V11l-6-6zM8 21V7h6v5h5v9H8z',
				}),
			),
		);
	}
	function _o(e) {
		return o(
			ci,
			{
				...e,
				className: J(e.className, 'vc-open-external-icon'),
				viewBox: '0 0 24 24',
			},
			o('polygon', {
				fill: 'currentColor',
				'fill-rule': 'nonzero',
				points: '13 20 11 20 11 8 5.5 13.5 4.08 12.08 12 4.16 19.92 12.08 18.5 13.5 13 8',
			}),
		);
	}
	function Fo(e) {
		return o(
			ci,
			{
				...e,
				className: J(e.className, 'vc-image-icon'),
				viewBox: '0 0 24 24',
			},
			o('path', {
				fill: 'currentColor',
				d: 'M21,19V5c0,-1.1 -0.9,-2 -2,-2H5c-1.1,0 -2,0.9 -2,2v14c0,1.1 0.9,2 2,2h14c1.1,0 2,-0.9 2,-2zM8.5,13.5l2.5,3.01L14.5,12l4.5,6H5l3.5,-4.5z',
			}),
		);
	}
	function Tv(e) {
		return o(
			ci,
			{
				...e,
				className: J(e.className, 'vc-info-icon'),
				viewBox: '0 0 12 12',
			},
			o('path', {
				fill: 'currentColor',
				d: 'M6 1C3.243 1 1 3.244 1 6c0 2.758 2.243 5 5 5s5-2.242 5-5c0-2.756-2.243-5-5-5zm0 2.376a.625.625 0 110 1.25.625.625 0 010-1.25zM7.5 8.5h-3v-1h1V6H5V5h1a.5.5 0 01.5.5v2h1v1z',
			}),
		);
	}
	function xv(e) {
		return o(
			ci,
			{
				'aria-label': nt.Messages.GUILD_OWNER,
				...e,
				className: J(e.className, 'vc-owner-crown-icon'),
				role: 'img',
				viewBox: '0 0 16 16',
			},
			o('path', {
				fill: 'currentColor',
				'fill-rule': 'evenodd',
				'clip-rule': 'evenodd',
				d: 'M13.6572 5.42868C13.8879 5.29002 14.1806 5.30402 14.3973 5.46468C14.6133 5.62602 14.7119 5.90068 14.6473 6.16202L13.3139 11.4954C13.2393 11.7927 12.9726 12.0007 12.6666 12.0007H3.33325C3.02725 12.0007 2.76058 11.792 2.68592 11.4954L1.35258 6.16202C1.28792 5.90068 1.38658 5.62602 1.60258 5.46468C1.81992 5.30468 2.11192 5.29068 2.34325 5.42868L5.13192 7.10202L7.44592 3.63068C7.46173 3.60697 7.48377 3.5913 7.50588 3.57559C7.5192 3.56612 7.53255 3.55663 7.54458 3.54535L6.90258 2.90268C6.77325 2.77335 6.77325 2.56068 6.90258 2.43135L7.76458 1.56935C7.89392 1.44002 8.10658 1.44002 8.23592 1.56935L9.09792 2.43135C9.22725 2.56068 9.22725 2.77335 9.09792 2.90268L8.45592 3.54535C8.46794 3.55686 8.48154 3.56651 8.49516 3.57618C8.51703 3.5917 8.53897 3.60727 8.55458 3.63068L10.8686 7.10202L13.6572 5.42868ZM2.66667 12.6673H13.3333V14.0007H2.66667V12.6673Z',
			}),
		);
	}
	var Bo = m(() => {
		'use strict';
		a();
		Sv();
		de();
		x();
	});
	function x2(e) {
		return ko(e.toLowerCase().split('_'));
	}
	function Ys(e) {
		return (e = wv[e] || e), nt.Messages[e] || x2(e);
	}
	function Mv(e) {
		e === 'USE_APPLICATION_COMMANDS'
			? (e = 'USE_APPLICATION_COMMANDS_GUILD')
			: e === 'SEND_VOICE_MESSAGES'
			? (e = 'SEND_VOICE_MESSAGE_GUILD')
			: e !== 'STREAM' && (e = wv[e] || e);
		let t = nt.Messages[`ROLE_PERMISSIONS_${e}_DESCRIPTION`];
		return t?.hasMarkdown
			? Pe.parse(t.message)
			: typeof t == 'string'
			? t
			: '';
	}
	function Zs({ roles: e, id: t }, n) {
		return [...n.roles, t]
			.map((i) => e[i])
			.sort((i, r) => r.position - i.position);
	}
	function Pv(e) {
		switch (ui.store.permissionsSortOrder) {
			case 0:
				return e.sort((t, n) => n.position - t.position);
			case 1:
				return e.sort((t, n) => t.position - n.position);
			default:
				return e;
		}
	}
	function Xs(e, t) {
		let n = le.getGuild(t);
		return e.sort((i, r) => {
			if (i.type !== 0 || r.type !== 0) return 0;
			let s = n.roles[i.id];
			return n.roles[r.id].position - s.position;
		});
	}
	var Mt,
		wv,
		dr = m(() => {
			'use strict';
			a();
			je();
			ro();
			x();
			Js();
			mr();
			Mt = Ue('vc-permviewer-');
			wv = {
				MANAGE_GUILD: 'MANAGE_SERVER',
				MANAGE_GUILD_EXPRESSIONS: 'MANAGE_EXPRESSIONS',
				CREATE_GUILD_EXPRESSIONS: 'CREATE_EXPRESSIONS',
				MODERATE_MEMBERS: 'MODERATE_MEMBER',
				STREAM: 'VIDEO',
				SEND_VOICE_MESSAGES: 'ROLE_PERMISSIONS_SEND_VOICE_MESSAGE',
			};
		});
	function hp() {
		return o(
			'svg',
			{ height: '24', width: '24', viewBox: '0 0 24 24' },
			o('title', null, 'Denied'),
			o('path', {
				fill: 'var(--status-danger)',
				d: 'M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z',
			}),
		);
	}
	function yp() {
		return o(
			'svg',
			{ height: '24', width: '24', viewBox: '0 0 24 24' },
			o('title', null, 'Allowed'),
			o('path', {
				fill: 'var(--text-positive)',
				d: 'M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17ZZ',
			}),
		);
	}
	function Rv() {
		return o(
			'svg',
			{ height: '24', width: '24', viewBox: '0 0 16 16' },
			o(
				'g',
				null,
				o('title', null, 'Not overwritten'),
				o('polygon', {
					fill: 'var(--text-normal)',
					points: '12 2.32 10.513 2 4 13.68 5.487 14',
				}),
			),
		);
	}
	var Cv = m(() => {
		'use strict';
		a();
	});
	function M2(e, t, n) {
		return be((i) =>
			o(R2, { modalProps: i, permissions: e, guild: t, header: n }),
		);
	}
	function P2({ permissions: e, guild: t, modalProps: n, header: i }) {
		e.sort((c, u) => c.type - u.type),
			Be(
				[ke],
				() => ke.getMemberIds(t.id),
				null,
				(c, u) => c.length === u.length,
			),
			tt(() => {
				let c = e
					.filter((u) => u.type === 1 && !ke.isMember(t.id, u.id))
					.map(({ id: u }) => u);
				L.dispatch({
					type: 'GUILD_MEMBERS_REQUEST',
					guildIds: [t.id],
					userIds: c,
				});
			}, []);
		let [r, s] = V(0),
			l = e[r];
		return o(
			Ie,
			{ ...n, size: 'large' },
			o(
				$e,
				null,
				o(
					q,
					{
						className: Mt('perms-title'),
						variant: 'heading-lg/semibold',
					},
					i,
					' permissions:',
				),
				o(St, { onClick: n.onClose }),
			),
			o(
				Le,
				null,
				!l &&
					o(
						'div',
						{ className: Mt('perms-no-perms') },
						o(
							q,
							{ variant: 'heading-lg/normal' },
							'No permissions to display!',
						),
					),
				l &&
					o(
						'div',
						{ className: Mt('perms-container') },
						o(
							'div',
							{ className: Mt('perms-list') },
							e.map((c, u) => {
								let h = U.getUser(c.id ?? ''),
									f = t.roles[c.id ?? ''];
								return o(
									'button',
									{
										className: Mt('perms-list-item-btn'),
										onClick: () => s(u),
									},
									o(
										'div',
										{
											className: Mt('perms-list-item', {
												'perms-list-item-active':
													r === u,
											}),
											onContextMenu: (v) => {
												c.type === 0 &&
													Fn.open(v, () =>
														o(I2, {
															guild: t,
															roleId: c.id,
															onClose: n.onClose,
														}),
													);
											},
										},
										(c.type === 0 || c.type === 2) &&
											o('span', {
												className:
													Mt('perms-role-circle'),
												style: {
													backgroundColor:
														f?.colorString ??
														'var(--primary-300)',
												},
											}),
										c.type === 1 &&
											h !== void 0 &&
											o('img', {
												className: Mt('perms-user-img'),
												src: h.getAvatarURL(
													void 0,
													void 0,
													!1,
												),
											}),
										o(
											q,
											{ variant: 'text-md/normal' },
											c.type === 0
												? f?.name || 'Unknown Role'
												: c.type === 1
												? h?.tag || 'Unknown User'
												: o(
														ae,
														{
															style: {
																gap: '0.2em',
																justifyItems:
																	'center',
															},
														},
														'@owner',
														o(xv, {
															height: 18,
															width: 18,
															'aria-hidden':
																'true',
														}),
												  ),
										),
									),
								);
							}),
						),
						o(
							'div',
							{ className: Mt('perms-perms') },
							Object.entries(io).map(([c, u]) =>
								o(
									'div',
									{ className: Mt('perms-perms-item') },
									o(
										'div',
										{
											className: Mt(
												'perms-perms-item-icon',
											),
										},
										(() => {
											let {
												permissions: h,
												overwriteAllow: f,
												overwriteDeny: v,
											} = l;
											return h
												? (h & u) === u
													? yp()
													: hp()
												: f && (f & u) === u
												? yp()
												: v && (v & u) === u
												? hp()
												: Rv();
										})(),
									),
									o(q, { variant: 'text-md/normal' }, Ys(c)),
									o(
										W,
										{ text: Mv(c) || 'No Description' },
										(h) => o(Tv, { ...h }),
									),
								),
							),
						),
					),
			),
		);
	}
	function I2({ guild: e, roleId: t, onClose: n }) {
		return o(
			F.Menu,
			{
				navId: Mt('role-context-menu'),
				onClose: Fn.close,
				'aria-label': 'Role Options',
			},
			o(F.MenuItem, {
				id: 'vc-pw-view-as-role',
				label: 'View As Role',
				action: () => {
					let i = e.roles[t];
					!i ||
						(n(),
						L.dispatch({
							type: 'IMPERSONATE_UPDATE',
							guildId: e.id,
							data: { type: 'ROLES', roles: { [t]: i } },
						}));
				},
			}),
		);
	}
	var R2,
		pi,
		mr = m(() => {
			'use strict';
			a();
			re();
			xt();
			Bo();
			ze();
			x();
			dr();
			Cv();
			(R2 = k.wrap(P2)), (pi = M2);
		});
	var Av = m(() => {});
	function fr({
		children: e,
		onMoreClick: t,
		buttons: n,
		moreTooltipText: i,
		defaultState: r = !1,
		onDropDownClick: s,
		headerText: l,
	}) {
		let [c, u] = V(r);
		return o(
			d,
			null,
			o(
				'div',
				{
					style: {
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: '8px',
					},
				},
				o(
					q,
					{
						tag: 'h2',
						variant: 'eyebrow',
						style: {
							color: 'var(--header-primary)',
							display: 'inline',
						},
					},
					l,
				),
				o(
					'div',
					{ className: vp('center-flex') },
					n ?? null,
					t &&
						o(W, { text: i }, (h) =>
							o(
								'button',
								{ ...h, className: vp('btn'), onClick: t },
								o(
									'svg',
									{
										width: '24',
										height: '24',
										viewBox: '0 0 24 24',
									},
									o('path', {
										fill: 'var(--text-normal)',
										d: 'M7 12.001C7 10.8964 6.10457 10.001 5 10.001C3.89543 10.001 3 10.8964 3 12.001C3 13.1055 3.89543 14.001 5 14.001C6.10457 14.001 7 13.1055 7 12.001ZM14 12.001C14 10.8964 13.1046 10.001 12 10.001C10.8954 10.001 10 10.8964 10 12.001C10 13.1055 10.8954 14.001 12 14.001C13.1046 14.001 14 13.1055 14 12.001ZM19 10.001C20.1046 10.001 21 10.8964 21 12.001C21 13.1055 20.1046 14.001 19 14.001C17.8954 14.001 17 13.1055 17 12.001C17 10.8964 17.8954 10.001 19 10.001Z',
									}),
								),
							),
						),
					o(W, { text: c ? 'Hide ' + l : 'Show ' + l }, (h) =>
						o(
							'button',
							{
								...h,
								className: vp('btn'),
								onClick: () => {
									u((f) => !f), s?.(c);
								},
							},
							o(
								'svg',
								{
									width: '24',
									height: '24',
									viewBox: '0 0 24 24',
									transform: c ? 'scale(1 -1)' : 'scale(1 1)',
								},
								o('path', {
									fill: 'var(--text-normal)',
									d: 'M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z',
								}),
							),
						),
					),
				),
			),
			c && e,
		);
	}
	var vp,
		Sp = m(() => {
			'use strict';
			a();
			je();
			x();
			Av();
			vp = Ue('vc-expandableheader-');
		});
	function A2({ guild: e, guildMember: t }) {
		let n = ui.use(['permissionsSortOrder']),
			[i, r] = Ut(() => {
				let A = [],
					C = Zs(e, t),
					D = C.map((B) => ({ type: 0, ...B }));
				if (e.ownerId === t.userId) {
					D.push({
						type: 2,
						permissions: Object.values(io).reduce(
							(O, K) => O | K,
							0n,
						),
					});
					let B = nt.Messages.GUILD_OWNER || 'Server Owner';
					A.push({
						permission: B,
						roleColor: 'var(--primary-300)',
						rolePosition: 1 / 0,
					});
				}
				Pv(C);
				for (let [B, O] of Object.entries(io))
					for (let {
						permissions: K,
						colorString: ee,
						position: j,
						name: z,
					} of C)
						if ((K & O) === O) {
							A.push({
								permission: Ys(B),
								roleColor: ee || 'var(--primary-300)',
								rolePosition: j,
							});
							break;
						}
				return (
					A.sort((B, O) => O.rolePosition - B.rolePosition), [D, A]
				);
			}, [n.permissionsSortOrder]),
			{
				root: s,
				role: l,
				roleRemoveButton: c,
				roleNameOverflow: u,
				roles: h,
				rolePill: f,
				rolePillBorder: v,
				roleCircle: S,
				roleName: b,
			} = C2;
		return o(
			fr,
			{
				headerText: 'Permissions',
				moreTooltipText: 'Role Details',
				onMoreClick: () =>
					pi(i, e, t.nick || U.getUser(t.userId).username),
				defaultState: ui.store.defaultPermissionsDropdownState,
				buttons: [
					o(
						W,
						{
							text: `Sorting by ${
								n.permissionsSortOrder === 0
									? 'Highest Role'
									: 'Lowest Role'
							}`,
						},
						(A) =>
							o(
								'button',
								{
									...A,
									className: Mt('userperms-sortorder-btn'),
									onClick: () => {
										n.permissionsSortOrder =
											n.permissionsSortOrder === 0
												? 1
												: 0;
									},
								},
								o(
									'svg',
									{
										width: '20',
										height: '20',
										viewBox: '0 96 960 960',
										transform:
											n.permissionsSortOrder === 0
												? 'scale(1 1)'
												: 'scale(1 -1)',
									},
									o('path', {
										fill: 'var(--text-normal)',
										d: 'M440 896V409L216 633l-56-57 320-320 320 320-56 57-224-224v487h-80Z',
									}),
								),
							),
					),
				],
			},
			r.length > 0 &&
				o(
					'div',
					{ className: J(s, h) },
					r.map(({ permission: A, roleColor: C }) =>
						o(
							'div',
							{ className: J(l, f, v) },
							o(
								'div',
								{ className: c },
								o('span', {
									className: S,
									style: { backgroundColor: C },
								}),
							),
							o(
								'div',
								{ className: b },
								o(
									q,
									{ className: u, variant: 'text-xs/medium' },
									A,
								),
							),
						),
					),
				),
		);
	}
	var C2,
		Nv,
		kv = m(() => {
			'use strict';
			a();
			re();
			Sp();
			rn();
			de();
			_();
			x();
			Js();
			dr();
			mr();
			C2 = ct(() => {
				let e = Ri(
					Y.byProps('roles', 'rolePill', 'rolePillBorder'),
					Y.byProps('roleCircle', 'dotBorderBase', 'dotBorderColor'),
					Y.byProps(
						'roleNameOverflow',
						'root',
						'roleName',
						'roleRemoveButton',
					),
				);
				return Object.assign({}, ...e);
			});
			Nv = k.wrap(A2, { noop: !0 });
		});
	function bp(e, t, n) {
		return n === 0 && !ke.isMember(e, t)
			? null
			: o(F.MenuItem, {
					id: 'perm-viewer-permissions',
					label: 'Permissions',
					action: () => {
						let i = le.getGuild(e),
							r,
							s;
						switch (n) {
							case 0: {
								let l = ke.getMember(e, t);
								(r = Zs(i, l).map((c) => ({ type: 0, ...c }))),
									i.ownerId === t &&
										r.push({
											type: 2,
											permissions: Object.values(
												io,
											).reduce((c, u) => c | u, 0n),
										}),
									(s =
										l.nick ?? U.getUser(l.userId).username);
								break;
							}
							case 1: {
								let l = X.getChannel(t);
								(r = Xs(
									Object.values(l.permissionOverwrites).map(
										({
											id: c,
											allow: u,
											deny: h,
											type: f,
										}) => ({
											type: f,
											id: c,
											overwriteAllow: u,
											overwriteDeny: h,
										}),
									),
									e,
								)),
									(s = l.name);
								break;
							}
							default: {
								(r = Object.values(i.roles).map((l) => ({
									type: 0,
									...l,
								}))),
									(s = i.name);
								break;
							}
						}
						pi(r, i, s);
					},
			  });
	}
	function Tp(e, t) {
		return (n, i) => () => {
			if (!i) return n;
			let r = Lt(e, n),
				s = (() => {
					switch (t) {
						case 0:
							return bp(i.guildId, i.user.id, t);
						case 1:
							return bp(i.guild.id, i.channel.id, t);
						case 2:
							return bp(i.guild.id);
						default:
							return null;
					}
				})();
			s != null &&
				(r
					? r.push(s)
					: e === 'roles' &&
					  i.guildId &&
					  n.splice(-1, 0, o(F.MenuGroup, null, s)));
		};
	}
	var ui,
		xp,
		Js = m(() => {
			'use strict';
			a();
			vv();
			Jt();
			E();
			w();
			T();
			x();
			mr();
			kv();
			dr();
			ui = N({
				permissionsSortOrder: {
					description:
						'The sort method used for defining which role grants an user a certain permission',
					type: 4,
					options: [
						{ label: 'Highest Role', value: 0, default: !0 },
						{ label: 'Lowest Role', value: 1 },
					],
				},
				defaultPermissionsDropdownState: {
					description:
						'Whether the permissions dropdown on user popouts should be open by default',
					type: 3,
					default: !1,
				},
			});
			xp = g({
				name: 'PermissionsViewer',
				description:
					'View the permissions a user or channel has, and the roles of a server',
				authors: [p.Nuckyz, p.Ven],
				settings: ui,
				patches: [
					{
						find: '.Messages.BOT_PROFILE_SLASH_COMMANDS',
						replacement: {
							match: /showBorder:.{0,60}}\),(?<=guild:(\i),guildMember:(\i),.+?)/,
							replace: (e, t, n) =>
								`${e}$self.UserPermissions(${t},${n}),`,
						},
					},
				],
				UserPermissions: (e, t) =>
					!!t && o(Nv, { guild: e, guildMember: t }),
				userContextMenuPatch: Tp('roles', 0),
				channelContextMenuPatch: Tp(
					['mute-channel', 'unmute-channel'],
					1,
				),
				guildContextMenuPatch: Tp('privacy', 2),
				start() {
					we('user-context', this.userContextMenuPatch),
						we('channel-context', this.channelContextMenuPatch),
						we('guild-context', this.guildContextMenuPatch);
				},
				stop() {
					Ae('user-context', this.userContextMenuPatch),
						Ae('channel-context', this.channelContextMenuPatch),
						Ae('guild-context', this.guildContextMenuPatch);
				},
			});
		});
	function Ev(e) {
		let t = e instanceof File,
			n = t ? URL.createObjectURL(e) : e;
		return new Promise((i, r) => {
			let s = new Image();
			(s.onload = () => {
				t && URL.revokeObjectURL(n), i(s);
			}),
				(s.onerror = (l, c, u, h, f) => r(f || l)),
				(s.crossOrigin = 'Anonymous'),
				(s.src = n);
		});
	}
	async function _2(e, t, n) {
		for (let i of e)
			switch (i.name) {
				case 'image':
					let r = O2.getUploads(t.channel.id, Lv)[0];
					if (r) {
						if (!r.isImage) throw 'Upload is not an image';
						return r.item.file;
					}
					break;
				case 'url':
					return i.value;
				case 'user':
					try {
						return (await E2(i.value))
							.getAvatarURL(n ? void 0 : t.guild?.id, 2048)
							.replace(/\?size=\d+$/, '?size=2048');
					} catch (s) {
						throw (
							(console.error(
								`[petpet] Failed to fetch user
`,
								s,
							),
							'Failed to fetch user. Check the console for more info.')
						);
					}
			}
		return null;
	}
	var Lv,
		N2,
		k2,
		Qs,
		L2,
		E2,
		D2,
		O2,
		wp,
		Dv = m(() => {
			'use strict';
			a();
			wt();
			w();
			tr();
			rn();
			T();
			_();
			(Lv = 0),
				(N2 = 20),
				(k2 = 128),
				(Qs = 10),
				(L2 = On(() =>
					Promise.all(
						Array.from({ length: Qs }, (e, t) =>
							Ev(
								`https://raw.githubusercontent.com/VenPlugs/petpet/main/frames/pet${t}.gif`,
							),
						),
					),
				)),
				(E2 = ce('.USER(')),
				(D2 = ce('UPLOAD_FILE_LIMIT_ERROR')),
				(O2 = P('getUploads'));
			wp = g({
				name: 'petpet',
				description:
					'Adds a /petpet slash command to create headpet gifs from any image',
				authors: [p.Ven],
				dependencies: ['CommandsAPI'],
				commands: [
					{
						inputType: 0,
						name: 'petpet',
						description:
							'Create a petpet gif. You can only specify one of the image options',
						options: [
							{
								name: 'delay',
								description:
									'The delay between each frame. Defaults to 20.',
								type: 4,
							},
							{
								name: 'resolution',
								description:
									"Resolution for the gif. Defaults to 120. If you enter an insane number and it freezes Discord that's your fault.",
								type: 4,
							},
							{
								name: 'image',
								description: 'Image attachment to use',
								type: 11,
							},
							{
								name: 'url',
								description: 'URL to fetch image from',
								type: 3,
							},
							{
								name: 'user',
								description:
									'User whose avatar to use as image',
								type: 6,
							},
							{
								name: 'no-server-pfp',
								description:
									"Use the normal avatar instead of the server specific one when using the 'user' option",
								type: 5,
							},
						],
						execute: async (e, t) => {
							let {
									GIFEncoder: n,
									quantize: i,
									applyPalette: r,
								} = await Es(),
								s = await L2(),
								l = De(e, 'no-server-pfp', !1);
							try {
								var c = await _2(e, t, l);
								if (!c) throw 'No Image specified!';
							} catch (C) {
								ie(t.channel.id, { content: String(C) });
								return;
							}
							let u = await Ev(c),
								h = De(e, 'delay', N2),
								f = De(e, 'resolution', k2),
								v = new n(),
								S = document.createElement('canvas');
							S.width = S.height = f;
							let b = S.getContext('2d');
							for (let C = 0; C < Qs; C++) {
								b.clearRect(0, 0, S.width, S.height);
								let D = C < Qs / 2 ? C : Qs - C,
									B = 0.8 + D * 0.02,
									O = 0.8 - D * 0.05,
									K = (1 - B) * 0.5 + 0.1,
									ee = 1 - O - 0.08;
								b.drawImage(u, K * f, ee * f, B * f, O * f),
									b.drawImage(s[C], 0, 0, f, f);
								let { data: j } = b.getImageData(0, 0, f, f),
									z = i(j, 256),
									te = r(j, z);
								v.writeFrame(te, f, f, {
									transparent: !0,
									palette: z,
									delay: h,
								});
							}
							v.finish();
							let A = new File([v.bytesView()], 'petpet.gif', {
								type: 'image/gif',
							});
							setTimeout(() => D2([A], t.channel, Lv), 10);
						},
					},
				],
			});
		});
	function Fv() {
		return it(['plugins.PinDMs.pinnedDMs']), Vs();
	}
	function di(e) {
		return Vs().has(e);
	}
	function Bv(e) {
		let t = Vs();
		t.delete(e) || t.add(e), _v([...t]);
	}
	function Pp() {
		return (
			Vs(),
			gr.store.pinOrder === 0 ? F2.getPrivateChannelIds().filter(di) : Ln
		);
	}
	function $v(e) {
		return Pp()[e];
	}
	function Ip(e, t) {
		let n = Ov(),
			i = n.indexOf(e),
			r = i + t;
		([n[i], n[r]] = [n[r], n[i]]), _v(n);
	}
	var gr,
		F2,
		Ln,
		Mp,
		Ov,
		_v,
		B2,
		Vs,
		Rp = m(() => {
			'use strict';
			a();
			E();
			T();
			_();
			(gr = N({
				pinOrder: {
					type: 4,
					description:
						'Which order should pinned DMs be displayed in?',
					options: [
						{ label: 'Most recent message', value: 0, default: !0 },
						{
							label: 'Custom (right click channels to reorder)',
							value: 1,
						},
					],
				},
			})),
				(F2 = ue('PrivateChannelSortStore')),
				(Ov = () => (M.plugins.PinDMs.pinnedDMs || void 0)?.split(',')),
				(_v = (e) => {
					(Mp = void 0), (M.plugins.PinDMs.pinnedDMs = e.join(','));
				}),
				(B2 = () => ((Ln = Ov() ?? []), (Mp = new Set(Ln)))),
				(Vs = () => Mp ?? B2());
		});
	function Uv(e) {
		let t = di(e),
			n = t && gr.store.pinOrder === 1;
		return o(
			d,
			null,
			o(F.MenuItem, {
				id: 'pin-dm',
				label: t ? 'Unpin DM' : 'Pin DM',
				action: () => Bv(e),
			}),
			n &&
				Ln[0] !== e &&
				o(F.MenuItem, {
					id: 'move-pin-up',
					label: 'Move Pin Up',
					action: () => Ip(e, -1),
				}),
			n &&
				Ln[Ln.length - 1] !== e &&
				o(F.MenuItem, {
					id: 'move-pin-down',
					label: 'Move Pin Down',
					action: () => Ip(e, 1),
				}),
		);
	}
	function zv() {
		we('gdm-context', Gv), we('user-context', Hv);
	}
	function jv() {
		Ae('gdm-context', Gv), Ae('user-context', Hv);
	}
	var Gv,
		Hv,
		Wv = m(() => {
			'use strict';
			a();
			Jt();
			x();
			Rp();
			(Gv = (e, t) => () => {
				let n = Lt('leave-channel', e);
				n && n.unshift(Uv(t.channel.id));
			}),
				(Hv = (e, t) => () => {
					let n = Lt('close-dm', e);
					if (n) {
						let i = n.findIndex((r) => r?.props?.id === 'close-dm');
						n.splice(i, 0, Uv(t.channel.id));
					}
				});
		});
	var Cp,
		qv = m(() => {
			'use strict';
			a();
			w();
			T();
			Wv();
			Rp();
			Cp = g({
				name: 'PinDMs',
				description:
					'Allows you to pin private channels to the top of your DM list. To pin/unpin or reorder pins, right click DMs',
				authors: [p.Ven, p.Strencher],
				settings: gr,
				start: zv,
				stop: jv,
				usePinCount(e) {
					let t = Fv();
					return e.length ? [t.size] : [];
				},
				getChannel(e, t) {
					return e[$v(t)];
				},
				isPinned: di,
				getSnapshot: Pp,
				getScrollOffset(e, t, n, i, r) {
					return di(e)
						? t * (Ln.indexOf(e) + i) + n
						: (t + n) * 2 + t * Ln.length + r;
				},
				patches: [
					{
						find: '.privateChannelsHeaderContainer,',
						replacement: [
							{
								match: /privateChannelIds:(\i),/,
								replace:
									'privateChannelIds:$1.filter(c=>!$self.isPinned(c)),pinCount:$self.usePinCount($1),',
							},
							{
								match: /(?<=renderRow:(\i)\.renderRow,)sections:\[\i,/,
								replace: '$&...$1.props.pinCount,',
							},
							{
								match: /children:(\i\.\i\.Messages.DIRECT_MESSAGES)(?<=renderSection=function\((\i)\).+?)/,
								replace:
									"children:$2.section===1?'Pinned DMs':$1",
							},
							{
								match: /(?<=preRenderedChildren,(\i)=)((\i)\[\i\[\i\]\]);/,
								replace:
									'arguments[0]===1?$self.getChannel($3,arguments[1]):$2;',
							},
							{ match: /===\i.DMS&&0/, replace: '-1$&' },
							{
								match: /(?<=else\{\i\+=)(\i)\*\(.+?(?=;)/,
								replace:
									'$self.getScrollOffset(arguments[0],$1,this.props.padding,this.state.preRenderedChildren,$&)',
							},
						],
					},
					{
						find: '"mod+alt+right"',
						replacement: {
							match: /(?<=(\i)=__OVERLAY__\?\i:.{0,10})\.concat\((.{0,10})\)/,
							replace:
								'.concat($self.getSnapshot()).concat($2.filter(c=>!$self.isPinned(c)))',
						},
					},
				],
			});
		});
	var Ap,
		Kv = m(() => {
			'use strict';
			a();
			w();
			T();
			Ap = g({
				name: 'PlainFolderIcon',
				description: "Doesn't show the small guild icons in folders",
				authors: [p.botato],
				patches: [
					{
						find: '.expandedFolderIconWrapper',
						replacement: [
							{
								match: /\(\w\|\|\w\)&&(\(.{0,40}\(.{1,3}\.animated)/,
								replace: '$1',
							},
						],
					},
				],
			});
		});
	var Lp = {};
	me(Lp, {
		__addDecoratorsToList: () => $2,
		addDecorator: () => Np,
		decorators: () => ea,
		removeDecorator: () => kp,
	});
	function Np(e, t, n) {
		ea.set(e, { decorator: t, onlyIn: n });
	}
	function kp(e) {
		ea.delete(e);
	}
	function $2(e) {
		let t = !!e.guildId;
		return [...ea.values()].map((n) => {
			let { decorator: i, onlyIn: r } = n;
			return !r || (r === 'guilds' && t) || (r === 'dms' && !t)
				? i(e)
				: null;
		});
	}
	var ea,
		Ep = m(() => {
			'use strict';
			a();
			ea = new Map();
		});
	var _p = {};
	me(_p, {
		__addDecorationsToMessage: () => U2,
		addDecoration: () => Dp,
		decorations: () => ta,
		removeDecoration: () => Op,
	});
	function Dp(e, t) {
		ta.set(e, t);
	}
	function Op(e) {
		ta.delete(e);
	}
	function U2(e) {
		return [...ta.values()].map((t) => t(e));
	}
	var ta,
		Fp = m(() => {
			'use strict';
			a();
			ta = new Map();
		});
	function na(e, t) {
		return ({ color: n, tooltip: i }) =>
			o(W, { text: i }, (r) =>
				o(
					'svg',
					{
						...r,
						height: t?.height ?? 20,
						width: t?.width ?? 20,
						viewBox: t?.viewBox ?? '0 0 24 24',
						fill: n,
					},
					o('path', { d: e }),
				),
			);
	}
	var G2,
		Yv,
		H2,
		z2,
		j2,
		$p,
		Zv,
		Bp,
		Up,
		Xv = m(() => {
			'use strict';
			a();
			xs();
			Ep();
			Fp();
			E();
			re();
			w();
			T();
			_();
			x();
			G2 = ue('SessionsStore');
			(Yv = {
				desktop: na(
					'M4 2.5c-1.103 0-2 .897-2 2v11c0 1.104.897 2 2 2h7v2H7v2h10v-2h-4v-2h7c1.103 0 2-.896 2-2v-11c0-1.103-.897-2-2-2H4Zm16 2v9H4v-9h16Z',
				),
				web: na(
					'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93Zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39Z',
				),
				mobile: na(
					'M 187 0 L 813 0 C 916.277 0 1000 83.723 1000 187 L 1000 1313 C 1000 1416.277 916.277 1500 813 1500 L 187 1500 C 83.723 1500 0 1416.277 0 1313 L 0 187 C 0 83.723 83.723 0 187 0 Z M 125 1000 L 875 1000 L 875 250 L 125 250 Z M 500 1125 C 430.964 1125 375 1180.964 375 1250 C 375 1319.036 430.964 1375 500 1375 C 569.036 1375 625 1319.036 625 1250 C 625 1180.964 569.036 1125 500 1125 Z',
					{ viewBox: '0 0 1000 1500', height: 17, width: 17 },
				),
				console: na(
					'M14.8 2.7 9 3.1V47h3.3c1.7 0 6.2.3 10 .7l6.7.6V2l-4.2.2c-2.4.1-6.9.3-10 .5zm1.8 6.4c1 1.7-1.3 3.6-2.7 2.2C12.7 10.1 13.5 8 15 8c.5 0 1.2.5 1.6 1.1zM16 33c0 6-.4 10-1 10s-1-4-1-10 .4-10 1-10 1 4 1 10zm15-8v23.3l3.8-.7c2-.3 4.7-.6 6-.6H43V3h-2.2c-1.3 0-4-.3-6-.6L31 1.7V25z',
					{ viewBox: '0 0 50 50' },
				),
			}),
				(H2 = ce('.TWITCH', '.STREAMING', '.INVISIBLE')),
				(z2 = ({ platform: e, status: t }) => {
					let n = e[0].toUpperCase() + e.slice(1),
						i = Yv[e] ?? Yv.desktop;
					return o(i, { color: `var(--${H2(t)}`, tooltip: n });
				}),
				(j2 = (e) => oo.getState()?.clientStatuses?.[e]),
				($p = ({
					user: e,
					wantMargin: t = !0,
					wantTopMargin: n = !1,
				}) => {
					if (!e || e.bot) return null;
					if (e.id === U.getCurrentUser().id) {
						let s = G2.getSessions();
						if (typeof s != 'object') return null;
						let l = Object.values(s).sort(
								({ status: h }, { status: f }) =>
									h === f
										? 0
										: h === 'online'
										? 1
										: f === 'online'
										? -1
										: h === 'idle'
										? 1
										: f === 'idle'
										? -1
										: 0,
							),
							c = Object.values(l).reduce(
								(h, f) => (
									f.clientInfo.client !== 'unknown' &&
										(h[f.clientInfo.client] = f.status),
									h
								),
								{},
							),
							{ clientStatuses: u } = oo.getState();
						u[U.getCurrentUser().id] = c;
					}
					let i = oo.getState()?.clientStatuses?.[e.id];
					if (!i) return null;
					let r = Object.entries(i).map(([s, l]) =>
						o(z2, { key: s, platform: s, status: l }),
					);
					return r.length
						? o(
								'span',
								{
									className: 'vc-platform-indicator',
									style: {
										display: 'inline-flex',
										justifyContent: 'center',
										alignItems: 'center',
										marginLeft: t ? 4 : 0,
										verticalAlign: 'top',
										position: 'relative',
										top: n ? 2 : 0,
										padding: t ? 0 : 1,
										gap: 2,
									},
								},
								r,
						  )
						: null;
				}),
				(Zv = {
					component: (e) => o($p, { ...e, wantMargin: !1 }),
					position: 0,
					shouldShow: (e) =>
						!!Object.keys(j2(e.user.id) ?? {}).length,
					key: 'indicator',
				}),
				(Bp = {
					list: {
						description: 'In the member list',
						onEnable: () =>
							Np('platform-indicator', (e) =>
								o(k, { noop: !0 }, o($p, { user: e.user })),
							),
						onDisable: () => kp('platform-indicator'),
					},
					badges: {
						description: 'In user profiles, as badges',
						onEnable: () => Gp(Zv),
						onDisable: () => Hp(Zv),
					},
					messages: {
						description: 'Inside messages',
						onEnable: () =>
							Dp('platform-indicator', (e) =>
								o(
									k,
									{ noop: !0 },
									o($p, {
										user: e.message?.author,
										wantTopMargin: !0,
									}),
								),
							),
						onDisable: () => Op('platform-indicator'),
					},
				}),
				(Up = g({
					name: 'PlatformIndicators',
					description:
						'Adds platform indicators (Desktop, Mobile, Web...) to users',
					authors: [p.kemo, p.TheSun, p.Nuckyz, p.Ven],
					dependencies: [
						'MessageDecorationsAPI',
						'MemberListDecoratorsAPI',
					],
					start() {
						let e = M.plugins.PlatformIndicators,
							{ displayMode: t } = e;
						t &&
							(t !== 'both'
								? (e[t] = !0)
								: ((e.list = !0), (e.badges = !0)),
							(e.messages = !0),
							delete e.displayMode),
							Object.entries(Bp).forEach(([n, i]) => {
								e[n] && i.onEnable();
							});
					},
					stop() {
						Object.entries(Bp).forEach(([e, t]) => {
							t.onDisable();
						});
					},
					patches: [
						{
							find: '.Masks.STATUS_ONLINE_MOBILE',
							predicate: () =>
								M.plugins.PlatformIndicators
									.colorMobileIndicator,
							replacement: [
								{
									match: /(?<=return \i\.\i\.Masks\.STATUS_TYPING;)(.+?)(\i)\?(\i\.\i\.Masks\.STATUS_ONLINE_MOBILE):/,
									replace: (e, t, n, i) =>
										`if(${n})return ${i};${t}`,
								},
								{
									match: /(switch\(\i\){case \i\.\i\.ONLINE:return )(\i)\?({.+?}):/,
									replace: (e, t, n, i) =>
										`if(${n})return${i};${t}`,
								},
							],
						},
						{
							find: '.AVATAR_STATUS_MOBILE_16;',
							predicate: () =>
								M.plugins.PlatformIndicators
									.colorMobileIndicator,
							replacement: [
								{
									match: /\i===\i\.\i\.ONLINE&&(?=.{0,70}\.AVATAR_STATUS_MOBILE_16;)/,
									replace: '',
								},
								{
									match: /(?<=\(\i\.status,)(\i)(?=,(\i),\i\))/,
									replace: (e, t, n) => `${n}?"online":${t}`,
								},
								{
									match: /(?<=\i&&!\i)&&\i===\i\.\i\.ONLINE/,
									replace: '',
								},
							],
						},
						{
							find: 'isMobileOnline=function',
							predicate: () =>
								M.plugins.PlatformIndicators
									.colorMobileIndicator,
							replacement: {
								match: /(?<=\i\[\i\.\i\.MOBILE\])===\i\.\i\.ONLINE/,
								replace: '!= null',
							},
						},
					],
					options: {
						...Object.fromEntries(
							Object.entries(Bp).map(([e, t]) => [
								e,
								{
									type: 3,
									description: `Show indicators ${t.description.toLowerCase()}`,
									restartNeeded: !0,
									default: !0,
								},
							]),
						),
						colorMobileIndicator: {
							type: 3,
							description:
								'Whether to make the mobile indicator match the color of the user status.',
							default: !0,
							restartNeeded: !0,
						},
					},
				}));
		});
	var Jv = m(() => {});
	function zp() {
		return o(
			I.Fragment,
			null,
			o(y.FormTitle, { tag: 'h3' }, 'More Information'),
			o(
				y.FormText,
				null,
				'To add your own pronouns, visit',
				' ',
				o(We, { href: 'https://pronoundb.org' }, 'pronoundb.org'),
			),
			o(y.FormDivider, null),
			o(
				y.FormText,
				null,
				'The two pronoun formats are lowercase and capitalized. Example:',
				o(
					'ul',
					null,
					o('li', null, 'Lowercase: they/them'),
					o('li', null, 'Capitalized: They/Them'),
				),
				'Text like "Ask me my pronouns" or "Any pronouns" will always be capitalized. ',
				o('br', null),
				o('br', null),
				'You can also configure whether or not to display pronouns for the current user (since you probably already know them)',
			),
		);
	}
	var Qv = m(() => {
		'use strict';
		a();
		Wn();
		x();
	});
	var vo,
		oa = m(() => {
			'use strict';
			a();
			E();
			T();
			ia();
			vo = N({
				pronounsFormat: {
					type: 4,
					description: 'The format for pronouns to appear in chat',
					options: [
						{ label: 'Lowercase', value: 'LOWERCASE', default: !0 },
						{ label: 'Capitalized', value: 'CAPITALIZED' },
					],
				},
				showSelf: {
					type: 3,
					description:
						'Enable or disable showing pronouns for the current user',
					default: !0,
				},
				showInMessages: {
					type: 3,
					description: 'Show in messages',
					default: !0,
				},
				showInProfile: {
					type: 3,
					description: 'Show in profile',
					default: !0,
				},
			});
		});
	var hr,
		Vv = m(() => {
			'use strict';
			a();
			hr = {
				hh: 'He/Him',
				hi: 'He/It',
				hs: 'He/She',
				ht: 'He/They',
				ih: 'It/Him',
				ii: 'It/Its',
				is: 'It/She',
				it: 'It/They',
				shh: 'She/He',
				sh: 'She/Her',
				si: 'She/It',
				st: 'She/They',
				th: 'They/He',
				ti: 'They/It',
				ts: 'They/She',
				tt: 'They/Them',
				any: 'Any pronouns',
				other: 'Other pronouns',
				ask: 'Ask me my pronouns',
				avoid: 'Avoid pronouns, use my name',
				unspecified: 'Unspecified',
			};
		});
	function sa(e) {
		let [t] = ut(() => q2(e), {
			fallbackValue: t1(e),
			onError: (n) => console.error('Fetching pronouns failed: ', n),
		});
		return t && t !== 'unspecified' && hr[t] ? Y2(t) : null;
	}
	function e1(e) {
		let t = sa(e);
		return !vo.store.showInProfile ||
			(!vo.store.showSelf && e === U.getCurrentUser().id)
			? null
			: t;
	}
	function t1(e) {
		return ra[e] ?? null;
	}
	function q2(e) {
		return new Promise((t) => {
			e in ra
				? t(t1(e))
				: e in mi
				? mi[e].push(t)
				: ((mi[e] = [t]), W2());
		});
	}
	async function K2(e) {
		let t = new URLSearchParams();
		t.append('platform', 'discord'), t.append('ids', e.join(','));
		try {
			return await (
				await fetch(
					'https://pronoundb.org/api/v1/lookup-bulk?' + t.toString(),
					{
						method: 'GET',
						headers: {
							Accept: 'application/json',
							'X-PronounDB-Source': Za,
						},
					},
				)
			)
				.json()
				.then((i) => (Object.assign(ra, i), i));
		} catch (n) {
			console.error('PronounDB fetching failed: ', n);
			let i = Object.fromEntries(e.map((r) => [r, 'unspecified']));
			return Object.assign(ra, i), i;
		}
	}
	function Y2(e) {
		let { pronounsFormat: t } = M.plugins.PronounDB;
		return t === 'CAPITALIZED'
			? hr[e]
			: t === 'LOWERCASE' && ['any', 'ask', 'avoid', 'other'].includes(e)
			? hr[e]
			: hr[e].toLowerCase();
	}
	var ra,
		mi,
		W2,
		ia = m(() => {
			'use strict';
			a();
			E();
			w();
			Ko();
			ye();
			x();
			oa();
			Vv();
			(ra = {}),
				(mi = {}),
				(W2 = Ct(async () => {
					let e = Object.keys(mi),
						t = await K2(e);
					for (let n of e)
						mi[n]?.forEach((i) => i(t[n])), delete mi[n];
				}));
		});
	function n1(e) {
		return !(
			!vo.store.showInMessages ||
			e.author.bot ||
			e.author.system ||
			e.type === Z2 ||
			(!vo.store.showSelf && e.author.id === U.getCurrentUser().id)
		);
	}
	function o1({ message: e }) {
		return n1(e) ? o(X2, { message: e }) : null;
	}
	function i1({ message: e }) {
		return n1(e) ? o(J2, { message: e }) : null;
	}
	function X2({ message: e }) {
		let t = sa(e.author.id);
		return t
			? o(
					'span',
					{ className: J(aa.timestampInline, aa.timestamp) },
					'\u2022 ',
					t,
			  )
			: null;
	}
	function J2({ message: e }) {
		let t = sa(e.author.id);
		return t
			? o(
					'span',
					{
						className: J(
							aa.timestampInline,
							aa.timestamp,
							'vc-pronoundb-compact',
						),
					},
					'\u2022 ',
					t,
			  )
			: null;
	}
	var aa,
		Z2,
		r1 = m(() => {
			'use strict';
			a();
			de();
			_();
			x();
			ia();
			oa();
			(aa = P('timestampInline')), (Z2 = 24);
		});
	var jp,
		s1 = m(() => {
			'use strict';
			a();
			Jv();
			w();
			T();
			Qv();
			r1();
			ia();
			oa();
			jp = g({
				name: 'PronounDB',
				authors: [p.Tyman, p.TheKodeToad, p.Ven],
				description: 'Adds pronouns to user messages using pronoundb',
				patches: [
					{
						find: 'showCommunicationDisabledStyles',
						replacement: {
							match: /("span",{id:\i,className:\i,children:\i}\))/,
							replace:
								'$1, $self.CompactPronounsChatComponentWrapper(e)',
						},
					},
					{
						find: 'showCommunicationDisabledStyles',
						replacement: {
							match: /(?<=return\s*\(0,\i\.jsxs?\)\(.+!\i&&)(\(0,\i.jsxs?\)\(.+?\{.+?\}\))/,
							replace:
								'[$1, $self.PronounsChatComponentWrapper(e)]',
						},
					},
					{
						find: '.userTagNoNickname',
						replacement: {
							match: /=(\i)\.pronouns/,
							replace: '=$self.useProfilePronouns($1.user.id)',
						},
					},
					{
						find: '.USER_PROFILE_ACTIVITY',
						replacement: {
							match: /\).showPronouns/,
							replace:
								').showPronouns||true;const vcPronounce=$self.useProfilePronouns(arguments[0].user.id);if(arguments[0].displayProfile)arguments[0].displayProfile.pronouns=vcPronounce',
						},
					},
				],
				settings: vo,
				settingsAboutComponent: zp,
				PronounsChatComponentWrapper: o1,
				CompactPronounsChatComponentWrapper: i1,
				useProfilePronouns: e1,
			});
		});
	var Wp,
		a1 = m(() => {
			'use strict';
			a();
			Oo();
			w();
			$n();
			T();
			x();
			Wp = g({
				name: 'QuickMention',
				authors: [p.kemo],
				description:
					'Adds a quick mention button to the message actions bar',
				dependencies: ['MessagePopoverAPI'],
				start() {
					yn('QuickMention', (e) => ({
						label: 'Quick Mention',
						icon: this.Icon,
						message: e,
						channel: X.getChannel(e.channel_id),
						onClick: () => Bn(`<@${e.author.id}> `),
					}));
				},
				stop() {
					vn('QuickMention');
				},
				Icon: () =>
					o(
						'svg',
						{
							className: 'icon',
							height: '24',
							width: '24',
							viewBox: '0 0 24 24',
							fill: 'currentColor',
						},
						o('path', {
							d: 'M12 2C6.486 2 2 6.486 2 12C2 17.515 6.486 22 12 22C14.039 22 15.993 21.398 17.652 20.259L16.521 18.611C15.195 19.519 13.633 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12V12.782C20 14.17 19.402 15 18.4 15L18.398 15.018C18.338 15.005 18.273 15 18.209 15H18C17.437 15 16.6 14.182 16.6 13.631V12C16.6 9.464 14.537 7.4 12 7.4C9.463 7.4 7.4 9.463 7.4 12C7.4 14.537 9.463 16.6 12 16.6C13.234 16.6 14.35 16.106 15.177 15.313C15.826 16.269 16.93 17 18 17L18.002 16.981C18.064 16.994 18.129 17 18.195 17H18.4C20.552 17 22 15.306 22 12.782V12C22 6.486 17.514 2 12 2ZM12 14.599C10.566 14.599 9.4 13.433 9.4 11.999C9.4 10.565 10.566 9.399 12 9.399C13.434 9.399 14.6 10.565 14.6 11.999C14.6 13.433 13.434 14.599 12 14.599Z',
						}),
					),
			});
		});
	function g1(e, t) {
		let n = e.findIndex((i) => i.id === t);
		return n === -1 ? n : e.length - n - 1;
	}
	function u1({ channelId: e, messageId: t, _isQuickEdit: n }) {
		if (n) return;
		let i = U.getCurrentUser().id,
			r = cn.getMessages(e)._array.filter((s) => s.author.id === i);
		ca = g1(r, t);
	}
	function p1({ message: e, _isQuickReply: t }) {
		t || (la = g1(cn.getMessages(e.channel_id)._array, e.id));
	}
	function d1(e) {
		let t = e.key === 'ArrowUp';
		(!t && e.key !== 'ArrowDown') ||
			!V2(e) ||
			eM(e) ||
			(e.shiftKey ? oM(t) : nM(t));
	}
	function h1(e, t) {
		let n = document.getElementById('message-content-' + t);
		if (!n) return;
		let i = Math.max(
				document.documentElement.clientHeight,
				window.innerHeight,
			),
			r = n.getBoundingClientRect();
		(r.bottom < 200 || r.top - i >= -200) &&
			Q2.jumpToMessage({
				channelId: e,
				messageId: t,
				flash: !1,
				jumpType: 'INSTANT',
			});
	}
	function y1(e, t) {
		let n = cn.getMessages(fe.getChannelId())._array;
		if (!t) {
			let l = U.getCurrentUser().id;
			n = n.filter((c) => c.author.id === l);
		}
		let i = (l) =>
				e ? Math.min(n.length - 1, l + 1) : Math.max(-1, l - 1),
			r = (l) => {
				do l = i(l);
				while (l !== -1 && n[n.length - l - 1]?.deleted === !0);
				return l;
			},
			s;
		return (
			t ? (la = s = r(la)) : (ca = s = r(ca)),
			s === -1 ? void 0 : n[n.length - s - 1]
		);
	}
	function tM(e) {
		let {
				enabled: t,
				userList: n,
				shouldPingListed: i,
			} = M.plugins.NoReplyMention,
			r = !t || i === n.includes(e.author.id);
		switch (f1.store.shouldMention) {
			case 2:
				return r;
			case 0:
				return !1;
			default:
				return !0;
		}
	}
	function nM(e) {
		let t = y1(e, !0);
		if (!t)
			return void L.dispatch({
				type: 'DELETE_PENDING_REPLY',
				channelId: fe.getChannelId(),
			});
		let n = X.getChannel(t.channel_id),
			i = U.getCurrentUser().id;
		L.dispatch({
			type: 'CREATE_PENDING_REPLY',
			channel: n,
			message: t,
			shouldMention: tM(t),
			showMentionToggle: n.guild_id !== null && t.author.id !== i,
			_isQuickReply: !0,
		}),
			h1(n.id, t.id);
	}
	function oM(e) {
		let t = y1(e, !1);
		t
			? (L.dispatch({
					type: 'MESSAGE_START_EDIT',
					channelId: t.channel_id,
					messageId: t.id,
					content: t.content,
					_isQuickEdit: !0,
			  }),
			  h1(t.channel_id, t.id))
			: L.dispatch({
					type: 'MESSAGE_END_EDIT',
					channelId: fe.getChannelId(),
			  });
	}
	var Q2,
		m1,
		la,
		ca,
		f1,
		qp,
		l1,
		c1,
		V2,
		eM,
		v1 = m(() => {
			'use strict';
			a();
			E();
			w();
			T();
			_();
			x();
			(Q2 = P('jumpToMessage')),
				(m1 = navigator.platform.includes('Mac')),
				(la = -1),
				(ca = -1),
				(f1 = N({
					shouldMention: {
						type: 4,
						description: 'Ping reply by default',
						options: [
							{
								label: 'Follow NoReplyMention',
								value: 2,
								default: !0,
							},
							{ label: 'Enabled', value: 1 },
							{ label: 'Disabled', value: 0 },
						],
					},
				})),
				(qp = g({
					name: 'QuickReply',
					authors: [p.obscurity, p.Ven, p.pylix],
					description:
						'Reply to (ctrl + up/down) and edit (ctrl + shift + up/down) messages via keybinds',
					settings: f1,
					start() {
						L.subscribe('DELETE_PENDING_REPLY', l1),
							L.subscribe('MESSAGE_END_EDIT', c1),
							L.subscribe('MESSAGE_START_EDIT', u1),
							L.subscribe('CREATE_PENDING_REPLY', p1),
							document.addEventListener('keydown', d1);
					},
					stop() {
						L.unsubscribe('DELETE_PENDING_REPLY', l1),
							L.unsubscribe('MESSAGE_END_EDIT', c1),
							L.unsubscribe('MESSAGE_START_EDIT', u1),
							L.unsubscribe('CREATE_PENDING_REPLY', p1),
							document.removeEventListener('keydown', d1);
					},
				})),
				(l1 = () => (la = -1)),
				(c1 = () => (ca = -1));
			(V2 = (e) => (m1 ? e.metaKey : e.ctrlKey)),
				(eM = (e) => e.altKey || (!m1 && e.metaKey));
		});
	var Yp = {};
	me(Yp, {
		ServerListRenderPosition: () => ua,
		addServerListElement: () => yr,
		removeServerListElement: () => vr,
		renderAll: () => aM,
	});
	function Kp(e) {
		return e === 0 ? rM : sM;
	}
	function yr(e, t) {
		Kp(e).add(t);
	}
	function vr(e, t) {
		Kp(e).delete(t);
	}
	var iM,
		ua,
		rM,
		sM,
		aM,
		pa = m(() => {
			'use strict';
			a();
			Se();
			(iM = new Z('ServerListAPI')),
				(ua = ((n) => (
					(n[(n.Above = 0)] = 'Above'), (n[(n.In = 1)] = 'In'), n
				))(ua || {})),
				(rM = new Set()),
				(sM = new Set());
			aM = (e) => {
				let t = [];
				for (let n of Kp(e))
					try {
						t.unshift(n());
					} catch (i) {
						iM.error('Failed to render server list element:', i);
					}
				return t;
			};
		});
	function lM() {
		let e = [];
		Object.values(le.getGuilds()).forEach((t) => {
			es.getChannels(t.id).SELECTABLE.forEach((n) => {
				!ki.hasUnread(n.channel.id) ||
					e.push({
						channelId: n.channel.id,
						messageId: ki.lastMessageId(n.channel.id),
						readStateType: 0,
					});
			});
		}),
			L.dispatch({ type: 'BULK_ACK', context: 'APP', channels: e });
	}
	var cM,
		Zp,
		S1 = m(() => {
			'use strict';
			a();
			pa();
			w();
			T();
			x();
			(cM = () =>
				o(
					R,
					{
						onClick: lM,
						size: R.Sizes.MIN,
						color: R.Colors.BRAND,
						style: {
							marginTop: '2px',
							marginBottom: '8px',
							marginLeft: '9px',
						},
					},
					'Read all',
				)),
				(Zp = g({
					name: 'ReadAllNotificationsButton',
					description:
						'Read all server notifications with a single button click!',
					authors: [p.kemo],
					dependencies: ['ServerListAPI'],
					renderReadAllButton: () => o(cM, null),
					start() {
						yr(0, this.renderReadAllButton);
					},
					stop() {
						vr(0, this.renderReadAllButton);
					},
				}));
		});
	var Et,
		da = m(() => {
			'use strict';
			a();
			E();
			T();
			Et = N({
				notices: {
					type: 3,
					description:
						"Also show a notice at the top of your screen when removed (use this if you don't want to miss any notifications).",
					default: !1,
				},
				offlineRemovals: {
					type: 3,
					description:
						'Notify you when starting discord if you were removed while offline.',
					default: !0,
				},
				friends: {
					type: 3,
					description: 'Notify when a friend removes you',
					default: !0,
				},
				friendRequestCancels: {
					type: 3,
					description: 'Notify when a friend request is cancelled',
					default: !0,
				},
				servers: {
					type: 3,
					description: 'Notify when removed from a server',
					default: !0,
				},
				groups: {
					type: 3,
					description: 'Notify when removed from a group chat',
					default: !0,
				},
			});
		});
	var Xp = m(() => {
		'use strict';
		a();
	});
	async function dM() {
		Pt.delMany([
			'relationship-notifier-guilds',
			'relationship-notifier-groups',
			'relationship-notifier-friends',
		]);
	}
	async function Jp() {
		await dM();
		let [e, t, n] = await Pt.getMany([b1(), T1(), x1()]);
		if ((await Promise.all([fa(), ga(), Sr()]), Et.store.offlineRemovals)) {
			if (Et.store.groups && t?.size)
				for (let [i, r] of t)
					gi.has(i) ||
						Jn(
							`You are no longer in the group ${r.name}.`,
							r.iconURL,
						);
			if (Et.store.servers && e?.size)
				for (let [i, r] of e)
					fi.has(i) ||
						Jn(
							`You are no longer in the server ${r.name}.`,
							r.iconURL,
						);
			if (Et.store.friends && n?.friends.length)
				for (let i of n.friends) {
					if ($o.friends.includes(i)) continue;
					let r = await Rn.fetchUser(i).catch(() => {});
					r &&
						Jn(
							`You are no longer friends with ${r.tag}.`,
							r.getAvatarURL(void 0, void 0, !1),
						);
				}
			if (Et.store.friendRequestCancels && n?.requests?.length)
				for (let i of n.requests) {
					if ($o.requests.includes(i)) continue;
					let r = await Rn.fetchUser(i).catch(() => {});
					r &&
						Jn(
							`Friend request from ${r.tag} has been revoked.`,
							r.getAvatarURL(void 0, void 0, !1),
						);
				}
		}
	}
	function Jn(e, t) {
		Et.store.notices && ma.showNotice(e, 'OK', () => ma.popNotice()),
			ge({ title: 'Relationship Notifier', body: e, icon: t });
	}
	function w1(e) {
		return fi.get(e);
	}
	function Qp(e) {
		fi.delete(e), fa();
	}
	async function fa() {
		fi.clear();
		let e = U.getCurrentUser().id;
		for (let [t, { name: n, icon: i }] of Object.entries(le.getGuilds()))
			ke.isMember(t, e) &&
				fi.set(t, {
					id: t,
					name: n,
					iconURL:
						i && `https://cdn.discordapp.com/icons/${t}/${i}.png`,
				});
		await Pt.set(b1(), fi);
	}
	function M1(e) {
		return gi.get(e);
	}
	function Vp(e) {
		gi.delete(e), ga();
	}
	async function ga() {
		gi.clear();
		for (let {
			type: e,
			id: t,
			name: n,
			rawRecipients: i,
			icon: r,
		} of X.getSortedPrivateChannels())
			e === 3 &&
				gi.set(t, {
					id: t,
					name: n || i.map((s) => s.username).join(', '),
					iconURL:
						r &&
						`https://cdn.discordapp.com/channel-icons/${t}/${r}.png`,
				});
		await Pt.set(T1(), gi);
	}
	async function Sr() {
		($o.friends = []), ($o.requests = []);
		let e = Kt.getRelationships();
		for (let t in e)
			switch (e[t]) {
				case 1:
					$o.friends.push(t);
					break;
				case 3:
					$o.requests.push(t);
					break;
			}
		await Pt.set(x1(), $o);
	}
	var fi,
		gi,
		$o,
		b1,
		T1,
		x1,
		ed = m(() => {
			'use strict';
			a();
			br();
			so();
			x();
			da();
			Xp();
			(fi = new Map()),
				(gi = new Map()),
				($o = { friends: [], requests: [] }),
				(b1 = () =>
					`relationship-notifier-guilds-${U.getCurrentUser().id}`),
				(T1 = () =>
					`relationship-notifier-groups-${U.getCurrentUser().id}`),
				(x1 = () =>
					`relationship-notifier-friends-${U.getCurrentUser().id}`);
		});
	async function C1({ relationship: { type: e, id: t } }) {
		if (td === t) {
			td = void 0;
			return;
		}
		let n = await Rn.fetchUser(t).catch(() => null);
		if (!!n)
			switch (e) {
				case 1:
					Et.store.friends &&
						Jn(
							`${n.tag} removed you as a friend.`,
							n.getAvatarURL(void 0, void 0, !1),
						);
					break;
				case 3:
					Et.store.friendRequestCancels &&
						Jn(
							`A friend request from ${n.tag} has been removed.`,
							n.getAvatarURL(void 0, void 0, !1),
						);
					break;
			}
	}
	function A1({ guild: { id: e, unavailable: t } }) {
		if (!Et.store.servers || t) return;
		if (nd === e) {
			Qp(e), (nd = void 0);
			return;
		}
		let n = w1(e);
		n &&
			(Qp(e),
			Jn(`You were removed from the server ${n.name}.`, n.iconURL));
	}
	function N1({ channel: { id: e, type: t } }) {
		if (!Et.store.groups || t !== 3) return;
		if (od === e) {
			Vp(e), (od = void 0);
			return;
		}
		let n = M1(e);
		n &&
			(Vp(e),
			Jn(`You were removed from the group ${n.name}.`, n.iconURL));
	}
	var td,
		nd,
		od,
		P1,
		I1,
		R1,
		k1 = m(() => {
			'use strict';
			a();
			x();
			da();
			Xp();
			ed();
			(P1 = (e) => (td = e)),
				(I1 = (e) => (nd = e)),
				(R1 = (e) => (od = e));
		});
	var id,
		L1 = m(() => {
			'use strict';
			a();
			w();
			T();
			k1();
			da();
			ed();
			id = g({
				name: 'RelationshipNotifier',
				description:
					'Notifies you when a friend, group chat, or server removes you.',
				authors: [p.nick],
				settings: Et,
				patches: [
					{
						find: 'removeRelationship:function(',
						replacement: {
							match: /(removeRelationship:function\((\i),\i,\i\){)/,
							replace: '$1$self.removeFriend($2);',
						},
					},
					{
						find: 'leaveGuild:function(',
						replacement: {
							match: /(leaveGuild:function\((\i)\){)/,
							replace: '$1$self.removeGuild($2);',
						},
					},
					{
						find: 'closePrivateChannel:function(',
						replacement: {
							match: /(closePrivateChannel:function\((\i)\){)/,
							replace: '$1$self.removeGroup($2);',
						},
					},
				],
				flux: {
					GUILD_CREATE: fa,
					GUILD_DELETE: A1,
					CHANNEL_CREATE: ga,
					CHANNEL_DELETE: N1,
					RELATIONSHIP_ADD: Sr,
					RELATIONSHIP_UPDATE: Sr,
					RELATIONSHIP_REMOVE(e) {
						C1(e), Sr();
					},
					CONNECTION_OPEN: Jp,
				},
				async start() {
					setTimeout(() => {
						Jp();
					}, 5e3);
				},
				removeFriend: P1,
				removeGroup: R1,
				removeGuild: I1,
			});
		});
	var mM,
		fM,
		rd,
		E1 = m(() => {
			'use strict';
			a();
			w();
			T();
			_();
			(mM = P('spoilerContent')),
				(fM = P('messagesWrapper', 'messages')),
				(rd = g({
					name: 'RevealAllSpoilers',
					description:
						'Reveal all spoilers in a message by Ctrl-clicking a spoiler, or in the chat with Ctrl+Shift-click',
					authors: [p.whqwert],
					patches: [
						{
							find: '.removeObscurity=function',
							replacement: {
								match: /(?<=\.removeObscurity=function\((\i)\){)/,
								replace: (e, t) => `$self.reveal(${t});`,
							},
						},
					],
					reveal(e) {
						let { ctrlKey: t, shiftKey: n, target: i } = e;
						if (!t) return;
						let { spoilerContent: r, hidden: s } = mM,
							{ messagesWrapper: l } = fM,
							c = n
								? document.querySelector(`div.${l}`)
								: i.parentElement;
						for (let u of c.querySelectorAll(`span.${r}.${s}`))
							u.click();
					},
				}));
		});
	function D1(e, t) {
		open(t + encodeURIComponent(e), '_blank');
	}
	var ha,
		O1,
		sd,
		_1 = m(() => {
			'use strict';
			a();
			Jt();
			xt();
			Bo();
			w();
			T();
			x();
			ha = {
				Google: 'https://lens.google.com/uploadbyurl?url=',
				Yandex: 'https://yandex.com/images/search?rpt=imageview&url=',
				SauceNAO: 'https://saucenao.com/search.php?url=',
				IQDB: 'https://iqdb.org/?url=',
				TinEye: 'https://www.tineye.com/search?url=',
				ImgOps: 'https://imgops.com/start?url=',
			};
			(O1 = (e, t) => () => {
				if (!t) return;
				let { reverseImageSearchType: n, itemHref: i, itemSrc: r } = t;
				if (!n || n !== 'img') return;
				let s = i ?? r,
					l = Lt('copy-link', e);
				l &&
					l.push(
						o(
							F.MenuItem,
							{
								label: 'Search Image',
								key: 'search-image',
								id: 'search-image',
							},
							Object.keys(ha).map((c, u) => {
								let h = 'search-image-' + c;
								return o(F.MenuItem, {
									key: h,
									id: h,
									label: o(
										ae,
										{
											style: {
												alignItems: 'center',
												gap: '0.5em',
											},
										},
										o('img', {
											style: {
												borderRadius:
													u >= 3 ? '50%' : void 0,
											},
											'aria-hidden': 'true',
											height: 16,
											width: 16,
											src: new URL('/favicon.ico', ha[c])
												.toString()
												.replace('lens.', ''),
										}),
										c,
									),
									action: () => D1(s, ha[c]),
								});
							}),
							o(F.MenuItem, {
								key: 'search-image-all',
								id: 'search-image-all',
								label: o(
									ae,
									{
										style: {
											alignItems: 'center',
											gap: '0.5em',
										},
									},
									o(_o, { height: 16, width: 16 }),
									'All',
								),
								action: () =>
									Object.values(ha).forEach((c) => D1(s, c)),
							}),
						),
					);
			}),
				(sd = g({
					name: 'ReverseImageSearch',
					description: 'Adds ImageSearch to image context menus',
					authors: [p.Ven, p.Nuckyz],
					tags: ['ImageUtilities'],
					patches: [
						{
							find: '.Messages.MESSAGE_ACTIONS_MENU_LABEL',
							replacement: {
								match: /favoriteableType:\i,(?<=(\i)\.getAttribute\("data-type"\).+?)/,
								replace: (e, t) =>
									`${e}reverseImageSearchType:${t}.getAttribute("data-role"),`,
							},
						},
					],
					start() {
						we('message', O1);
					},
					stop() {
						Ae('message', O1);
					},
				}));
		});
	var F1 = m(() => {});
	var ya = m(() => {
		'use strict';
		a();
	});
	async function B1(e) {
		await Rn.fetchUser(e),
			await L.dispatch({
				type: 'USER_PROFILE_MODAL_OPEN',
				userId: e,
				channelId: fe.getChannelId(),
				analyticsLocation: 'Explosive Hotel',
			});
	}
	function hi(e) {
		let { OAuth2AuthorizeModal: t } = an('OAuth2AuthorizeModal');
		be((n) =>
			o(t, {
				...n,
				scopes: ['identify'],
				responseType: 'code',
				redirectUri: 'https://manti.vendicated.dev/api/reviewdb/auth',
				permissions: 0n,
				clientId: '915703782174752809',
				cancelCompletesFlow: !1,
				callback: async (i) => {
					try {
						let r = new URL(i.location);
						r.searchParams.append('clientMod', 'vencord');
						let s = await fetch(r, {
								headers: new Headers({
									Accept: 'application/json',
								}),
							}),
							{ token: l, success: c } = await s.json();
						c
							? ((_e.store.token = l),
							  Dt('Successfully logged in!'),
							  e?.())
							: s.status === 1 &&
							  Dt('An Error occurred while logging in.');
					} catch (r) {
						new Z('ReviewDB').error('Failed to authorize', r);
					}
				},
			}),
		);
	}
	function Dt(e) {
		Q.show({
			type: Q.Type.MESSAGE,
			message: e,
			id: Q.genId(),
			options: { position: Q.Position.BOTTOM },
		});
	}
	function $1(e, t) {
		return e.sender.discordID === t || _e.store.user?.type === 1;
	}
	var en,
		So = m(() => {
			'use strict';
			a();
			je();
			Se();
			ze();
			_();
			x();
			ya();
			Uo();
			en = Ue('vc-rdb-');
		});
	var _e,
		Uo = m(() => {
			'use strict';
			a();
			E();
			T();
			x();
			So();
			_e = N({
				authorize: {
					type: 6,
					description: 'Authorize with ReviewDB',
					component: () =>
						o(R, { onClick: hi }, 'Authorize with ReviewDB'),
				},
				notifyReviews: {
					type: 3,
					description: 'Notify about new reviews on startup',
					default: !0,
				},
				showWarning: {
					type: 3,
					description:
						'Display warning to be respectful at the top of the reviews list',
					default: !0,
				},
				hideTimestamps: {
					type: 3,
					description: 'Hide timestamps on reviews',
					default: !1,
				},
				website: {
					type: 6,
					description: 'ReviewDB website',
					component: () =>
						o(
							R,
							{
								onClick: () => {
									let e = 'https://reviewdb.mantikafasi.dev/';
									_e.store.token &&
										(e +=
											'/api/redirect?token=' +
											encodeURIComponent(_e.store.token)),
										VencordNative.native.openExternal(e);
								},
							},
							'ReviewDB website',
						),
				},
				supportServer: {
					type: 6,
					description: 'ReviewDB Support Server',
					component: () =>
						o(
							R,
							{
								onClick: () => {
									VencordNative.native.openExternal(
										'https://discord.gg/eWPBSbvznt',
									);
								},
							},
							'ReviewDB Support Server',
						),
				},
			}).withPrivateSettings();
		});
	async function U1(e, t = 0) {
		let n = 0;
		_e.store.showWarning || (n |= hM);
		let i = new URLSearchParams({ flags: String(n), offset: String(t) }),
			r = await fetch(`${Tr}/api/reviewdb/users/${e}/reviews?${i}`),
			s =
				r.status === 200
					? await r.json()
					: {
							success: !1,
							message:
								'An Error occured while fetching reviews. Please try again later.',
							reviews: [],
							updated: !1,
							hasNextPage: !1,
							reviewCount: 0,
					  };
		return s.success
			? s
			: (Dt(s.message),
			  {
					...s,
					reviews: [
						{
							id: 0,
							comment:
								'An Error occured while fetching reviews. Please try again later.',
							star: 0,
							timestamp: 0,
							sender: {
								id: 0,
								username: 'Error',
								profilePhoto:
									'https://cdn.discordapp.com/attachments/1045394533384462377/1084900598035513447/646808599204593683.png?size=128',
								discordID: '0',
								badges: [],
							},
						},
					],
			  });
	}
	async function G1(e) {
		return (
			(e.token = _e.store.token),
			e.token
				? fetch(Tr + `/api/reviewdb/users/${e.userid}/reviews`, {
						method: 'PUT',
						body: JSON.stringify(e),
						headers: { 'Content-Type': 'application/json' },
				  })
						.then((t) => t.json())
						.then((t) => (Dt(t.message), t ?? null))
				: (Dt('Please authorize to add a review.'), hi(), null)
		);
	}
	function H1(e) {
		return fetch(Tr + `/api/reviewdb/users/${e}/reviews`, {
			method: 'DELETE',
			headers: new Headers({
				'Content-Type': 'application/json',
				Accept: 'application/json',
			}),
			body: JSON.stringify({ token: _e.store.token, reviewid: e }),
		}).then((t) => t.json());
	}
	async function z1(e) {
		let t = await fetch(Tr + '/api/reviewdb/reports', {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json',
				Accept: 'application/json',
			}),
			body: JSON.stringify({ reviewid: e, token: _e.store.token }),
		}).then((n) => n.json());
		Dt(t.message);
	}
	function j1(e) {
		return fetch(Tr + '/api/reviewdb/users', {
			body: JSON.stringify({ token: e }),
			method: 'POST',
		}).then((t) => t.json());
	}
	var Tr,
		va,
		hM,
		xr = m(() => {
			'use strict';
			a();
			Uo();
			So();
			(Tr = 'https://manti.vendicated.dev'), (va = 50), (hM = 2);
		});
	function W1({ onClick: e }) {
		return o(W, { text: 'Delete Review' }, (t) =>
			o(
				'div',
				{ ...t, className: J(ad.button, ad.dangerous), onClick: e },
				o(
					'svg',
					{ width: '16', height: '16', viewBox: '0 0 20 20' },
					o('path', {
						fill: 'currentColor',
						d: 'M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z',
					}),
					o('path', {
						fill: 'currentColor',
						d: 'M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z',
					}),
				),
			),
		);
	}
	function q1({ onClick: e }) {
		return o(W, { text: 'Report Review' }, (t) =>
			o(
				'div',
				{ ...t, className: ad.button, onClick: e },
				o(
					'svg',
					{ width: '16', height: '16', viewBox: '0 0 20 20' },
					o('path', {
						fill: 'currentColor',
						d: 'M20,6.002H14V3.002C14,2.45 13.553,2.002 13,2.002H4C3.447,2.002 3,2.45 3,3.002V22.002H5V14.002H10.586L8.293,16.295C8.007,16.581 7.922,17.011 8.076,17.385C8.23,17.759 8.596,18.002 9,18.002H20C20.553,18.002 21,17.554 21,17.002V7.002C21,6.45 20.553,6.002 20,6.002Z',
					}),
				),
			),
		);
	}
	var ad,
		K1 = m(() => {
			'use strict';
			a();
			de();
			_();
			x();
			ad = P('button', 'wrapper', 'disabled', 'separator');
		});
	function ld(e) {
		return o(W, { text: e.name }, ({ onMouseEnter: t, onMouseLeave: n }) =>
			o('img', {
				className: en('badge'),
				width: '24px',
				height: '24px',
				onMouseEnter: t,
				onMouseLeave: n,
				src: e.icon,
				alt: e.description,
				onClick: () => ll.openUntrustedLink({ href: e.redirectURL }),
			}),
		);
	}
	var Y1 = m(() => {
		'use strict';
		a();
		x();
		So();
	});
	var Sa,
		cd = m(() => {
			'use strict';
			a();
			de();
			ye();
			_();
			x();
			ya();
			xr();
			Uo();
			So();
			K1();
			Y1();
			Sa = oe(() => {
				let e = Y.byProps,
					[
						{
							cozyMessage: t,
							buttons: n,
							message: i,
							groupStart: r,
						},
						{ container: s, isHeader: l },
						{
							avatar: c,
							clickable: u,
							username: h,
							messageContent: f,
							wrapper: v,
							cozy: S,
						},
						b,
						A,
					] = Ri(
						e('cozyMessage'),
						e('container', 'isHeader'),
						e('avatar', 'zalgo'),
						e('button', 'wrapper', 'selected'),
						e('botTag'),
					),
					C = new Intl.DateTimeFormat();
				return function ({ review: B, refetch: O }) {
					function K() {
						B1(B.sender.discordID);
					}
					function ee() {
						vt.show({
							title: 'Are you sure?',
							body: 'Do you really want to delete this review?',
							confirmText: 'Delete',
							cancelText: 'Nevermind',
							onConfirm: () => {
								H1(B.id).then((z) => {
									z.success && O(), Dt(z.message);
								});
							},
						});
					}
					function j() {
						vt.show({
							title: 'Are you sure?',
							body: 'Do you really you want to report this review?',
							confirmText: 'Report',
							cancelText: 'Nevermind',
							onConfirm: () => z1(B.id),
						});
					}
					return o(
						'div',
						{
							className: J(t, v, i, r, S, en('review')),
							style: {
								marginLeft: '0px',
								paddingLeft: '52px',
								paddingRight: '16px',
							},
						},
						o('img', {
							className: J(c, u),
							onClick: K,
							src:
								B.sender.profilePhoto ||
								'/assets/1f0bfc0865d324c2587920a7d80c609b.png?size=128',
							style: { left: '0px' },
						}),
						o(
							'div',
							{
								style: {
									display: 'inline-flex',
									justifyContent: 'center',
									alignItems: 'center',
								},
							},
							o(
								'span',
								{
									className: J(u, h),
									style: {
										color: 'var(--channels-default)',
										fontSize: '14px',
									},
									onClick: () => K(),
								},
								B.sender.username,
							),
							B.type === 3 &&
								o(
									'span',
									{
										className: J(
											A.botTagVerified,
											A.botTagRegular,
											A.botTag,
											A.px,
											A.rem,
										),
										style: { marginLeft: '4px' },
									},
									o(
										'span',
										{ className: A.botText },
										'System',
									),
								),
						),
						B.sender.badges.map((z) => o(ld, { ...z })),
						!_e.store.hideTimestamps &&
							B.type !== 3 &&
							o(
								In,
								{ timestamp: Zt(B.timestamp * 1e3) },
								C.format(B.timestamp * 1e3),
							),
						o(
							'p',
							{
								className: J(f),
								style: {
									fontSize: 15,
									marginTop: 4,
									color: 'var(--text-normal)',
								},
							},
							B.comment,
						),
						B.id !== 0 &&
							o(
								'div',
								{
									className: J(s, l, n),
									style: { padding: '0px' },
								},
								o(
									'div',
									{ className: b.wrapper },
									o(q1, { onClick: j }),
									$1(B, U.getCurrentUser().id) &&
										o(W1, { onClick: ee }),
								),
							),
					);
				};
			});
		});
	function wr({
		discordId: e,
		name: t,
		onFetchReviews: n,
		refetchSignal: i,
		scrollToTop: r,
		page: s = 1,
		showInput: l = !1,
		hideOwnReview: c = !1,
	}) {
		let [u, h] = Bt(!0),
			[f] = ut(() => U1(e, (s - 1) * va), {
				fallbackValue: null,
				deps: [i, u, s],
				onSuccess: (v) => {
					r?.(), n(v);
				},
			});
		return f
			? o(
					d,
					null,
					o(vM, { refetch: h, reviews: f.reviews, hideOwnReview: c }),
					l &&
						o(ud, {
							name: t,
							discordId: e,
							refetch: h,
							isAuthor: f.reviews?.some(
								(v) =>
									v.sender.discordID ===
									U.getCurrentUser().id,
							),
						}),
			  )
			: null;
	}
	function vM({ refetch: e, reviews: t, hideOwnReview: n }) {
		let i = U.getCurrentUser().id;
		return o(
			'div',
			{ className: en('view') },
			t?.map(
				(r) =>
					(r.sender.discordID !== i || !n) &&
					o(Sa, { key: r.id, review: r, refetch: e }),
			),
			t?.length === 0 &&
				o(
					y.FormText,
					{ className: en('placeholder') },
					'Looks like nobody reviewed this user yet. You could be the first!',
				),
		);
	}
	function ud({ discordId: e, isAuthor: t, refetch: n, name: i }) {
		let { token: r } = _e.store;
		function s({ key: l, target: c }) {
			l === 'Enter' &&
				G1({ userid: e, comment: c.value, star: -1 }).then((u) => {
					u?.success
						? ((c.value = ''), n())
						: u?.message && Dt(u.message);
				});
		}
		return o('textarea', {
			className: J(yM.inputDefault, 'enter-comment', en('input')),
			onKeyDownCapture: (l) => {
				l.key === 'Enter' && l.preventDefault();
			},
			placeholder: r
				? t
					? `Update review for @${i}`
					: `Review @${i}`
				: 'You need to authorize to review users!',
			onKeyDown: s,
			onClick: () => {
				r || (Dt('Opening authorization window...'), hi());
			},
		});
	}
	var yM,
		pd = m(() => {
			'use strict';
			a();
			de();
			ye();
			_();
			x();
			xr();
			Uo();
			So();
			cd();
			yM = P('inputDefault', 'editable');
		});
	function SM({ modalProps: e, discordId: t, name: n }) {
		let [i, r] = V(),
			[s, l] = Bt(!0),
			[c, u] = V(1),
			h = qt(null),
			f = i?.reviewCount,
			v = i?.reviews.find(
				(S) => S.sender.discordID === _e.store.user?.discordID,
			);
		return o(
			k,
			null,
			o(
				Ie,
				{ ...e, size: 'medium' },
				o(
					$e,
					null,
					o(
						q,
						{
							variant: 'heading-lg/semibold',
							className: en('modal-header'),
						},
						n,
						"'s Reviews",
						!!f && o('span', null, ' (', f, ' Reviews)'),
					),
					o(St, { onClick: e.onClose }),
				),
				o(
					Le,
					{ scrollerRef: h },
					o(
						'div',
						{ className: en('modal-reviews') },
						o(wr, {
							discordId: t,
							name: n,
							page: c,
							refetchSignal: s,
							onFetchReviews: r,
							scrollToTop: () =>
								h.current?.scrollTo({
									top: 0,
									behavior: 'smooth',
								}),
							hideOwnReview: !0,
						}),
					),
				),
				o(
					ot,
					{ className: en('modal-footer') },
					o(
						'div',
						null,
						v && o(Sa, { refetch: l, review: v }),
						o(ud, {
							isAuthor: v != null,
							discordId: t,
							name: n,
							refetch: l,
						}),
						!!f &&
							o(Vr, {
								currentPage: c,
								maxVisiblePages: 5,
								pageSize: va,
								totalCount: f,
								onPageChange: u,
							}),
					),
				),
			),
		);
	}
	function dd(e, t) {
		be((n) => o(SM, { modalProps: n, discordId: e, name: t }));
	}
	var Z1 = m(() => {
		'use strict';
		a();
		re();
		ze();
		ye();
		x();
		xr();
		Uo();
		So();
		cd();
		pd();
	});
	var X1,
		md,
		J1 = m(() => {
			'use strict';
			a();
			F1();
			Jt();
			re();
			Sp();
			Bo();
			w();
			T();
			x();
			Z1();
			pd();
			ya();
			xr();
			Uo();
			So();
			(X1 = (e, t) => () => {
				e.push(
					o(F.MenuItem, {
						label: 'View Reviews',
						id: 'vc-rdb-server-reviews',
						icon: _o,
						action: () => dd(t.guild.id, t.guild.name),
					}),
				);
			}),
				(md = g({
					name: 'ReviewDB',
					description:
						'Review other users (Adds a new settings to profiles)',
					authors: [p.mantikafasi, p.Ven],
					settings: _e,
					patches: [
						{
							find: 'disableBorderColor:!0',
							replacement: {
								match: /\(.{0,10}\{user:(.),setNote:.,canDM:.,.+?\}\)/,
								replace: '$&,$self.getReviewsComponent($1)',
							},
						},
					],
					async start() {
						let e = _e.store,
							{ token: t, lastReviewId: n, notifyReviews: i } = e;
						!i ||
							!t ||
							setTimeout(async () => {
								let r = await j1(t);
								if (
									(n &&
										n < r.lastReviewID &&
										((e.lastReviewId = r.lastReviewID),
										r.lastReviewID !== 0 &&
											Dt(
												'You have new reviews on your profile!',
											)),
									we('guild-header-popout', X1),
									r.banInfo)
								) {
									let s = new Date(r.banInfo.banEndDate);
									s.getTime() > Date.now() &&
										(e.user?.banInfo?.banEndDate ?? 0) <
											s.getTime() &&
										vt.show({
											title: 'You have been banned from ReviewDB',
											body: o(
												d,
												null,
												o(
													'p',
													null,
													'You are banned from ReviewDB ',
													r.type === -1
														? 'permanently'
														: 'until ' +
																s.toLocaleString(),
												),
												r.banInfo.reviewContent &&
													o(
														'p',
														null,
														'Offending Review: ',
														r.banInfo.reviewContent,
													),
												o(
													'p',
													null,
													'Continued offenses will result in a permanent ban.',
												),
											),
											cancelText: 'Appeal',
											confirmText: 'Ok',
											onCancel: () =>
												VencordNative.native.openExternal(
													'https://reviewdb.mantikafasi.dev/api/redirect?' +
														new URLSearchParams({
															token: _e.store
																.token,
															page: 'dashboard/appeal',
														}),
												),
										});
								}
								e.user = r;
							}, 4e3);
					},
					stop() {
						Ae('guild-header-popout', X1);
					},
					getReviewsComponent: k.wrap(
						(e) => {
							let [t, n] = V();
							return o(
								fr,
								{
									headerText: 'User Reviews',
									onMoreClick: () => dd(e.id, e.username),
									moreTooltipText:
										t && t > 50
											? `View all ${t} reviews`
											: 'Open Review Modal',
									onDropDownClick: (i) =>
										(_e.store.reviewsDropdownState = !i),
									defaultState: _e.store.reviewsDropdownState,
								},
								o(wr, {
									discordId: e.id,
									name: e.username,
									onFetchReviews: (i) => n(i.reviewCount),
									showInput: !0,
								}),
							);
						},
						{ message: 'Failed to render Reviews' },
					),
				}));
		});
	var Mr,
		fd,
		Q1 = m(() => {
			'use strict';
			a();
			E();
			w();
			T();
			x();
			(Mr = N({
				chatMentions: {
					type: 3,
					default: !0,
					description:
						'Show role colors in chat mentions (including in the message box)',
					restartNeeded: !0,
				},
				memberList: {
					type: 3,
					default: !0,
					description: 'Show role colors in member list role headers',
					restartNeeded: !0,
				},
				voiceUsers: {
					type: 3,
					default: !0,
					description: 'Show role colors in the voice chat user list',
					restartNeeded: !0,
				},
			})),
				(fd = g({
					name: 'RoleColorEverywhere',
					authors: [p.KingFish, p.lewisakura],
					description: 'Adds the top role color anywhere possible',
					patches: [
						{
							find: 'className:"mention"',
							replacement: [
								{
									match: /user:(\i),channel:(\i).{0,300}?"@"\.concat\(.+?\)/,
									replace:
										'$&,color:$self.getUserColor($1?.id,{channelId:$2?.id})',
								},
							],
							predicate: () => Mr.store.chatMentions,
						},
						{
							find: '.source,children',
							replacement: [
								{
									match: /function \i\((\i)\).{5,20}id.{5,20}guildId.{5,10}channelId.{100,150}hidePersonalInformation.{5,50}jsx.{5,20},{/,
									replace:
										'$&color:$self.getUserColor($1.id,{guildId:$1?.guildId}),',
								},
							],
							predicate: () => Mr.store.chatMentions,
						},
						{
							find: '.memberGroupsPlaceholder',
							replacement: [
								{
									match: /(memo\(\(function\((\i)\).{300,500}CHANNEL_MEMBERS_A11Y_LABEL.{100,200}roleIcon.{5,20}null,).," \u2014 ",.\]/,
									replace: '$1$self.roleGroupColor($2)]',
								},
							],
							predicate: () => Mr.store.memberList,
						},
						{
							find: 'renderPrioritySpeaker',
							replacement: [
								{
									match: /renderName=function\(\).{50,75}speaking.{50,100}jsx.{5,10}{/,
									replace:
										'$&...$self.getVoiceProps(this.props),',
								},
							],
							predicate: () => Mr.store.voiceUsers,
						},
					],
					settings: Mr,
					getColor(e, { channelId: t, guildId: n }) {
						return (n ??= X.getChannel(t)?.guild_id)
							? ke.getMember(n, e)?.colorString ?? null
							: null;
					},
					getUserColor(e, t) {
						let n = this.getColor(e, t);
						return n && parseInt(n.slice(1), 16);
					},
					roleGroupColor({ id: e, count: t, title: n, guildId: i }) {
						let s = le.getGuild(i)?.roles[e];
						return o(
							'span',
							{
								style: {
									color: s?.colorString,
									fontWeight: 'unset',
									letterSpacing: '.05em',
								},
							},
							n,
							' \u2014 ',
							t,
						);
					},
					getVoiceProps({ user: { id: e }, guildId: t }) {
						return {
							style: { color: this.getColor(e, { guildId: t }) },
						};
					},
				}));
		});
	var V1,
		eS,
		tS,
		gd,
		nS = m(() => {
			'use strict';
			a();
			Jt();
			w();
			ye();
			T();
			_();
			x();
			(V1 = oe(() =>
				He(
					'M10 8.26667V4L3 11.4667L10 18.9333V14.56C15 14.56 18.5 16.2667 21 20C20 14.6667 17 9.33333 10 8.26667Z',
				),
			)),
				(eS = ce('showMentionToggle', 'TEXTAREA_FOCUS', 'shiftKey')),
				(tS =
					(e, { message: t }) =>
					() => {
						if (fe.getChannelId() !== t.channel_id) return;
						let n = X.getChannel(t?.channel_id);
						if (!n) return;
						let i = Lt('pin', e);
						if (i && !i.some((s) => s?.props?.id === 'reply')) {
							let s = i.findIndex((l) => l?.props.id === 'pin');
							return i.splice(
								s + 1,
								0,
								o(F.MenuItem, {
									id: 'reply',
									label: nt.Messages.MESSAGE_ACTION_REPLY,
									icon: V1,
									action: (l) => eS(n, t, l),
								}),
							);
						}
						let r = Lt('mark-unread', e);
						if (r && !r.some((s) => s?.props?.id === 'reply'))
							return r.unshift(
								o(F.MenuItem, {
									id: 'reply',
									label: nt.Messages.MESSAGE_ACTION_REPLY,
									icon: V1,
									action: (s) => eS(n, t, s),
								}),
							);
					}),
				(gd = g({
					name: 'SearchReply',
					description: 'Adds a reply button to search results',
					authors: [p.Aria],
					start() {
						we('message', tS);
					},
					stop() {
						Ae('message', tS);
					},
				}));
		});
	var oS = m(() => {});
	function iS(e) {
		let t = e.slice(1, -1).replace(/(\d)(AM|PM)$/i, '$1 $2'),
			n = new Date(`${new Date().toDateString()} ${t}`).getTime() / 1e3;
		return isNaN(n)
			? e
			: (Date.now() / 1e3 > n && (n += 86400), `<t:${Math.round(n)}:t>`);
	}
	function TM({ rootProps: e, close: t }) {
		let [n, i] = V(),
			[r, s] = V(''),
			l = Math.round((new Date(n).getTime() || Date.now()) / 1e3),
			c = (f, v) => `<t:${f}${v && `:${v}`}>`,
			[u, h] = Ut(() => {
				let f = c(l, r);
				return [f, Pe.parse(f)];
			}, [l, r]);
		return o(
			Ie,
			{ ...e },
			o(
				$e,
				{ className: Pr('modal-header') },
				o(y.FormTitle, { tag: 'h2' }, 'Timestamp Picker'),
				o(St, { onClick: t }),
			),
			o(
				Le,
				{ className: Pr('modal-content') },
				o('input', {
					type: 'datetime-local',
					value: n,
					onChange: (f) => i(f.currentTarget.value),
					style: { colorScheme: Di() === 2 ? 'light' : 'dark' },
				}),
				o(y.FormTitle, null, 'Timestamp Format'),
				o($t, {
					options: bM.map((f) => ({ label: f, value: f })),
					isSelected: (f) => f === r,
					select: (f) => s(f),
					serialize: (f) => f,
					renderOptionLabel: (f) =>
						o(
							'div',
							{ className: Pr('format-label') },
							Pe.parse(c(l, f.value)),
						),
					renderOptionValue: () => h,
				}),
				o(y.FormTitle, { className: G.bottom8 }, 'Preview'),
				o(
					y.FormText,
					{ className: Pr('preview-text') },
					h,
					' (',
					u,
					')',
				),
			),
			o(
				ot,
				null,
				o(
					R,
					{
						onClick: () => {
							Bn(u + ' '), t();
						},
					},
					'Insert',
				),
			),
		);
	}
	var bM,
		Pr,
		hd,
		rS = m(() => {
			'use strict';
			a();
			oS();
			gn();
			je();
			w();
			$n();
			Xe();
			ze();
			T();
			x();
			(bM = ['', 't', 'T', 'd', 'D', 'f', 'F', 'R']), (Pr = Ue('vc-st-'));
			hd = g({
				name: 'SendTimestamps',
				description:
					'Send timestamps easily via chat box button & text shortcuts. Read the extended description!',
				authors: [p.Ven, p.Tyler],
				dependencies: ['MessageEventsAPI'],
				patches: [
					{
						find: '.activeCommandOption',
						replacement: {
							match: /(.)\.push.{1,30}disabled:(\i),.{1,20}\},"gift"\)\)/,
							replace:
								'$&;try{$2||$1.push($self.chatBarIcon())}catch{}',
						},
					},
				],
				start() {
					this.listener = rt((e, t) => {
						t.content = t.content.replace(
							/`\d{1,2}:\d{2} ?(?:AM|PM)?`/gi,
							iS,
						);
					});
				},
				stop() {
					st(this.listener);
				},
				chatBarIcon() {
					return o(
						W,
						{ text: 'Insert Timestamp' },
						({ onMouseEnter: e, onMouseLeave: t }) =>
							o(
								'div',
								{ style: { display: 'flex' } },
								o(
									R,
									{
										'aria-haspopup': 'dialog',
										'aria-label': '',
										size: '',
										look: Wt.BLANK,
										onMouseEnter: e,
										onMouseLeave: t,
										innerClassName: pt.button,
										onClick: () => {
											let n = be((i) =>
												o(TM, {
													rootProps: i,
													close: () => Gn(n),
												}),
											);
										},
										className: Pr('button'),
									},
									o(
										'div',
										{ className: pt.buttonWrapper },
										o(
											'svg',
											{
												'aria-hidden': 'true',
												role: 'img',
												width: '24',
												height: '24',
												viewBox: '0 0 24 24',
											},
											o(
												'g',
												{
													fill: 'none',
													'fill-rule': 'evenodd',
												},
												o('path', {
													fill: 'currentColor',
													d: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z',
												}),
												o('rect', {
													width: '24',
													height: '24',
												}),
											),
										),
									),
								),
							),
					);
				},
				settingsAboutComponent() {
					let e = [
						'12:00',
						'3:51',
						'17:59',
						'24:00',
						'12:00 AM',
						'0:13PM',
					].map((t) => `\`${t}\``);
					return o(
						d,
						null,
						o(
							y.FormText,
							null,
							'To quickly send send time only timestamps, include timestamps formatted as `HH:MM` (including the backticks!) in your message',
						),
						o(
							y.FormText,
							null,
							'See below for examples. If you need anything more specific, use the Date button in the chat bar!',
						),
						o(
							y.FormText,
							null,
							'Examples:',
							o(
								'ul',
								null,
								e.map((t) =>
									o(
										'li',
										{ key: t },
										o('code', null, t),
										' ',
										'->',
										' ',
										Pe.parse(iS(t)),
									),
								),
							),
						),
					);
				},
			});
		});
	function xM() {
		return (
			(lS = Bt()),
			o(
				'span',
				{
					id: 'vc-friendcount',
					style: {
						display: 'inline-block',
						width: '100%',
						fontSize: '12px',
						fontWeight: '600',
						color: 'var(--header-secondary)',
						textTransform: 'uppercase',
						textAlign: 'center',
					},
				},
				vd,
				' online',
			)
		);
	}
	function wM() {
		return (
			(cS = Bt()),
			o(
				'span',
				{
					id: 'vc-guildcount',
					style: {
						display: 'inline-block',
						width: '100%',
						fontSize: '12px',
						fontWeight: '600',
						color: 'var(--header-secondary)',
						textTransform: 'uppercase',
						textAlign: 'center',
					},
				},
				aS,
				' servers',
			)
		);
	}
	function sS() {
		vd = 0;
		let e = Kt.getRelationships();
		for (let t of Object.keys(e))
			e[t] === 1 && oo.getStatus(t) !== 'offline' && (vd += 1);
		lS?.();
	}
	function yd() {
		(aS = le.getGuildCount()), cS?.();
	}
	var vd,
		aS,
		lS,
		cS,
		Sd,
		uS = m(() => {
			'use strict';
			a();
			pa();
			E();
			re();
			w();
			ye();
			T();
			x();
			(vd = 0), (aS = 0);
			Sd = g({
				name: 'ServerListIndicators',
				description:
					'Add online friend count or server count in the server list',
				authors: [p.dzshn],
				dependencies: ['ServerListAPI'],
				options: {
					mode: {
						description: 'mode',
						type: 4,
						options: [
							{
								label: 'Only online friend count',
								value: 2,
								default: !0,
							},
							{ label: 'Only server count', value: 1 },
							{
								label: 'Both server and online friend counts',
								value: 3,
							},
						],
					},
				},
				renderIndicator: () => {
					let { mode: e } = M.plugins.ServerListIndicators;
					return o(
						k,
						{ noop: !0 },
						o(
							'div',
							{ style: { marginBottom: '4px' } },
							!!(e & 2) && o(xM, null),
							!!(e & 1) && o(wM, null),
						),
					);
				},
				flux: {
					PRESENCE_UPDATES: sS,
					GUILD_CREATE: yd,
					GUILD_DELETE: yd,
				},
				start() {
					yr(0, this.renderIndicator), sS(), yd();
				},
				stop() {
					vr(0, this.renderIndicator);
				},
			});
		});
	var pS = m(() => {});
	function dS() {
		Qi(
			'Uh Oh! Failed to render this Page. However, there is an update available that might fix it. Would you like to update and restart now?',
		);
	}
	var mS = m(() => {
		'use strict';
		a();
		ii();
	});
	function En({ title: e, children: t }) {
		return o(
			y.FormSection,
			null,
			o(
				q,
				{
					variant: 'heading-lg/semibold',
					tag: 'h2',
					className: G.bottom16,
				},
				e,
			),
			t,
		);
	}
	function Dn(e, t) {
		return k.wrap(e, {
			message: `Failed to render the ${t} tab. If this issue persists, try using the installer to reinstall!`,
			onError: MM,
		});
	}
	var MM,
		Go = m(() => {
			'use strict';
			a();
			pS();
			re();
			mS();
			Xe();
			gl();
			x();
			MM = fl(dS);
		});
	var hS = {};
	me(hS, { default: () => AM });
	function IM() {
		let [e, , t] = ut(VencordNative.settings.getSettingsDir, {
				fallbackValue: 'Loading...',
			}),
			n = it(),
			i = I.useMemo(() => (Math.random() > 0.5 ? gS : PM), []),
			r = navigator.platform.toLowerCase().startsWith('win'),
			s = navigator.platform.toLowerCase().startsWith('mac'),
			l = [
				{
					key: 'useQuickCss',
					title: 'Enable Custom CSS',
					note: 'Loads your Custom CSS',
				},
				!1,
				!1,
				!1,
				!1,
				!1,
				!1,
			];
		return o(
			En,
			{ title: 'Vencord Settings' },
			o(CM, { image: i }),
			o(
				y.FormSection,
				{ title: 'Quick Actions' },
				o(
					At,
					{ className: fS('quick-actions-card') },
					o(
						I.Fragment,
						null,
						!1,
						o(
							R,
							{
								onClick: () =>
									VencordNative.quickCss.openEditor(),
								size: R.Sizes.SMALL,
								disabled: e === 'Loading...',
							},
							'Open QuickCSS File',
						),
						!1,
						o(
							R,
							{
								onClick: () =>
									VencordNative.native.openExternal(
										'https://github.com/Vendicated/Vencord',
									),
								size: R.Sizes.SMALL,
								disabled: t,
							},
							'Open in GitHub',
						),
					),
				),
			),
			o(y.FormDivider, null),
			o(
				y.FormSection,
				{ className: G.top16, title: 'Settings', tag: 'h5' },
				o(
					y.FormText,
					{ className: G.bottom20 },
					'Hint: You can change the position of this settings section in the settings of the "Settings" plugin!',
				),
				l.map(
					(c) =>
						c &&
						o(
							Nt,
							{
								key: c.key,
								value: n[c.key],
								onChange: (u) => (n[c.key] = u),
								note: c.note,
							},
							c.title,
						),
				),
			),
			typeof Notification < 'u' && o(RM, { settings: n.notifications }),
		);
	}
	function RM({ settings: e }) {
		return o(
			d,
			null,
			o(y.FormTitle, { tag: 'h5' }, 'Notification Style'),
			e.useNative !== 'never' &&
				Notification?.permission === 'denied' &&
				o(
					Hn,
					{ style: { padding: '1em' }, className: G.bottom8 },
					o(
						y.FormTitle,
						{ tag: 'h5' },
						'Desktop Notification Permission denied',
					),
					o(
						y.FormText,
						null,
						'You have denied Notification Permissions. Thus, Desktop notifications will not work!',
					),
				),
			o(
				y.FormText,
				{ className: G.bottom8 },
				'Some plugins may show you notifications. These come in two styles:',
				o(
					'ul',
					null,
					o(
						'li',
						null,
						o('strong', null, 'Vencord Notifications'),
						': These are in-app notifications',
					),
					o(
						'li',
						null,
						o('strong', null, 'Desktop Notifications'),
						': Native Desktop notifications (like when you get a ping)',
					),
				),
			),
			o($t, {
				placeholder: 'Notification Style',
				options: [
					{
						label: 'Only use Desktop notifications when Discord is not focused',
						value: 'not-focused',
						default: !0,
					},
					{
						label: 'Always use Desktop notifications',
						value: 'always',
					},
					{
						label: 'Always use Vencord notifications',
						value: 'never',
					},
				],
				closeOnSelect: !0,
				select: (t) => (e.useNative = t),
				isSelected: (t) => t === e.useNative,
				serialize: Xr,
			}),
			o(
				y.FormTitle,
				{ tag: 'h5', className: G.top16 + ' ' + G.bottom8 },
				'Notification Position',
			),
			o($t, {
				isDisabled: e.useNative === 'always',
				placeholder: 'Notification Position',
				options: [
					{
						label: 'Bottom Right',
						value: 'bottom-right',
						default: !0,
					},
					{ label: 'Top Right', value: 'top-right' },
				],
				select: (t) => (e.position = t),
				isSelected: (t) => t === e.position,
				serialize: Xr,
			}),
			o(
				y.FormTitle,
				{ tag: 'h5', className: G.top16 + ' ' + G.bottom8 },
				'Notification Timeout',
			),
			o(
				y.FormText,
				{ className: G.bottom16 },
				'Set to 0s to never automatically time out',
			),
			o(Io, {
				disabled: e.useNative === 'always',
				markers: [0, 1e3, 2500, 5e3, 1e4, 2e4],
				minValue: 0,
				maxValue: 2e4,
				initialValue: e.timeout,
				onValueChange: (t) => (e.timeout = t),
				onValueRender: (t) => (t / 1e3).toFixed(2) + 's',
				onMarkerRender: (t) => t / 1e3 + 's',
				stickToMarkers: !1,
			}),
			o(
				y.FormTitle,
				{ tag: 'h5', className: G.top16 + ' ' + G.bottom8 },
				'Notification Log Limit',
			),
			o(
				y.FormText,
				{ className: G.bottom16 },
				'The amount of notifications to save in the log until old ones are removed. Set to ',
				o('code', null, '0'),
				' to disable Notification log and ',
				o('code', null, '\u221E'),
				' to never automatically remove old Notifications',
			),
			o(Io, {
				markers: [0, 25, 50, 75, 100, 200],
				minValue: 0,
				maxValue: 200,
				stickToMarkers: !0,
				initialValue: e.logLimit,
				onValueChange: (t) => (e.logLimit = t),
				onValueRender: (t) => (t === 200 ? '\u221E' : t),
				onMarkerRender: (t) => (t === 200 ? '\u221E' : t),
			}),
			o(
				R,
				{ onClick: us, disabled: e.logLimit === 0 },
				'Open Notification Log',
			),
		);
	}
	function CM({ image: e }) {
		return o(
			At,
			{ className: fS('card', 'donate') },
			o(
				'div',
				null,
				o(y.FormTitle, { tag: 'h5' }, 'Support the Project'),
				o(
					y.FormText,
					null,
					'Please consider supporting the development of Vencord by donating!',
				),
				o(Ki, { style: { transform: 'translateX(-1em)' } }),
			),
			o('img', {
				role: 'presentation',
				src: e,
				alt: '',
				height: 128,
				style: {
					marginLeft: 'auto',
					transform: e === gS ? 'rotate(10deg)' : '',
				},
			}),
		);
	}
	var fS,
		gS,
		PM,
		AM,
		yS = m(() => {
			'use strict';
			a();
			ps();
			E();
			je();
			ql();
			Ui();
			Xe();
			de();
			Ji();
			ye();
			x();
			Go();
			(fS = Ue('vc-settings-')),
				(gS =
					'https://cdn.discordapp.com/emojis/1026533090627174460.png'),
				(PM =
					'https://media.discordapp.net/stickers/1039992459209490513.png');
			AM = Dn(IM, 'Vencord Settings');
		});
	var vS = m(() => {});
	var bd,
		SS = m(() => {
			a();
			(window.VencordStyles ??= new Map()).set(
				'src/components/PluginSettings/userPopoutHideBotTag.css',
				{
					name: 'src/components/PluginSettings/userPopoutHideBotTag.css',
					source: `[class|="userPopoutOuter"] [class*="botTag"] {
    display: none;
}
`,
					classNames: {},
					dom: null,
				},
			);
			bd = 'src/components/PluginSettings/userPopoutHideBotTag.css';
		});
	function Td(e) {
		let t = new LM({
			username: e.username,
			id: e.id ?? Qc(),
			avatar: e.avatar,
			bot: !0,
		});
		return L.dispatch({ type: 'USER_UPDATE', user: t }), t;
	}
	function xd({
		plugin: e,
		onRestartNeeded: t,
		onClose: n,
		transitionState: i,
	}) {
		let [r, s] = I.useState([]),
			l = it().plugins[e.name],
			[c, u] = I.useState({}),
			[h, f] = I.useState({}),
			[v, S] = I.useState(null),
			b = () => Object.values(h).every((O) => !O),
			A = Boolean(l && e.options);
		I.useEffect(() => {
			Je(bd);
			let O;
			return (
				(async () => {
					for (let K of e.authors.slice(0, 6)) {
						let ee = K.id
							? await Rn.fetchUser(`${K.id}`)
									.then((j) => ((O = j), Td(j)))
									.catch(() => Td({ username: K.name }))
							: Td({ username: K.name });
						s((j) => [...j, ee]);
					}
				})(),
				() => {
					bt(bd), O && L.dispatch({ type: 'USER_UPDATE', user: O });
				}
			);
		}, []);
		async function C() {
			if (!e.options) {
				n();
				return;
			}
			if (e.beforeSave) {
				let K = await Promise.resolve(e.beforeSave(c));
				if (K !== !0) {
					S(K);
					return;
				}
			}
			let O = !1;
			for (let [K, ee] of Object.entries(c)) {
				let j = e.options[K];
				(l[K] = ee), j?.onChange?.(ee), j?.restartNeeded && (O = !0);
			}
			O && t(), n();
		}
		function D() {
			if (!A || !e.options)
				return o(
					y.FormText,
					null,
					'There are no settings for this plugin.',
				);
			{
				let O = Object.entries(e.options).map(([K, ee]) => {
					if (ee.hidden) return null;
					function j($) {
						u((Re) => ({ ...Re, [K]: $ }));
					}
					function z($) {
						f((Re) => ({ ...Re, [K]: $ }));
					}
					let te = EM[ee.type];
					return o(te, {
						id: K,
						key: K,
						option: ee,
						onChange: j,
						onError: z,
						pluginSettings: l,
						definedSettings: e.settings,
					});
				});
				return o(
					ae,
					{
						flexDirection: 'column',
						style: { gap: 12, marginBottom: 16 },
					},
					O,
				);
			}
		}
		function B(O, K) {
			let ee = e.authors.length - K,
				j = e.authors.length - ee,
				z = j + e.authors.length - K;
			return o(
				W,
				{
					text: e.authors
						.slice(j, z)
						.map((te) => te.name)
						.join(', '),
				},
				({ onMouseEnter: te, onMouseLeave: $ }) =>
					o(
						'div',
						{
							className: kM.moreUsers,
							onMouseEnter: te,
							onMouseLeave: $,
						},
						'+',
						ee,
					),
			);
		}
		return o(
			Ie,
			{
				transitionState: i,
				size: 'medium',
				className: 'vc-text-selectable',
			},
			o(
				$e,
				{ separator: !1 },
				o(
					q,
					{ variant: 'heading-lg/semibold', style: { flexGrow: 1 } },
					e.name,
				),
				o(St, { onClick: n }),
			),
			o(
				Le,
				null,
				o(
					y.FormSection,
					null,
					o(y.FormTitle, { tag: 'h3' }, 'About ', e.name),
					o(y.FormText, null, e.description),
					o(
						y.FormTitle,
						{ tag: 'h3', style: { marginTop: 8, marginBottom: 0 } },
						'Authors',
					),
					o(
						'div',
						{ style: { width: 'fit-content', marginBottom: 8 } },
						o(NM, {
							users: r,
							count: e.authors.length,
							guildId: void 0,
							renderIcon: !1,
							max: 6,
							showDefaultAvatarsForNullUsers: !0,
							showUserPopout: !0,
							renderMoreUsers: B,
						}),
					),
				),
				!!e.settingsAboutComponent &&
					o(
						'div',
						{ className: J(G.bottom8, 'vc-text-selectable') },
						o(
							y.FormSection,
							null,
							o(
								k,
								{
									message:
										"An error occurred while rendering this plugin's custom InfoComponent",
								},
								o(e.settingsAboutComponent, {
									tempSettings: c,
								}),
							),
						),
					),
				o(
					y.FormSection,
					null,
					o(y.FormTitle, { tag: 'h3' }, 'Settings'),
					D(),
				),
			),
			A &&
				o(
					ot,
					null,
					o(
						ae,
						{ flexDirection: 'column', style: { width: '100%' } },
						o(
							ae,
							{ style: { marginLeft: 'auto' } },
							o(
								R,
								{
									onClick: n,
									size: R.Sizes.SMALL,
									color: R.Colors.WHITE,
									look: R.Looks.LINK,
								},
								'Cancel',
							),
							o(
								W,
								{
									text: 'You must fix all errors before saving',
									shouldShow: !b(),
								},
								({ onMouseEnter: O, onMouseLeave: K }) =>
									o(
										R,
										{
											size: R.Sizes.SMALL,
											color: R.Colors.BRAND,
											onClick: C,
											onMouseEnter: O,
											onMouseLeave: K,
											disabled: !b(),
										},
										'Save & Close',
									),
							),
						),
						v &&
							o(
								q,
								{
									variant: 'text-md/semibold',
									style: { color: 'var(--text-danger)' },
								},
								'Error while saving: ',
								v,
							),
					),
				),
		);
	}
	var NM,
		kM,
		LM,
		EM,
		bS = m(() => {
			'use strict';
			a();
			wt();
			E();
			je();
			re();
			xt();
			rn();
			Xe();
			de();
			ze();
			ye();
			T();
			_();
			x();
			ir();
			SS();
			(NM = oe(() =>
				He('defaultRenderUser', 'showDefaultAvatarsForNullUsers'),
			)),
				(kM = P(
					'moreUsers',
					'emptyUser',
					'avatarContainer',
					'clickableAvatar',
				)),
				(LM = ct(() => U.getCurrentUser().constructor));
			EM = {
				[0]: Zh,
				[1]: iu,
				[2]: iu,
				[3]: Gh,
				[4]: qh,
				[5]: Yh,
				[6]: zh,
			};
		});
	var TS = m(() => {});
	function xS({ checked: e, onChange: t, disabled: n }) {
		return o(
			'div',
			null,
			o(
				'div',
				{
					className: J(
						ba.container,
						'default-colors',
						e ? ba.checked : void 0,
					),
					style: {
						backgroundColor: e ? wd : Md,
						opacity: n ? 0.3 : 1,
					},
				},
				o(
					'svg',
					{
						className: ba.slider + ' vc-switch-slider',
						viewBox: '0 0 28 20',
						preserveAspectRatio: 'xMinYMid meet',
						'aria-hidden': 'true',
						style: {
							transform: e
								? 'translateX(12px)'
								: 'translateX(-3px)',
						},
					},
					o('rect', {
						fill: 'white',
						x: '4',
						y: '0',
						height: '20',
						width: '20',
						rx: '10',
					}),
					o(
						'svg',
						{ viewBox: '0 0 20 20', fill: 'none' },
						e
							? o(
									d,
									null,
									o('path', {
										fill: wd,
										d: 'M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z',
									}),
									o('path', {
										fill: wd,
										d: 'M4.08643 11.0903L5.67742 9.49929L9.4485 13.2704L7.85751 14.8614L4.08643 11.0903Z',
									}),
							  )
							: o(
									d,
									null,
									o('path', {
										fill: Md,
										d: 'M5.13231 6.72963L6.7233 5.13864L14.855 13.2704L13.264 14.8614L5.13231 6.72963Z',
									}),
									o('path', {
										fill: Md,
										d: 'M13.2704 5.13864L14.8614 6.72963L6.72963 14.8614L5.13864 13.2704L13.2704 5.13864Z',
									}),
							  ),
					),
				),
				o('input', {
					disabled: n,
					type: 'checkbox',
					className: ba.input,
					tabIndex: 0,
					checked: e,
					onChange: (i) => t(i.currentTarget.checked),
				}),
			),
		);
	}
	var wd,
		Md,
		ba,
		wS = m(() => {
			'use strict';
			a();
			TS();
			de();
			_();
			(wd = 'var(--green-360)'),
				(Md = 'var(--primary-400)'),
				(ba = P('slider', 'input', 'container'));
		});
	var Ad = {};
	me(Ad, {
		PMLogger: () => DM,
		isPluginEnabled: () => Id,
		patches: () => MS,
		plugins: () => OM,
		startAllPlugins: () => Rd,
		startDependenciesRecursive: () => Ta,
		startPlugin: () => Ir,
		stopPlugin: () => Cd,
	});
	function Id(e) {
		return (Te[e]?.required || Te[e]?.isDependency || Pd[e]?.enabled) ?? !1;
	}
	function Ta(e) {
		let t = !1,
			n = [];
		return (
			e.dependencies?.forEach((i) => {
				if (!M.plugins[i].enabled) {
					if (
						(Ta(Te[i]), (M.plugins[i].enabled = !0), Te[i].patches)
					) {
						Gt.warn(`Enabling dependency ${i} requires restart.`),
							(t = !0);
						return;
					}
					Ir(Te[i]) || n.push(i);
				}
			}),
			{ restartNeeded: t, failures: n }
		);
	}
	var Gt,
		DM,
		OM,
		MS,
		Pd,
		PS,
		Rd,
		Ir,
		Cd,
		xa = m(() => {
			'use strict';
			a();
			wt();
			E();
			Se();
			x();
			ni();
			qr();
			(Gt = new Z('PluginManager', '#a6d189')),
				(DM = Gt),
				(OM = Te),
				(MS = []),
				(Pd = M.plugins);
			PS = Object.values(Te);
			for (let e of PS)
				Pd[e.name]?.enabled &&
					e.dependencies?.forEach((t) => {
						let n = Te[t];
						if (n) (Pd[t].enabled = !0), (n.isDependency = !0);
						else {
							let i = new Error(
								`Plugin ${e.name} has unresolved dependency ${t}`,
							);
							Gt.warn(i);
						}
					});
			for (let e of PS) {
				if (e.settings) {
					(e.settings.pluginName = e.name), (e.options ??= {});
					for (let [t, n] of Object.entries(e.settings.def)) {
						let i = e.settings.checks?.[t];
						e.options[t] = { ...n, ...i };
					}
				}
				if (e.patches && Id(e.name))
					for (let t of e.patches)
						(t.plugin = e.name),
							Array.isArray(t.replacement) ||
								(t.replacement = [t.replacement]),
							MS.push(t);
			}
			Rd = sn('startAllPlugins', function () {
				for (let t in Te) Id(t) && Ir(Te[t]);
			});
			(Ir = sn(
				'startPlugin',
				function (t) {
					let { name: n, commands: i, flux: r } = t;
					if (t.start) {
						if ((Gt.info('Starting plugin', n), t.started))
							return Gt.warn(`${n} already started`), !1;
						try {
							t.start(), (t.started = !0);
						} catch (s) {
							return (
								Gt.error(
									`Failed to start ${n}
`,
									s,
								),
								!1
							);
						}
					}
					if (i?.length) {
						Gt.info('Registering commands of plugin', n);
						for (let s of i)
							try {
								ri(s, n);
							} catch (l) {
								return (
									Gt.error(
										`Failed to register command ${s.name}
`,
										l,
									),
									!1
								);
							}
					}
					if (r) for (let s in r) L.subscribe(s, r[s]);
					return !0;
				},
				(e) => `startPlugin ${e.name}`,
			)),
				(Cd = sn(
					'stopPlugin',
					function (t) {
						let { name: n, commands: i, flux: r } = t;
						if (t.stop) {
							if ((Gt.info('Stopping plugin', n), !t.started))
								return Gt.warn(`${n} already stopped`), !1;
							try {
								t.stop(), (t.started = !1);
							} catch (s) {
								return (
									Gt.error(
										`Failed to stop ${n}
`,
										s,
									),
									!1
								);
							}
						}
						if (i?.length) {
							Gt.info('Unregistering commands of plugin', n);
							for (let s of i)
								try {
									or(s.name);
								} catch (l) {
									return (
										Gt.error(
											`Failed to unregister command ${s.name}
`,
											l,
										),
										!1
									);
								}
						}
						if (r) for (let s in r) L.unsubscribe(s, r[s]);
						return !0;
					},
					(e) => `stopPlugin ${e.name}`,
				));
		});
	function $M(e) {
		Q.show({
			message: e,
			type: Q.Type.FAILURE,
			id: Q.genId(),
			options: { position: Q.Position.BOTTOM },
		});
	}
	function UM({ required: e }) {
		return o(
			At,
			{ className: bn('info-card', { 'restart-card': e }) },
			e
				? o(
						d,
						null,
						o(y.FormTitle, { tag: 'h5' }, 'Restart required!'),
						o(
							y.FormText,
							{ className: bn('dep-text') },
							'Restart now to apply new plugins and their settings',
						),
						o(
							R,
							{
								color: R.Colors.YELLOW,
								onClick: () => location.reload(),
							},
							'Restart',
						),
				  )
				: o(
						d,
						null,
						o(y.FormTitle, { tag: 'h5' }, 'Plugin Management'),
						o(
							y.FormText,
							null,
							'Press the cog wheel or info icon to get more info on a plugin',
						),
						o(
							y.FormText,
							null,
							'Plugins with a cog wheel have settings you can modify!',
						),
				  ),
		);
	}
	function CS({
		plugin: e,
		disabled: t,
		onRestartNeeded: n,
		onMouseEnter: i,
		onMouseLeave: r,
		isNew: s,
	}) {
		let l = M.plugins[e.name],
			c = () => l.enabled ?? !1;
		function u() {
			Oi(
				async () => (f) =>
					o(xd, {
						...f,
						plugin: e,
						onRestartNeeded: () => n(e.name),
					}),
			);
		}
		function h() {
			let f = c();
			if (!f) {
				let { restartNeeded: b, failures: A } = Ta(e);
				if (A.length) {
					IS.error(
						`Failed to start dependencies for ${e.name}: ${A.join(
							', ',
						)}`,
					),
						Zi(
							'Failed to start dependencies: ' + A.join(', '),
							'Close',
							() => null,
						);
					return;
				} else if (b) {
					(l.enabled = !0), n(e.name);
					return;
				}
			}
			if (e.patches?.length) {
				(l.enabled = !f), n(e.name);
				return;
			}
			if (f && !e.started) {
				l.enabled = !f;
				return;
			}
			let v = f ? Cd(e) : Ir(e),
				S = f ? 'stop' : 'start';
			if (!v) {
				IS.error(`Failed to ${S} plugin ${e.name}`),
					$M(`Failed to ${S} plugin: ${e.name}`);
				return;
			}
			l.enabled = !f;
		}
		return o(
			ae,
			{
				className: bn('card', { 'card-disabled': t }),
				flexDirection: 'column',
				onMouseEnter: i,
				onMouseLeave: r,
			},
			o(
				'div',
				{ className: bn('card-header') },
				o(
					q,
					{ variant: 'text-md/bold', className: bn('name') },
					e.name,
					s && o($h, { text: 'NEW', color: '#ED4245' }),
				),
				o(
					'button',
					{
						role: 'switch',
						onClick: () => u(),
						className: J(_M.button, bn('info-button')),
					},
					e.options
						? o(FM, null)
						: o(BM, { width: '24', height: '24' }),
				),
				o(xS, { checked: c(), onChange: h, disabled: t }),
			),
			o(
				q,
				{ className: bn('note'), variant: 'text-sm/normal' },
				e.description,
			),
		);
	}
	function Nd() {
		let e = it(),
			t = I.useMemo(() => new Pi(), []);
		I.useEffect(
			() => () =>
				void (
					t.hasChanges &&
					vt.show({
						title: 'Restart required',
						body: o(
							d,
							null,
							o(
								'p',
								null,
								'The following plugins require a restart:',
							),
							o(
								'div',
								null,
								t.map((S, b) =>
									o(
										d,
										null,
										b > 0 && ', ',
										Pe.parse('`' + S + '`'),
									),
								),
							),
						),
						confirmText: 'Restart now',
						cancelText: 'Later!',
						onConfirm: () => location.reload(),
					})
				),
			[],
		);
		let n = I.useMemo(() => {
				let S = {};
				for (let b in Te) {
					let A = Te[b].dependencies;
					if (A) for (let C of A) (S[C] ??= []), S[C].push(b);
				}
				return S;
			}, []),
			i = I.useMemo(
				() =>
					Object.values(Te).sort((S, b) =>
						S.name.localeCompare(b.name),
					),
				[],
			),
			[r, s] = I.useState({ value: '', status: 0 }),
			l = (S) => s((b) => ({ ...b, value: S })),
			c = (S) => s((b) => ({ ...b, status: S })),
			u = (S) => {
				let b = e.plugins[S.name]?.enabled;
				if ((b && r.status === 2) || (!b && r.status === 1)) return !1;
				if (!r.value.length) return !0;
				let A = r.value.toLowerCase();
				return (
					S.name.toLowerCase().includes(A) ||
					S.description.toLowerCase().includes(A) ||
					S.tags?.some((C) => C.toLowerCase().includes(A))
				);
			},
			[h] = ut(() =>
				Qe('Vencord_existingPlugins').then((S) => {
					let b = Date.now() / 1e3,
						A = {},
						C = Object.values(i).map((B) => B.name),
						D = [];
					for (let { name: B } of i)
						(A[B] = S?.[B] ?? b) + 60 * 60 * 24 * 2 > b &&
							D.push(B);
					return (
						Ve('Vencord_existingPlugins', A),
						window._.isEqual(D, C) ? [] : D
					);
				}),
			),
			f,
			v;
		if (i?.length) {
			(f = []), (v = []);
			for (let S of i) {
				if (
					(!S.options &&
						S.name.endsWith('API') &&
						r.value !== 'API') ||
					!u(S)
				)
					continue;
				if (
					S.required ||
					n[S.name]?.some((A) => e.plugins[A].enabled)
				) {
					let A = S.required
						? 'This plugin is required for Vencord to function.'
						: GM(n[S.name]?.filter((C) => e.plugins[C].enabled));
					v.push(
						o(
							W,
							{ text: A, key: S.name },
							({ onMouseLeave: C, onMouseEnter: D }) =>
								o(CS, {
									onMouseLeave: C,
									onMouseEnter: D,
									onRestartNeeded: (B) => t.handleChange(B),
									disabled: !0,
									plugin: S,
								}),
						),
					);
				} else
					f.push(
						o(CS, {
							onRestartNeeded: (A) => t.handleChange(A),
							disabled: !1,
							plugin: S,
							isNew: h?.includes(S.name),
							key: S.name,
						}),
					);
			}
		} else
			f = v = o(
				q,
				{ variant: 'text-md/normal' },
				'No plugins meet search criteria.',
			);
		return o(
			En,
			{ title: 'Plugins' },
			o(UM, { required: t.hasChanges }),
			o(
				y.FormTitle,
				{ tag: 'h5', className: J(G.top20, G.bottom8) },
				'Filters',
			),
			o(
				'div',
				{ className: bn('filter-controls') },
				o(Ne, {
					autoFocus: !0,
					value: r.value,
					placeholder: 'Search for a plugin...',
					onChange: l,
					className: G.bottom20,
				}),
				o(
					'div',
					{ className: RS.inputWrapper },
					o($t, {
						className: RS.inputDefault,
						options: [
							{ label: 'Show All', value: 0, default: !0 },
							{ label: 'Show Enabled', value: 1 },
							{ label: 'Show Disabled', value: 2 },
						],
						serialize: String,
						select: c,
						isSelected: (S) => S === r.status,
						closeOnSelect: !0,
					}),
				),
			),
			o(y.FormTitle, { className: G.top20 }, 'Plugins'),
			o('div', { className: bn('grid') }, f),
			o(y.FormDivider, { className: G.top20 }),
			o(
				y.FormTitle,
				{ tag: 'h5', className: J(G.top20, G.bottom8) },
				'Required Plugins',
			),
			o('div', { className: bn('grid') }, v),
		);
	}
	function GM(e) {
		return o(
			I.Fragment,
			null,
			o(y.FormText, null, 'This plugin is required by:'),
			e.map((t) => o(y.FormText, { className: bn('dep-text') }, t)),
		);
	}
	var bn,
		IS,
		RS,
		_M,
		FM,
		BM,
		AS = m(() => {
			'use strict';
			a();
			vS();
			Pn();
			ws();
			E();
			je();
			xt();
			ir();
			bS();
			wS();
			Go();
			Ya();
			Se();
			Xe();
			de();
			ze();
			ye();
			_();
			x();
			ni();
			xa();
			(bn = Ue('vc-plugins-')),
				(IS = new Z('PluginSettings', '#a6d189')),
				(RS = P('inputDefault', 'inputWrapper')),
				(_M = P('button', 'disabled', 'enabled')),
				(FM = oe(() =>
					He(
						'18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069',
					),
				)),
				(BM = oe(() =>
					He(
						'4.4408921e-16 C4.4771525,-1.77635684e-15 4.4408921e-16',
					),
				));
		});
	var NS = {};
	me(NS, { default: () => HM });
	var HM,
		kS = m(() => {
			'use strict';
			a();
			AS();
			Go();
			HM = Dn(Nd, 'Plugins');
		});
	var LS = {};
	me(LS, { default: () => KM });
	function jM({ link: e }) {
		let [t, n, i] = ut(() =>
				fetch(e).then((s) => {
					if (s.status > 300) throw `${s.status} ${s.statusText}`;
					let l = s.headers.get('Content-Type');
					if (
						!l?.startsWith('text/css') &&
						!l?.startsWith('text/plain')
					)
						throw 'Not a CSS file. Remember to use the raw link!';
					return 'Okay!';
				}),
			),
			r = i
				? 'Checking...'
				: n
				? `Error: ${n instanceof Error ? n.message : String(n)}`
				: 'Valid!';
		return o(
			y.FormText,
			{
				style: {
					color: i
						? 'var(--text-muted)'
						: n
						? 'var(--text-danger)'
						: 'var(--text-positive)',
				},
			},
			r,
		);
	}
	function WM({ themeLinks: e }) {
		return e.length
			? o(
					d,
					null,
					o(
						y.FormTitle,
						{ className: G.top20, tag: 'h5' },
						'Validator',
					),
					o(
						y.FormText,
						null,
						'This section will tell you whether your themes can successfully be loaded',
					),
					o(
						'div',
						null,
						e.map((t) =>
							o(
								At,
								{
									style: {
										padding: '.5em',
										marginBottom: '.5em',
										marginTop: '.5em',
									},
									key: t,
								},
								o(
									y.FormTitle,
									{
										tag: 'h5',
										style: { overflowWrap: 'break-word' },
									},
									t,
								),
								o(jM, { link: t }),
							),
						),
					),
			  )
			: null;
	}
	function qM() {
		let e = it(['themeLinks']),
			[t, n] = I.useState(
				e.themeLinks.join(`
`),
			);
		function i() {
			e.themeLinks = [
				...new Set(
					t
						.trim()
						.split(/\n+/)
						.map((r) => r.trim())
						.filter(Boolean),
				),
			];
		}
		return o(
			En,
			{ title: 'Themes' },
			o(
				At,
				{ className: 'vc-settings-card vc-text-selectable' },
				o(
					y.FormTitle,
					{ tag: 'h5' },
					'Paste links to .theme.css files here',
				),
				o(y.FormText, null, 'One link per line'),
				o(
					y.FormText,
					null,
					o(
						'strong',
						null,
						'Make sure to use the raw links or github.io links!',
					),
				),
				o(y.FormDivider, { className: G.top8 + ' ' + G.bottom8 }),
				o(y.FormTitle, { tag: 'h5' }, 'Find Themes:'),
				o(
					'div',
					{ style: { marginBottom: '.5em' } },
					o(
						We,
						{
							style: { marginRight: '.5em' },
							href: 'https://betterdiscord.app/themes',
						},
						'BetterDiscord Themes',
					),
					o(
						We,
						{ href: 'https://github.com/search?q=discord+theme' },
						'GitHub',
					),
				),
				o(
					y.FormText,
					null,
					'If using the BD site, click on "Source" somewhere below the Download button',
				),
				o(
					y.FormText,
					null,
					'In the GitHub repository of your theme, find X.theme.css, click on it, then click the "Raw" button',
				),
				o(
					y.FormText,
					null,
					'If the theme has configuration that requires you to edit the file:',
					o(
						'ul',
						null,
						o(
							'li',
							null,
							'\u2022 Make a ',
							o(
								We,
								{ href: 'https://github.com/signup' },
								'GitHub',
							),
							' account',
						),
						o(
							'li',
							null,
							'\u2022 Click the fork button on the top right',
						),
						o('li', null, '\u2022 Edit the file'),
						o(
							'li',
							null,
							'\u2022 Use the link to your own repository instead',
						),
					),
				),
			),
			o(y.FormTitle, { tag: 'h5' }, 'Themes'),
			o(Jr, {
				value: t,
				onChange: n,
				className: `${zM.textarea} vc-settings-theme-links`,
				placeholder: 'Theme Links',
				spellCheck: !1,
				onBlur: i,
			}),
			o(WM, { themeLinks: e.themeLinks }),
		);
	}
	var zM,
		KM,
		ES = m(() => {
			'use strict';
			a();
			E();
			Wn();
			Xe();
			ye();
			_();
			x();
			Go();
			zM = Ce((e) => typeof e.textarea == 'string');
			KM = Dn(qM, 'Themes');
		});
	var DS = {};
	me(DS, { default: () => QM });
	function YM(e) {
		try {
			return new URL(e), !0;
		} catch {
			return 'Invalid URL';
		}
	}
	async function ZM() {
		let e = await fetch(new URL('/v1/', An()), {
			method: 'DELETE',
			headers: new Headers({ Authorization: await ei() }),
		});
		if (!e.ok) {
			gs.error(`Failed to erase data, API returned ${e.status}`),
				ge({
					title: 'Cloud Integrations',
					body: `Could not erase all data (API returned ${e.status}), please contact support.`,
					color: 'var(--red-360)',
				});
			return;
		}
		(M.cloud.authenticated = !1),
			await $l(),
			ge({
				title: 'Cloud Integrations',
				body: 'Successfully erased all data.',
				color: 'var(--green-360)',
			});
	}
	function XM() {
		let { cloud: e } = it(['cloud.authenticated', 'cloud.settingsSync']),
			t = e.authenticated && e.settingsSync;
		return o(
			y.FormSection,
			{ title: 'Settings Sync', className: G.top16 },
			o(
				y.FormText,
				{ variant: 'text-md/normal', className: G.bottom20 },
				'Synchronize your settings to the cloud. This allows easy synchronization across multiple devices with minimal effort.',
			),
			o(
				Nt,
				{
					key: 'cloud-sync',
					disabled: !e.authenticated,
					value: e.settingsSync,
					onChange: (n) => {
						e.settingsSync = n;
					},
				},
				'Settings Sync',
			),
			o(
				'div',
				{ className: 'vc-cloud-settings-sync-grid' },
				o(
					R,
					{ size: R.Sizes.SMALL, disabled: !t, onClick: () => ti() },
					'Sync to Cloud',
				),
				o(
					W,
					{
						text: 'This will overwrite your local settings with the ones on the cloud. Use wisely!',
					},
					({ onMouseLeave: n, onMouseEnter: i }) =>
						o(
							R,
							{
								onMouseLeave: n,
								onMouseEnter: i,
								size: R.Sizes.SMALL,
								color: R.Colors.RED,
								disabled: !t,
								onClick: () => ys(!0, !0),
							},
							'Sync from Cloud',
						),
				),
				o(
					R,
					{
						size: R.Sizes.SMALL,
						color: R.Colors.RED,
						disabled: !t,
						onClick: () => hg(),
					},
					'Delete Cloud Settings',
				),
			),
		);
	}
	function JM() {
		let e = it(['cloud.authenticated', 'cloud.url']);
		return o(
			En,
			{ title: 'Vencord Cloud' },
			o(
				y.FormSection,
				{ title: 'Cloud Settings', className: G.top16 },
				o(
					y.FormText,
					{ variant: 'text-md/normal', className: G.bottom20 },
					'Vencord comes with a cloud integration that adds goodies like settings sync across devices. It ',
					o(
						We,
						{ href: 'https://vencord.dev/cloud/privacy' },
						'respects your privacy',
					),
					', and the ',
					o(
						We,
						{ href: 'https://github.com/Vencord/Backend' },
						'source code',
					),
					' is AGPL 3.0 licensed so you can host it yourself.',
				),
				o(
					Nt,
					{
						key: 'backend',
						value: e.cloud.authenticated,
						onChange: (t) => {
							t && ug(), t || (e.cloud.authenticated = t);
						},
						note: 'This will request authorization if you have not yet set up cloud integrations.',
					},
					'Enable Cloud Integrations',
				),
				o(y.FormTitle, { tag: 'h5' }, 'Backend URL'),
				o(
					y.FormText,
					{ className: G.bottom8 },
					'Which backend to use when using cloud integrations.',
				),
				o(ks, {
					key: 'backendUrl',
					value: e.cloud.url,
					onChange: (t) => {
						(e.cloud.url = t), (e.cloud.authenticated = !1), $l();
					},
					validate: YM,
				}),
				o(
					R,
					{
						className: G.top8,
						size: R.Sizes.MEDIUM,
						color: R.Colors.RED,
						disabled: !e.cloud.authenticated,
						onClick: () =>
							vt.show({
								title: 'Are you sure?',
								body: "Once your data is erased, we cannot recover it. There's no going back!",
								onConfirm: ZM,
								confirmText: 'Erase it!',
								confirmColor: 'vc-cloud-erase-data-danger-btn',
								cancelText: 'Nevermind',
							}),
					},
					'Erase All Data',
				),
				o(y.FormDivider, { className: G.top16 }),
			),
			o(XM, null),
		);
	}
	var QM,
		OS = m(() => {
			'use strict';
			a();
			so();
			E();
			Uc();
			Wn();
			Ul();
			Xe();
			qi();
			x();
			Go();
			QM = Dn(JM, 'Cloud');
		});
	var _S = {};
	me(_S, { default: () => eP });
	function VM() {
		return o(
			En,
			{ title: 'Backup & Restore' },
			o(
				At,
				{ className: J('vc-settings-card', 'vc-backup-restore-card') },
				o(
					ae,
					{ flexDirection: 'column' },
					o('strong', null, 'Warning'),
					o(
						'span',
						null,
						'Importing a settings file will overwrite your current settings.',
					),
				),
			),
			o(
				q,
				{ variant: 'text-md/normal', className: G.bottom8 },
				'You can import and export your Vencord settings as a JSON file. This allows you to easily transfer your settings to another device, or recover your settings after reinstalling Vencord or Discord.',
			),
			o(
				q,
				{ variant: 'text-md/normal', className: G.bottom8 },
				'Settings Export contains:',
				o(
					'ul',
					null,
					o('li', null, '\u2014 Custom QuickCSS'),
					o('li', null, '\u2014 Theme Links'),
					o('li', null, '\u2014 Plugin Settings'),
				),
			),
			o(
				ae,
				null,
				o(
					R,
					{ onClick: () => gg(), size: R.Sizes.SMALL },
					'Import Settings',
				),
				o(R, { onClick: mg, size: R.Sizes.SMALL }, 'Export Settings'),
			),
		);
	}
	var eP,
		FS = m(() => {
			'use strict';
			a();
			xt();
			Xe();
			de();
			qi();
			x();
			Go();
			eP = Dn(VM, 'Backup & Restore');
		});
	var Rr,
		kd = m(() => {
			'use strict';
			a();
			Jt();
			E();
			w();
			Se();
			T();
			x();
			Ii();
			Rr = g({
				name: 'Settings',
				description: 'Adds Settings UI and debug info',
				authors: [p.Ven, p.Megu],
				required: !0,
				start() {
					we('user-settings-cog', (e) => () => {
						e.find(
							(n) =>
								Array.isArray(n) &&
								n.some(
									(i) => i?.props?.id === 'VencordSettings',
								),
						)?.forEach((n) => {
							n?.props?.id?.startsWith('Vencord') &&
								(n.props.action = () => ts.open(n.props.id));
						});
					});
				},
				patches: [
					{
						find: '.versionHash',
						replacement: [
							{
								match: /\[\(0,.{1,3}\.jsxs?\)\((.{1,10}),(\{[^{}}]+\{.{0,20}.versionHash,.+?\})\)," "/,
								replace: (e, t, n) => (
									(n = n.replace(/children:\[.+\]/, '')),
									`${e},Vencord.Plugins.plugins.Settings.makeInfoElements(${t}, ${n})`
								),
							},
						],
					},
					{
						find: 'Messages.ACTIVITY_SETTINGS',
						replacement: {
							get match() {
								switch (M.plugins.Settings.settingsLocation) {
									case 'top':
										return /\{section:(.{1,2})\.ID\.HEADER,\s*label:(.{1,2})\..{1,2}\.Messages\.USER_SETTINGS\}/;
									case 'aboveNitro':
										return /\{section:(.{1,2})\.ID\.HEADER,\s*label:(.{1,2})\..{1,2}\.Messages\.BILLING_SETTINGS\}/;
									case 'belowNitro':
										return /\{section:(.{1,2})\.ID\.HEADER,\s*label:(.{1,2})\..{1,2}\.Messages\.APP_SETTINGS\}/;
									case 'aboveActivity':
										return /\{section:(.{1,2})\.ID\.HEADER,\s*label:(.{1,2})\..{1,2}\.Messages\.ACTIVITY_SETTINGS\}/;
									case 'belowActivity':
										return /(?<=\{section:(.{1,2})\.ID\.DIVIDER},)\{section:"changelog"/;
									case 'bottom':
										return /\{section:(.{1,2})\.ID\.CUSTOM,\s*element:.+?}/;
									default:
										return (
											new Z('Settings').error(
												new Error(
													"No switch case matched????? Don't mess with the settings, silly",
												),
											),
											/(?!a)a/
										);
								}
							},
							replace: '...$self.makeSettingsCategories($1),$&',
						},
					},
				],
				makeSettingsCategories({ ID: e }) {
					return [
						{ section: e.HEADER, label: 'Vencord' },
						{
							section: 'VencordSettings',
							label: 'Vencord',
							element: (yS(), Mo(hS)).default,
						},
						{
							section: 'VencordPlugins',
							label: 'Plugins',
							element: (kS(), Mo(NS)).default,
						},
						{
							section: 'VencordThemes',
							label: 'Themes',
							element: (ES(), Mo(LS)).default,
						},
						!1,
						{
							section: 'VencordCloud',
							label: 'Cloud',
							element: (OS(), Mo(DS)).default,
						},
						{
							section: 'VencordSettingsSync',
							label: 'Backup & Restore',
							element: (FS(), Mo(_S)).default,
						},
						!1,
						!1,
						{ section: e.DIVIDER },
					].filter(Boolean);
				},
				options: {
					settingsLocation: {
						type: 4,
						description:
							'Where to put the Vencord settings section',
						options: [
							{ label: 'At the very top', value: 'top' },
							{
								label: 'Above the Nitro section',
								value: 'aboveNitro',
							},
							{
								label: 'Below the Nitro section',
								value: 'belowNitro',
							},
							{
								label: 'Above Activity Settings',
								value: 'aboveActivity',
								default: !0,
							},
							{
								label: 'Below Activity Settings',
								value: 'belowActivity',
							},
							{ label: 'At the very bottom', value: 'bottom' },
						],
						restartNeeded: !0,
					},
				},
				get electronVersion() {
					return (
						VencordNative.native.getVersions().electron ||
						window.armcord?.electron ||
						null
					);
				},
				get chromiumVersion() {
					try {
						return (
							VencordNative.native.getVersions().chrome ||
							navigator.userAgentData?.brands?.find(
								(e) =>
									e.brand === 'Chromium' ||
									e.brand === 'Google Chrome',
							)?.version ||
							null
						);
					} catch {
						return null;
					}
				},
				get additionalInfo() {
					return ' (Web)';
				},
				makeInfoElements(e, t) {
					let {
						electronVersion: n,
						chromiumVersion: i,
						additionalInfo: r,
					} = this;
					return o(
						d,
						null,
						o(e, { ...t }, 'Vencord ', on, r),
						n && o(e, { ...t }, 'Electron ', n),
						i && o(e, { ...t }, 'Chromium ', i),
					);
				},
			});
		});
	var BS = m(() => {});
	var $S,
		US = m(() => {
			a();
			$S = `/* eslint-disable header/header */
import React from "react";

const handleClick = async () =>
    console.log((await import("@webpack/common")).Clipboard.copy("\\u200b"));

export const Example: React.FC<{
    real: boolean,
    shigged?: number,
}> = ({ real, shigged }) => <>
    <p>{\`Shigg\${real ? \`ies\${shigged === 0x1B ? "t" : ""}\` : "y"}\`}</p>
    <button onClick={handleClick}>Click Me</button>
</>;
`;
		});
	var HS = Mi((Oz, Ld) => {
		'use strict';
		a();
		var tP = Object.prototype.hasOwnProperty,
			It = '~';
		function Cr() {}
		Object.create &&
			((Cr.prototype = Object.create(null)),
			new Cr().__proto__ || (It = !1));
		function nP(e, t, n) {
			(this.fn = e), (this.context = t), (this.once = n || !1);
		}
		function GS(e, t, n, i, r) {
			if (typeof n != 'function')
				throw new TypeError('The listener must be a function');
			var s = new nP(n, i || e, r),
				l = It ? It + t : t;
			return (
				e._events[l]
					? e._events[l].fn
						? (e._events[l] = [e._events[l], s])
						: e._events[l].push(s)
					: ((e._events[l] = s), e._eventsCount++),
				e
			);
		}
		function wa(e, t) {
			--e._eventsCount === 0
				? (e._events = new Cr())
				: delete e._events[t];
		}
		function dt() {
			(this._events = new Cr()), (this._eventsCount = 0);
		}
		dt.prototype.eventNames = function () {
			var t = [],
				n,
				i;
			if (this._eventsCount === 0) return t;
			for (i in (n = this._events))
				tP.call(n, i) && t.push(It ? i.slice(1) : i);
			return Object.getOwnPropertySymbols
				? t.concat(Object.getOwnPropertySymbols(n))
				: t;
		};
		dt.prototype.listeners = function (t) {
			var n = It ? It + t : t,
				i = this._events[n];
			if (!i) return [];
			if (i.fn) return [i.fn];
			for (var r = 0, s = i.length, l = new Array(s); r < s; r++)
				l[r] = i[r].fn;
			return l;
		};
		dt.prototype.listenerCount = function (t) {
			var n = It ? It + t : t,
				i = this._events[n];
			return i ? (i.fn ? 1 : i.length) : 0;
		};
		dt.prototype.emit = function (t, n, i, r, s, l) {
			var c = It ? It + t : t;
			if (!this._events[c]) return !1;
			var u = this._events[c],
				h = arguments.length,
				f,
				v;
			if (u.fn) {
				switch (
					(u.once && this.removeListener(t, u.fn, void 0, !0), h)
				) {
					case 1:
						return u.fn.call(u.context), !0;
					case 2:
						return u.fn.call(u.context, n), !0;
					case 3:
						return u.fn.call(u.context, n, i), !0;
					case 4:
						return u.fn.call(u.context, n, i, r), !0;
					case 5:
						return u.fn.call(u.context, n, i, r, s), !0;
					case 6:
						return u.fn.call(u.context, n, i, r, s, l), !0;
				}
				for (v = 1, f = new Array(h - 1); v < h; v++)
					f[v - 1] = arguments[v];
				u.fn.apply(u.context, f);
			} else {
				var S = u.length,
					b;
				for (v = 0; v < S; v++)
					switch (
						(u[v].once &&
							this.removeListener(t, u[v].fn, void 0, !0),
						h)
					) {
						case 1:
							u[v].fn.call(u[v].context);
							break;
						case 2:
							u[v].fn.call(u[v].context, n);
							break;
						case 3:
							u[v].fn.call(u[v].context, n, i);
							break;
						case 4:
							u[v].fn.call(u[v].context, n, i, r);
							break;
						default:
							if (!f)
								for (b = 1, f = new Array(h - 1); b < h; b++)
									f[b - 1] = arguments[b];
							u[v].fn.apply(u[v].context, f);
					}
			}
			return !0;
		};
		dt.prototype.on = function (t, n, i) {
			return GS(this, t, n, i, !1);
		};
		dt.prototype.once = function (t, n, i) {
			return GS(this, t, n, i, !0);
		};
		dt.prototype.removeListener = function (t, n, i, r) {
			var s = It ? It + t : t;
			if (!this._events[s]) return this;
			if (!n) return wa(this, s), this;
			var l = this._events[s];
			if (l.fn)
				l.fn === n &&
					(!r || l.once) &&
					(!i || l.context === i) &&
					wa(this, s);
			else {
				for (var c = 0, u = [], h = l.length; c < h; c++)
					(l[c].fn !== n ||
						(r && !l[c].once) ||
						(i && l[c].context !== i)) &&
						u.push(l[c]);
				u.length
					? (this._events[s] = u.length === 1 ? u[0] : u)
					: wa(this, s);
			}
			return this;
		};
		dt.prototype.removeAllListeners = function (t) {
			var n;
			return (
				t
					? ((n = It ? It + t : t), this._events[n] && wa(this, n))
					: ((this._events = new Cr()), (this._eventsCount = 0)),
				this
			);
		};
		dt.prototype.off = dt.prototype.removeListener;
		dt.prototype.addListener = dt.prototype.on;
		dt.prefixed = It;
		dt.EventEmitter = dt;
		typeof Ld < 'u' && (Ld.exports = dt);
	});
	var _d = Mi((yi) => {
		'use strict';
		a();
		Object.defineProperty(yi, '__esModule', { value: !0 });
		yi.Channel = yi.ChannelPort = void 0;
		var oP = HS(),
			Ma = 'vapIpc',
			Ed = Symbol.for('vapIpc.edgeCreate'),
			Dd = class {
				_pipes = new Map();
				_listeners = new Map();
				_createListenerMap() {
					return new Map();
				}
				_emit(t, n, ...i) {
					for (let [r, s] of this._listeners.entries()) {
						if (r === t) continue;
						let l = s.get(n);
						l && l(...i);
					}
				}
				createPipe(t) {
					let n = this.getPipe(t);
					if (n) return n;
					let i = this._createListenerMap();
					this._listeners.set(t, i);
					let r = {
						emit: this._emit.bind(this, t),
						listen: (s, l) => void i.set(s, l),
					};
					return this._pipes.set(t, r), r;
				}
				getPipe(t) {
					return this._pipes.get(t) ?? null;
				}
			};
		yi.ChannelPort = Dd;
		var Od = class {
			id;
			_edges = new Map();
			_callbacks = new Map();
			_callers = new Map();
			_edgePipes = new Map();
			_pipes = [];
			_emitter = new oP.EventEmitter();
			_logger;
			_destroyed = !1;
			constructor(t) {
				this.id = t;
			}
			addPipe(t) {
				t.listen(`${Ma}:handshake`, (n) => {
					this._handleHandshake(t, n);
				}),
					t.listen(`${Ma}:message`, (n) => {
						this._handleMessage(t, n);
					}),
					this._pipes.push(t),
					this._logger?.log(`Adding pipe to channel "${this.id}"`);
			}
			setLogger(t) {
				this._logger = t;
			}
			_handleHandshake(t, n) {
				if (this.id === n.id) return;
				this._logger?.log(
					`\u{1F91D} "${n.id}" -> "${
						this.id
					}" (edges: [${n.channelIds.join(', ')}])`,
				);
				let i = this._edges.get(n.id);
				if (i) {
					let r = n.channelIds.filter(
						(s) => !i?.channelIds.includes(s),
					);
					if (
						(r.includes(this.id) && r.splice(r.indexOf(this.id), 1),
						!r.length)
					)
						return;
					this._edges.set(n.id, {
						...n,
						channelIds: [...i.channelIds, ...r],
					});
				} else {
					let r = [...n.channelIds].filter((s) => s !== this.id);
					this._edges.set(n.id, { ...n, channelIds: r }),
						this._edgePipes.set(n.id, t);
				}
				this._emitter.emit(Ed, n), this.handshakeAll();
			}
			_handleMessage(t, n) {
				if (n.proxiedBy === this.id) return;
				if (n.destination !== this.id)
					return this._emitMessage({ ...n, proxiedBy: this.id });
				if (!n.nonce) return void this._emitter.emit(n.name, n.data);
				let i = this._callbacks.get(n.nonce);
				if (i) return void i(n.data);
				let r = this._callers.get(n.name);
				if (r) {
					r(n.data)
						.catch(
							(s) => (
								console.error(s),
								new Error(s?.message ?? `${s}`)
							),
						)
						.then((s) => {
							this._emitMessage({
								name: n.name,
								source: this.id,
								destination: n.source,
								data: s,
								nonce: n.nonce,
							});
						});
					return;
				}
			}
			_emitHandshake(t) {
				let n = this.getEdge();
				t.emit(`${Ma}:handshake`, n);
			}
			_emitMessage(t) {
				let n = this.findEdgeId(t.destination);
				if (!n) return;
				this._edgePipes.get(n)?.emit(`${Ma}:message`, t);
			}
			getEdge() {
				let t = [
					...this._edges.keys(),
					...[...this._edges.values()]
						.map((n) => n.channelIds)
						.flat(),
				].filter((n, i, r) => r.indexOf(n) === i);
				return { id: this.id, channelIds: t };
			}
			findEdgeId(t) {
				for (let n of this._edges.values())
					if (n.id === t || n.channelIds.includes(t)) return n.id;
				return null;
			}
			waitForEdge(t) {
				let n = this.findEdgeId(t);
				return n
					? Promise.resolve(n)
					: new Promise((i) => {
							let r = (s) => {
								(s.id === t || s.channelIds.includes(t)) &&
									(this._emitter.off(Ed, r), i(s.id));
							};
							this._emitter.on(Ed, r);
					  });
			}
			createNonce() {
				return Math.random().toString(16).slice(2);
			}
			send(t) {
				this._emitMessage({ ...t, source: this.id });
			}
			call(t, n = { timeout: 1e4 }) {
				let i = this.createNonce(),
					r = new Promise((s, l) => {
						let c = setTimeout(() => {
							this._callbacks.delete(i),
								l(new Error('Call timed out'));
						}, n.timeout);
						this._callbacks.set(i, (u) => {
							this._callbacks.delete(i),
								clearTimeout(c),
								n.signal?.aborted
									? n.signal.reason instanceof Error &&
									  l(n.signal.reason)
									: u instanceof Error
									? l(u)
									: s(u);
						});
					});
				return (
					this._emitMessage({ ...t, source: this.id, nonce: i }), r
				);
			}
			on(t, n) {
				return this._emitter.on(t, n), this;
			}
			off(t, n) {
				return this._emitter.off(t, n), this;
			}
			once(t, n) {
				this._emitter.once(t, n);
			}
			onCall(t, n) {
				this._callers.set(t, async (...i) => await n(...i));
			}
			removeCaller() {}
			handshakeAll() {
				this._pipes.forEach((t) => this._emitHandshake(t));
			}
			destroy() {
				this._emitter.removeAllListeners(),
					this._callbacks.clear(),
					this._callers.clear(),
					this._edgePipes.clear(),
					(this._pipes = []),
					(this._destroyed = !0);
			}
		};
		yi.Channel = Od;
	});
	var $d = Mi((vi) => {
		'use strict';
		a();
		Object.defineProperty(vi, '__esModule', { value: !0 });
		vi.RemoteClient = vi.RemoteHost = void 0;
		var Fd = class {
			channel;
			constructor(t, n) {
				this.channel = t;
				for (let [i, r] of Object.entries(n))
					t.onCall(i, async (s) => await r(...s));
				t.handshakeAll();
			}
		};
		vi.RemoteHost = Fd;
		var Bd = class {
			hostName;
			channel;
			constructor(t, n) {
				(this.hostName = t), (this.channel = n);
			}
			async connect() {
				await this.channel.waitForEdge(this.hostName);
			}
			run(t, ...n) {
				return this.channel.call({
					name: t,
					destination: this.hostName,
					data: n,
				});
			}
		};
		vi.RemoteClient = Bd;
	});
	var WS = Mi((Si) => {
		'use strict';
		a();
		Object.defineProperty(Si, '__esModule', { value: !0 });
		Si.WorkerClient = Si.createWorkerHost = void 0;
		var zS = _d(),
			jS = $d(),
			iP = (e, t) => {
				let n = new zS.Channel(e);
				return (
					n.addPipe({
						emit: (i, r) => postMessage({ event: i, data: r }),
						listen: (i, r) =>
							addEventListener('message', ({ data: s }) => {
								s.event === i && r(s.data);
							}),
					}),
					new jS.RemoteHost(n, t)
				);
			};
		Si.createWorkerHost = iP;
		var Ud = class extends jS.RemoteClient {
			workerOpts;
			worker;
			workerListeners = [];
			url;
			constructor(t, n, i, r = {}) {
				let s = new zS.Channel(t);
				if ((super(n, s), (this.workerOpts = r), i instanceof Blob)) {
					let l = new Blob([i], { type: 'text/javascript' });
					this.url = URL.createObjectURL(l);
				} else this.url = i;
			}
			async init() {
				let t = (this.worker = new Worker(this.url, this.workerOpts));
				this.channel.addPipe({
					emit: (n, i) => t.postMessage({ event: n, data: i }),
					listen: (n, i) => {
						let r = (s) => {
							let { event: l, data: c } = s.data;
							l === n && i(c);
						};
						this.workerListeners.push(r),
							t.addEventListener('message', r);
					},
				}),
					await this.connect();
			}
			destroy() {
				if (this.worker) {
					for (let t of this.workerListeners)
						this.worker.removeEventListener('message', t);
					this.worker.terminate();
				}
				this.channel.destroy(),
					this.url.startsWith('blob:') &&
						URL.revokeObjectURL(this.url);
			}
		};
		Si.WorkerClient = Ud;
	});
	var qS = Mi((Qn) => {
		'use strict';
		a();
		var rP =
				(Qn && Qn.__createBinding) ||
				(Object.create
					? function (e, t, n, i) {
							i === void 0 && (i = n);
							var r = Object.getOwnPropertyDescriptor(t, n);
							(!r ||
								('get' in r
									? !t.__esModule
									: r.writable || r.configurable)) &&
								(r = {
									enumerable: !0,
									get: function () {
										return t[n];
									},
								}),
								Object.defineProperty(e, i, r);
					  }
					: function (e, t, n, i) {
							i === void 0 && (i = n), (e[i] = t[n]);
					  }),
			Gd =
				(Qn && Qn.__exportStar) ||
				function (e, t) {
					for (var n in e)
						n !== 'default' &&
							!Object.prototype.hasOwnProperty.call(t, n) &&
							rP(t, e, n);
				};
		Object.defineProperty(Qn, '__esModule', { value: !0 });
		Gd(_d(), Qn);
		Gd($d(), Qn);
		Gd(WS(), Qn);
	});
	function zd(e) {
		Pa.id !== e.id && (Object.assign(Pa, e), Hd.forEach((t) => t(e)));
	}
	var Pa,
		Hd,
		KS,
		jd = m(() => {
			'use strict';
			a();
			x();
			(Pa = { id: null, theme: null }),
				(Hd = new Set()),
				(KS = () => {
					let [, e] = I.useState(Pa);
					return (
						I.useEffect(
							() => (Hd.add(e), () => void Hd.delete(e)),
							[],
						),
						Pa
					);
				});
		});
	function Ho(e) {
		if (Object.prototype.hasOwnProperty.call(bi, e)) return bi[e];
		let t = Object.values(bi).find((n) => n.aliases?.includes(e));
		return t ? (uP.set(e, t), t) : null;
	}
	var sP,
		aP,
		YS,
		lP,
		cP,
		bi,
		ZS,
		XS,
		uP,
		Ia = m(() => {
			'use strict';
			a();
			(sP = 'Vap0r1ze/vapcord'),
				(aP = '88a7032a59cca40da170926651b08201ea3b965a'),
				(YS = `https://raw.githubusercontent.com/${sP}/${aP}/assets/shiki-codeblocks`),
				(lP = (e) => `${YS}/${e}`),
				(cP = `${YS}/languages.json`),
				(bi = {}),
				(ZS = async () => {
					let e = await fetch(cP).then((n) => n.json()),
						t = Object.fromEntries(
							e.map((n) => [
								n.id,
								{ ...n, grammarUrl: lP(n.fileName) },
							]),
						);
					Object.assign(bi, t);
				}),
				(XS = (e) =>
					e.grammar
						? Promise.resolve(e.grammar)
						: fetch(e.grammarUrl).then((t) => t.json())),
				(uP = new Map());
		});
	var pP,
		dP,
		ve,
		Vn,
		Wd = m(() => {
			'use strict';
			a();
			(pP = 'shikijs/shiki'),
				(dP = '0b28ad8ccfbf2615f2d9d38ea8255416b8ac3043'),
				(ve = (e) =>
					`https://raw.githubusercontent.com/${pP}/${dP}/packages/shiki/themes/${e}.json`),
				(Vn = {
					DarkPlus: ve('dark-plus'),
					MaterialCandy:
						'https://raw.githubusercontent.com/millsp/material-candy/master/material-candy.json',
					DraculaSoft: ve('dracula-soft'),
					Dracula: ve('dracula'),
					GithubDarkDimmed: ve('github-dark-dimmed'),
					GithubDark: ve('github-dark'),
					GithubLight: ve('github-light'),
					LightPlus: ve('light-plus'),
					MaterialDarker: ve('material-darker'),
					MaterialDefault: ve('material-default'),
					MaterialLighter: ve('material-lighter'),
					MaterialOcean: ve('material-ocean'),
					MaterialPalenight: ve('material-palenight'),
					MinDark: ve('min-dark'),
					MinLight: ve('min-light'),
					Monokai: ve('monokai'),
					Nord: ve('nord'),
					OneDarkPro: ve('one-dark-pro'),
					Poimandres: ve('poimandres'),
					RosePineDawn: ve('rose-pine-dawn'),
					RosePineMoon: ve('rose-pine-moon'),
					RosePine: ve('rose-pine'),
					SlackDark: ve('slack-dark'),
					SlackOchin: ve('slack-ochin'),
					SolarizedDark: ve('solarized-dark'),
					SolarizedLight: ve('solarized-light'),
					VitesseDark: ve('vitesse-dark'),
					VitesseLight: ve('vitesse-light'),
					CssVariables: ve('css-variables'),
				});
		});
	var QS,
		qd,
		JS,
		se,
		Ar = m(() => {
			'use strict';
			a();
			tr();
			QS = Wa(qS());
			jd();
			Ia();
			Wd();
			(qd = Object.values(Vn)),
				(se = {
					client: null,
					currentTheme: null,
					currentThemeUrl: null,
					timeoutMs: 1e4,
					languages: bi,
					themes: Vn,
					loadedThemes: new Set(),
					loadedLangs: new Set(),
					clientPromise: new Promise((e) => (JS = e)),
					init: async (e) => {
						let t = await fetch(Ih).then((r) => r.blob()),
							n = (se.client = new QS.WorkerClient(
								'shiki-client',
								'shiki-host',
								t,
								{ name: 'ShikiWorker' },
							));
						await n.init();
						let i = e || qd[0];
						await ZS(),
							await n.run('setOnigasm', { wasm: Rh }),
							await n.run('setHighlighter', {
								theme: i,
								langs: [],
							}),
							se.loadedThemes.add(i),
							await se._setTheme(i),
							JS(n);
					},
					_setTheme: async (e) => {
						se.currentThemeUrl = e;
						let { themeData: t } = await se.client.run('getTheme', {
							theme: e,
						});
						(se.currentTheme = JSON.parse(t)),
							zd({ id: e, theme: se.currentTheme });
					},
					loadTheme: async (e) => {
						let t = await se.clientPromise;
						se.loadedThemes.has(e) ||
							(await t.run('loadTheme', { theme: e }),
							se.loadedThemes.add(e));
					},
					setTheme: async (e) => {
						await se.clientPromise,
							(e ||= qd[0]),
							se.loadedThemes.has(e) || (await se.loadTheme(e)),
							await se._setTheme(e);
					},
					loadLang: async (e) => {
						let t = await se.clientPromise,
							n = Ho(e);
						!n ||
							se.loadedLangs.has(n.id) ||
							(await t.run('loadLanguage', {
								lang: {
									...n,
									grammar: n.grammar ?? (await XS(n)),
								},
							}),
							se.loadedLangs.add(n.id));
					},
					tokenizeCode: async (e, t) => {
						let n = await se.clientPromise,
							i = Ho(t);
						return i
							? (se.loadedLangs.has(i.id) ||
									(await se.loadLang(i.id)),
							  await n.run('codeToThemedTokens', {
									code: e,
									lang: t,
									theme: se.currentThemeUrl ?? qd[0],
							  }))
							: [];
					},
					destroy() {
						(se.currentTheme = null),
							(se.currentThemeUrl = null),
							zd({ id: null, theme: null }),
							se.client?.destroy();
					},
				});
		});
	var Nr,
		Kd = m(() => {
			a();
			(window.VencordStyles ??= new Map()).set(
				'src/plugins/shikiCodeblocks/devicon.css',
				{
					name: 'src/plugins/shikiCodeblocks/devicon.css',
					source: `@import url("https://cdn.jsdelivr.net/gh/devicons/devicon@v2.10.1/devicon.min.css");
`,
					classNames: {},
					dom: null,
				},
			);
			Nr = 'src/plugins/shikiCodeblocks/devicon.css';
		});
	var kr = m(() => {
		'use strict';
		a();
	});
	var fP,
		bo,
		Yd = m(() => {
			'use strict';
			a();
			E();
			je();
			de();
			ro();
			T();
			Ar();
			Wd();
			Kd();
			kr();
			(fP = Object.keys(Vn)),
				(bo = N(
					{
						theme: {
							type: 4,
							description: 'Default themes',
							options: fP.map((e) => ({
								label: ko(yl(e)),
								value: Vn[e],
								default: Vn[e] === Vn.DarkPlus,
							})),
							onChange: se.setTheme,
						},
						customTheme: {
							type: 0,
							description: 'A link to a custom vscode theme',
							placeholder: Vn.MaterialCandy,
							onChange: (e) => {
								se.setTheme(e || bo.store.theme);
							},
						},
						tryHljs: {
							type: 4,
							description:
								'Use the more lightweight default Discord highlighter and theme.',
							options: [
								{ label: 'Never', value: 'NEVER' },
								{
									label: 'Prefer Shiki instead of Highlight.js',
									value: 'SECONDARY',
									default: !0,
								},
								{
									label: 'Prefer Highlight.js instead of Shiki',
									value: 'PRIMARY',
								},
								{ label: 'Always', value: 'ALWAYS' },
							],
						},
						useDevIcon: {
							type: 4,
							description:
								'How to show language icons on codeblocks',
							options: [
								{ label: 'Disabled', value: 'DISABLED' },
								{
									label: 'Colorless',
									value: 'GREYSCALE',
									default: !0,
								},
								{ label: 'Colored', value: 'COLOR' },
							],
							onChange: (e) => {
								e === 'DISABLED' ? bt(Nr) : Je(Nr);
							},
						},
						bgOpacity: {
							type: 5,
							description: 'Background opacity',
							markers: [0, 20, 40, 60, 80, 100],
							default: 100,
							componentProps: {
								stickToMarkers: !1,
								onValueRender: null,
							},
						},
					},
					{
						theme: {
							disabled() {
								return !!this.store.customTheme;
							},
						},
						customTheme: {
							isValid(e) {
								if (!e) return !0;
								let t = nl(e);
								return t
									? t.pathname.endsWith('.json')
										? !0
										: 'Must be a json file'
									: 'Must be a valid URL';
							},
						},
					},
				));
		});
	function e0(e, t) {
		let n = bo.use(e),
			[i, r] = I.useState(!1),
			s = { ...n, ...t },
			l = s.customTheme || s.theme;
		if (t) {
			let c = se.currentThemeUrl && l && l !== se.currentThemeUrl,
				u = Object.keys(t).length === 0;
			i && (!c || u) && r(!1), !i && c && (r(!0), se.setTheme(l));
		}
		return { ...s, isThemeLoading: l !== se.currentThemeUrl };
	}
	var t0 = m(() => {
		'use strict';
		a();
		x();
		Ar();
		Yd();
	});
	function n0(e) {
		return (
			(e = e.slice(1)),
			e.length < 6 &&
				(e = e
					.split('')
					.map((t) => t + t)
					.join('')),
			e.length === 6 && (e += 'ff'),
			e.length > 6 && (e = e.slice(0, 6)),
			e
				.split(/(..)/)
				.filter(Boolean)
				.map((t) => parseInt(t, 16))
		);
	}
	var o0 = m(() => {
		'use strict';
		a();
	});
	var Tn,
		i0,
		Lr = m(() => {
			'use strict';
			a();
			je();
			x();
			Ia();
			kr();
			(Tn = Ue('shiki-')),
				(i0 = ({ lang: e, tryHljs: t }) => {
					let n = e ? Co?.getLanguage?.(e) : null,
						r = (e ? Ho(e) : null)?.name;
					switch (t) {
						case 'ALWAYS':
							return !0;
						case 'PRIMARY':
							return !!n || e === '';
						case 'SECONDARY':
							return !r && !!n;
						case 'NEVER':
							return !1;
						default:
							return !1;
					}
				});
		});
	function r0(e) {
		let [t, n] = I.useState(!1);
		function i(r) {
			jt.copy(r),
				n(!0),
				setTimeout(() => {
					n(!1);
				}, e);
		}
		return [t, i];
	}
	var s0 = m(() => {
		'use strict';
		a();
		x();
	});
	function a0({ content: e, ...t }) {
		let [n, i] = r0(1e3);
		return o(
			'button',
			{
				...t,
				style: { ...t.style, cursor: n ? 'default' : void 0 },
				onClick: () => i(e),
			},
			n ? 'Copied!' : 'Copy',
		);
	}
	var l0 = m(() => {
		'use strict';
		a();
		s0();
	});
	function c0({ content: e, theme: t }) {
		let n = [];
		return (
			jt.SUPPORTS_COPY &&
				n.push(
					o(a0, {
						content: e,
						className: Tn('btn'),
						style: {
							backgroundColor: t.accentBgColor,
							color: t.accentFgColor,
						},
					}),
				),
			o('div', { className: Tn('btns') }, n)
		);
	}
	var u0 = m(() => {
		'use strict';
		a();
		x();
		Lr();
		l0();
	});
	var p0,
		d0 = m(() => {
			'use strict';
			a();
			x();
			Lr();
			p0 = ({ theme: e, useHljs: t, lang: n, content: i, tokens: r }) => {
				let s;
				if (t)
					try {
						let { value: c } = Co.highlight(n, i, !0);
						s = c
							.split(
								`
`,
							)
							.map((u, h) =>
								o('span', {
									key: h,
									dangerouslySetInnerHTML: { __html: u },
								}),
							);
					} catch {
						s = i
							.split(
								`
`,
							)
							.map((c) => o('span', null, c));
					}
				else
					s = (
						r ??
						i
							.split(
								`
`,
							)
							.map((u) => [{ color: e.plainColor, content: u }])
					).map((u) =>
						u.length === 0
							? o(
									'span',
									null,
									`
`,
							  )
							: o(
									d,
									null,
									u.map(
										(
											{
												content: h,
												color: f,
												fontStyle: v,
											},
											S,
										) =>
											o(
												'span',
												{
													key: S,
													style: {
														color: f,
														fontStyle:
															(v ?? 0) & 1
																? 'italic'
																: void 0,
														fontWeight:
															(v ?? 0) & 2
																? 'bold'
																: void 0,
														textDecoration:
															(v ?? 0) & 4
																? 'underline'
																: void 0,
													},
												},
												h,
											),
									),
							  ),
					);
				let l = s.map((c, u) =>
					o(
						'tr',
						{ key: u },
						o('td', { style: { color: e.plainColor } }, u + 1),
						o('td', null, c),
					),
				);
				return o('table', { className: Tn('table') }, ...l);
			};
		});
	function m0({ langName: e, useDevIcon: t, shikiLang: n }) {
		return e
			? o(
					'div',
					{ className: Tn('lang') },
					t !== 'DISABLED' &&
						n?.devicon &&
						o('i', {
							className: `${Tn('devicon')} devicon-${n.devicon}${
								t === 'COLOR' ? ' colored' : ''
							}`,
						}),
					e,
			  )
			: o(d, null);
	}
	var f0 = m(() => {
		'use strict';
		a();
		kr();
		Lr();
	});
	var Ra,
		gP,
		g0 = m(() => {
			'use strict';
			a();
			re();
			ye();
			x();
			Ia();
			Ar();
			t0();
			jd();
			o0();
			Lr();
			u0();
			d0();
			f0();
			(Ra = (e) =>
				o(
					'pre',
					{ className: Tn('container') },
					o(k, null, o(gP, { ...e })),
				)),
				(gP = ({
					lang: e,
					content: t,
					isPreview: n,
					tempSettings: i,
				}) => {
					let {
							tryHljs: r,
							useDevIcon: s,
							bgOpacity: l,
						} = e0(['tryHljs', 'useDevIcon', 'bgOpacity'], i),
						{ id: c, theme: u } = KS(),
						h = e ? Ho(e) : null,
						f = i0({ lang: e, tryHljs: r }),
						[v, S] = vf(!0),
						[b] = ut(
							async () =>
								!h || f || !S
									? null
									: await se.tokenizeCode(t, e),
							{ fallbackValue: null, deps: [e, t, c, S] },
						),
						A = {
							plainColor: u?.fg || 'var(--text-normal)',
							accentBgColor:
								u?.colors?.['statusBar.background'] ||
								(f ? '#7289da' : '#007BC8'),
							accentFgColor:
								u?.colors?.['statusBar.foreground'] || '#FFF',
							backgroundColor:
								u?.colors?.['editor.background'] ||
								'var(--background-secondary)',
						},
						C;
					return (
						e && (C = f ? Co?.getLanguage?.(e)?.name : h?.name),
						o(
							'div',
							{
								ref: v,
								className: Tn('root', {
									plain: !C,
									preview: n,
								}),
								style: {
									backgroundColor: f
										? A.backgroundColor
										: `rgba(${n0(A.backgroundColor)
												.concat(l / 100)
												.join(', ')})`,
									color: A.plainColor,
								},
							},
							o(
								'code',
								null,
								o(m0, {
									langName: C,
									useDevIcon: s,
									shikiLang: h,
								}),
								o(p0, {
									theme: A,
									useHljs: f,
									lang: e,
									content: t,
									tokens: b,
								}),
								!n && o(c0, { content: t, theme: A }),
							),
						)
					);
				});
		});
	var h0,
		y0,
		v0 = m(() => {
			'use strict';
			a();
			(h0 = new Map()),
				(y0 = () => {
					h0.forEach((e) => e.remove()), h0.clear();
				});
		});
	var Zd,
		S0 = m(() => {
			'use strict';
			a();
			BS();
			je();
			w();
			T();
			US();
			Ar();
			g0();
			Kd();
			Yd();
			kr();
			v0();
			Zd = g({
				name: 'ShikiCodeblocks',
				description:
					'Brings vscode-style codeblocks into Discord, powered by Shiki',
				authors: [p.Vap],
				patches: [
					{
						find: 'codeBlock:{react:function',
						replacement: {
							match: /codeBlock:\{react:function\((\i),(\i),(\i)\)\{/,
							replace:
								'$&return $self.renderHighlighter($1,$2,$3);',
						},
					},
				],
				start: async () => {
					bo.store.useDevIcon !== 'DISABLED' && Je(Nr),
						await se.init(bo.store.customTheme || bo.store.theme);
				},
				stop: () => {
					se.destroy(), y0();
				},
				settingsAboutComponent: ({ tempSettings: e }) =>
					Ra({
						lang: 'tsx',
						content: $S,
						isPreview: !0,
						tempSettings: e,
					}),
				settings: bo,
				shiki: se,
				createHighlighter: Ra,
				renderHighlighter: ({ lang: e, content: t }) =>
					Ra({ lang: e, content: t, isPreview: !1 }),
			});
		});
	var Xd,
		b0 = m(() => {
			'use strict';
			a();
			w();
			T();
			Xd = g({
				name: 'ShowAllMessageButtons',
				description:
					'Always show all message buttons no matter if you are holding the shift key or not.',
				authors: [p.Nuckyz],
				patches: [
					{
						find: '.Messages.MESSAGE_UTILITIES_A11Y_LABEL',
						replacement: {
							match: /isExpanded:(\i),(?<=,\1=\i&&(!.+);.+?)/,
							replace: 'isExpanded:$2,',
						},
					},
				],
			});
		});
	var T0 = m(() => {});
	function w0() {
		let e = Ni(x0.colors.INTERACTIVE_MUTED).hex(),
			t = Ni(x0.colors.INTERACTIVE_ACTIVE).hex();
		return o(hP, {
			color: e,
			forcedIconColor: t,
			size: 16,
			tooltipText: nt.Messages.CONNECTION_VERIFIED,
		});
	}
	var x0,
		hP,
		M0 = m(() => {
			'use strict';
			a();
			ye();
			_();
			x();
			(x0 = Ce((e) => e.colors?.INTERACTIVE_MUTED?.css)),
				(hP = oe(() => He('.CONNECTIONS_ROLE_OFFICIAL_ICON_TOOLTIP')));
		});
	function P0({ id: e, theme: t }) {
		let n = vP.getUserProfile(e);
		if (!n) return null;
		let i = n.connectedAccounts;
		return i?.length
			? o(
					yP,
					null,
					o(
						q,
						{
							tag: 'h2',
							variant: 'eyebrow',
							style: { color: 'var(--header-primary)' },
						},
						'Connections',
					),
					o(
						ae,
						{
							style: {
								marginTop: '8px',
								gap: xP(Ca.store.iconSpacing),
								flexWrap: 'wrap',
							},
						},
						i.map((r) => o(PP, { connection: r, theme: t })),
					),
			  )
			: null;
	}
	function PP({ connection: e, theme: t }) {
		let n = bP.get(e.type),
			i = n.getPlatformUserUrl?.(e),
			r = o('img', {
				'aria-label': e.name,
				src: t === 'light' ? n.icon.lightSVG : n.icon.darkSVG,
				style: { width: Ca.store.iconSize, height: Ca.store.iconSize },
			}),
			s = i ? Ks : bv;
		return o(
			W,
			{
				text: o(
					'span',
					{ className: 'vc-sc-tooltip' },
					e.name,
					e.verified && o(w0, null),
					o(s, { height: 16, width: 16 }),
				),
				key: e.id,
			},
			(l) =>
				i
					? o(
							'a',
							{
								...l,
								className: 'vc-user-connection',
								href: i,
								target: '_blank',
							},
							r,
					  )
					: o(
							'button',
							{
								...l,
								className: 'vc-user-connection',
								onClick: () => ln(e.name),
							},
							r,
					  ),
		);
	}
	var yP,
		vP,
		SP,
		bP,
		TP,
		xP,
		Ca,
		wP,
		MP,
		Jd,
		I0 = m(() => {
			'use strict';
			a();
			T0();
			E();
			re();
			xt();
			Bo();
			w();
			de();
			ye();
			T();
			_();
			x();
			M0();
			(yP = oe(() => He('().lastSection'))),
				(vP = ue('UserProfileStore')),
				(SP = ue('ThemeStore')),
				(bP = P('isSupported', 'getByUrl')),
				(TP = ce(',"--profile-gradient-primary-color"')),
				(xP = (e) => (e ?? 0) * 2 + 4),
				(Ca = N({
					iconSize: {
						type: 1,
						description: 'Icon size (px)',
						default: 32,
					},
					iconSpacing: {
						type: 4,
						description: 'Icon margin',
						default: 1,
						options: [
							{ label: 'Compact', value: 0 },
							{ label: 'Cozy', value: 1 },
							{ label: 'Roomy', value: 2 },
						],
					},
				})),
				(wP = k.wrap((e) =>
					o(P0, {
						id: e.user.id,
						theme: TP(e.user, e.displayProfile).profileTheme,
					}),
				)),
				(MP = k.wrap((e) =>
					o(P0, { id: e.channel.recipients[0], theme: SP.theme }),
				));
			Jd = g({
				name: 'ShowConnections',
				description: 'Show connected accounts in user popouts',
				authors: [p.TheKodeToad],
				patches: [
					{
						find: '.Messages.BOT_PROFILE_SLASH_COMMANDS',
						replacement: {
							match: /,theme:\i\}\)(?=,.{0,100}setNote:)/,
							replace:
								'$&,$self.profilePopoutComponent(arguments[0])',
						},
					},
					{
						find: '"Profile Panel: user cannot be undefined"',
						replacement: {
							match: /\(0,\i\.jsx\)\(\i\.\i,\{\}\).{0,100}setNote:/,
							replace:
								'$self.profilePanelComponent(arguments[0]),$&',
						},
					},
				],
				settings: Ca,
				profilePopoutComponent: wP,
				profilePanelComponent: MP,
			});
		});
	var R0 = m(() => {});
	function N0(e) {
		A0 = e;
	}
	function OP({ channel: e }) {
		let [t, n] = V(To.store.defaultAllowedUsersAndRolesDropdownState),
			[i, r] = V([]),
			{
				type: s,
				topic: l,
				lastMessageId: c,
				defaultForumLayout: u,
				lastPinTimestamp: h,
				defaultAutoArchiveDuration: f,
				availableTags: v,
				id: S,
				rateLimitPerUser: b,
				defaultThreadRateLimitPerUser: A,
				defaultSortOrder: C,
				defaultReactionEmoji: D,
				bitrate: B,
				rtcRegion: O,
				videoQualityMode: K,
				permissionOverwrites: ee,
				guild_id: j,
			} = e;
		return (
			tt(() => {
				let z = [],
					te = le.getGuild(j).ownerId;
				ke.getMember(j, te) || z.push(te),
					Object.values(ee).forEach(({ type: $, id: Re }) => {
						$ === 1 && !ke.getMember(j, Re) && z.push(Re);
					}),
					z.length > 0 &&
						L.dispatch({
							type: 'GUILD_MEMBERS_REQUEST',
							guildIds: [j],
							userIds: z,
						}),
					M.plugins.PermissionsViewer.enabled &&
						r(
							Xs(
								Object.values(ee).map(($) => ({
									type: $.type,
									id: $.id,
									overwriteAllow: $.allow,
									overwriteDeny: $.deny,
								})),
								j,
							),
						);
			}, [S]),
			o(
				'div',
				{
					className:
						C0.auto +
						' ' +
						C0.customTheme +
						' ' +
						IP.chatContent +
						' shc-lock-screen-outer-container',
				},
				o(
					'div',
					{ className: 'shc-lock-screen-container' },
					o('img', { className: 'shc-lock-screen-logo', src: DP }),
					o(
						'div',
						{ className: 'shc-lock-screen-heading-container' },
						o(
							q,
							{ variant: 'heading-xxl/bold' },
							'This is a ',
							et.can(Qd, e) ? 'locked' : 'hidden',
							' ',
							NP[s],
							' channel.',
						),
						e.isNSFW() &&
							o(
								W,
								{ text: 'NSFW' },
								({ onMouseLeave: z, onMouseEnter: te }) =>
									o(
										'svg',
										{
											onMouseLeave: z,
											onMouseEnter: te,
											className:
												'shc-lock-screen-heading-nsfw-icon',
											width: '32',
											height: '32',
											viewBox: '0 0 48 48',
											'aria-hidden': !0,
											role: 'img',
										},
										o('path', {
											fill: 'currentColor',
											d: 'M.7 43.05 24 2.85l23.3 40.2Zm23.55-6.25q.75 0 1.275-.525.525-.525.525-1.275 0-.75-.525-1.3t-1.275-.55q-.8 0-1.325.55-.525.55-.525 1.3t.55 1.275q.55.525 1.3.525Zm-1.85-6.1h3.65V19.4H22.4Z',
										}),
									),
							),
					),
					!e.isGuildVoice() &&
						!e.isGuildStageVoice() &&
						o(
							q,
							{ variant: 'text-lg/normal' },
							'You can not see the ',
							e.isForumChannel() ? 'posts' : 'messages',
							' of this channel.',
							e.isForumChannel() &&
								l &&
								l.length > 0 &&
								' However you may see its guidelines:',
						),
					e.isForumChannel() &&
						l &&
						l.length > 0 &&
						o(
							'div',
							{ className: 'shc-lock-screen-topic-container' },
							Pe.parseTopic(l, !1, { channelId: S }),
						),
					c &&
						o(
							q,
							{ variant: 'text-md/normal' },
							'Last ',
							e.isForumChannel() ? 'post' : 'message',
							' created:',
							o(In, { timestamp: Zt(Jo.extractTimestamp(c)) }),
						),
					h &&
						o(
							q,
							{ variant: 'text-md/normal' },
							'Last message pin: ',
							o(In, { timestamp: Zt(h) }),
						),
					(b ?? 0) > 0 &&
						o(
							q,
							{ variant: 'text-md/normal' },
							'Slowmode: ',
							Bi(b, 'seconds'),
						),
					(A ?? 0) > 0 &&
						o(
							q,
							{ variant: 'text-md/normal' },
							'Default thread slowmode: ',
							Bi(A, 'seconds'),
						),
					(e.isGuildVoice() || e.isGuildStageVoice()) &&
						B != null &&
						o(
							q,
							{ variant: 'text-md/normal' },
							'Bitrate: ',
							B,
							' bits',
						),
					O !== void 0 &&
						o(
							q,
							{ variant: 'text-md/normal' },
							'Region: ',
							O ?? 'Automatic',
						),
					(e.isGuildVoice() || e.isGuildStageVoice()) &&
						o(
							q,
							{ variant: 'text-md/normal' },
							'Video quality mode: ',
							EP[K ?? 1],
						),
					(f ?? 0) > 0 &&
						o(
							q,
							{ variant: 'text-md/normal' },
							'Default inactivity duration before archiving ',
							e.isForumChannel() ? 'posts' : 'threads',
							':',
							' ' + Bi(f, 'minutes'),
						),
					u != null &&
						o(
							q,
							{ variant: 'text-md/normal' },
							'Default layout: ',
							LP[u],
						),
					C != null &&
						o(
							q,
							{ variant: 'text-md/normal' },
							'Default sort order: ',
							kP[C],
						),
					D != null &&
						o(
							'div',
							{
								className:
									'shc-lock-screen-default-emoji-container',
							},
							o(
								q,
								{ variant: 'text-md/normal' },
								'Default reaction emoji:',
							),
							Pe.defaultRules[
								D.emojiName ? 'emoji' : 'customEmoji'
							].react(
								{
									name: D.emojiName
										? CP.convertSurrogateToName(D.emojiName)
										: un.getCustomEmojiById(D.emojiId)
												?.name ?? '',
									emojiId: D.emojiId ?? void 0,
									surrogate: D.emojiName ?? void 0,
									src: D.emojiName
										? AP.getURL(D.emojiName)
										: void 0,
								},
								void 0,
								{ key: '0' },
							),
						),
					e.hasFlag(16) &&
						o(
							q,
							{ variant: 'text-md/normal' },
							'Posts on this forum require a tag to be set.',
						),
					v &&
						v.length > 0 &&
						o(
							'div',
							{ className: 'shc-lock-screen-tags-container' },
							o(
								q,
								{ variant: 'text-lg/bold' },
								'Available tags:',
							),
							o(
								'div',
								{ className: 'shc-lock-screen-tags' },
								v.map((z) => o(RP, { tag: z })),
							),
						),
					o(
						'div',
						{
							className:
								'shc-lock-screen-allowed-users-and-roles-container',
						},
						o(
							'div',
							{
								className:
									'shc-lock-screen-allowed-users-and-roles-container-title',
							},
							M.plugins.PermissionsViewer.enabled &&
								o(
									W,
									{ text: 'Permission Details' },
									({ onMouseLeave: z, onMouseEnter: te }) =>
										o(
											'button',
											{
												onMouseLeave: z,
												onMouseEnter: te,
												className:
													'shc-lock-screen-allowed-users-and-roles-container-permdetails-btn',
												onClick: () =>
													pi(
														i,
														le.getGuild(e.guild_id),
														e.name,
													),
											},
											o(
												'svg',
												{
													width: '24',
													height: '24',
													viewBox: '0 0 24 24',
												},
												o('path', {
													fill: 'currentColor',
													d: 'M7 12.001C7 10.8964 6.10457 10.001 5 10.001C3.89543 10.001 3 10.8964 3 12.001C3 13.1055 3.89543 14.001 5 14.001C6.10457 14.001 7 13.1055 7 12.001ZM14 12.001C14 10.8964 13.1046 10.001 12 10.001C10.8954 10.001 10 10.8964 10 12.001C10 13.1055 10.8954 14.001 12 14.001C13.1046 14.001 14 13.1055 14 12.001ZM19 10.001C20.1046 10.001 21 10.8964 21 12.001C21 13.1055 20.1046 14.001 19 14.001C17.8954 14.001 17 13.1055 17 12.001C17 10.8964 17.8954 10.001 19 10.001Z',
												}),
											),
										),
								),
							o(
								q,
								{ variant: 'text-lg/bold' },
								'Allowed users and roles:',
							),
							o(
								W,
								{
									text: t
										? 'Hide Allowed Users and Roles'
										: 'View Allowed Users and Roles',
								},
								({ onMouseLeave: z, onMouseEnter: te }) =>
									o(
										'button',
										{
											onMouseLeave: z,
											onMouseEnter: te,
											className:
												'shc-lock-screen-allowed-users-and-roles-container-toggle-btn',
											onClick: () => n(($) => !$),
										},
										o(
											'svg',
											{
												width: '24',
												height: '24',
												viewBox: '0 0 24 24',
												transform: t
													? 'scale(1 -1)'
													: 'scale(1 1)',
											},
											o('path', {
												fill: 'currentColor',
												d: 'M16.59 8.59003L12 13.17L7.41 8.59003L6 10L12 16L18 10L16.59 8.59003Z',
											}),
										),
									),
							),
						),
						t && o(A0, { channel: e }),
					),
				),
			)
		);
	}
	var A0,
		C0,
		IP,
		RP,
		CP,
		AP,
		NP,
		kP,
		LP,
		EP,
		DP,
		k0,
		L0 = m(() => {
			'use strict';
			a();
			E();
			re();
			ye();
			ro();
			_();
			x();
			mr();
			dr();
			Vd();
			(C0 = P('auto', 'content', 'scrollerBase')),
				(IP = P('chat', 'content', 'noChat', 'chatContent')),
				(RP = oe(() =>
					ht((e) => {
						if (typeof e != 'function') return !1;
						let t = Function.prototype.toString.call(e);
						return (
							t.includes(
								'.Messages.FORUM_TAG_A11Y_FILTER_BY_TAG',
							) && !t.includes('increasedActivityPill')
						);
					}),
				)),
				(CP = P('convertSurrogateToName')),
				(AP = P('getURL', 'buildEmojiReactionColorsPlatformed')),
				(NP = {
					[0]: 'text',
					[5]: 'announcement',
					[15]: 'forum',
					[2]: 'voice',
					[13]: 'stage',
				}),
				(kP = { [0]: 'Latest activity', [1]: 'Creation date' }),
				(LP = {
					[0]: 'Not set',
					[1]: 'List view',
					[2]: 'Gallery view',
				}),
				(EP = { [1]: 'Automatic', [2]: '720p' }),
				(DP = '/assets/433e3ec4319a9d11b0cbe39342614982.svg');
			k0 = k.wrap(OP);
		});
	var E0,
		Qd,
		em,
		To,
		tm,
		Vd = m(() => {
			'use strict';
			a();
			R0();
			E();
			re();
			w();
			Fi();
			T();
			_();
			x();
			L0();
			(E0 = P('channelName', 'subtitle', 'modeMuted', 'iconContainer')),
				(Qd = 1n << 10n),
				(em = 1n << 20n),
				(To = N({
					hideUnreads: {
						description: 'Hide Unreads',
						type: 3,
						default: !0,
						restartNeeded: !0,
					},
					showMode: {
						description:
							'The mode used to display hidden channels.',
						type: 4,
						options: [
							{
								label: 'Plain style with Lock Icon instead',
								value: 0,
								default: !0,
							},
							{
								label: 'Muted style with hidden eye icon on the right',
								value: 1,
							},
						],
						restartNeeded: !0,
					},
					defaultAllowedUsersAndRolesDropdownState: {
						description:
							'Whether the allowed users and roles dropdown on hidden channels should be open by default',
						type: 3,
						default: !0,
					},
				})),
				(tm = g({
					name: 'ShowHiddenChannels',
					description:
						'Show channels that you do not have access to view.',
					authors: [
						p.BigDuck,
						p.AverageReactEnjoyer,
						p.D3SOX,
						p.Ven,
						p.Nuckyz,
						p.Nickyux,
						p.dzshn,
					],
					settings: To,
					patches: [
						{
							find: '.CannotShow=',
							replacement: [
								{
									match: /(?<=isChannelGatedAndVisible\(this\.record\.guild_id,this\.record\.id\).+?renderLevel:)(\i)\..+?(?=,)/,
									replace: (e, t) =>
										`this.category.isCollapsed?${t}.WouldShowIfUncollapsed:${t}.Show`,
								},
								{
									match: /(?<=(if\(!\i\.\i\.can\(\i\.\i\.VIEW_CHANNEL.+?{)if\(this\.id===\i\).+?};)(if\(!\i\.\i\.isChannelGatedAndVisible\(.+?})(.+?)(?=return{renderLevel:\i\.Show.{0,40}?return \i)/,
									replace: (e, t, n, i) => `${i}${t}${n}}`,
								},
								{
									match: /(?<=renderLevel:(\i\(this,\i\)\?\i\.Show:\i\.WouldShowIfUncollapsed).+?renderLevel:).+?(?=,)/,
									replace: (e, t) => t,
								},
								{
									match: /(?<=activeJoinedRelevantThreads.+?renderLevel:.+?,threadIds:\i\(this.record.+?renderLevel:)(\i)\..+?(?=,)/,
									replace: (e, t) => `${t}.Show`,
								},
								{
									match: /(?<=getRenderLevel=function.+?return ).+?\?(.+?):\i\.CannotShow(?=})/,
									replace: (e, t) => t,
								},
							],
						},
						{
							find: 'VoiceChannel, transitionTo: Channel does not have a guildId',
							replacement: [
								{
									match: /(?<=getCurrentClientVoiceChannelId\((\i)\.guild_id\);if\()/,
									replace: (e, t) =>
										`!$self.isHiddenChannel(${t})&&`,
								},
								{
									match: /if\(!\i&&!\i(?=.{0,50}?selectVoiceChannel\((\i)\.id\))/,
									replace: (e, t) =>
										`${e}&&!$self.isHiddenChannel(${t})`,
								},
								{
									match: /!__OVERLAY__&&\((?<=selectVoiceChannel\((\i)\.id\).+?)/,
									replace: (e, t) =>
										`${e}$self.isHiddenChannel(${t},true)||`,
								},
							],
						},
						{
							find: 'VoiceChannel.renderPopout: There must always be something to render',
							replacement: [
								...[
									'renderEditButton',
									'renderInviteButton',
									'renderOpenChatButton',
								].map((e) => ({
									match: new RegExp(
										`(?<=${e}=function\\(\\){)`,
										'g',
									),
									replace:
										'if($self.isHiddenChannel(this.props.channel))return null;',
								})),
							],
						},
						{
							find: '.Messages.CHANNEL_TOOLTIP_DIRECTORY',
							predicate: () => To.store.showMode === 0,
							replacement: {
								match: /(?=switch\((\i)\.type\).{0,30}\.GUILD_ANNOUNCEMENT.{0,30}\(0,\i\.\i\))/,
								replace: (e, t) =>
									`if($self.isHiddenChannel(${t}))return $self.LockIcon;`,
							},
						},
						{
							find: '.UNREAD_HIGHLIGHT',
							predicate: () => To.store.showMode === 1,
							replacement: [
								{
									match: /(?<=\i\.name,\i=)(?=(\i)\.muted)/,
									replace: (e, t) =>
										`$self.isHiddenChannel(${t}.channel)?true:`,
								},
								{
									match: /\(\).children.+?:null(?<=(\i)=\i\.channel,.+?)/,
									replace: (e, t) =>
										`${e},$self.isHiddenChannel(${t})?$self.HiddenChannelIcon():null`,
								},
								{
									match: /(?<=\.wrapper:\i\(\)\.notInteractive,)(.+?)((\i)\?\i\.MUTED)/,
									replace: (e, t, n, i) =>
										`${n}:"",${t}${i}?""`,
								},
							],
						},
						{
							find: '.UNREAD_HIGHLIGHT',
							replacement: [
								{
									predicate: () =>
										To.store.hideUnreads === !1 &&
										To.store.showMode === 1,
									match: /\.LOCKED:\i(?<=(\i)=\i\.channel,.+?)/,
									replace: (e, t) =>
										`${e}&&!$self.isHiddenChannel(${t})`,
								},
								{
									predicate: () =>
										To.store.hideUnreads === !0,
									match: /(?<=\i\.connected,\i=)(?=(\i)\.unread)/,
									replace: (e, t) =>
										`$self.isHiddenChannel(${t}.channel)?false:`,
								},
							],
						},
						{
							find: '.displayName="ChannelListUnreadsStore"',
							replacement: {
								match: /(?<=return null!=(\i))(?=.{0,130}?hasRelevantUnread\(\i\))/g,
								replace: (e, t) =>
									`&&!$self.isHiddenChannel(${t})`,
							},
						},
						{
							find: 'Missing channel in Channel.renderHeaderToolbar',
							replacement: [
								{
									match: /(?<=renderHeaderToolbar=function.+?case \i\.\i\.GUILD_TEXT:)(?=.+?;(.+?{channel:(\i)},"notifications"\)\);))/,
									replace: (e, t, n) =>
										`if($self.isHiddenChannel(${n})){${t}break;}`,
								},
								{
									match: /(?<=renderHeaderToolbar=function.+?case \i\.\i\.GUILD_FORUM:.+?if\(!\i\){)(?=.+?;(.+?{channel:(\i)},"notifications"\)\)))/,
									replace: (e, t, n) =>
										`if($self.isHiddenChannel(${n})){${t};break;}`,
								},
								{
									match: /renderMobileToolbar=function.+?case \i\.\i\.GUILD_FORUM:(?<=(\i)\.renderMobileToolbar.+?)/,
									replace: (e, t) =>
										`${e}if($self.isHiddenChannel(${t}.props.channel))break;`,
								},
								{
									match: /(?<=renderHeaderBar=function.+?hideSearch:(\i)\.isDirectory\(\))/,
									replace: (e, t) =>
										`||$self.isHiddenChannel(${t})`,
								},
								{
									match: /(?<=renderSidebar=function\(\){)/,
									replace:
										'if($self.isHiddenChannel(this.props.channel))return null;',
								},
								{
									match: /(?<=renderChat=function\(\){)/,
									replace:
										'if($self.isHiddenChannel(this.props.channel))return $self.HiddenChannelLockScreen(this.props.channel);',
								},
							],
						},
						{
							find: '"MessageManager"',
							replacement: {
								match: /"Skipping fetch because channelId is a static route"\);else{(?=.+?getChannel\((\i)\))/,
								replace: (e, t) =>
									`${e}if($self.isHiddenChannel({channelId:${t}}))return;`,
							},
						},
						{
							find: '"alt+shift+down"',
							replacement: {
								match: /(?<=getChannel\(\i\);return null!=(\i))(?=.{0,130}?hasRelevantUnread\(\i\))/,
								replace: (e, t) =>
									`&&!$self.isHiddenChannel(${t})`,
							},
						},
						{
							find: '"alt+down"',
							replacement: {
								match: /(?<=getState\(\)\.channelId.{0,30}?\(0,\i\.\i\)\(\i\))(?=\.map\()/,
								replace:
									'.filter(ch=>!$self.isHiddenChannel(ch))',
							},
						},
						{
							find: '.Messages.ROLE_REQUIRED_SINGLE_USER_MESSAGE',
							replacement: [
								{
									match: /computePermissionsForRoles.+?}\)}(?<=function (\i)\(.+?)(?=var)/,
									replace: (e, t) =>
										`${e}$self.setChannelBeginHeaderComponent(${t});`,
								},
								{
									match: /ADMINISTRATOR\)\|\|(?<=context:(\i)}.+?)(?=(.+?)VIEW_CHANNEL)/,
									replace: (e, t, n) =>
										`${e}!Vencord.Webpack.Common.PermissionStore.can(${em}n,${t})?${n}CONNECT):`,
								},
								{
									match: /permissionOverwrites\[.+?\i=(?<=context:(\i)}.+?)(?=(.+?)VIEW_CHANNEL)/,
									replace: (e, t, n) =>
										`${e}!Vencord.Webpack.Common.PermissionStore.can(${em}n,${t})?${n}CONNECT):`,
								},
								{
									match: /sortBy.{0,100}?return (?<=var (\i)=\i\.channel.+?)(?=\i\.id)/,
									replace: (e, t) =>
										`${e}$self.isHiddenChannel(${t})?true:`,
								},
								{
									match: /computePermissionsForRoles.+?.value\(\)(?<=var (\i)=\i\.channel.+?)/,
									replace: (e, t) =>
										`${e}.reduce(...$self.makeAllowedRolesReduce(${t}.guild_id))`,
								},
								{
									match: /MANAGE_ROLES.{0,60}?return(?=\(.+?(\(0,\i\.jsxs\)\("div",{className:\i\(\)\.members.+?guildId:(\i)\.guild_id.+?roleColor.+?]}\)))/,
									replace: (e, t, n) => (
										(t = t.replace(
											No(/(?<=users:\i)/),
											`,channel:${n}`,
										)),
										(t = t.replace(
											No(/1!==\i\.length/),
											'true',
										)),
										`${e} $self.isHiddenChannel(${n},true)?${t}:`
									),
								},
							],
						},
						{
							find: '().avatars),children',
							replacement: [
								{
									match: /=(\i)\.maxUsers,/,
									replace: (e, t) =>
										`${e}channel=${t}.channel,`,
								},
								{
									match: /\i>0(?=&&.{0,60}renderPopout)/,
									replace: (e) =>
										`($self.isHiddenChannel(typeof channel!=="undefined"?channel:void 0,true)?true:${e})`,
								},
								{
									match: /(?<=\.value\(\),(\i)=.+?length-)1(?=\]=.{0,60}renderPopout)/,
									replace: (e, t) =>
										`($self.isHiddenChannel(typeof channel!=="undefined"?channel:void 0,true)&&${t}<=0?0:1)`,
								},
								{
									match: /(?<="\+",)(\i)\+1/,
									replace: (e, t) =>
										`$self.isHiddenChannel(typeof channel!=="undefined"?channel:void 0,true)&&${t}<=0?"":${e}`,
								},
							],
						},
						{
							find: '.Messages.SHOW_CHAT',
							replacement: [
								{
									match: /"more-options-popout"\)\);if\((?<=function \i\((\i)\).+?)/,
									replace: (e, t) =>
										`${e}!${t}.inCall&&$self.isHiddenChannel(${t}.channel,true)){}else if(`,
								},
								{
									match: /"popup".{0,100}?if\((?<=(\i)\.channel.+?)/,
									replace: (e, t) =>
										`${e}(${t}.inCall||!$self.isHiddenChannel(${t}.channel,true))&&`,
								},
								{
									match: /this\.renderVoiceChannelEffects.+?children:(?<=renderContent=function.+?)/,
									replace:
										'$&!this.props.inCall&&$self.isHiddenChannel(this.props.channel,true)?$self.HiddenChannelLockScreen(this.props.channel):',
								},
								{
									match: /this\.renderVoiceChannelEffects.+?disableGradients:(?<=renderContent=function.+?)/,
									replace:
										'$&!this.props.inCall&&$self.isHiddenChannel(this.props.channel,true)||',
								},
								{
									match: /(?:{|,)render(?!Header|ExternalHeader).{0,30}?:(?<=renderContent=function.+?)(?!void)/g,
									replace:
										'$&!this.props.inCall&&$self.isHiddenChannel(this.props.channel,true)?null:',
								},
								{
									match: /callContainer,(?<=\(\)\.callContainer,)/,
									replace:
										'$&!this.props.inCall&&$self.isHiddenChannel(this.props.channel,true)?"":',
								},
							],
						},
						{
							find: 'Guild voice channel without guild id.',
							replacement: [
								{
									match: /Guild voice channel without guild id.+?children:(?<=(\i)\.getGuildId\(\).+?)(?=.{0,20}?}\)}function)/,
									replace: (e, t) =>
										`${e}$self.isHiddenChannel(${t})?$self.HiddenChannelLockScreen(${t}):`,
								},
								{
									match: /render(?!Header).{0,30}?:(?<=(\i)\.getGuildId\(\).+?Guild voice channel without guild id.+?)/g,
									replace: (e, t) =>
										`${e}$self.isHiddenChannel(${t})?null:`,
								},
								{
									match: /(?=!\i&&!\i&&!\i.{0,80}?(\i)\.getGuildId\(\).{0,50}?Guild voice channel without guild id)(?<=if\()/,
									replace: (e, t) =>
										`!$self.isHiddenChannel(${t})&&`,
								},
								{
									match: /Guild voice channel without guild id.+?disableGradients:(?<=(\i)\.getGuildId\(\).+?)/,
									replace: (e, t) =>
										`${e}$self.isHiddenChannel(${t})||`,
								},
								{
									match: /Guild voice channel without guild id.+?style:(?<=(\i)\.getGuildId\(\).+?)/,
									replace: (e, t) =>
										`${e}$self.isHiddenChannel(${t})?undefined:`,
								},
								{
									match: /\(0,\i\.jsx\)\(\i\.\i\.Divider.+?}\)]}\)(?=.+?:(\i)\.guild_id)/,
									replace: (e, t) =>
										`$self.isHiddenChannel(${t})?null:(${e})`,
								},
								{
									match: /"recents".+?null,(?=.+?channelId:(\i)\.id,showRequestToSpeakSidebar)/,
									replace: (e, t) =>
										`${e}!$self.isHiddenChannel(${t})&&`,
								},
							],
						},
						{
							find: '"^/guild-stages/(\\\\d+)(?:/)?(\\\\d+)?"',
							replacement: {
								match: /\i\.\i\.can\(\i\.\i\.VIEW_CHANNEL,\i\)/,
								replace: 'true',
							},
						},
						{
							find: '.shouldCloseDefaultModals',
							replacement: {
								match: /(?<=getChannel\((\i)\)\)(?=.{0,100}?selectVoiceChannel))/,
								replace: (e, t) =>
									`&&!$self.isHiddenChannel({channelId:${t}})`,
							},
						},
						{
							find: '.displayName="GuildChannelStore"',
							replacement: [
								{
									match: /isChannelGated\(.+?\)(?=\|\|)/,
									replace: (e) => `${e}||true`,
								},
								{
									match: /(?<=getChannels=function\(\i)\).+?(?=return (\i)})/,
									replace: (e, t) =>
										`,shouldIncludeHidden=false${e}${t}=$self.resolveGuildChannels(${t},shouldIncludeHidden);`,
								},
							],
						},
						{
							find: '.Messages.FORM_LABEL_MUTED',
							replacement: {
								match: /(?<=getChannels\(\i)(?=\))/,
								replace: ',true',
							},
						},
					],
					setChannelBeginHeaderComponent: N0,
					isHiddenChannel(e, t = !1) {
						return !e ||
							(e.channelId && (e = X.getChannel(e.channelId)),
							!e ||
								e.isDM() ||
								e.isGroupDM() ||
								e.isMultiUserDM())
							? !1
							: !et.can(Qd, e) || (t && !et.can(em, e));
					},
					resolveGuildChannels(e, t) {
						if (t) return e;
						let n = {};
						for (let [i, r] of Object.entries(e)) {
							if (!Array.isArray(r)) {
								n[i] = r;
								continue;
							}
							n[i] ??= [];
							for (let s of r)
								(s.channel.id === null ||
									!this.isHiddenChannel(s.channel)) &&
									n[i].push(s);
						}
						return n;
					},
					makeAllowedRolesReduce(e) {
						return [
							(t, n, i, r) => {
								if (i !== 0) return t;
								let s = r.find((l) => l.id === e);
								return s ? [s] : r;
							},
							[],
						];
					},
					HiddenChannelLockScreen: (e) => o(k0, { channel: e }),
					LockIcon: () =>
						o(
							'svg',
							{
								className: E0.icon,
								height: '18',
								width: '20',
								viewBox: '0 0 24 24',
								'aria-hidden': !0,
								role: 'img',
							},
							o('path', {
								className: 'shc-evenodd-fill-current-color',
								d: 'M17 11V7C17 4.243 14.756 2 12 2C9.242 2 7 4.243 7 7V11C5.897 11 5 11.896 5 13V20C5 21.103 5.897 22 7 22H17C18.103 22 19 21.103 19 20V13C19 11.896 18.103 11 17 11ZM12 18C11.172 18 10.5 17.328 10.5 16.5C10.5 15.672 11.172 15 12 15C12.828 15 13.5 15.672 13.5 16.5C13.5 17.328 12.828 18 12 18ZM15 11H9V7C9 5.346 10.346 4 12 4C13.654 4 15 5.346 15 7V11Z',
							}),
						),
					HiddenChannelIcon: k.wrap(
						() =>
							o(
								W,
								{ text: 'Hidden Channel' },
								({ onMouseLeave: e, onMouseEnter: t }) =>
									o(
										'svg',
										{
											onMouseLeave: e,
											onMouseEnter: t,
											className:
												E0.icon +
												' shc-hidden-channel-icon',
											width: '24',
											height: '24',
											viewBox: '0 0 24 24',
											'aria-hidden': !0,
											role: 'img',
										},
										o('path', {
											className:
												'shc-evenodd-fill-current-color',
											d: 'm19.8 22.6-4.2-4.15q-.875.275-1.762.413Q12.95 19 12 19q-3.775 0-6.725-2.087Q2.325 14.825 1 11.5q.525-1.325 1.325-2.463Q3.125 7.9 4.15 7L1.4 4.2l1.4-1.4 18.4 18.4ZM12 16q.275 0 .512-.025.238-.025.513-.1l-5.4-5.4q-.075.275-.1.513-.025.237-.025.512 0 1.875 1.312 3.188Q10.125 16 12 16Zm7.3.45-3.175-3.15q.175-.425.275-.862.1-.438.1-.938 0-1.875-1.312-3.188Q13.875 7 12 7q-.5 0-.938.1-.437.1-.862.3L7.65 4.85q1.025-.425 2.1-.638Q10.825 4 12 4q3.775 0 6.725 2.087Q21.675 8.175 23 11.5q-.575 1.475-1.512 2.738Q20.55 15.5 19.3 16.45Zm-4.625-4.6-3-3q.7-.125 1.288.112.587.238 1.012.688.425.45.613 1.038.187.587.087 1.162Z',
										}),
									),
							),
						{ noop: !0 },
					),
				}));
		});
	var D0 = m(() => {});
	var Aa,
		nm,
		O0 = m(() => {
			'use strict';
			a();
			D0();
			E();
			w();
			T();
			(Aa = N({
				mode: {
					type: 4,
					description: 'How to display usernames and nicks',
					options: [
						{
							label: 'Username then nickname',
							value: 'user-nick',
							default: !0,
						},
						{ label: 'Nickname then username', value: 'nick-user' },
						{ label: 'Username only', value: 'user' },
					],
				},
				inReplies: {
					type: 3,
					default: !1,
					description: 'Also apply functionality to reply previews',
				},
			})),
				(nm = g({
					name: 'ShowMeYourName',
					description:
						'Display usernames next to nicks, or no nicks at all',
					authors: [p.dzshn],
					patches: [
						{
							find: '.withMentionPrefix',
							replacement: {
								match: /(?<=onContextMenu:\i,children:)\i\+\i/,
								replace: '$self.renderUsername(arguments[0])',
							},
						},
					],
					settings: Aa,
					renderUsername: ({
						author: e,
						message: t,
						isRepliedMessage: n,
						withMentionPrefix: i,
					}) => {
						if (t.interaction) return e?.nick;
						try {
							let { username: r } = t.author,
								{ nick: s } = e,
								l = i ? '@' : '';
							return r === s || (n && !Aa.store.inReplies)
								? l + s
								: Aa.store.mode === 'user-nick'
								? o(
										d,
										null,
										l,
										r,
										' ',
										o(
											'span',
											{ className: 'vc-smyn-suffix' },
											s,
										),
								  )
								: Aa.store.mode === 'nick-user'
								? o(
										d,
										null,
										l,
										s,
										' ',
										o(
											'span',
											{ className: 'vc-smyn-suffix' },
											r,
										),
								  )
								: l + r;
						} catch {
							return e?.nick;
						}
					},
				}));
		});
	function _P(e) {
		let [t, n] = I.useState(om);
		function i(r) {
			im.store.persistState && (om = r), n(r);
		}
		return (
			I.useEffect(() => {
				let r = (s, l) => {
					t &&
						(im.store.autoDisable && i(!1),
						l.content.startsWith('@silent ') ||
							(l.content = '@silent ' + l.content));
				};
				return rt(r), () => void st(r);
			}, [t]),
			e.type.analyticsName !== 'normal'
				? null
				: o(
						W,
						{
							text: t
								? 'Disable Silent Message'
								: 'Enable Silent Message',
						},
						(r) =>
							o(
								'div',
								{ style: { display: 'flex' } },
								o(
									R,
									{
										...r,
										onClick: () => i(!t),
										size: '',
										look: Wt.BLANK,
										innerClassName: pt.button,
										style: { padding: '0 6px' },
									},
									o(
										'div',
										{ className: pt.buttonWrapper },
										o(
											'svg',
											{
												width: '24',
												height: '24',
												viewBox: '0 0 24 24',
											},
											o(
												'g',
												{ fill: 'currentColor' },
												o('path', {
													d: 'M18 10.7101C15.1085 9.84957 13 7.17102 13 4C13 3.69264 13.0198 3.3899 13.0582 3.093C12.7147 3.03189 12.3611 3 12 3C8.686 3 6 5.686 6 9V14C6 15.657 4.656 17 3 17V18H21V17C19.344 17 18 15.657 18 14V10.7101ZM8.55493 19C9.24793 20.19 10.5239 21 11.9999 21C13.4759 21 14.7519 20.19 15.4449 19H8.55493Z',
												}),
												o('path', {
													d: 'M18.2624 5.50209L21 2.5V1H16.0349V2.49791H18.476L16 5.61088V7H21V5.50209H18.2624Z',
												}),
												!t &&
													o('line', {
														x1: '22',
														y1: '2',
														x2: '2',
														y2: '22',
														stroke: 'var(--red-500)',
														'stroke-width': '2.5',
													}),
											),
										),
									),
								),
							),
				  )
		);
	}
	var om,
		im,
		rm,
		_0 = m(() => {
			'use strict';
			a();
			gn();
			E();
			re();
			w();
			T();
			x();
			(om = !1),
				(im = N({
					persistState: {
						type: 3,
						description:
							'Whether to persist the state of the silent message toggle when changing channels',
						default: !1,
						onChange(e) {
							e === !1 && (om = !1);
						},
					},
					autoDisable: {
						type: 3,
						description:
							'Automatically disable the silent message toggle again after sending one',
						default: !0,
					},
				}));
			rm = g({
				name: 'SilentMessageToggle',
				authors: [p.Nuckyz, p.CatNoir],
				description:
					'Adds a button to the chat bar to toggle sending a silent message.',
				dependencies: ['MessageEventsAPI'],
				settings: im,
				patches: [
					{
						find: '.activeCommandOption',
						replacement: {
							match: /"gift"\)\);(?<=(\i)\.push.+?disabled:(\i),.+?)/,
							replace: (e, t, n) =>
								`${e};try{${n}||${t}.push($self.SilentMessageToggle(arguments[0]));}catch{}`,
						},
					},
				],
				SilentMessageToggle: k.wrap(_P, { noop: !0 }),
			});
		});
	function FP(e) {
		let { isEnabled: t } = eo.use(['isEnabled']),
			n = () => (eo.store.isEnabled = !eo.store.isEnabled);
		return e.type.analyticsName !== 'normal'
			? null
			: o(
					W,
					{
						text: t
							? 'Disable Silent Typing'
							: 'Enable Silent Typing',
					},
					(i) =>
						o(
							'div',
							{ style: { display: 'flex' } },
							o(
								R,
								{
									...i,
									onClick: n,
									size: '',
									look: Wt.BLANK,
									innerClassName: pt.button,
									style: { padding: '0 6px' },
								},
								o(
									'div',
									{ className: pt.buttonWrapper },
									o(
										'svg',
										{
											width: '24',
											height: '24',
											xmlns: 'http://www.w3.org/2000/svg',
											viewBox: '0 0 576 512',
										},
										o('path', {
											fill: 'currentColor',
											d: 'M528 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM128 180v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm288 0v-40c0-6.627-5.373-12-12-12H172c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h232c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12z',
										}),
										t &&
											o('path', {
												d: 'M13 432L590 48',
												stroke: 'var(--red-500)',
												'stroke-width': '72',
												'stroke-linecap': 'round',
											}),
									),
								),
							),
						),
			  );
	}
	var eo,
		sm,
		F0 = m(() => {
			'use strict';
			a();
			wt();
			E();
			re();
			w();
			T();
			x();
			eo = N({
				showIcon: {
					type: 3,
					default: !1,
					description: 'Show an icon for toggling the plugin',
					restartNeeded: !0,
				},
				isEnabled: {
					type: 3,
					description: 'Toggle functionality',
					default: !0,
				},
			});
			sm = g({
				name: 'SilentTyping',
				authors: [p.Ven, p.dzshn],
				description: 'Hide that you are typing',
				patches: [
					{
						find: 'startTyping:',
						replacement: {
							match: /startTyping:.+?,stop/,
							replace: 'startTyping:$self.startTyping,stop',
						},
					},
					{
						find: '.activeCommandOption',
						predicate: () => eo.store.showIcon,
						replacement: {
							match: /(.)\.push.{1,30}disabled:(\i),.{1,20}\},"gift"\)\)/,
							replace:
								'$&;try{$2||$1.push($self.chatBarIcon(arguments[0]))}catch{}',
						},
					},
				],
				dependencies: ['CommandsAPI'],
				settings: eo,
				commands: [
					{
						name: 'silenttype',
						description:
							"Toggle whether you're hiding that you're typing or not.",
						inputType: 0,
						options: [
							{
								name: 'value',
								description:
									"whether to hide or not that you're typing (default is toggle)",
								required: !1,
								type: 5,
							},
						],
						execute: async (e, t) => {
							(eo.store.isEnabled = !!De(
								e,
								'value',
								!eo.store.isEnabled,
							)),
								ie(t.channel.id, {
									content: eo.store.isEnabled
										? 'Silent typing enabled!'
										: 'Silent typing disabled!',
								});
						},
					},
				],
				async startTyping(e) {
					eo.store.isEnabled ||
						L.dispatch({
							type: 'TYPING_START_LOCAL',
							channelId: e,
						});
				},
				chatBarIcon: k.wrap(FP, { noop: !0 }),
			});
		});
	var am,
		B0 = m(() => {
			'use strict';
			a();
			xt();
			w();
			T();
			x();
			lm();
			am = g({
				name: 'SortFriendRequests',
				authors: [p.Megu],
				description: 'Sorts friend requests by date of receipt',
				patches: [
					{
						find: '.PENDING_INCOMING||',
						replacement: [
							{
								match: /\.sortBy\(\(function\((\w)\){return \w{1,3}\.comparator}\)\)/,
								replace: (e, t) => `.sortBy((function(${t}) {
                return ${t}.type === 3 || ${t}.type === 4
                    ? -Vencord.Plugins.plugins.SortFriendRequests.getSince(${t}.user)
                    : ${t}.comparator
            }))`,
							},
							{
								predicate: () =>
									M.plugins.SortFriendRequests.showDates,
								match: /(user:(\w{1,3}),.{10,30}),subText:(\w{1,3}),(.{10,30}userInfo}\))/,
								replace: (e, t, n, i, r) => `${t},
                subText: Vencord.Plugins.plugins.SortFriendRequests.makeSubtext(${i}, ${n}),
                ${r}`,
							},
						],
					},
				],
				getSince(e) {
					return new Date(Kt.getSince(e.id));
				},
				makeSubtext(e, t) {
					let n = this.getSince(t);
					return o(
						ae,
						{
							flexDirection: 'row',
							style: {
								gap: 0,
								flexWrap: 'wrap',
								lineHeight: '0.9rem',
							},
						},
						o('span', null, e),
						!isNaN(n.getTime()) &&
							o(
								'span',
								null,
								'Received \u2014 ',
								n.toDateString(),
							),
					);
				},
				options: {
					showDates: {
						type: 3,
						description: 'Show dates on friend requests',
						default: !1,
						restartNeeded: !0,
					},
				},
			});
		});
	var $0,
		U0 = m(() => {
			a();
			(window.VencordStyles ??= new Map()).set(
				'src/plugins/spotifyControls/hoverOnly.css',
				{
					name: 'src/plugins/spotifyControls/hoverOnly.css',
					source: `.vc-spotify-button-row {
    height: 0;
    opacity: 0;
    pointer-events: none;
    transition: 0.2s;
    transition-property: height;
}

#vc-spotify-player:hover .vc-spotify-button-row {
    opacity: 1;
    height: 32px;
    pointer-events: auto;

    /* only transition opacity on show to prevent clipping */
    transition-property: height, opacity;
}
`,
					classNames: {},
					dom: null,
				},
			);
			$0 = 'src/plugins/spotifyControls/hoverOnly.css';
		});
	var G0 = m(() => {});
	var he,
		H0 = m(() => {
			'use strict';
			a();
			E();
			rn();
			_();
			x();
			he = ct(() => {
				let { Store: e } = sl,
					t = P('getActiveSocketAndDevice'),
					n = P('SpotifyAPIMarker'),
					i = 'https://api.spotify.com/v1/me/player';
				class r extends e {
					mPosition = 0;
					start = 0;
					track = null;
					device = null;
					isPlaying = !1;
					repeat = 'off';
					shuffle = !1;
					volume = 0;
					isSettingPosition = !1;
					openExternal(c) {
						let u = M.plugins.SpotifyControls.useSpotifyUris
							? 'spotify:' +
							  c.replaceAll('/', (h, f) => (f === 0 ? '' : ':'))
							: 'https://open.spotify.com' + c;
						VencordNative.native.openExternal(u);
					}
					get position() {
						let c = this.mPosition;
						return (
							this.isPlaying && (c += Date.now() - this.start), c
						);
					}
					set position(c) {
						(this.mPosition = c), (this.start = Date.now());
					}
					prev() {
						this.req('post', '/previous');
					}
					next() {
						this.req('post', '/next');
					}
					setVolume(c) {
						this.req('put', '/volume', {
							query: { volume_percent: Math.round(c) },
						}).then(() => {
							(this.volume = c), this.emitChange();
						});
					}
					setPlaying(c) {
						this.req('put', c ? '/play' : '/pause');
					}
					setRepeat(c) {
						this.req('put', '/repeat', { query: { state: c } });
					}
					setShuffle(c) {
						this.req('put', '/shuffle', {
							query: { state: c },
						}).then(() => {
							(this.shuffle = c), this.emitChange();
						});
					}
					seek(c) {
						return this.isSettingPosition
							? Promise.resolve()
							: ((this.isSettingPosition = !0),
							  this.req('put', '/seek', {
									query: { position_ms: Math.round(c) },
							  }).catch((u) => {
									console.error(
										'[VencordSpotifyControls] Failed to seek',
										u,
									),
										(this.isSettingPosition = !1);
							  }));
					}
					req(c, u, h = {}) {
						this.device?.is_active &&
							((h.query ??= {}).device_id = this.device.id);
						let { socket: f } = t.getActiveSocketAndDevice();
						return n[c](f.accountId, f.accessToken, {
							url: i + u,
							...h,
						});
					}
				}
				let s = new r(L, {
					SPOTIFY_PLAYER_STATE(l) {
						(s.track = l.track),
							(s.device = l.device ?? null),
							(s.isPlaying = l.isPlaying ?? !1),
							(s.volume = l.volumePercent ?? 0),
							(s.repeat = l.actual_repeat || 'off'),
							(s.position = l.position ?? 0),
							(s.isSettingPosition = !1),
							s.emitChange();
					},
					SPOTIFY_SET_DEVICES({ devices: l }) {
						(s.device = l.find((c) => c.is_active) ?? l[0] ?? null),
							s.emitChange();
					},
				});
				return s;
			});
		});
	function cm(e) {
		let t = e / 1e3 / 60,
			n = Math.floor(t),
			i = Math.floor((t - n) * 60);
		return `${n.toString().padStart(2, '0')}:${i
			.toString()
			.padStart(2, '0')}`;
	}
	function Ti(e, t) {
		return () =>
			o(
				'svg',
				{
					className: J(xe('button-icon'), xe(t)),
					height: '24',
					width: '24',
					viewBox: '0 0 24 24',
					fill: 'currentColor',
					'aria-label': t,
					focusable: !1,
				},
				o('path', { d: e }),
			);
	}
	function Er(e) {
		return o('button', { className: xe('button'), ...e }, e.children);
	}
	function jP({ name: e, path: t }) {
		let n = `spotify-copy-${e}`,
			i = `spotify-open-${e}`;
		return o(
			F.Menu,
			{
				navId: `spotify-${e}-menu`,
				onClose: () => L.dispatch({ type: 'CONTEXT_MENU_CLOSE' }),
				'aria-label': `Spotify ${e} Menu`,
			},
			o(F.MenuItem, {
				key: n,
				id: n,
				label: `Copy ${e} Link`,
				action: () => ln('https://open.spotify.com' + t),
				icon: Ks,
			}),
			o(F.MenuItem, {
				key: i,
				id: i,
				label: `Open ${e} in Spotify`,
				action: () => he.openExternal(t),
				icon: _o,
			}),
		);
	}
	function um(e, t) {
		return (n) => Fn.open(n, () => o(jP, { name: e, path: t }));
	}
	function WP() {
		let [e, t, n] = Be([he], () => [he.isPlaying, he.shuffle, he.repeat]),
			[i, r] = (() => {
				switch (n) {
					case 'off':
						return ['context', 'repeat-off'];
					case 'context':
						return ['track', 'repeat-context'];
					case 'track':
						return ['off', 'repeat-track'];
					default:
						throw new Error(`Invalid repeat state ${n}`);
				}
			})();
		return o(
			ae,
			{ className: xe('button-row'), style: { gap: 0 } },
			o(
				Er,
				{
					className: J(
						xe('button'),
						xe(t ? 'shuffle-on' : 'shuffle-off'),
					),
					onClick: () => he.setShuffle(!t),
				},
				o(zP, null),
			),
			o(Er, { onClick: () => he.prev() }, o(UP, null)),
			o(
				Er,
				{ onClick: () => he.setPlaying(!e) },
				e ? o($P, null) : o(BP, null),
			),
			o(Er, { onClick: () => he.next() }, o(GP, null)),
			o(
				Er,
				{
					className: J(xe('button'), xe(r)),
					onClick: () => he.setRepeat(i),
					style: { position: 'relative' },
				},
				n === 'track' && o('span', { className: xe('repeat-1') }, '1'),
				o(HP, null),
			),
		);
	}
	function KP() {
		let { duration: e } = he.track,
			[t, n, i] = Be([he], () => [
				he.mPosition,
				he.isSettingPosition,
				he.isPlaying,
			]),
			[r, s] = V(t);
		return (
			tt(() => {
				if (i && !n) {
					s(he.position);
					let l = setInterval(() => {
						s((c) => c + 1e3);
					}, 1e3);
					return () => clearInterval(l);
				}
			}, [t, n, i]),
			o(
				'div',
				{ id: xe('progress-bar') },
				o(
					y.FormText,
					{
						variant: 'text-xs/medium',
						className: xe('progress-time') + ' ' + xe('time-left'),
						'aria-label': 'Progress',
					},
					cm(r),
				),
				o(F.MenuSliderControl, {
					minValue: 0,
					maxValue: e,
					value: r,
					onChange: (l) => {
						n || (s(l), qP(l));
					},
					renderValue: cm,
				}),
				o(
					y.FormText,
					{
						variant: 'text-xs/medium',
						className: xe('progress-time') + ' ' + xe('time-right'),
						'aria-label': 'Total Duration',
					},
					cm(e),
				),
			)
		);
	}
	function YP({ track: e }) {
		let t = Be([he], () => he.volume);
		return o(
			F.Menu,
			{
				navId: 'spotify-album-menu',
				onClose: () => L.dispatch({ type: 'CONTEXT_MENU_CLOSE' }),
				'aria-label': 'Spotify Album Menu',
			},
			o(F.MenuItem, {
				key: 'open-album',
				id: 'open-album',
				label: 'Open Album',
				action: () => he.openExternal(`/album/${e.album.id}`),
				icon: _o,
			}),
			o(F.MenuItem, {
				key: 'view-cover',
				id: 'view-cover',
				label: 'View Album Cover',
				action: () =>
					Vencord.Plugins.plugins.ViewIcons.openImage(
						e.album.image.url,
					),
				icon: Fo,
			}),
			o(F.MenuControlItem, {
				id: 'spotify-volume',
				key: 'spotify-volume',
				label: 'Volume',
				control: (n, i) =>
					o(F.MenuSliderControl, {
						...n,
						ref: i,
						value: t,
						minValue: 0,
						maxValue: 100,
						onChange: Ct((r) => he.setVolume(r)),
					}),
			}),
		);
	}
	function ZP({ track: e }) {
		let t = e?.album?.image,
			[n, i] = V(!1),
			r = o(
				d,
				null,
				t &&
					o('img', {
						id: xe('album-image'),
						src: t.url,
						alt: 'Album Image',
						onClick: () => i(!n),
						onContextMenu: (s) => {
							Fn.open(s, () => o(YP, { track: e }));
						},
					}),
			);
		return n && t
			? o('div', { id: xe('album-expanded-wrapper') }, r)
			: o(
					'div',
					{ id: xe('info-wrapper') },
					r,
					o(
						'div',
						{ id: xe('titles') },
						o(
							y.FormText,
							{
								variant: 'text-sm/semibold',
								id: xe('song-title'),
								className: xe('ellipoverflow'),
								role: e.id ? 'link' : void 0,
								title: e.name,
								onClick: e.id
									? () => {
											he.openExternal(`/track/${e.id}`);
									  }
									: void 0,
								onContextMenu: e.id
									? um('Song', `/track/${e.id}`)
									: void 0,
							},
							e.name,
						),
						e.artists.some((s) => s.name) &&
							o(
								y.FormText,
								{
									variant: 'text-sm/normal',
									className: xe('ellipoverflow'),
								},
								'by\xA0',
								e.artists.map((s, l) =>
									o(
										I.Fragment,
										{ key: s.name },
										o(
											We,
											{
												className: xe('artist'),
												disabled: !s.id,
												href: `https://open.spotify.com/artist/${s.id}`,
												style: { fontSize: 'inherit' },
												title: s.name,
												onContextMenu: um(
													'Artist',
													`/artist/${s.id}`,
												),
											},
											s.name,
										),
										l !== e.artists.length - 1 &&
											o(
												'span',
												{ className: xe('comma') },
												', ',
											),
									),
								),
							),
						e.album.name &&
							o(
								y.FormText,
								{
									variant: 'text-sm/normal',
									className: xe('ellipoverflow'),
								},
								'on\xA0',
								o(
									We,
									{
										id: xe('album-title'),
										href: `https://open.spotify.com/album/${e.album.id}`,
										target: '_blank',
										className: xe('album'),
										disabled: !e.album.id,
										style: { fontSize: 'inherit' },
										title: e.album.name,
										onContextMenu: um(
											'Album',
											`/album/${e.album.id}`,
										),
									},
									e.album.name,
								),
							),
					),
			  );
	}
	function z0() {
		let e = Be(
				[he],
				() => he.track,
				null,
				(s, l) => (s?.id ? s.id === l?.id : s?.name === l?.name),
			),
			t = Be(
				[he],
				() => he.device,
				null,
				(s, l) => s?.id === l?.id,
			),
			n = Be([he], () => he.isPlaying),
			[i, r] = V(!1);
		return (
			I.useEffect(() => {
				if ((r(!1), !n)) {
					let s = setTimeout(() => r(!0), 3e5);
					return () => clearTimeout(s);
				}
			}, [n]),
			!e || !t?.is_active || i
				? null
				: o(
						k,
						{
							fallback: () =>
								o(
									'div',
									{ className: 'vc-spotify-fallback' },
									o(
										'p',
										null,
										'Failed to render Spotify Modal :(',
									),
									o(
										'p',
										null,
										'Check the console for errors',
									),
								),
						},
						o(
							'div',
							{ id: xe('player') },
							o(ZP, { track: e }),
							o(KP, null),
							o(WP, null),
						),
				  )
		);
	}
	var xe,
		BP,
		$P,
		UP,
		GP,
		HP,
		zP,
		qP,
		j0 = m(() => {
			'use strict';
			a();
			G0();
			re();
			xt();
			Bo();
			Wn();
			Ko();
			de();
			x();
			H0();
			xe = (e) => `vc-spotify-${e}`;
			(BP = Ti(
				'M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z',
				'play',
			)),
				($P = Ti(
					'M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z',
					'pause',
				)),
				(UP = Ti(
					'M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z',
					'previous',
				)),
				(GP = Ti(
					'M7.58 16.89l5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82zM16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z',
					'next',
				)),
				(HP = Ti(
					'M7 7h10v1.79c0 .45.54.67.85.35l2.79-2.79c.2-.2.2-.51 0-.71l-2.79-2.79c-.31-.31-.85-.09-.85.36V5H6c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1V7zm10 10H7v-1.79c0-.45-.54-.67-.85-.35l-2.79 2.79c-.2.2-.2.51 0 .71l2.79 2.79c.31.31.85.09.85-.36V19h11c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1v3z',
					'repeat',
				)),
				(zP = Ti(
					'M10.59 9.17L6.12 4.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.46 4.46 1.42-1.4zm4.76-4.32l1.19 1.19L4.7 17.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L17.96 7.46l1.19 1.19c.31.31.85.09.85-.36V4.5c0-.28-.22-.5-.5-.5h-3.79c-.45 0-.67.54-.36.85zm-.52 8.56l-1.41 1.41 3.13 3.13-1.2 1.2c-.31.31-.09.85.36.85h3.79c.28 0 .5-.22.5-.5v-3.79c0-.45-.54-.67-.85-.35l-1.19 1.19-3.13-3.14z',
					'shuffle',
				));
			qP = Ct((e) => {
				he.seek(e);
			});
		});
	function W0(e) {
		(e ? Je : bt)($0);
	}
	var pm,
		q0 = m(() => {
			'use strict';
			a();
			E();
			je();
			w();
			T();
			U0();
			j0();
			pm = g({
				name: 'SpotifyControls',
				description: 'Adds a Spotify player above the account panel',
				authors: [p.Ven, p.afn, p.KraXen72],
				options: {
					hoverControls: {
						description: 'Show controls on hover',
						type: 3,
						default: !1,
						onChange: (e) => W0(e),
					},
					useSpotifyUris: {
						type: 3,
						description:
							'Open Spotify URIs instead of Spotify URLs. Will only work if you have Spotify installed and might not work on all platforms',
						default: !1,
					},
				},
				patches: [
					{
						find: 'showTaglessAccountPanel:',
						replacement: {
							match: /return ?(.{0,30}\(.{1,3},\{[^}]+?,showTaglessAccountPanel:.+?\}\))/,
							replace: 'return [$self.renderPlayer(),$1]',
						},
					},
					{
						find: '.PLAYER_DEVICES',
						replacement: {
							match: /get:(.{1,3})\.bind\(null,(.{1,6})\.get\)/,
							replace:
								'SpotifyAPIMarker:1,post:$1.bind(null,$2.post),$&',
						},
					},
					{
						find: 'repeat:"off"!==',
						replacement: {
							match: /repeat:"off"!==(.{1,3}),/,
							replace: 'actual_repeat:$1,$&',
						},
					},
				],
				start: () => W0(M.plugins.SpotifyControls.hoverControls),
				renderPlayer: () => o(z0, null),
			});
		});
	var dm,
		mm,
		K0 = m(() => {
			'use strict';
			a();
			E();
			w();
			T();
			(dm = N({
				noSpotifyAutoPause: {
					description: 'Disable Spotify auto-pause',
					type: 3,
					default: !0,
					restartNeeded: !0,
				},
				keepSpotifyActivityOnIdle: {
					description: 'Keep Spotify activity playing when idling',
					type: 3,
					default: !1,
					restartNeeded: !0,
				},
			})),
				(mm = g({
					name: 'SpotifyCrack',
					description:
						'Free listen along, no auto-pausing in voice chat, and allows activity to continue playing when idling',
					authors: [p.Cyn, p.Nuckyz],
					settings: dm,
					patches: [
						{
							find: 'dispatch({type:"SPOTIFY_PROFILE_UPDATE"',
							replacement: {
								match: /SPOTIFY_PROFILE_UPDATE.+?isPremium:(?="premium"===(\i)\.body\.product)/,
								replace: (e, t) =>
									`${e}(${t}.body.product="premium")&&`,
							},
						},
						{
							find: '.displayName="SpotifyStore"',
							replacement: [
								{
									predicate: () =>
										dm.store.noSpotifyAutoPause,
									match: /(?<=function \i\(\){)(?=.{0,200}SPOTIFY_AUTO_PAUSED\))/,
									replace: 'return;',
								},
								{
									predicate: () =>
										dm.store.keepSpotifyActivityOnIdle,
									match: /(?<=shouldShowActivity=function\(\){.{0,50})&&!\i\.\i\.isIdle\(\)/,
									replace: '',
								},
							],
						},
					],
				}));
		});
	function gm(e, t) {
		t = { invalidEmojis: [], tts: !1, validNonShortcutEmojis: [], ...t };
		let n = XP.getPendingReply(e);
		Y0.sendMessage(e, t, void 0, Y0.getSendMessageOptionsForReply(n)).then(
			() => {
				n && L.dispatch({ type: 'DELETE_PENDING_REPLY', channelId: e });
			},
		);
	}
	var fm,
		Y0,
		XP,
		hm,
		Z0 = m(() => {
			'use strict';
			a();
			wt();
			w();
			T();
			_();
			x();
			(fm = P('getPlayerState')),
				(Y0 = P('getSendMessageOptionsForReply', 'sendMessage')),
				(XP = P('getPendingReply'));
			hm = g({
				name: 'SpotifyShareCommands',
				description:
					'Share your current Spotify track, album or artist via slash command (/track, /album, /artist)',
				authors: [p.katlyn],
				dependencies: ['CommandsAPI'],
				commands: [
					{
						name: 'track',
						description: 'Send your current Spotify track to chat',
						inputType: 0,
						options: [],
						execute: (e, t) => {
							let n = fm.getTrack();
							if (n === null) {
								ie(t.channel.id, {
									content:
										"You're not listening to any music.",
								});
								return;
							}
							gm(t.channel.id, {
								content: `https://open.spotify.com/track/${n.id}`,
							});
						},
					},
					{
						name: 'album',
						description: 'Send your current Spotify album to chat',
						inputType: 0,
						options: [],
						execute: (e, t) => {
							let n = fm.getTrack();
							if (n === null) {
								ie(t.channel.id, {
									content:
										"You're not listening to any music.",
								});
								return;
							}
							gm(t.channel.id, {
								content: `https://open.spotify.com/album/${n.album.id}`,
							});
						},
					},
					{
						name: 'artist',
						description: 'Send your current Spotify artist to chat',
						inputType: 0,
						options: [],
						execute: (e, t) => {
							let n = fm.getTrack();
							if (n === null) {
								ie(t.channel.id, {
									content:
										"You're not listening to any music.",
								});
								return;
							}
							gm(t.channel.id, {
								content: n.artists[0].external_urls.spotify,
							});
						},
					},
				],
			});
		});
	var X0 = {};
	me(X0, { default: () => tI });
	function JP({ emoji: e, prefix: t, log: n, delta: i, instance: r }) {
		return o(
			I.Fragment,
			null,
			o('span', null, r.sinceStart.toFixed(3), 's'),
			o('span', null, r.sinceLast.toFixed(3), 's'),
			o('span', null, i?.toFixed(0) ?? ''),
			o('span', null, o('pre', null, e, ' ', t ?? ' ', n)),
		);
	}
	function QP({ title: e, logs: t, traceEnd: n }) {
		let i = t.find((l) => l.timestamp)?.timestamp ?? 0,
			r = i,
			s = t.map((l) => {
				let c = l.timestamp ?? r,
					u = (c - i) / 1e3,
					h = (c - r) / 1e3;
				return (r = c), { sinceStart: u, sinceLast: h };
			});
		return o(
			y.FormSection,
			{ title: e, tag: 'h1' },
			o(
				'code',
				null,
				n &&
					o(
						'div',
						{
							style: {
								color: 'var(--header-primary)',
								marginBottom: 5,
								userSelect: 'text',
							},
						},
						'Trace ended at: ',
						new Date(n).toTimeString(),
					),
				o(
					'div',
					{
						style: {
							color: 'var(--header-primary)',
							display: 'grid',
							gridTemplateColumns: 'repeat(3, auto) 1fr',
							gap: '2px 10px',
							userSelect: 'text',
						},
					},
					o('span', null, 'Start'),
					o('span', null, 'Interval'),
					o('span', null, 'Delta'),
					o('span', { style: { marginBottom: 5 } }, 'Event'),
					Dr.logs.map((l, c) =>
						o(JP, { key: c, ...l, instance: s[c] }),
					),
				),
			),
		);
	}
	function VP({ trace: e }) {
		let t = e.split(`
`);
		return o(
			y.FormSection,
			{ title: 'Server Trace', tag: 'h2' },
			o(
				'code',
				null,
				o(
					ae,
					{
						flexDirection: 'column',
						style: {
							color: 'var(--header-primary)',
							gap: 5,
							userSelect: 'text',
						},
					},
					t.map((n) => o('span', null, n)),
				),
			),
		);
	}
	function eI() {
		if (!Dr?.logs) return o('div', null, 'Loading...');
		let e = Dr.logGroups.find((t) => t.serverTrace)?.serverTrace;
		return o(
			I.Fragment,
			null,
			o(QP, {
				title: 'Startup Timings',
				logs: Dr.logs,
				traceEnd: Dr.endTime_,
			}),
			o('div', { style: { marginTop: 5 } }, '\xA0'),
			e && o(VP, { trace: e }),
		);
	}
	var Dr,
		tI,
		J0 = m(() => {
			'use strict';
			a();
			re();
			xt();
			_();
			x();
			Dr = P('markWithDelta', 'markAndLog', 'markAt');
			tI = k.wrap(eI);
		});
	var ym,
		Q0 = m(() => {
			'use strict';
			a();
			w();
			ye();
			T();
			ym = g({
				name: 'StartupTimings',
				description: 'Adds Startup Timings to the Settings menu',
				authors: [p.Megu],
				patches: [
					{
						find: 'PAYMENT_FLOW_MODAL_TEST_PAGE,',
						replacement: {
							match: /{section:.{1,2}\..{1,3}\.PAYMENT_FLOW_MODAL_TEST_PAGE/,
							replace:
								'{section:"StartupTimings",label:"Startup Timings",element:$self.StartupTimingPage},$&',
						},
					},
				],
				StartupTimingPage: oe(() => (J0(), Mo(X0)).default),
			});
		});
	var V0,
		nI,
		vm,
		eb = m(() => {
			'use strict';
			a();
			br();
			w();
			de();
			ro();
			T();
			ii();
			x();
			Ii();
			ni();
			kd();
			(V0 = 'Vencord-SupportHelper-Dismiss'),
				(nI = [zr, '1024286218801926184', '1033680203433660458']),
				(vm = g({
					name: 'SupportHelper',
					required: !0,
					description: 'Helps us provide support to you',
					authors: [p.Ven],
					dependencies: ['CommandsAPI'],
					commands: [
						{
							name: 'vencord-debug',
							description: 'Send Vencord Debug info',
							predicate: (e) => nI.includes(e.channel.id),
							execute() {
								let { RELEASE_CHANNEL: e } = window.GLOBAL_ENV,
									t = (() =>
										'armcord' in window
											? `ArmCord v${window.armcord.version}`
											: `Web (${navigator.userAgent})`)(),
									n = (l) =>
										l.endsWith('API') || Te[l].required,
									i = Object.keys(Te).filter(
										(l) =>
											Vencord.Plugins.isPluginEnabled(
												l,
											) && !n(l),
									),
									r = Object.keys(Te).filter(
										(l) =>
											Vencord.Plugins.isPluginEnabled(
												l,
											) && n(l),
									);
								return {
									content: `
**Vencord Debug Info**
>>> Discord Branch: ${e}
Client: ${t}
Platform: ${window.navigator.platform}
Vencord: ${on}${Rr.additionalInfo}
Outdated: ${uo}
OpenAsar: ${'openasar' in window}

Enabled Plugins (${i.length + r.length}):
${$i(
	i.join(', ') +
		`

` +
		r.join(', '),
)}
`
										.trim()
										.replaceAll('```\n', '```'),
								};
							},
						},
					],
					flux: {
						async CHANNEL_SELECT({ channelId: e }) {
							if (
								e === zr &&
								!Ci(U.getCurrentUser().id) &&
								uo &&
								on !== (await Pt.get(V0))
							) {
								let t = () => Pt.set(V0, on);
								vt.show({
									title: 'Hold on!',
									body: o(
										'div',
										null,
										o(
											y.FormText,
											null,
											'You are using an outdated version of Vencord! Chances are, your issue is already fixed.',
										),
										o(
											y.FormText,
											null,
											"Please first update using the Updater Page in Settings, or use the VencordInstaller (Update Vencord Button) to do so, in case you can't access the Updater page.",
										),
									),
									onCancel: t,
									onConfirm: t,
								});
							}
						},
					},
				}));
		});
	function rb(e) {
		let t = e.match(/^(\/)?(.+?)(?:\/([gimsuy]*))?$/);
		return t
			? new RegExp(
					t[2],
					t[3]
						?.split('')
						.filter((n, i, r) => r.indexOf(n) === i)
						.join('') ?? 'g',
			  )
			: new RegExp(e);
	}
	function iI(e) {
		try {
			return rb(e), null;
		} catch (t) {
			return o(
				'span',
				{ style: { color: 'var(--text-danger)' } },
				String(t),
			);
		}
	}
	function Sm({ initialValue: e, onChange: t, placeholder: n }) {
		let [i, r] = V(e);
		return o(Ne, {
			placeholder: n,
			value: i,
			onChange: r,
			spellCheck: !1,
			onBlur: () => i !== e && t(i),
		});
	}
	function tb({ title: e, rulesArray: t, rulesKey: n, update: i }) {
		let r = e === 'Using Regex';
		async function s(c) {
			t.splice(c, 1), await Pt.set(n, t), i();
		}
		async function l(c, u, h) {
			u === t.length - 1 && t.push(ib()),
				(t[u][h] = c),
				t[u].find === '' &&
					t[u].replace === '' &&
					t[u].onlyIfIncludes === '' &&
					u !== t.length - 1 &&
					t.splice(u, 1),
				await Pt.set(n, t),
				i();
		}
		return o(
			d,
			null,
			o(y.FormTitle, { tag: 'h4' }, e),
			o(
				ae,
				{ flexDirection: 'column', style: { gap: '0.5em' } },
				t.map((c, u) =>
					o(
						I.Fragment,
						{ key: `${c.find}-${u}` },
						o(
							ae,
							{ flexDirection: 'row', style: { gap: 0 } },
							o(
								ae,
								{
									flexDirection: 'row',
									style: { flexGrow: 1, gap: '0.5em' },
								},
								o(Sm, {
									placeholder: 'Find',
									initialValue: c.find,
									onChange: (h) => l(h, u, 'find'),
								}),
								o(Sm, {
									placeholder: 'Replace',
									initialValue: c.replace,
									onChange: (h) => l(h, u, 'replace'),
								}),
								o(Sm, {
									placeholder: 'Only if includes',
									initialValue: c.onlyIfIncludes,
									onChange: (h) => l(h, u, 'onlyIfIncludes'),
								}),
							),
							o(
								R,
								{
									size: R.Sizes.MIN,
									onClick: () => s(u),
									style: {
										background: 'none',
										...(u === t.length - 1
											? {
													visibility: 'hidden',
													pointerEvents: 'none',
											  }
											: {}),
									},
								},
								o(
									'svg',
									{
										width: '24',
										height: '24',
										viewBox: '0 0 24 24',
									},
									o('title', null, 'Delete Rule'),
									o('path', {
										fill: 'var(--status-danger)',
										d: 'M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z',
									}),
									o('path', {
										fill: 'var(--status-danger)',
										d: 'M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z',
									}),
								),
							),
						),
						r && iI(c.find),
					),
				),
			),
		);
	}
	function rI() {
		let [e, t] = V('');
		return o(
			d,
			null,
			o(y.FormTitle, { tag: 'h4' }, 'Test Rules'),
			o(Ne, { placeholder: 'Type a message', onChange: t }),
			o(Ne, {
				placeholder: 'Message with rules applied',
				editable: !1,
				value: sb(e),
			}),
		);
	}
	function sb(e) {
		if (e.length === 0) return e;
		if (((e = ' ' + e + ' '), ka))
			for (let t of ka)
				!t.find ||
					!t.replace ||
					(t.onlyIfIncludes && !e.includes(t.onlyIfIncludes)) ||
					(e = e.replaceAll(
						t.find,
						t.replace.replaceAll(
							'\\n',
							`
`,
						),
					));
		if (La) {
			for (let t of La)
				if (
					!(!t.find || !t.replace) &&
					!(t.onlyIfIncludes && !e.includes(t.onlyIfIncludes))
				)
					try {
						let n = rb(t.find);
						e = e.replace(
							n,
							t.replace.replaceAll(
								'\\n',
								`
`,
							),
						);
					} catch {
						new Z('TextReplace').error(`Invalid regex: ${t.find}`);
					}
		}
		return (e = e.trim()), e;
	}
	var nb,
		ob,
		ib,
		Na,
		ka,
		La,
		oI,
		sI,
		bm,
		ab = m(() => {
			'use strict';
			a();
			br();
			gn();
			E();
			xt();
			w();
			Se();
			ye();
			T();
			x();
			(nb = 'TextReplace_rulesString'),
				(ob = 'TextReplace_rulesRegex'),
				(ib = () => ({ find: '', replace: '', onlyIfIncludes: '' })),
				(Na = () => [ib()]),
				(ka = Na()),
				(La = Na()),
				(oI = N({
					replace: {
						type: 6,
						description: '',
						component: () => {
							let e = Bt();
							return o(
								d,
								null,
								o(tb, {
									title: 'Using String',
									rulesArray: ka,
									rulesKey: nb,
									update: e,
								}),
								o(tb, {
									title: 'Using Regex',
									rulesArray: La,
									rulesKey: ob,
									update: e,
								}),
								o(rI, null),
							);
						},
					},
				}));
			(sI = '1102784112584040479'),
				(bm = g({
					name: 'TextReplace',
					description:
						"Replace text in your messages. You can find pre-made rules in the #textreplace-rules channel in Vencord's Server",
					authors: [p.AutumnVN, p.TheKodeToad],
					dependencies: ['MessageEventsAPI'],
					settings: oI,
					async start() {
						(ka = (await Pt.get(nb)) ?? Na()),
							(La = (await Pt.get(ob)) ?? Na()),
							(this.preSend = rt((e, t) => {
								e !== sI && (t.content = sb(t.content));
							}));
					},
					stop() {
						st(this.preSend);
					},
				}));
		});
	var Tm,
		lb = m(() => {
			'use strict';
			a();
			w();
			T();
			Tm = g({
				name: 'TimeBarAllActivities',
				description:
					'Adds the Spotify time bar to all activities if they have start and end timestamps',
				authors: [p.obscurity],
				patches: [
					{
						find: 'renderTimeBar=function',
						replacement: {
							match: /renderTimeBar=function\((.{1,3})\){.{0,50}?var/,
							replace: 'renderTimeBar=function($1){var',
						},
					},
				],
			});
		});
	var cb = m(() => {});
	var mt,
		Or = m(() => {
			'use strict';
			a();
			E();
			T();
			mt = N({
				receivedInput: {
					type: 0,
					description: 'Input language for received messages',
					default: 'auto',
					hidden: !0,
				},
				receivedOutput: {
					type: 0,
					description: 'Output language for received messages',
					default: 'en',
					hidden: !0,
				},
				sentInput: {
					type: 0,
					description: 'Input language for sent messages',
					default: 'auto',
					hidden: !0,
				},
				sentOutput: {
					type: 0,
					description: 'Output language for sent messages',
					default: 'en',
					hidden: !0,
				},
				autoTranslate: {
					type: 3,
					description:
						'Automatically translate your messages before sending. You can also shift/right click the translate button to toggle this',
					default: !1,
				},
			});
		});
	var Ea,
		xm = m(() => {
			'use strict';
			a();
			Ea = {
				auto: 'Detect language',
				af: 'Afrikaans',
				sq: 'Albanian',
				am: 'Amharic',
				ar: 'Arabic',
				hy: 'Armenian',
				as: 'Assamese',
				ay: 'Aymara',
				az: 'Azerbaijani',
				bm: 'Bambara',
				eu: 'Basque',
				be: 'Belarusian',
				bn: 'Bengali',
				bho: 'Bhojpuri',
				bs: 'Bosnian',
				bg: 'Bulgarian',
				ca: 'Catalan',
				ceb: 'Cebuano',
				ny: 'Chichewa',
				'zh-CN': 'Chinese (Simplified)',
				'zh-TW': 'Chinese (Traditional)',
				co: 'Corsican',
				hr: 'Croatian',
				cs: 'Czech',
				da: 'Danish',
				dv: 'Dhivehi',
				doi: 'Dogri',
				nl: 'Dutch',
				en: 'English',
				eo: 'Esperanto',
				et: 'Estonian',
				ee: 'Ewe',
				tl: 'Filipino',
				fi: 'Finnish',
				fr: 'French',
				fy: 'Frisian',
				gl: 'Galician',
				ka: 'Georgian',
				de: 'German',
				el: 'Greek',
				gn: 'Guarani',
				gu: 'Gujarati',
				ht: 'Haitian Creole',
				ha: 'Hausa',
				haw: 'Hawaiian',
				iw: 'Hebrew',
				hi: 'Hindi',
				hmn: 'Hmong',
				hu: 'Hungarian',
				is: 'Icelandic',
				ig: 'Igbo',
				ilo: 'Ilocano',
				id: 'Indonesian',
				ga: 'Irish',
				it: 'Italian',
				ja: 'Japanese',
				jw: 'Javanese',
				kn: 'Kannada',
				kk: 'Kazakh',
				km: 'Khmer',
				rw: 'Kinyarwanda',
				gom: 'Konkani',
				ko: 'Korean',
				kri: 'Krio',
				ku: 'Kurdish (Kurmanji)',
				ckb: 'Kurdish (Sorani)',
				ky: 'Kyrgyz',
				lo: 'Lao',
				la: 'Latin',
				lv: 'Latvian',
				ln: 'Lingala',
				lt: 'Lithuanian',
				lg: 'Luganda',
				lb: 'Luxembourgish',
				mk: 'Macedonian',
				mai: 'Maithili',
				mg: 'Malagasy',
				ms: 'Malay',
				ml: 'Malayalam',
				mt: 'Maltese',
				mi: 'Maori',
				mr: 'Marathi',
				'mni-Mtei': 'Meiteilon (Manipuri)',
				lus: 'Mizo',
				mn: 'Mongolian',
				my: 'Myanmar (Burmese)',
				ne: 'Nepali',
				no: 'Norwegian',
				or: 'Odia (Oriya)',
				om: 'Oromo',
				ps: 'Pashto',
				fa: 'Persian',
				pl: 'Polish',
				pt: 'Portuguese',
				pa: 'Punjabi',
				qu: 'Quechua',
				ro: 'Romanian',
				ru: 'Russian',
				sm: 'Samoan',
				sa: 'Sanskrit',
				gd: 'Scots Gaelic',
				nso: 'Sepedi',
				sr: 'Serbian',
				st: 'Sesotho',
				sn: 'Shona',
				sd: 'Sindhi',
				si: 'Sinhala',
				sk: 'Slovak',
				sl: 'Slovenian',
				so: 'Somali',
				es: 'Spanish',
				su: 'Sundanese',
				sw: 'Swahili',
				sv: 'Swedish',
				tg: 'Tajik',
				ta: 'Tamil',
				tt: 'Tatar',
				te: 'Telugu',
				th: 'Thai',
				ti: 'Tigrinya',
				ts: 'Tsonga',
				tr: 'Turkish',
				tk: 'Turkmen',
				ak: 'Twi',
				uk: 'Ukrainian',
				ur: 'Urdu',
				ug: 'Uyghur',
				uz: 'Uzbek',
				vi: 'Vietnamese',
				cy: 'Welsh',
				xh: 'Xhosa',
				yi: 'Yiddish',
				yo: 'Yoruba',
				zu: 'Zulu',
			};
		});
	async function Da(e, t) {
		let n = mt.store[e + 'Input'],
			i = mt.store[e + 'Output'],
			r =
				'https://translate.googleapis.com/translate_a/single?' +
				new URLSearchParams({
					client: 'gtx',
					sl: n,
					tl: i,
					dt: 't',
					dj: '1',
					source: 'input',
					q: t,
				}),
			s = await fetch(r);
		if (!s.ok)
			throw new Error(`Failed to translate "${t}" (${n} -> ${i})
${s.status} ${s.statusText}`);
		let { src: l, sentences: c } = await s.json();
		return {
			src: l,
			text: c
				.map((u) => u?.trans)
				.filter(Boolean)
				.join(''),
		};
	}
	var to,
		_r = m(() => {
			'use strict';
			a();
			je();
			Or();
			to = Ue('vc-trans-');
		});
	function lI({ settingsKey: e, includeAuto: t }) {
		let n = mt.use([e])[e],
			i = Ut(() => {
				let r = Object.entries(Ea).map(([s, l]) => ({
					value: s,
					label: l,
				}));
				return t || r.shift(), r;
			}, []);
		return o(
			'section',
			{ className: G.bottom16 },
			o(y.FormTitle, { tag: 'h3' }, mt.def[e].description),
			o(Qr, {
				options: i,
				value: i.find((r) => r.value === n),
				placeholder: 'Select a language',
				maxVisibleItems: 5,
				closeOnSelect: !0,
				onChange: (r) => (mt.store[e] = r),
			}),
		);
	}
	function cI() {
		let e = mt.use(['autoTranslate']).autoTranslate;
		return o(
			Nt,
			{
				value: e,
				onChange: (t) => (mt.store.autoTranslate = t),
				note: mt.def.autoTranslate.description,
				hideBorder: !0,
			},
			'Auto Translate',
		);
	}
	function ub({ rootProps: e }) {
		return o(
			Ie,
			{ ...e },
			o(
				$e,
				{ className: to('modal-header') },
				o(y.FormTitle, { tag: 'h2' }, 'Translate'),
				o(St, { onClick: e.onClose }),
			),
			o(
				Le,
				{ className: to('modal-content') },
				aI.map((t) =>
					o(lI, {
						key: t,
						settingsKey: t,
						includeAuto: t.endsWith('Input'),
					}),
				),
				o(y.FormDivider, { className: G.bottom16 }),
				o(cI, null),
			),
		);
	}
	var aI,
		pb = m(() => {
			'use strict';
			a();
			Xe();
			ze();
			x();
			xm();
			Or();
			_r();
			aI = ['receivedInput', 'receivedOutput', 'sentInput', 'sentOutput'];
		});
	function Fr({ height: e = 24, width: t = 24, className: n }) {
		return o(
			'svg',
			{
				viewBox: '0 96 960 960',
				height: e,
				width: t,
				className: J(to('icon'), n),
			},
			o('path', {
				fill: 'currentColor',
				d: 'm475 976 181-480h82l186 480h-87l-41-126H604l-47 126h-82Zm151-196h142l-70-194h-2l-70 194Zm-466 76-55-55 204-204q-38-44-67.5-88.5T190 416h87q17 33 37.5 62.5T361 539q45-47 75-97.5T487 336H40v-80h280v-80h80v80h280v80H567q-22 69-58.5 135.5T419 598l98 99-30 81-127-122-200 200Z',
			}),
		);
	}
	function db({ slateProps: e }) {
		let { autoTranslate: t } = mt.use(['autoTranslate']);
		if (e.type.analyticsName !== 'normal') return null;
		let n = () => (mt.store.autoTranslate = !t);
		return o(
			W,
			{ text: 'Open Translate Modal' },
			({ onMouseEnter: i, onMouseLeave: r }) =>
				o(
					'div',
					{ style: { display: 'flex' } },
					o(
						R,
						{
							'aria-haspopup': 'dialog',
							'aria-label': '',
							size: '',
							look: Wt.BLANK,
							onMouseEnter: i,
							onMouseLeave: r,
							innerClassName: pt.button,
							onClick: (s) => {
								if (s.shiftKey) return n();
								be((l) => o(ub, { rootProps: l }));
							},
							onContextMenu: () => n(),
							style: { padding: '0 4px' },
						},
						o(
							'div',
							{ className: pt.buttonWrapper },
							o(Fr, { className: to({ 'auto-translate': t }) }),
						),
					),
				),
		);
	}
	var wm = m(() => {
		'use strict';
		a();
		de();
		ze();
		x();
		Or();
		pb();
		_r();
	});
	function mb(e, t) {
		Mm.get(e)(t);
	}
	function uI({ onDismiss: e }) {
		return o('button', { onClick: e, className: to('dismiss') }, 'Dismiss');
	}
	function fb({ message: e }) {
		let [t, n] = V();
		return (
			tt(() => (Mm.set(e.id, n), () => void Mm.delete(e.id)), []),
			t
				? o(
						'span',
						{ className: to('accessory') },
						o(Fr, { width: 16, height: 16 }),
						Pe.parse(t.text),
						' ',
						'(translated from ',
						Ea[t.src] ?? t.src,
						' - ',
						o(uI, { onDismiss: () => n(void 0) }),
						')',
				  )
				: null
		);
	}
	var Mm,
		gb = m(() => {
			'use strict';
			a();
			x();
			xm();
			wm();
			_r();
			Mm = new Map();
		});
	var Pm,
		hb = m(() => {
			'use strict';
			a();
			cb();
			Gs();
			gn();
			Oo();
			re();
			w();
			T();
			x();
			Or();
			wm();
			gb();
			_r();
			Pm = g({
				name: 'Translate',
				description: 'Translate messages with Google Translate',
				authors: [p.Ven],
				dependencies: [
					'MessageAccessoriesAPI',
					'MessagePopoverAPI',
					'MessageEventsAPI',
				],
				settings: mt,
				translate: Da,
				patches: [
					{
						find: '.activeCommandOption',
						replacement: {
							match: /(.)\.push.{1,30}disabled:(\i),.{1,20}\},"gift"\)\)/,
							replace:
								'$&;try{$2||$1.push($self.chatBarIcon(arguments[0]))}catch{}',
						},
					},
				],
				start() {
					cr('vc-translation', (e) => o(fb, { message: e.message })),
						yn('vc-translate', (e) =>
							e.content
								? {
										label: 'Translate',
										icon: Fr,
										message: e,
										channel: X.getChannel(e.channel_id),
										onClick: async () => {
											let t = await Da(
												'received',
												e.content,
											);
											mb(e.id, t);
										},
								  }
								: null,
						),
						(this.preSend = rt(async (e, t) => {
							!mt.store.autoTranslate ||
								!t.content ||
								(t.content = (
									await Da('sent', t.content)
								).text);
						}));
				},
				stop() {
					st(this.preSend), vn('vc-translate'), Uu('vc-translation');
				},
				chatBarIcon: (e) =>
					o(k, { noop: !0 }, o(db, { slateProps: e })),
			});
		});
	function Im({ a: e, b: t, c: n }) {
		return [
			o('strong', { key: '0' }, e),
			', ',
			o('strong', { key: '2' }, t),
			`, and ${n} others are typing...`,
		];
	}
	var pI,
		dI,
		Oa,
		mI,
		Rm,
		Cm = m(() => {
			'use strict';
			a();
			E();
			re();
			w();
			T();
			_();
			x();
			(pI = ce('.typingIndicatorRef', 'svg')),
				(dI = ce('friendToken', 'USER_PROFILE_MODAL_OPEN')),
				(Oa = N({
					showAvatars: {
						type: 3,
						default: !0,
						description: 'Show avatars in the typing indicator',
					},
					showRoleColors: {
						type: 3,
						default: !0,
						description: 'Show role colors in the typing indicator',
					},
					alternativeFormatting: {
						type: 3,
						default: !0,
						description:
							'Show a more useful message when several users are typing',
					},
				}));
			(mI = k.wrap(
				function ({ user: e, guildId: t }) {
					return o(
						'strong',
						{
							role: 'button',
							onClick: () => {
								dI({
									userId: e.id,
									guildId: t,
									channelId: fe.getChannelId(),
									analyticsLocation: {
										page: t
											? 'Guild Channel'
											: 'DM Channel',
										section: 'Profile Popout',
									},
								});
							},
							style: {
								display: 'grid',
								gridAutoFlow: 'column',
								gap: '4px',
								color: Oa.store.showRoleColors
									? ke.getMember(t, e.id)?.colorString
									: void 0,
								cursor: 'pointer',
							},
						},
						Oa.store.showAvatars &&
							o(
								'div',
								{ style: { marginTop: '4px' } },
								o(pI, {
									size: 'SIZE_16',
									src: e.getAvatarURL(t, 128),
								}),
							),
						ke.getNick(t, e.id) ||
							(!t && Kt.getNickname(e.id)) ||
							e.globalName ||
							e.username,
					);
				},
				{ noop: !0 },
			)),
				(Rm = g({
					name: 'TypingTweaks',
					description:
						'Show avatars and role colours in the typing indicator',
					authors: [p.zt],
					patches: [
						{
							find: 'getCooldownTextStyle',
							replacement: {
								match: /=(\i)\[2];(.+)"aria-atomic":!0,children:(\i)}\)/,
								replace:
									'=$1[2];$2"aria-atomic":!0,style:{display:"grid",gridAutoFlow:"column",gridGap:"0.25em"},children:$self.mutateChildren(this.props,$1,$3)})',
							},
						},
						{
							find: 'getCooldownTextStyle',
							replacement: {
								match: /return \i\.\i\.getName\(.,.\.props\.channel\.id,(.)\)/,
								replace: 'return $1',
							},
						},
						{
							find: 'getCooldownTextStyle',
							replacement: {
								match: /((\i)\.length\?.\..\.Messages\.THREE_USERS_TYPING.format\(\{a:(\i),b:(\i),c:.}\)):.+?SEVERAL_USERS_TYPING/,
								replace:
									'$1:$self.buildSeveralUsers({a:$3,b:$4,c:$2.length-2})',
							},
							predicate: () => Oa.store.alternativeFormatting,
						},
					],
					settings: Oa,
					buildSeveralUsers: Im,
					mutateChildren(e, t, n) {
						if (!Array.isArray(n)) return n;
						let i = 0;
						return n.map((r) =>
							r.type === 'strong'
								? o(mI, { ...e, user: t[i++] })
								: r,
						);
					},
				}));
		});
	function xo(e, t) {
		return ke.getNick(e, t) ?? U.getUser(t).username;
	}
	function hI({ channelId: e }) {
		let t = Be(
				[yb],
				() => ({ ...yb.getTypingUsers(e) }),
				null,
				(l, c) => {
					let u = Object.keys(l),
						h = Object.keys(c);
					return (
						u.length === h.length &&
						JSON.stringify(u) === JSON.stringify(h)
					);
				},
			),
			n = X.getChannel(e).guild_id;
		if (!Am.store.includeMutedChannels && gI.isChannelMuted(n, e))
			return null;
		let i = U.getCurrentUser()?.id,
			r = Object.keys(t).filter(
				(l) =>
					l !== i &&
					!(Kt.isBlocked(l) && !Am.store.includeBlockedUsers),
			),
			s;
		switch (r.length) {
			case 0:
				break;
			case 1: {
				s = _a.Messages.ONE_USER_TYPING.format({ a: xo(n, r[0]) });
				break;
			}
			case 2: {
				s = _a.Messages.TWO_USERS_TYPING.format({
					a: xo(n, r[0]),
					b: xo(n, r[1]),
				});
				break;
			}
			case 3: {
				s = _a.Messages.THREE_USERS_TYPING.format({
					a: xo(n, r[0]),
					b: xo(n, r[1]),
					c: xo(n, r[2]),
				});
				break;
			}
			default: {
				s = M.plugins.TypingTweaks.enabled
					? Im({ a: xo(n, r[0]), b: xo(n, r[1]), c: r.length - 2 })
					: _a.Messages.SEVERAL_USERS_TYPING;
				break;
			}
		}
		return r.length > 0
			? o(W, { text: s }, ({ onMouseLeave: l, onMouseEnter: c }) =>
					o(
						'div',
						{
							style: {
								marginLeft: 6,
								height: 16,
								display: 'flex',
								alignItems: 'center',
								zIndex: 0,
								cursor: 'pointer',
							},
							onMouseLeave: l,
							onMouseEnter: c,
						},
						o(fI, { dotRadius: 3, themed: !0 }),
					),
			  )
			: null;
	}
	var fI,
		yb,
		gI,
		_a,
		Am,
		Nm,
		vb = m(() => {
			'use strict';
			a();
			E();
			re();
			w();
			ye();
			T();
			_();
			x();
			Cm();
			(fI = oe(() =>
				ht((e) => e.type?.render?.toString()?.includes('().dots')),
			)),
				(yb = ue('TypingStore')),
				(gI = ue('UserGuildSettingsStore')),
				(_a = Ce((e) => e.Messages?.SEVERAL_USERS_TYPING));
			(Am = N({
				includeMutedChannels: {
					type: 3,
					description:
						'Whether to show the typing indicator for muted channels.',
					default: !1,
				},
				includeBlockedUsers: {
					type: 3,
					description:
						'Whether to show the typing indicator for blocked users.',
					default: !1,
				},
			})),
				(Nm = g({
					name: 'TypingIndicator',
					description:
						'Adds an indicator if someone is typing on a channel.',
					authors: [p.Nuckyz, p.obscurity],
					settings: Am,
					patches: [
						{
							find: '.UNREAD_HIGHLIGHT',
							replacement: {
								match: /\(\).children.+?:null(?<=(\i)=\i\.channel,.+?)/,
								replace: (e, t) =>
									`${e},$self.TypingIndicator(${t}.id)`,
							},
						},
					],
					TypingIndicator: (e) =>
						o(k, { noop: !0 }, o(hI, { channelId: e })),
				}));
		});
	var km,
		Sb = m(() => {
			'use strict';
			a();
			gn();
			w();
			T();
			km = g({
				name: 'Unindent',
				description: 'Trims leading indentation from codeblocks',
				authors: [p.Ven],
				dependencies: ['MessageEventsAPI'],
				patches: [
					{
						find: 'inQuote:',
						replacement: {
							match: /,content:([^,]+),inQuote/,
							replace: (e, t) =>
								`,content:Vencord.Plugins.plugins.Unindent.unindent(${t}),inQuote`,
						},
					},
				],
				unindent(e) {
					e = e.replace(/\t/g, '    ');
					let t =
						e
							.match(/^ *(?=\S)/gm)
							?.reduce((n, i) => Math.min(n, i.length), 1 / 0) ??
						0;
					return t ? e.replace(new RegExp(`^ {${t}}`, 'gm'), '') : e;
				},
				unindentMsg(e) {
					e.content = e.content.replace(/```(.|\n)*?```/g, (t) => {
						let n = t.split(`
`);
						if (n.length < 2) return t;
						let i = '';
						return (
							n[n.length - 1] === '```' && (i = n.pop()),
							`${n[0]}
${this.unindent(
	n.slice(1).join(`
`),
)}
${i}`
						);
					});
				},
				start() {
					(this.preSend = rt((e, t) => this.unindentMsg(t))),
						(this.preEdit = Kn((e, t, n) => this.unindentMsg(n)));
				},
				stop() {
					st(this.preSend), Yn(this.preEdit);
				},
			});
		});
	var Lm,
		yI,
		Em,
		bb = m(() => {
			'use strict';
			a();
			w();
			T();
			(yI =
				'https://raw.githubusercontent.com/facebook/react/17.0.2/scripts/error-codes/codes.json'),
				(Em = g({
					name: 'ReactErrorDecoder',
					description:
						'Replaces "Minifed React Error" with the actual error.',
					authors: [p.Cyn],
					patches: [
						{
							find: '"https://reactjs.org/docs/error-decoder.html?invariant="',
							replacement: {
								match: /(function .\(.\)){(for\(var .="https:\/\/reactjs\.org\/docs\/error-decoder\.html\?invariant="\+.,.=1;.<arguments\.length;.\+\+\).\+="&args\[\]="\+encodeURIComponent\(arguments\[.\]\);return"Minified React error #"\+.\+"; visit "\+.\+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.")}/,
								replace: (e, t, n) =>
									`${t}{var decoded=Vencord.Plugins.plugins.ReactErrorDecoder.decodeError.apply(null, arguments);if(decoded)return decoded;${n}}`,
							},
						},
					],
					async start() {
						Lm = await fetch(yI)
							.then((e) => e.json())
							.catch((e) =>
								console.error(
									`[ReactErrorDecoder] Failed to fetch React error codes
`,
									e,
								),
							);
					},
					stop() {
						Lm = void 0;
					},
					decodeError(e, ...t) {
						let n = 0;
						return Lm?.[e]?.replace(/%s/g, () => {
							let i = t[n];
							return n++, i;
						});
					},
				}));
		});
	var Dm,
		Tb = m(() => {
			'use strict';
			a();
			wt();
			_s();
			w();
			T();
			Dm = g({
				name: 'UrbanDictionary',
				description:
					'Search for a word on Urban Dictionary via /urban slash command',
				authors: [p.jewdev],
				dependencies: ['CommandsAPI'],
				commands: [
					{
						name: 'urban',
						description:
							'Returns the definition of a word from Urban Dictionary',
						inputType: 0,
						options: [
							{
								type: 3,
								name: 'word',
								description:
									'The word to search for on Urban Dictionary',
								required: !0,
							},
						],
						execute: async (e, t) => {
							try {
								let n = encodeURIComponent(e[0].value),
									{
										list: [i],
									} = await (
										await fetch(
											`https://api.urbandictionary.com/v0/define?term=${n}`,
										)
									).json();
								if (!i)
									return void ie(t.channel.id, {
										content: 'No results found.',
									});
								let r = (s) =>
									s
										.replaceAll(
											`\r
`,
											`
`,
										)
										.replace(/([*>_`~\\])/gis, '\\$1')
										.replace(
											/\[(.+?)\]/g,
											(l, c) =>
												`[${c}](https://www.urbandictionary.com/define.php?term=${encodeURIComponent(
													c,
												)} "Define '${c}' on Urban Dictionary")`,
										)
										.trim();
								return void ie(t.channel.id, {
									embeds: [
										{
											type: 'rich',
											author: {
												name: `Uploaded by "${i.author}"`,
												url: `https://www.urbandictionary.com/author.php?author=${encodeURIComponent(
													i.author,
												)}`,
											},
											title: i.word,
											url: `https://www.urbandictionary.com/define.php?term=${encodeURIComponent(
												i.word,
											)}`,
											description: r(i.definition),
											fields: [
												{
													name: 'Example',
													value: r(i.example),
												},
												{
													name: 'Want more definitions?',
													value: `Check out [more definitions](https://www.urbandictionary.com/define.php?term=${n} "Define "${e[0].value}" on Urban Dictionary") on Urban Dictionary.`,
												},
											],
											color: 16750848,
											footer: {
												text: `\u{1F44D} ${i.thumbs_up.toString()} | \u{1F44E} ${i.thumbs_down.toString()}`,
												icon_url:
													'https://www.urbandictionary.com/favicon.ico',
											},
											timestamp: new Date(
												i.written_on,
											).toISOString(),
										},
									],
								});
							} catch (n) {
								ie(t.channel.id, {
									content: `Something went wrong: \`${n}\``,
								});
							}
						},
					},
				],
			});
		});
	var xb = m(() => {});
	var vI,
		SI,
		bI,
		wb,
		Mb = m(() => {
			'use strict';
			a();
			xb();
			_();
			x();
			(vI = P('selectChannel', 'selectVoiceChannel')),
				(SI = ce('.lastSection', '.children')),
				(bI = 1n << 20n),
				(wb = ({ channel: e, label: t, showHeader: n }) =>
					o(
						SI,
						null,
						n &&
							o(
								y.FormTitle,
								{ className: 'vc-uvs-header' },
								'In a voice channel',
							),
						o(
							R,
							{
								className: 'vc-uvs-button',
								color: R.Colors.TRANSPARENT,
								size: R.Sizes.SMALL,
								onClick: () => {
									et.can(bI, e)
										? vI.selectVoiceChannel(e.id)
										: Q.show({
												message:
													'Insufficient permissions to enter the channel.',
												id: 'user-voice-show-insufficient-permissions',
												type: Q.Type.FAILURE,
												options: {
													position: Q.Position.BOTTOM,
												},
										  });
								},
							},
							t,
						),
					));
		});
	var TI,
		xI,
		Om,
		Pb,
		_m,
		Ib = m(() => {
			'use strict';
			a();
			E();
			re();
			w();
			T();
			_();
			x();
			Mb();
			(TI = ue('VoiceStateStore')),
				(xI = P('section', 'lastSection')),
				(Om = N({
					showInUserProfileModal: {
						type: 3,
						description:
							"Show a user's voice channel in their profile modal",
						default: !0,
					},
					showVoiceChannelSectionHeader: {
						type: 3,
						description:
							'Whether to show "IN A VOICE CHANNEL" above the join button',
						default: !0,
					},
				})),
				(Pb = k.wrap(({ user: e }) => {
					let { channelId: t } = TI.getVoiceStateForUser(e.id) ?? {};
					if (!t) return null;
					let n = X.getChannel(t),
						i = le.getGuild(n.guild_id);
					if (!i) return null;
					let r = `${i.name} | ${n.name}`;
					return o(wb, {
						channel: n,
						label: r,
						showHeader: Om.store.showVoiceChannelSectionHeader,
					});
				})),
				(_m = g({
					name: 'UserVoiceShow',
					description:
						'Shows whether a User is currently in a voice channel somewhere in their profile',
					authors: [p.LordElias],
					settings: Om,
					patchModal({ user: e }) {
						return Om.store.showInUserProfileModal
							? o(
									'div',
									{ className: 'vc-uvs-modal-margin' },
									o(Pb, { user: e }),
							  )
							: null;
					},
					patchPopout: ({ user: e }) => {
						let t = e.id === U.getCurrentUser().id;
						return o(
							'div',
							{
								className: t
									? `vc-uvs-popout-margin ${xI.lastSection}`
									: '',
							},
							o(Pb, { user: e }),
						);
					},
					patches: [
						{
							find: '.showCopiableUsername',
							replacement: {
								match: /\(0,\w\.jsx\)\(\w{2},{user:\w,setNote/,
								replace: '$self.patchPopout(arguments[0]),$&',
							},
						},
						{
							find: '.USER_PROFILE_MODAL',
							replacement: {
								match: /\(\)\.body.+?displayProfile:\i}\),/,
								replace: '$&$self.patchModal(arguments[0]),',
							},
						},
					],
				}));
		});
	var Rb,
		Cb = m(() => {
			a();
			(window.VencordStyles ??= new Map()).set(
				'src/plugins/usrbg/index.css',
				{
					name: 'src/plugins/usrbg/index.css',
					source: `:is([class*="userProfile"], [class*="userPopout"]) [class*="bannerPremium"] {
    background: center / cover no-repeat;
}

[class*="NonPremium"]:has([class*="bannerPremium"]) [class*="avatarPositionNormal"],
[class*="PremiumWithoutBanner"]:has([class*="bannerPremium"]) [class*="avatarPositionPremiumNoBanner"] {
    top: 76px;
}

[style*="background-image"] [class*="background-"] {
    background-color: transparent !important;
}
`,
					classNames: {},
					dom: null,
				},
			);
			Rb = 'src/plugins/usrbg/index.css';
		});
	var wI,
		zo,
		Fa,
		Fm,
		Ab = m(() => {
			'use strict';
			a();
			E();
			je();
			Wn();
			w();
			T();
			Cb();
			(wI =
				'https://raw.githubusercontent.com/AutumnVN/usrbg/main/usrbg.json'),
				(zo = {}),
				(Fa = N({
					nitroFirst: {
						description:
							'Banner to use if both Nitro and USRBG banners are present',
						type: 4,
						options: [
							{ label: 'Nitro banner', value: !0, default: !0 },
							{ label: 'USRBG banner', value: !1 },
						],
					},
					voiceBackground: {
						description:
							'Use USRBG banners as voice chat backgrounds',
						type: 3,
						default: !0,
						restartNeeded: !0,
					},
				})),
				(Fm = g({
					name: 'USRBG',
					description:
						'Displays user banners from USRBG, allowing anyone to get a banner without Nitro',
					authors: [p.AutumnVN, p.pylix, p.TheKodeToad],
					settings: Fa,
					patches: [
						{
							find: '.NITRO_BANNER,',
							replacement: [
								{
									match: /(\i)\.premiumType/,
									replace: '$self.premiumHook($1)||$&',
								},
								{
									match: /(\i)\.bannerSrc,/,
									replace: '$self.useBannerHook($1),',
								},
								{
									match: /\?\(0,\i\.jsx\)\(\i,{type:\i,shown/,
									replace:
										'&&$self.shouldShowBadge(arguments[0])$&',
								},
							],
						},
						{
							find: '"data-selenium-video-tile":',
							predicate: () => Fa.store.voiceBackground,
							replacement: [
								{
									match: /(\i)\.style,/,
									replace: '$self.voiceBackgroundHook($1),',
								},
							],
						},
					],
					settingsAboutComponent: () =>
						o(
							We,
							{
								href: 'https://github.com/AutumnVN/usrbg#how-to-request-your-own-usrbg-banner',
							},
							'CLICK HERE TO GET YOUR OWN BANNER',
						),
					voiceBackgroundHook({
						className: e,
						participantUserId: t,
					}) {
						if (e.includes('tile-') && zo[t])
							return {
								backgroundImage: `url(${zo[t]})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat',
							};
					},
					useBannerHook({ displayProfile: e, user: t }) {
						if (!(e?.banner && Fa.store.nitroFirst) && zo[t.id])
							return zo[t.id];
					},
					premiumHook({ userId: e }) {
						if (zo[e]) return 2;
					},
					shouldShowBadge({ displayProfile: e, user: t }) {
						return e?.banner && (!zo[t.id] || Fa.store.nitroFirst);
					},
					async start() {
						Je(Rb);
						let e = await fetch(wI);
						e.ok && (zo = await e.json());
					},
				}));
		});
	function II(e) {
		let t = Math.floor(Math.random() * e.length);
		return e[t];
	}
	function kb(e) {
		e = e.toLowerCase();
		for (let t of PI) e = e.replaceAll(t[0], t[1]);
		return (
			(e = e
				.replaceAll(/([ \t\n])n/g, '$1ny')
				.replaceAll(/[lr]/g, 'w')
				.replaceAll(/([ \t\n])([a-z])/g, (t, n, i) =>
					Math.random() < 0.5 ? `${n}${i}-${i}` : `${n}${i}`,
				)
				.replaceAll(
					/([^.,!][.,!])([ \t\n])/g,
					(t, n, i) => `${n} ${II(MI)}${i}`,
				)),
			e
		);
	}
	var MI,
		PI,
		Nb,
		Bm,
		Lb = m(() => {
			'use strict';
			a();
			wt();
			gn();
			E();
			w();
			T();
			(MI = [
				'rawr x3',
				'OwO',
				'UwU',
				'o.O',
				'-.-',
				'>w<',
				'(\u2445\u02D8\uA4B3\u02D8)',
				'(\uA20D\u1D17\uA20D)',
				'(\u02D8\u03C9\u02D8)',
				'(U \u1D55 U\u2741)',
				'\u03C3\u03C9\u03C3',
				'\xF2\u03C9\xF3',
				'(///\u02EC///\u273F)',
				'(U \uFE4F U)',
				'( \u0361o \u03C9 \u0361o )',
				'\u0298w\u0298',
				':3',
				':3',
				'XD',
				'nyaa~~',
				'mya',
				'>_<',
				'\u{1F633}',
				'\u{1F97A}',
				'\u{1F633}\u{1F633}\u{1F633}',
				'rawr',
				'^^',
				'^^;;',
				'(\u02C6 \uFECC \u02C6)\u2661',
				'^\u2022\uFECC\u2022^',
				'/(^\u2022\u03C9\u2022^)',
				'(\u273Fo\u03C9o)',
			]),
				(PI = [
					['small', 'smol'],
					['cute', 'kawaii~'],
					['fluff', 'floof'],
					['love', 'luv'],
					['stupid', 'baka'],
					['what', 'nani'],
					['meow', 'nya~'],
				]),
				(Nb = N({
					uwuEveryMessage: {
						description: 'Make every single message uwuified',
						type: 3,
						default: !1,
						restartNeeded: !1,
					},
				}));
			Bm = g({
				name: 'UwUifier',
				description: 'Simply uwuify commands',
				authors: [p.echo, p.skyevg, p.PandaNinjas],
				dependencies: ['CommandsAPI', 'MessageEventsAPI'],
				settings: Nb,
				commands: [
					{
						name: 'uwuify',
						description: 'uwuifies your messages',
						options: [Do],
						execute: (e) => ({ content: kb(De(e, 'message', '')) }),
					},
				],
				onSend(e) {
					Nb.store.uwuEveryMessage && (e.content = kb(e.content));
				},
				start() {
					(this.preSend = rt((e, t) => this.onSend(t))),
						(this.preEdit = Kn((e, t, n) => this.onSend(n)));
				},
				stop() {
					st(this.preSend), Yn(this.preEdit);
				},
			});
		});
	function CI({
		data: e,
		UserMention: t,
		RoleMention: n,
		parse: i,
		props: r,
	}) {
		let [s, l] = V(e.userId);
		if (s)
			return o(t, {
				className: 'mention',
				userId: s,
				channelId: e.channelId,
				inlinePreview: r.noStyleAndInteraction,
				key: r.key,
			});
		let c = i(e.content, r);
		return o(
			n,
			{ ...e, inlinePreview: r.formatInline },
			o(
				'span',
				{
					onMouseEnter: () => {
						let u = c?.[0];
						if (typeof u != 'string') return;
						let h = u.match(/<@(\d+)>/)?.[1];
						if (!h || Ba.has(h)) return;
						if (U.getUser(h)) return l(h);
						let f = () => {
							Ba.add(h),
								Eb.unshift(() =>
									RI(h)
										.then(() => {
											l(h), Ba.delete(h);
										})
										.catch((v) => {
											v?.status === 429 &&
												(Eb.unshift(() =>
													no(1e3).then(f),
												),
												Ba.delete(h));
										})
										.finally(() => no(300)),
								);
						};
						f();
					},
				},
				c,
			),
		);
	}
	var Ba,
		Eb,
		RI,
		$m,
		Db = m(() => {
			'use strict';
			a();
			re();
			w();
			de();
			Qo();
			T();
			_();
			x();
			(Ba = new Set()), (Eb = new dn(5)), (RI = ce('USER('));
			$m = g({
				name: 'ValidUser',
				description:
					"Fix mentions for unknown users showing up as '<@343383572805058560>' (hover over a mention to fix it)",
				authors: [p.Ven],
				tags: ['MentionCacheFix'],
				patches: [
					{
						find: 'className:"mention"',
						replacement: {
							match: /react:(?=function\(\i,\i,\i\).{0,50}return null==\i\?\(0,\i\.jsx\)\((\i),.+?jsx\)\((\i),\{className:"mention")/,
							replace:
								'react:(...args)=>$self.renderMention($1,$2,...args),originalReact:',
						},
					},
				],
				renderMention(e, t, n, i, r) {
					return o(
						k,
						{ noop: !0 },
						o(CI, {
							RoleMention: e,
							UserMention: t,
							data: n,
							parse: i,
							props: r,
						}),
					);
				},
			});
		});
	var Um,
		Gm,
		Ob = m(() => {
			'use strict';
			a();
			w();
			T();
			x();
			(Um = {}),
				(Gm = g({
					name: 'VoiceChatDoubleClick',
					description:
						'Join voice chats via double click instead of single click',
					authors: [p.Ven, p.D3SOX],
					patches: [
						{
							find: 'VoiceChannel.renderPopout',
							replacement: [
								{
									match: /onClick:function\(\)\{(e\.handleClick.+?)}/g,
									replace:
										'onClick:function(){$self.schedule(()=>{$1},e)}',
								},
							],
						},
						{
							find: '.shouldCloseDefaultModals',
							replacement: {
								match: /onClick:(\i)(?=,.{0,30}className:"channelMention".+?(\i)\.inContent)/,
								replace: (e, t, n) =>
									`onClick:(vcDoubleClickEvt)=>$self.shouldRunOnClick(vcDoubleClickEvt,${n})&&${t}()`,
							},
						},
					],
					shouldRunOnClick(e, { channelId: t }) {
						let n = X.getChannel(t);
						return !n || ![2, 13].includes(n.type)
							? !0
							: e.detail >= 2;
					},
					schedule(e, t) {
						let n = t.props.channel.id;
						if (fe.getVoiceChannelId() === n) {
							e();
							return;
						}
						let i = (Um[n] ??= { timeout: void 0, i: 0 });
						clearTimeout(i.timeout),
							++i.i >= 2
								? (e(), delete Um[n])
								: (i.timeout = setTimeout(() => {
										delete Um[n];
								  }, 500));
					},
				}));
		});
	function $a(e, t = M.plugins.VcNarrator) {
		if (!e) return;
		let n = new SpeechSynthesisUtterance(e),
			i = speechSynthesis.getVoices().find((r) => r.voiceURI === t.voice);
		(!i &&
			(new Z('VcNarrator').error(
				`Voice "${t.voice}" not found. Resetting to default.`,
			),
			(i = speechSynthesis.getVoices().find((r) => r.default)),
			(t.voice = i?.voiceURI),
			!i)) ||
			((n.voice = i),
			(n.volume = t.volume),
			(n.rate = t.rate),
			speechSynthesis.speak(n));
	}
	function Fb(e) {
		let t = M.plugins.VcNarrator.latinOnly
			? /[^\p{Script=Latin}\p{Number}\p{Punctuation}\s]/gu
			: /[^\p{Letter}\p{Number}\p{Punctuation}\s]/gu;
		return e.normalize('NFKC').replace(t, '').trim();
	}
	function Ua(e, t, n) {
		return e
			.replaceAll('{{USER}}', Fb(t) || (t ? 'Someone' : ''))
			.replaceAll('{{CHANNEL}}', Fb(n) || 'channel');
	}
	function AI({ channelId: e, oldChannelId: t }, n) {
		if ((n && e !== Hm && ((t = Hm), (Hm = e)), e !== t)) {
			if (e) return [t ? 'move' : 'join', e];
			if (t) return ['leave', t];
		}
		return ['', ''];
	}
	function NI(e, t) {
		let n = Object.assign({}, M.plugins.VcNarrator, e);
		$a(Ua(n[t + 'Message'], U.getCurrentUser().username, 'general'), n);
	}
	var _b,
		Hm,
		zm,
		Bb = m(() => {
			'use strict';
			a();
			E();
			Ui();
			w();
			Se();
			Xe();
			ro();
			T();
			_();
			x();
			_b = P(
				'getVoiceStatesForChannel',
				'getCurrentClientVoiceChannelId',
			);
			zm = g({
				name: 'VcNarrator',
				description:
					'Announces when users join, leave, or move voice channels via narrator',
				authors: [p.Ven],
				flux: {
					VOICE_STATE_UPDATES({ voiceStates: e }) {
						let t = fe.getVoiceChannelId(),
							n = U.getCurrentUser().id;
						for (let i of e) {
							let {
									userId: r,
									channelId: s,
									oldChannelId: l,
								} = i,
								c = r === n;
							if (!c && (!t || (s !== t && l !== t))) continue;
							let [u, h] = AI(i, c);
							if (!u) continue;
							let f = M.plugins.VcNarrator[u + 'Message'],
								v =
									c && !M.plugins.VcNarrator.sayOwnName
										? ''
										: U.getUser(r).username,
								S = X.getChannel(h).name;
							$a(Ua(f, v, S));
						}
					},
					AUDIO_TOGGLE_SELF_MUTE() {
						let e = fe.getVoiceChannelId(),
							t = _b.getVoiceStateForChannel(e);
						if (!t) return;
						let n = t.mute || t.selfMute ? 'unmute' : 'mute';
						$a(
							Ua(
								M.plugins.VcNarrator[n + 'Message'],
								'',
								X.getChannel(e).name,
							),
						);
					},
					AUDIO_TOGGLE_SELF_DEAF() {
						let e = fe.getVoiceChannelId(),
							t = _b.getVoiceStateForChannel(e);
						if (!t) return;
						let n = t.deaf || t.selfDeaf ? 'undeafen' : 'deafen';
						$a(
							Ua(
								M.plugins.VcNarrator[n + 'Message'],
								'',
								X.getChannel(e).name,
							),
						);
					},
				},
				start() {
					if (
						typeof speechSynthesis > 'u' ||
						speechSynthesis.getVoices().length === 0
					) {
						new Z('VcNarrator').warn(
							'SpeechSynthesis not supported or no Narrator voices found. Thus, this plugin will not work. Check my Settings for more info',
						);
						return;
					}
				},
				optionsCache: null,
				get options() {
					return (this.optionsCache ??= {
						voice: {
							type: 4,
							description: 'Narrator Voice',
							options:
								window.speechSynthesis
									?.getVoices()
									.map((e) => ({
										label: e.name,
										value: e.voiceURI,
										default: e.default,
									})) ?? [],
						},
						volume: {
							type: 5,
							description: 'Narrator Volume',
							default: 1,
							markers: [0, 0.25, 0.5, 0.75, 1],
							stickToMarkers: !1,
						},
						rate: {
							type: 5,
							description: 'Narrator Speed',
							default: 1,
							markers: [0.1, 0.5, 1, 2, 5, 10],
							stickToMarkers: !1,
						},
						sayOwnName: {
							description: 'Say own name',
							type: 3,
							default: !1,
						},
						latinOnly: {
							description:
								'Strip non latin characters from names before saying them',
							type: 3,
							default: !1,
						},
						joinMessage: {
							type: 0,
							description: 'Join Message',
							default: '{{USER}} joined',
						},
						leaveMessage: {
							type: 0,
							description: 'Leave Message',
							default: '{{USER}} left',
						},
						moveMessage: {
							type: 0,
							description: 'Move Message',
							default: '{{USER}} moved to {{CHANNEL}}',
						},
						muteMessage: {
							type: 0,
							description: 'Mute Message (only self for now)',
							default: '{{USER}} Muted',
						},
						unmuteMessage: {
							type: 0,
							description: 'Unmute Message (only self for now)',
							default: '{{USER}} unmuted',
						},
						deafenMessage: {
							type: 0,
							description: 'Deafen Message (only self for now)',
							default: '{{USER}} deafened',
						},
						undeafenMessage: {
							type: 0,
							description: 'Undeafen Message (only self for now)',
							default: '{{USER}} undeafened',
						},
					});
				},
				settingsAboutComponent({ tempSettings: e }) {
					let [t, n] = Ut(() => {
							let s = speechSynthesis.getVoices();
							return [
								s.length !== 0,
								s.some((l) => l.lang.startsWith('en')),
							];
						}, []),
						i = Ut(
							() =>
								Object.keys(
									Vencord.Plugins.plugins.VcNarrator.options,
								)
									.filter((s) => s.endsWith('Message'))
									.map((s) => s.slice(0, -7)),
							[],
						),
						r = null;
					if (t)
						n ||
							(r = o(
								Hn,
								null,
								"You don't have any English voices installed, so the narrator might sound weird",
							));
					else {
						let s = 'No narrator voices found. ';
						(s += navigator.platform
							?.toLowerCase()
							.includes('linux')
							? 'Install speech-dispatcher or espeak and run Discord with the --enable-speech-dispatcher flag'
							: 'Try installing some in the Narrator settings of your Operating System'),
							(r = o(Hn, null, s));
					}
					return o(
						y.FormSection,
						null,
						o(
							y.FormText,
							null,
							'You can customise the spoken messages below. You can disable specific messages by setting them to nothing',
						),
						o(
							y.FormText,
							null,
							'The special placeholders ',
							o('code', null, '{{USER}}'),
							' and ',
							o('code', null, '{{CHANNEL}}'),
							' ',
							"will be replaced with the user's name (nothing if it's yourself) and the channel's name respectively",
						),
						n &&
							o(
								d,
								null,
								o(
									y.FormTitle,
									{ className: G.top20, tag: 'h3' },
									'Play Example Sounds',
								),
								o(
									'div',
									{
										style: {
											display: 'grid',
											gridTemplateColumns:
												'repeat(4, 1fr)',
											gap: '1rem',
										},
										className: 'vc-narrator-buttons',
									},
									i.map((s) =>
										o(
											R,
											{ key: s, onClick: () => NI(e, s) },
											ko([s]),
										),
									),
								),
							),
						r,
					);
				},
			});
		});
	var $b = m(() => {});
	function LI(e) {
		let t = [];
		for (let n of Object.values(Vencord.Plugins.plugins))
			n.toolboxActions &&
				t.push(
					o(
						F.MenuGroup,
						{ label: n.name, key: `vc-toolbox-${n.name}` },
						Object.entries(n.toolboxActions).map(([i, r]) => {
							let s = `vc-toolbox-${n.name}-${i}`;
							return o(F.MenuItem, {
								id: s,
								key: s,
								label: i,
								action: r,
							});
						}),
					),
				);
		return o(
			F.Menu,
			{ navId: 'vc-toolbox', onClose: e },
			o(F.MenuItem, {
				id: 'vc-toolbox-notifications',
				label: 'Open Notification Log',
				action: us,
			}),
			o(F.MenuItem, {
				id: 'vc-toolbox-quickcss',
				label: 'Open QuickCSS',
				action: () => VencordNative.quickCss.openEditor(),
			}),
			...t,
		);
	}
	function EI() {
		return o(
			'svg',
			{
				xmlns: 'http://www.w3.org/2000/svg',
				viewBox: '0 0 96 96',
				width: 24,
				height: 24,
			},
			o('path', {
				fill: 'currentColor',
				d: 'M53 10h7v1h-1v1h-1v1h-1v1h-1v1h-1v1h5v1h-7v-1h1v-1h1v-1h1v-1h1v-1h1v-1h-5m-43 1v32h2v2h2v2h2v2h2v2h2v2h2v2h2v2h2v2h8v-2h2V46h-2v2h-2v2h-4v-2h-2v-2h-2v-2h-2v-2h-2v-2h-2V12m24 0v27h-2v3h4v-6h2v-2h4V12m13 2h5v1h-1v1h-1v1h-1v1h3v1h-5v-1h1v-1h1v-1h1v-1h-3m8 5h1v5h1v-1h1v1h-1v1h1v-1h1v1h-1v3h-1v1h-2v1h-1v1h1v-1h2v-1h1v2h-1v1h-2v1h-1v-1h-1v1h-6v-1h-1v-1h-1v-2h1v1h2v1h3v1h1v-1h-1v-1h-3v-1h-4v-4h1v-2h1v-1h1v-1h1v2h1v1h1v-1h1v1h-1v1h2v-2h1v-2h1v-1h1m-13 4h2v1h-1v4h1v2h1v1h1v1h1v1h4v1h-6v-1h-6v-1h-1v-5h1v-1h1v-2h2m17 3h1v3h-1v1h-1v1h-1v2h-2v-2h2v-1h1v-1h1m1 0h1v3h-1v1h-2v-1h1v-1h1m-30 2v8h-8v32h8v8h32v-8h8v-8H70v8H54V44h16v8h16v-8h-8v-8h-1v1h-7v-1h-2v1h-8v-1',
			}),
		);
	}
	function DI() {
		let [e, t] = V(!1);
		return o(
			Ai,
			{
				position: 'bottom',
				align: 'right',
				animation: Ai.Animation.NONE,
				shouldShow: e,
				onRequestClose: () => t(!1),
				renderPopout: () => LI(() => t(!1)),
			},
			(n, { isShown: i }) =>
				o(kI, {
					className: 'vc-toolbox-btn',
					onClick: () => t((r) => !r),
					tooltip: i ? null : 'Vencord Toolbox',
					icon: EI,
					selected: i,
				}),
		);
	}
	function OI({ children: e }) {
		return (
			e.splice(e.length - 1, 0, o(k, { noop: !0 }, o(DI, null))),
			o(d, null, e)
		);
	}
	var kI,
		jm,
		Ub = m(() => {
			'use strict';
			a();
			$b();
			ps();
			re();
			w();
			ye();
			T();
			_();
			x();
			kI = oe(() => He('.HEADER_BAR_BADGE,', '.tooltip'));
			jm = g({
				name: 'VencordToolbox',
				description:
					'Adds a button next to the inbox button in the channel header that houses Vencord quick actions',
				authors: [p.Ven, p.AutumnVN],
				patches: [
					{
						find: '.mobileToolbar',
						replacement: {
							match: /(?<=toolbar:function.{0,100}\()\i.Fragment,/,
							replace: '$self.ToolboxFragmentWrapper,',
						},
					},
				],
				ToolboxFragmentWrapper: k.wrap(OI, {
					fallback: () =>
						o(
							'p',
							{ style: { color: 'red' } },
							'Failed to render :(',
						),
				}),
			});
		});
	function Br(e) {
		let t = e.startsWith('/') ? 'png' : zb.store.format,
			n = new URL(e, window.location.href);
		n.searchParams.set('size', '512'),
			(n.pathname = n.pathname.replace(/\.(png|jpe?g|webp)$/, `.${t}`)),
			(e = n.toString()),
			be((i) =>
				o(
					Ie,
					{ size: 'dynamic', ...i },
					o(_I, {
						shouldAnimate: !0,
						original: e,
						src: e,
						renderLinkComponent: FI,
					}),
				),
			);
	}
	var _I,
		FI,
		Ga,
		zb,
		Gb,
		Hb,
		Wm,
		jb = m(() => {
			'use strict';
			a();
			Jt();
			E();
			Bo();
			w();
			ze();
			ye();
			T();
			_();
			x();
			(_I = oe(() => He('.MEDIA_MODAL_CLOSE,'))),
				(FI = oe(() =>
					ht((e) => e.type?.toString().includes('MASKED_LINK)')),
				)),
				(Ga = P('getGuildBannerURL')),
				(zb = N({
					format: {
						type: 4,
						description:
							'Choose the image format to use for non animated images. Animated images will always use .gif',
						options: [
							{ label: 'webp', value: 'webp', default: !0 },
							{ label: 'png', value: 'png' },
							{ label: 'jpg', value: 'jpg' },
						],
					},
				}));
			(Gb =
				(e, { user: t, guildId: n }) =>
				() => {
					let i = ke.getMember(n, t.id)?.avatar || null;
					e.splice(
						-1,
						0,
						o(
							F.MenuGroup,
							null,
							o(F.MenuItem, {
								id: 'view-avatar',
								label: 'View Avatar',
								action: () =>
									Br(Ga.getUserAvatarURL(t, !0, 512)),
								icon: Fo,
							}),
							i &&
								o(F.MenuItem, {
									id: 'view-server-avatar',
									label: 'View Server Avatar',
									action: () =>
										Br(
											Ga.getGuildMemberAvatarURLSimple(
												{
													userId: t.id,
													avatar: i,
													guildId: n,
												},
												!0,
											),
										),
									icon: Fo,
								}),
						),
					);
				}),
				(Hb =
					(e, { guild: { id: t, icon: n, banner: i } }) =>
					() => {
						(!i && !n) ||
							e.splice(
								-1,
								0,
								o(
									F.MenuGroup,
									null,
									n
										? o(F.MenuItem, {
												id: 'view-icon',
												label: 'View Icon',
												action: () =>
													Br(
														Ga.getGuildIconURL({
															id: t,
															icon: n,
															size: 512,
															canAnimate: !0,
														}),
													),
												icon: Fo,
										  })
										: null,
									i
										? o(F.MenuItem, {
												id: 'view-banner',
												label: 'View Banner',
												action: () =>
													Br(
														Ga.getGuildBannerURL(
															{
																id: t,
																banner: i,
															},
															!0,
														),
													),
												icon: Fo,
										  })
										: null,
								),
							);
					}),
				(Wm = g({
					name: 'ViewIcons',
					authors: [p.Ven, p.TheKodeToad, p.Nuckyz],
					description:
						'Makes avatars and banners in user profiles clickable, and adds View Icon/Banner entries in the user and server context menu',
					tags: ['ImageUtilities'],
					settings: zb,
					openImage: Br,
					start() {
						we('user-context', Gb), we('guild-context', Hb);
					},
					stop() {
						Ae('user-context', Gb), Ae('guild-context', Hb);
					},
					patches: [
						{
							find: 'onAddFriend:',
							replacement: {
								match: /\{src:(\i)(?=,avatarDecoration)/,
								replace:
									'{src:$1,onClick:()=>$self.openImage($1)',
							},
						},
						{
							find: '.NITRO_BANNER,',
							replacement: {
								match: /style:\{(?=backgroundImage:(\i&&\i)\?"url\("\.concat\((\i),)/,
								replace:
									'onClick:()=>$1&&$self.openImage($2),style:{cursor:$1?"pointer":void 0,',
							},
						},
						{
							find: '().avatarWrapperNonUserBot',
							replacement: {
								match: /(?<=avatarPositionPanel.+?)onClick:(\i\|\|\i)\?void 0(?<=,(\i)=\i\.avatarSrc.+?)/,
								replace:
									'style:($1)?{cursor:"pointer"}:{},onClick:$1?()=>{$self.openImage($2)}',
							},
						},
					],
				}));
		});
	function $I(e) {
		return Object.fromEntries(
			Object.entries(e).sort(([t], [n]) => t.localeCompare(n)),
		);
	}
	function UI(e) {
		let t = $I(JSON.parse(JSON.stringify(e)));
		for (let i in t.author)
			switch (i) {
				case 'id':
				case 'username':
				case 'usernameNormalized':
				case 'discriminator':
				case 'avatar':
				case 'bot':
				case 'system':
				case 'publicFlags':
					break;
				default:
					delete t.author[i];
			}
		let n = t;
		return (
			delete n.editHistory,
			delete n.deleted,
			n.attachments?.forEach((i) => delete i.deleted),
			t
		);
	}
	function Wb(e) {
		return o(
			'div',
			{ style: { userSelect: 'text' } },
			Pe.defaultRules.codeBlock.react(e, null, {}),
		);
	}
	function GI(e) {
		e = UI(e);
		let t = JSON.stringify(e, null, 4),
			n = be((i) =>
				o(
					k,
					null,
					o(
						Ie,
						{ ...i, size: 'large' },
						o(
							$e,
							null,
							o(
								q,
								{
									variant: 'heading-lg/semibold',
									style: { flexGrow: 1 },
								},
								'View Raw',
							),
							o(St, { onClick: () => Gn(n) }),
						),
						o(
							Le,
							null,
							o(
								'div',
								{ style: { padding: '16px 0' } },
								!!e.content &&
									o(
										d,
										null,
										o(
											y.FormTitle,
											{ tag: 'h5' },
											'Content',
										),
										o(Wb, { content: e.content, lang: '' }),
										o(y.FormDivider, {
											className: G.bottom20,
										}),
									),
								o(y.FormTitle, { tag: 'h5' }, 'Message Data'),
								o(Wb, { content: t, lang: 'json' }),
							),
						),
						o(
							ot,
							null,
							o(
								ae,
								{ cellSpacing: 10 },
								o(
									R,
									{
										onClick: () =>
											ln(
												t,
												'Message data copied to clipboard!',
											),
									},
									'Copy Message JSON',
								),
								o(
									R,
									{
										onClick: () =>
											ln(
												e.content,
												'Content copied to clipboard!',
											),
									},
									'Copy Raw Content',
								),
							),
						),
					),
				),
			);
	}
	var BI,
		qm,
		qb = m(() => {
			'use strict';
			a();
			Oo();
			re();
			xt();
			w();
			Xe();
			de();
			ze();
			T();
			x();
			BI = () =>
				o(
					'svg',
					{
						viewBox: '0 0 20 20',
						fill: 'currentColor',
						'aria-hidden': 'true',
						width: '22',
						height: '22',
					},
					o('path', {
						d: 'M12.9297 3.25007C12.7343 3.05261 12.4154 3.05226 12.2196 3.24928L11.5746 3.89824C11.3811 4.09297 11.3808 4.40733 11.5739 4.60245L16.5685 9.64824C16.7614 9.84309 16.7614 10.1569 16.5685 10.3517L11.5739 15.3975C11.3808 15.5927 11.3811 15.907 11.5746 16.1017L12.2196 16.7507C12.4154 16.9477 12.7343 16.9474 12.9297 16.7499L19.2604 10.3517C19.4532 10.1568 19.4532 9.84314 19.2604 9.64832L12.9297 3.25007Z',
					}),
					o('path', {
						d: 'M8.42616 4.60245C8.6193 4.40733 8.61898 4.09297 8.42545 3.89824L7.78047 3.24928C7.58466 3.05226 7.26578 3.05261 7.07041 3.25007L0.739669 9.64832C0.5469 9.84314 0.546901 10.1568 0.739669 10.3517L7.07041 16.7499C7.26578 16.9474 7.58465 16.9477 7.78047 16.7507L8.42545 16.1017C8.61898 15.907 8.6193 15.5927 8.42616 15.3975L3.43155 10.3517C3.23869 10.1569 3.23869 9.84309 3.43155 9.64824L8.42616 4.60245Z',
					}),
				);
			qm = g({
				name: 'ViewRaw',
				description:
					'Copy and view the raw content/data of any message.',
				authors: [p.KingFish, p.Ven],
				dependencies: ['MessagePopoverAPI'],
				start() {
					yn('ViewRaw', (e) => ({
						label: 'View Raw (Left Click) / Copy Raw (Right Click)',
						icon: BI,
						message: e,
						channel: X.getChannel(e.channel_id),
						onClick: () => GI(e),
						onContextMenu: (t) => {
							t.preventDefault(),
								t.stopPropagation(),
								ln(e.content);
						},
					}));
				},
				stop() {
					vn('CopyRawMessage');
				},
			});
		});
	async function HI(e) {
		let t = await fetch(e);
		if (t.status === 200) return await t.blob();
	}
	var zI,
		xi,
		Km,
		Kb = m(() => {
			'use strict';
			a();
			E();
			w();
			T();
			Gl();
			_();
			x();
			(zI = Ce((e) => e.emitter?._events?.INSERT_TEXT)),
				(xi = N({
					addBack: {
						type: 3,
						description:
							'Add back the Discord context menus for images, links and the chat input bar',
						default: !1,
						restartNeeded: !0,
					},
				})),
				(Km = g({
					name: 'WebContextMenus',
					description:
						"Re-adds context menus missing in the web version of Discord: Images, ChatInputBar, Links, 'Copy Link', 'Open Link', 'Copy Image', 'Save Image'",
					authors: [p.Ven],
					enabledByDefault: !0,
					settings: xi,
					start() {
						if (xi.store.addBack) {
							let e = an('contextMenuCallbackNative');
							window.removeEventListener(
								'contextmenu',
								e.contextMenuCallbackWeb,
							),
								window.addEventListener(
									'contextmenu',
									e.contextMenuCallbackNative,
								),
								(this.changedListeners = !0);
						}
					},
					stop() {
						if (this.changedListeners) {
							let e = an('contextMenuCallbackNative');
							window.removeEventListener(
								'contextmenu',
								e.contextMenuCallbackNative,
							),
								window.addEventListener(
									'contextmenu',
									e.contextMenuCallbackWeb,
								);
						}
					},
					patches: [
						{
							find: 'open-native-link',
							replacement: [
								{
									match: /if\(!\i\.\i\|\|null==/,
									replace: 'if(null==',
								},
								{
									match: /\w\.default\.copy/,
									replace:
										'Vencord.Webpack.Common.Clipboard.copy',
								},
							],
						},
						{
							find: 'id:"copy-image"',
							replacement: [
								{
									match: /if\(!\i\.\i\|\|null==/,
									replace: 'if(null==',
								},
								{
									match: /return\s*?\[\i\.default\.canCopyImage\(\)/,
									replace: 'return [true',
								},
								{
									match: /(?<=COPY_IMAGE_MENU_ITEM,)action:/,
									replace:
										'action:()=>$self.copyImage(arguments[0]),oldAction:',
								},
								{
									match: /(?<=SAVE_IMAGE_MENU_ITEM,)action:/,
									replace:
										'action:()=>$self.saveImage(arguments[0]),oldAction:',
								},
							],
						},
						{
							find: 'navId:"image-context"',
							predicate: () => xi.store.addBack,
							replacement: {
								match: /return \i\.\i\?/,
								replace: 'return true?',
							},
						},
						{
							find: '"interactionUsernameProfile"',
							predicate: () => xi.store.addBack,
							replacement: {
								match: /if\("A"===\i\.tagName&&""!==\i\.textContent\)/,
								replace: 'if(false)',
							},
						},
						{
							find: '"slate-toolbar"',
							predicate: () => xi.store.addBack,
							replacement: {
								match: /(?<=\.handleContextMenu=.+?"bottom";)\i\.\i\?/,
								replace: 'true?',
							},
						},
						{
							find: ':"command-suggestions"',
							predicate: () => xi.store.addBack,
							replacement: [
								{
									match: /\i=.{0,30}text:\i,target:\i,onHeightUpdate:\i\}\),2\),(\i)=\i\[0\],(\i)=\i\[1\]/,
									replace: '$1=[],$2=[]',
								},
								{
									match: /if\(!\i\.\i\)return null;/,
									replace: '',
								},
								{
									match: /("submit-button".+?)(\(0,\i\.jsx\)\(\i\.MenuGroup,\{children:\i\}\),){2}/,
									replace: '$1',
								},
								{
									match: /\b\i\.default\.(copy|cut|paste)/g,
									replace: '$self.$1',
								},
							],
						},
					],
					async copyImage(e) {
						let t = new Image();
						(t.onload = () => {
							let n = document.createElement('canvas');
							(n.width = t.naturalWidth),
								(n.height = t.naturalHeight),
								n.getContext('2d').drawImage(t, 0, 0),
								n.toBlob((i) => {
									navigator.clipboard.write([
										new ClipboardItem({ 'image/png': i }),
									]);
								}, 'image/png');
						}),
							(t.crossOrigin = 'anonymous'),
							(t.src = e);
					},
					async saveImage(e) {
						let t = await HI(e);
						if (!t) return;
						let n = new URL(e).pathname.split('/').pop(),
							i = new File([t], n, { type: t.type });
						hs(i);
					},
					copy() {
						let e = document.getSelection();
						!e || jt.copy(e.toString());
					},
					cut() {
						this.copy(),
							zI.dispatch('INSERT_TEXT', { rawText: '' });
					},
					async paste() {
						let e = await navigator.clipboard.readText(),
							t = new DataTransfer();
						t.setData('text/plain', e),
							document.dispatchEvent(
								new ClipboardEvent('paste', {
									clipboardData: t,
								}),
							);
					},
				}));
		});
	function Yb(e, t, n) {
		let i = Ym.getSendMessageOptionsForReply({
			channel: e,
			message: t,
			shouldMention: !0,
			showMentionToggle: !0,
		});
		if (Ha.store.greetMode === 'Message' || n.length > 1) {
			i.stickerIds = n;
			let r = {
				content: '',
				tts: !1,
				invalidEmojis: [],
				validNonShortcutEmojis: [],
			};
			Ym._sendMessage(e.id, r, i);
		} else Ym.sendGreetMessage(e.id, n[0], i);
	}
	function jI({ stickers: e, channel: t, message: n }) {
		let i = Ha.use(['greetMode', 'multiGreetChoices']),
			{ greetMode: r, multiGreetChoices: s = [] } = i;
		return o(
			F.Menu,
			{
				navId: 'greet-sticker-picker',
				onClose: () => L.dispatch({ type: 'CONTEXT_MENU_CLOSE' }),
				'aria-label': 'Greet Sticker Picker',
			},
			o(
				F.MenuGroup,
				{ label: 'Greet Mode' },
				Object.values(Zb).map((l) =>
					o(F.MenuRadioItem, {
						key: l,
						group: 'greet-mode',
						id: 'greet-mode-' + l,
						label: l,
						checked: l === r,
						action: () => (i.greetMode = l),
					}),
				),
			),
			o(F.MenuSeparator, null),
			o(
				F.MenuGroup,
				{ label: 'Greet Stickers' },
				e.map((l) =>
					o(F.MenuItem, {
						key: l.id,
						id: 'greet-' + l.id,
						label: l.description.split(' ')[0],
						action: () => Yb(t, n, [l.id]),
					}),
				),
			),
			Ha.store.unholyMultiGreetEnabled
				? o(
						d,
						null,
						o(F.MenuSeparator, null),
						o(
							F.MenuItem,
							{
								label: 'Unholy Multi-Greet',
								id: 'unholy-multi-greet',
							},
							e.map((l) => {
								let c = s.some((u) => u === l.id);
								return o(F.MenuCheckboxItem, {
									key: l.id,
									id: 'multi-greet-' + l.id,
									label: l.description.split(' ')[0],
									checked: c,
									disabled: !c && s.length >= 3,
									action: () => {
										i.multiGreetChoices = c
											? s.filter((u) => u !== l.id)
											: [...s, l.id];
									},
								});
							}),
							o(F.MenuSeparator, null),
							o(F.MenuItem, {
								id: 'multi-greet-submit',
								label: 'Send Greets',
								action: () => Yb(t, n, s),
								disabled: s.length === 0,
							}),
						),
				  )
				: null,
		);
	}
	var Zb,
		Ha,
		Ym,
		Zm,
		Xb = m(() => {
			'use strict';
			a();
			E();
			w();
			T();
			_();
			x();
			(Zb = ((n) => (
				(n.Greet = 'Greet'), (n.NormalMessage = 'Message'), n
			))(Zb || {})),
				(Ha = N({
					greetMode: {
						type: 4,
						options: [
							{
								label: 'Greet (you can only greet 3 times)',
								value: 'Greet',
								default: !0,
							},
							{
								label: 'Normal Message (you can greet spam)',
								value: 'Message',
							},
						],
						description: 'Choose the greet mode',
					},
				})),
				(Ym = P('sendGreetMessage'));
			Zm = g({
				name: 'GreetStickerPicker',
				description:
					"Allows you to use any greet sticker instead of only the random one by right-clicking the 'Wave to say hi!' button",
				authors: [p.Ven],
				settings: Ha,
				patches: [
					{
						find: 'Messages.WELCOME_CTA_LABEL',
						replacement: {
							match: /innerClassName:\i\(\).welcomeCTAButton,(?<=%\i\.length;return (\i)\[\i\].+?)/,
							replace:
								'$&onContextMenu:(e)=>$self.pickSticker(e,$1,arguments[0]),',
						},
					},
				],
				pickSticker(e, t, n) {
					n.message.deleted ||
						Fn.open(e, () => o(jI, { stickers: t, ...n }));
				},
			});
		});
	function ZI(e, t, n) {
		let i = t.name + (t.id ? `:${t.id}` : '');
		return Yt.get({
			url: `/channels/${e.channel_id}/messages/${e.id}/reactions/${i}`,
			query: { limit: 100, type: n },
			oldFormErrors: !0,
		})
			.then((r) =>
				L.dispatch({
					type: 'MESSAGE_REACTION_ADD_USERS',
					channelId: e.channel_id,
					messageId: e.id,
					users: r.body,
					emoji: t,
					reactionType: n,
				}),
			)
			.catch(console.error)
			.finally(() => no(250));
	}
	function XI(e, t, n) {
		let i = `${e.id}:${t.name}:${t.id ?? ''}:${n}`,
			r = (KI.__getLocalVars().reactions[i] ??= {
				fetched: !1,
				users: {},
			});
		return (
			r.fetched || (YI.unshift(() => ZI(e, t, n)), (r.fetched = !0)),
			r.users
		);
	}
	function JI(e) {
		return function (n, i) {
			return o(
				W,
				{
					text: e
						.slice(5)
						.map((r) => r.username)
						.join(', '),
				},
				({ onMouseEnter: r, onMouseLeave: s }) =>
					o(
						'div',
						{
							className: qI.moreUsers,
							onMouseEnter: r,
							onMouseLeave: s,
						},
						'+',
						e.length - 5,
					),
			);
		};
	}
	function QI(e) {
		e.stopPropagation();
	}
	var WI,
		qI,
		KI,
		YI,
		Xm,
		Jb = m(() => {
			'use strict';
			a();
			re();
			w();
			de();
			Qo();
			ye();
			T();
			_();
			x();
			(WI = oe(() =>
				He('defaultRenderUser', 'showDefaultAvatarsForNullUsers'),
			)),
				(qI = P(
					'moreUsers',
					'emptyUser',
					'avatarContainer',
					'clickableAvatar',
				)),
				(KI = P('getReactions')),
				(YI = new dn());
			Xm = g({
				name: 'WhoReacted',
				description: 'Renders the Avatars of reactors',
				authors: [p.Ven, p.KannaDev],
				patches: [
					{
						find: ',reactionRef:',
						replacement: {
							match: /(?<=(\i)=(\i)\.hideCount,)(.+?reactionCount.+?\}\))/,
							replace: (e, t, n, i) =>
								`whoReactedProps=${n},${i},${t}?null:$self.renderUsers(whoReactedProps)`,
						},
					},
				],
				renderUsers(e) {
					return e.message.reactions.length > 10
						? null
						: o(k, { noop: !0 }, o(this._renderUsers, { ...e }));
				},
				_renderUsers({ message: e, emoji: t, type: n }) {
					let i = Bt();
					I.useEffect(() => {
						let l = (c) => {
							c.messageId === e.id && i();
						};
						return (
							L.subscribe('MESSAGE_REACTION_ADD_USERS', l),
							() => L.unsubscribe('MESSAGE_REACTION_ADD_USERS', l)
						);
					}, [e.id]);
					let r = XI(e, t, n),
						s = Object.values(r).filter(Boolean);
					for (let l of s)
						L.dispatch({ type: 'USER_UPDATE', user: l });
					return o(
						'div',
						{
							style: {
								marginLeft: '0.5em',
								transform: 'scale(0.9)',
							},
						},
						o(
							'div',
							{ onClick: QI },
							o(WI, {
								users: s,
								guildId: X.getChannel(e.channel_id)?.guild_id,
								renderIcon: !1,
								max: 5,
								showDefaultAvatarsForNullUsers: !0,
								showUserPopout: !0,
								renderMoreUsers: JI(s),
							}),
						),
					);
				},
			});
		});
	var Jm,
		Qb = m(() => {
			'use strict';
			a();
			wt();
			w();
			T();
			Jm = g({
				name: 'Wikisearch',
				description:
					'Searches Wikipedia for your requested query. (/wikisearch)',
				authors: [p.Samu],
				dependencies: ['CommandsAPI'],
				commands: [
					{
						name: 'wikisearch',
						description: 'Searches Wikipedia for your request.',
						inputType: 0,
						options: [
							{
								name: 'search',
								description: 'Word to search for',
								type: 3,
								required: !0,
							},
						],
						execute: async (e, t) => {
							let n = De(e, 'search', '');
							if (!n)
								return ie(t.channel.id, {
									content: 'No word was defined!',
								});
							let i = new URLSearchParams({
									action: 'query',
									format: 'json',
									list: 'search',
									formatversion: '2',
									origin: '*',
									srsearch: n,
								}),
								r = await fetch(
									'https://en.wikipedia.org/w/api.php?' + i,
								)
									.then((u) => u.json())
									.catch(
										(u) => (
											console.log(u),
											ie(t.channel.id, {
												content:
													'There was an error. Check the console for more info',
											}),
											null
										),
									);
							if (!r) return;
							if (!r.query?.search?.length)
								return (
									console.log(r),
									ie(t.channel.id, {
										content: 'No results given',
									})
								);
							let s = await fetch(
								`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info%7Cdescription%7Cimages%7Cimageinfo%7Cpageimages&list=&meta=&indexpageids=1&pageids=${r.query.search[0].pageid}&formatversion=2&origin=*`,
							)
								.then((u) => u.json())
								.then((u) => u.query.pages[0])
								.catch(
									(u) => (
										console.log(u),
										ie(t.channel.id, {
											content:
												'There was an error. Check the console for more info',
										}),
										null
									),
								);
							if (!s) return;
							let l = s.thumbnail,
								c = l && {
									url: l.source.replace(
										/(50px-)/gi,
										'1000px-',
									),
									height: l.height * 100,
									width: l.width * 100,
								};
							ie(t.channel.id, {
								embeds: [
									{
										type: 'rich',
										title: r.query.search[0].title,
										url: `https://wikipedia.org/w/index.php?curid=${r.query.search[0].pageid}`,
										color: '0x8663BE',
										description:
											r.query.search[0].snippet
												.replace(
													/(&nbsp;|<([^>]+)>)/gi,
													'',
												)
												.replace(/(&quot;)/gi, '"') +
											'...',
										image: c,
										footer: {
											text: 'Powered by the Wikimedia API',
										},
									},
								],
							});
						},
					},
				],
			});
		});
	var Te,
		ni = m(() => {
			a();
			Gf();
			Hf();
			bg();
			xg();
			wg();
			Mg();
			Pg();
			Ig();
			Rg();
			Cg();
			Ag();
			Ng();
			kg();
			Lg();
			_g();
			Fg();
			Wg();
			qg();
			Kg();
			Yg();
			Zg();
			Jg();
			Qg();
			nh();
			oh();
			ih();
			ch();
			mh();
			fh();
			xh();
			wh();
			Mh();
			kh();
			_h();
			Jh();
			Qh();
			Vh();
			ey();
			ty();
			ry();
			sy();
			cy();
			uy();
			my();
			Iu();
			Bs();
			Py();
			Ry();
			Ay();
			Ly();
			Oy();
			$y();
			Ky();
			Zy();
			Xy();
			Jy();
			Vy();
			ev();
			tv();
			nv();
			ov();
			iv();
			rv();
			sv();
			av();
			lv();
			cv();
			uv();
			pv();
			dv();
			yv();
			Js();
			Dv();
			qv();
			Kv();
			Xv();
			s1();
			a1();
			v1();
			S1();
			L1();
			E1();
			_1();
			J1();
			Q1();
			nS();
			rS();
			uS();
			kd();
			S0();
			b0();
			I0();
			Vd();
			O0();
			_0();
			F0();
			B0();
			q0();
			K0();
			Z0();
			Q0();
			eb();
			ab();
			lb();
			hb();
			vb();
			Cm();
			Sb();
			bb();
			Tb();
			Ib();
			Ab();
			Lb();
			Db();
			Ob();
			Bb();
			Ub();
			jb();
			qb();
			Kb();
			Xb();
			Jb();
			Qb();
			Te = {
				[Tl.name]: Tl,
				[xl.name]: xl,
				[jl.name]: jl,
				[Yl.name]: Yl,
				[Zl.name]: Zl,
				[Xl.name]: Xl,
				[Jl.name]: Jl,
				[Ql.name]: Ql,
				[Vl.name]: Vl,
				[ec.name]: ec,
				[tc.name]: tc,
				[nc.name]: nc,
				[oc.name]: oc,
				[ic.name]: ic,
				[cc.name]: cc,
				[uc.name]: uc,
				[mc.name]: mc,
				[fc.name]: fc,
				[gc.name]: gc,
				[hc.name]: hc,
				[yc.name]: yc,
				[vc.name]: vc,
				[Sc.name]: Sc,
				[Rc.name]: Rc,
				[Cc.name]: Cc,
				[Ac.name]: Ac,
				[Oc.name]: Oc,
				[_c.name]: _c,
				[Fc.name]: Fc,
				[Hc.name]: Hc,
				[Wc.name]: Wc,
				[qc.name]: qc,
				[Xc.name]: Xc,
				[Jc.name]: Jc,
				[su.name]: su,
				[au.name]: au,
				[lu.name]: lu,
				[cu.name]: cu,
				[pu.name]: pu,
				[hu.name]: hu,
				[yu.name]: yu,
				[Su.name]: Su,
				[bu.name]: bu,
				[xu.name]: xu,
				[Cu.name]: Cu,
				[ku.name]: ku,
				[Lu.name]: Lu,
				[Ou.name]: Ou,
				[_u.name]: _u,
				[Fu.name]: Fu,
				[$u.name]: $u,
				[ju.name]: ju,
				[Ku.name]: Ku,
				[Yu.name]: Yu,
				[Zu.name]: Zu,
				[Xu.name]: Xu,
				[Qu.name]: Qu,
				[tp.name]: tp,
				[op.name]: op,
				[ip.name]: ip,
				[rp.name]: rp,
				[sp.name]: sp,
				[ap.name]: ap,
				[lp.name]: lp,
				[cp.name]: cp,
				[up.name]: up,
				[pp.name]: pp,
				[dp.name]: dp,
				[mp.name]: mp,
				[fp.name]: fp,
				[gp.name]: gp,
				[xp.name]: xp,
				[wp.name]: wp,
				[Cp.name]: Cp,
				[Ap.name]: Ap,
				[Up.name]: Up,
				[jp.name]: jp,
				[Wp.name]: Wp,
				[qp.name]: qp,
				[Zp.name]: Zp,
				[id.name]: id,
				[rd.name]: rd,
				[sd.name]: sd,
				[md.name]: md,
				[fd.name]: fd,
				[gd.name]: gd,
				[hd.name]: hd,
				[Sd.name]: Sd,
				[Rr.name]: Rr,
				[Zd.name]: Zd,
				[Xd.name]: Xd,
				[Jd.name]: Jd,
				[tm.name]: tm,
				[nm.name]: nm,
				[rm.name]: rm,
				[sm.name]: sm,
				[am.name]: am,
				[pm.name]: pm,
				[mm.name]: mm,
				[hm.name]: hm,
				[ym.name]: ym,
				[vm.name]: vm,
				[bm.name]: bm,
				[Tm.name]: Tm,
				[Pm.name]: Pm,
				[Nm.name]: Nm,
				[Rm.name]: Rm,
				[km.name]: km,
				[Em.name]: Em,
				[Dm.name]: Dm,
				[_m.name]: _m,
				[Fm.name]: Fm,
				[Bm.name]: Bm,
				[$m.name]: $m,
				[Gm.name]: Gm,
				[zm.name]: zm,
				[jm.name]: jm,
				[Wm.name]: Wm,
				[qm.name]: qm,
				[Km.name]: Km,
				[Zm.name]: Zm,
				[Xm.name]: Xm,
				[Jm.name]: Jm,
			};
		});
	var Vm = {};
	me(Vm, {
		BadgePosition: () => Ts,
		_getBadges: () => VI,
		addBadge: () => Gp,
		removeBadge: () => Hp,
	});
	function Gp(e) {
		(e.component &&= k.wrap(e.component, { noop: !0 })), Qm.add(e);
	}
	function Hp(e) {
		return Qm.delete(e);
	}
	function VI(e) {
		let t = [];
		for (let i of Qm)
			(!i.shouldShow || i.shouldShow(e)) &&
				(i.position === 0
					? t.unshift({ ...i, ...e })
					: t.push({ ...i, ...e }));
		let n = Te.BadgeAPI.getDonorBadges(e.user.id);
		return n && t.unshift(...n), t;
	}
	var Ts,
		Qm,
		xs = m(() => {
			'use strict';
			a();
			re();
			ni();
			(Ts = ((n) => (
				(n[(n.START = 0)] = 'START'), (n[(n.END = 1)] = 'END'), n
			))(Ts || {})),
				(Qm = new Set());
		});
	var ef = {};
	me(ef, {
		Badges: () => iR,
		Commands: () => tR,
		ContextMenu: () => dR,
		DataStore: () => Pt,
		MemberListDecorators: () => aR,
		MessageAccessories: () => nR,
		MessageDecorations: () => sR,
		MessageEvents: () => eR,
		MessagePopover: () => oR,
		Notices: () => ma,
		Notifications: () => pR,
		ServerList: () => rR,
		Settings: () => lR,
		SettingsStore: () => cR,
		Styles: () => uR,
	});
	var eR,
		ma,
		tR,
		Pt,
		nR,
		oR,
		iR,
		rR,
		sR,
		aR,
		lR,
		cR,
		uR,
		pR,
		dR,
		br = m(() => {
			'use strict';
			a();
			xs();
			wt();
			Jt();
			Pn();
			Ep();
			Gs();
			Fp();
			gn();
			Oo();
			ws();
			so();
			pa();
			E();
			fu();
			je();
			(eR = Ic),
				(ma = lc),
				(tR = ou),
				(Pt = Mn),
				(nR = Gu),
				(oR = vu),
				(iR = Vm),
				(rR = Yp),
				(sR = _p),
				(aR = Lp),
				(lR = zl),
				(cR = mu),
				(uR = Il),
				(pR = Cl),
				(dR = $c);
		});
	var nf = {};
	me(nf, { toggle: () => tf });
	async function tf(e) {
		jo
			? (jo.disabled = !e)
			: e &&
			  ((jo = document.createElement('style')),
			  (jo.id = 'vencord-custom-css'),
			  document.head.appendChild(jo),
			  VencordNative.quickCss.addChangeListener(
					(t) => (jo.textContent = t),
			  ),
			  (jo.textContent = await VencordNative.quickCss.get()));
	}
	async function Vb() {
		$r ||
			(($r = document.createElement('style')),
			($r.id = 'vencord-themes'),
			document.head.appendChild($r));
		let { themeLinks: e } = M,
			t = e.map((n) => `@import url("${n.trim()}");`).join(`
`);
		$r.textContent = t;
	}
	var jo,
		$r,
		of = m(() => {
			'use strict';
			a();
			E();
			document.addEventListener('DOMContentLoaded', () => {
				tf(M.useQuickCss),
					Ss('useQuickCss', tf),
					Vb(),
					Ss('themeLinks', Vb);
			});
		});
	var rf = {};
	me(rf, {
		Common: () => ul,
		_initWebpack: () => Yr,
		_resolveReady: () => Kr,
		addListener: () => bT,
		cache: () => _n,
		extract: () => tl,
		filters: () => Y,
		find: () => ht,
		findAll: () => Yo,
		findBulk: () => Ri,
		findByCode: () => He,
		findByCodeLazy: () => ce,
		findByProps: () => an,
		findByPropsLazy: () => P,
		findLazy: () => Ce,
		findModuleId: () => Zr,
		findStore: () => ST,
		findStoreLazy: () => ue,
		listeners: () => Va,
		mapMangledModule: () => yf,
		mapMangledModuleLazy: () => Ye,
		onceReady: () => Qa,
		removeListener: () => TT,
		search: () => el,
		subscriptions: () => hf,
		waitFor: () => Ze,
		wreq: () => Ft,
	});
	var za = m(() => {
		'use strict';
		a();
		x();
		_();
	});
	function tT() {
		function e(t) {
			try {
				let n = t[1],
					{ subscriptions: i, listeners: r } = Vencord.Webpack,
					{ patches: s } = Vencord.Plugins;
				for (let l in n) {
					let c = n[l],
						u = c.toString().replaceAll(
							`
`,
							'',
						);
					u.startsWith('function(') && (u = '0,' + u);
					let h = c,
						f = new Set(),
						v = (n[l] = function (S, b, A) {
							try {
								c(S, b, A);
							} catch (D) {
								if (c === h) throw D;
								return (
									wo.error('Error in patched chunk', D),
									void h(S, b, A)
								);
							}
							if (S.exports === window) {
								Object.defineProperty(A.c, l, {
									value: A.c[l],
									enumerable: !1,
									configurable: !0,
									writable: !0,
								});
								return;
							}
							let C = Number(l);
							for (let D of r)
								try {
									D(b, C);
								} catch (B) {
									wo.error('Error in webpack listener', B);
								}
							for (let [D, B] of i)
								try {
									if (D(b)) i.delete(D), B(b, C);
									else if (typeof b == 'object') {
										b.default &&
											D(b.default) &&
											(i.delete(D), B(b.default, C));
										for (let O in b)
											O.length <= 3 &&
												b[O] &&
												D(b[O]) &&
												(i.delete(D), B(b[O], C));
									}
								} catch (O) {
									wo.error(
										'Error while firing callback for webpack chunk',
										O,
									);
								}
						});
					try {
						(v.toString = () => c.toString()), (v.original = h);
					} catch {}
					for (let S = 0; S < s.length; S++) {
						let b = s[S],
							A = sn(`patch by ${b.plugin}`, (C, D) =>
								u.replace(C, D),
							);
						if (
							!(b.predicate && !b.predicate()) &&
							u.includes(b.find)
						) {
							f.add(b.plugin);
							for (let C of b.replacement) {
								if (C.predicate && !C.predicate()) continue;
								let D = c,
									B = u;
								_i(C, b.plugin);
								try {
									let O = A(C.match, C.replace);
									O === u && !b.noWarn
										? wo.warn(
												`Patch by ${b.plugin} had no effect (Module id is ${l}): ${C.match}`,
										  )
										: ((u = O),
										  (c = (0,
										  eval)(`// Webpack Module ${l} - Patched by ${[
												...f,
										  ].join(', ')}
${O}
//# sourceURL=WebpackModule${l}`)));
								} catch (O) {
									wo.error(
										`Patch by ${b.plugin} errored (Module id is ${l}): ${C.match}
`,
										O,
									),
										(u = B),
										(c = D),
										f.delete(b.plugin);
								}
							}
							b.all || s.splice(S--, 1);
						}
					}
				}
			} catch (n) {
				wo.error('Error in handlePush', n);
			}
			return e.original.call(window[zt], t);
		}
		(e.original = window[zt].push),
			Object.defineProperty(window[zt], 'push', {
				get: () => e,
				set: (t) => (e.original = t),
				configurable: !0,
			});
	}
	var eT,
		wo,
		nT = m(() => {
			'use strict';
			a();
			w();
			Se();
			Fi();
			qr();
			za();
			wo = new Z('WebpackInterceptor', '#8caaee');
			window[zt]
				? (wo.info(
						`Patching ${zt}.push (was already existant, likely from cache!)`,
				  ),
				  Yr(window[zt]),
				  tT())
				: Object.defineProperty(window, zt, {
						get: () => eT,
						set: (e) => {
							e?.push !== Array.prototype.push &&
								(wo.info(`Patching ${zt}.push`),
								Yr(e),
								tT(),
								delete window[zt],
								(window[zt] = e)),
								(eT = e);
						},
						configurable: !0,
				  });
		});
	async function mR() {
		M.cloud.settingsSync &&
			M.cloud.authenticated &&
			(Ao.Vencord_settingsDirty
				? (await ti(), delete Ao.Vencord_settingsDirty)
				: (await ys(!1)) &&
				  ge({
						title: 'Cloud Settings',
						body: 'Your settings have been updated! Click here to restart to fully apply changes!',
						color: 'var(--green-360)',
						onClick: Ms,
				  }));
	}
	async function fR() {
		if ((await Qa, Rd(), mR(), !1))
			try {
			} catch (e) {}
	}
	var lm = m(() => {
		'use strict';
		a();
		br();
		xa();
		Sl();
		of();
		ii();
		za();
		of();
		nT();
		so();
		E();
		xa();
		rs();
		Ji();
		qi();
		ii();
		za();
		x();
		fR();
	});
	var gR = {};
	me(gR, {
		Api: () => ef,
		PlainSettings: () => Nn,
		Plugins: () => Ad,
		QuickCss: () => nf,
		Settings: () => M,
		Updater: () => kc,
		Util: () => vl,
		Webpack: () => rf,
	});
	a();
	a();
	a();
	var pf = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Vencord QuickCSS Editor</title>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.37.1/min/vs/editor/editor.main.min.css"
            integrity="sha512-wB3xfL98hWg1bpkVYSyL0js/Jx9s7FsDg9aYO6nOMSJTgPuk/PFqxXQJKKSUjteZjeYrfgo9NFBOA1r9HwDuZw=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
        />
        <style>
            html,
            body,
            #container {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                overflow: hidden;
            }
        </style>
    </head>

    <body>
        <div id="container"></div>
        <script
            src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.37.1/min/vs/loader.min.js"
            integrity="sha512-A+6SvPGkIN9Rf0mUXmW4xh7rDvALXf/f0VtOUiHlDUSPknu2kcfz1KzLpOJyL2pO+nZS13hhIjLqVgiQExLJrw=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
        ><\/script>

        <script>
            require.config({
                paths: {
                    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.37.1/min/vs",
                },
            });

            require(["vs/editor/editor.main"], () => {
                getCurrentCss().then((css) => {
                    var editor = monaco.editor.create(
                        document.getElementById("container"),
                        {
                            value: css,
                            language: "css",
                            theme: getTheme(),
                        }
                    );
                    editor.onDidChangeModelContent(() =>
                        setCss(editor.getValue())
                    );
                    window.addEventListener("resize", () => {
                        // make monaco re-layout
                        editor.layout();
                    });
                });
            });
        <\/script>
    </body>
</html>
`;
	Pn();
	Sl();
	$n();
	var { localStorage: _f } = window,
		Ff = new Set();
	var WT = async () => {},
		qT = Ct((e) => VencordNative.quickCss.set(e));
	window.VencordNative = {
		native: {
			getVersions: () => ({}),
			openExternal: async (e) => void open(e, '_blank'),
		},
		updater: {
			getRepo: async () => ({
				ok: !0,
				value: 'https://github.com/Vendicated/Vencord',
			}),
			getUpdates: async () => ({ ok: !0, value: [] }),
			update: async () => ({ ok: !0, value: !1 }),
			rebuild: async () => ({ ok: !0, value: !0 }),
		},
		quickCss: {
			get: () => Qe('VencordQuickCss').then((e) => e ?? ''),
			set: async (e) => {
				await Ve('VencordQuickCss', e), Ff.forEach((t) => t(e));
			},
			addChangeListener(e) {
				Ff.add(e);
			},
			openFile: WT,
			async openEditor() {
				let e = `popup,width=${Math.min(
						window.innerWidth,
						1e3,
					)},height=${Math.min(window.innerHeight, 1e3)}`,
					t = open('about:blank', 'VencordQuickCss', e);
				if (!t) {
					alert(
						'Failed to open QuickCSS popup. Make sure to allow popups!',
					);
					return;
				}
				(t.setCss = qT),
					(t.getCurrentCss = () => VencordNative.quickCss.get()),
					(t.getTheme = () => (Di() === 2 ? 'vs-light' : 'vs-dark')),
					t.document.write(pf);
			},
		},
		settings: {
			get: () => _f.getItem('VencordSettings') || '{}',
			set: async (e) => _f.setItem('VencordSettings', e),
			getSettingsDir: async () => 'LocalStorage',
		},
	};
	lm();
	return Mo(gR);
})();
//# sourceURL=VencordWeb
/*! For license information please see browser.js.LEGAL.txt */
