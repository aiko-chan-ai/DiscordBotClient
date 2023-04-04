// Vencord 462f191
// Standalone: true
// Platform: Universal
'use strict';
var Vencord = (() => {
	var ty = Object.create;
	var Jo = Object.defineProperty;
	var ny = Object.getOwnPropertyDescriptor;
	var oy = Object.getOwnPropertyNames;
	var iy = Object.getPrototypeOf,
		ry = Object.prototype.hasOwnProperty;
	var Pp = ((e) =>
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
	var d = (e, t) => () => (e && (t = e((e = 0))), t);
	var oo = (e, t) => () => (
			t || e((t = { exports: {} }).exports, t), t.exports
		),
		te = (e, t) => {
			for (var n in t) Jo(e, n, { get: t[n], enumerable: !0 });
		},
		Ip = (e, t, n, i) => {
			if ((t && typeof t == 'object') || typeof t == 'function')
				for (let r of oy(t))
					!ry.call(e, r) &&
						r !== n &&
						Jo(e, r, {
							get: () => t[r],
							enumerable: !(i = ny(t, r)) || i.enumerable,
						});
			return e;
		};
	var gr = (e, t, n) => (
			(n = e != null ? ty(iy(e)) : {}),
			Ip(
				t || !e || !e.__esModule
					? Jo(n, 'default', { value: e, enumerable: !0 })
					: n,
				e,
			)
		),
		Zo = (e) => Ip(Jo({}, '__esModule', { value: !0 }), e);
	var p,
		o,
		s = d(() => {
			'use strict';
			(p = Symbol.for('react.fragment')),
				(o = (...e) =>
					(o = Vencord.Webpack.Common.React.createElement)(...e));
		});
	var At = {};
	te(At, {
		clear: () => py,
		createStore: () => kp,
		del: () => ly,
		delMany: () => cy,
		entries: () => my,
		get: () => xe,
		getMany: () => ay,
		keys: () => uy,
		promisifyRequest: () => Le,
		set: () => be,
		setMany: () => sy,
		update: () => yr,
		values: () => dy,
	});
	function Le(e) {
		return new Promise((t, n) => {
			(e.oncomplete = e.onsuccess = () => t(e.result)),
				(e.onabort = e.onerror = () => n(e.error));
		});
	}
	function kp(e, t) {
		let n = indexedDB.open(e);
		n.onupgradeneeded = () => n.result.createObjectStore(t);
		let i = Le(n);
		return (r, a) => i.then((l) => a(l.transaction(t, r).objectStore(t)));
	}
	function nt() {
		return hr || (hr = kp('VencordData', 'VencordStore')), hr;
	}
	function xe(e, t = nt()) {
		return t('readonly', (n) => Le(n.get(e)));
	}
	function be(e, t, n = nt()) {
		return n('readwrite', (i) => (i.put(t, e), Le(i.transaction)));
	}
	function sy(e, t = nt()) {
		return t(
			'readwrite',
			(n) => (e.forEach((i) => n.put(i[1], i[0])), Le(n.transaction)),
		);
	}
	function ay(e, t = nt()) {
		return t('readonly', (n) => Promise.all(e.map((i) => Le(n.get(i)))));
	}
	function yr(e, t, n = nt()) {
		return n(
			'readwrite',
			(i) =>
				new Promise((r, a) => {
					i.get(e).onsuccess = function () {
						try {
							i.put(t(this.result), e), r(Le(i.transaction));
						} catch (l) {
							a(l);
						}
					};
				}),
		);
	}
	function ly(e, t = nt()) {
		return t('readwrite', (n) => (n.delete(e), Le(n.transaction)));
	}
	function cy(e, t = nt()) {
		return t(
			'readwrite',
			(n) => (e.forEach((i) => n.delete(i)), Le(n.transaction)),
		);
	}
	function py(e = nt()) {
		return e('readwrite', (t) => (t.clear(), Le(t.transaction)));
	}
	function br(e, t) {
		return (
			(e.openCursor().onsuccess = function () {
				!this.result || (t(this.result), this.result.continue());
			}),
			Le(e.transaction)
		);
	}
	function uy(e = nt()) {
		return e('readonly', (t) => {
			if (t.getAllKeys) return Le(t.getAllKeys());
			let n = [];
			return br(t, (i) => n.push(i.key)).then(() => n);
		});
	}
	function dy(e = nt()) {
		return e('readonly', (t) => {
			if (t.getAll) return Le(t.getAll());
			let n = [];
			return br(t, (i) => n.push(i.value)).then(() => n);
		});
	}
	function my(e = nt()) {
		return e('readonly', (t) => {
			if (t.getAll && t.getAllKeys)
				return Promise.all([Le(t.getAllKeys()), Le(t.getAll())]).then(
					([i, r]) => i.map((a, l) => [a, r[l]]),
				);
			let n = [];
			return e('readonly', (i) =>
				br(i, (r) => n.push([r.key, r.value])).then(() => n),
			);
		});
	}
	var hr,
		Lt = d(() => {
			'use strict';
			s();
		});
	function fy(e) {
		let t = {};
		for (let n in e) (t[n] = e[n]), (t[e[n]] = n);
		return Object.freeze(t);
	}
	var $,
		Ke = d(() => {
			'use strict';
			s();
			$ = fy({
				QUICK_CSS_UPDATE: 'VencordQuickCssUpdate',
				GET_QUICK_CSS: 'VencordGetQuickCss',
				SET_QUICK_CSS: 'VencordSetQuickCss',
				GET_SETTINGS_DIR: 'VencordGetSettingsDir',
				GET_SETTINGS: 'VencordGetSettings',
				SET_SETTINGS: 'VencordSetSettings',
				OPEN_EXTERNAL: 'VencordOpenExternal',
				OPEN_QUICKCSS: 'VencordOpenQuickCss',
				GET_UPDATES: 'VencordGetUpdates',
				GET_REPO: 'VencordGetRepo',
				GET_HASHES: 'VencordGetHashes',
				UPDATE: 'VencordUpdate',
				BUILD: 'VencordBuild',
				OPEN_MONACO_EDITOR: 'VencordOpenMonacoEditor',
			});
		});
	var F,
		ge = d(() => {
			'use strict';
			s();
			F = class {
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
	var Mp,
		O,
		Be = d(() => {
			'use strict';
			s();
			(Mp = ''), (O = {});
			for (let e of ['top', 'bottom', 'left', 'right'])
				for (let t of [8, 16, 20]) {
					let n = `vc-m-${e}-${t}`;
					(O[`${e}${t}`] = n), (Mp += `.${n}{margin-${e}:${t}px;}`);
				}
			document.addEventListener(
				'DOMContentLoaded',
				() =>
					document.head.append(
						Object.assign(document.createElement('style'), {
							textContent: Mp,
							id: 'vencord-margins',
						}),
					),
				{ once: !0 },
			);
		});
	function Ue(e) {
		let t = Object.assign(function () {}, {
			[Np]: void 0,
			[ei]: () => (t[Np] ??= e()),
		});
		return new Proxy(t, Vo);
	}
	var Rp,
		Vo,
		ei,
		Np,
		ln = d(() => {
			'use strict';
			s();
			(Rp = ['arguments', 'caller', 'prototype']),
				(Vo = {}),
				(ei = Symbol.for('vencord.lazy.get')),
				(Np = Symbol.for('vencord.lazy.cached'));
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
				Vo[e] = (t, ...n) => Reflect[e](t[ei](), ...n);
			Vo.ownKeys = (e) => {
				let t = e[ei](),
					n = Reflect.ownKeys(t);
				for (let i of Rp) n.includes(i) || n.push(i);
				return n;
			};
			Vo.getOwnPropertyDescriptor = (e, t) => {
				if (typeof t == 'string' && Rp.includes(t))
					return Reflect.getOwnPropertyDescriptor(e, t);
				let n = Reflect.getOwnPropertyDescriptor(e[ei](), t);
				return n && Object.defineProperty(e, t, n), n;
			};
		});
	var hy,
		ot,
		ti = d(() => {
			'use strict';
			s();
			ge();
			(hy = (e, t, n) => t), (ot = hy);
		});
	function Pr(e) {
		if (Et !== void 0) throw 'no.';
		(it = e.push([[Symbol('Vencord')], {}, (t) => t])),
			(Et = it.c),
			e.pop();
	}
	function Se(e, t = !0) {
		return Ue(() => he(e, t));
	}
	function Mn(e, t = !0) {
		if (typeof e != 'function')
			throw new Error(
				'Invalid filter. Expected a function got ' + typeof e,
			);
		let n = [];
		for (let i in Et) {
			let r = Et[i];
			if (!!r?.exports) {
				if (e(r.exports)) n.push(r.exports);
				else if (typeof r.exports != 'object') continue;
				if (r.exports.default && e(r.exports.default))
					n.push(t ? r.exports.default : r.exports);
				else
					for (let a in r.exports)
						if (a.length <= 3) {
							let l = r.exports[a];
							l && e(l) && n.push(l);
						}
			}
		}
		return n;
	}
	function ye(e, t) {
		return Ue(() => oi(e, t));
	}
	function cn(...e) {
		return he(R.byProps(...e));
	}
	function C(...e) {
		return Se(R.byProps(...e));
	}
	function we(...e) {
		return he(R.byCode(...e));
	}
	function oe(...e) {
		return Se(R.byCode(...e));
	}
	function by(e) {
		return he(R.byStoreName(e));
	}
	function bt(e) {
		return Se(R.byStoreName(e));
	}
	function Pe(e, t) {
		if (typeof e == 'string') e = R.byProps(e);
		else if (Array.isArray(e)) e = R.byProps(...e);
		else if (typeof e != 'function')
			throw new Error(
				'filter must be a string, string[] or function, got ' +
					typeof e,
			);
		let [n, i] = he(e, !0, !0);
		if (n) return void t(n, i);
		Ap.set(e, t);
	}
	function Ir(e) {
		wr.add(e);
	}
	function ii(e) {
		wr.delete(e);
	}
	function io(...e) {
		let t = {},
			n = it.m;
		e: for (let i in n) {
			let r = n[i].original ?? n[i],
				a = r.toString();
			for (let l of e)
				if (
					(typeof l == 'string' && !a.includes(l)) ||
					(l instanceof RegExp && !l.test(a))
				)
					continue e;
			t[i] = r;
		}
		return t;
	}
	function kr(e) {
		let t = it.m[e];
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
	var Tr,
		ni,
		xr,
		it,
		Et,
		R,
		Ap,
		wr,
		he,
		yy,
		Lp,
		oi,
		D = d(() => {
			'use strict';
			s();
			ge();
			ln();
			ti();
			(Tr = new F('Webpack')),
				(xr = new Promise((e) => (ni = e))),
				(R = {
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
				(Ap = new Map()),
				(wr = new Set());
			he = ot('find', function (t, n = !0, i = !1) {
				if (typeof t != 'function')
					throw new Error(
						'Invalid filter. Expected a function got ' + typeof t,
					);
				for (let r in Et) {
					let a = Et[r];
					if (!!a?.exports) {
						if (t(a.exports))
							return i ? [a.exports, Number(r)] : a.exports;
						if (typeof a.exports == 'object') {
							if (a.exports.default && t(a.exports.default)) {
								let l = n ? a.exports.default : a.exports;
								return i ? [l, Number(r)] : l;
							}
							for (let l in a.exports)
								if (l.length <= 3) {
									let u = a.exports[l];
									if (u && t(u))
										return i ? [u, Number(r)] : u;
								}
						}
					}
				}
				if (!i) {
					let r = new Error(
						"Didn't find module matching this filter",
					);
					Tr.warn(r);
				}
				return i ? [null, null] : null;
			});
			(yy = ot('findBulk', function (...t) {
				if (!Array.isArray(t))
					throw new Error(
						'Invalid filters. Expected function[] got ' + typeof t,
					);
				let { length: n } = t;
				if (n === 0) throw new Error('Expected at least two filters.');
				if (n === 1) return he(t[0]);
				let i = t,
					r = 0,
					a = Array(n);
				e: for (let l in Et) {
					let u = Et[l];
					if (!!u?.exports)
						for (let m = 0; m < n; m++) {
							let y = i[m];
							if (y !== void 0) {
								if (y(u.exports)) {
									if (
										((a[m] = u.exports),
										(i[m] = void 0),
										++r === n)
									)
										break e;
									break;
								}
								if (typeof u.exports == 'object') {
									if (
										u.exports.default &&
										y(u.exports.default)
									) {
										if (
											((a[m] = u.exports.default),
											(i[m] = void 0),
											++r === n)
										)
											break e;
										break;
									}
									for (let h in u.exports)
										if (h.length <= 3) {
											let b = u.exports[h];
											if (b && y(b)) {
												if (
													((a[m] = b),
													(i[m] = void 0),
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
					Tr.warn(l);
				}
				return a;
			})),
				(Lp = ot('findModuleId', function (t) {
					for (let i in it.m)
						if (it.m[i].toString().includes(t)) return Number(i);
					let n = new Error(
						`Didn't find module with code:
` + t,
					);
					return Tr.warn(n), null;
				})),
				(oi = ot('mapMangledModule', function (t, n) {
					let i = {},
						r = Lp(t);
					if (r === null) return i;
					let a = it(r);
					e: for (let l in a) {
						let u = a[l];
						for (let m in n)
							if (n[m](u)) {
								i[m] = u;
								continue e;
							}
					}
					return i;
				}));
		});
	function ve(e, t) {
		let n = function () {
				throw new Error(`Vencord could not find the ${e} Component`);
			},
			i = Y(() => n);
		return (
			Pe(t, (r) => {
				(n = r), Object.assign(i, r);
			}),
			i
		);
	}
	function Fe(e, t) {
		Pe(R.byStoreName(e), t);
	}
	var Cr = d(() => {
		'use strict';
		s();
		B();
		D();
	});
	var g,
		Ye,
		L,
		pn,
		Z,
		Kt,
		Te,
		Mr,
		z,
		St,
		vy,
		Ty,
		Nn,
		xy,
		vt,
		un,
		Ep = d(() => {
			'use strict';
			s();
			D();
			Cr();
			(g = {
				FormTitle: ve('FormTitle', R.byCode('errorSeparator')),
				FormSection: ve(
					'FormSection',
					R.byCode('titleClassName', 'sectionTitle'),
				),
				FormDivider: ve('FormDivider', (e) => {
					if (typeof e != 'function') return !1;
					let t = e.toString();
					return t.length < 200 && t.includes('.divider');
				}),
				FormText: ve('FormText', (e) => e.Types?.INPUT_PLACEHOLDER),
			}),
				(Ye = ve('Card', (e) => e.Types?.PRIMARY && e.defaultProps)),
				(L = ve('Button', ['Hovers', 'Looks', 'Sizes'])),
				(pn = ve('Switch', R.byCode('tooltipNote', 'ringTarget'))),
				(Z = ve(
					'Tooltip',
					R.byCode('shouldShowTooltip:!1', 'clickableOnMobile||'),
				)),
				(Kt = ve(
					'Timestamp',
					R.byCode(
						'.Messages.MESSAGE_EDITED_TIMESTAMP_A11Y_LABEL.format',
					),
				)),
				(Te = ve('TextInput', [
					'defaultProps',
					'Sizes',
					'contextType',
				])),
				(Mr = ve('TextArea', R.byCode('handleSetRef', 'textArea'))),
				(z = ve('Text', (e) => {
					if (typeof e != 'function') return !1;
					let t = e.toString();
					return (
						t.includes('data-text-variant') &&
						t.includes('always-white')
					);
				})),
				(St = ve(
					'Select',
					R.byCode(
						'optionClassName',
						'popoutPosition',
						'autoFocus',
						'maxVisibleItems',
					),
				)),
				(vy = R.byCode('autoFocus', '.Messages.SELECT')),
				(Ty = ve('SearchableSelect', (e) => e.render && vy(e.render))),
				(Nn = ve(
					'Slider',
					R.byCode('closestMarkerIndex', 'stickToMarkers'),
				)),
				(xy = ve('Flex', ['Justify', 'Align', 'Wrap'])),
				(vt = C('buttonWrapper', 'buttonContent')),
				(un = C('BLANK', 'FILLED', 'INVERTED'));
		});
	var le,
		ri,
		Dp = d(() => {
			'use strict';
			s();
			ln();
			D();
			(le = Ue(() => {
				let e =
						Vencord.Settings.plugins.MenuItemDeobfuscatorAPI
							.enabled,
					t = [
						'MenuSeparator',
						'MenuGroup',
						'MenuItem',
						'MenuCheckboxItem',
						'MenuRadioItem',
						'MenuControlItem',
					],
					n = oi(
						'\u266B \u2282(\uFF61\u25D5\u203F\u203F\u25D5\uFF61\u2282) \u266A',
						{
							ContextMenu: R.byCode('getContainerProps'),
							...Object.fromEntries(
								(e ? t : []).map((i) => [
									i,
									(r) => r.name === i,
								]),
							),
						},
					);
				if (!e)
					for (let i of t)
						Object.defineProperty(n, i, {
							get() {
								throw new Error(
									'MenuItemDeobfuscator must be enabled to use this.',
								);
							},
						});
				return n;
			})),
				(ri = ye('type:"CONTEXT_MENU_OPEN"', {
					open: R.byCode('stopPropagation'),
					openLazy: (e) => e.toString().length < 50,
					close: R.byCode('CONTEXT_MENU_CLOSE'),
				}));
		});
	var w,
		Ie,
		rt,
		dn,
		_p,
		si,
		Fp,
		Nr,
		Op = d(() => {
			'use strict';
			s();
			D();
			Nr = C('createPortal', 'render');
			Pe('useState', (e) => {
				(w = e),
					({
						useEffect: rt,
						useState: Ie,
						useMemo: dn,
						useRef: _p,
						useReducer: si,
						useCallback: Fp,
					} = w);
			});
		});
	var Rr,
		st,
		Ar,
		ke,
		ai,
		ro,
		Yt,
		de,
		U,
		re,
		Rn,
		G,
		Qe,
		Xe,
		so,
		wy,
		Je,
		$p = d(() => {
			'use strict';
			s();
			D();
			Cr();
			(Rr = C('connectStores')),
				(Ar = C('openPrivateChannel')),
				(wy = ye('"MaskedLinkStore"', {
					openUntrustedLink: R.byCode('.apply(this,arguments)'),
				})),
				(Je = oe('useStateFromStores'));
			Fe('UserStore', (e) => (U = e));
			Fe('ChannelStore', (e) => (G = e));
			Fe('SelectedChannelStore', (e) => (re = e));
			Fe('SelectedGuildStore', (e) => (Rn = e));
			Fe('GuildStore', (e) => (de = e));
			Fe('GuildMemberStore', (e) => (Qe = e));
			Fe('RelationshipStore', (e) => (Xe = e));
			Fe('PermissionStore', (e) => (ke = e));
			Fe('PresenceStore', (e) => (Yt = e));
			Fe('ReadStateStore', (e) => (ro = e));
			Fe('GuildChannelStore', (e) => (ai = e));
			Fe('MessageStore', (e) => (st = e));
			Fe('WindowStore', (e) => (so = e));
		});
	var Bp = {};
	var Up = d(() => {
		'use strict';
		s();
	});
	var Gp = {};
	var Hp = d(() => {
		'use strict';
		s();
	});
	var jp = {};
	var zp = d(() => {
		'use strict';
		s();
	});
	var I,
		ao,
		Tt,
		mn,
		An,
		Ln,
		Ce,
		Dt,
		Py,
		Iy,
		K,
		Qt,
		at,
		lo,
		En,
		Wp = d(() => {
			'use strict';
			s();
			D();
			(ao = C('getAPIBaseURL', 'get')),
				(Tt = C('parseTwoDigitYear')),
				(mn = C('highlight')),
				(An = Se((e) => e.Messages?.['en-US']));
			Pe(['fromTimestamp', 'extractTimestamp'], (e) => (Ln = e));
			(Py = { MESSAGE: 0, SUCCESS: 1, FAILURE: 2, CUSTOM: 3 }),
				(Iy = { TOP: 0, BOTTOM: 1 }),
				(K = {
					Type: Py,
					Position: Iy,
					genId: () =>
						(Math.random() || Math.random()).toString(36).slice(2),
				}),
				(Qt = { fetchUser: oe('.USER(', 'getUser') }),
				(at = ye(
					'document.queryCommandEnabled("copy")||document.queryCommandSupported("copy")',
					{
						copy: R.byCode('.default.copy('),
						SUPPORTS_COPY: (e) => typeof e == 'boolean',
					},
				)),
				(lo = ye('transitionToGuild - ', {
					transitionTo: R.byCode('transitionTo -'),
					transitionToGuild: R.byCode('transitionToGuild -'),
					goBack: R.byCode('goBack()'),
					goForward: R.byCode('goForward()'),
				}));
			Pe(['dispatch', 'subscribe'], (e) => {
				I = e;
				let t = () => {
					e.unsubscribe('CONNECTION_OPEN', t), ni();
				};
				e.subscribe('CONNECTION_OPEN', t);
			});
			Pe(R.byCode('currentToast?'), (e) => (K.show = e));
			Pe(R.byCode('currentToast:null'), (e) => (K.pop = e));
			Pe(['show', 'close'], (e) => (Dt = e));
			Pe('parseTopic', (e) => (Ce = e));
			Pe(['open', 'saveAccountChanges'], (e) => (En = e));
		});
	var Lr = {};
	te(Lr, {
		Alerts: () => Dt,
		Button: () => L,
		ButtonLooks: () => un,
		ButtonWrapperClasses: () => vt,
		Card: () => Ye,
		ChannelStore: () => G,
		Clipboard: () => at,
		ComponentTypes: () => Bp,
		ContextMenu: () => ri,
		Flex: () => xy,
		Flux: () => Rr,
		FluxDispatcher: () => I,
		Forms: () => g,
		GuildChannelStore: () => ai,
		GuildMemberStore: () => Qe,
		GuildStore: () => de,
		MaskedLinkStore: () => wy,
		Menu: () => le,
		MenuTypes: () => Gp,
		MessageStore: () => st,
		NavigationRouter: () => lo,
		Parser: () => Ce,
		PermissionStore: () => ke,
		PresenceStore: () => Yt,
		PrivateChannelsStore: () => Ar,
		React: () => w,
		ReactDOM: () => Nr,
		ReadStateStore: () => ro,
		RelationshipStore: () => Xe,
		RestAPI: () => ao,
		SearchableSelect: () => Ty,
		Select: () => St,
		SelectedChannelStore: () => re,
		SelectedGuildStore: () => Rn,
		SettingsRouter: () => En,
		Slider: () => Nn,
		SnowflakeUtils: () => Ln,
		Switch: () => pn,
		Text: () => z,
		TextArea: () => Mr,
		TextInput: () => Te,
		Timestamp: () => Kt,
		Toasts: () => K,
		Tooltip: () => Z,
		UserStore: () => U,
		UserUtils: () => Qt,
		UtilTypes: () => jp,
		WindowStore: () => so,
		hljs: () => mn,
		i18n: () => An,
		moment: () => Tt,
		useCallback: () => Fp,
		useEffect: () => rt,
		useMemo: () => dn,
		useReducer: () => si,
		useRef: () => _p,
		useState: () => Ie,
		useStateFromStores: () => Je,
	});
	var P = d(() => {
		'use strict';
		s();
		Ep();
		Dp();
		Op();
		$p();
		Up();
		Hp();
		zp();
		Wp();
	});
	function xt(e) {
		let t;
		return () => t ?? (t = e());
	}
	function Me(e, t) {
		let n = Object.assign(
				{ fallbackValue: null, deps: [], onError: null },
				t,
			),
			[i, r] = Ie({ value: n.fallbackValue, error: null, pending: !0 });
		return (
			rt(() => {
				let a = !0;
				return (
					i.pending || r({ ...i, pending: !0 }),
					e()
						.then(
							(l) =>
								a && r({ value: l, error: null, pending: !1 }),
						)
						.catch(
							(l) =>
								a &&
								(r({ value: null, error: l, pending: !1 }),
								n.onError?.(l)),
						),
					() => void (a = !1)
				);
			}, n.deps),
			[i.value, i.error, i.pending]
		);
	}
	function wt() {
		let [, e] = Ie(0);
		return () => e((t) => t + 1);
	}
	function Y(e) {
		let t = xt(e);
		return (n) => {
			let i = t();
			return o(i, { ...n });
		};
	}
	function fn(e, t) {
		for (let n in t) {
			let i = t[n];
			typeof i == 'object' && !Array.isArray(i)
				? ((e[n] ??= {}), fn(e[n], i))
				: (e[n] ??= i);
		}
		return e;
	}
	function ky(e, t = (n) => n) {
		let { length: n } = e;
		if (n === 0) return '';
		if (n === 1) return t(e[0]);
		let i = '';
		for (let r = 0; r < n; r++)
			(i += t(e[r])),
				n - r > 2 ? (i += ', ') : n - r > 1 && (i += ' and ');
		return i;
	}
	function me(...e) {
		return e.filter(Boolean).join(' ');
	}
	function co(e) {
		return new Promise((t) => setTimeout(t, e));
	}
	function Dn(e, t) {
		let n = '```';
		return `${n}${t || ''}
${e.replaceAll('```', '\\`\\`\\`')}
${n}`;
	}
	function gn(e, t = 'Copied to clipboard!') {
		at.SUPPORTS_COPY
			? at.copy(e)
			: (t = 'Your browser does not support copying to clipboard'),
			K.show({ message: t, id: K.genId(), type: K.Type.SUCCESS });
	}
	function Cy(e) {
		return typeof e == 'object' && e !== null && !Array.isArray(e);
	}
	function Er(e) {
		try {
			return new URL(e);
		} catch {
			return null;
		}
	}
	function li(e) {
		return e;
	}
	var Dr,
		B = d(() => {
			'use strict';
			s();
			P();
			Dr = (e) => {
				let t = e.getBoundingClientRect(),
					n = Math.max(
						document.documentElement.clientHeight,
						window.innerHeight,
					);
				return !(t.bottom < 0 || t.top - n >= 0);
			};
		});
	var qp = d(() => {});
	function Xt(e) {
		return o(
			'div',
			{ ...e, className: me(e.className, 'vc-error-card') },
			e.children,
		);
	}
	var po = d(() => {
		'use strict';
		s();
		qp();
		B();
	});
	var My,
		Kp,
		Yp,
		_r,
		N,
		J = d(() => {
			'use strict';
			s();
			ge();
			Be();
			B();
			P();
			po();
			(My = '#e78284'),
				(Kp = new F('React ErrorBoundary', My)),
				(Yp = {}),
				(_r = Y(
					() =>
						class extends w.PureComponent {
							state = { error: Yp, stack: '', message: '' };
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
									Kp.error(
										`A component threw an Error
`,
										t,
									),
									Kp.error(
										'Component Stack',
										n.componentStack,
									);
							}
							render() {
								if (this.state.error === Yp)
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
									Xt,
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
												{ className: O.top8 },
												this.state.stack,
											),
									),
								);
							}
						},
				));
			_r.wrap = (e, t) => (n) =>
				o(_r, { ...t, wrappedProps: n }, o(e, { ...n }));
			N = _r;
		});
	var lt,
		_n = d(() => {
			s();
			lt = '462f191';
		});
	var Fr,
		Qp = d(() => {
			s();
			Fr = 'Vendicated/Vencord';
		});
	var $r = {};
	te($r, {
		Devs: () => c,
		REACT_GLOBAL: () => Ny,
		SUPPORT_CHANNEL_ID: () => ci,
		VENCORD_USER_AGENT: () => Or,
		WEBPACK_CHUNK: () => _t,
	});
	var _t,
		Ny,
		Or,
		ci,
		c,
		T = d(() => {
			'use strict';
			s();
			_n();
			Qp();
			(_t = 'webpackChunkdiscord_app'),
				(Ny = 'Vencord.Webpack.Common.React'),
				(Or = `Vencord/${lt}${
					Fr ? ` (https://github.com/${Fr})` : ''
				}`),
				(ci = '1026515880080842772'),
				(c = Object.freeze({
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
					nick: { name: 'nick', id: 347884694408265729n },
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
					skyevg: { name: 'skyevg', id: 1090310844283363348n },
				}));
		});
	function f(e) {
		return e;
	}
	var v = d(() => {
		'use strict';
		s();
	});
	var Br,
		Xp = d(() => {
			'use strict';
			s();
			T();
			v();
			Br = f({
				name: 'AlwaysTrust',
				description:
					'Removes the annoying untrusted domain and suspicious file popup',
				authors: [c.zt],
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
	function Ur(e, t = e, n = '') {
		return (Zp[n] ??= new Proxy(e, {
			get(i, r) {
				let a = i[r];
				if (!(r in i)) {
					if (n === 'plugins' && r in se)
						return (i[r] = Ur(
							{
								enabled:
									se[r].required ??
									se[r].enabledByDefault ??
									!1,
							},
							t,
							`plugins.${r}`,
						));
					if (n.startsWith('plugins.')) {
						let l = n.slice(8);
						if (l in se) {
							let u = se[l].options?.[r];
							if (!u) return a;
							if ('default' in u) return (i[r] = u.default);
							if (u.type === 4) {
								let m = u.options.find((y) => y.default);
								return m && (i[r] = m.value), m?.value;
							}
						}
					}
					return a;
				}
				return typeof a == 'object' && !Array.isArray(a) && a !== null
					? Ur(a, t, `${n}${n && '.'}${r}`)
					: a;
			},
			set(i, r, a) {
				if (i[r] === a) return !0;
				i[r] = a;
				let l = `${n}${n && '.'}${r}`;
				delete Zp[l];
				for (let u of pi) (!u._path || u._path === l) && u(a, l);
				return (
					VencordNative.ipc.invoke(
						$.SET_SETTINGS,
						JSON.stringify(t, null, 4),
					),
					!0
				);
			},
		}));
	}
	function Ge(e) {
		let [, t] = w.useReducer(() => ({}), {}),
			n = e ? (i, r) => e.includes(r) && t() : t;
		return w.useEffect(() => (pi.add(n), () => void pi.delete(n)), []), k;
	}
	function Gr(e, t) {
		(t._path = e), pi.add(t);
	}
	function ce(e, ...t) {
		let { plugins: n } = Jt;
		if (!(e in n)) {
			for (let i of t)
				if (i in n) {
					Vp.info(`Migrating settings from old name ${i} to ${e}`),
						(n[e] = n[i]),
						delete n[i],
						VencordNative.ipc.invoke(
							$.SET_SETTINGS,
							JSON.stringify(Jt, null, 4),
						);
					break;
				}
		}
	}
	function V(e, t) {
		let n = {
			get store() {
				if (!n.pluginName)
					throw new Error(
						'Cannot access settings before plugin is initialized',
					);
				return k.plugins[n.pluginName];
			},
			use: (i) =>
				Ge(i?.map((r) => `plugins.${n.pluginName}.${r}`)).plugins[
					n.pluginName
				],
			def: e,
			checks: t ?? {},
			pluginName: '',
		};
		return n;
	}
	var Vp,
		Jp,
		Jt,
		pi,
		Zp,
		eu,
		k,
		E = d(() => {
			'use strict';
			s();
			Ke();
			ge();
			B();
			v();
			P();
			Fn();
			(Vp = new F('Settings')),
				(Jp = {
					notifyAboutUpdates: !0,
					autoUpdate: !1,
					autoUpdateNotification: !0,
					useQuickCss: !0,
					themeLinks: [],
					enableReactDevtools: !1,
					frameless: !1,
					transparent: !1,
					winCtrlQ: !1,
					winNativeTitleBar: !1,
					plugins: {},
					notifications: {
						timeout: 5e3,
						position: 'bottom-right',
						useNative: 'not-focused',
						logLimit: 50,
					},
				});
			try {
				(Jt = JSON.parse(VencordNative.ipc.sendSync($.GET_SETTINGS))),
					fn(Jt, Jp);
			} catch (e) {
				(Jt = fn({}, Jp)),
					Vp.error(
						`An error occurred while loading the settings. Corrupt settings file?
`,
						e,
					);
			}
			(pi = new Set()), (Zp = {});
			(eu = Jt), (k = Ur(Jt));
		});
	var Hr,
		tu = d(() => {
			'use strict';
			s();
			E();
			T();
			v();
			Hr = f({
				name: 'AnonymiseFileNames',
				authors: [c.obscurity],
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
							k.plugins.AnonymiseFileNames.method !== 0,
					},
					consistent: {
						description: 'Consistent filename',
						type: 0,
						default: 'image',
						disabled: () =>
							k.plugins.AnonymiseFileNames.method !== 1,
					},
				},
				anonymise(e) {
					let t = 'image',
						n = e.lastIndexOf('.'),
						i = n !== -1 ? e.slice(n) : '';
					switch (k.plugins.AnonymiseFileNames.method) {
						case 0:
							let r =
								'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
							t = Array.from(
								{
									length: k.plugins.AnonymiseFileNames
										.randomisedLength,
								},
								() => r[Math.floor(Math.random() * r.length)],
							).join('');
							break;
						case 1:
							t = k.plugins.AnonymiseFileNames.consistent;
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
	function ui() {
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
	var jr = d(() => {
		'use strict';
		s();
	});
	function uo(e) {
		return o(
			L,
			{
				...e,
				look: L.Looks.LINK,
				color: L.Colors.TRANSPARENT,
				onClick: () =>
					VencordNative.ipc.invoke(
						$.OPEN_EXTERNAL,
						'https://github.com/sponsors/Vendicated',
					),
			},
			o(ui, null),
			'Donate',
		);
	}
	var zr = d(() => {
		'use strict';
		s();
		Ke();
		P();
		jr();
	});
	function pe(e) {
		return (
			(e.style ??= {}),
			(e.style.display = 'flex'),
			(e.style.gap ??= '1em'),
			(e.style.flexDirection ||= e.flexDirection),
			delete e.flexDirection,
			o('div', { ...e }, e.children)
		);
	}
	var ct = d(() => {
		'use strict';
		s();
	});
	var Kr = {};
	te(Kr, {
		ModalCloseButton: () => hn,
		ModalContent: () => je,
		ModalFooter: () => ut,
		ModalHeader: () => He,
		ModalRoot: () => Ee,
		ModalSize: () => On,
		Modals: () => pt,
		closeAllModals: () => qr,
		closeModal: () => yn,
		openModal: () => De,
		openModalLazy: () => Wr,
	});
	function Wr(e, t) {
		return di.openModalLazy(e, t);
	}
	function De(e, t, n) {
		return di.openModal(e, t, n);
	}
	function yn(e, t) {
		return di.closeModal(e, t);
	}
	function qr() {
		return di.closeAllModals();
	}
	var On,
		pt,
		Ee,
		He,
		je,
		ut,
		hn,
		di,
		Ze = d(() => {
			'use strict';
			s();
			D();
			B();
			(On = ((r) => (
				(r.SMALL = 'small'),
				(r.MEDIUM = 'medium'),
				(r.LARGE = 'large'),
				(r.DYNAMIC = 'dynamic'),
				r
			))(On || {})),
				(pt = ye('.closeWithCircleBackground', {
					ModalRoot: R.byCode('.root'),
					ModalHeader: R.byCode('.header'),
					ModalContent: R.byCode('.content'),
					ModalFooter: R.byCode('.footerSeparator'),
					ModalCloseButton: R.byCode('.closeWithCircleBackground'),
				})),
				(Ee = Y(() => pt.ModalRoot)),
				(He = Y(() => pt.ModalHeader)),
				(je = Y(() => pt.ModalContent)),
				(ut = Y(() => pt.ModalFooter)),
				(hn = Y(() => pt.ModalCloseButton)),
				(di = ye('onCloseRequest:null!=', {
					openModal: R.byCode('onCloseRequest:null!='),
					closeModal: R.byCode('onCloseCallback&&'),
					openModalLazy: (e) =>
						e?.length === 1 &&
						R.byCode('.apply(this,arguments)')(e),
					closeAllModals: R.byCode('.value.key,'),
				}));
		});
	var Ry,
		Ay,
		Ly,
		nu,
		Yr,
		ou = d(() => {
			'use strict';
			s();
			fi();
			zr();
			J();
			ct();
			jr();
			T();
			Ke();
			ge();
			Be();
			Ze();
			v();
			P();
			(Ry =
				'https://media.discordapp.net/stickers/1026517526106087454.webp'),
				(Ay = Object.values(c).map((e) => e.id.toString())),
				(Ly = {
					tooltip: 'Vencord Contributor',
					image: Ry,
					position: 0,
					props: {
						style: { borderRadius: '50%', transform: 'scale(0.9)' },
					},
					shouldShow: ({ user: e }) => Ay.includes(e.id),
					onClick: () =>
						VencordNative.ipc.invoke(
							$.OPEN_EXTERNAL,
							'https://github.com/Vendicated/Vencord',
						),
				}),
				(nu = {}),
				(Yr = f({
					name: 'BadgeAPI',
					description: 'API to add badges to users.',
					authors: [c.Megu],
					required: !0,
					patches: [
						{
							find: 'PREMIUM_GUILD_SUBSCRIPTION_TOOLTIP.format({date:',
							replacement: {
								match: /&&((\w{1,3})\.push\({tooltip:\w{1,3}\.\w{1,3}\.Messages\.PREMIUM_GUILD_SUBSCRIPTION_TOOLTIP\.format.+?;)(?:return\s\w{1,3};?})/,
								replace: (e, t, n) =>
									`&&${t} return Vencord.Api.Badges.inject(${n}, arguments[0]);}`,
							},
						},
						{
							find: 'Messages.PROFILE_USER_BADGES,role:',
							replacement: [
								{
									match: /src:(\w{1,3})\[(\w{1,3})\.key\],/,
									replace: (e, t, n) =>
										`src: ${n}.image ?? ${t}[${n}.key], ...${n}.props,`,
								},
								{
									match: /spacing:(\d{1,2}),children:(.{1,40}(\i)\.jsx.+?(\i)\.onClick.+?\)})},/,
									replace: (e, t, n, i, r) =>
										`spacing:${t},children:${r}.component ? () => (0,${i}.jsx)(${r}.component, { ...${r} }) : ${n}},`,
								},
							],
						},
					],
					async start() {
						Vencord.Api.Badges.addBadge(Ly);
						let t = (
							await fetch(
								'https://gist.githubusercontent.com/Vendicated/51a3dd775f6920429ec6e9b735ca7f01/raw/badges.csv',
							).then((n) => n.text())
						).trim().split(`
`);
						if (t.shift() !== 'id,tooltip,image') {
							new F('BadgeAPI').error('Invalid badges.csv file!');
							return;
						}
						for (let n of t) {
							let [i, r, a] = n.split(',');
							nu[i] = { image: a, tooltip: r };
						}
					},
					addDonorBadge(e, t) {
						let n = nu[t];
						n &&
							e.unshift({
								...n,
								position: 0,
								props: {
									style: {
										borderRadius: '50%',
										transform: 'scale(0.9)',
									},
								},
								onClick() {
									let i = De((r) =>
										o(
											N,
											{
												noop: !0,
												onError: () => {
													yn(i),
														VencordNative.ipc.invoke(
															$.OPEN_EXTERNAL,
															'https://github.com/sponsors/Vendicated',
														);
												},
											},
											o(
												pt.ModalRoot,
												{ ...r },
												o(
													pt.ModalHeader,
													null,
													o(
														pe,
														{
															style: {
																width: '100%',
																justifyContent:
																	'center',
															},
														},
														o(
															g.FormTitle,
															{
																tag: 'h2',
																style: {
																	width: '100%',
																	textAlign:
																		'center',
																	margin: 0,
																},
															},
															o(ui, null),
															'Vencord Donor',
														),
													),
												),
												o(
													pt.ModalContent,
													null,
													o(
														pe,
														null,
														o('img', {
															role: 'presentation',
															src: 'https://cdn.discordapp.com/emojis/1026533070955872337.png',
															alt: '',
															style: {
																margin: 'auto',
															},
														}),
														o('img', {
															role: 'presentation',
															src: 'https://cdn.discordapp.com/emojis/1026533090627174460.png',
															alt: '',
															style: {
																margin: 'auto',
															},
														}),
													),
													o(
														'div',
														{
															style: {
																padding: '1em',
															},
														},
														o(
															g.FormText,
															null,
															'This Badge is a special perk for Vencord Donors',
														),
														o(
															g.FormText,
															{
																className:
																	O.top20,
															},
															'Please consider supporting the development of Vencord by becoming a donor. It would mean a lot!!',
														),
													),
												),
												o(
													pt.ModalFooter,
													null,
													o(
														pe,
														{
															style: {
																width: '100%',
																justifyContent:
																	'center',
															},
														},
														o(uo, null),
													),
												),
											),
										),
									);
								},
							});
					},
				}));
		});
	var Qr,
		iu = d(() => {
			'use strict';
			s();
			T();
			v();
			Qr = f({
				name: 'CommandsAPI',
				authors: [c.Arjix],
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
	function Ey(e, t) {
		return new Proxy(e, {
			get(n, i) {
				return i === 'match'
					? RegExp(`${t},{(?<=${ru}\\.${t},{)`, 'g')
					: Reflect.get(...arguments);
			},
		});
	}
	function Xr(e, t) {
		if (!k.plugins.ContextMenuAPI.enabled) return ii(Xr);
		if (!(typeof e != 'object' || e === null)) {
			for (let n in e)
				if (n.length <= 3) {
					let i = e[n];
					if (typeof i != 'function') continue;
					Function.prototype.toString
						.call(i)
						.includes('path:["empty"]') &&
						(Vencord.Plugins.patches.push({
							plugin: 'ContextMenuAPI',
							all: !0,
							noWarn: !0,
							find: 'navId:',
							replacement: [
								{
									match: RegExp(`${t}(?<=(\\i)=.+?)`),
									replace: (a, l) => ((ru = l), a),
								},
								Ey(
									{
										match: '',
										replace:
											'$&contextMenuApiArguments:arguments,',
									},
									n,
								),
							],
						}),
						ii(Xr));
				}
		}
	}
	var ru,
		Jr,
		su = d(() => {
			'use strict';
			s();
			E();
			T();
			v();
			D();
			ru = '';
			Ir(Xr);
			Jr = f({
				name: 'ContextMenuAPI',
				description:
					'API for adding/removing items to/from context menus.',
				authors: [c.Nuckyz],
				patches: [
					{
						find: '\u266B (\u3064\uFF61\u25D5\u203F\u203F\u25D5\uFF61)\u3064 \u266A',
						replacement: {
							match: /(?<=function \i\((\i)\){)(?=var \i,\i=\i\.navId)/,
							replace: (e, t) =>
								`Vencord.Api.ContextMenu._patchContextMenu(${t});`,
						},
					},
				],
			});
		});
	var Zr,
		au = d(() => {
			'use strict';
			s();
			T();
			v();
			Zr = f({
				name: 'MemberListDecoratorsAPI',
				description:
					'API to add decorators to member list (both in servers and DMs)',
				authors: [c.TheSun],
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
	var lu,
		Vr,
		cu = d(() => {
			'use strict';
			s();
			E();
			T();
			v();
			lu = {
				radio: 'MenuRadioItem',
				separator: 'MenuSeparator',
				checkbox: 'MenuCheckboxItem',
				groupstart: 'MenuGroup',
				control: 'MenuControlItem',
				compositecontrol: 'MenuControlItem',
				item: 'MenuItem',
				customitem: 'MenuItem',
			};
			ce('MenuItemDeobfuscatorAPI', 'MenuItemDeobfuscatorApi');
			Vr = f({
				name: 'MenuItemDeobfuscatorAPI',
				description: "Deobfuscates Discord's Menu Item module",
				authors: [c.Ven],
				patches: [
					{
						find: '"Menu API',
						replacement: {
							match: /function.{0,80}type===(\i)\).{0,50}navigable:.+?Menu API/s,
							replace: (e, t) => {
								let n = '',
									i = [],
									r = /\(.{1,3}\.type===(.{1,5})\)/g,
									a = /type:"(\w+)"/g,
									l;
								for (; (l = r.exec(e)) !== null; ) {
									let u = l[1];
									a.lastIndex = r.lastIndex;
									let m = a.exec(e)?.[1];
									if (m && m in lu) {
										let y = lu[m];
										(n += `Object.defineProperty(${u},"name",{value:"${y}"});`),
											i.push(`${y}:${u}`);
									}
								}
								return (
									i.length < 6 &&
										console.warn(
											'[ApiMenuItemDeobfuscator] Expected to at least remap 6 items, only remapped',
											i.length,
										),
									`${n}Object.assign(${t},{${i.join(
										',',
									)}});${e}`
								);
							},
						},
					},
				],
			});
		});
	var es,
		pu = d(() => {
			'use strict';
			s();
			T();
			v();
			es = f({
				name: 'MessageAccessoriesAPI',
				description: 'API to add message accessories.',
				authors: [c.Cyn],
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
	var ts,
		uu = d(() => {
			'use strict';
			s();
			T();
			v();
			ts = f({
				name: 'MessageDecorationsAPI',
				description: 'API to add decorations to messages',
				authors: [c.TheSun],
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
	var ns,
		du = d(() => {
			'use strict';
			s();
			T();
			v();
			ns = f({
				name: 'MessageEventsAPI',
				description: 'Api required by anything using message events.',
				authors: [c.Arjix, c.hunt],
				patches: [
					{
						find: '"MessageActionCreators"',
						replacement: [
							{
								match: /_sendMessage:(function\([^)]+\)){/,
								replace:
									'_sendMessage:async $1{if(await Vencord.Api.MessageEvents._handlePreSend(...arguments))return;',
							},
							{
								match: /\beditMessage:(function\([^)]+\)){/,
								replace:
									'editMessage:async $1{await Vencord.Api.MessageEvents._handlePreEdit(...arguments);',
							},
						],
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
	var os,
		mu = d(() => {
			'use strict';
			s();
			T();
			v();
			os = f({
				name: 'MessagePopoverAPI',
				description: 'API to add buttons to message popovers.',
				authors: [c.KingFish, c.Ven, c.Nuckyz],
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
	var is,
		fu = d(() => {
			'use strict';
			s();
			T();
			v();
			is = f({
				name: 'NoticesAPI',
				description: 'Fixes notices being automatically dismissed',
				authors: [c.Ven],
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
	var rs,
		gu = d(() => {
			'use strict';
			s();
			T();
			v();
			rs = f({
				name: 'ServerListAPI',
				authors: [c.kemo],
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
						find: 'Messages.SERVERS',
						replacement: {
							match: /(Messages\.SERVERS,children:)(.+?default:return null\}\}\)\))/,
							replace:
								'$1Vencord.Api.ServerList.renderAll(Vencord.Api.ServerList.ServerListRenderPosition.In).concat($2)',
						},
					},
				],
			});
		});
	var cs = {};
	te(cs, {
		currentNotice: () => mo,
		nextNotice: () => hu,
		noticesQueue: () => as,
		popNotice: () => ls,
		showNotice: () => fo,
	});
	function ls() {
		ss.dismiss();
	}
	function hu() {
		(mo = as.shift()), mo && ss.show(...mo, 'VencordNotice');
	}
	function fo(e, t, n) {
		as.push(['GENERIC', e, t, n]), mo || hu();
	}
	var ss,
		as,
		mo,
		gi = d(() => {
			'use strict';
			s();
			D();
			Pe(
				(e) => e.show && e.dismiss && !e.suppressAll,
				(e) => (ss = e),
			);
			(as = []), (mo = null);
		});
	function Ne(e) {
		return (
			e.disabled &&
				((e.style ??= {}),
				(e.style.pointerEvents = 'none'),
				(e['aria-disabled'] = !0)),
			o('a', { role: 'link', target: '_blank', ...e }, e.children)
		);
	}
	var Zt = d(() => {
		'use strict';
		s();
	});
	async function yu(e, t) {
		return (await Dy.getAsset(e, [t, void 0]))[0];
	}
	async function Fy(e) {
		let t = {};
		return await _y(t, e), t.application;
	}
	var Dy,
		_y,
		bu,
		$n,
		ps,
		Su = d(() => {
			'use strict';
			s();
			gi();
			Zt();
			T();
			v();
			D();
			P();
			(Dy = ye(
				'getAssetImage: size must === [number, number] for Twitch',
				{ getAsset: R.byCode('apply(') },
			)),
				(_y = oe('.APPLICATION_RPC('));
			bu = {};
			ps = f({
				name: 'WebRichPresence (arRPC)',
				description:
					'Client plugin for arRPC to enable RPC on Discord Web (experimental)',
				authors: [c.Ducko],
				settingsAboutComponent: () =>
					o(
						p,
						null,
						o(g.FormTitle, { tag: 'h3' }, 'How to use arRPC'),
						o(
							g.FormText,
							null,
							o(
								Ne,
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
						($n && $n.close(),
						($n = new WebSocket('ws://127.0.0.1:1337')),
						($n.onmessage = async (t) => {
							let n = JSON.parse(t.data);
							if (
								(n.activity?.assets?.large_image &&
									(n.activity.assets.large_image = await yu(
										n.activity.application_id,
										n.activity.assets.large_image,
									)),
								n.activity?.assets?.small_image &&
									(n.activity.assets.small_image = await yu(
										n.activity.application_id,
										n.activity.assets.small_image,
									)),
								n.activity)
							) {
								let i = n.activity.application_id;
								bu[i] ||= await Fy(i);
								let r = bu[i];
								n.activity.name ||= r.name;
							}
							I.dispatch({ type: 'LOCAL_ACTIVITY_UPDATE', ...n });
						}),
						!(await new Promise((t) =>
							setTimeout(
								() => t($n.readyState === WebSocket.OPEN),
								1e3,
							),
						)))
					) {
						fo(
							'Failed to connect to arRPC, is it running?',
							'Retry',
							() => {
								ls(), this.start();
							},
						);
						return;
					}
					K.show({
						message: 'Connected to arRPC',
						type: K.Type.SUCCESS,
						id: K.genId(),
						options: { duration: 1e3, position: K.Position.BOTTOM },
					});
				},
				stop() {
					I.dispatch({
						type: 'LOCAL_ACTIVITY_UPDATE',
						activity: null,
					}),
						$n.close();
				},
			});
		});
	var us,
		vu = d(() => {
			'use strict';
			s();
			T();
			v();
			us = f({
				name: 'BANger',
				description:
					'Replaces the GIF in the ban dialogue with a custom one.',
				authors: [c.Xinto, c.Glitch],
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
	var ds,
		Tu = d(() => {
			'use strict';
			s();
			T();
			v();
			ds = f({
				name: 'BetterGifAltText',
				authors: [c.Ven],
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
	var ms,
		xu = d(() => {
			'use strict';
			s();
			E();
			T();
			B();
			v();
			ms = f({
				name: 'BetterNotesBox',
				description:
					'Hide notes or disable spellcheck (Configure in settings!!)',
				authors: [c.Ven],
				patches: [
					{
						find: 'hideNote:',
						all: !0,
						predicate: xt(
							() => Vencord.Settings.plugins.BetterNotesBox.hide,
						),
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
						disabled: () => k.plugins.BetterNotesBox.hide,
						default: !1,
					},
				},
			});
		});
	var fs,
		wu = d(() => {
			'use strict';
			s();
			E();
			T();
			v();
			P();
			ce('BetterRoleDot', 'ClickableRoleDot');
			fs = f({
				name: 'BetterRoleDot',
				authors: [c.Ven],
				description:
					'Copy role colour on RoleDot (accessibility setting) click. Also allows using both RoleDot and coloured names simultaneously',
				patches: [
					{
						find: 'M0 4C0 1.79086 1.79086 0 4 0H16C18.2091 0 20 1.79086 20 4V16C20 18.2091 18.2091 20 16 20H4C1.79086 20 0 18.2091 0 16V4Z',
						replacement: {
							match: /viewBox:"0 0 20 20"/,
							replace:
								"$&,onClick:()=>$self.copyToClipBoard(e.color),style:{cursor:'pointer'}",
						},
					},
					{
						find: '"dot"===',
						all: !0,
						predicate: () => k.plugins.BetterRoleDot.bothStyles,
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
					at.copy(e),
						K.show({
							message: 'Copied to Clipboard!',
							type: K.Type.SUCCESS,
							id: K.genId(),
							options: {
								duration: 1e3,
								position: K.Position.BOTTOM,
							},
						});
				},
			});
		});
	var gs,
		Pu = d(() => {
			'use strict';
			s();
			T();
			v();
			gs = f({
				name: 'BetterUploadButton',
				authors: [c.obscurity, c.Ven],
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
	function Iu() {
		go.textContent = `
        .vc-nsfw-img [class^=imageWrapper] img,
        .vc-nsfw-img [class^=wrapperPaused] video {
            filter: blur(${k.plugins.BlurNSFW.blurAmount}px);
            transition: filter 0.2s;
        }
        .vc-nsfw-img [class^=imageWrapper]:hover img,
        .vc-nsfw-img [class^=wrapperPaused]:hover video {
            filter: unset;
        }
        `;
	}
	var go,
		hs,
		ku = d(() => {
			'use strict';
			s();
			E();
			T();
			v();
			hs = f({
				name: 'BlurNSFW',
				description: 'Blur attachments in NSFW channels until hovered',
				authors: [c.Ven],
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
						onChange: Iu,
					},
				},
				start() {
					(go = document.createElement('style')),
						(go.id = 'VcBlurNsfw'),
						document.head.appendChild(go),
						Iu();
				},
				stop() {
					go?.remove();
				},
			});
		});
	function Oy(e) {
		let t = k.plugins.CallTimer.format === 'human',
			n = (h) => (t ? h : h.toString().padStart(2, '0')),
			i = (h) => (t ? h : ''),
			r = t ? ' ' : ':',
			a = Math.floor(e / 864e5),
			l = Math.floor((e % 864e5) / 36e5),
			u = Math.floor(((e % 864e5) % 36e5) / 6e4),
			m = Math.floor((((e % 864e5) % 36e5) % 6e4) / 1e3),
			y = '';
		return (
			a && (y += `${a}d `),
			(l || y) && (y += `${n(l)}${i('h')}${r}`),
			(u || y || !t) && (y += `${n(u)}${i('m')}${r}`),
			(y += `${n(m)}${i('s')}`),
			y
		);
	}
	var ys,
		Cu = d(() => {
			'use strict';
			s();
			E();
			J();
			T();
			v();
			P();
			ys = f({
				name: 'CallTimer',
				description: 'Adds a timer to vcs',
				authors: [c.Ven],
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
					return o(N, { noop: !0 }, o(this.Timer, { channelId: e }));
				},
				Timer({ channelId: e }) {
					let [t, n] = w.useState(0),
						i = w.useMemo(() => Date.now(), [e]);
					return (
						w.useEffect(() => {
							let r = setInterval(() => n(Date.now() - i), 1e3);
							return () => {
								clearInterval(r), n(0);
							};
						}, [e]),
						o(
							'p',
							{ style: { margin: 0 } },
							'Connected for ',
							Oy(t),
						)
					);
				},
			});
		});
	var Ps = {};
	te(Ps, {
		_handleClick: () => Uy,
		_handlePreEdit: () => By,
		_handlePreSend: () => $y,
		addClickListener: () => xs,
		addPreEditListener: () => bn,
		addPreSendListener: () => ze,
		removeClickListener: () => ws,
		removePreEditListener: () => Sn,
		removePreSendListener: () => We,
	});
	async function $y(e, t, n) {
		for (let i of Ss)
			try {
				let r = await i(e, t, n);
				if (r && r.cancel === !0) return !0;
			} catch (r) {
				bs.error(
					`MessageSendHandler: Listener encountered an unknown error
`,
					r,
				);
			}
		return !1;
	}
	async function By(e, t, n) {
		for (let i of vs)
			try {
				await i(e, t, n);
			} catch (r) {
				bs.error(
					`MessageEditHandler: Listener encountered an unknown error
`,
					r,
				);
			}
	}
	function ze(e) {
		return Ss.add(e), e;
	}
	function bn(e) {
		return vs.add(e), e;
	}
	function We(e) {
		return Ss.delete(e);
	}
	function Sn(e) {
		return vs.delete(e);
	}
	function Uy(e, t, n) {
		e = st.getMessage(t.id, e.id) ?? e;
		for (let i of Ts)
			try {
				i(e, t, n);
			} catch (r) {
				bs.error(
					`MessageClickHandler: Listener encountered an unknown error
`,
					r,
				);
			}
	}
	function xs(e) {
		return Ts.add(e), e;
	}
	function ws(e) {
		return Ts.delete(e);
	}
	var bs,
		Ss,
		vs,
		Ts,
		Ft = d(() => {
			'use strict';
			s();
			ge();
			P();
			(bs = new F('MessageEvents', '#e5c890')),
				(Ss = new Set()),
				(vs = new Set());
			Ts = new Set();
		});
	var Mu,
		Nu = d(() => {
			'use strict';
			s();
			Mu = [
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
	var Ru,
		Gy,
		Is,
		Au = d(() => {
			'use strict';
			s();
			Ft();
			E();
			T();
			v();
			Nu();
			(Ru = /[\\^$.*+?()[\]{}|]/g), (Gy = RegExp(Ru.source));
			ce('ClearURLs', 'clearURLs');
			Is = f({
				name: 'ClearURLs',
				description: 'Removes tracking garbage from URLs',
				authors: [c.adryd],
				dependencies: ['MessageEventsAPI'],
				escapeRegExp(e) {
					return e && Gy.test(e) ? e.replace(Ru, '\\$&') : e || '';
				},
				createRules() {
					let e = Mu;
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
							a = r.toString();
						this.hostRules.set(a, r),
							this.rulesByHost.get(a) == null &&
								this.rulesByHost.set(a, new Set()),
							this.rulesByHost.get(a).add(i);
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
								t.searchParams.forEach((i, r, a) => {
									this.removeParam(n, r, a);
								});
						  }),
						  this.hostRules.forEach((n, i) => {
								!n.test(t.hostname) ||
									this.rulesByHost.get(i).forEach((r) => {
										t.searchParams.forEach((a, l, u) => {
											this.removeParam(r, l, u);
										});
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
						(this.preSend = ze((e, t) => this.onSend(t))),
						(this.preEdit = bn((e, t, n) => this.onSend(n)));
				},
				stop() {
					We(this.preSend), Sn(this.preEdit);
				},
			});
		});
	var ks,
		Lu = d(() => {
			'use strict';
			s();
			T();
			v();
			ks = f({
				name: 'ColorSighted',
				description:
					'Removes the colorblind-friendly icons from statuses, just like 2015-2017 Discord',
				authors: [c.lewisakura],
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
	var Hy,
		Cs,
		Eu = d(() => {
			'use strict';
			s();
			T();
			v();
			D();
			D();
			P();
			(Hy = (e) => () => {
				throw new Error(`'${e}' is Discord Desktop only.`);
			}),
				(Cs = f({
					name: 'ConsoleShortcuts',
					description:
						'Adds shorter Aliases for many things on the window. Run `shortcutList` for a list.',
					authors: [c.Ven],
					getShortcuts() {
						function e(t) {
							let n = new Map();
							return function (...i) {
								let r = String(i);
								if (n.has(r)) return n.get(r);
								let a = Mn(t(...i)),
									l = (() => {
										switch (a.length) {
											case 0:
												return null;
											case 1:
												return a[0];
											default:
												let u = [...new Set(a)];
												return (
													u.length > 1 &&
														console.warn(
															`Warning: This filter matches ${a.length} modules. Make it more specific!
`,
															u,
														),
													a[0]
												);
										}
									})();
								return l && r && n.set(r, l), l;
							};
						}
						return {
							wp: Vencord.Webpack,
							wpc: it.c,
							wreq: it,
							wpsearch: io,
							wpex: kr,
							wpexs: (t) =>
								Vencord.Webpack.extract(
									Vencord.Webpack.findModuleId(t),
								),
							find: e((t) => t),
							findAll: Mn,
							findByProps: e(R.byProps),
							findAllByProps: (...t) => Mn(R.byProps(...t)),
							findByCode: e(R.byCode),
							findAllByCode: (t) => Mn(R.byCode(t)),
							PluginsApi: Vencord.Plugins,
							plugins: Vencord.Plugins.plugins,
							React: w,
							Settings: Vencord.Settings,
							Api: Vencord.Api,
							reload: () => location.reload(),
							restart: Hy('restart'),
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
	function Ms() {
		return `-${Ln.fromTimestamp(Date.now())}`;
	}
	function H(e, t) {
		let n = jy({ channelId: e, content: '', embeds: [] });
		return zy.receiveMessage(e, fn(t, n)), t;
	}
	function ue(e, t, n) {
		return e.find((i) => i.name === t)?.value || n;
	}
	var jy,
		zy,
		hi = d(() => {
			'use strict';
			s();
			B();
			D();
			P();
			(jy = oe('username:"Clyde"')), (zy = C('receiveMessage'));
		});
	var Pt,
		Ve,
		Ns,
		ho = d(() => {
			'use strict';
			s();
			(Pt = ((b) => (
				(b[(b.SUB_COMMAND = 1)] = 'SUB_COMMAND'),
				(b[(b.SUB_COMMAND_GROUP = 2)] = 'SUB_COMMAND_GROUP'),
				(b[(b.STRING = 3)] = 'STRING'),
				(b[(b.INTEGER = 4)] = 'INTEGER'),
				(b[(b.BOOLEAN = 5)] = 'BOOLEAN'),
				(b[(b.USER = 6)] = 'USER'),
				(b[(b.CHANNEL = 7)] = 'CHANNEL'),
				(b[(b.ROLE = 8)] = 'ROLE'),
				(b[(b.MENTIONABLE = 9)] = 'MENTIONABLE'),
				(b[(b.NUMBER = 10)] = 'NUMBER'),
				(b[(b.ATTACHMENT = 11)] = 'ATTACHMENT'),
				b
			))(Pt || {})),
				(Ve = ((a) => (
					(a[(a.BUILT_IN = 0)] = 'BUILT_IN'),
					(a[(a.BUILT_IN_TEXT = 1)] = 'BUILT_IN_TEXT'),
					(a[(a.BUILT_IN_INTEGRATION = 2)] = 'BUILT_IN_INTEGRATION'),
					(a[(a.BOT = 3)] = 'BOT'),
					(a[(a.PLACEHOLDER = 4)] = 'PLACEHOLDER'),
					a
				))(Ve || {})),
				(Ns = ((i) => (
					(i[(i.CHAT_INPUT = 1)] = 'CHAT_INPUT'),
					(i[(i.USER = 2)] = 'USER'),
					(i[(i.MESSAGE = 3)] = 'MESSAGE'),
					i
				))(Ns || {}));
		});
	var Ls = {};
	te(Ls, {
		ApplicationCommandInputType: () => Ve,
		ApplicationCommandOptionType: () => Pt,
		ApplicationCommandType: () => Ns,
		BUILT_IN: () => Vt,
		OptionalMessageOption: () => en,
		RequiredMessageOption: () => vn,
		_handleCommand: () => qy,
		_init: () => Wy,
		commands: () => Rs,
		findOption: () => ue,
		generateId: () => Ms,
		prepareOption: () => As,
		registerCommand: () => Bn,
		sendBotMessage: () => H,
		unregisterCommand: () => yo,
	});
	function As(e) {
		return (
			(e.displayName ||= e.name),
			(e.displayDescription ||= e.description),
			e.options?.forEach((t, n, i) => {
				t === Du ? (i[n] = en) : t === _u && (i[n] = vn),
					t.choices?.forEach((r) => (r.displayName ||= r.name)),
					As(i[n]);
			}),
			e
		);
	}
	function Ky(e, t) {
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
				displayName: `${e.name} ${n.name}`,
				subCommandPath: [
					{ name: n.name, type: n.type, displayName: n.name },
				],
				rootCommand: e,
			};
			Bn(i, t);
		});
	}
	function Bn(e, t) {
		if (!Vt) {
			console.warn(
				'[CommandsAPI]',
				`Not registering ${e.name} as the CommandsAPI hasn't been initialised.`,
				'Please restart to use commands',
			);
			return;
		}
		if (Vt.some((n) => n.name === e.name))
			throw new Error(`Command '${e.name}' already exists.`);
		if (
			((e.isVencordCommand = !0),
			(e.id ??= `-${Vt.length + 1}`),
			(e.applicationId ??= '-1'),
			(e.type ??= 1),
			(e.inputType ??= 1),
			(e.plugin ||= t),
			As(e),
			e.options?.[0]?.type === 1)
		) {
			Ky(e, t);
			return;
		}
		(Rs[e.name] = e), Vt.push(e);
	}
	function yo(e) {
		let t = Vt.findIndex((n) => n.name === e);
		return t === -1 ? !1 : (Vt.splice(t, 1), delete Rs[e], !0);
	}
	var Vt,
		Rs,
		Du,
		_u,
		en,
		vn,
		Wy,
		qy,
		Re = d(() => {
			'use strict';
			s();
			B();
			hi();
			ho();
			hi();
			ho();
			(Rs = {}),
				(Du = Symbol('OptionalMessageOption')),
				(_u = Symbol('RequiredMessageOption')),
				(en = Du),
				(vn = _u),
				(Wy = function (e) {
					try {
						(Vt = e),
							(en = e.find((t) => t.name === 'shrug').options[0]),
							(vn = e.find((t) => t.name === 'me').options[0]);
					} catch {
						console.error('Failed to load CommandsApi');
					}
					return e;
				}),
				(qy = function (e, t, n) {
					if (!e.isVencordCommand) return e.execute(t, n);
					let i = (r) => {
						let a = `An Error occurred while executing command "${e.name}"`,
							l =
								r instanceof Error
									? r.stack || r.message
									: String(r);
						console.error(a, r),
							H(n.channel.id, {
								content: `${a}:
${Dn(l)}`,
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
	var Fu,
		Es,
		Ou = d(() => {
			'use strict';
			s();
			Re();
			hi();
			ho();
			T();
			v();
			D();
			(Fu = 0),
				(Es = f({
					name: 'CorruptMp4s',
					description:
						'Create corrupt mp4s with extremely high or negative duration',
					authors: [c.Ven],
					dependencies: ['CommandsAPI'],
					commands: [
						{
							name: 'corrupt',
							description:
								'Create a corrupt mp4 with extremely high or negative duration',
							inputType: 0,
							options: [
								{
									name: 'mp4',
									description: 'the video to corrupt',
									type: 11,
									required: !0,
								},
								{
									name: 'kind',
									description: 'the kind of corruption',
									type: 3,
									choices: [
										{
											name: 'infinite',
											value: 'infinite',
											label: 'Very high duration',
										},
										{
											name: 'negative',
											value: 'negative',
											label: 'Negative duration',
										},
									],
								},
							],
							execute: async (e, t) => {
								let r = cn('getUploads').getUploads(
									t.channel.id,
									Fu,
								)[0]?.item?.file;
								if (r?.type !== 'video/mp4')
									return void H(t.channel.id, {
										content: 'Please upload a mp4 file',
									});
								let a = ue(e, 'kind', 'infinite'),
									l = new Uint8Array(await r.arrayBuffer()),
									u = !1;
								for (let b = 0; b < l.length; b++)
									if (
										l[b] === 109 &&
										l[b + 1] === 118 &&
										l[b + 2] === 104 &&
										l[b + 3] === 100
									) {
										let x = b + 18;
										(l[x++] = 0),
											(l[x++] = 1),
											(l[x++] =
												a === 'negative' ? 255 : 127),
											(l[x++] = 255),
											(l[x++] = 255),
											(l[x++] =
												a === 'negative' ? 240 : 255),
											(u = !0);
										break;
									}
								if (!u)
									return void H(t.channel.id, {
										content:
											'Could not find signature. Is this even a mp4?',
									});
								let m = r.name.replace(
										/\.mp4$/i,
										'.corrupt.mp4',
									),
									y = we('UPLOAD_FILE_LIMIT_ERROR'),
									h = new File([l], m, { type: 'video/mp4' });
								setTimeout(() => y([h], t.channel, Fu), 10);
							},
						},
					],
				}));
		});
	var dt,
		Un = d(() => {
			'use strict';
			s();
			dt = class {
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
	var $u = d(() => {});
	var yi,
		Ds = d(() => {
			'use strict';
			s();
			$u();
			E();
			J();
			B();
			P();
			yi = N.wrap(
				function ({
					title: t,
					body: n,
					richBody: i,
					color: r,
					icon: a,
					onClick: l,
					onClose: u,
					image: m,
					permanent: y,
					className: h,
					dismissOnClick: b,
				}) {
					let { timeout: x, position: S } = Ge([
							'notifications.timeout',
							'notifications.position',
						]).notifications,
						A = Je([so], () => so.isFocused()),
						[M, j] = Ie(!1),
						[X, _] = Ie(0),
						Q = dn(() => Date.now(), [x, M, A]);
					rt(() => {
						if (M || !A || x === 0 || y) return void _(0);
						let fe = setInterval(() => {
							let $e = Date.now() - Q;
							$e >= x ? u() : _($e);
						}, 10);
						return () => clearInterval(fe);
					}, [x, M, A]);
					let ae = X / x;
					return o(
						'button',
						{
							className: me('vc-notification-root', h),
							style:
								S === 'bottom-right'
									? { bottom: '1rem' }
									: { top: '3rem' },
							onClick: () => {
								l?.(), b !== !1 && u();
							},
							onContextMenu: (fe) => {
								fe.preventDefault(), fe.stopPropagation(), u();
							},
							onMouseEnter: () => j(!0),
							onMouseLeave: () => j(!1),
						},
						o(
							'div',
							{ className: 'vc-notification' },
							a &&
								o('img', {
									className: 'vc-notification-icon',
									src: a,
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
											onClick: (fe) => {
												fe.preventDefault(),
													fe.stopPropagation(),
													u();
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
						m &&
							o('img', {
								className: 'vc-notification-img',
								src: m,
								alt: '',
							}),
						x !== 0 &&
							!y &&
							o('div', {
								className: 'vc-notification-progressbar',
								style: {
									width: `${(1 - ae) * 100}%`,
									backgroundColor:
										r || 'var(--brand-experiment)',
								},
							}),
					);
				},
				{ onError: ({ props: e }) => e.onClose() },
			);
		});
	var Os = {};
	te(Os, {
		classNameFactory: () => mt,
		classNameToSelector: () => Uu,
		compileStyle: () => Fs,
		disableStyle: () => Tn,
		enableStyle: () => Ot,
		isStyleEnabled: () => _s,
		requireStyle: () => bo,
		setStyleClassNames: () => Qy,
		styleMap: () => Bu,
		toggleStyle: () => Yy,
	});
	function bo(e) {
		let t = Bu.get(e);
		if (!t) throw new Error(`Style "${e}" does not exist`);
		return t;
	}
	function Ot(e) {
		let t = bo(e);
		return t.dom?.isConnected
			? !1
			: (t.dom ||
					((t.dom = document.createElement('style')),
					(t.dom.dataset.vencordName = t.name)),
			  Fs(t),
			  document.head.appendChild(t.dom),
			  !0);
	}
	function Tn(e) {
		let t = bo(e);
		return t.dom?.isConnected ? (t.dom.remove(), (t.dom = null), !0) : !1;
	}
	var Bu,
		Yy,
		_s,
		Qy,
		Fs,
		Uu,
		mt,
		It = d(() => {
			'use strict';
			s();
			Bu = window.VencordStyles ??= new Map();
			(Yy = (e) => (_s(e) ? Tn(e) : Ot(e))),
				(_s = (e) => bo(e).dom?.isConnected ?? !1),
				(Qy = (e, t, n = !0) => {
					let i = bo(e);
					(i.classNames = t), n && _s(i.name) && Fs(i);
				}),
				(Fs = (e) => {
					if (!e.dom) throw new Error('Style has no DOM element');
					e.dom.textContent = e.source.replace(
						/\[--(\w+)\]/g,
						(t, n) => {
							let i = e.classNames[n];
							return i ? Uu(i) : t;
						},
					);
				}),
				(Uu = (e, t = '') =>
					e
						.split(' ')
						.map((n) => `.${t}${n}`)
						.join('')),
				(mt =
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
										([r, a]) => a && n.add(r),
								  );
						return Array.from(n, (i) => e + i).join(' ');
					});
		});
	var Gu,
		Hu = d(() => {
			s();
			Gu = (e = 21) =>
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
	async function zu(e) {
		if (e.noPersist) return;
		let t = k.notifications.logLimit;
		t !== 0 &&
			(await yr(bi, (n) => {
				let i = n ?? [],
					{
						onClick: r,
						onClose: a,
						richBody: l,
						permanent: u,
						noPersist: m,
						dismissOnClick: y,
						...h
					} = e;
				return (
					i.unshift({ ...h, timestamp: Date.now(), id: Gu() }),
					i.length > t && t !== 200 && (i.length = t),
					i
				);
			}),
			So.forEach((n) => n()));
	}
	async function Xy(e) {
		let t = await ju(),
			n = t.findIndex((i) => i.timestamp === e);
		n !== -1 && (t.splice(n, 1), await be(bi, t), So.forEach((i) => i()));
	}
	function Jy() {
		let [e, t] = si((a) => a + 1, 0);
		rt(() => (So.add(t), () => void So.delete(t)), []);
		let [n, i, r] = Me(ju, { fallbackValue: [], deps: [e] });
		return [n, r];
	}
	function Zy({ data: e }) {
		let [t, n] = Ie(!1),
			i = w.useRef(null);
		return (
			rt(() => {
				let r = i.current,
					a = () => {
						if (r.clientHeight === 0)
							return requestAnimationFrame(a);
						r.style.height = `${r.clientHeight}px`;
					};
				a();
			}, []),
			o(
				'div',
				{ className: Gn('wrapper', { removing: t }), ref: i },
				o(yi, {
					...e,
					permanent: !0,
					dismissOnClick: !1,
					onClose: () => {
						t || (n(!0), setTimeout(() => Xy(e.timestamp), 200));
					},
					richBody: o(
						'div',
						{ className: Gn('body') },
						e.body,
						o(Kt, {
							timestamp: Tt(e.timestamp),
							className: Gn('timestamp'),
						}),
					),
				}),
			)
		);
	}
	function Vy({ log: e, pending: t }) {
		return !e.length && !t
			? o(
					'div',
					{ className: Gn('container') },
					o('div', { className: Gn('empty') }),
					o(
						g.FormText,
						{ style: { textAlign: 'center' } },
						'No notifications yet',
					),
			  )
			: o(
					'div',
					{ className: Gn('container') },
					e.map((n) => o(Zy, { data: n, key: n.id })),
			  );
	}
	function eb({ modalProps: e, close: t }) {
		let [n, i] = Jy();
		return o(
			Ee,
			{ ...e, size: 'large' },
			o(
				He,
				null,
				o(
					z,
					{ variant: 'heading-lg/semibold', style: { flexGrow: 1 } },
					'Notification Log',
				),
				o(hn, { onClick: t }),
			),
			o(je, null, o(Vy, { log: n, pending: i })),
			o(
				ut,
				null,
				o(
					L,
					{
						disabled: n.length === 0,
						onClick: () => {
							Dt.show({
								title: 'Are you sure?',
								body: `This will permanently remove ${
									n.length
								} notification${
									n.length === 1 ? '' : 's'
								}. This action cannot be undone.`,
								async onConfirm() {
									await be(bi, []), So.forEach((r) => r());
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
	function Wu() {
		let e = De((t) => o(eb, { modalProps: t, close: () => yn(e) }));
	}
	var bi,
		ju,
		Gn,
		So,
		$s = d(() => {
			'use strict';
			s();
			Lt();
			E();
			It();
			B();
			Ze();
			P();
			Hu();
			Ds();
			(bi = 'notification-log'),
				(ju = async () => (await xe(bi)) ?? []),
				(Gn = mt('vc-notification-log-')),
				(So = new Set());
		});
	function ob() {
		if (!Bs) {
			let e = document.createElement('div');
			(e.id = 'vc-notification-container'),
				document.body.append(e),
				(Bs = Nr.createRoot(e));
		}
		return Bs;
	}
	function ib(e, t) {
		let n = ob();
		return new Promise((i) => {
			n.render(
				o(yi, {
					key: t,
					...e,
					onClose: () => {
						e.onClose?.(), n.render(null), i();
					},
				}),
			);
		});
	}
	function rb() {
		let { useNative: e } = k.notifications;
		return e === 'always'
			? !0
			: e === 'not-focused'
			? !document.hasFocus()
			: !1;
	}
	async function qu() {
		return (
			Notification.permission === 'granted' ||
			(Notification.permission !== 'denied' &&
				(await Notification.requestPermission()) === 'granted')
		);
	}
	async function Hn(e) {
		if ((zu(e), rb() && (await qu()))) {
			let {
					title: t,
					body: n,
					icon: i,
					image: r,
					onClick: a = null,
					onClose: l = null,
				} = e,
				u = new Notification(t, { body: n, icon: i, image: r });
			(u.onclick = a), (u.onclose = l);
		} else tb.push(() => ib(e, nb++));
	}
	var tb,
		Bs,
		nb,
		Ku = d(() => {
			'use strict';
			s();
			E();
			Un();
			P();
			Ds();
			$s();
			(tb = new dt()), (nb = 42);
		});
	var Us = {};
	te(Us, { requestPermission: () => qu, showNotification: () => Hn });
	var vo = d(() => {
		'use strict';
		s();
		Ku();
	});
	var qs = {};
	te(qs, {
		UpdateLogger: () => Gs,
		changes: () => To,
		checkForUpdates: () => js,
		getRepo: () => Yu,
		isNewer: () => Si,
		isOutdated: () => tn,
		maybePromptToUpdate: () => xo,
		rebuild: () => Ws,
		update: () => zs,
		updateError: () => Hs,
	});
	async function jn(e) {
		let t = await e;
		if (t.ok) return t.value;
		throw ((Hs = t.error), t.error);
	}
	async function js() {
		return (
			(To = await jn(VencordNative.ipc.invoke($.GET_UPDATES))),
			To.some((e) => e.hash === lt)
				? ((Si = !0), (tn = !1))
				: (tn = To.length > 0)
		);
	}
	async function zs() {
		if (!tn) return !0;
		let e = await jn(VencordNative.ipc.invoke($.UPDATE));
		return e && (tn = !1), e;
	}
	function Yu() {
		return jn(VencordNative.ipc.invoke($.GET_REPO));
	}
	async function Ws() {
		let e = await jn(VencordNative.ipc.invoke($.GET_HASHES));
		if (!(await jn(VencordNative.ipc.invoke($.BUILD))))
			throw new Error(
				'The Build failed. Please try manually building the new update',
			);
		let t = await jn(VencordNative.ipc.invoke($.GET_HASHES));
		return (
			e['patcher.js'] !== t['patcher.js'] ||
			e['preload.js'] !== t['preload.js']
		);
	}
	async function xo(e, t = !1) {
		return;
		try {
			if (await js()) {
				let i = confirm(e);
				if (i && Si)
					return alert(
						'Your local copy has more recent commits. Please stash or reset them.',
					);
				i &&
					(await zs(),
					(await Ws())
						? DiscordNative.app.relaunch()
						: location.reload());
			}
		} catch (n) {
			Gs.error(n),
				alert(
					'That also failed :( Try updating or re-installing with the installer!',
				);
		}
	}
	var Gs,
		tn,
		Si,
		Hs,
		To,
		xn = d(() => {
			'use strict';
			s();
			_n();
			Ke();
			ge();
			(Gs = new F('Updater', 'white')), (tn = !1), (Si = !1);
		});
	var nn,
		Ks,
		Ys,
		Qs,
		Xs,
		Qu = d(() => {
			'use strict';
			s();
			vo();
			E();
			T();
			ge();
			Ze();
			v();
			xn();
			P();
			(nn = new F('CrashHandler')),
				(Ks = V({
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
				(Ys = 0),
				(Qs = 0),
				(Xs = f({
					name: 'CrashHandler',
					description:
						'Utility plugin for handling and possibly recovering from Crashes without a restart',
					authors: [c.Nuckyz],
					enabledByDefault: !0,
					popAllModals: void 0,
					settings: Ks,
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
						if (++Ys > 5) {
							try {
								Hn({
									color: '#eed202',
									title: 'Discord has crashed!',
									body: 'Awn :( Discord has crashed more than five times, not attempting to recover.',
									noPersist: !0,
								});
							} catch {}
							return (Qs = Date.now()), !1;
						}
						setTimeout(() => Ys--, 6e4);
						try {
							return (
								Ys === 1 &&
									xo(
										'Uh oh, Discord has just crashed... but good news, there is a Vencord update available that might fix this issue! Would you like to update now?',
										!0,
									),
								Ks.store.attemptToPreventCrashes
									? (this.handlePreventCrash(e), !0)
									: !1
							);
						} catch (t) {
							return nn.error('Failed to handle crash', t), !1;
						} finally {
							Qs = Date.now();
						}
					},
					handlePreventCrash(e) {
						if (Date.now() - Qs >= 1e3)
							try {
								Hn({
									color: '#eed202',
									title: 'Discord has crashed!',
									body: 'Attempting to recover...',
									noPersist: !0,
								});
							} catch {}
						try {
							I.dispatch({ type: 'CONTEXT_MENU_CLOSE' });
						} catch (t) {
							nn.debug('Failed to close open context menu.', t);
						}
						try {
							this.popAllModals?.();
						} catch (t) {
							nn.debug('Failed to close old modals.', t);
						}
						try {
							qr();
						} catch (t) {
							nn.debug('Failed to close all open modals.', t);
						}
						try {
							I.dispatch({ type: 'USER_PROFILE_MODAL_CLOSE' });
						} catch (t) {
							nn.debug('Failed to close user popout.', t);
						}
						try {
							I.dispatch({ type: 'LAYER_POP_ALL' });
						} catch (t) {
							nn.debug('Failed to pop all layers.', t);
						}
						if (Ks.store.attemptToNavigateToHome)
							try {
								lo.transitionTo('/channels/@me');
							} catch (t) {
								nn.debug('Failed to navigate to home', t);
							}
						try {
							e.forceUpdate();
						} catch (t) {
							nn.debug(
								'Failed to update crash handler component.',
								t,
							);
						}
					},
				}));
		});
	function Js(e) {
		return Boolean(e);
	}
	var Xu = d(() => {
		'use strict';
		s();
	});
	async function Ju(e) {
		return (await cb.getAsset(Ti.store.appID, [e, void 0]))[0];
	}
	async function Vu() {
		let {
			appID: e,
			appName: t,
			details: n,
			state: i,
			type: r,
			startTime: a,
			endTime: l,
			imageBig: u,
			imageBigTooltip: m,
			imageSmall: y,
			imageSmallTooltip: h,
			buttonOneText: b,
			buttonOneURL: x,
			buttonTwoText: S,
			buttonTwoURL: A,
		} = Ti.store;
		if (!t) return;
		let M = {
			application_id: e || '0',
			name: t,
			state: i,
			details: n,
			type: r,
			flags: 1 << 0,
		};
		a && ((M.timestamps = { start: a }), l && (M.timestamps.end = l)),
			b &&
				((M.buttons = [b, S].filter(Js)),
				(M.metadata = { button_urls: [x, A].filter(Js) })),
			u && (M.assets = { large_image: await Ju(u), large_text: m }),
			y &&
				(M.assets = {
					...M.assets,
					small_image: await Ju(y),
					small_text: h,
				});
		for (let j in M) {
			if (j === 'type') continue;
			let X = M[j];
			(!X || X.length === 0) && delete M[j];
		}
		return M;
	}
	async function wo(e) {
		let t = await Vu();
		I.dispatch({
			type: 'LOCAL_ACTIVITY_UPDATE',
			activity: e ? null : t,
			socketId: 'CustomRPC',
		});
	}
	var sb,
		ab,
		lb,
		cb,
		et,
		Zu,
		vi,
		pb,
		Ti,
		Zs,
		ed = d(() => {
			'use strict';
			s();
			E();
			Zt();
			T();
			Xu();
			B();
			v();
			D();
			P();
			(sb = oe('onOpenGameProfile')),
				(ab = C('activity', 'buttonColor')),
				(lb = C('profileColors')),
				(cb = ye(
					'getAssetImage: size must === [number, number] for Twitch',
					{ getAsset: R.byCode('apply(') },
				));
			(et = (e) => ({ type: 0, description: e, onChange: wo })),
				(Zu = (e) => ({ type: 1, description: e, onChange: wo })),
				(vi = (e, t, n) => ({ label: e, value: t, default: n })),
				(pb = (e, t) => ({
					type: 4,
					description: e,
					onChange: wo,
					options: t,
				})),
				(Ti = V({
					appID: et(
						'The ID of the application for the rich presence.',
					),
					appName: et('The name of the presence.'),
					details: et('Line 1 of rich presence.'),
					state: et('Line 2 of rich presence.'),
					type: pb('Type of presence', [
						vi('Playing', 0, !0),
						vi('Listening', 2),
						vi('Watching', 3),
						vi('Competing', 5),
					]),
					startTime: Zu('Unix Timestamp for beginning of activity.'),
					endTime: Zu('Unix Timestamp for end of activity.'),
					imageBig: et('Sets the big image to the specified image.'),
					imageBigTooltip: et(
						'Sets the tooltip text for the big image.',
					),
					imageSmall: et(
						'Sets the small image to the specified image.',
					),
					imageSmallTooltip: et(
						'Sets the tooltip text for the small image.',
					),
					buttonOneText: et('The text for the first button'),
					buttonOneURL: et('The URL for the first button'),
					buttonTwoText: et('The text for the second button'),
					buttonTwoURL: et('The URL for the second button'),
				}));
			Zs = f({
				name: 'CustomRPC',
				description: 'Allows you to set a custom rich presence.',
				authors: [c.captain],
				start: wo,
				stop: () => wo(!0),
				settings: Ti,
				settingsAboutComponent: () => {
					let e = Me(Vu);
					return o(
						p,
						null,
						o(g.FormTitle, { tag: 'h2' }, 'NOTE:'),
						o(
							g.FormText,
							null,
							'You will need to ',
							o(
								Ne,
								{
									href: 'https://discord.com/developers/applications',
								},
								'create an application',
							),
							' and get its ID to use this plugin.',
						),
						o(g.FormDivider, null),
						o(
							'div',
							{
								style: { width: '284px' },
								className: lb.profileColors,
							},
							e[0] &&
								o(sb, {
									activity: e[0],
									className: ab.activity,
									channelId: re.getChannelId(),
									guild: de.getGuild(
										Rn.getLastSelectedGuildId(),
									),
									application: { id: Ti.store.appID },
									user: U.getCurrentUser(),
								}),
						),
					);
				},
			});
		});
	var Vs,
		td = d(() => {
			'use strict';
			s();
			Re();
			ho();
			T();
			v();
			Vs = f({
				name: 'UrbanDictionary',
				description: 'Searches for a word on Urban Dictionary',
				authors: [c.jewdev],
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
								let {
									list: [n],
								} = await (
									await fetch(
										`https://api.urbandictionary.com/v0/define?term=${e[0].value}`,
									)
								).json();
								if (!n)
									return void H(t.channel.id, {
										content: 'No results found.',
									});
								let i = (r) =>
									r.replace(
										/\[(.+?)\]/g,
										(a, l) =>
											`[${l}](https://www.urbandictionary.com/define.php?term=${encodeURIComponent(
												l,
											)})`,
									);
								return void H(t.channel.id, {
									embeds: [
										{
											type: 'rich',
											author: {
												name: `Definition of ${n.word}`,
												url: n.permalink,
											},
											description: i(n.definition),
											fields: [
												{
													name: 'Example',
													value: i(n.example),
												},
											],
											color: 16750848,
											footer: {
												text: `\u{1F44D} ${n.thumbs_up.toString()} | \u{1F44E} ${n.thumbs_down.toString()} | Uploaded by ${
													n.author
												}`,
												icon_url:
													'https://www.urbandictionary.com/favicon.ico',
											},
											timestamp: new Date(
												n.written_on,
											).toISOString(),
										},
									],
								});
							} catch (n) {
								return void H(t.channel.id, {
									content: `Something went wrong: \`${n}\``,
								});
							}
						},
					},
				],
			});
		});
	var ea,
		nd = d(() => {
			'use strict';
			s();
			T();
			v();
			ea = f({
				name: 'DisableDMCallIdle',
				description:
					'Disables automatically getting kicked from a DM voice call after 5 minutes.',
				authors: [c.Nuckyz],
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
	var ta = {};
	te(ta, {
		_patchContextMenu: () => mb,
		addContextMenuPatch: () => kt,
		addGlobalContextMenuPatch: () => ub,
		findGroupChildrenByChildId: () => $t,
		globalPatches: () => xi,
		navPatches: () => Po,
		removeContextMenuPatch: () => Ct,
		removeGlobalContextMenuPatch: () => db,
	});
	function kt(e, t) {
		Array.isArray(e) || (e = [e]);
		for (let n of e) {
			let i = Po.get(n);
			i || ((i = new Set()), Po.set(n, i)), i.add(t);
		}
	}
	function ub(e) {
		xi.add(e);
	}
	function Ct(e, t) {
		let i = (Array.isArray(e) ? e : [e]).map(
			(r) => Po.get(r)?.delete(t) ?? !1,
		);
		return Array.isArray(e) ? i : i[0];
	}
	function db(e) {
		return xi.delete(e);
	}
	function $t(e, t, n) {
		for (let i of t) {
			if (i == null) continue;
			if (i.props?.id === e) return n ?? null;
			let r = i.props?.children;
			if (r) {
				Array.isArray(r) || ((r = [r]), (i.props.children = r));
				let a = $t(e, r, r);
				if (a !== null) return a;
			}
		}
		return null;
	}
	function mb(e) {
		e.contextMenuApiArguments ??= [];
		let t = Po.get(e.navId);
		if ((Array.isArray(e.children) || (e.children = [e.children]), t))
			for (let n of t)
				try {
					n(e.children, ...e.contextMenuApiArguments);
				} catch (i) {
					od.error(`Patch for ${e.navId} errored,`, i);
				}
		for (let n of xi)
			try {
				n(e.navId, e.children, ...e.contextMenuApiArguments);
			} catch (i) {
				od.error('Global patch errored,', i);
			}
	}
	var od,
		Po,
		xi,
		zn = d(() => {
			'use strict';
			s();
			ge();
			(od = new F('ContextMenu')), (Po = new Map()), (xi = new Set());
		});
	function na({ value: e, onChange: t, validate: n }) {
		let [i, r] = w.useState(e),
			[a, l] = w.useState();
		function u(m) {
			r(m);
			let y = n(m);
			y === !0 ? (l(void 0), t(m)) : l(y);
		}
		return o(
			p,
			null,
			o(Te, { type: 'text', value: i, onChange: u, error: a }),
		);
	}
	var oa = d(() => {
		'use strict';
		s();
		P();
	});
	function hb(e) {
		let t = U.getCurrentUser().id;
		return Object.values(de.getGuilds())
			.filter((n) => {
				if (
					!(
						n.ownerId === t ||
						BigInt(ke.getGuildPermissions({ id: n.id }) & id) === id
					)
				)
					return !1;
				let r = n.getMaxEmojiSlots(),
					{ emojis: a } = fb.getGuilds()[n.id],
					l = 0;
				for (let u of a) u.animated === e && l++;
				return l < r;
			})
			.sort((n, i) => n.name.localeCompare(i.name));
	}
	async function yb(e, t, n, i) {
		let r = await fetch(
				`${location.protocol}//${
					window.GLOBAL_ENV.CDN_HOST
				}/emojis/${t}.${i ? 'gif' : 'png'}`,
			).then((l) => l.blob()),
			a = new FileReader();
		(a.onload = () => {
			gb({ guildId: e, name: n.split('~')[0], image: a.result })
				.then(() => {
					K.show({
						message: `Successfully cloned ${n}!`,
						type: K.Type.SUCCESS,
						id: K.genId(),
					});
				})
				.catch((l) => {
					new F('EmoteCloner').error('Failed to upload emoji', l),
						K.show({
							message:
								'Oopsie something went wrong :( Check console!!!',
							type: K.Type.FAILURE,
							id: K.genId(),
						});
				});
		}),
			a.readAsDataURL(r);
	}
	function vb({ id: e, name: t, isAnimated: n }) {
		let [i, r] = w.useState(!1),
			[a, l] = w.useState(t),
			[u, m] = w.useReducer((h) => h + 1, 0),
			y = w.useMemo(() => hb(n), [n, u]);
		return o(
			p,
			null,
			o(g.FormTitle, { className: O.top20 }, 'Custom Name'),
			o(na, {
				value: a,
				onChange: l,
				validate: (h) =>
					(h.length > 1 && h.length < 32 && Sb.test(h)) ||
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
				y.map((h) =>
					o(
						Z,
						{ text: h.name },
						({ onMouseLeave: b, onMouseEnter: x }) =>
							o(
								'div',
								{
									onMouseLeave: b,
									onMouseEnter: x,
									role: 'button',
									'aria-label': 'Clone to ' + h.name,
									'aria-disabled': i,
									style: {
										borderRadius: '50%',
										backgroundColor:
											'var(--background-secondary)',
										display: 'inline-flex',
										justifyContent: 'center',
										alignItems: 'center',
										width: '4em',
										height: '4em',
										cursor: i ? 'not-allowed' : 'pointer',
										filter: i ? 'brightness(50%)' : 'none',
									},
									onClick: i
										? void 0
										: async () => {
												r(!0),
													yb(h.id, e, a, n).finally(
														() => {
															m(), r(!1);
														},
													);
										  },
								},
								h.icon
									? o('img', {
											'aria-hidden': !0,
											style: {
												borderRadius: '50%',
												width: '100%',
												height: '100%',
											},
											src: h.getIconURL(512, !0),
											alt: h.name,
									  })
									: o(
											g.FormText,
											{
												style: {
													fontSize: bb(h.acronym),
													width: '100%',
													overflow: 'hidden',
													whiteSpace: 'nowrap',
													textAlign: 'center',
													cursor: i
														? 'not-allowed'
														: 'pointer',
												},
											},
											h.acronym,
									  ),
							),
					),
				),
			),
		);
	}
	function ad(e, t, n) {
		return o(le.MenuItem, {
			id: 'emote-cloner',
			key: 'emote-cloner',
			label: 'Clone Emote',
			action: () =>
				De((i) =>
					o(
						Ee,
						{ ...i },
						o(
							He,
							null,
							o('img', {
								role: 'presentation',
								'aria-hidden': !0,
								src: `${location.protocol}//${
									window.GLOBAL_ENV.CDN_HOST
								}/emojis/${e}.${n ? 'gif' : 'png'}`,
								alt: '',
								height: 24,
								width: 24,
								style: { marginRight: '0.5em' },
							}),
							o(g.FormText, null, 'Clone ', t),
						),
						o(je, null, o(vb, { id: e, name: t, isAnimated: n })),
					),
				),
		});
	}
	function ld(e) {
		return new URL(e).pathname.endsWith('.gif');
	}
	var id,
		fb,
		gb,
		bb,
		Sb,
		rd,
		sd,
		ia,
		cd = d(() => {
			'use strict';
			s();
			zn();
			oa();
			T();
			ge();
			Be();
			Ze();
			v();
			D();
			P();
			(id = 1n << 30n),
				(fb = C('getGuilds', 'getGuildEmoji')),
				(gb = oe('"EMOJI_UPLOAD_START"', 'GUILD_EMOJIS('));
			(bb = (e) => [20, 20, 18, 18, 16, 14, 12][e.length] ?? 4),
				(Sb = /^\w+$/i);
			(rd = (e, t) => {
				let {
					favoriteableId: n,
					itemHref: i,
					itemSrc: r,
					favoriteableType: a,
				} = t ?? {};
				if (!n || a !== 'emoji') return;
				let l = t.message.content.match(
					RegExp(
						`<a?:(\\w+)(?:~\\d+)?:${n}>|https://cdn\\.discordapp\\.com/emojis/${n}\\.`,
					),
				);
				if (!l) return;
				let u = l[1] ?? 'FakeNitroEmoji',
					m = $t('copy-link', e);
				m &&
					!m.some((y) => y?.props?.id === 'emote-cloner') &&
					m.push(ad(n, u, ld(i ?? r)));
			}),
				(sd = (e, t) => {
					let { id: n, name: i, type: r } = t?.target?.dataset ?? {};
					if (!n || !i || r !== 'emoji') return;
					let a = t.target.firstChild;
					e.some((l) => l?.props?.id === 'emote-cloner') ||
						e.push(ad(n, i, a && ld(a.src)));
				}),
				(ia = f({
					name: 'EmoteCloner',
					description:
						'Adds a Clone context menu item to emotes to clone them your own server',
					authors: [c.Ven, c.Nuckyz],
					dependencies: ['MenuItemDeobfuscatorAPI', 'ContextMenuAPI'],
					start() {
						kt('message', rd), kt('expression-picker', sd);
					},
					stop() {
						Ct('message', rd), Ct('expression-picker', sd);
					},
				}));
		});
	var ra,
		sa,
		aa,
		pd = d(() => {
			'use strict';
			s();
			E();
			T();
			v();
			D();
			P();
			(ra = C('key', 'removeBuildOverride')),
				(sa = V({
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
				(aa = f({
					name: 'Experiments',
					description: 'Enable Access to Experiments in Discord!',
					authors: [c.Megu, c.Ven, c.Nickyux, c.BanTheNons, c.Nuckyz],
					settings: sa,
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
							predicate: () => sa.store.enableIsStaff,
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
							predicate: () => sa.store.forceStagingBanner,
							replacement: {
								match: /"staging"===window\.GLOBAL_ENV\.RELEASE_CHANNEL/,
								replace: 'true',
							},
						},
					],
					settingsAboutComponent: () => {
						let e = navigator.platform.includes('Mac'),
							t = e ? 'cmd' : 'ctrl',
							n = e ? 'opt' : 'alt';
						return o(
							w.Fragment,
							null,
							o(g.FormTitle, { tag: 'h3' }, 'More Information'),
							o(
								g.FormText,
								{ variant: 'text-md/normal' },
								'You can enable client DevTools',
								' ',
								o('kbd', { className: ra.key }, t),
								' +',
								' ',
								o('kbd', { className: ra.key }, n),
								' +',
								' ',
								o('kbd', { className: ra.key }, 'O'),
								' ',
								'after enabling ',
								o('code', null, 'isStaff'),
								' below',
							),
							o(
								g.FormText,
								null,
								'and then toggling ',
								o('code', null, 'Enable DevTools'),
								' in the ',
								o('code', null, 'Developer Options'),
								' tab in settings.',
							),
						);
					},
				}));
		});
	var la,
		ud = d(() => {
			'use strict';
			s();
			T();
			v();
			la = f({
				name: 'F8Break',
				description:
					'Pause the client when you press F8 with DevTools (+ breakpoints) open.',
				authors: [c.lewisakura],
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
	var wi,
		dd,
		Tb,
		md,
		fd,
		gd,
		Io = d(() => {
			'use strict';
			s();
			B();
			(wi = xt(() =>
				import('https://unpkg.com/gifenc@1.0.3/dist/gifenc.esm.js'),
			)),
				(dd = xt(async () => {
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
				(Tb = 'https://unpkg.com/@vap/shiki-worker@0.0.8/dist'),
				(md = `${Tb}/index.min.js`),
				(fd = 'https://unpkg.com/@vap/shiki@0.10.3/dist/onig.wasm'),
				(gd = xt(() =>
					import('https://unpkg.com/stegcloak-dist@1.0.0/index.js'),
				));
		});
	var pa = {};
	te(pa, {
		getCurrentChannel: () => Pi,
		getCurrentGuild: () => ca,
		openPrivateChannel: () => xb,
	});
	function Pi() {
		return G.getChannel(re.getChannelId());
	}
	function ca() {
		return de.getGuild(Pi()?.guild_id);
	}
	function xb(e) {
		Ar.openPrivateChannel(e);
	}
	var Ii = d(() => {
		'use strict';
		s();
		P();
	});
	function yd(e, t) {
		if (!t) return;
		let n = t.fields.find((r) => r.localName === e);
		return n
			? Object.values(n).find((r) => typeof r == 'function')?.()
			: void 0;
	}
	var wb,
		Pb,
		ko,
		ua,
		hd,
		wn,
		ki,
		Ib,
		kb,
		da,
		bd = d(() => {
			'use strict';
			s();
			Ft();
			E();
			T();
			Io();
			Ii();
			ln();
			v();
			D();
			P();
			(wb = 0),
				(Pb = oe('UPLOAD_FILE_LIMIT_ERROR')),
				(ko = bt('UserSettingsProtoStore')),
				(ua = Se(
					(e) =>
						e.ProtoClass?.typeName ===
						'discord_protos.discord_users.v1.PreloadedUserSettings',
				)),
				(hd = C('readerFactory'));
			(wn = Ue(() => yd('appearance', ua.ProtoClass))),
				(ki = Ue(() => yd('clientThemeSettings', wn))),
				(Ib = 1n << 18n),
				(kb = 1n << 37n);
			ce('FakeNitro', 'NitroBypass');
			da = f({
				name: 'FakeNitro',
				authors: [
					c.Arjix,
					c.D3SOX,
					c.Ven,
					c.obscurity,
					c.captain,
					c.Nuckyz,
				],
				description:
					'Allows you to stream in nitro quality, send fake emojis/stickers and use client themes.',
				dependencies: ['MessageEventsAPI'],
				patches: [
					{
						find: '.PREMIUM_LOCKED;',
						predicate: () =>
							k.plugins.FakeNitro.enableEmojiBypass === !0,
						replacement: [
							{
								match: /(?<=(\i)=\i\.intention)/,
								replace: (e, t) => `,fakeNitroIntention=${t}`,
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
						],
					},
					{
						find: 'canUseAnimatedEmojis:function',
						predicate: () =>
							k.plugins.FakeNitro.enableEmojiBypass === !0,
						replacement: {
							match: /((?:canUseEmojisEverywhere|canUseAnimatedEmojis):function\(\i)\){(.+?\))/g,
							replace: (e, t, n) =>
								`${t},fakeNitroIntention){${n}||fakeNitroIntention==null||[${3},${4}].includes(fakeNitroIntention)`,
						},
					},
					{
						find: 'canUseStickersEverywhere:function',
						predicate: () =>
							k.plugins.FakeNitro.enableStickerBypass === !0,
						replacement: {
							match: /canUseStickersEverywhere:function\(\i\){/,
							replace: '$&return true;',
						},
					},
					{
						find: '"SENDABLE"',
						predicate: () =>
							k.plugins.FakeNitro.enableStickerBypass === !0,
						replacement: {
							match: /(\w+)\.available\?/,
							replace: 'true?',
						},
					},
					{
						find: 'canStreamHighQuality:function',
						predicate: () =>
							k.plugins.FakeNitro.enableStreamQualityBypass ===
							!0,
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
						predicate: () =>
							k.plugins.FakeNitro.enableStreamQualityBypass ===
							!0,
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
						find: 'jumboable?"jumbo":"default"',
						predicate: () =>
							k.plugins.FakeNitro.transformEmojis === !0,
						replacement: {
							match: /jumboable\?"jumbo":"default",emojiId.+?}}\)},(?<=(\i)=function\(\i\){var \i=\i\.node.+?)/,
							replace: (e, t) =>
								`${e}fakeNitroEmojiComponentExport=($self.EmojiComponent=${t},void 0),`,
						},
					},
					{
						find: '["strong","em","u","text","inlineCode","s","spoiler"]',
						predicate: () =>
							k.plugins.FakeNitro.transformEmojis === !0,
						replacement: [
							{
								match: /1!==(\i)\.length\|\|1!==\i\.length/,
								replace: (e, t) =>
									`${e}||${t}[0].target?.startsWith("https://cdn.discordapp.com/emojis/")`,
							},
							{
								match: /(?=return{hasSpoilerEmbeds:\i,content:(\i)})/,
								replace: (e, t) =>
									`${t}=$self.patchFakeNitroEmojis(${t},arguments[2]?.formatInline);`,
							},
						],
					},
					{
						find: 'renderEmbeds=function',
						predicate: () =>
							k.plugins.FakeNitro.transformEmojis === !0,
						replacement: {
							match: /renderEmbeds=function\(\i\){.+?embeds\.map\(\(function\((\i)\){/,
							replace: (e, t) =>
								`${e}if(${t}.url?.startsWith("https://cdn.discordapp.com/emojis/"))return null;`,
						},
					},
				],
				options: {
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
					enableStreamQualityBypass: {
						description: 'Allow streaming in nitro quality',
						type: 3,
						default: !0,
						restartNeeded: !0,
					},
				},
				get guildId() {
					return ca()?.id;
				},
				get canUseEmotes() {
					return (U.getCurrentUser().premiumType ?? 0) > 0;
				},
				get canUseStickers() {
					return (U.getCurrentUser().premiumType ?? 0) > 1;
				},
				handleProtoChange(e, t) {
					if ((!e.appearance && !wn) || !ko) return;
					if (
						(t?.premium_type ??
							U?.getCurrentUser()?.premiumType ??
							0) !== 2 &&
						((e.appearance ??= wn.create()),
						ko.settings.appearance?.theme != null &&
							(e.appearance.theme = ko.settings.appearance.theme),
						ko.settings.appearance?.clientThemeSettings
							?.backgroundGradientPresetId?.value != null && ki)
					) {
						let i = ki.create({
							backgroundGradientPresetId: {
								value: ko.settings.appearance
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
					if (!wn || !ki || !hd) return;
					let r = ua.getCurrentValue().appearance,
						a =
							r != null
								? wn.fromBinary(wn.toBinary(r), hd)
								: wn.create();
					a.theme = t;
					let l = ki.create({
						backgroundGradientPresetId: { value: e },
					});
					(a.clientThemeSettings ??= l),
						(a.clientThemeSettings.backgroundGradientPresetId =
							l.backgroundGradientPresetId);
					let u = ua.ProtoClass.create();
					(u.appearance = a),
						I.dispatch({
							type: 'USER_SETTINGS_PROTO_UPDATE',
							local: !0,
							partial: !0,
							settings: { type: 1, proto: u },
						});
				},
				EmojiComponent: null,
				patchFakeNitroEmojis(e, t) {
					if (!this.EmojiComponent) return e;
					let n = [];
					for (let i of e) {
						if (i.props?.trusted == null) {
							n.push(i);
							continue;
						}
						let r = i.props.href.match(
							/https:\/\/cdn\.discordapp\.com\/emojis\/(\d+?)\.(png|webp|gif).+?(?=\s|$)/,
						);
						if (!r) {
							n.push(i);
							continue;
						}
						n.push(
							o(this.EmojiComponent, {
								node: {
									type: 'customEmoji',
									jumboable: !t && e.length === 1,
									animated: r[2] === 'gif',
									name: ':FakeNitroEmoji:',
									emojiId: r[1],
								},
							}),
						);
					}
					return n;
				},
				hasPermissionToUseExternalEmojis(e) {
					let t = G.getChannel(e);
					return !t || t.isDM() || t.isGroupDM() || t.isMultiUserDM()
						? !0
						: ke.can(Ib, t);
				},
				hasPermissionToUseExternalStickers(e) {
					let t = G.getChannel(e);
					return !t || t.isDM() || t.isGroupDM() || t.isMultiUserDM()
						? !0
						: ke.can(kb, t);
				},
				getStickerLink(e) {
					return `https://media.discordapp.net/stickers/${e}.png?size=${k.plugins.FakeNitro.stickerSize}`;
				},
				async sendAnimatedSticker(e, t, n) {
					let [
							{ parseURL: i },
							{ GIFEncoder: r, quantize: a, applyPalette: l },
						] = await Promise.all([dd(), wi()]),
						{ frames: u, width: m, height: y } = await i(e),
						h = new r(),
						b = k.plugins.FakeNitro.stickerSize,
						x = document.createElement('canvas');
					(x.width = b), (x.height = b);
					let S = x.getContext('2d', { willReadFrequently: !0 }),
						A = b / Math.max(m, y);
					S.scale(A, A);
					let M = null;
					for (let {
						left: X,
						top: _,
						width: Q,
						height: ae,
						disposeOp: fe,
						img: $e,
						delay: yt,
					} of u) {
						S.drawImage($e, X, _, Q, ae);
						let { data: Rt } = S.getImageData(0, 0, b, b),
							an = a(Rt, 256),
							wp = l(Rt, an);
						h.writeFrame(wp, b, b, {
							transparent: !0,
							palette: an,
							delay: yt,
						}),
							fe === 1
								? S.clearRect(X, _, Q, ae)
								: fe === 2 && M && S.drawImage(M, X, _, Q, ae),
							(M = $e);
					}
					h.finish();
					let j = new File([h.bytesView()], `${t}.gif`, {
						type: 'image/gif',
					});
					Pb([j], G.getChannel(n), wb);
				},
				start() {
					let e = k.plugins.FakeNitro;
					if (!e.enableEmojiBypass && !e.enableStickerBypass) return;
					let t = C('getCustomEmojiById'),
						n = C('getAllGuildStickers');
					function i(r, a) {
						return !r[a] || /\s/.test(r[a]) ? '' : ' ';
					}
					(this.preSend = ze((r, a, l) => {
						let { guildId: u } = this;
						e: {
							if (!e.enableStickerBypass) break e;
							let m = n.getStickerById(l?.stickerIds?.[0]);
							if (
								!m ||
								(m.available !== !1 &&
									((this.canUseStickers &&
										this.hasPermissionToUseExternalStickers(
											r,
										)) ||
										m?.guild_id === u))
							)
								break e;
							let y = this.getStickerLink(m.id);
							if (m.format_type === 2)
								return (
									this.sendAnimatedSticker(
										this.getStickerLink(m.id),
										m.id,
										r,
									),
									{ cancel: !0 }
								);
							'pack_id' in m &&
								(y = `https://distok.top/stickers/${
									m.pack_id === '847199849233514549'
										? '749043879713701898'
										: m.pack_id
								}/${m.id}.gif`),
								delete l.stickerIds,
								(a.content += ' ' + y);
						}
						if (
							(!this.canUseEmotes ||
								!this.hasPermissionToUseExternalEmojis(r)) &&
							e.enableEmojiBypass
						)
							for (let m of a.validNonShortcutEmojis) {
								if (
									!m.require_colons ||
									(m.guildId === u && !m.animated)
								)
									continue;
								let y = `<${m.animated ? 'a' : ''}:${
										m.originalName || m.name
									}:${m.id}>`,
									h = m.url.replace(
										/\?size=\d+/,
										`?size=${k.plugins.FakeNitro.emojiSize}`,
									);
								a.content = a.content.replace(
									y,
									(b, x, S) =>
										`${i(S, x - 1)}${h}${i(
											S,
											x + b.length,
										)}`,
								);
							}
						return { cancel: !1 };
					})),
						(this.preEdit = bn((r, a, l) => {
							if (
								this.canUseEmotes &&
								this.hasPermissionToUseExternalEmojis(r)
							)
								return;
							let { guildId: u } = this;
							for (let [m, y, h] of l.content.matchAll(
								/(?<!\\)<a?:(\w+):(\d+)>/gi,
							)) {
								let b = t.getCustomEmojiById(h);
								if (
									b == null ||
									(b.guildId === u && !b.animated) ||
									!b.require_colons
								)
									continue;
								let x = b.url.replace(
									/\?size=\d+/,
									`?size=${k.plugins.FakeNitro.emojiSize}`,
								);
								l.content = l.content.replace(
									m,
									(S, A, M) =>
										`${i(M, A - 1)}${x}${i(
											M,
											A + S.length,
										)}`,
								);
							}
						}));
				},
				stop() {
					We(this.preSend), Sn(this.preEdit);
				},
			});
		});
	function Sd({ text: e, color: t }) {
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
	var vd = d(() => {
		'use strict';
		s();
	});
	function Td({
		option: e,
		pluginSettings: t,
		definedSettings: n,
		id: i,
		onChange: r,
		onError: a,
	}) {
		let l = t[i] ?? e.default,
			[u, m] = w.useState(l ?? !1),
			[y, h] = w.useState(null);
		w.useEffect(() => {
			a(y !== null);
		}, [y]);
		let b = [
			{ label: 'Enabled', value: !0, default: l === !0 },
			{
				label: 'Disabled',
				value: !1,
				default: typeof l > 'u' || l === !1,
			},
		];
		function x(S) {
			let A = e.isValid?.call(n, S) ?? !0;
			typeof A == 'string'
				? h(A)
				: A
				? (h(null), m(S), r(S))
				: h('Invalid input provided.');
		}
		return o(
			g.FormSection,
			null,
			o(g.FormTitle, null, e.description),
			o(St, {
				isDisabled: e.disabled?.call(n) ?? !1,
				options: b,
				placeholder: e.placeholder ?? 'Select an option',
				maxVisibleItems: 5,
				closeOnSelect: !0,
				select: x,
				isSelected: (S) => S === u,
				serialize: (S) => String(S),
				...e.componentProps,
			}),
			y && o(g.FormText, { style: { color: 'var(--text-danger)' } }, y),
		);
	}
	var xd = d(() => {
		'use strict';
		s();
		P();
	});
	function wd({ option: e, onChange: t, onError: n }) {
		return e.component({ setValue: t, setError: n, option: e });
	}
	var Pd = d(() => {
		'use strict';
		s();
	});
	function ma({
		option: e,
		pluginSettings: t,
		definedSettings: n,
		id: i,
		onChange: r,
		onError: a,
	}) {
		function l(x) {
			return e.type === 2 ? BigInt(x) : Number(x);
		}
		let [u, m] = w.useState(`${t[i] ?? e.default ?? 0}`),
			[y, h] = w.useState(null);
		w.useEffect(() => {
			a(y !== null);
		}, [y]);
		function b(x) {
			let S = e.isValid?.call(n, x) ?? !0;
			h(null),
				typeof S == 'string' ? h(S) : S || h('Invalid input provided.'),
				e.type === 1 && BigInt(x) >= Cb
					? (m(`${Number.MAX_SAFE_INTEGER}`), r(l(x)))
					: (m(x), r(l(x)));
		}
		return o(
			g.FormSection,
			null,
			o(g.FormTitle, null, e.description),
			o(Te, {
				type: 'number',
				pattern: '-?[0-9]+',
				value: u,
				onChange: b,
				placeholder: e.placeholder ?? 'Enter a number',
				disabled: e.disabled?.call(n) ?? !1,
				...e.componentProps,
			}),
			y && o(g.FormText, { style: { color: 'var(--text-danger)' } }, y),
		);
	}
	var Cb,
		Id = d(() => {
			'use strict';
			s();
			v();
			P();
			Cb = BigInt(Number.MAX_SAFE_INTEGER);
		});
	function kd({
		option: e,
		pluginSettings: t,
		definedSettings: n,
		onChange: i,
		onError: r,
		id: a,
	}) {
		let l = t[a] ?? e.options?.find((x) => x.default)?.value,
			[u, m] = w.useState(l ?? null),
			[y, h] = w.useState(null);
		w.useEffect(() => {
			r(y !== null);
		}, [y]);
		function b(x) {
			let S = e.isValid?.call(n, x) ?? !0;
			typeof S == 'string'
				? h(S)
				: S
				? (h(null), m(x), i(x))
				: h('Invalid input provided.');
		}
		return o(
			g.FormSection,
			null,
			o(g.FormTitle, null, e.description),
			o(St, {
				isDisabled: e.disabled?.call(n) ?? !1,
				options: e.options,
				placeholder: e.placeholder ?? 'Select an option',
				maxVisibleItems: 5,
				closeOnSelect: !0,
				select: b,
				isSelected: (x) => x === u,
				serialize: (x) => String(x),
				...e.componentProps,
			}),
			y && o(g.FormText, { style: { color: 'var(--text-danger)' } }, y),
		);
	}
	var Cd = d(() => {
		'use strict';
		s();
		P();
	});
	function Ci(e, t, n = 1) {
		let i = [];
		for (let r = e; r <= t; r += n) i.push(Math.round(r * 100) / 100);
		return i;
	}
	function Md({
		option: e,
		pluginSettings: t,
		definedSettings: n,
		id: i,
		onChange: r,
		onError: a,
	}) {
		let l = t[i] ?? e.default,
			[u, m] = w.useState(null);
		w.useEffect(() => {
			a(u !== null);
		}, [u]);
		function y(h) {
			let b = e.isValid?.call(n, h) ?? !0;
			typeof b == 'string'
				? m(b)
				: b
				? (m(null), r(h))
				: m('Invalid input provided.');
		}
		return o(
			g.FormSection,
			null,
			o(g.FormTitle, null, e.description),
			o(Nn, {
				disabled: e.disabled?.call(n) ?? !1,
				markers: e.markers,
				minValue: e.markers[0],
				maxValue: e.markers[e.markers.length - 1],
				initialValue: l,
				onValueChange: y,
				onValueRender: (h) => String(h.toFixed(2)),
				stickToMarkers: e.stickToMarkers ?? !0,
				...e.componentProps,
			}),
		);
	}
	var fa = d(() => {
		'use strict';
		s();
		P();
	});
	function Nd({
		option: e,
		pluginSettings: t,
		definedSettings: n,
		id: i,
		onChange: r,
		onError: a,
	}) {
		let [l, u] = w.useState(t[i] ?? e.default ?? null),
			[m, y] = w.useState(null);
		w.useEffect(() => {
			a(m !== null);
		}, [m]);
		function h(b) {
			let x = e.isValid?.call(n, b) ?? !0;
			typeof x == 'string'
				? y(x)
				: x
				? (y(null), u(b), r(b))
				: y('Invalid input provided.');
		}
		return o(
			g.FormSection,
			null,
			o(g.FormTitle, null, e.description),
			o(Te, {
				type: 'text',
				value: l,
				onChange: h,
				placeholder: e.placeholder ?? 'Enter a value',
				disabled: e.disabled?.call(n) ?? !1,
				...e.componentProps,
			}),
			m && o(g.FormText, { style: { color: 'var(--text-danger)' } }, m),
		);
	}
	var Rd = d(() => {
		'use strict';
		s();
		P();
	});
	var Mi = d(() => {
		'use strict';
		s();
		vd();
		xd();
		Pd();
		Id();
		Cd();
		fa();
		Rd();
	});
	var ga,
		Ad = d(() => {
			'use strict';
			s();
			Re();
			E();
			Mi();
			T();
			v();
			ga = f({
				name: 'Fart2',
				authors: [c.Animal],
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
								(t.volume = k.plugins.Fart2.volume),
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
						markers: Ci(0, 1, 0.1),
						default: 0.5,
						stickToMarkers: !1,
					},
				},
			});
		});
	var ha,
		Ld = d(() => {
			'use strict';
			s();
			T();
			v();
			P();
			ha = f({
				name: 'FixInbox',
				description:
					"Fixes the Unreads Inbox from crashing Discord when you're in lots of guilds.",
				authors: [c.Megu],
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
						g.FormSection,
						null,
						o(g.FormTitle, { tag: 'h3' }, "What's the problem?"),
						o(
							g.FormText,
							{ style: { marginBottom: 8 } },
							"By default, Discord emits a GUILD_SUBSCRIPTIONS event for every guild you're in. When you're in a lot of guilds, this can cause the gateway to ratelimit you. This causes the client to crash and get stuck in an infinite ratelimit loop as it tries to reconnect.",
						),
						o(g.FormTitle, { tag: 'h3' }, 'How does it work?'),
						o(
							g.FormText,
							null,
							"This plugin works by stopping the client from sending GUILD_SUBSCRIPTIONS events to the gateway when you open the unreads inbox. This means that not all unreads will be shown, instead only already-subscribed guilds' unreads will be shown, but your client won't crash anymore.",
						),
					);
				},
			});
		});
	var ya,
		Ed = d(() => {
			'use strict';
			s();
			T();
			v();
			P();
			ya = f({
				name: 'ForceOwnerCrown',
				description:
					'Force the owner crown next to usernames even if the server is large.',
				authors: [c.D3SOX, c.Nickyux],
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
						let i = de.getGuild(t);
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
	var ba,
		Dd = d(() => {
			'use strict';
			s();
			Re();
			T();
			v();
			D();
			ba = f({
				name: 'FriendInvites',
				description:
					'Create and manage friend invite links via slash commands (/create friend invite, /view friend invites, /revoke friend invites).',
				authors: [c.afn],
				dependencies: ['CommandsAPI'],
				commands: [
					{
						name: 'create friend invite',
						description: 'Generates a friend invite link.',
						inputType: 3,
						execute: async (e, t) => {
							let i = await cn(
								'createFriendInvite',
							).createFriendInvite();
							return void H(t.channel.id, {
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
							let r = (
								await cn(
									'createFriendInvite',
								).getAllFriendInvites()
							).map((a) =>
								`_discord.gg/${a.code}_ \xB7
                    Expires: <t:${
						new Date(a.expires_at).getTime() / 1e3
					}:R> \xB7
                    Times used: \`${a.uses}/${a.max_uses}\``
									.trim()
									.replace(/\s+/g, ' '),
							);
							return void H(t.channel.id, {
								content:
									r.join(`
`) || 'You have no active friend invites!',
							});
						},
					},
					{
						name: 'revoke friend invites',
						description: 'Revokes all generated friend invites.',
						inputType: 3,
						execute: async (e, t) => (
							await cn(
								'createFriendInvite',
							).revokeFriendInvites(),
							void H(t.channel.id, {
								content:
									'All friend invites have been revoked.',
							})
						),
					},
				],
			});
		});
	var Mb,
		Sa,
		_d = d(() => {
			'use strict';
			s();
			Ft();
			T();
			v();
			(Mb = /https?:\/\/twitter\.com(?=\/\w+?\/status\/)/g),
				(Sa = f({
					name: 'FxTwitter',
					description:
						'Uses FxTwitter to improve embeds from twitter on send',
					authors: [c.Samu],
					dependencies: ['MessageEventsAPI'],
					addPrefix(e) {
						e.content = e.content.replace(
							Mb,
							'https://fxtwitter.com',
						);
					},
					start() {
						this.preSend = ze((e, t) => this.addPrefix(t));
					},
					stop() {
						We(this.preSend);
					},
				}));
		});
	var Nb,
		Rb,
		va,
		Fd = d(() => {
			'use strict';
			s();
			T();
			v();
			D();
			(Nb = ye('name:"expression-picker-last-active-view"', {
				close: R.byCode('activeView:null', 'setState'),
			})),
				(Rb = Se((e) => e.emitter?._events?.INSERT_TEXT)),
				(va = f({
					name: 'GifPaste',
					description:
						'Makes picking a gif in the gif picker insert a link into the chatbox instead of instantly sending it',
					authors: [c.Ven],
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
						e &&
							(Rb.dispatchToLastSubscribed('INSERT_TEXT', {
								rawText: e.url + ' ',
							}),
							Nb.close());
					},
				}));
		});
	var Ta = {};
	te(Ta, {
		_buildPopoverElements: () => Lb,
		addButton: () => Bt,
		buttons: () => Ni,
		removeButton: () => Ut,
	});
	function Bt(e, t) {
		Ni.set(e, t);
	}
	function Ut(e) {
		Ni.delete(e);
	}
	function Lb(e, t) {
		let n = [];
		for (let [i, r] of Ni.entries())
			try {
				let a = r(e);
				a && ((a.key ??= i), n.push(t(a)));
			} catch (a) {
				Ab.error(`[${i}]`, a);
			}
		return n;
	}
	var Ab,
		Ni,
		Wn = d(() => {
			'use strict';
			s();
			ge();
			(Ab = new F('MessagePopover')), (Ni = new Map());
		});
	var Co,
		$d,
		Eb,
		Db,
		Mo,
		Od,
		_b,
		xa,
		Bd = d(() => {
			'use strict';
			s();
			Lt();
			Wn();
			T();
			v();
			P();
			($d = 'HideAttachments_HiddenIds'),
				(Eb = () =>
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
				(Db = () =>
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
				(Mo = new Set()),
				(Od = () => xe($d).then((e) => ((Mo = e ?? new Set()), Mo))),
				(_b = (e) => be($d, e)),
				(xa = f({
					name: 'HideAttachments',
					description:
						'Hide attachments and Embeds for individual messages via hover button',
					authors: [c.Ven],
					dependencies: ['MessagePopoverAPI'],
					async start() {
						(Co = document.createElement('style')),
							(Co.id = 'VencordHideAttachments'),
							document.head.appendChild(Co),
							await Od(),
							await this.buildCss(),
							Bt('HideAttachments', (e) => {
								if (!e.attachments.length && !e.embeds.length)
									return null;
								let t = Mo.has(e.id);
								return {
									label: t
										? 'Show Attachments'
										: 'Hide Attachments',
									icon: t ? Eb : Db,
									message: e,
									channel: G.getChannel(e.channel_id),
									onClick: () => this.toggleHide(e.id),
								};
							});
					},
					stop() {
						Co.remove(), Mo.clear(), Ut('HideAttachments');
					},
					async buildCss() {
						let e = [...Mo]
							.map((t) => `#message-accessories-${t}`)
							.join(',');
						Co.textContent = `
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
						let t = await Od();
						t.delete(e) || t.add(e),
							await _b(t),
							await this.buildCss(),
							I.dispatch({
								type: 'MESSAGE_UPDATE',
								message: { id: e },
							});
					},
				}));
		});
	var wa,
		Ud = d(() => {
			'use strict';
			s();
			T();
			v();
			wa = f({
				name: 'iLoveSpam',
				description: "Do not hide messages from 'likely spammers'",
				authors: [c.botato, c.Animal],
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
	function $b() {
		return o(
			'svg',
			{
				className: qn.overlayToggleIconOff,
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
					className: qn.fill,
					fill: 'currentColor',
					d: 'M 16 8 C 7.664063 8 1.25 15.34375 1.25 15.34375 L 0.65625 16 L 1.25 16.65625 C 1.25 16.65625 7.097656 23.324219 14.875 23.9375 C 15.246094 23.984375 15.617188 24 16 24 C 16.382813 24 16.753906 23.984375 17.125 23.9375 C 24.902344 23.324219 30.75 16.65625 30.75 16.65625 L 31.34375 16 L 30.75 15.34375 C 30.75 15.34375 24.335938 8 16 8 Z M 16 10 C 18.203125 10 20.234375 10.601563 22 11.40625 C 22.636719 12.460938 23 13.675781 23 15 C 23 18.613281 20.289063 21.582031 16.78125 21.96875 C 16.761719 21.972656 16.738281 21.964844 16.71875 21.96875 C 16.480469 21.980469 16.242188 22 16 22 C 15.734375 22 15.476563 21.984375 15.21875 21.96875 C 11.710938 21.582031 9 18.613281 9 15 C 9 13.695313 9.351563 12.480469 9.96875 11.4375 L 9.9375 11.4375 C 11.71875 10.617188 13.773438 10 16 10 Z M 16 12 C 14.34375 12 13 13.34375 13 15 C 13 16.65625 14.34375 18 16 18 C 17.65625 18 19 16.65625 19 15 C 19 13.34375 17.65625 12 16 12 Z M 7.25 12.9375 C 7.09375 13.609375 7 14.285156 7 15 C 7 16.753906 7.5 18.394531 8.375 19.78125 C 5.855469 18.324219 4.105469 16.585938 3.53125 16 C 4.011719 15.507813 5.351563 14.203125 7.25 12.9375 Z M 24.75 12.9375 C 26.648438 14.203125 27.988281 15.507813 28.46875 16 C 27.894531 16.585938 26.144531 18.324219 23.625 19.78125 C 24.5 18.394531 25 16.753906 25 15 C 25 14.285156 24.90625 13.601563 24.75 12.9375 Z',
				}),
				o('rect', {
					className: qn.fill,
					x: '3',
					y: '26',
					width: '26',
					height: '2',
					transform: 'rotate(-45 2 20)',
				}),
			),
		);
	}
	function Bb({ forceWhite: e }) {
		return o(
			'svg',
			{
				className: qn.overlayToggleIconOn,
				height: '24',
				width: '24',
				viewBox: '0 0 32 26',
			},
			o('path', {
				className: e ? '' : qn.fill,
				fill: e ? 'var(--white-500)' : '',
				d: 'M 16 8 C 7.664063 8 1.25 15.34375 1.25 15.34375 L 0.65625 16 L 1.25 16.65625 C 1.25 16.65625 7.097656 23.324219 14.875 23.9375 C 15.246094 23.984375 15.617188 24 16 24 C 16.382813 24 16.753906 23.984375 17.125 23.9375 C 24.902344 23.324219 30.75 16.65625 30.75 16.65625 L 31.34375 16 L 30.75 15.34375 C 30.75 15.34375 24.335938 8 16 8 Z M 16 10 C 18.203125 10 20.234375 10.601563 22 11.40625 C 22.636719 12.460938 23 13.675781 23 15 C 23 18.613281 20.289063 21.582031 16.78125 21.96875 C 16.761719 21.972656 16.738281 21.964844 16.71875 21.96875 C 16.480469 21.980469 16.242188 22 16 22 C 15.734375 22 15.476563 21.984375 15.21875 21.96875 C 11.710938 21.582031 9 18.613281 9 15 C 9 13.695313 9.351563 12.480469 9.96875 11.4375 L 9.9375 11.4375 C 11.71875 10.617188 13.773438 10 16 10 Z M 16 12 C 14.34375 12 13 13.34375 13 15 C 13 16.65625 14.34375 18 16 18 C 17.65625 18 19 16.65625 19 15 C 19 13.34375 17.65625 12 16 12 Z M 7.25 12.9375 C 7.09375 13.609375 7 14.285156 7 15 C 7 16.753906 7.5 18.394531 8.375 19.78125 C 5.855469 18.324219 4.105469 16.585938 3.53125 16 C 4.011719 15.507813 5.351563 14.203125 7.25 12.9375 Z M 24.75 12.9375 C 26.648438 14.203125 27.988281 15.507813 28.46875 16 C 27.894531 16.585938 26.144531 18.324219 23.625 19.78125 C 24.5 18.394531 25 16.753906 25 15 C 25 14.285156 24.90625 13.601563 24.75 12.9375 Z',
			}),
		);
	}
	function Hd({ activity: e, forceWhite: t }) {
		let n = wt();
		return o(
			Z,
			{ text: 'Toggle activity' },
			({ onMouseLeave: i, onMouseEnter: r }) =>
				o(
					'div',
					{
						onMouseLeave: i,
						onMouseEnter: r,
						className: qn.overlayToggleIcon,
						role: 'button',
						'aria-label': 'Toggle activity',
						tabIndex: 0,
						onClick: (a) => Gb(a, e, n),
					},
					tt.has(e.id) ? o($b, null) : o(Bb, { forceWhite: t }),
				),
		);
	}
	function Ub({ activity: e }) {
		return o(
			'div',
			{
				className: `${Fb.tryItOutBadge} ${Ob.baseShapeRound}`,
				style: { padding: '0px 2px' },
			},
			o(Hd, { activity: e, forceWhite: !0 }),
		);
	}
	function Gb(e, t, n) {
		e.stopPropagation(),
			tt.has(t.id) ? tt.delete(t.id) : tt.set(t.id, t),
			n(),
			Pa();
	}
	async function Pa() {
		await be('IgnoreActivities_ignoredActivities', tt);
	}
	var qn,
		Fb,
		Ob,
		Gd,
		tt,
		Ia,
		jd = d(() => {
			'use strict';
			s();
			Lt();
			J();
			T();
			B();
			v();
			D();
			P();
			(qn = C('overlayToggleIconOff', 'overlayToggleIconOn')),
				(Fb = C('tryItOutBadge', 'tryItOutBadgeIcon')),
				(Ob = C(
					'baseShapeRound',
					'baseShapeRoundLeft',
					'baseShapeRoundRight',
				)),
				(Gd = bt('RunningGameStore'));
			(tt = new Map()),
				(Ia = f({
					name: 'IgnoreActivities',
					authors: [c.Nuckyz],
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
							(await xe('IgnoreActivities_ignoredActivities')) ??
							new Map();
						if (Array.isArray(e)) {
							for (let t of e) tt.set(t, { id: t, type: 0 });
							await Pa();
						} else tt = e;
						if (tt.size !== 0) {
							let t = Gd.getGamesSeen();
							for (let n of tt.values())
								n.type === 0 &&
									(t.some(
										(i) =>
											i.id === n.id || i.exePath === n.id,
									) ||
										tt.delete(n.id));
							await Pa();
						}
					},
					renderToggleGameActivityButton(e) {
						return o(
							N,
							{ noop: !0 },
							o(Hd, {
								activity: { id: e.id ?? e.exePath, type: 0 },
							}),
						);
					},
					renderToggleActivityButton(e) {
						return o(
							N,
							{ noop: !0 },
							o(Ub, { activity: { id: e.id, type: 1 } }),
						);
					},
					isActivityNotIgnored(e) {
						if (e.type === 0) {
							if (e.application_id !== void 0)
								return !tt.has(e.application_id);
							{
								let t = Gd.getRunningGames().find(
									(n) => n.name === e.name,
								)?.exePath;
								if (t) return !tt.has(t);
							}
						}
						return !0;
					},
				}));
		});
	function Hb(e) {
		let t = e?.message?.content,
			[n, i] = w.useState('password');
		return o(
			Ee,
			{ ...e },
			o(He, null, o(g.FormTitle, { tag: 'h4' }, 'Decrypt Message')),
			o(
				je,
				null,
				o(
					g.FormTitle,
					{ tag: 'h5', style: { marginTop: '10px' } },
					'Secret',
				),
				o(Te, { defaultValue: t, disabled: !0 }),
				o(g.FormTitle, { tag: 'h5' }, 'Password'),
				o(Te, { style: { marginBottom: '20px' }, onChange: i }),
			),
			o(
				ut,
				null,
				o(
					L,
					{
						color: L.Colors.GREEN,
						onClick: () => {
							let r = ka(t, n, !0);
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
					L,
					{
						color: L.Colors.TRANSPARENT,
						look: L.Looks.LINK,
						style: { left: 15, position: 'absolute' },
						onClick: e.onClose,
					},
					'Cancel',
				),
			),
		);
	}
	function zd(e) {
		De((t) => o(Hb, { ...t, ...e }));
	}
	var Wd = d(() => {
		'use strict';
		s();
		Ze();
		P();
		Ri();
	});
	function zb(e) {
		let [t, n] = w.useState(''),
			[i, r] = w.useState(''),
			[a, l] = w.useState('password'),
			[u, m] = w.useState(!1),
			y = t && (u || (i && /\w \w/.test(i)));
		return o(
			Ee,
			{ ...e },
			o(He, null, o(g.FormTitle, { tag: 'h4' }, 'Encrypt Message')),
			o(
				je,
				null,
				o(
					g.FormTitle,
					{ tag: 'h5', style: { marginTop: '10px' } },
					'Secret',
				),
				o(Te, {
					onChange: (h) => {
						n(h);
					},
				}),
				o(
					g.FormTitle,
					{ tag: 'h5', style: { marginTop: '10px' } },
					'Cover (2 or more Words!!)',
				),
				o(Te, {
					disabled: u,
					onChange: (h) => {
						r(h);
					},
				}),
				o(
					g.FormTitle,
					{ tag: 'h5', style: { marginTop: '10px' } },
					'Password',
				),
				o(Te, {
					style: { marginBottom: '20px' },
					defaultValue: 'password',
					onChange: (h) => {
						l(h);
					},
				}),
				o(
					pn,
					{
						value: u,
						onChange: (h) => {
							m(h);
						},
					},
					"Don't use a Cover",
				),
			),
			o(
				ut,
				null,
				o(
					L,
					{
						color: L.Colors.GREEN,
						disabled: !y,
						onClick: () => {
							if (!y) return;
							let h = Yd(t, a, u ? 'd d' : i),
								b = u ? h.replaceAll('d', '') : h;
							!b ||
								(jb.dispatchToLastSubscribed('INSERT_TEXT', {
									rawText: `${b}`,
								}),
								e.onClose());
						},
					},
					'Send',
				),
				o(
					L,
					{
						color: L.Colors.TRANSPARENT,
						look: L.Looks.LINK,
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
	function qd() {
		De((e) => o(zb, { ...e }));
	}
	var jb,
		Kd = d(() => {
			'use strict';
			s();
			Ze();
			D();
			P();
			Ri();
			jb = Se((e) => e.emitter?._events?.INSERT_TEXT);
		});
	function Wb() {
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
	function qb() {
		return o(
			Z,
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
	function Kb() {
		return o(
			Z,
			{ text: 'Encrypt Message' },
			({ onMouseEnter: e, onMouseLeave: t }) =>
				o(
					'div',
					{ style: { display: 'flex' } },
					o(
						L,
						{
							'aria-haspopup': 'dialog',
							'aria-label': 'Encrypt Message',
							size: '',
							look: un.BLANK,
							onMouseEnter: e,
							onMouseLeave: t,
							innerClassName: vt.button,
							onClick: () => qd(),
							style: { marginRight: '2px' },
						},
						o(
							'div',
							{ className: vt.buttonWrapper },
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
	function Yd(e, t, n) {
		return Ca.hide(e + '\u200B', t, n);
	}
	function ka(e, t, n) {
		let i = Ca.reveal(e, t);
		return n ? i.replace('\u200B', '') : i;
	}
	function Yb(e) {
		return e.endsWith('\u200B');
	}
	async function Qb(e) {
		let t = Qd.store.savedPasswords.split(',').map((i) => i.trim());
		if (!e?.content || !t?.length) return !1;
		let { content: n } = e;
		/^\W/.test(e.content) && (n = `d ${e.content}d`);
		for (let i = 0; i < t.length; i++) {
			let r = ka(n, t[i], !1);
			if (Yb(r)) return r;
		}
		return !1;
	}
	var Ca,
		Qd,
		Ma,
		Ri = d(() => {
			'use strict';
			s();
			Wn();
			E();
			J();
			T();
			Io();
			v();
			P();
			Wd();
			Kd();
			(Qd = V({
				savedPasswords: {
					type: 0,
					default: 'password, Password',
					description: 'Saved Passwords (Seperated with a , )',
				},
			})),
				(Ma = f({
					name: 'InvisibleChat',
					description:
						'Encrypt your Messages in a non-suspicious way! This plugin makes requests to >>https://embed.sammcheese.net<< to provide embeds to decrypted links!',
					authors: [c.SammCheese],
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
									'$&;try{$2||$1.push($self.chatBarIcon())}catch{}',
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
					settings: Qd,
					async start() {
						let { default: e } = await gd();
						(Ca = new e(!0, !1)),
							Bt('invDecrypt', (t) =>
								this.INV_REGEX.test(t?.content)
									? {
											label: 'Decrypt Message',
											icon: this.popOverIcon,
											message: t,
											channel: G.getChannel(t.channel_id),
											onClick: async () => {
												await Qb(t).then((n) =>
													n
														? void this.buildEmbed(
																t,
																n,
														  )
														: void zd({
																message: t,
														  }),
												);
											},
									  }
									: null,
							);
					},
					stop() {
						Ut('invDecrypt');
					},
					async getEmbed(e) {
						let t = new AbortController(),
							n = setTimeout(() => t.abort(), 5e3),
							i = {
								signal: t.signal,
								method: 'POST',
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify({ url: e }),
							},
							r = await fetch(this.EMBED_API_URL, i);
						return clearTimeout(n), await r.json();
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
						I.dispatch({ type: 'MESSAGE_UPDATE', message: e });
					},
					chatBarIcon: N.wrap(Kb, { noop: !0 }),
					popOverIcon: () => o(Wb, null),
					indicator: N.wrap(qb, { noop: !0 }),
				}));
		});
	var Na,
		Xd = d(() => {
			'use strict';
			s();
			Lt();
			T();
			v();
			P();
			Na = f({
				name: 'KeepCurrentChannel',
				description:
					'Attempt to navigate to the channel you were in before switching accounts or loading Discord.',
				authors: [c.Nuckyz],
				isSwitchingAccount: !1,
				previousCache: {},
				attemptToNavigateToChannel(e, t) {
					!G.hasChannel(t) ||
						lo.transitionTo(`/channels/${e ?? '@me'}/${t}`);
				},
				onLogout(e) {
					this.isSwitchingAccount = e.isSwitchingAccount;
				},
				onConnectionOpen() {
					!this.isSwitchingAccount ||
						((this.isSwitchingAccount = !1),
						this.previousCache.channelId &&
							this.attemptToNavigateToChannel(
								this.previousCache.guildId,
								this.previousCache.channelId,
							));
				},
				async onChannelSelect({ guildId: e, channelId: t }) {
					this.isSwitchingAccount ||
						((this.previousCache = { guildId: e, channelId: t }),
						await be(
							'KeepCurrentChannel_previousData',
							this.previousCache,
						));
				},
				async start() {
					let e = await xe('KeepCurrentChannel_previousData');
					e
						? ((this.previousCache = e),
						  this.previousCache.channelId &&
								this.attemptToNavigateToChannel(
									this.previousCache.guildId,
									this.previousCache.channelId,
								))
						: ((this.previousCache = {
								guildId: Rn.getGuildId(),
								channelId: re.getChannelId() ?? null,
						  }),
						  await be(
								'KeepCurrentChannel_previousData',
								this.previousCache,
						  )),
						I.subscribe('LOGOUT', this.onLogout.bind(this)),
						I.subscribe(
							'CONNECTION_OPEN',
							this.onConnectionOpen.bind(this),
						),
						I.subscribe(
							'CHANNEL_SELECT',
							this.onChannelSelect.bind(this),
						);
				},
				stop() {
					I.unsubscribe('LOGOUT', this.onLogout),
						I.unsubscribe('CONNECTION_OPEN', this.onConnectionOpen),
						I.unsubscribe('CHANNEL_SELECT', this.onChannelSelect);
				},
			});
		});
	async function Ra(e) {
		return (await Zb.getAsset(Aa, [e, void 0]))[0];
	}
	function Vb(e) {
		I.dispatch({
			type: 'LOCAL_ACTIVITY_UPDATE',
			activity: e,
			socketId: 'LastFM',
		});
	}
	var Aa,
		Xb,
		Jd,
		Jb,
		Zb,
		ft,
		La,
		Zd = d(() => {
			'use strict';
			s();
			E();
			Zt();
			T();
			ge();
			v();
			D();
			P();
			(Aa = '1043533871037284423'),
				(Xb = '2a96cbd8b46e442fc41c2b86b821562f'),
				(Jd = new F('LastFMRichPresence')),
				(Jb = C('getLocalPresence')),
				(Zb = ye(
					'getAssetImage: size must === [number, number] for Twitch',
					{ getAsset: R.byCode('apply(') },
				));
			(ft = V({
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
				(La = f({
					name: 'LastFMRichPresence',
					description: 'Little plugin for Last.fm rich presence',
					authors: [c.dzshn, c.RuiNtD],
					settingsAboutComponent: () =>
						o(
							p,
							null,
							o(
								g.FormTitle,
								{ tag: 'h3' },
								'How to get an API key',
							),
							o(
								g.FormText,
								null,
								'An API key is required to fetch your current track. To get one, you can visit ',
								o(
									Ne,
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
					settings: ft,
					start() {
						this.updateInterval = setInterval(() => {
							this.updatePresence();
						}, 16e3);
					},
					stop() {
						clearInterval(this.updateInterval);
					},
					async fetchTrackData() {
						if (!ft.store.username || !ft.store.apiKey) return null;
						try {
							let e = new URLSearchParams({
									method: 'user.getrecenttracks',
									api_key: ft.store.apiKey,
									user: ft.store.username,
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
									Jd.error(
										'Error from Last.fm API',
										`${n.error}: ${n.message}`,
									),
									null
								);
							let i = n.recenttracks?.track[0];
							return !i || !i['@attr']?.nowplaying
								? null
								: {
										name: i.name || 'Unknown',
										album: i.album['#text'],
										artist: i.artist['#text'] || 'Unknown',
										url: i.url,
										imageUrl: i.image?.find(
											(r) => r.size === 'large',
										)?.['#text'],
								  };
						} catch (e) {
							return (
								Jd.error('Failed to query Last.fm API', e), null
							);
						}
					},
					async updatePresence() {
						Vb(await this.getActivity());
					},
					getLargeImage(e) {
						if (e.imageUrl && !e.imageUrl.includes(Xb))
							return e.imageUrl;
						if (ft.store.missingArt === 'placeholder')
							return 'placeholder';
					},
					async getActivity() {
						if (ft.store.hideWithSpotify) {
							for (let r of Jb.getActivities())
								if (r.type === 2 && r.application_id !== Aa)
									return null;
						}
						let e = await this.fetchTrackData();
						if (!e) return null;
						let t = this.getLargeImage(e),
							n = t
								? {
										large_image: await Ra(t),
										large_text: e.album || void 0,
										small_image: await Ra('lastfm-small'),
										small_text: 'Last.fm',
								  }
								: {
										large_image: await Ra('lastfm-large'),
										large_text: e.album || void 0,
								  },
							i = [{ label: 'View Song', url: e.url }];
						return (
							ft.store.shareUsername &&
								i.push({
									label: 'Last.fm Profile',
									url: `https://www.last.fm/user/${ft.store.username}`,
								}),
							{
								application_id: Aa,
								name: ft.store.statusName,
								details: e.name,
								state: e.artist,
								assets: n,
								buttons: i.map((r) => r.label),
								metadata: { button_urls: i.map((r) => r.url) },
								type: ft.store.useListeningStatus ? 2 : 0,
								flags: 1,
							}
						);
					},
				}));
		});
	var Vd,
		Ea,
		em = d(() => {
			'use strict';
			s();
			T();
			v();
			(Vd = [
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
				(Ea = f({
					name: 'LoadingQuotes',
					description: 'Replace Discords loading quotes',
					authors: [c.Ven, c.KraXen72],
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
							Vd[Math.floor(Math.random() * Vd.length)],
						);
					},
				}));
		});
	function eS() {
		let e = Pi().guild_id,
			t = Da[e];
		if (((tm = wt()), !t)) return null;
		let n = t[0].toLocaleString();
		n === '0' && t[1] > 0 && (n = 'Loading...');
		let i = t[1].toLocaleString();
		return o(
			pe,
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
			o(Z, { text: `${i} Online`, position: 'bottom' }, (r) =>
				o(
					'div',
					{ ...r },
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
					o('span', { style: { color: 'var(--green-360)' } }, i),
				),
			),
			o(Z, { text: `${n} Total Members`, position: 'bottom' }, (r) =>
				o(
					'div',
					{ ...r },
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
					o('span', { style: { color: 'var(--primary-400)' } }, n),
				),
			),
		);
	}
	var Da,
		tm,
		_a,
		nm = d(() => {
			'use strict';
			s();
			J();
			ct();
			T();
			Ii();
			B();
			v();
			P();
			Da = {};
			_a = f({
				name: 'MemberCount',
				description:
					'Shows the amount of online & total members in the server member list',
				authors: [c.Ven, c.Commandtechno],
				patches: [
					{
						find: '.isSidebarVisible,',
						replacement: {
							match: /(var (.)=.\.className.+?children):\[(.\.useMemo[^}]+"aria-multiselectable")/,
							replace:
								"$1:[$2.startsWith('members')?$self.render():null,$3",
						},
					},
				],
				onGuildMemberListUpdate({
					guildId: e,
					groups: t,
					memberCount: n,
					id: i,
				}) {
					if (i !== 'everyone' && Da[e]) return;
					let r = 0;
					for (let a of t) a.id !== 'offline' && (r += a.count);
					(Da[e] = [n, r]), tm?.();
				},
				start() {
					I.subscribe(
						'GUILD_MEMBER_LIST_UPDATE',
						this.onGuildMemberListUpdate,
					);
				},
				stop() {
					I.unsubscribe(
						'GUILD_MEMBER_LIST_UPDATE',
						this.onGuildMemberListUpdate,
					);
				},
				render: () => o(N, { noop: !0 }, o(eS, null)),
			});
		});
	var Fa,
		om,
		im,
		tS,
		Oa,
		rm = d(() => {
			'use strict';
			s();
			Ft();
			E();
			T();
			v();
			D();
			P();
			(Fa = !1),
				(om = (e) => e.key === 'Backspace' && (Fa = !0)),
				(im = (e) => e.key === 'Backspace' && (Fa = !1)),
				(tS = 1n << 4n);
			ce('MessageClickActions', 'MessageQuickActions');
			Oa = f({
				name: 'MessageClickActions',
				description:
					'Hold Backspace and click to delete, double click to edit',
				authors: [c.Ven],
				dependencies: ['MessageEventsAPI'],
				options: {
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
				},
				start() {
					let e = C('deleteMessage', 'startEditMessage'),
						t = C('isEditing', 'isEditingAny');
					document.addEventListener('keydown', om),
						document.addEventListener('keyup', im),
						(this.onClick = xs((n, i, r) => {
							let a = n.author.id === U.getCurrentUser().id;
							Fa
								? Vencord.Settings.plugins.MessageClickActions
										.enableDeleteOnClick &&
								  (a || ke.can(tS, i)) &&
								  (e.deleteMessage(i.id, n.id),
								  r.preventDefault())
								: Vencord.Settings.plugins.MessageClickActions
										.enableDoubleClickToEdit &&
								  a &&
								  r.detail >= 2 &&
								  !t.isEditing(i.id, n.id) &&
								  (e.startEditMessage(i.id, n.id, n.content),
								  r.preventDefault());
						}));
				},
				stop() {
					ws(this.onClick),
						document.removeEventListener('keydown', om),
						document.removeEventListener('keyup', im);
				},
			});
		});
	var Ba = {};
	te(Ba, {
		_modifyAccessories: () => oS,
		accessories: () => Ai,
		addAccessory: () => $a,
		removeAccessory: () => nS,
	});
	function $a(e, t, n) {
		Ai.set(e, { callback: t, position: n });
	}
	function nS(e) {
		Ai.delete(e);
	}
	function oS(e, t) {
		for (let n of Ai.values()) {
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
	var Ai,
		Ua = d(() => {
			'use strict';
			s();
			Ai = new Map();
		});
	async function aS(e, t) {
		let n = Kn.get(t);
		if (n) return n.message;
		Kn.set(t, { fetched: !1 });
		let r = (
			await ao
				.get({
					url: `/channels/${e}/messages`,
					query: { limit: 1, around: t },
					retries: 2,
				})
				.catch(() => null)
		)?.body?.[0];
		if (!r) return;
		let a = st.getMessages(r.channel_id).receiveMessage(r).get(r.id);
		return Kn.set(a.id, { message: a, fetched: !0 }), a;
	}
	function lS(e) {
		let t = [];
		for (let {
			content_type: n,
			height: i,
			width: r,
			url: a,
			proxy_url: l,
		} of e.attachments ?? [])
			n?.startsWith('image/') &&
				t.push({ height: i, width: r, url: a, proxyURL: l });
		for (let { type: n, image: i, thumbnail: r, url: a } of e.embeds ?? [])
			n === 'image'
				? t.push({ ...(i ?? r) })
				: a &&
				  n === 'gifv' &&
				  !lm.test(a) &&
				  t.push({ height: r.height, width: r.width, url: a });
		return t;
	}
	function cS(e, t) {
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
	function pS(e) {
		return !!(
			e.components.length ||
			e.attachments.some((t) => !t.content_type?.startsWith('image/')) ||
			e.embeds.some(
				(t) =>
					t.type !== 'image' && (t.type !== 'gifv' || lm.test(t.url)),
			)
		);
	}
	function uS(e, t) {
		if (e > t) {
			let a = Math.min(e, 400);
			return { width: a, height: Math.round(t / (e / a)) };
		}
		let r = Math.min(t, 300);
		return { width: Math.round(e / (t / r)), height: r };
	}
	function dS(e, t) {
		return new Proxy(e, {
			get(n, i) {
				return i === 'vencordEmbeddedBy'
					? t
					: Reflect.get(...arguments);
			},
		});
	}
	function mS({ message: e }) {
		let t = e.vencordEmbeddedBy ?? [],
			n = [],
			i = null;
		for (; (i = Ga.exec(e.content)) !== null; ) {
			let [r, a, l, u] = i;
			if (t.includes(u)) continue;
			let m = G.getChannel(l);
			if (!m || (a !== '@me' && !ke.can(1024n, m))) continue;
			let y = Kn.get(u)?.message;
			if (!y)
				if (((y ??= st.getMessage(l, u)), y))
					Kn.set(u, { message: y, fetched: !0 });
				else {
					let x = { ...e };
					delete x.embeds,
						sS.push(() =>
							aS(l, u).then(
								(S) =>
									S &&
									I.dispatch({
										type: 'MESSAGE_UPDATE',
										message: x,
									}),
							),
						);
					continue;
				}
			let h = { message: dS(y, [...t, e.id]), channel: m, guildID: a },
				b = Ha.store.automodEmbeds;
			n.push(
				b === 'always' || (b === 'prefer' && !pS(y))
					? o(gS, { ...h })
					: o(fS, { ...h }),
			);
		}
		return n.length ? o(p, null, n) : null;
	}
	function fS({ message: e, channel: t, guildID: n }) {
		let i = n === '@me',
			r = !i && de.getGuild(t.guild_id),
			a = U.getUser(G.getChannel(t.id).recipients?.[0]);
		return o(iS, {
			embed: {
				rawDescription: '',
				color: 'var(--background-secondary)',
				author: {
					name: o(
						z,
						{ variant: 'text-xs/medium', tag: 'span' },
						o(
							'span',
							null,
							i ? 'Direct Message - ' : r.name + ' - ',
						),
						i ? Ce.parse(`<@${a.id}>`) : Ce.parse(`<#${t.id}>`),
					),
					iconProxyURL: r
						? `https://${window.GLOBAL_ENV.CDN_HOST}/icons/${r.id}/${r.icon}.png`
						: `https://${window.GLOBAL_ENV.CDN_HOST}/avatars/${a.id}/${a.avatar}`,
				},
			},
			renderDescription: () =>
				o(
					'div',
					{
						key: e.id,
						className: me(
							sm.message,
							Ha.store.messageBackgroundColor && sm.searchResult,
						),
					},
					o(rS, {
						id: `message-link-embeds-${e.id}`,
						message: e,
						channel: t,
						subscribeToComponentDispatch: !1,
					}),
				),
		});
	}
	function gS(e) {
		let { message: t, channel: n, guildID: i } = e,
			r = i === '@me',
			a = lS(t),
			{ parse: l } = Ce;
		return o(am, {
			channel: n,
			childrenAccessories: o(
				z,
				{ color: 'text-muted', variant: 'text-xs/medium', tag: 'span' },
				l(r ? `<@${G.getChannel(n.id).recipients[0]}>` : `<#${n.id}>`),
				o(
					'span',
					null,
					r
						? ' - Direct Message'
						: ' - ' + de.getGuild(n.guild_id)?.name,
				),
			),
			compact: !1,
			content: o(
				p,
				null,
				t.content || t.attachments.length <= a.length
					? l(t.content)
					: [cS(t.attachments.length, t.embeds.length)],
				a.map((u) => {
					let { width: m, height: y } = uS(u.width, u.height);
					return o(
						'div',
						null,
						o('img', { src: u.url, width: m, height: y }),
					);
				}),
			),
			hideTimestamp: !1,
			message: t,
			_messageEmbed: 'automod',
		});
	}
	var Kn,
		iS,
		rS,
		sm,
		am,
		Ga,
		lm,
		sS,
		Ha,
		ja,
		cm = d(() => {
			'use strict';
			s();
			Ua();
			E();
			J();
			T();
			B();
			Un();
			v();
			D();
			P();
			(Kn = new Map()),
				(iS = Y(() => we('.inlineMediaEmbed'))),
				(rS = Y(() =>
					he((e) =>
						e.type
							?.toString()
							?.includes('["message","compact","className",'),
					),
				)),
				(sm = C('message', 'searchResult')),
				(am = () => null),
				(Ga =
					/(?<!<)https?:\/\/(?:\w+\.)?discord(?:app)?\.com\/channels\/(\d{17,20}|@me)\/(\d{17,20})\/(\d{17,20})/g),
				(lm = /https:\/\/(?:www.)?tenor\.com/),
				(sS = new dt()),
				(Ha = V({
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
								L,
								{ onClick: () => Kn.clear() },
								'Clear the linked message cache',
							),
					},
				}));
			ja = f({
				name: 'MessageLinkEmbeds',
				description:
					'Adds a preview to messages that link another message',
				authors: [c.TheSun, c.Ven],
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
					am = e;
				},
				settings: Ha,
				start() {
					$a(
						'messageLinkEmbed',
						(e) =>
							Ga.test(e.message.content)
								? ((Ga.lastIndex = 0),
								  o(N, null, o(mS, { message: e.message })))
								: null,
						4,
					);
				},
			});
		});
	var pm = d(() => {});
	var za,
		um = d(() => {
			s();
			(window.VencordStyles ??= new Map()).set(
				'src/plugins/messageLogger/deleteStyleOverlay.css',
				{
					name: 'src/plugins/messageLogger/deleteStyleOverlay.css',
					source: `.messagelogger-deleted {
    background-color: rgba(240 71 71 / 15%);
}
`,
					classNames: {},
					dom: null,
				},
			);
			za = 'src/plugins/messageLogger/deleteStyleOverlay.css';
		});
	var Wa,
		dm = d(() => {
			s();
			(window.VencordStyles ??= new Map()).set(
				'src/plugins/messageLogger/deleteStyleText.css',
				{
					name: 'src/plugins/messageLogger/deleteStyleText.css',
					source: `.messagelogger-deleted div {
    color: #f04747;
}

.messagelogger-deleted a {
    color: #be3535;
    text-decoration: underline;
}
`,
					classNames: {},
					dom: null,
				},
			);
			Wa = 'src/plugins/messageLogger/deleteStyleText.css';
		});
	function mm() {
		k.plugins.MessageLogger.deleteStyle === 'text'
			? (Ot(Wa), Tn(za))
			: (Tn(Wa), Ot(za));
	}
	var hS,
		qa,
		fm,
		Ka,
		gm = d(() => {
			'use strict';
			s();
			pm();
			zn();
			E();
			It();
			J();
			T();
			ge();
			v();
			D();
			P();
			um();
			dm();
			hS = C('edited', 'communicationDisabled', 'isSystemMessage');
			(qa = 'message-logger-remove-history'),
				(fm = (e, t) => {
					let { message: n } = t,
						{
							deleted: i,
							editHistory: r,
							id: a,
							channel_id: l,
						} = n;
					(!i && !r?.length) ||
						e.some((u) => u?.props?.id === qa) ||
						e.push(
							o(le.MenuItem, {
								id: qa,
								key: qa,
								label: 'Remove Message History',
								action: () => {
									n.deleted
										? I.dispatch({
												type: 'MESSAGE_DELETE',
												channelId: l,
												id: a,
												mlDeleted: !0,
										  })
										: (n.editHistory = []);
								},
							}),
						);
				}),
				(Ka = f({
					name: 'MessageLogger',
					description:
						'Temporarily logs deleted and edited messages.',
					authors: [c.rushii, c.Ven],
					dependencies: ['ContextMenuAPI', 'MenuItemDeobfuscatorAPI'],
					start() {
						mm(), kt('message', fm);
					},
					stop() {
						Ct('message', fm);
					},
					renderEdit(e) {
						return o(
							N,
							{ noop: !0 },
							o(
								'div',
								{ className: 'messagelogger-edited' },
								Ce.parse(e.content),
								o(
									Kt,
									{
										timestamp: e.timestamp,
										isEdited: !0,
										isInline: !1,
									},
									o(
										'span',
										{ className: hS.edited },
										' ',
										'(',
										An.Messages.MESSAGE_EDITED,
										')',
									),
								),
							),
						);
					},
					makeEdit(e, t) {
						return {
							timestamp: Tt?.call(e.edited_timestamp),
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
							onChange: () => mm(),
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
							let u = function (m) {
								let y = e.get(m);
								if (!y) return;
								let h = 64;
								t.mlDeleted ||
								(y.flags & h) === h ||
								(r && y.author?.bot) ||
								(a && y.author?.id === l)
									? (e = e.remove(m))
									: (e = e.update(m, (x) =>
											x.set('deleted', !0).set(
												'attachments',
												x.attachments.map(
													(S) => (
														(S.deleted = !0), S
													),
												),
											),
									  ));
							};
							var i = u;
							if (e == null || (!n && !e.has(t.id))) return e;
							let { ignoreBots: r, ignoreSelf: a } =
									k.plugins.MessageLogger,
								l = U.getCurrentUser().id;
							n ? t.ids.forEach(u) : u(t.id);
						} catch (r) {
							new F('MessageLogger').error(
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
	function hm(e) {
		Bn(
			{
				name: e.name,
				description: e.name,
				inputType: 1,
				execute: async (t, n) =>
					(await Li(e.name))
						? (k.plugins.MessageTags.clyde &&
								H(n.channel.id, {
									author: Mt,
									content: `${on} The tag **${e.name}** has been sent!`,
								}),
						  {
								content: e.message.replaceAll(
									'\\n',
									`
`,
								),
						  })
						: (H(n.channel.id, {
								author: Mt,
								content: `${on} The tag **${e.name}** does not exist anymore! Please reload ur Discord to fix :)`,
						  }),
						  { content: `/${e.name}` }),
				[yS]: !0,
			},
			'CustomTags',
		);
	}
	var on,
		Di,
		yS,
		Mt,
		Ei,
		Li,
		bS,
		SS,
		Ya,
		ym = d(() => {
			'use strict';
			s();
			Re();
			Lt();
			E();
			T();
			v();
			(on = '<:luna:1035316192220553236>'),
				(Di = 'MessageTags_TAGS'),
				(yS = Symbol('MessageTags')),
				(Mt = { id: '821472922140803112', bot: !1 }),
				(Ei = () => xe(Di).then((e) => e ?? [])),
				(Li = (e) =>
					xe(Di).then(
						(t) => (t ?? []).find((n) => n.name === e) ?? null,
					)),
				(bS = async (e) => {
					let t = await Ei();
					return t.push(e), be(Di, t), t;
				}),
				(SS = async (e) => {
					let t = await Ei();
					return (
						(t = await t.filter((n) => n.name !== e)), be(Di, t), t
					);
				});
			Ya = f({
				name: 'MessageTags',
				description:
					'Allows you to save messages and to use them with a simple command.',
				authors: [c.Luna],
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
					for (let e of await Ei()) hm(e);
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
									let n = ue(e[0].options, 'tag-name', ''),
										i = ue(e[0].options, 'message', '');
									if (await Li(n))
										return H(t.channel.id, {
											author: Mt,
											content: `${on} A Tag with the name **${n}** already exists!`,
										});
									let r = {
										name: n,
										enabled: !0,
										message: i,
									};
									hm(r),
										await bS(r),
										H(t.channel.id, {
											author: Mt,
											content: `${on} Successfully created the tag **${n}**!`,
										});
									break;
								}
								case 'delete': {
									let n = ue(e[0].options, 'tag-name', '');
									if (!(await Li(n)))
										return H(t.channel.id, {
											author: Mt,
											content: `${on} A Tag with the name **${n}** does not exist!`,
										});
									yo(n),
										await SS(n),
										H(t.channel.id, {
											author: Mt,
											content: `${on} Successfully deleted the tag **${n}**!`,
										});
									break;
								}
								case 'list': {
									H(t.channel.id, {
										author: Mt,
										embeds: [
											{
												title: 'All Tags:',
												description:
													(await Ei()).map(
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
`) || `${on} Woops! There are no tags yet, use \`/tags create\` to create one!`,
												color: 14122879,
												type: 'rich',
											},
										],
									});
									break;
								}
								case 'preview': {
									let n = ue(e[0].options, 'tag-name', ''),
										i = await Li(n);
									if (!i)
										return H(t.channel.id, {
											author: Mt,
											content: `${on} A Tag with the name **${n}** does not exist!`,
										});
									H(t.channel.id, {
										author: Mt,
										content: i.message.replaceAll(
											'\\n',
											`
`,
										),
									});
									break;
								}
							}
							return H(t.channel.id, {
								author: Mt,
								content: 'Invalid sub-command',
							});
						},
					},
				],
			});
		});
	function vS(e) {
		let t = '';
		for (let n = 0; n < e.length; n++)
			t += n % 2 ? e[n].toUpperCase() : e[n].toLowerCase();
		return t;
	}
	var Qa,
		bm = d(() => {
			'use strict';
			s();
			Re();
			T();
			v();
			Qa = f({
				name: 'MoreCommands',
				description: 'echo, lenny, mock',
				authors: [c.Arjix, c.echo, c.Samu],
				dependencies: ['CommandsAPI'],
				commands: [
					{
						name: 'echo',
						description: 'Sends a message as Clyde (locally)',
						options: [en],
						inputType: 3,
						execute: (e, t) => {
							let n = ue(e, 'message', '');
							H(t.channel.id, { content: n });
						},
					},
					{
						name: 'lenny',
						description: 'Sends a lenny face',
						options: [en],
						execute: (e) => ({
							content:
								ue(e, 'message', '') +
								' ( \u0361\xB0 \u035C\u0296 \u0361\xB0)',
						}),
					},
					{
						name: 'mock',
						description: 'mOcK PeOpLe',
						options: [vn],
						execute: (e) => ({ content: vS(ue(e, 'message', '')) }),
					},
				],
			});
		});
	var Xa,
		Sm = d(() => {
			'use strict';
			s();
			Re();
			E();
			T();
			v();
			ce('MoreKaomoji', 'moarKaomojis');
			Xa = f({
				name: 'MoreKaomoji',
				description:
					'Adds more Kaomoji to discord. \u30FD(\xB4\u25BD`)/',
				authors: [c.JacobTm],
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
					options: [en],
					execute: (t) => ({
						content: ue(t, 'message', '') + e.description,
					}),
				})),
			});
		});
	function xS(e, t) {
		let n = 0,
			i = 0;
		for (; (i = e.indexOf(t, i) + 1) !== 0; ) n++;
		return n;
	}
	function wS(e, t) {
		if (!t.global) throw new Error('pattern must be global');
		let n = 0;
		for (; t.test(e); ) n++;
		return n;
	}
	function IS(e) {
		let t = xS(e, Za) + wS(e, PS);
		return Math.min(t, 10);
	}
	function Ja() {
		if (!No.store.triggerWhenUnfocused && !document.hasFocus()) return;
		let e = document.createElement('audio');
		(e.src = TS), (e.volume = No.store.volume), e.play();
	}
	var Za,
		TS,
		No,
		Va,
		PS,
		vm = d(() => {
			'use strict';
			s();
			E();
			fa();
			T();
			B();
			v();
			P();
			(Za = '\u{1F5FF}'),
				(TS =
					'https://raw.githubusercontent.com/MeguminSama/VencordPlugins/main/plugins/moyai/moyai.mp3'),
				(No = V({
					volume: {
						description:
							'Volume of the \u{1F5FF}\u{1F5FF}\u{1F5FF}',
						type: 5,
						markers: Ci(0, 1, 0.1),
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
				(Va = f({
					name: 'Moyai',
					authors: [c.Megu, c.Nuckyz],
					description:
						'\u{1F5FF}\u{1F5FF}\u{1F5FF}\u{1F5FF}\u{1F5FF}\u{1F5FF}\u{1F5FF}\u{1F5FF}',
					settings: No,
					async onMessage(e) {
						if (
							e.optimistic ||
							e.type !== 'MESSAGE_CREATE' ||
							e.message.state === 'SENDING' ||
							(No.store.ignoreBots && e.message.author?.bot) ||
							!e.message.content ||
							e.channelId !== re.getChannelId()
						)
							return;
						let t = IS(e.message.content);
						for (let n = 0; n < t; n++) Ja(), await co(300);
					},
					onReaction(e) {
						if (
							e.optimistic ||
							e.type !== 'MESSAGE_REACTION_ADD' ||
							(No.store.ignoreBots && U.getUser(e.userId)?.bot) ||
							e.channelId !== re.getChannelId()
						)
							return;
						let t = e.emoji.name.toLowerCase();
						(t !== Za &&
							!t.includes('moyai') &&
							!t.includes('moai')) ||
							Ja();
					},
					onVoiceChannelEffect(e) {
						if (!e.emoji?.name) return;
						let t = e.emoji.name.toLowerCase();
						(t !== Za &&
							!t.includes('moyai') &&
							!t.includes('moai')) ||
							Ja();
					},
					start() {
						I.subscribe('MESSAGE_CREATE', this.onMessage),
							I.subscribe(
								'MESSAGE_REACTION_ADD',
								this.onReaction,
							),
							I.subscribe(
								'VOICE_CHANNEL_EFFECT_SEND',
								this.onVoiceChannelEffect,
							);
					},
					stop() {
						I.unsubscribe('MESSAGE_CREATE', this.onMessage),
							I.unsubscribe(
								'MESSAGE_REACTION_ADD',
								this.onReaction,
							),
							I.unsubscribe(
								'VOICE_CHANNEL_EFFECT_SEND',
								this.onVoiceChannelEffect,
							);
					},
				}));
			PS = /<a?:\w*moy?ai\w*:\d{17,20}>/gi;
		});
	var el,
		Tm = d(() => {
			'use strict';
			s();
			T();
			v();
			el = f({
				name: 'MuteNewGuild',
				description: 'Mutes newly joined guilds',
				authors: [c.Glitch],
				patches: [
					{
						find: ',acceptInvite:function',
						replacement: {
							match: /(\w=null!==[^;]+)/,
							replace:
								"$1;Vencord.Webpack.findByProps('updateGuildNotificationSettings').updateGuildNotificationSettings($1,{'muted':true,'suppress_everyone':true,'suppress_roles':true})",
						},
					},
				],
			});
		});
	var kS,
		tl,
		xm = d(() => {
			'use strict';
			s();
			E();
			T();
			v();
			D();
			(kS = C('getRelationships', 'isBlocked')),
				(tl = f({
					name: 'NoBlockedMessages',
					description:
						'Hides all blocked messages from chat completely.',
					authors: [c.rushii, c.Samu],
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
								k.plugins.NoBlockedMessages
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
					isBlocked: (e) => kS.isBlocked(e.author.id),
				}));
		});
	var nl,
		wm = d(() => {
			'use strict';
			s();
			Ft();
			E();
			T();
			v();
			nl = f({
				name: 'NoCanaryMessageLinks',
				description:
					'Allows you to change/remove the subdomain of discord message and channel links',
				authors: [c.Samu, c.nea],
				options: {
					linkPrefix: {
						description:
							'The subdomain for your discord message links',
						type: 0,
						default: '',
						restartNeeded: !1,
					},
					alwaysUseDiscordHost: {
						description:
							'Always use discord.com host (replace discordapp.com)',
						type: 3,
						default: !1,
						restartNeeded: !1,
					},
				},
				dependencies: ['MessageEventsAPI'],
				removeBetas(e) {
					let t = k.plugins.NoCanaryMessageLinks;
					e.content = e.content.replace(
						/https:\/\/(?:canary\.|ptb\.)?(discord(?:app)?\.com)(\/channels\/(?:\d{17,20}|@me)\/\d{17,20}(?:\/\d{17,20})?)/g,
						(n, i, r) =>
							'https://' +
							(t.linkPrefix ? t.linkPrefix + '.' : '') +
							(t.alwaysUseDiscordHost ? 'discord.com' : i) +
							r,
					);
				},
				start() {
					this.preSend = ze((e, t) => this.removeBetas(t));
				},
				stop() {
					We(this.preSend);
				},
			});
		});
	var ol,
		Pm = d(() => {
			'use strict';
			s();
			E();
			T();
			v();
			ce('NoDevtoolsWarning', 'STFU');
			ol = f({
				name: 'NoDevtoolsWarning',
				description:
					"Disables the 'HOLD UP' banner in the console. As a side effect, also prevents Discord from hiding your token, which prevents random logouts.",
				authors: [c.Ven],
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
	var il,
		Im = d(() => {
			'use strict';
			s();
			E();
			T();
			v();
			ce('NoF1', 'No F1');
			il = f({
				name: 'NoF1',
				description: 'Disables F1 help bind.',
				authors: [c.Cyn],
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
	var rl,
		km = d(() => {
			'use strict';
			s();
			E();
			T();
			v();
			rl = f({
				name: 'NoReplyMention',
				description: 'Disables reply pings by default',
				authors: [c.DustyAngel47, c.axyie],
				options: {
					exemptList: {
						description:
							'List of users to exempt from this plugin (separated by commas)',
						type: 0,
						default: '1234567890123445,1234567890123445',
					},
				},
				shouldMention(e) {
					return k.plugins.NoReplyMention.exemptList.includes(
						e.message.author.id,
					);
				},
				patches: [
					{
						find: 'CREATE_PENDING_REPLY:function',
						replacement: {
							match: /CREATE_PENDING_REPLY:function\((.{1,2})\){/,
							replace:
								'CREATE_PENDING_REPLY:function($1){$1.shouldMention=$self.shouldMention($1);',
						},
					},
				],
			});
		});
	var sl,
		Cm = d(() => {
			'use strict';
			s();
			T();
			v();
			sl = f({
				name: 'NoScreensharePreview',
				description: 'Disables screenshare previews from being sent.',
				authors: [c.Nuckyz],
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
	var al,
		Mm = d(() => {
			'use strict';
			s();
			T();
			v();
			al = f({
				name: 'NoTrack',
				description:
					"Disable Discord's tracking ('science'), metrics and Sentry crash reporting",
				authors: [c.Cyn, c.Ven, c.Nuckyz],
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
	var ll,
		Nm = d(() => {
			'use strict';
			s();
			T();
			v();
			ll = f({
				name: 'NoUnblockToJump',
				description:
					'Allows you to jump to messages of blocked users without unblocking them',
				authors: [c.dzshn],
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
	var cl,
		Rm = d(() => {
			'use strict';
			s();
			T();
			v();
			cl = f({
				name: 'NSFWGateBypass',
				description:
					'Allows you to access NSFW channels without setting/verifying your age',
				authors: [c.Commandtechno],
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
	var pl,
		Am = d(() => {
			'use strict';
			s();
			T();
			v();
			pl = f({
				name: 'oneko',
				description: 'cat follow mouse (real)',
				authors: [c.Ven, c.adryd],
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
	function Em(e) {
		let t = e instanceof File,
			n = t ? URL.createObjectURL(e) : e;
		return new Promise((i, r) => {
			let a = new Image();
			(a.onload = () => {
				t && URL.revokeObjectURL(n), i(a);
			}),
				(a.onerror = (l, u, m, y, h) => r(h || l)),
				(a.crossOrigin = 'Anonymous'),
				(a.src = n);
		});
	}
	async function ES(e, t, n) {
		for (let i of e)
			switch (i.name) {
				case 'image':
					let r = LS.getUploads(t.channel.id, Lm)[0];
					if (r) {
						if (!r.isImage) throw 'Upload is not an image';
						return r.item.file;
					}
					break;
				case 'url':
					return i.value;
				case 'user':
					try {
						return (await RS(i.value))
							.getAvatarURL(n ? void 0 : t.guild?.id, 2048)
							.replace(/\?size=\d+$/, '?size=2048');
					} catch (a) {
						throw (
							(console.error(
								`[petpet] Failed to fetch user
`,
								a,
							),
							'Failed to fetch user. Check the console for more info.')
						);
					}
			}
		return null;
	}
	var Lm,
		CS,
		MS,
		_i,
		NS,
		RS,
		AS,
		LS,
		ul,
		Dm = d(() => {
			'use strict';
			s();
			Re();
			T();
			Io();
			B();
			v();
			D();
			(Lm = 0),
				(CS = 20),
				(MS = 128),
				(_i = 10),
				(NS = xt(() =>
					Promise.all(
						Array.from({ length: _i }, (e, t) =>
							Em(
								`https://raw.githubusercontent.com/VenPlugs/petpet/main/frames/pet${t}.gif`,
							),
						),
					),
				)),
				(RS = oe('.USER(')),
				(AS = oe('UPLOAD_FILE_LIMIT_ERROR')),
				(LS = C('getUploads'));
			ul = f({
				name: 'petpet',
				description: 'headpet a cutie',
				authors: [c.Ven],
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
								} = await wi(),
								a = await NS(),
								l = ue(e, 'no-server-pfp', !1);
							try {
								var u = await ES(e, t, l);
								if (!u) throw 'No Image specified!';
							} catch (M) {
								H(t.channel.id, { content: String(M) });
								return;
							}
							let m = await Em(u),
								y = ue(e, 'delay', CS),
								h = ue(e, 'resolution', MS),
								b = new n(),
								x = document.createElement('canvas');
							x.width = x.height = h;
							let S = x.getContext('2d');
							for (let M = 0; M < _i; M++) {
								S.clearRect(0, 0, x.width, x.height);
								let j = M < _i / 2 ? M : _i - M,
									X = 0.8 + j * 0.02,
									_ = 0.8 - j * 0.05,
									Q = (1 - X) * 0.5 + 0.1,
									ae = 1 - _ - 0.08;
								S.drawImage(m, Q * h, ae * h, X * h, _ * h),
									S.drawImage(a[M], 0, 0, h, h);
								let { data: fe } = S.getImageData(0, 0, h, h),
									$e = i(fe, 256),
									yt = r(fe, $e);
								b.writeFrame(yt, h, h, {
									transparent: !0,
									palette: $e,
									delay: y,
								});
							}
							b.finish();
							let A = new File([b.bytesView()], 'petpet.gif', {
								type: 'image/gif',
							});
							setTimeout(() => AS([A], t.channel, Lm), 10);
						},
					},
				],
			});
		});
	var dl,
		_m = d(() => {
			'use strict';
			s();
			T();
			v();
			dl = f({
				name: 'PlainFolderIcon',
				description: "Doesn't show the small guild icons in folders",
				authors: [c.botato],
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
	var gl = {};
	te(gl, {
		__addDecoratorsToList: () => DS,
		addDecorator: () => ml,
		decorators: () => Fi,
		removeDecorator: () => fl,
	});
	function ml(e, t, n) {
		Fi.set(e, { decorator: t, onlyIn: n });
	}
	function fl(e) {
		Fi.delete(e);
	}
	function DS(e) {
		let t = !!e.guildId;
		return [...Fi.values()].map((n) => {
			let { decorator: i, onlyIn: r } = n;
			return !r || (r === 'guilds' && t) || (r === 'dms' && !t)
				? i(e)
				: null;
		});
	}
	var Fi,
		hl = d(() => {
			'use strict';
			s();
			Fi = new Map();
		});
	var Sl = {};
	te(Sl, {
		__addDecorationsToMessage: () => _S,
		addDecoration: () => yl,
		decorations: () => Oi,
		removeDecoration: () => bl,
	});
	function yl(e, t) {
		Oi.set(e, t);
	}
	function bl(e) {
		Oi.delete(e);
	}
	function _S(e) {
		return [...Oi.values()].map((t) => t(e));
	}
	var Oi,
		vl = d(() => {
			'use strict';
			s();
			Oi = new Map();
		});
	function $i(e, t = '0 0 24 24') {
		return ({ color: n, tooltip: i }) =>
			o(Z, { text: i }, (r) =>
				o(
					'svg',
					{ ...r, height: '20', width: '20', viewBox: t, fill: n },
					o('path', { d: e }),
				),
			);
	}
	var FS,
		Fm,
		OS,
		$S,
		BS,
		xl,
		Om,
		Tl,
		wl,
		$m = d(() => {
			'use strict';
			s();
			fi();
			hl();
			vl();
			E();
			J();
			T();
			v();
			D();
			P();
			FS = bt('SessionsStore');
			(Fm = {
				desktop: $i(
					'M4 2.5c-1.103 0-2 .897-2 2v11c0 1.104.897 2 2 2h7v2H7v2h10v-2h-4v-2h7c1.103 0 2-.896 2-2v-11c0-1.103-.897-2-2-2H4Zm16 2v9H4v-9h16Z',
				),
				web: $i(
					'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93Zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39Z',
				),
				mobile: $i(
					'M15.5 1h-8A2.5 2.5 0 0 0 5 3.5v17A2.5 2.5 0 0 0 7.5 23h8a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z',
				),
				console: $i(
					'M14.8 2.7 9 3.1V47h3.3c1.7 0 6.2.3 10 .7l6.7.6V2l-4.2.2c-2.4.1-6.9.3-10 .5zm1.8 6.4c1 1.7-1.3 3.6-2.7 2.2C12.7 10.1 13.5 8 15 8c.5 0 1.2.5 1.6 1.1zM16 33c0 6-.4 10-1 10s-1-4-1-10 .4-10 1-10 1 4 1 10zm15-8v23.3l3.8-.7c2-.3 4.7-.6 6-.6H43V3h-2.2c-1.3 0-4-.3-6-.6L31 1.7V25z',
					'0 0 50 50',
				),
			}),
				(OS = oe('.TWITCH', '.STREAMING', '.INVISIBLE')),
				($S = ({ platform: e, status: t }) => {
					let n = e[0].toUpperCase() + e.slice(1),
						i = Fm[e] ?? Fm.desktop;
					return o(i, { color: `var(--${OS(t)}`, tooltip: n });
				}),
				(BS = (e) => Yt.getState()?.clientStatuses?.[e]),
				(xl = ({ user: e, inline: t = !1, marginLeft: n = '4px' }) => {
					if (!e || e.bot) return null;
					if (e.id === U.getCurrentUser().id) {
						let a = FS.getSessions();
						if (typeof a != 'object') return null;
						let l = Object.values(a).sort(
								({ status: y }, { status: h }) =>
									y === h
										? 0
										: y === 'online'
										? 1
										: h === 'online'
										? -1
										: y === 'idle'
										? 1
										: h === 'idle'
										? -1
										: 0,
							),
							u = Object.values(l).reduce(
								(y, h) => (
									h.clientInfo.client !== 'unknown' &&
										(y[h.clientInfo.client] = h.status),
									y
								),
								{},
							),
							{ clientStatuses: m } = Yt.getState();
						m[U.getCurrentUser().id] = u;
					}
					let i = Yt.getState()?.clientStatuses?.[e.id];
					if (!i) return null;
					let r = Object.entries(i).map(([a, l]) =>
						o($S, { key: a, platform: a, status: l }),
					);
					return r.length
						? o(
								'div',
								{
									className: 'vc-platform-indicator',
									style: {
										marginLeft: n,
										gap: '4px',
										display: t ? 'inline-flex' : 'flex',
										alignItems: 'center',
										transform: t
											? 'translateY(4px)'
											: void 0,
									},
								},
								r,
						  )
						: null;
				}),
				(Om = {
					component: (e) => o(xl, { ...e, marginLeft: '' }),
					position: 0,
					shouldShow: (e) =>
						!!Object.keys(BS(e.user.id) ?? {}).length,
					key: 'indicator',
				}),
				(Tl = {
					list: {
						description: 'In the member list',
						onEnable: () =>
							ml('platform-indicator', (e) =>
								o(N, { noop: !0 }, o(xl, { user: e.user })),
							),
						onDisable: () => fl('platform-indicator'),
					},
					badges: {
						description: 'In user profiles, as badges',
						onEnable: () => Pl(Om),
						onDisable: () => Il(Om),
					},
					messages: {
						description: 'Inside messages',
						onEnable: () =>
							yl('platform-indicator', (e) =>
								o(
									N,
									{ noop: !0 },
									o(xl, {
										user: e.message?.author,
										inline: !0,
									}),
								),
							),
						onDisable: () => bl('platform-indicator'),
					},
				}),
				(wl = f({
					name: 'PlatformIndicators',
					description:
						'Adds platform indicators (Desktop, Mobile, Web...) to users',
					authors: [c.kemo, c.TheSun, c.Nuckyz],
					dependencies: [
						'MessageDecorationsAPI',
						'MemberListDecoratorsAPI',
					],
					start() {
						let e = k.plugins.PlatformIndicators,
							{ displayMode: t } = e;
						t &&
							(t !== 'both'
								? (e[t] = !0)
								: ((e.list = !0), (e.badges = !0)),
							(e.messages = !0),
							delete e.displayMode),
							Object.entries(Tl).forEach(([n, i]) => {
								e[n] && i.onEnable();
							});
					},
					stop() {
						Object.entries(Tl).forEach(([e, t]) => {
							t.onDisable();
						});
					},
					patches: [
						{
							find: '.Masks.STATUS_ONLINE_MOBILE',
							predicate: () =>
								k.plugins.PlatformIndicators
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
								k.plugins.PlatformIndicators
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
								k.plugins.PlatformIndicators
									.colorMobileIndicator,
							replacement: {
								match: /(?<=\i\[\i\.\i\.MOBILE\])===\i\.\i\.ONLINE/,
								replace: '!= null',
							},
						},
					],
					options: {
						...Object.fromEntries(
							Object.entries(Tl).map(([e, t]) => [
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
	var Bm = d(() => {});
	function kl() {
		return o(
			w.Fragment,
			null,
			o(g.FormTitle, { tag: 'h3' }, 'More Information'),
			o(
				g.FormText,
				null,
				'To add your own pronouns, visit',
				' ',
				o(Ne, { href: 'https://pronoundb.org' }, 'pronoundb.org'),
			),
			o(g.FormDivider, null),
			o(
				g.FormText,
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
	var Um = d(() => {
		'use strict';
		s();
		Zt();
		P();
	});
	function Nt(e, t = 300) {
		let n;
		return function (...i) {
			clearTimeout(n),
				(n = setTimeout(() => {
					e(...i);
				}, t));
		};
	}
	var Yn = d(() => {
		'use strict';
		s();
	});
	var Ro,
		Gm = d(() => {
			'use strict';
			s();
			Ro = {
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
	function Ao(e) {
		let [t, , n] = Me(() => GS(e), {
			fallbackValue: null,
			onError: (i) => console.error('Fetching pronouns failed: ', i),
		});
		return !n && t && t !== 'unspecified' && Ro[t] ? jS(t) : null;
	}
	function GS(e) {
		return new Promise((t) => {
			e in Bi
				? t(Bi[e])
				: e in Qn
				? Qn[e].push(t)
				: ((Qn[e] = [t]), US());
		});
	}
	async function HS(e) {
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
							'X-PronounDB-Source': Or,
						},
					},
				)
			)
				.json()
				.then((i) => (Object.assign(Bi, i), i));
		} catch (n) {
			console.error('PronounDB fetching failed: ', n);
			let i = Object.fromEntries(e.map((r) => [r, 'unspecified']));
			return Object.assign(Bi, i), i;
		}
	}
	function jS(e) {
		let { pronounsFormat: t } = k.plugins.PronounDB;
		return t === 'CAPITALIZED'
			? Ro[e]
			: t === 'LOWERCASE' && ['any', 'ask', 'avoid', 'other'].includes(e)
			? Ro[e]
			: Ro[e].toLowerCase();
	}
	var Bi,
		Qn,
		US,
		Cl = d(() => {
			'use strict';
			s();
			E();
			T();
			Yn();
			B();
			Ml();
			Gm();
			(Bi = {}),
				(Qn = {}),
				(US = Nt(async () => {
					let e = Object.keys(Qn),
						t = await HS(e);
					for (let n of e)
						Qn[n].forEach((i) => i(t[n])), delete Qn[n];
				}));
		});
	function Hm(e) {
		return !(
			!k.plugins.PronounDB.showInMessages ||
			e.author.bot ||
			e.author.system ||
			(!k.plugins.PronounDB.showSelf &&
				e.author.id === U.getCurrentUser().id)
		);
	}
	function jm({ message: e }) {
		return Hm(e) ? o(zS, { message: e }) : null;
	}
	function zm({ message: e }) {
		return Hm(e) ? o(WS, { message: e }) : null;
	}
	function zS({ message: e }) {
		let t = Ao(e.author.id);
		return t != null
			? o(
					'span',
					{ className: me(Ui.timestampInline, Ui.timestamp) },
					'\u2022 ',
					t,
			  )
			: null;
	}
	function WS({ message: e }) {
		let t = Ao(e.author.id);
		return t != null
			? o(
					'span',
					{
						className: me(
							Ui.timestampInline,
							Ui.timestamp,
							'vc-pronoundb-compact',
						),
					},
					'\u2022 ',
					t,
			  )
			: null;
	}
	var Ui,
		Wm = d(() => {
			'use strict';
			s();
			E();
			B();
			D();
			P();
			Cl();
			Ui = C('timestampInline');
		});
	function Nl(e, t, n) {
		let i = U.getUser(n.userId) ?? {};
		return !k.plugins.PronounDB.showInProfile ||
			i.bot ||
			i.system ||
			(!k.plugins.PronounDB.showSelf && i.id === U.getCurrentUser().id)
			? null
			: o(qS, { userId: n.userId, Component: e, leProps: t });
	}
	function qS({ userId: e, Component: t, leProps: n }) {
		let i = Ao(e);
		return i != null ? ((n.currentPronouns ||= i), o(t, { ...n })) : null;
	}
	var qm = d(() => {
		'use strict';
		s();
		E();
		P();
		Cl();
	});
	var Rl,
		Ml = d(() => {
			'use strict';
			s();
			Bm();
			T();
			v();
			Um();
			Wm();
			qm();
			Rl = f({
				name: 'PronounDB',
				authors: [c.Tyman, c.TheKodeToad],
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
						find: '.Messages.BOT_PROFILE_SLASH_COMMANDS',
						replacement: {
							match: /\(0,.\.jsx\)\((?<PronounComponent>\i\..),(?<pronounProps>{currentPronouns.+?:(?<fullProps>\i)\.pronouns.+?})\)/,
							replace:
								'$<fullProps>&&$self.PronounsProfileWrapper($<PronounComponent>,$<pronounProps>,$<fullProps>)',
						},
					},
					{
						find: '.Messages.USER_POPOUT_PRONOUNS',
						replacement: {
							match: /\.showPronouns/,
							replace: '.showPronouns||true',
						},
					},
				],
				options: {
					pronounsFormat: {
						type: 4,
						description:
							'The format for pronouns to appear in chat',
						options: [
							{
								label: 'Lowercase',
								value: 'LOWERCASE',
								default: !0,
							},
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
				},
				settingsAboutComponent: kl,
				PronounsChatComponentWrapper: jm,
				CompactPronounsChatComponentWrapper: zm,
				PronounsProfileWrapper: Nl,
			});
		});
	var KS,
		Al,
		Km = d(() => {
			'use strict';
			s();
			Wn();
			T();
			v();
			D();
			P();
			(KS = Se((e) => e.emitter?._events?.INSERT_TEXT)),
				(Al = f({
					name: 'QuickMention',
					authors: [c.kemo],
					description:
						'Adds a quick mention button to the message actions bar',
					dependencies: ['MessagePopoverAPI'],
					start() {
						Bt('QuickMention', (e) => ({
							label: 'Quick Mention',
							icon: this.Icon,
							message: e,
							channel: G.getChannel(e.channel_id),
							onClick: () =>
								KS.dispatchToLastSubscribed('INSERT_TEXT', {
									rawText: `<@${e.author.id}> `,
								}),
						}));
					},
					stop() {
						Ut('QuickMention');
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
				}));
		});
	function ef(e, t) {
		let n = e.findIndex((i) => i.id === t);
		return n === -1 ? n : e.length - n - 1;
	}
	function Xm({ channelId: e, messageId: t, _isQuickEdit: n }) {
		if (n) return;
		let i = U.getCurrentUser().id,
			r = st.getMessages(e)._array.filter((a) => a.author.id === i);
		Hi = ef(r, t);
	}
	function Jm({ message: e, _isQuickReply: t }) {
		t || (Gi = ef(st.getMessages(e.channel_id)._array, e.id));
	}
	function Zm(e) {
		let t = e.key === 'ArrowUp';
		(!t && e.key !== 'ArrowDown') ||
			!QS(e) ||
			XS(e) ||
			(e.shiftKey ? ZS(t) : JS(t));
	}
	function tf(e, t) {
		let n = document.getElementById('message-content-' + t);
		if (!n) return;
		let i = Math.max(
				document.documentElement.clientHeight,
				window.innerHeight,
			),
			r = n.getBoundingClientRect();
		(r.bottom < 200 || r.top - i >= -200) &&
			YS.jumpToMessage({
				channelId: e,
				messageId: t,
				flash: !1,
				jumpType: 'INSTANT',
			});
	}
	function nf(e, t) {
		let n = st.getMessages(re.getChannelId())._array;
		if (!t) {
			let a = U.getCurrentUser().id;
			n = n.filter((l) => l.author.id === a);
		}
		let i = (a) =>
				e ? Math.min(n.length - 1, a + 1) : Math.max(-1, a - 1),
			r;
		return (
			t ? (Gi = r = i(Gi)) : (Hi = r = i(Hi)),
			r === -1 ? void 0 : n[n.length - r - 1]
		);
	}
	function JS(e) {
		let t = nf(e, !0);
		if (!t)
			return void I.dispatch({
				type: 'DELETE_PENDING_REPLY',
				channelId: re.getChannelId(),
			});
		let n = G.getChannel(t.channel_id),
			i = U.getCurrentUser().id;
		I.dispatch({
			type: 'CREATE_PENDING_REPLY',
			channel: n,
			message: t,
			shouldMention: !0,
			showMentionToggle: n.guild_id !== null && t.author.id !== i,
			_isQuickReply: !0,
		}),
			tf(n.id, t.id);
	}
	function ZS(e) {
		let t = nf(e, !1);
		t
			? (I.dispatch({
					type: 'MESSAGE_START_EDIT',
					channelId: t.channel_id,
					messageId: t.id,
					content: t.content,
					_isQuickEdit: !0,
			  }),
			  tf(t.channel_id, t.id))
			: I.dispatch({
					type: 'MESSAGE_END_EDIT',
					channelId: re.getChannelId(),
			  });
	}
	var YS,
		Vm,
		Gi,
		Hi,
		Ll,
		Ym,
		Qm,
		QS,
		XS,
		of = d(() => {
			'use strict';
			s();
			E();
			T();
			v();
			D();
			P();
			(YS = C('jumpToMessage')),
				(Vm = navigator.platform.includes('Mac')),
				(Gi = -1),
				(Hi = -1);
			ce('QuickReply', 'InteractionKeybinds');
			(Ll = f({
				name: 'QuickReply',
				authors: [c.obscurity, c.Ven],
				description:
					'Reply to (ctrl + up/down) and edit (ctrl + shift + up/down) messages via keybinds',
				start() {
					I.subscribe('DELETE_PENDING_REPLY', Ym),
						I.subscribe('MESSAGE_END_EDIT', Qm),
						I.subscribe('MESSAGE_START_EDIT', Xm),
						I.subscribe('CREATE_PENDING_REPLY', Jm),
						document.addEventListener('keydown', Zm);
				},
				stop() {
					I.unsubscribe('DELETE_PENDING_REPLY', Ym),
						I.unsubscribe('MESSAGE_END_EDIT', Qm),
						I.unsubscribe('MESSAGE_START_EDIT', Xm),
						I.unsubscribe('CREATE_PENDING_REPLY', Jm),
						document.removeEventListener('keydown', Zm);
				},
			})),
				(Ym = () => (Gi = -1)),
				(Qm = () => (Hi = -1));
			(QS = (e) => (Vm ? e.metaKey : e.ctrlKey)),
				(XS = (e) => e.altKey || (!Vm && e.metaKey));
		});
	var Dl = {};
	te(Dl, {
		ServerListRenderPosition: () => ji,
		addServerListElement: () => Lo,
		removeServerListElement: () => Eo,
		renderAll: () => nv,
	});
	function El(e) {
		return e === 0 ? ev : tv;
	}
	function Lo(e, t) {
		El(e).add(t);
	}
	function Eo(e, t) {
		El(e).delete(t);
	}
	var VS,
		ji,
		ev,
		tv,
		nv,
		zi = d(() => {
			'use strict';
			s();
			ge();
			(VS = new F('ServerListAPI')),
				(ji = ((n) => (
					(n[(n.Above = 0)] = 'Above'), (n[(n.In = 1)] = 'In'), n
				))(ji || {})),
				(ev = new Set()),
				(tv = new Set());
			nv = (e) => {
				let t = [];
				for (let n of El(e))
					try {
						t.unshift(n());
					} catch (i) {
						VS.error('Failed to render server list element:', i);
					}
				return t;
			};
		});
	function ov() {
		let e = [];
		Object.values(de.getGuilds()).forEach((t) => {
			ai.getChannels(t.id).SELECTABLE.forEach((n) => {
				!ro.hasUnread(n.channel.id) ||
					e.push({
						channelId: n.channel.id,
						messageId: ro.lastMessageId(n.channel.id),
						readStateType: 0,
					});
			});
		}),
			I.dispatch({ type: 'BULK_ACK', context: 'APP', channels: e });
	}
	var iv,
		_l,
		rf = d(() => {
			'use strict';
			s();
			zi();
			T();
			v();
			P();
			(iv = () =>
				o(
					L,
					{
						onClick: ov,
						size: L.Sizes.MIN,
						color: L.Colors.BRAND,
						style: {
							marginTop: '2px',
							marginBottom: '8px',
							marginLeft: '9px',
						},
					},
					'Read all',
				)),
				(_l = f({
					name: 'ReadAllNotificationsButton',
					description:
						'Read all server notifications with a single button click!',
					authors: [c.kemo],
					dependencies: ['ServerListAPI'],
					renderReadAllButton: () => o(iv, null),
					start() {
						Lo(1, this.renderReadAllButton);
					},
					stop() {
						Eo(1, this.renderReadAllButton);
					},
				}));
		});
	var Oe,
		Wi = d(() => {
			'use strict';
			s();
			E();
			v();
			Oe = V({
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
	var Fl = d(() => {
		'use strict';
		s();
	});
	async function sf() {
		let [e, t, n] = await Ht.getMany([
			'relationship-notifier-guilds',
			'relationship-notifier-groups',
			'relationship-notifier-friends',
		]);
		if ((await Promise.all([Ki(), Yi(), Fo()]), Oe.store.offlineRemovals)) {
			if (Oe.store.groups && t?.size)
				for (let [i, r] of t)
					_o.has(i) ||
						Gt(
							`You are no longer in the group ${r.name}.`,
							r.iconURL,
						);
			if (Oe.store.servers && e?.size)
				for (let [i, r] of e)
					Do.has(i) ||
						Gt(
							`You are no longer in the server ${r.name}.`,
							r.iconURL,
						);
			if (Oe.store.friends && n?.friends.length)
				for (let i of n.friends) {
					if (Pn.friends.includes(i)) continue;
					let r = await Qt.fetchUser(i).catch(() => {});
					r &&
						Gt(
							`You are no longer friends with ${r.tag}.`,
							r.getAvatarURL(void 0, void 0, !1),
						);
				}
			if (Oe.store.friendRequestCancels && n?.requests?.length)
				for (let i of n.requests) {
					if (Pn.requests.includes(i)) continue;
					let r = await Qt.fetchUser(i).catch(() => {});
					r &&
						Gt(
							`Friend request from ${r.tag} has been revoked.`,
							r.getAvatarURL(void 0, void 0, !1),
						);
				}
		}
	}
	function Gt(e, t) {
		Oe.store.notices && qi.showNotice(e, 'OK', () => qi.popNotice()),
			Hn({ title: 'Relationship Notifier', body: e, icon: t });
	}
	function af(e) {
		return Do.get(e);
	}
	function Ol(e) {
		Do.delete(e), Ki();
	}
	async function Ki() {
		for (let [e, { name: t, icon: n }] of Object.entries(de.getGuilds()))
			Do.set(e, {
				id: e,
				name: t,
				iconURL: n && `https://cdn.discordapp.com/icons/${e}/${n}.png`,
			});
		await Ht.set('relationship-notifier-guilds', Do);
	}
	function lf(e) {
		return _o.get(e);
	}
	function $l(e) {
		_o.delete(e), Yi();
	}
	async function Yi() {
		for (let {
			type: e,
			id: t,
			name: n,
			rawRecipients: i,
			icon: r,
		} of G.getSortedPrivateChannels())
			e === 3 &&
				_o.set(t, {
					id: t,
					name: n || i.map((a) => a.username).join(', '),
					iconURL:
						r &&
						`https://cdn.discordapp.com/channel-icons/${t}/${r}.png`,
				});
		await Ht.set('relationship-notifier-groups', _o);
	}
	async function Fo() {
		(Pn.friends = []), (Pn.requests = []);
		let e = Xe.getRelationships();
		for (let t in e)
			switch (e[t]) {
				case 1:
					Pn.friends.push(t);
					break;
				case 3:
					Pn.requests.push(t);
					break;
			}
		await Ht.set('relationship-notifier-friends', Pn);
	}
	var Do,
		_o,
		Pn,
		Qi = d(() => {
			'use strict';
			s();
			Xi();
			vo();
			P();
			Wi();
			Fl();
			(Do = new Map()),
				(_o = new Map()),
				(Pn = { friends: [], requests: [] });
		});
	async function df({ relationship: { type: e, id: t } }) {
		if (Bl === t) {
			Bl = void 0;
			return;
		}
		let n = await Qt.fetchUser(t).catch(() => null);
		if (!!n)
			switch (e) {
				case 1:
					Oe.store.friends &&
						Gt(
							`${n.tag} removed you as a friend.`,
							n.getAvatarURL(void 0, void 0, !1),
						);
					break;
				case 3:
					Oe.store.friendRequestCancels &&
						Gt(
							`A friend request from ${n.tag} has been removed.`,
							n.getAvatarURL(void 0, void 0, !1),
						);
					break;
			}
	}
	function mf({ guild: { id: e, unavailable: t } }) {
		if (!Oe.store.servers || t) return;
		if (Ul === e) {
			Ol(e), (Ul = void 0);
			return;
		}
		let n = af(e);
		n &&
			(Ol(e),
			Gt(`You were removed from the server ${n.name}.`, n.iconURL));
	}
	function ff({ channel: { id: e, type: t } }) {
		if (!Oe.store.groups || t !== 3) return;
		if (Gl === e) {
			$l(e), (Gl = void 0);
			return;
		}
		let n = lf(e);
		n &&
			($l(e),
			Gt(`You were removed from the group ${n.name}.`, n.iconURL));
	}
	var Bl,
		Ul,
		Gl,
		cf,
		pf,
		uf,
		Hl = d(() => {
			'use strict';
			s();
			P();
			Wi();
			Fl();
			Qi();
			(cf = (e) => (Bl = e)),
				(pf = (e) => (Ul = e)),
				(uf = (e) => (Gl = e));
		});
	function jl(e) {
		for (let t in gf) for (let n of gf[t]) e(t, n);
	}
	var gf,
		hf = d(() => {
			'use strict';
			s();
			Hl();
			Qi();
			gf = {
				GUILD_CREATE: [Ki],
				GUILD_DELETE: [mf],
				CHANNEL_CREATE: [Yi],
				CHANNEL_DELETE: [ff],
				RELATIONSHIP_ADD: [Fo],
				RELATIONSHIP_UPDATE: [Fo],
				RELATIONSHIP_REMOVE: [Fo, df],
			};
		});
	var zl,
		yf = d(() => {
			'use strict';
			s();
			T();
			v();
			P();
			hf();
			Hl();
			Wi();
			Qi();
			zl = f({
				name: 'RelationshipNotifier',
				description:
					'Notifies you when a friend, group chat, or server removes you.',
				authors: [c.nick],
				settings: Oe,
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
				async start() {
					setTimeout(() => {
						sf();
					}, 5e3),
						jl((e, t) => I.subscribe(e, t));
				},
				stop() {
					jl((e, t) => I.unsubscribe(e, t));
				},
				removeFriend: cf,
				removeGroup: uf,
				removeGuild: pf,
			});
		});
	var av,
		lv,
		Wl,
		bf = d(() => {
			'use strict';
			s();
			T();
			v();
			D();
			(av = C('spoilerText')),
				(lv = C('messagesWrapper', 'messages')),
				(Wl = f({
					name: 'RevealAllSpoilers',
					description:
						'Reveal all spoilers in a message by Ctrl-clicking a spoiler, or in the chat with Ctrl+Shift-click',
					authors: [c.whqwert],
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
						let { spoilerText: r, hidden: a } = av,
							{ messagesWrapper: l } = lv,
							u = n
								? document.querySelector(`div.${l}`)
								: i.parentElement;
						for (let m of u.querySelectorAll(`span.${r}.${a}`))
							m.click();
					},
				}));
		});
	function Sf(e, t) {
		open(t + encodeURIComponent(e), '_blank');
	}
	var ql,
		vf,
		Kl,
		Tf = d(() => {
			'use strict';
			s();
			zn();
			T();
			v();
			P();
			ql = {
				Google: 'https://lens.google.com/uploadbyurl?url=',
				Yandex: 'https://yandex.com/images/search?rpt=imageview&url=',
				SauceNAO: 'https://saucenao.com/search.php?url=',
				IQDB: 'https://iqdb.org/?url=',
				TinEye: 'https://www.tineye.com/search?url=',
				ImgOps: 'https://imgops.com/start?url=',
			};
			(vf = (e, t) => {
				if (!t) return;
				let { reverseImageSearchType: n, itemHref: i, itemSrc: r } = t;
				if (!n || n !== 'img') return;
				let a = i ?? r,
					l = $t('copy-link', e);
				l &&
					!l.some((u) => u?.props?.id === 'search-image') &&
					l.push(
						o(
							le.MenuItem,
							{
								label: 'Search Image',
								key: 'search-image',
								id: 'search-image',
							},
							Object.keys(ql).map((u) => {
								let m = 'search-image-' + u;
								return o(le.MenuItem, {
									key: m,
									id: m,
									label: u,
									action: () => Sf(a, ql[u]),
								});
							}),
							o(le.MenuItem, {
								key: 'search-image-all',
								id: 'search-image-all',
								label: 'All',
								action: () =>
									Object.values(ql).forEach((u) => Sf(a, u)),
							}),
						),
					);
			}),
				(Kl = f({
					name: 'ReverseImageSearch',
					description: 'Adds ImageSearch to image context menus',
					authors: [c.Ven, c.Nuckyz],
					dependencies: ['MenuItemDeobfuscatorAPI', 'ContextMenuAPI'],
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
						kt('message', vf);
					},
					stop() {
						Ct('message', vf);
					},
				}));
		});
	var Oo,
		Yl,
		xf = d(() => {
			'use strict';
			s();
			E();
			T();
			v();
			P();
			(Oo = V({
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
				(Yl = f({
					name: 'RoleColorEverywhere',
					authors: [c.KingFish, c.lewisakura],
					description: 'Adds the top role color anywhere possible',
					patches: [
						{
							find: 'className:"mention"',
							replacement: [
								{
									match: /user:(\i),channel:(\i).{0,300}?"@"\.concat\(.+?\)/,
									replace:
										'$&,color:$self.getUserColor($1.id,{channelId:$2?.id})',
								},
							],
							predicate: () => Oo.store.chatMentions,
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
							predicate: () => Oo.store.chatMentions,
						},
						{
							find: '.memberGroupsPlaceholder',
							replacement: [
								{
									match: /(memo\(\(function\((\i)\).{300,500}CHANNEL_MEMBERS_A11Y_LABEL.{100,200}roleIcon.{5,20}null,).," \u2014 ",.\]/,
									replace: '$1$self.roleGroupColor($2)]',
								},
							],
							predicate: () => Oo.store.memberList,
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
							predicate: () => Oo.store.voiceUsers,
						},
					],
					settings: Oo,
					getColor(e, { channelId: t, guildId: n }) {
						return (n ??= G.getChannel(t)?.guild_id)
							? Qe.getMember(n, e)?.colorString ?? null
							: null;
					},
					getUserColor(e, t) {
						let n = this.getColor(e, t);
						return n && parseInt(n.slice(1), 16);
					},
					roleGroupColor({ id: e, count: t, title: n, guildId: i }) {
						let a = de.getGuild(i)?.roles[e];
						return o(
							'span',
							{
								style: {
									color: a?.colorString,
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
	var wf,
		Pf,
		If,
		Ql,
		kf = d(() => {
			'use strict';
			s();
			zn();
			T();
			B();
			v();
			D();
			P();
			(wf = Y(() =>
				we(
					'M10 8.26667V4L3 11.4667L10 18.9333V14.56C15 14.56 18.5 16.2667 21 20C20 14.6667 17 9.33333 10 8.26667Z',
				),
			)),
				(Pf = oe('showMentionToggle', 'TEXTAREA_FOCUS', 'shiftKey')),
				(If = (e, { message: t }) => {
					if (re.getChannelId() !== t.channel_id) return;
					let n = G.getChannel(t?.channel_id);
					if (!n) return;
					let i = $t('pin', e);
					if (i && !i.some((a) => a?.props?.id === 'reply')) {
						let a = i.findIndex((l) => l.props.id === 'pin');
						return i.splice(
							a + 1,
							0,
							o(le.MenuItem, {
								id: 'reply',
								label: An.Messages.MESSAGE_ACTION_REPLY,
								icon: wf,
								action: (l) => Pf(n, t, l),
							}),
						);
					}
					let r = $t('mark-unread', e);
					if (r && !r.some((a) => a?.props?.id === 'reply'))
						return r.unshift(
							o(le.MenuItem, {
								id: 'reply',
								label: An.Messages.MESSAGE_ACTION_REPLY,
								icon: wf,
								action: (a) => Pf(n, t, a),
							}),
						);
				}),
				(Ql = f({
					name: 'SearchReply',
					description: 'Adds a reply button to search results',
					authors: [c.Aria],
					start() {
						kt('message', If);
					},
					stop() {
						Ct('message', If);
					},
				}));
		});
	function cv() {
		return (
			(Mf = wt()),
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
				Xl,
				' online',
			)
		);
	}
	function pv() {
		return (
			(Nf = wt()),
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
				Cf,
				' servers',
			)
		);
	}
	var Xl,
		Cf,
		Mf,
		Nf,
		Jl,
		Rf = d(() => {
			'use strict';
			s();
			zi();
			E();
			J();
			T();
			B();
			v();
			P();
			(Xl = 0), (Cf = 0);
			Jl = f({
				name: 'ServerListIndicators',
				description:
					'Add online friend count or server count in the server list',
				authors: [c.dzshn],
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
					let { mode: e } = k.plugins.ServerListIndicators;
					return o(
						N,
						{ noop: !0 },
						o(
							'div',
							{ style: { marginBottom: '4px' } },
							!!(e & 2) && o(cv, null),
							!!(e & 1) && o(pv, null),
						),
					);
				},
				handlePresenceUpdate() {
					Xl = 0;
					let e = Xe.getRelationships();
					for (let t of Object.keys(e))
						e[t] === 1 &&
							Yt.getStatus(t) !== 'offline' &&
							(Xl += 1);
					Mf?.();
				},
				handleGuildUpdate() {
					(Cf = de.getGuildCount()), Nf?.();
				},
				start() {
					this.handlePresenceUpdate(),
						this.handleGuildUpdate(),
						Lo(0, this.renderIndicator),
						I.subscribe(
							'PRESENCE_UPDATES',
							this.handlePresenceUpdate,
						),
						I.subscribe('GUILD_CREATE', this.handleGuildUpdate),
						I.subscribe('GUILD_DELETE', this.handleGuildUpdate);
				},
				stop() {
					Eo(0, this.renderIndicator),
						I.unsubscribe(
							'PRESENCE_UPDATES',
							this.handlePresenceUpdate,
						),
						I.unsubscribe('GUILD_CREATE', this.handleGuildUpdate),
						I.unsubscribe('GUILD_DELETE', this.handleGuildUpdate);
				},
			});
		});
	function Ji(e) {
		if (typeof e == 'string') return e;
		let t = e.source.replaceAll('\\i', '[A-Za-z_$][\\w$]*');
		return new RegExp(t, e.flags);
	}
	function Lf(e, t) {
		let n = `Vencord.Plugins.plugins[${JSON.stringify(t)}]`;
		return typeof e != 'function'
			? e.replaceAll('$self', n)
			: (...i) => e(...i).replaceAll('$self', n);
	}
	function Af(e, t) {
		if (e.get) {
			let n = e.get;
			e.get = function () {
				return t(n.call(this));
			};
		} else e.value && (e.value = t(e.value));
		return e;
	}
	function Ef(e, t) {
		let n = Object.getOwnPropertyDescriptors(e);
		(n.match = Af(n.match, Ji)),
			(n.replace = Af(n.replace, (i) => Lf(i, t))),
			Object.defineProperties(e, n);
	}
	var Zi = d(() => {
		'use strict';
		s();
	});
	var A5,
		Df,
		Zl = d(() => {
			'use strict';
			s();
			Yn();
			Be();
			B();
			Zi();
			D();
			P();
			oa();
			J();
			(A5 = Nt(function ({ find: e, setModule: t, setError: n }) {
				let i = io(e),
					r = Object.keys(i),
					a = r.length;
				a === 0
					? n('No match. Perhaps that module is lazy loaded?')
					: a !== 1
					? n('Multiple matches. Please refine your filter')
					: t([r[0], i[r[0]]]);
			})),
				(Df = null);
		});
	var _f = d(() => {});
	function Vi() {
		xo(
			'Uh Oh! Failed to render this Page. However, there is an update available that might fix it. Would you like to update and restart now?',
		);
	}
	var er = d(() => {
		'use strict';
		s();
		xn();
	});
	async function uv(e) {
		try {
			var t = JSON.parse(e);
		} catch (n) {
			throw (
				(console.log(e),
				new Error('Failed to parse JSON: ' + String(n)))
			);
		}
		if ('settings' in t && 'quickCss' in t)
			await VencordNative.ipc.invoke(
				$.SET_SETTINGS,
				JSON.stringify(t.settings, null, 4),
			),
				await VencordNative.ipc.invoke($.SET_QUICK_CSS, t.quickCss);
		else
			throw new Error(
				'Invalid Settings. Is this even a Vencord Settings file?',
			);
	}
	async function dv() {
		let e = JSON.parse(VencordNative.ipc.sendSync($.GET_SETTINGS)),
			t = await VencordNative.ipc.invoke($.GET_QUICK_CSS);
		return JSON.stringify({ settings: e, quickCss: t }, null, 4);
	}
	async function Ff() {
		let e = 'vencord-settings-backup.json',
			t = await dv(),
			n = new TextEncoder().encode(t);
		{
			let i = new File([n], e, { type: 'application/json' }),
				r = document.createElement('a');
			(r.href = URL.createObjectURL(i)),
				(r.download = e),
				document.body.appendChild(r),
				r.click(),
				setImmediate(() => {
					URL.revokeObjectURL(r.href), document.body.removeChild(r);
				});
		}
	}
	async function Of(e = !0) {
		if (!0) {
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
							await uv(i.result), e && mv();
						} catch (r) {
							new F('SettingsSync').error(r), e && fv(r);
						}
					}),
						i.readAsText(n);
				}),
				document.body.appendChild(t),
				t.click(),
				setImmediate(() => document.body.removeChild(t));
		} else if (t)
			try {
			} catch (n) {}
	}
	var mv,
		fv,
		$f = d(() => {
			'use strict';
			s();
			P();
			Ke();
			ge();
			(mv = () =>
				K.show({
					type: K.Type.SUCCESS,
					message:
						'Settings successfully imported. Restart to apply changes!',
					id: K.genId(),
				})),
				(fv = (e) =>
					K.show({
						type: K.Type.FAILURE,
						message: `Failed to import settings: ${String(e)}`,
						id: K.genId(),
					}));
		});
	function gv() {
		return o(
			g.FormSection,
			{ title: 'Settings Sync', className: O.top16 },
			o(
				Ye,
				{ className: me('vc-settings-card', 'vc-backup-restore-card') },
				o(
					pe,
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
				z,
				{ variant: 'text-md/normal', className: O.bottom8 },
				'You can import and export your Vencord settings as a JSON file. This allows you to easily transfer your settings to another device, or recover your settings after reinstalling Vencord or Discord.',
			),
			o(
				z,
				{ variant: 'text-md/normal', className: O.bottom8 },
				'Settings Export contains:',
				o(
					'ul',
					null,
					o('li', null, '\u2014 Custom QuickCSS'),
					o('li', null, '\u2014 Plugin Settings'),
				),
			),
			o(
				pe,
				null,
				o(
					L,
					{ onClick: () => Of(), size: L.Sizes.SMALL },
					'Import Settings',
				),
				o(L, { onClick: Ff, size: L.Sizes.SMALL }, 'Export Settings'),
			),
		);
	}
	var Bf,
		Uf = d(() => {
			'use strict';
			s();
			J();
			ct();
			Be();
			B();
			$f();
			P();
			Bf = N.wrap(gv);
		});
	var Gf = d(() => {});
	function Hf(e) {
		let t = new bv({ username: e.name, id: Ms(), bot: !0 });
		return I.dispatch({ type: 'USER_UPDATE', user: t }), t;
	}
	function Vl({
		plugin: e,
		onRestartNeeded: t,
		onClose: n,
		transitionState: i,
	}) {
		let [r, a] = w.useState([]),
			l = Ge().plugins[e.name],
			[u, m] = w.useState({}),
			[y, h] = w.useState({}),
			[b, x] = w.useState(null),
			S = () => Object.values(y).every((_) => !_),
			A = Boolean(l && e.options);
		w.useEffect(() => {
			(async () => {
				for (let _ of e.authors.slice(0, 6)) {
					let Q = _.id
						? await Qt.fetchUser(`${_.id}`).catch(() => Hf(_))
						: Hf(_);
					a((ae) => [...ae, Q]);
				}
			})();
		}, []);
		async function M() {
			if (!e.options) {
				n();
				return;
			}
			if (e.beforeSave) {
				let Q = await Promise.resolve(e.beforeSave(u));
				if (Q !== !0) {
					x(Q);
					return;
				}
			}
			let _ = !1;
			for (let [Q, ae] of Object.entries(u)) {
				let fe = e.options[Q];
				(l[Q] = ae), fe?.onChange?.(ae), fe?.restartNeeded && (_ = !0);
			}
			_ && t(), n();
		}
		function j() {
			if (!A || !e.options)
				return o(
					g.FormText,
					null,
					'There are no settings for this plugin.',
				);
			{
				let _ = Object.entries(e.options).map(([Q, ae]) => {
					function fe(Rt) {
						m((an) => ({ ...an, [Q]: Rt }));
					}
					function $e(Rt) {
						h((an) => ({ ...an, [Q]: Rt }));
					}
					let yt = Sv[ae.type];
					return o(yt, {
						id: Q,
						key: Q,
						option: ae,
						onChange: fe,
						onError: $e,
						pluginSettings: l,
						definedSettings: e.settings,
					});
				});
				return o(
					pe,
					{ flexDirection: 'column', style: { gap: 12 } },
					_,
				);
			}
		}
		function X(_, Q) {
			let ae = e.authors.length - Q,
				fe = e.authors.length - ae,
				$e = fe + e.authors.length - Q;
			return o(
				Z,
				{
					text: e.authors
						.slice(fe, $e)
						.map((yt) => yt.name)
						.join(', '),
				},
				({ onMouseEnter: yt, onMouseLeave: Rt }) =>
					o(
						'div',
						{
							className: yv.moreUsers,
							onMouseEnter: yt,
							onMouseLeave: Rt,
						},
						'+',
						ae,
					),
			);
		}
		return o(
			Ee,
			{ transitionState: i, size: 'medium' },
			o(
				He,
				{ separator: !1 },
				o(
					z,
					{ variant: 'heading-lg/semibold', style: { flexGrow: 1 } },
					e.name,
				),
				o(hn, { onClick: n }),
			),
			o(
				je,
				{ style: { marginBottom: 8, marginTop: 8 } },
				o(
					g.FormSection,
					null,
					o(g.FormTitle, { tag: 'h3' }, 'About ', e.name),
					o(g.FormText, null, e.description),
					o(
						g.FormTitle,
						{ tag: 'h3', style: { marginTop: 8, marginBottom: 0 } },
						'Authors',
					),
					o(
						'div',
						{ style: { width: 'fit-content', marginBottom: 8 } },
						o(hv, {
							users: r,
							count: e.authors.length,
							guildId: void 0,
							renderIcon: !1,
							max: 6,
							showDefaultAvatarsForNullUsers: !0,
							showUserPopout: !0,
							renderMoreUsers: X,
						}),
					),
				),
				!!e.settingsAboutComponent &&
					o(
						'div',
						{ style: { marginBottom: 8 } },
						o(
							g.FormSection,
							null,
							o(
								N,
								{
									message:
										"An error occurred while rendering this plugin's custom InfoComponent",
								},
								o(e.settingsAboutComponent, {
									tempSettings: u,
								}),
							),
						),
					),
				o(
					g.FormSection,
					null,
					o(g.FormTitle, { tag: 'h3' }, 'Settings'),
					j(),
				),
			),
			A &&
				o(
					ut,
					null,
					o(
						pe,
						{ flexDirection: 'column', style: { width: '100%' } },
						o(
							pe,
							{ style: { marginLeft: 'auto' } },
							o(
								L,
								{
									onClick: n,
									size: L.Sizes.SMALL,
									color: L.Colors.WHITE,
									look: L.Looks.LINK,
								},
								'Cancel',
							),
							o(
								Z,
								{
									text: 'You must fix all errors before saving',
									shouldShow: !S(),
								},
								({ onMouseEnter: _, onMouseLeave: Q }) =>
									o(
										L,
										{
											size: L.Sizes.SMALL,
											color: L.Colors.BRAND,
											onClick: M,
											onMouseEnter: _,
											onMouseLeave: Q,
											disabled: !S(),
										},
										'Save & Close',
									),
							),
						),
						b &&
							o(
								z,
								{
									variant: 'text-md/semibold',
									style: { color: 'var(--text-danger)' },
								},
								'Error while saving: ',
								b,
							),
					),
				),
		);
	}
	var hv,
		yv,
		bv,
		Sv,
		jf = d(() => {
			'use strict';
			s();
			Re();
			E();
			J();
			ct();
			B();
			Ze();
			ln();
			v();
			D();
			P();
			Mi();
			(hv = Y(() =>
				we('defaultRenderUser', 'showDefaultAvatarsForNullUsers'),
			)),
				(yv = C(
					'moreUsers',
					'emptyUser',
					'avatarContainer',
					'clickableAvatar',
				)),
				(bv = Ue(() => U.getCurrentUser().constructor));
			Sv = {
				[0]: Nd,
				[1]: ma,
				[2]: ma,
				[3]: Td,
				[4]: kd,
				[5]: Md,
				[6]: wd,
			};
		});
	var zf = d(() => {});
	function Wf({ checked: e, onChange: t, disabled: n }) {
		return o(
			'div',
			null,
			o(
				'div',
				{
					className: me(
						tr.container,
						'default-colors',
						e ? tr.checked : void 0,
					),
					style: {
						backgroundColor: e ? ec : tc,
						opacity: n ? 0.3 : 1,
					},
				},
				o(
					'svg',
					{
						className: tr.slider + ' vc-switch-slider',
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
									p,
									null,
									o('path', {
										fill: ec,
										d: 'M7.89561 14.8538L6.30462 13.2629L14.3099 5.25755L15.9009 6.84854L7.89561 14.8538Z',
									}),
									o('path', {
										fill: ec,
										d: 'M4.08643 11.0903L5.67742 9.49929L9.4485 13.2704L7.85751 14.8614L4.08643 11.0903Z',
									}),
							  )
							: o(
									p,
									null,
									o('path', {
										fill: tc,
										d: 'M5.13231 6.72963L6.7233 5.13864L14.855 13.2704L13.264 14.8614L5.13231 6.72963Z',
									}),
									o('path', {
										fill: tc,
										d: 'M13.2704 5.13864L14.8614 6.72963L6.72963 14.8614L5.13864 13.2704L13.2704 5.13864Z',
									}),
							  ),
					),
				),
				o('input', {
					disabled: n,
					type: 'checkbox',
					className: tr.input,
					tabIndex: 0,
					checked: e,
					onChange: (i) => t(i.currentTarget.checked),
				}),
			),
		);
	}
	var ec,
		tc,
		tr,
		qf = d(() => {
			'use strict';
			s();
			zf();
			B();
			D();
			(ec = 'var(--green-360)'),
				(tc = 'var(--primary-400)'),
				(tr = C('slider', 'input', 'container'));
		});
	var $o,
		nc = d(() => {
			'use strict';
			s();
			$o = class {
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
	var ac = {};
	te(ac, {
		PMLogger: () => vv,
		isPluginEnabled: () => ic,
		patches: () => Kf,
		plugins: () => Tv,
		startAllPlugins: () => rc,
		startDependenciesRecursive: () => nr,
		startPlugin: () => Bo,
		stopPlugin: () => sc,
	});
	function ic(e) {
		return (se[e]?.required || se[e]?.isDependency || oc[e]?.enabled) ?? !1;
	}
	function nr(e) {
		let t = !1,
			n = [];
		return (
			e.dependencies?.forEach((i) => {
				if (!k.plugins[i].enabled) {
					if ((nr(se[i]), se[i].patches)) {
						qe.warn(`Enabling dependency ${i} requires restart.`),
							(k.plugins[i].enabled = !0),
							(t = !0);
						return;
					}
					Bo(se[i]) || n.push(i);
				}
			}),
			{ restartNeeded: t, failures: n }
		);
	}
	var qe,
		vv,
		Tv,
		Kf,
		oc,
		Yf,
		rc,
		Bo,
		sc,
		or = d(() => {
			'use strict';
			s();
			Re();
			E();
			ge();
			Fn();
			ti();
			(qe = new F('PluginManager', '#a6d189')),
				(vv = qe),
				(Tv = se),
				(Kf = []),
				(oc = k.plugins);
			Yf = Object.values(se);
			for (let e of Yf)
				oc[e.name]?.enabled &&
					e.dependencies?.forEach((t) => {
						let n = se[t];
						if (n) (oc[t].enabled = !0), (n.isDependency = !0);
						else {
							let i = new Error(
								`Plugin ${e.name} has unresolved dependency ${t}`,
							);
							qe.warn(i);
						}
					});
			for (let e of Yf) {
				if (e.settings) {
					(e.settings.pluginName = e.name), (e.options ??= {});
					for (let [t, n] of Object.entries(e.settings.def)) {
						let i = e.settings.checks?.[t];
						e.options[t] = { ...n, ...i };
					}
				}
				if (e.patches && ic(e.name))
					for (let t of e.patches)
						(t.plugin = e.name),
							Array.isArray(t.replacement) ||
								(t.replacement = [t.replacement]),
							Kf.push(t);
			}
			rc = ot('startAllPlugins', function () {
				for (let t in se) ic(t) && Bo(se[t]);
			});
			(Bo = ot(
				'startPlugin',
				function (t) {
					if (t.start) {
						if ((qe.info('Starting plugin', t.name), t.started))
							return qe.warn(`${t.name} already started`), !1;
						try {
							t.start(), (t.started = !0);
						} catch (n) {
							return (
								qe.error(
									`Failed to start ${t.name}
`,
									n,
								),
								!1
							);
						}
					}
					if (t.commands?.length) {
						qe.info('Registering commands of plugin', t.name);
						for (let n of t.commands)
							try {
								Bn(n, t.name);
							} catch (i) {
								return (
									qe.error(
										`Failed to register command ${n.name}
`,
										i,
									),
									!1
								);
							}
					}
					return !0;
				},
				(e) => `startPlugin ${e.name}`,
			)),
				(sc = ot(
					'stopPlugin',
					function (t) {
						if (t.stop) {
							if (
								(qe.info('Stopping plugin', t.name), !t.started)
							)
								return qe.warn(`${t.name} already stopped`), !1;
							try {
								t.stop(), (t.started = !1);
							} catch (n) {
								return (
									qe.error(
										`Failed to stop ${t.name}
`,
										n,
									),
									!1
								);
							}
						}
						if (t.commands?.length) {
							qe.info('Unregistering commands of plugin', t.name);
							for (let n of t.commands)
								try {
									yo(n.name);
								} catch (i) {
									return (
										qe.error(
											`Failed to unregister command ${n.name}
`,
											i,
										),
										!1
									);
								}
						}
						return !0;
					},
					(e) => `stopPlugin ${e.name}`,
				));
		});
	function Pv(e) {
		K.show({
			message: e,
			type: K.Type.FAILURE,
			id: K.genId(),
			options: { position: K.Position.BOTTOM },
		});
	}
	function Iv({ required: e }) {
		return o(
			Ye,
			{ className: gt('info-card', { 'restart-card': e }) },
			e
				? o(
						p,
						null,
						o(g.FormTitle, { tag: 'h5' }, 'Restart required!'),
						o(
							g.FormText,
							{ className: gt('dep-text') },
							'Restart now to apply new plugins and their settings',
						),
						o(
							L,
							{
								color: L.Colors.YELLOW,
								onClick: () => location.reload(),
							},
							'Restart',
						),
				  )
				: o(
						p,
						null,
						o(g.FormTitle, { tag: 'h5' }, 'Plugin Management'),
						o(
							g.FormText,
							null,
							'Press the cog wheel or info icon to get more info on a plugin',
						),
						o(
							g.FormText,
							null,
							'Plugins with a cog wheel have settings you can modify!',
						),
				  ),
		);
	}
	function Jf({
		plugin: e,
		disabled: t,
		onRestartNeeded: n,
		onMouseEnter: i,
		onMouseLeave: r,
		isNew: a,
	}) {
		let l = Ge([`plugins.${e.name}.enabled`]).plugins[e.name],
			u = () => l.enabled ?? !1;
		function m() {
			Wr(
				async () => (h) =>
					o(Vl, {
						...h,
						plugin: e,
						onRestartNeeded: () => n(e.name),
					}),
			);
		}
		function y() {
			let h = u();
			if (!h) {
				let { restartNeeded: S, failures: A } = nr(e);
				if (A.length) {
					Qf.error(
						`Failed to start dependencies for ${e.name}: ${A.join(
							', ',
						)}`,
					),
						fo(
							'Failed to start dependencies: ' + A.join(', '),
							'Close',
							() => null,
						);
					return;
				} else if (S) {
					(l.enabled = !0), n(e.name);
					return;
				}
			}
			if (e.patches) {
				(l.enabled = !h), n(e.name);
				return;
			}
			if (h && !e.started) {
				l.enabled = !h;
				return;
			}
			let b = h ? sc(e) : Bo(e),
				x = h ? 'stop' : 'start';
			if (!b) {
				Qf.error(`Failed to ${x} plugin ${e.name}`),
					Pv(`Failed to ${x} plugin: ${e.name}`);
				return;
			}
			l.enabled = !h;
		}
		return o(
			pe,
			{
				className: gt('card', { 'card-disabled': t }),
				flexDirection: 'column',
				onMouseEnter: i,
				onMouseLeave: r,
			},
			o(
				'div',
				{ className: gt('card-header') },
				o(
					z,
					{ variant: 'text-md/bold', className: gt('name') },
					e.name,
					a && o(Sd, { text: 'NEW', color: '#ED4245' }),
				),
				o(
					'button',
					{
						role: 'switch',
						onClick: () => m(),
						className: me('button-12Fmur', gt('info-button')),
					},
					e.options
						? o(xv, null)
						: o(wv, { width: '24', height: '24' }),
				),
				o(Wf, { checked: u(), onChange: y, disabled: t }),
			),
			o(
				z,
				{ className: gt('note'), variant: 'text-sm/normal' },
				e.description,
			),
		);
	}
	function kv(e) {
		return o(
			w.Fragment,
			null,
			o(g.FormText, null, 'This plugin is required by:'),
			e.map((t) => o(g.FormText, { className: gt('dep-text') }, t)),
		);
	}
	var gt,
		Qf,
		Xf,
		xv,
		wv,
		ir,
		lc = d(() => {
			'use strict';
			s();
			Gf();
			Lt();
			gi();
			E();
			It();
			J();
			ct();
			er();
			Mi();
			jf();
			qf();
			nc();
			ge();
			Be();
			B();
			Ze();
			D();
			P();
			Fn();
			or();
			(gt = mt('vc-plugins-')),
				(Qf = new F('PluginSettings', '#a6d189')),
				(Xf = C('inputDefault', 'inputWrapper')),
				(xv = Y(() =>
					we(
						'18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069',
					),
				)),
				(wv = Y(() =>
					we(
						'4.4408921e-16 C4.4771525,-1.77635684e-15 4.4408921e-16',
					),
				));
			ir = N.wrap(
				function () {
					let t = Ge(),
						n = w.useMemo(() => new $o(), []);
					w.useEffect(
						() => () =>
							void (
								n.hasChanges &&
								Dt.show({
									title: 'Restart required',
									body: o(
										p,
										null,
										o(
											'p',
											null,
											'The following plugins require a restart:',
										),
										o(
											'div',
											null,
											n.map((S, A) =>
												o(
													p,
													null,
													A > 0 && ', ',
													Ce.parse('`' + S + '`'),
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
					let i = w.useMemo(() => {
							let S = {};
							for (let A in se) {
								let M = se[A].dependencies;
								if (M)
									for (let j of M)
										(S[j] ??= []), S[j].push(A);
							}
							return S;
						}, []),
						r = w.useMemo(
							() =>
								Object.values(se).sort((S, A) =>
									S.name.localeCompare(A.name),
								),
							[],
						),
						[a, l] = w.useState({ value: '', status: 0 }),
						u = (S) => l((A) => ({ ...A, value: S })),
						m = (S) => l((A) => ({ ...A, status: S })),
						y = (S) => {
							let A = t.plugins[S.name]?.enabled;
							return (A && a.status === 2) ||
								(!A && a.status === 1)
								? !1
								: a.value.length
								? S.name
										.toLowerCase()
										.includes(a.value.toLowerCase()) ||
								  S.description
										.toLowerCase()
										.includes(a.value.toLowerCase())
								: !0;
						},
						[h] = Me(() =>
							xe('Vencord_existingPlugins').then((S) => {
								let A = Date.now() / 1e3,
									M = {},
									j = Object.values(r).map((_) => _.name),
									X = [];
								for (let { name: _ } of r)
									(M[_] = S?.[_] ?? A) + 60 * 60 * 24 * 2 >
										A && X.push(_);
								return (
									be('Vencord_existingPlugins', M),
									window._.isEqual(X, j) ? [] : X
								);
							}),
						),
						b,
						x;
					if (r?.length) {
						(b = []), (x = []);
						for (let S of r) {
							if (!y(S)) continue;
							if (
								S.required ||
								i[S.name]?.some((M) => t.plugins[M].enabled)
							) {
								let M = S.required
									? 'This plugin is required for Vencord to function.'
									: kv(
											i[S.name]?.filter(
												(j) => t.plugins[j].enabled,
											),
									  );
								x.push(
									o(
										Z,
										{ text: M, key: S.name },
										({
											onMouseLeave: j,
											onMouseEnter: X,
										}) =>
											o(Jf, {
												onMouseLeave: j,
												onMouseEnter: X,
												onRestartNeeded: (_) =>
													n.handleChange(_),
												disabled: !0,
												plugin: S,
											}),
									),
								);
							} else
								b.push(
									o(Jf, {
										onRestartNeeded: (M) =>
											n.handleChange(M),
										disabled: !1,
										plugin: S,
										isNew: h?.includes(S.name),
										key: S.name,
									}),
								);
						}
					} else
						b = x = o(
							z,
							{ variant: 'text-md/normal' },
							'No plugins meet search criteria.',
						);
					return o(
						g.FormSection,
						{ className: O.top16 },
						o(Iv, { required: n.hasChanges }),
						o(
							g.FormTitle,
							{ tag: 'h5', className: me(O.top20, O.bottom8) },
							'Filters',
						),
						o(
							'div',
							{ className: gt('filter-controls') },
							o(Te, {
								autoFocus: !0,
								value: a.value,
								placeholder: 'Search for a plugin...',
								onChange: u,
								className: O.bottom20,
							}),
							o(
								'div',
								{ className: Xf.inputWrapper },
								o(St, {
									className: Xf.inputDefault,
									options: [
										{
											label: 'Show All',
											value: 0,
											default: !0,
										},
										{ label: 'Show Enabled', value: 1 },
										{ label: 'Show Disabled', value: 2 },
									],
									serialize: String,
									select: m,
									isSelected: (S) => S === a.status,
									closeOnSelect: !0,
								}),
							),
						),
						o(g.FormTitle, { className: O.top20 }, 'Plugins'),
						o('div', { className: gt('grid') }, b),
						o(g.FormDivider, { className: O.top20 }),
						o(
							g.FormTitle,
							{ tag: 'h5', className: me(O.top20, O.bottom8) },
							'Required Plugins',
						),
						o('div', { className: gt('grid') }, x),
					);
				},
				{
					message:
						'Failed to render the Plugin Settings. If this persists, try using the installer to reinstall!',
					onError: Vi,
				},
			);
		});
	var Zf,
		Vf = d(() => {
			'use strict';
			s();
			J();
			lc();
			Zf = N.wrap(ir);
		});
	function Mv({ link: e }) {
		let [t, n, i] = Me(() =>
				fetch(e).then((a) => {
					if (a.status > 300) throw `${a.status} ${a.statusText}`;
					let l = a.headers.get('Content-Type');
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
			g.FormText,
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
	function Nv({ themeLinks: e }) {
		return e.length
			? o(
					p,
					null,
					o(
						g.FormTitle,
						{ className: O.top20, tag: 'h5' },
						'Validator',
					),
					o(
						g.FormText,
						null,
						'This section will tell you whether your themes can successfully be loaded',
					),
					o(
						'div',
						null,
						e.map((t) =>
							o(
								Ye,
								{
									style: {
										padding: '.5em',
										marginBottom: '.5em',
										marginTop: '.5em',
									},
									key: t,
								},
								o(
									g.FormTitle,
									{
										tag: 'h5',
										style: { overflowWrap: 'break-word' },
									},
									t,
								),
								o(Mv, { link: t }),
							),
						),
					),
			  )
			: null;
	}
	var Cv,
		eg,
		tg = d(() => {
			'use strict';
			s();
			E();
			J();
			Zt();
			Be();
			B();
			D();
			P();
			Cv = Se((e) => typeof e.textarea == 'string');
			eg = N.wrap(function () {
				let e = Ge(),
					[t, n] = w.useState(
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
					p,
					null,
					o(
						Ye,
						{ className: 'vc-settings-card' },
						o(
							g.FormTitle,
							{ tag: 'h5' },
							'Paste links to .css / .theme.css files here',
						),
						o(g.FormText, null, 'One link per line'),
						o(
							g.FormText,
							null,
							'Make sure to use the raw links or github.io links!',
						),
						o(g.FormDivider, {
							className: O.top8 + ' ' + O.bottom8,
						}),
						o(g.FormTitle, { tag: 'h5' }, 'Find Themes:'),
						o(
							'div',
							{ style: { marginBottom: '.5em' } },
							o(
								Ne,
								{
									style: { marginRight: '.5em' },
									href: 'https://betterdiscord.app/themes',
								},
								'BetterDiscord Themes',
							),
							o(
								Ne,
								{
									href: 'https://github.com/search?q=discord+theme',
								},
								'GitHub',
							),
						),
						o(
							g.FormText,
							null,
							'If using the BD site, click on "Source" somewhere below the Download button',
						),
						o(
							g.FormText,
							null,
							'In the GitHub repository of your theme, find X.theme.css / X.css, click on it, then click the "Raw" button',
						),
						o(
							g.FormText,
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
										Ne,
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
					o(g.FormTitle, { tag: 'h5' }, 'Themes'),
					o(Mr, {
						value: t,
						onChange: (r) => n(r.currentTarget.value),
						className: `${Cv.textarea} vc-settings-theme-links`,
						placeholder: 'Theme Links',
						spellCheck: !1,
						onBlur: i,
					}),
					o(Nv, { themeLinks: e.themeLinks }),
				);
			});
		});
	var ng = d(() => {
		'use strict';
		s();
		E();
		J();
		po();
		ct();
		er();
		Zt();
		Be();
		B();
		xn();
		P();
		_n();
	});
	var og,
		ig = d(() => {
			s();
			og = `<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>QuickCss Editor</title>
    <link rel="stylesheet" data-name="vs/editor/editor.main"
        href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs/editor/editor.main.min.css">
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs/loader.min.js"><\/script>

    <script>
        require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0/min/vs' } });
        require(["vs/editor/editor.main"], () => {
            getCurrentCss().then(css => {
                var editor = monaco.editor.create(document.getElementById('container'), {
                    value: css,
                    language: 'css',
                    theme: getTheme(),
                });
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
		});
	var rg = {};
	te(rg, { launchMonacoEditor: () => Lv });
	async function Lv() {
		let e = `popup,width=${Math.min(
				window.innerWidth,
				1e3,
			)},height=${Math.min(window.innerHeight, 1e3)}`,
			t = open('about:blank', 'VencordQuickCss', e);
		if (!t) {
			alert('Failed to open QuickCSS popup. Make sure to allow popups!');
			return;
		}
		(t.setCss = Av),
			(t.getCurrentCss = () => VencordNative.ipc.invoke($.GET_QUICK_CSS)),
			(t.getTheme = () =>
				he((n) =>
					n.ProtoClass?.typeName.endsWith('PreloadedUserSettings'),
				)?.getCurrentValue()?.appearance?.theme === 2
					? 'vs-light'
					: 'vs-dark'),
			t.document.write(og),
			(window.__VENCORD_MONACO_WIN__ = new WeakRef(t));
	}
	var Rv,
		Av,
		sg = d(() => {
			'use strict';
			s();
			Yn();
			Ke();
			Un();
			D();
			ig();
			(Rv = new dt()),
				(Av = Nt((e) => {
					Rv.push(() => VencordNative.ipc.invoke($.SET_QUICK_CSS, e));
				}));
		});
	function Dv() {
		let [e, , t] = Me(() => VencordNative.ipc.invoke($.GET_SETTINGS_DIR), {
				fallbackValue: 'Loading...',
			}),
			n = Ge(),
			i = n.notifications,
			r = w.useMemo(() => (Math.random() > 0.5 ? lg : Ev), []),
			a = navigator.platform.toLowerCase().startsWith('win'),
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
			];
		return o(
			w.Fragment,
			null,
			o(_v, { image: r }),
			o(
				g.FormSection,
				{ title: 'Quick Actions' },
				o(
					Ye,
					{ className: ag('quick-actions-card') },
					o(
						L,
						{
							onClick: () => (sg(), Zo(rg)).launchMonacoEditor(),
							size: L.Sizes.SMALL,
							disabled: e === 'Loading...',
						},
						'Open QuickCSS File',
					),
				),
			),
			o(g.FormDivider, null),
			o(
				g.FormSection,
				{ className: O.top16, title: 'Settings', tag: 'h5' },
				o(
					g.FormText,
					{ className: O.bottom20 },
					'Hint: You can change the position of this settings section in the settings of the "Settings" plugin!',
				),
				l.map(
					(u) =>
						u &&
						o(
							pn,
							{
								key: u.key,
								value: n[u.key],
								onChange: (m) => (n[u.key] = m),
								note: u.note,
							},
							u.title,
						),
				),
			),
			o(g.FormTitle, { tag: 'h5' }, 'Notification Style'),
			i.useNative !== 'never' &&
				Notification.permission === 'denied' &&
				o(
					Xt,
					{ style: { padding: '1em' }, className: O.bottom8 },
					o(
						g.FormTitle,
						{ tag: 'h5' },
						'Desktop Notification Permission denied',
					),
					o(
						g.FormText,
						null,
						'You have denied Notification Permissions. Thus, Desktop notifications will not work!',
					),
				),
			o(
				g.FormText,
				{ className: O.bottom8 },
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
			o(St, {
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
				select: (u) => (i.useNative = u),
				isSelected: (u) => u === i.useNative,
				serialize: li,
			}),
			o(
				g.FormTitle,
				{ tag: 'h5', className: O.top16 + ' ' + O.bottom8 },
				'Notification Position',
			),
			o(St, {
				isDisabled: i.useNative === 'always',
				placeholder: 'Notification Position',
				options: [
					{
						label: 'Bottom Right',
						value: 'bottom-right',
						default: !0,
					},
					{ label: 'Top Right', value: 'top-right' },
				],
				select: (u) => (i.position = u),
				isSelected: (u) => u === i.position,
				serialize: li,
			}),
			o(
				g.FormTitle,
				{ tag: 'h5', className: O.top16 + ' ' + O.bottom8 },
				'Notification Timeout',
			),
			o(
				g.FormText,
				{ className: O.bottom16 },
				'Set to 0s to never automatically time out',
			),
			o(Nn, {
				disabled: i.useNative === 'always',
				markers: [0, 1e3, 2500, 5e3, 1e4, 2e4],
				minValue: 0,
				maxValue: 2e4,
				initialValue: i.timeout,
				onValueChange: (u) => (i.timeout = u),
				onValueRender: (u) => (u / 1e3).toFixed(2) + 's',
				onMarkerRender: (u) => u / 1e3 + 's',
				stickToMarkers: !1,
			}),
			o(
				g.FormTitle,
				{ tag: 'h5', className: O.top16 + ' ' + O.bottom8 },
				'Notification Log Limit',
			),
			o(
				g.FormText,
				{ className: O.bottom16 },
				'The amount of notifications to save in the log until old ones are removed. Set to ',
				o('code', null, '0'),
				' to disable Notification log and ',
				o('code', null, '\u221E'),
				' to never automatically remove old Notifications',
			),
			o(Nn, {
				markers: [0, 25, 50, 75, 100, 200],
				minValue: 0,
				maxValue: 200,
				stickToMarkers: !0,
				initialValue: i.logLimit,
				onValueChange: (u) => (i.logLimit = u),
				onValueRender: (u) => (u === 200 ? '\u221E' : u),
				onMarkerRender: (u) => (u === 200 ? '\u221E' : u),
			}),
			o(
				L,
				{ onClick: Wu, disabled: i.logLimit === 0 },
				'Open Notification Log',
			),
		);
	}
	function _v({ image: e }) {
		return o(
			Ye,
			{ className: ag('card', 'donate') },
			o(
				'div',
				null,
				o(g.FormTitle, { tag: 'h5' }, 'Support the Project'),
				o(
					g.FormText,
					null,
					'Please consider supporting the development of Vencord by donating!',
				),
				o(uo, { style: { transform: 'translateX(-1em)' } }),
			),
			o('img', {
				role: 'presentation',
				src: e,
				alt: '',
				height: 128,
				style: {
					marginLeft: 'auto',
					transform: e === lg ? 'rotate(10deg)' : '',
				},
			}),
		);
	}
	var ag,
		lg,
		Ev,
		cg,
		pg = d(() => {
			'use strict';
			s();
			$s();
			E();
			It();
			zr();
			J();
			po();
			Ke();
			Be();
			B();
			P();
			(ag = mt('vc-settings-')),
				(lg =
					'https://cdn.discordapp.com/emojis/1026533090627174460.png'),
				(Ev =
					'https://media.discordapp.net/stickers/1039992459209490513.png');
			cg = N.wrap(Dv);
		});
	var fg = {};
	te(fg, { default: () => cc });
	function Fv(e) {
		let { tab: t = 'VencordSettings' } = e,
			n = mg[t]?.component;
		return o(
			g.FormSection,
			null,
			o(
				z,
				{
					variant: 'heading-lg/semibold',
					style: { color: 'var(--header-primary)' },
					tag: 'h2',
				},
				'Vencord Settings',
			),
			o(
				dg,
				{
					type: 'top',
					look: 'brand',
					className: ug('tab-bar'),
					selectedItem: t,
					onItemSelect: En.open,
				},
				Object.entries(mg).map(([i, { name: r, component: a }]) =>
					a
						? o(
								dg.Item,
								{
									id: i,
									className: ug('tab-bar-item'),
									key: i,
								},
								r,
						  )
						: null,
				),
			),
			o(g.FormDivider, null),
			n && o(n, null),
		);
	}
	function cc(e) {
		return o(N, { onError: Vi }, o(Fv, { tab: e.tab }));
	}
	var ug,
		dg,
		mg,
		pc = d(() => {
			'use strict';
			s();
			_f();
			It();
			J();
			er();
			D();
			P();
			Uf();
			Vf();
			tg();
			ng();
			pg();
			(ug = mt('vc-settings-')),
				(dg = oe('[role="tab"][aria-disabled="false"]')),
				(mg = {
					VencordSettings: {
						name: 'Vencord',
						component: () => o(cg, null),
					},
					VencordPlugins: {
						name: 'Plugins',
						component: () => o(Zf, null),
					},
					VencordThemes: {
						name: 'Themes',
						component: () => o(eg, null),
					},
					VencordUpdater: { name: 'Updater' },
					VencordSettingsSync: {
						name: 'Backup & Restore',
						component: () => o(Bf, null),
					},
				});
		});
	var jt,
		Xn,
		uc = d(() => {
			'use strict';
			s();
			E();
			Zl();
			T();
			ge();
			B();
			v();
			P();
			_n();
			(jt = Y(() => (pc(), Zo(fg)).default)),
				(Xn = f({
					name: 'Settings',
					description: 'Adds Settings UI and debug info',
					authors: [c.Ven, c.Megu],
					required: !0,
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
									switch (
										k.plugins.Settings.settingsLocation
									) {
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
												new F('Settings').error(
													new Error(
														"No switch case matched????? Don't mess with the settings, silly",
													),
												),
												/(?!a)a/
											);
									}
								},
								replace:
									'...$self.makeSettingsCategories($1),$&',
							},
						},
					],
					makeSettingsCategories({ ID: e }) {
						let t = (i) => () => En.open(i),
							n = [
								{ section: e.HEADER, label: 'Vencord' },
								{
									section: 'VencordSettings',
									label: 'Vencord',
									element: () =>
										o(jt, { tab: 'VencordSettings' }),
									onClick: t('VencordSettings'),
								},
								{
									section: 'VencordPlugins',
									label: 'Plugins',
									element: () =>
										o(jt, { tab: 'VencordPlugins' }),
									onClick: t('VencordPlugins'),
								},
								{
									section: 'VencordThemes',
									label: 'Themes',
									element: () =>
										o(jt, { tab: 'VencordThemes' }),
									onClick: t('VencordThemes'),
								},
							];
						return (
							n.push({
								section: 'VencordSettingsSync',
								label: 'Backup & Restore',
								element: () =>
									o(jt, { tab: 'VencordSettingsSync' }),
								onClick: t('VencordSettingsSync'),
							}),
							n.push({ section: e.DIVIDER }),
							n
						);
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
								{
									label: 'At the very bottom',
									value: 'bottom',
								},
							],
							restartNeeded: !0,
						},
					},
					tabs: {
						vencord: () => o(jt, { tab: 'VencordSettings' }),
						plugins: () => o(jt, { tab: 'VencordPlugins' }),
						themes: () => o(jt, { tab: 'VencordThemes' }),
						updater: () => o(jt, { tab: 'VencordUpdater' }),
						sync: () => o(jt, { tab: 'VencordSettingsSync' }),
					},
					get electronVersion() {
						return (
							VencordNative.getVersions().electron ||
							window.armcord?.electron ||
							null
						);
					},
					get chromiumVersion() {
						try {
							return (
								VencordNative.getVersions().chrome ||
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
							p,
							null,
							o(e, { ...t }, 'Vencord ', lt, r),
							n && o(e, { ...t }, 'Electron ', n),
							i && o(e, { ...t }, 'Chromium ', i),
						);
					},
				}));
		});
	var gg = d(() => {});
	var hg,
		yg = d(() => {
			s();
			hg = `/* eslint-disable header/header */
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
	var Sg = oo((v3, dc) => {
		'use strict';
		s();
		var Ov = Object.prototype.hasOwnProperty,
			_e = '~';
		function Uo() {}
		Object.create &&
			((Uo.prototype = Object.create(null)),
			new Uo().__proto__ || (_e = !1));
		function $v(e, t, n) {
			(this.fn = e), (this.context = t), (this.once = n || !1);
		}
		function bg(e, t, n, i, r) {
			if (typeof n != 'function')
				throw new TypeError('The listener must be a function');
			var a = new $v(n, i || e, r),
				l = _e ? _e + t : t;
			return (
				e._events[l]
					? e._events[l].fn
						? (e._events[l] = [e._events[l], a])
						: e._events[l].push(a)
					: ((e._events[l] = a), e._eventsCount++),
				e
			);
		}
		function rr(e, t) {
			--e._eventsCount === 0
				? (e._events = new Uo())
				: delete e._events[t];
		}
		function Ae() {
			(this._events = new Uo()), (this._eventsCount = 0);
		}
		Ae.prototype.eventNames = function () {
			var t = [],
				n,
				i;
			if (this._eventsCount === 0) return t;
			for (i in (n = this._events))
				Ov.call(n, i) && t.push(_e ? i.slice(1) : i);
			return Object.getOwnPropertySymbols
				? t.concat(Object.getOwnPropertySymbols(n))
				: t;
		};
		Ae.prototype.listeners = function (t) {
			var n = _e ? _e + t : t,
				i = this._events[n];
			if (!i) return [];
			if (i.fn) return [i.fn];
			for (var r = 0, a = i.length, l = new Array(a); r < a; r++)
				l[r] = i[r].fn;
			return l;
		};
		Ae.prototype.listenerCount = function (t) {
			var n = _e ? _e + t : t,
				i = this._events[n];
			return i ? (i.fn ? 1 : i.length) : 0;
		};
		Ae.prototype.emit = function (t, n, i, r, a, l) {
			var u = _e ? _e + t : t;
			if (!this._events[u]) return !1;
			var m = this._events[u],
				y = arguments.length,
				h,
				b;
			if (m.fn) {
				switch (
					(m.once && this.removeListener(t, m.fn, void 0, !0), y)
				) {
					case 1:
						return m.fn.call(m.context), !0;
					case 2:
						return m.fn.call(m.context, n), !0;
					case 3:
						return m.fn.call(m.context, n, i), !0;
					case 4:
						return m.fn.call(m.context, n, i, r), !0;
					case 5:
						return m.fn.call(m.context, n, i, r, a), !0;
					case 6:
						return m.fn.call(m.context, n, i, r, a, l), !0;
				}
				for (b = 1, h = new Array(y - 1); b < y; b++)
					h[b - 1] = arguments[b];
				m.fn.apply(m.context, h);
			} else {
				var x = m.length,
					S;
				for (b = 0; b < x; b++)
					switch (
						(m[b].once &&
							this.removeListener(t, m[b].fn, void 0, !0),
						y)
					) {
						case 1:
							m[b].fn.call(m[b].context);
							break;
						case 2:
							m[b].fn.call(m[b].context, n);
							break;
						case 3:
							m[b].fn.call(m[b].context, n, i);
							break;
						case 4:
							m[b].fn.call(m[b].context, n, i, r);
							break;
						default:
							if (!h)
								for (S = 1, h = new Array(y - 1); S < y; S++)
									h[S - 1] = arguments[S];
							m[b].fn.apply(m[b].context, h);
					}
			}
			return !0;
		};
		Ae.prototype.on = function (t, n, i) {
			return bg(this, t, n, i, !1);
		};
		Ae.prototype.once = function (t, n, i) {
			return bg(this, t, n, i, !0);
		};
		Ae.prototype.removeListener = function (t, n, i, r) {
			var a = _e ? _e + t : t;
			if (!this._events[a]) return this;
			if (!n) return rr(this, a), this;
			var l = this._events[a];
			if (l.fn)
				l.fn === n &&
					(!r || l.once) &&
					(!i || l.context === i) &&
					rr(this, a);
			else {
				for (var u = 0, m = [], y = l.length; u < y; u++)
					(l[u].fn !== n ||
						(r && !l[u].once) ||
						(i && l[u].context !== i)) &&
						m.push(l[u]);
				m.length
					? (this._events[a] = m.length === 1 ? m[0] : m)
					: rr(this, a);
			}
			return this;
		};
		Ae.prototype.removeAllListeners = function (t) {
			var n;
			return (
				t
					? ((n = _e ? _e + t : t), this._events[n] && rr(this, n))
					: ((this._events = new Uo()), (this._eventsCount = 0)),
				this
			);
		};
		Ae.prototype.off = Ae.prototype.removeListener;
		Ae.prototype.addListener = Ae.prototype.on;
		Ae.prefixed = _e;
		Ae.EventEmitter = Ae;
		typeof dc < 'u' && (dc.exports = Ae);
	});
	var hc = oo((Jn) => {
		'use strict';
		s();
		Object.defineProperty(Jn, '__esModule', { value: !0 });
		Jn.Channel = Jn.ChannelPort = void 0;
		var Bv = Sg(),
			sr = 'vapIpc',
			mc = Symbol.for('vapIpc.edgeCreate'),
			fc = class {
				_pipes = new Map();
				_listeners = new Map();
				_createListenerMap() {
					return new Map();
				}
				_emit(t, n, ...i) {
					for (let [r, a] of this._listeners.entries()) {
						if (r === t) continue;
						let l = a.get(n);
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
						listen: (a, l) => void i.set(a, l),
					};
					return this._pipes.set(t, r), r;
				}
				getPipe(t) {
					return this._pipes.get(t) ?? null;
				}
			};
		Jn.ChannelPort = fc;
		var gc = class {
			id;
			_edges = new Map();
			_callbacks = new Map();
			_callers = new Map();
			_edgePipes = new Map();
			_pipes = [];
			_emitter = new Bv.EventEmitter();
			_logger;
			_destroyed = !1;
			constructor(t) {
				this.id = t;
			}
			addPipe(t) {
				t.listen(`${sr}:handshake`, (n) => {
					this._handleHandshake(t, n);
				}),
					t.listen(`${sr}:message`, (n) => {
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
						(a) => !i?.channelIds.includes(a),
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
					let r = [...n.channelIds].filter((a) => a !== this.id);
					this._edges.set(n.id, { ...n, channelIds: r }),
						this._edgePipes.set(n.id, t);
				}
				this._emitter.emit(mc, n), this.handshakeAll();
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
							(a) => (
								console.error(a),
								new Error(a?.message ?? `${a}`)
							),
						)
						.then((a) => {
							this._emitMessage({
								name: n.name,
								source: this.id,
								destination: n.source,
								data: a,
								nonce: n.nonce,
							});
						});
					return;
				}
			}
			_emitHandshake(t) {
				let n = this.getEdge();
				t.emit(`${sr}:handshake`, n);
			}
			_emitMessage(t) {
				let n = this.findEdgeId(t.destination);
				if (!n) return;
				this._edgePipes.get(n)?.emit(`${sr}:message`, t);
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
							let r = (a) => {
								(a.id === t || a.channelIds.includes(t)) &&
									(this._emitter.off(mc, r), i(a.id));
							};
							this._emitter.on(mc, r);
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
					r = new Promise((a, l) => {
						let u = setTimeout(() => {
							this._callbacks.delete(i),
								l(new Error('Call timed out'));
						}, n.timeout);
						this._callbacks.set(i, (m) => {
							this._callbacks.delete(i),
								clearTimeout(u),
								n.signal?.aborted
									? n.signal.reason instanceof Error &&
									  l(n.signal.reason)
									: m instanceof Error
									? l(m)
									: a(m);
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
		Jn.Channel = gc;
	});
	var Sc = oo((Zn) => {
		'use strict';
		s();
		Object.defineProperty(Zn, '__esModule', { value: !0 });
		Zn.RemoteClient = Zn.RemoteHost = void 0;
		var yc = class {
			channel;
			constructor(t, n) {
				this.channel = t;
				for (let [i, r] of Object.entries(n))
					t.onCall(i, async (a) => await r(...a));
				t.handshakeAll();
			}
		};
		Zn.RemoteHost = yc;
		var bc = class {
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
		Zn.RemoteClient = bc;
	});
	var xg = oo((Vn) => {
		'use strict';
		s();
		Object.defineProperty(Vn, '__esModule', { value: !0 });
		Vn.WorkerClient = Vn.createWorkerHost = void 0;
		var vg = hc(),
			Tg = Sc(),
			Uv = (e, t) => {
				let n = new vg.Channel(e);
				return (
					n.addPipe({
						emit: (i, r) => postMessage({ event: i, data: r }),
						listen: (i, r) =>
							addEventListener('message', ({ data: a }) => {
								a.event === i && r(a.data);
							}),
					}),
					new Tg.RemoteHost(n, t)
				);
			};
		Vn.createWorkerHost = Uv;
		var vc = class extends Tg.RemoteClient {
			workerOpts;
			worker;
			workerListeners = [];
			url;
			constructor(t, n, i, r = {}) {
				let a = new vg.Channel(t);
				if ((super(n, a), (this.workerOpts = r), i instanceof Blob)) {
					let l = new Blob([i], { type: 'text/javascript' });
					this.url = URL.createObjectURL(l);
				} else this.url = i;
			}
			async init() {
				let t = (this.worker = new Worker(this.url, this.workerOpts));
				this.channel.addPipe({
					emit: (n, i) => t.postMessage({ event: n, data: i }),
					listen: (n, i) => {
						let r = (a) => {
							let { event: l, data: u } = a.data;
							l === n && i(u);
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
		Vn.WorkerClient = vc;
	});
	var wg = oo((zt) => {
		'use strict';
		s();
		var Gv =
				(zt && zt.__createBinding) ||
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
			Tc =
				(zt && zt.__exportStar) ||
				function (e, t) {
					for (var n in e)
						n !== 'default' &&
							!Object.prototype.hasOwnProperty.call(t, n) &&
							Gv(t, e, n);
				};
		Object.defineProperty(zt, '__esModule', { value: !0 });
		Tc(hc(), zt);
		Tc(Sc(), zt);
		Tc(xg(), zt);
	});
	function wc(e) {
		ar.id !== e.id && (Object.assign(ar, e), xc.forEach((t) => t(e)));
	}
	var ar,
		xc,
		Pg,
		Pc = d(() => {
			'use strict';
			s();
			P();
			(ar = { id: null, theme: null }),
				(xc = new Set()),
				(Pg = () => {
					let [, e] = w.useState(ar);
					return (
						w.useEffect(
							() => (xc.add(e), () => void xc.delete(e)),
							[],
						),
						ar
					);
				});
		});
	function In(e) {
		if (Object.prototype.hasOwnProperty.call(eo, e)) return eo[e];
		let t = Object.values(eo).find((n) => n.aliases?.includes(e));
		return t ? (qv.set(e, t), t) : null;
	}
	var Hv,
		jv,
		Ig,
		zv,
		Wv,
		eo,
		kg,
		Cg,
		qv,
		lr = d(() => {
			'use strict';
			s();
			(Hv = 'Vap0r1ze/vapcord'),
				(jv = '88a7032a59cca40da170926651b08201ea3b965a'),
				(Ig = `https://raw.githubusercontent.com/${Hv}/${jv}/assets/shiki-codeblocks`),
				(zv = (e) => `${Ig}/${e}`),
				(Wv = `${Ig}/languages.json`),
				(eo = {}),
				(kg = async () => {
					let e = await fetch(Wv).then((n) => n.json()),
						t = Object.fromEntries(
							e.map((n) => [
								n.id,
								{ ...n, grammarUrl: zv(n.fileName) },
							]),
						);
					Object.assign(eo, t);
				}),
				(Cg = (e) =>
					e.grammar
						? Promise.resolve(e.grammar)
						: fetch(e.grammarUrl).then((t) => t.json())),
				(qv = new Map());
		});
	var Kv,
		Yv,
		ne,
		Wt,
		Ic = d(() => {
			'use strict';
			s();
			(Kv = 'shikijs/shiki'),
				(Yv = '0b28ad8ccfbf2615f2d9d38ea8255416b8ac3043'),
				(ne = (e) =>
					`https://raw.githubusercontent.com/${Kv}/${Yv}/packages/shiki/themes/${e}.json`),
				(Wt = {
					DarkPlus: ne('dark-plus'),
					MaterialCandy:
						'https://raw.githubusercontent.com/millsp/material-candy/master/material-candy.json',
					DraculaSoft: ne('dracula-soft'),
					Dracula: ne('dracula'),
					GithubDarkDimmed: ne('github-dark-dimmed'),
					GithubDark: ne('github-dark'),
					GithubLight: ne('github-light'),
					LightPlus: ne('light-plus'),
					MaterialDarker: ne('material-darker'),
					MaterialDefault: ne('material-default'),
					MaterialLighter: ne('material-lighter'),
					MaterialOcean: ne('material-ocean'),
					MaterialPalenight: ne('material-palenight'),
					MinDark: ne('min-dark'),
					MinLight: ne('min-light'),
					Monokai: ne('monokai'),
					Nord: ne('nord'),
					OneDarkPro: ne('one-dark-pro'),
					Poimandres: ne('poimandres'),
					RosePineDawn: ne('rose-pine-dawn'),
					RosePineMoon: ne('rose-pine-moon'),
					RosePine: ne('rose-pine'),
					SlackDark: ne('slack-dark'),
					SlackOchin: ne('slack-ochin'),
					SolarizedDark: ne('solarized-dark'),
					SolarizedLight: ne('solarized-light'),
					VitesseDark: ne('vitesse-dark'),
					VitesseLight: ne('vitesse-light'),
					CssVariables: ne('css-variables'),
				});
		});
	var Ng,
		kc,
		Mg,
		q,
		Go = d(() => {
			'use strict';
			s();
			Io();
			Ng = gr(wg());
			Pc();
			lr();
			Ic();
			(kc = Object.values(Wt)),
				(q = {
					client: null,
					currentTheme: null,
					currentThemeUrl: null,
					timeoutMs: 1e4,
					languages: eo,
					themes: Wt,
					loadedThemes: new Set(),
					loadedLangs: new Set(),
					clientPromise: new Promise((e) => (Mg = e)),
					init: async (e) => {
						let t = await fetch(md).then((r) => r.blob()),
							n = (q.client = new Ng.WorkerClient(
								'shiki-client',
								'shiki-host',
								t,
								{ name: 'ShikiWorker' },
							));
						await n.init();
						let i = e || kc[0];
						await kg(),
							await n.run('setOnigasm', { wasm: fd }),
							await n.run('setHighlighter', {
								theme: i,
								langs: [],
							}),
							q.loadedThemes.add(i),
							await q._setTheme(i),
							Mg(n);
					},
					_setTheme: async (e) => {
						q.currentThemeUrl = e;
						let { themeData: t } = await q.client.run('getTheme', {
							theme: e,
						});
						(q.currentTheme = JSON.parse(t)),
							wc({ id: e, theme: q.currentTheme });
					},
					loadTheme: async (e) => {
						let t = await q.clientPromise;
						q.loadedThemes.has(e) ||
							(await t.run('loadTheme', { theme: e }),
							q.loadedThemes.add(e));
					},
					setTheme: async (e) => {
						await q.clientPromise,
							(e ||= kc[0]),
							q.loadedThemes.has(e) || (await q.loadTheme(e)),
							await q._setTheme(e);
					},
					loadLang: async (e) => {
						let t = await q.clientPromise,
							n = In(e);
						!n ||
							q.loadedLangs.has(n.id) ||
							(await t.run('loadLanguage', {
								lang: {
									...n,
									grammar: n.grammar ?? (await Cg(n)),
								},
							}),
							q.loadedLangs.add(n.id));
					},
					tokenizeCode: async (e, t) => {
						let n = await q.clientPromise,
							i = In(t);
						return i
							? (q.loadedLangs.has(i.id) ||
									(await q.loadLang(i.id)),
							  await n.run('codeToThemedTokens', {
									code: e,
									lang: t,
									theme: q.currentThemeUrl ?? kc[0],
							  }))
							: [];
					},
					destroy() {
						(q.currentTheme = null),
							(q.currentThemeUrl = null),
							wc({ id: null, theme: null }),
							q.client?.destroy();
					},
				});
		});
	var Rg,
		Ag = d(() => {
			'use strict';
			s();
			P();
			B();
			Rg = (e = !1) => {
				let t = w.useRef(null),
					[n, i] = Ie(!1);
				return [
					(a) => {
						t.current?.disconnect(),
							(t.current = null),
							a &&
								((Dr(a) && (i(!0), e)) ||
									((t.current = new IntersectionObserver(
										(l) => {
											for (let u of l)
												u.target === a &&
													(u.isIntersecting && e
														? (i(!0),
														  t.current?.disconnect(),
														  (t.current = null))
														: i(u.isIntersecting));
										},
									)),
									t.current.observe(a)));
					},
					n,
				];
			};
		});
	function Lg(e, t, n) {
		return n === !1 ? (t ? e.slice(0, -1) : e) : e[0];
	}
	function jo(e, t, n = !1) {
		let i = Tt.duration(e, t),
			r = o1.map((m) => ({ amount: i[m](), unit: m })),
			a = 0;
		e: for (let m = 0; m < r.length; m++)
			if (!(r[m].amount === 0 || !(m + 1 < r.length))) {
				for (let y = m + 1; y < r.length; y++)
					if (r[y].amount !== 0) continue e;
				a = r.length - (m + 1);
			}
		r = a === 0 ? r : r.slice(0, -a);
		let l = r.findIndex(({ unit: m }) => m === 'days');
		if (l !== -1) {
			let m = r[l],
				y = m.amount % 7;
			y === 0 ? r.splice(l, 1) : (m.amount = y);
		}
		let u = '';
		for (; r.length; ) {
			let { amount: m, unit: y } = r.shift();
			u.length && (u += r.length ? ', ' : ' and '),
				(m > 0 || u.length) && (u += `${m} ${Lg(y, m === 1, n)}`);
		}
		return u.length ? u : `0 ${Lg(t, !1, n)}`;
	}
	var Qv,
		Xv,
		Jv,
		Cc,
		Zv,
		Vv,
		e1,
		t1,
		n1,
		Ho,
		o1,
		zo = d(() => {
			'use strict';
			s();
			P();
			(Qv = (e) => e.split(/(?=[A-Z])/).map((t) => t.toLowerCase())),
				(Xv = (e) => e.toLowerCase().split('_')),
				(Jv = (e) => e.toLowerCase().split('-')),
				(Cc = (e) => e.split(/(?=[A-Z])/).map((t) => t.toLowerCase())),
				(Zv = (e) => e.toLowerCase().split(' ')),
				(Vv = (e) =>
					e
						.map((t, n) =>
							n ? t[0].toUpperCase() + t.slice(1) : t,
						)
						.join('')),
				(e1 = (e) => e.join('_').toUpperCase()),
				(t1 = (e) => e.join('-').toLowerCase()),
				(n1 = (e) =>
					e.map((t) => t[0].toUpperCase() + t.slice(1)).join('')),
				(Ho = (e) =>
					e.map((t) => t[0].toUpperCase() + t.slice(1)).join(' ')),
				(o1 = [
					'years',
					'months',
					'weeks',
					'days',
					'hours',
					'minutes',
					'seconds',
				]);
		});
	var Wo,
		Mc = d(() => {
			s();
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
			Wo = 'src/plugins/shikiCodeblocks/devicon.css';
		});
	var qo = d(() => {
		'use strict';
		s();
	});
	var r1,
		rn,
		Nc = d(() => {
			'use strict';
			s();
			E();
			It();
			B();
			zo();
			v();
			Go();
			Ic();
			Mc();
			qo();
			(r1 = Object.keys(Wt)),
				(rn = V(
					{
						theme: {
							type: 4,
							description: 'Default themes',
							options: r1.map((e) => ({
								label: Ho(Cc(e)),
								value: Wt[e],
								default: Wt[e] === Wt.DarkPlus,
							})),
							onChange: q.setTheme,
						},
						customTheme: {
							type: 0,
							description: 'A link to a custom vscode theme',
							placeholder: Wt.MaterialCandy,
							onChange: (e) => {
								q.setTheme(e || rn.store.theme);
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
								e === 'DISABLED' ? Tn(Wo) : Ot(Wo);
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
								let t = Er(e);
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
	function Dg(e, t) {
		let n = rn.use(e),
			[i, r] = w.useState(!1),
			a = { ...n, ...t },
			l = a.customTheme || a.theme;
		if (t) {
			let u = q.currentThemeUrl && l && l !== q.currentThemeUrl,
				m = Object.keys(t).length === 0;
			i && (!u || m) && r(!1), !i && u && (r(!0), q.setTheme(l));
		}
		return { ...a, isThemeLoading: l !== q.currentThemeUrl };
	}
	var _g = d(() => {
		'use strict';
		s();
		P();
		Go();
		Nc();
	});
	function Fg(e) {
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
	var Og = d(() => {
		'use strict';
		s();
	});
	var ht,
		$g,
		Ko = d(() => {
			'use strict';
			s();
			It();
			P();
			lr();
			qo();
			(ht = mt('shiki-')),
				($g = ({ lang: e, tryHljs: t }) => {
					let n = e ? mn?.getLanguage?.(e) : null,
						r = (e ? In(e) : null)?.name;
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
	function Bg(e) {
		let [t, n] = w.useState(!1);
		function i(r) {
			at.copy(r),
				n(!0),
				setTimeout(() => {
					n(!1);
				}, e);
		}
		return [t, i];
	}
	var Ug = d(() => {
		'use strict';
		s();
		P();
	});
	function Gg({ content: e, ...t }) {
		let [n, i] = Bg(1e3);
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
	var Hg = d(() => {
		'use strict';
		s();
		Ug();
	});
	function jg({ content: e, theme: t }) {
		let n = [];
		return (
			at.SUPPORTS_COPY &&
				n.push(
					o(Gg, {
						content: e,
						className: ht('btn'),
						style: {
							backgroundColor: t.accentBgColor,
							color: t.accentFgColor,
						},
					}),
				),
			o('div', { className: ht('btns') }, n)
		);
	}
	var zg = d(() => {
		'use strict';
		s();
		P();
		Ko();
		Hg();
	});
	var Wg,
		qg = d(() => {
			'use strict';
			s();
			P();
			Ko();
			Wg = ({ theme: e, useHljs: t, lang: n, content: i, tokens: r }) => {
				let a;
				if (t)
					try {
						let { value: u } = mn.highlight(n, i, !0);
						a = u
							.split(
								`
`,
							)
							.map((m, y) =>
								o('span', {
									key: y,
									dangerouslySetInnerHTML: { __html: m },
								}),
							);
					} catch {
						a = i
							.split(
								`
`,
							)
							.map((u) => o('span', null, u));
					}
				else
					a = (
						r ??
						i
							.split(
								`
`,
							)
							.map((m) => [{ color: e.plainColor, content: m }])
					).map((m) =>
						m.length === 0
							? o(
									'span',
									null,
									`
`,
							  )
							: o(
									p,
									null,
									m.map(
										(
											{
												content: y,
												color: h,
												fontStyle: b,
											},
											x,
										) =>
											o(
												'span',
												{
													key: x,
													style: {
														color: h,
														fontStyle:
															(b ?? 0) & 1
																? 'italic'
																: void 0,
														fontWeight:
															(b ?? 0) & 2
																? 'bold'
																: void 0,
														textDecoration:
															(b ?? 0) & 4
																? 'underline'
																: void 0,
													},
												},
												y,
											),
									),
							  ),
					);
				let l = a.map((u, m) =>
					o(
						'tr',
						{ key: m },
						o('td', { style: { color: e.plainColor } }, m + 1),
						o('td', null, u),
					),
				);
				return o('table', { className: ht('table') }, ...l);
			};
		});
	function Kg({ langName: e, useDevIcon: t, shikiLang: n }) {
		return e
			? o(
					'div',
					{ className: ht('lang') },
					t !== 'DISABLED' &&
						n?.devicon &&
						o('i', {
							className: `${ht('devicon')} devicon-${n.devicon}${
								t === 'COLOR' ? ' colored' : ''
							}`,
						}),
					e,
			  )
			: o(p, null);
	}
	var Yg = d(() => {
		'use strict';
		s();
		qo();
		Ko();
	});
	var cr,
		s1,
		Qg = d(() => {
			'use strict';
			s();
			J();
			B();
			Ag();
			P();
			lr();
			Go();
			_g();
			Pc();
			Og();
			Ko();
			zg();
			qg();
			Yg();
			(cr = (e) =>
				o(
					'pre',
					{ className: ht('container') },
					o(N, null, o(s1, { ...e })),
				)),
				(s1 = ({
					lang: e,
					content: t,
					isPreview: n,
					tempSettings: i,
				}) => {
					let {
							tryHljs: r,
							useDevIcon: a,
							bgOpacity: l,
						} = Dg(['tryHljs', 'useDevIcon', 'bgOpacity'], i),
						{ id: u, theme: m } = Pg(),
						y = e ? In(e) : null,
						h = $g({ lang: e, tryHljs: r }),
						[b, x] = Rg(!0),
						[S] = Me(
							async () =>
								!y || h || !x
									? null
									: await q.tokenizeCode(t, e),
							{ fallbackValue: null, deps: [e, t, u, x] },
						),
						A = {
							plainColor: m?.fg || 'var(--text-normal)',
							accentBgColor:
								m?.colors?.['statusBar.background'] ||
								(h ? '#7289da' : '#007BC8'),
							accentFgColor:
								m?.colors?.['statusBar.foreground'] || '#FFF',
							backgroundColor:
								m?.colors?.['editor.background'] ||
								'var(--background-secondary)',
						},
						M;
					return (
						e && (M = h ? mn?.getLanguage?.(e)?.name : y?.name),
						o(
							'div',
							{
								ref: b,
								className: ht('root', {
									plain: !M,
									preview: n,
								}),
								style: {
									backgroundColor: h
										? A.backgroundColor
										: `rgba(${Fg(A.backgroundColor)
												.concat(l / 100)
												.join(', ')})`,
									color: A.plainColor,
								},
							},
							o(
								'code',
								null,
								o(Kg, {
									langName: M,
									useDevIcon: a,
									shikiLang: y,
								}),
								o(Wg, {
									theme: A,
									useHljs: h,
									lang: e,
									content: t,
									tokens: S,
								}),
								!n && o(jg, { content: t, theme: A }),
							),
						)
					);
				});
		});
	var Xg,
		Jg,
		Zg = d(() => {
			'use strict';
			s();
			(Xg = new Map()),
				(Jg = () => {
					Xg.forEach((e) => e.remove()), Xg.clear();
				});
		});
	var Rc,
		Vg = d(() => {
			'use strict';
			s();
			gg();
			It();
			T();
			v();
			yg();
			Go();
			Qg();
			Mc();
			Nc();
			qo();
			Zg();
			Rc = f({
				name: 'ShikiCodeblocks',
				description:
					'Brings vscode-style codeblocks into Discord, powered by Shiki',
				authors: [c.Vap],
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
					rn.store.useDevIcon !== 'DISABLED' && Ot(Wo),
						await q.init(rn.store.customTheme || rn.store.theme);
				},
				stop: () => {
					q.destroy(), Jg();
				},
				settingsAboutComponent: ({ tempSettings: e }) =>
					cr({
						lang: 'tsx',
						content: hg,
						isPreview: !0,
						tempSettings: e,
					}),
				settings: rn,
				shiki: q,
				createHighlighter: cr,
				renderHighlighter: ({ lang: e, content: t }) =>
					cr({ lang: e, content: t, isPreview: !1 }),
			});
		});
	var eh = d(() => {});
	function oh(e) {
		th = e;
	}
	function ih(e) {
		nh = e;
	}
	function f1({ channel: e }) {
		let {
				type: t,
				topic: n,
				lastMessageId: i,
				defaultForumLayout: r,
				lastPinTimestamp: a,
				defaultAutoArchiveDuration: l,
				availableTags: u,
				id: m,
				rateLimitPerUser: y,
				defaultThreadRateLimitPerUser: h,
				defaultSortOrder: b,
				defaultReactionEmoji: x,
				bitrate: S,
				rtcRegion: A,
				videoQualityMode: M,
				permissionOverwrites: j,
			} = e,
			X = [],
			_ = de.getGuild(e.guild_id).ownerId;
		return (
			Qe.getMember(e.guild_id, _) || X.push(_),
			Object.values(j).forEach(({ type: Q, id: ae }) => {
				Q === 1 && (Qe.getMember(e.guild_id, ae) || X.push(ae));
			}),
			X.length > 0 &&
				I.dispatch({
					type: 'GUILD_MEMBERS_REQUEST',
					guildIds: [e.guild_id],
					userIds: X,
				}),
			o(
				'div',
				{ className: a1.auto + ' shc-lock-screen-outer-container' },
				o(
					'div',
					{ className: 'shc-lock-screen-container' },
					o('img', { className: 'shc-lock-screen-logo', src: m1 }),
					o(
						'div',
						{ className: 'shc-lock-screen-heading-container' },
						o(
							z,
							{ variant: 'heading-xxl/bold' },
							'This is a ',
							ke.can(Ac, e) ? 'locked' : 'hidden',
							' ',
							c1[t],
							' channel.',
						),
						e.isNSFW() &&
							o(
								Z,
								{ text: 'NSFW' },
								({ onMouseLeave: Q, onMouseEnter: ae }) =>
									o(
										'svg',
										{
											onMouseLeave: Q,
											onMouseEnter: ae,
											className:
												'shc-lock-screen-heading-nsfw-icon',
											width: '32',
											height: '32',
											viewBox: '0 0 48 48',
											'aria-hidden': !0,
											role: 'img',
										},
										o('path', {
											d: 'M.7 43.05 24 2.85l23.3 40.2Zm23.55-6.25q.75 0 1.275-.525.525-.525.525-1.275 0-.75-.525-1.3t-1.275-.55q-.8 0-1.325.55-.525.55-.525 1.3t.55 1.275q.55.525 1.3.525Zm-1.85-6.1h3.65V19.4H22.4Z',
										}),
									),
							),
					),
					!e.isGuildVoice() &&
						!e.isGuildStageVoice() &&
						o(
							z,
							{ variant: 'text-lg/normal' },
							'You can not see the ',
							e.isForumChannel() ? 'posts' : 'messages',
							' of this channel.',
							e.isForumChannel() &&
								n &&
								n.length > 0 &&
								'However you may see its guidelines:',
						),
					e.isForumChannel() &&
						n &&
						n.length > 0 &&
						o(
							'div',
							{ className: 'shc-lock-screen-topic-container' },
							Ce.parseTopic(n, !1, { channelId: m }),
						),
					i &&
						o(
							z,
							{ variant: 'text-md/normal' },
							'Last ',
							e.isForumChannel() ? 'post' : 'message',
							' created:',
							o(Kt, { timestamp: Tt(Ln.extractTimestamp(i)) }),
						),
					a &&
						o(
							z,
							{ variant: 'text-md/normal' },
							'Last message pin: ',
							o(Kt, { timestamp: Tt(a) }),
						),
					(y ?? 0) > 0 &&
						o(
							z,
							{ variant: 'text-md/normal' },
							'Slowmode: ',
							jo(y, 'seconds'),
						),
					(h ?? 0) > 0 &&
						o(
							z,
							{ variant: 'text-md/normal' },
							'Default thread slowmode: ',
							jo(h, 'seconds'),
						),
					(e.isGuildVoice() || e.isGuildStageVoice()) &&
						S != null &&
						o(
							z,
							{ variant: 'text-md/normal' },
							'Bitrate: ',
							S,
							' bits',
						),
					A !== void 0 &&
						o(
							z,
							{ variant: 'text-md/normal' },
							'Region: ',
							A ?? 'Automatic',
						),
					(e.isGuildVoice() || e.isGuildStageVoice()) &&
						o(
							z,
							{ variant: 'text-md/normal' },
							'Video quality mode: ',
							d1[M ?? 1],
						),
					(l ?? 0) > 0 &&
						o(
							z,
							{ variant: 'text-md/normal' },
							'Default inactivity duration before archiving ',
							e.isForumChannel() ? 'posts' : 'threads',
							':',
							' ' + jo(l, 'minutes'),
						),
					r != null &&
						o(
							z,
							{ variant: 'text-md/normal' },
							'Default layout: ',
							u1[r],
						),
					b != null &&
						o(
							z,
							{ variant: 'text-md/normal' },
							'Default sort order: ',
							p1[b],
						),
					x != null &&
						o(
							'div',
							{
								className:
									'shc-lock-screen-default-emoji-container',
							},
							o(
								z,
								{ variant: 'text-md/normal' },
								'Default reaction emoji:',
							),
							o(th, {
								node: {
									type: x.emojiName ? 'emoji' : 'customEmoji',
									name: x.emojiName ?? '',
									emojiId: x.emojiId,
								},
							}),
						),
					e.hasFlag(16) &&
						o(
							z,
							{ variant: 'text-md/normal' },
							'Posts on this forum require a tag to be set.',
						),
					u &&
						u.length > 0 &&
						o(
							'div',
							{ className: 'shc-lock-screen-tags-container' },
							o(
								z,
								{ variant: 'text-lg/bold' },
								'Available tags:',
							),
							o(
								'div',
								{ className: 'shc-lock-screen-tags' },
								u.map((Q) => o(l1, { tag: Q })),
							),
						),
					o(
						'div',
						{
							className:
								'shc-lock-screen-allowed-users-and-roles-container',
						},
						o(
							z,
							{ variant: 'text-lg/bold' },
							'Allowed users and roles:',
						),
						o(nh, { channel: e }),
					),
				),
			)
		);
	}
	var th,
		nh,
		a1,
		l1,
		c1,
		p1,
		u1,
		d1,
		m1,
		rh,
		sh = d(() => {
			'use strict';
			s();
			J();
			B();
			zo();
			D();
			P();
			Lc();
			(a1 = C('auto', 'content', 'scrollerBase')),
				(l1 = Y(() =>
					he((e) => {
						if (typeof e != 'function') return !1;
						let t = Function.prototype.toString.call(e);
						return (
							t.includes(
								'.Messages.FORUM_TAG_A11Y_FILTER_BY_TAG',
							) && !t.includes('increasedActivityPill')
						);
					}),
				)),
				(c1 = {
					[0]: 'text',
					[5]: 'announcement',
					[15]: 'forum',
					[2]: 'voice',
					[13]: 'stage',
				}),
				(p1 = { [0]: 'Latest activity', [1]: 'Creation date' }),
				(u1 = {
					[0]: 'Not set',
					[1]: 'List view',
					[2]: 'Gallery view',
				}),
				(d1 = { [1]: 'Automatic', [2]: '720p' }),
				(m1 = '/assets/433e3ec4319a9d11b0cbe39342614982.svg');
			rh = N.wrap(f1);
		});
	var ah,
		Ac,
		Ec,
		to,
		Dc,
		Lc = d(() => {
			'use strict';
			s();
			eh();
			E();
			J();
			T();
			Zi();
			v();
			D();
			P();
			sh();
			(ah = C('channelName', 'subtitle', 'modeMuted', 'iconContainer')),
				(Ac = 1n << 10n),
				(Ec = 1n << 20n),
				(to = V({
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
				})),
				(Dc = f({
					name: 'ShowHiddenChannels',
					description:
						'Show channels that you do not have access to view.',
					authors: [
						c.BigDuck,
						c.AverageReactEnjoyer,
						c.D3SOX,
						c.Ven,
						c.Nuckyz,
						c.Nickyux,
						c.dzshn,
					],
					settings: to,
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
									match: /(?=\|\|\i\.default\.selectVoiceChannel\((\i)\.id\))/,
									replace: (e, t) =>
										`||$self.isHiddenChannel(${t})`,
								},
								{
									match: /(?<=\|\|\i\.default\.selectVoiceChannel\((\i)\.id\);!__OVERLAY__&&\()/,
									replace: (e, t) =>
										`$self.isHiddenChannel(${t},true)||`,
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
							predicate: () => to.store.showMode === 0,
							replacement: {
								match: /(?=switch\((\i)\.type\).{0,30}\.GUILD_ANNOUNCEMENT.{0,30}\(0,\i\.\i\))/,
								replace: (e, t) =>
									`if($self.isHiddenChannel(${t}))return $self.LockIcon;`,
							},
						},
						{
							find: '.UNREAD_HIGHLIGHT',
							predicate: () => to.store.showMode === 1,
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
										to.store.hideUnreads === !1 &&
										to.store.showMode === 1,
									match: /\.LOCKED:\i(?<=(\i)=\i\.channel,.+?)/,
									replace: (e, t) =>
										`${e}&&!$self.isHiddenChannel(${t})`,
								},
								{
									predicate: () =>
										to.store.hideUnreads === !0,
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
									match: /(?<=renderHeaderToolbar=function.+?case \i\.\i\.GUILD_FORUM:if\(!\i\){)(?=.+?;(.+?{channel:(\i)},"notifications"\)\)))/,
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
							find: 'jumboable?"jumbo":"default"',
							replacement: {
								match: /jumboable\?"jumbo":"default",emojiId.+?}}\)},(?<=(\i)=function\(\i\){var \i=\i\.node.+?)/,
								replace: (e, t) =>
									`${e}shcEmojiComponentExport=($self.setEmojiComponent(${t}),void 0),`,
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
										`${e}!Vencord.Webpack.Common.PermissionStore.can(${Ec}n,${t})?${n}CONNECT):`,
								},
								{
									match: /permissionOverwrites\[.+?\i=(?<=context:(\i)}.+?)(?=(.+?)VIEW_CHANNEL)/,
									replace: (e, t, n) =>
										`${e}!Vencord.Webpack.Common.PermissionStore.can(${Ec}n,${t})?${n}CONNECT):`,
								},
								{
									match: /MANAGE_ROLES.{0,60}?return(?=\(.+?(\(0,\i\.jsxs\)\("div",{className:\i\(\)\.members.+?guildId:(\i)\.guild_id.+?roleColor.+?]}\)))/,
									replace: (e, t, n) => (
										(t = t.replace(
											Ji(/(?<=users:\i)/),
											`,channel:${n}`,
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
									match: /"recents".+?null,(?=.{0,120}?channelId:(\i)\.id)/,
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
					setEmojiComponent: oh,
					setChannelBeginHeaderComponent: ih,
					isHiddenChannel(e, t = !1) {
						return !e ||
							(e.channelId && (e = G.getChannel(e.channelId)),
							!e ||
								e.isDM() ||
								e.isGroupDM() ||
								e.isMultiUserDM())
							? !1
							: !ke.can(Ac, e) || (t && !ke.can(Ec, e));
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
							for (let a of r)
								(a.channel.id === null ||
									!this.isHiddenChannel(a.channel)) &&
									n[i].push(a);
						}
						return n;
					},
					HiddenChannelLockScreen: (e) => o(rh, { channel: e }),
					LockIcon: () =>
						o(
							'svg',
							{
								className: ah.icon,
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
					HiddenChannelIcon: N.wrap(
						() =>
							o(
								Z,
								{ text: 'Hidden Channel' },
								({ onMouseLeave: e, onMouseEnter: t }) =>
									o(
										'svg',
										{
											onMouseLeave: e,
											onMouseEnter: t,
											className:
												ah.icon +
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
	function g1(e) {
		let [t, n] = w.useState(!1);
		return (
			w.useEffect(() => {
				let i = (r, a) => {
					t &&
						(n(!1),
						a.content.startsWith('@silent ') ||
							(a.content = '@silent ' + a.content));
				};
				return ze(i), () => void We(i);
			}, [t]),
			e.type.analyticsName !== 'normal'
				? null
				: o(Z, { text: 'Toggle Silent Message' }, (i) =>
						o(
							'div',
							{ style: { display: 'flex' } },
							o(
								L,
								{
									...i,
									onClick: () => n((r) => !r),
									size: '',
									look: un.BLANK,
									innerClassName: vt.button,
									style: { margin: '0px 8px' },
								},
								o(
									'div',
									{ className: vt.buttonWrapper },
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
	var _c,
		lh = d(() => {
			'use strict';
			s();
			Ft();
			J();
			T();
			v();
			P();
			_c = f({
				name: 'SilentMessageToggle',
				authors: [c.Nuckyz],
				description:
					'Adds a button to the chat bar to toggle sending a silent message.',
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
				SilentMessageToggle: N.wrap(g1, { noop: !0 }),
			});
		});
	function h1(e) {
		let { isEnabled: t } = qt.use(['isEnabled']),
			n = () => (qt.store.isEnabled = !qt.store.isEnabled);
		return e.type.analyticsName !== 'normal'
			? null
			: o(
					Z,
					{
						text: t
							? 'Disable silent typing'
							: 'Enable silent typing',
					},
					(i) =>
						o(
							'div',
							{ style: { display: 'flex' } },
							o(
								L,
								{
									...i,
									onClick: n,
									size: '',
									look: un.BLANK,
									innerClassName: vt.button,
									style: { margin: '0 8px 0' },
								},
								o(
									'div',
									{ className: vt.buttonWrapper },
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
	var qt,
		Fc,
		ch = d(() => {
			'use strict';
			s();
			Re();
			E();
			J();
			T();
			v();
			P();
			qt = V({
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
			Fc = f({
				name: 'SilentTyping',
				authors: [c.Ven, c.dzshn],
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
						predicate: () => qt.store.showIcon,
						replacement: {
							match: /(.)\.push.{1,30}disabled:(\i),.{1,20}\},"gift"\)\)/,
							replace:
								'$&;try{$2||$1.push($self.chatBarIcon(arguments[0]))}catch{}',
						},
					},
				],
				dependencies: ['CommandsAPI'],
				settings: qt,
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
							(qt.store.isEnabled = !!ue(
								e,
								'value',
								!qt.store.isEnabled,
							)),
								H(t.channel.id, {
									content: qt.store.isEnabled
										? 'Silent typing enabled!'
										: 'Silent typing disabled!',
								});
						},
					},
				],
				async startTyping(e) {
					qt.store.isEnabled ||
						I.dispatch({
							type: 'TYPING_START_LOCAL',
							channelId: e,
						});
				},
				chatBarIcon: N.wrap(h1, { noop: !0 }),
			});
		});
	var Oc,
		ph = d(() => {
			'use strict';
			s();
			ct();
			T();
			v();
			P();
			$c();
			Oc = f({
				name: 'SortFriendRequests',
				authors: [c.Megu],
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
									k.plugins.SortFriendRequests.showDates,
								match: /(user:(\w{1,3}),.{10,30}),subText:(\w{1,3}),(.{10,30}userInfo}\))/,
								replace: (e, t, n, i, r) => `${t},
                subText: Vencord.Plugins.plugins.SortFriendRequests.makeSubtext(${i}, ${n}),
                ${r}`,
							},
						],
					},
				],
				getSince(e) {
					return new Date(Xe.getSince(e.id));
				},
				makeSubtext(e, t) {
					let n = this.getSince(t);
					return o(
						pe,
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
	var uh = d(() => {});
	var ee,
		dh = d(() => {
			'use strict';
			s();
			E();
			Ke();
			ln();
			D();
			P();
			ee = Ue(() => {
				let { Store: e } = Rr,
					t = C('getActiveSocketAndDevice'),
					n = C('SpotifyAPIMarker'),
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
					openExternal(u) {
						let m = k.plugins.SpotifyControls.useSpotifyUris
							? 'spotify:' +
							  u.replaceAll('/', (y, h) => (h === 0 ? '' : ':'))
							: 'https://open.spotify.com' + u;
						VencordNative.ipc.invoke($.OPEN_EXTERNAL, m);
					}
					get position() {
						let u = this.mPosition;
						return (
							this.isPlaying && (u += Date.now() - this.start), u
						);
					}
					set position(u) {
						(this.mPosition = u), (this.start = Date.now());
					}
					prev() {
						this.req('post', '/previous');
					}
					next() {
						this.req('post', '/next');
					}
					setVolume(u) {
						this.req('put', '/volume', {
							query: { volume_percent: Math.round(u) },
						}).then(() => {
							(this.volume = u), this.emitChange();
						});
					}
					setPlaying(u) {
						this.req('put', u ? '/play' : '/pause');
					}
					setRepeat(u) {
						this.req('put', '/repeat', { query: { state: u } });
					}
					setShuffle(u) {
						this.req('put', '/shuffle', {
							query: { state: u },
						}).then(() => {
							(this.shuffle = u), this.emitChange();
						});
					}
					seek(u) {
						return this.isSettingPosition
							? Promise.resolve()
							: ((this.isSettingPosition = !0),
							  this.req('put', '/seek', {
									query: { position_ms: Math.round(u) },
							  }).catch((m) => {
									console.error(
										'[VencordSpotifyControls] Failed to seek',
										m,
									),
										(this.isSettingPosition = !1);
							  }));
					}
					req(u, m, y = {}) {
						this.device?.is_active &&
							((y.query ??= {}).device_id = this.device.id);
						let { socket: h } = t.getActiveSocketAndDevice();
						return n[u](h.accountId, h.accessToken, {
							url: i + m,
							...y,
						});
					}
				}
				let a = new r(I, {
					SPOTIFY_PLAYER_STATE(l) {
						(a.track = l.track),
							(a.device = l.device ?? null),
							(a.isPlaying = l.isPlaying ?? !1),
							(a.volume = l.volumePercent ?? 0),
							(a.repeat = l.actual_repeat || 'off'),
							(a.position = l.position ?? 0),
							(a.isSettingPosition = !1),
							a.emitChange();
					},
					SPOTIFY_SET_DEVICES({ devices: l }) {
						(a.device = l.find((u) => u.is_active) ?? l[0] ?? null),
							a.emitChange();
					},
				});
				return a;
			});
		});
	function Bc(e) {
		let t = e / 1e3 / 60,
			n = Math.floor(t),
			i = Math.floor((t - n) * 60);
		return `${n.toString().padStart(2, '0')}:${i
			.toString()
			.padStart(2, '0')}`;
	}
	function no(e, t) {
		return () =>
			o(
				'svg',
				{
					className: me(ie('button-icon'), ie(t)),
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
	function Yo(e) {
		return o('button', { className: ie('button'), ...e }, e.children);
	}
	function w1({ name: e, path: t }) {
		let n = `spotify-copy-${e}`,
			i = `spotify-open-${e}`;
		return o(
			le.ContextMenu,
			{
				navId: `spotify-${e}-menu`,
				onClose: () => I.dispatch({ type: 'CONTEXT_MENU_CLOSE' }),
				'aria-label': `Spotify ${e} Menu`,
			},
			o(le.MenuItem, {
				key: n,
				id: n,
				label: `Copy ${e} Link`,
				action: () => gn('https://open.spotify.com' + t),
			}),
			o(le.MenuItem, {
				key: i,
				id: i,
				label: `Open ${e} in Spotify`,
				action: () => ee.openExternal(t),
			}),
		);
	}
	function Uc(e, t) {
		return (n) => ri.open(n, () => o(w1, { name: e, path: t }));
	}
	function P1() {
		let [e, t, n] = Je([ee], () => [ee.isPlaying, ee.shuffle, ee.repeat]),
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
			pe,
			{ className: ie('button-row'), style: { gap: 0 } },
			o(
				Yo,
				{
					className: me(
						ie('button'),
						ie(t ? 'shuffle-on' : 'shuffle-off'),
					),
					onClick: () => ee.setShuffle(!t),
				},
				o(x1, null),
			),
			o(Yo, { onClick: () => ee.prev() }, o(S1, null)),
			o(
				Yo,
				{ onClick: () => ee.setPlaying(!e) },
				e ? o(b1, null) : o(y1, null),
			),
			o(Yo, { onClick: () => ee.next() }, o(v1, null)),
			o(
				Yo,
				{
					className: me(ie('button'), ie(r)),
					onClick: () => ee.setRepeat(i),
					style: { position: 'relative' },
				},
				n === 'track' && o('span', { className: ie('repeat-1') }, '1'),
				o(T1, null),
			),
		);
	}
	function k1() {
		let { duration: e } = ee.track,
			[t, n, i] = Je([ee], () => [
				ee.mPosition,
				ee.isSettingPosition,
				ee.isPlaying,
			]),
			[r, a] = Ie(t);
		return (
			rt(() => {
				if (i && !n) {
					a(ee.position);
					let l = setInterval(() => {
						a((u) => u + 1e3);
					}, 1e3);
					return () => clearInterval(l);
				}
			}, [t, n, i]),
			o(
				'div',
				{ id: ie('progress-bar') },
				o(
					g.FormText,
					{
						variant: 'text-xs/medium',
						className: ie('progress-time') + ' ' + ie('time-left'),
						'aria-label': 'Progress',
					},
					Bc(r),
				),
				o(mh, {
					minValue: 0,
					maxValue: e,
					value: r,
					onChange: (l) => {
						n || (a(l), I1(l));
					},
					renderValue: Bc,
				}),
				o(
					g.FormText,
					{
						variant: 'text-xs/medium',
						className: ie('progress-time') + ' ' + ie('time-right'),
						'aria-label': 'Total Duration',
					},
					Bc(e),
				),
			)
		);
	}
	function C1({ track: e }) {
		let t = Je([ee], () => ee.volume);
		return o(
			le.ContextMenu,
			{
				navId: 'spotify-album-menu',
				onClose: () => I.dispatch({ type: 'CONTEXT_MENU_CLOSE' }),
				'aria-label': 'Spotify Album Menu',
			},
			o(le.MenuItem, {
				key: 'open-album',
				id: 'open-album',
				label: 'Open Album',
				action: () => ee.openExternal(`/album/${e.album.id}`),
			}),
			o(le.MenuItem, {
				key: 'view-cover',
				id: 'view-cover',
				label: 'View Album Cover',
				action: () =>
					Vencord.Plugins.plugins.ViewIcons.openImage(
						e.album.image.url,
					),
			}),
			o(le.MenuControlItem, {
				id: 'spotify-volume',
				key: 'spotify-volume',
				label: 'Volume',
				control: (n, i) =>
					o(mh, {
						...n,
						ref: i,
						value: t,
						minValue: 0,
						maxValue: 100,
						onChange: Nt((r) => ee.setVolume(r)),
					}),
			}),
		);
	}
	function M1({ track: e }) {
		let t = e?.album?.image,
			[n, i] = Ie(!1),
			r = o(
				p,
				null,
				t &&
					o('img', {
						id: ie('album-image'),
						src: t.url,
						alt: 'Album Image',
						onClick: () => i(!n),
						onContextMenu: (a) => {
							ri.open(a, () => o(C1, { track: e }));
						},
					}),
			);
		return n && t
			? o('div', { id: ie('album-expanded-wrapper') }, r)
			: o(
					'div',
					{ id: ie('info-wrapper') },
					r,
					o(
						'div',
						{ id: ie('titles') },
						o(
							g.FormText,
							{
								variant: 'text-sm/semibold',
								id: ie('song-title'),
								className: ie('ellipoverflow'),
								role: e.id ? 'link' : void 0,
								title: e.name,
								onClick: e.id
									? () => {
											ee.openExternal(`/track/${e.id}`);
									  }
									: void 0,
								onContextMenu: e.id
									? Uc('Song', `/track/${e.id}`)
									: void 0,
							},
							e.name,
						),
						e.artists.some((a) => a.name) &&
							o(
								g.FormText,
								{
									variant: 'text-sm/normal',
									className: ie('ellipoverflow'),
								},
								'by\xA0',
								e.artists.map((a, l) =>
									o(
										w.Fragment,
										{ key: a.name },
										o(
											Ne,
											{
												className: ie('artist'),
												disabled: !a.id,
												href: `https://open.spotify.com/artist/${a.id}`,
												style: { fontSize: 'inherit' },
												title: a.name,
												onContextMenu: Uc(
													'Artist',
													`/artist/${a.id}`,
												),
											},
											a.name,
										),
										l !== e.artists.length - 1 &&
											o(
												'span',
												{ className: ie('comma') },
												', ',
											),
									),
								),
							),
						e.album.name &&
							o(
								g.FormText,
								{
									variant: 'text-sm/normal',
									className: ie('ellipoverflow'),
								},
								'on\xA0',
								o(
									Ne,
									{
										id: ie('album-title'),
										href: `https://open.spotify.com/album/${e.album.id}`,
										target: '_blank',
										className: ie('album'),
										disabled: !e.album.id,
										style: { fontSize: 'inherit' },
										title: e.album.name,
										onContextMenu: Uc(
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
	function fh() {
		let e = Je(
				[ee],
				() => ee.track,
				null,
				(a, l) => (a?.id ? a.id === l?.id : a?.name === l?.name),
			),
			t = Je(
				[ee],
				() => ee.device,
				null,
				(a, l) => a?.id === l?.id,
			),
			n = Je([ee], () => ee.isPlaying),
			[i, r] = Ie(!1);
		return (
			w.useEffect(() => {
				if ((r(!1), !n)) {
					let a = setTimeout(() => r(!0), 3e5);
					return () => clearTimeout(a);
				}
			}, [n]),
			!e || !t?.is_active || i
				? null
				: o(
						N,
						{
							fallback: () =>
								o(
									p,
									null,
									o(
										g.FormText,
										null,
										'Failed to render Spotify Modal :(',
									),
									o(
										g.FormText,
										null,
										'Check the console for errors',
									),
								),
						},
						o(
							'div',
							{ id: ie('player') },
							o(M1, { track: e }),
							o(k1, null),
							o(P1, null),
						),
				  )
		);
	}
	var ie,
		y1,
		b1,
		S1,
		v1,
		T1,
		x1,
		I1,
		mh,
		gh = d(() => {
			'use strict';
			s();
			uh();
			J();
			ct();
			Zt();
			Yn();
			B();
			D();
			P();
			dh();
			ie = (e) => `vc-spotify-${e}`;
			(y1 = no(
				'M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z',
				'play',
			)),
				(b1 = no(
					'M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z',
					'pause',
				)),
				(S1 = no(
					'M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z',
					'previous',
				)),
				(v1 = no(
					'M7.58 16.89l5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82zM16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z',
					'next',
				)),
				(T1 = no(
					'M7 7h10v1.79c0 .45.54.67.85.35l2.79-2.79c.2-.2.2-.51 0-.71l-2.79-2.79c-.31-.31-.85-.09-.85.36V5H6c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1V7zm10 10H7v-1.79c0-.45-.54-.67-.85-.35l-2.79 2.79c-.2.2-.2.51 0 .71l2.79 2.79c.31.31.85.09.85-.36V19h11c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1v3z',
					'repeat',
				)),
				(x1 = no(
					'M10.59 9.17L6.12 4.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.46 4.46 1.42-1.4zm4.76-4.32l1.19 1.19L4.7 17.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L17.96 7.46l1.19 1.19c.31.31.85.09.85-.36V4.5c0-.28-.22-.5-.5-.5h-3.79c-.45 0-.67.54-.36.85zm-.52 8.56l-1.41 1.41 3.13 3.13-1.2 1.2c-.31.31-.09.85.36.85h3.79c.28 0 .5-.22.5-.5v-3.79c0-.45-.54-.67-.85-.35l-1.19 1.19-3.13-3.14z',
					'shuffle',
				));
			(I1 = Nt((e) => {
				ee.seek(e);
			})),
				(mh = Y(() => {
					let e = R.byCode('sliderContainer');
					return he((t) => t.render && e(t.render));
				}));
		});
	function hh(e) {
		if (
			(document.getElementById('vc-spotify-hover-controls')?.remove(), e)
		) {
			let t = document.createElement('style');
			(t.id = 'vc-spotify-hover-controls'),
				(t.textContent = `
.vc-spotify-button-row { height: 0; opacity: 0; will-change: height, opacity; transition: height .2s, opacity .05s; }
#vc-spotify-player:hover .vc-spotify-button-row { opacity: 1; height: 32px; }
`),
				document.head.appendChild(t);
		}
	}
	var Gc,
		yh = d(() => {
			'use strict';
			s();
			E();
			T();
			v();
			gh();
			Gc = f({
				name: 'SpotifyControls',
				description: 'Spotify Controls',
				authors: [c.Ven, c.afn, c.KraXen72],
				dependencies: ['MenuItemDeobfuscatorAPI'],
				options: {
					hoverControls: {
						description: 'Show controls on hover',
						type: 3,
						default: !1,
						onChange: (e) => hh(e),
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
				start: () => hh(k.plugins.SpotifyControls.hoverControls),
				renderPlayer: () => o(fh, null),
			});
		});
	var Hc,
		jc,
		bh = d(() => {
			'use strict';
			s();
			E();
			T();
			v();
			Hc = V({
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
			});
			ce('SpotifyCrack', 'Ify');
			jc = f({
				name: 'SpotifyCrack',
				description:
					'Free listen along, no auto-pausing in voice chat, and allows activity to continue playing when idling',
				authors: [c.Cyn, c.Nuckyz],
				settings: Hc,
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
								predicate: () => Hc.store.noSpotifyAutoPause,
								match: /(?<=function \i\(\){)(?=.{0,200}SPOTIFY_AUTO_PAUSED\))/,
								replace: 'return;',
							},
							{
								predicate: () =>
									Hc.store.keepSpotifyActivityOnIdle,
								match: /(?<=shouldShowActivity=function\(\){.{0,50})&&!\i\.\i\.isIdle\(\)/,
								replace: '',
							},
						],
					},
				],
			});
		});
	function Wc(e, t) {
		t = { invalidEmojis: [], tts: !1, validNonShortcutEmojis: [], ...t };
		let n = N1.getPendingReply(e);
		Sh.sendMessage(e, t, void 0, Sh.getSendMessageOptionsForReply(n)).then(
			() => {
				n && I.dispatch({ type: 'DELETE_PENDING_REPLY', channelId: e });
			},
		);
	}
	var zc,
		Sh,
		N1,
		qc,
		vh = d(() => {
			'use strict';
			s();
			Re();
			E();
			T();
			v();
			D();
			P();
			(zc = C('getPlayerState')),
				(Sh = C('getSendMessageOptionsForReply', 'sendMessage')),
				(N1 = C('getPendingReply'));
			ce('SpotifyShareCommands', 'Sendify');
			qc = f({
				name: 'SpotifyShareCommands',
				description:
					'Share your current Spotify track, album or artist via slash command (/track, /album, /artist)',
				authors: [c.katlyn],
				dependencies: ['CommandsAPI'],
				commands: [
					{
						name: 'track',
						description: 'Send your current Spotify track to chat',
						inputType: 0,
						options: [],
						execute: (e, t) => {
							let n = zc.getTrack();
							if (n === null) {
								H(t.channel.id, {
									content:
										"You're not listening to any music.",
								});
								return;
							}
							Wc(t.channel.id, {
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
							let n = zc.getTrack();
							if (n === null) {
								H(t.channel.id, {
									content:
										"You're not listening to any music.",
								});
								return;
							}
							Wc(t.channel.id, {
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
							let n = zc.getTrack();
							if (n === null) {
								H(t.channel.id, {
									content:
										"You're not listening to any music.",
								});
								return;
							}
							Wc(t.channel.id, {
								content: n.artists[0].external_urls.spotify,
							});
						},
					},
				],
			});
		});
	var Th = {};
	te(Th, { default: () => D1 });
	function R1({ emoji: e, prefix: t, log: n, delta: i, instance: r }) {
		return o(
			w.Fragment,
			null,
			o('span', null, r.sinceStart.toFixed(3), 's'),
			o('span', null, r.sinceLast.toFixed(3), 's'),
			o('span', null, i?.toFixed(0) ?? ''),
			o('span', null, o('pre', null, e, ' ', t ?? ' ', n)),
		);
	}
	function A1({ title: e, logs: t, traceEnd: n }) {
		let i = t.find((l) => l.timestamp)?.timestamp ?? 0,
			r = i,
			a = t.map((l) => {
				let u = l.timestamp ?? r,
					m = (u - i) / 1e3,
					y = (u - r) / 1e3;
				return (r = u), { sinceStart: m, sinceLast: y };
			});
		return o(
			g.FormSection,
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
					Qo.logs.map((l, u) =>
						o(R1, { key: u, ...l, instance: a[u] }),
					),
				),
			),
		);
	}
	function L1({ trace: e }) {
		let t = e.split(`
`);
		return o(
			g.FormSection,
			{ title: 'Server Trace', tag: 'h2' },
			o(
				'code',
				null,
				o(
					pe,
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
	function E1() {
		if (!Qo?.logs) return o('div', null, 'Loading...');
		let e = Qo.logGroups.find((t) => t.serverTrace)?.serverTrace;
		return o(
			w.Fragment,
			null,
			o(A1, {
				title: 'Startup Timings',
				logs: Qo.logs,
				traceEnd: Qo.endTime_,
			}),
			o('div', { style: { marginTop: 5 } }, '\xA0'),
			e && o(L1, { trace: e }),
		);
	}
	var Qo,
		D1,
		xh = d(() => {
			'use strict';
			s();
			J();
			ct();
			D();
			P();
			Qo = C('markWithDelta', 'markAndLog', 'markAt');
			D1 = N.wrap(E1);
		});
	var Kc,
		wh = d(() => {
			'use strict';
			s();
			T();
			B();
			v();
			Kc = f({
				name: 'StartupTimings',
				description: 'Adds Startup Timings to the Settings menu',
				authors: [c.Megu],
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
				StartupTimingPage: Y(() => (xh(), Zo(Th)).default),
			});
		});
	var Ph,
		Yc,
		Ih = d(() => {
			'use strict';
			s();
			Xi();
			T();
			B();
			v();
			xn();
			P();
			_n();
			Fn();
			uc();
			(Ph = 'Vencord-SupportHelper-Dismiss'),
				(Yc = f({
					name: 'SupportHelper',
					required: !0,
					description: 'Helps me provide support to you',
					authors: [c.Ven],
					commands: [
						{
							name: 'vencord-debug',
							description: 'Send Vencord Debug info',
							predicate: (e) => e.channel.id === ci,
							execute() {
								let { RELEASE_CHANNEL: e } = window.GLOBAL_ENV;
								return {
									content: `
**Vencord Debug Info**

> Discord Branch: ${e}
> Client: ${
										typeof DiscordNative > 'u'
											? window.armcord
												? 'Armcord'
												: `Web (${navigator.userAgent})`
											: `Desktop (Electron v${Xn.electronVersion})`
									}
> Platform: ${window.navigator.platform}
> Vencord Version: ${lt}${Xn.additionalInfo}
> Outdated: ${tn}
> Enabled Plugins:
${Dn(Object.keys(se).filter(Vencord.Plugins.isPluginEnabled).join(', '))}
`.trim(),
								};
							},
						},
					],
					rememberDismiss() {
						Ht.set(Ph, lt);
					},
					start() {
						I.subscribe(
							'CHANNEL_SELECT',
							async ({ channelId: e }) => {
								if (e !== ci) return;
								let t = BigInt(U.getCurrentUser().id);
								Object.values(c).some((n) => n.id === t) ||
									(tn &&
										lt !== (await Ht.get(Ph)) &&
										Dt.show({
											title: 'Hold on!',
											body: o(
												'div',
												null,
												o(
													g.FormText,
													null,
													'You are using an outdated version of Vencord! Chances are, your issue is already fixed.',
												),
												o(
													g.FormText,
													null,
													"Please first update using the Updater Page in Settings, or use the VencordInstaller (Update Vencord Button) to do so, in case you can't access the Updater page.",
												),
											),
											onCancel: this.rememberDismiss,
											onConfirm: this.rememberDismiss,
										}));
							},
						);
					},
				}));
		});
	var Qc,
		kh = d(() => {
			'use strict';
			s();
			T();
			v();
			Qc = f({
				name: 'TimeBarAllActivities',
				description:
					'Adds the Spotify time bar to all activities if they have start and end timestamps',
				authors: [c.obscurity],
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
	function Xc({ a: e, b: t, c: n }) {
		return [
			o('strong', { key: '0' }, e),
			', ',
			o('strong', { key: '2' }, t),
			`, and ${n} others are typing...`,
		];
	}
	var _1,
		F1,
		pr,
		O1,
		Jc,
		Zc = d(() => {
			'use strict';
			s();
			E();
			J();
			T();
			v();
			D();
			P();
			(_1 = oe('"top",spacing:')),
				(F1 = oe('friendToken', 'USER_PROFILE_MODAL_OPEN')),
				(pr = V({
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
			(O1 = N.wrap(
				function ({ user: e, guildId: t }) {
					return o(
						'strong',
						{
							role: 'button',
							onClick: () => {
								F1({
									userId: e.id,
									guildId: t,
									channelId: re.getChannelId(),
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
								color: pr.store.showRoleColors
									? Qe.getMember(t, e.id)?.colorString
									: void 0,
								cursor: 'pointer',
							},
						},
						pr.store.showAvatars &&
							o(
								'div',
								{ style: { marginTop: '4px' } },
								o(_1, {
									size: 'SIZE_16',
									src: e.getAvatarURL(t, 128),
								}),
							),
						Qe.getNick(t, e.id) ||
							(!t && Xe.getNickname(e.id)) ||
							e.username,
					);
				},
				{ noop: !0 },
			)),
				(Jc = f({
					name: 'TypingTweaks',
					description:
						'Show avatars and role colours in the typing indicator',
					authors: [c.zt],
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
							predicate: () => pr.store.alternativeFormatting,
						},
					],
					settings: pr,
					buildSeveralUsers: Xc,
					mutateChildren(e, t, n) {
						if (!Array.isArray(n)) return n;
						let i = 0;
						return n.map((r) =>
							r.type === 'strong'
								? o(O1, { ...e, user: t[i++] })
								: r,
						);
					},
				}));
		});
	function sn(e, t) {
		return Qe.getNick(e, t) ?? U.getUser(t).username;
	}
	function U1({ channelId: e }) {
		let t = Je(
				[Ch],
				() => ({ ...Ch.getTypingUsers(e) }),
				null,
				(l, u) => {
					let m = Object.keys(l),
						y = Object.keys(u);
					return (
						m.length === y.length &&
						JSON.stringify(m) === JSON.stringify(y)
					);
				},
			),
			n = G.getChannel(e).guild_id;
		if (!Vc.store.includeMutedChannels && B1.isChannelMuted(n, e))
			return null;
		let i = U.getCurrentUser().id,
			r = Object.keys(t).filter(
				(l) =>
					l !== i &&
					!(Xe.isBlocked(l) && !Vc.store.includeBlockedUsers),
			),
			a;
		switch (r.length) {
			case 0:
				break;
			case 1: {
				a = ur.Messages.ONE_USER_TYPING.format({ a: sn(n, r[0]) });
				break;
			}
			case 2: {
				a = ur.Messages.TWO_USERS_TYPING.format({
					a: sn(n, r[0]),
					b: sn(n, r[1]),
				});
				break;
			}
			case 3: {
				a = ur.Messages.THREE_USERS_TYPING.format({
					a: sn(n, r[0]),
					b: sn(n, r[1]),
					c: sn(n, r[2]),
				});
				break;
			}
			default: {
				a = k.plugins.TypingTweaks.enabled
					? Xc({ a: sn(n, r[0]), b: sn(n, r[1]), c: r.length - 2 })
					: ur.Messages.SEVERAL_USERS_TYPING;
				break;
			}
		}
		return r.length > 0
			? o(Z, { text: a }, ({ onMouseLeave: l, onMouseEnter: u }) =>
					o(
						'div',
						{
							style: {
								marginLeft: 6,
								zIndex: 0,
								cursor: 'pointer',
							},
							onMouseLeave: l,
							onMouseEnter: u,
						},
						o($1, { dotRadius: 3, themed: !0 }),
					),
			  )
			: null;
	}
	var $1,
		Ch,
		B1,
		ur,
		Vc,
		ep,
		Mh = d(() => {
			'use strict';
			s();
			E();
			J();
			T();
			B();
			v();
			D();
			P();
			Zc();
			($1 = Y(() =>
				he((e) => e.type?.render?.toString()?.includes('().dots')),
			)),
				(Ch = bt('TypingStore')),
				(B1 = bt('UserGuildSettingsStore')),
				(ur = Se((e) => e.Messages?.SEVERAL_USERS_TYPING));
			(Vc = V({
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
				(ep = f({
					name: 'TypingIndicator',
					description:
						'Adds an indicator if someone is typing on a channel.',
					authors: [c.Nuckyz, c.obscurity],
					settings: Vc,
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
						o(N, { noop: !0 }, o(U1, { channelId: e })),
				}));
		});
	var tp,
		Nh = d(() => {
			'use strict';
			s();
			Ft();
			T();
			v();
			tp = f({
				name: 'Unindent',
				description: 'Trims leading indentation from codeblocks',
				authors: [c.Ven],
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
					(this.preSend = ze((e, t) => this.unindentMsg(t))),
						(this.preEdit = bn((e, t, n) => this.unindentMsg(n)));
				},
				stop() {
					We(this.preSend), Sn(this.preEdit);
				},
			});
		});
	var np,
		G1,
		op,
		Rh = d(() => {
			'use strict';
			s();
			T();
			v();
			(G1 =
				'https://raw.githubusercontent.com/facebook/react/17.0.2/scripts/error-codes/codes.json'),
				(op = f({
					name: 'ReactErrorDecoder',
					description:
						'Replaces "Minifed React Error" with the actual error.',
					authors: [c.Cyn],
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
						np = await fetch(G1)
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
						np = void 0;
					},
					decodeError(e, ...t) {
						let n = 0;
						return np?.[e]?.replace(/%s/g, () => {
							let i = t[n];
							return n++, i;
						});
					},
				}));
		});
	function z1(e) {
		let t = Math.floor(Math.random() * e.length);
		return e[t];
	}
	function W1(e) {
		e = e.toLowerCase();
		for (let t of j1) e = e.replaceAll(t[0], t[1]);
		return (
			(e = e
				.replaceAll(/([ \t\n])n/g, '$1ny')
				.replaceAll(/[lr]/g, 'w')
				.replaceAll(/([ \t\n])([a-z])/g, (t, n, i) =>
					Math.random() < 0.5 ? `${n}${i}-${i}` : `${n}${i}`,
				)
				.replaceAll(
					/([^.,!][.,!])([ \t\n])/g,
					(t, n, i) => `${n} ${z1(H1)}${i}`,
				)),
			e
		);
	}
	var H1,
		j1,
		ip,
		Ah = d(() => {
			'use strict';
			s();
			Re();
			T();
			v();
			(H1 = [
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
				(j1 = [
					['small', 'smol'],
					['cute', 'kawaii~'],
					['fluff', 'floof'],
					['love', 'luv'],
					['stupid', 'baka'],
					['what', 'nani'],
					['meow', 'nya~'],
				]);
			ip = f({
				name: 'UwUifier',
				description: 'Simply uwuify commands',
				authors: [c.echo, c.skyevg],
				dependencies: ['CommandsAPI'],
				commands: [
					{
						name: 'uwuify',
						description: 'uwuifies your messages',
						options: [vn],
						execute: (e) => ({ content: W1(ue(e, 'message', '')) }),
					},
				],
			});
		});
	var rp,
		sp,
		Lh = d(() => {
			'use strict';
			s();
			E();
			T();
			v();
			P();
			rp = {};
			ce('VoiceChatDoubleClick', 'vcDoubleClick');
			sp = f({
				name: 'VoiceChatDoubleClick',
				description:
					'Join voice chats via double click instead of single click',
				authors: [c.Ven, c.D3SOX],
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
					let n = G.getChannel(t);
					return !n || ![2, 13].includes(n.type) ? !0 : e.detail >= 2;
				},
				schedule(e, t) {
					let n = t.props.channel.id;
					if (re.getVoiceChannelId() === n) {
						e();
						return;
					}
					let i = (rp[n] ??= { timeout: void 0, i: 0 });
					clearTimeout(i.timeout),
						++i.i >= 2
							? (e(), delete rp[n])
							: (i.timeout = setTimeout(() => {
									delete rp[n];
							  }, 500));
				},
			});
		});
	function dr(e, t = k.plugins.VcNarrator) {
		if (!e) return;
		let n = new SpeechSynthesisUtterance(e),
			i = speechSynthesis.getVoices().find((r) => r.voiceURI === t.voice);
		(!i &&
			(new F('VcNarrator').error(
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
	function Eh(e, t) {
		return (
			e
				.normalize('NFKC')
				.replace(/[^\w ]/g, '')
				.trim() || t
		);
	}
	function mr(e, t, n) {
		return e
			.replaceAll('{{USER}}', Eh(t, t ? 'Someone' : ''))
			.replaceAll('{{CHANNEL}}', Eh(n, 'channel'));
	}
	function q1({ channelId: e, oldChannelId: t }, n) {
		if ((n && e !== ap && ((t = ap), (ap = e)), e !== t)) {
			if (e) return [t ? 'move' : 'join', e];
			if (t) return ['leave', t];
		}
		return ['', ''];
	}
	function Dh({ voiceStates: e }) {
		let t = re.getVoiceChannelId(),
			n = U.getCurrentUser().id;
		for (let i of e) {
			let { userId: r, channelId: a, oldChannelId: l } = i,
				u = r === n;
			if (!u && (!t || (a !== t && l !== t))) continue;
			let [m, y] = q1(i, u);
			if (!m) continue;
			let h = k.plugins.VcNarrator[m + 'Message'],
				b = u ? '' : U.getUser(r).username,
				x = G.getChannel(y).name;
			dr(mr(h, b, x));
		}
	}
	function _h() {
		let e = re.getVoiceChannelId(),
			t = Oh.getVoiceStateForChannel(e);
		if (!t) return;
		let n = t.mute || t.selfMute ? 'unmute' : 'mute';
		dr(mr(k.plugins.VcNarrator[n + 'Message'], '', G.getChannel(e).name));
	}
	function Fh() {
		let e = re.getVoiceChannelId(),
			t = Oh.getVoiceStateForChannel(e);
		if (!t) return;
		let n = t.deaf || t.selfDeaf ? 'undeafen' : 'deafen';
		dr(mr(k.plugins.VcNarrator[n + 'Message'], '', G.getChannel(e).name));
	}
	function K1(e, t) {
		let n = Object.assign({}, k.plugins.VcNarrator, e);
		dr(mr(n[t + 'Message'], U.getCurrentUser().username, 'general'), n);
	}
	var Oh,
		ap,
		lp,
		$h = d(() => {
			'use strict';
			s();
			E();
			po();
			T();
			ge();
			Be();
			zo();
			v();
			D();
			P();
			Oh = C(
				'getVoiceStatesForChannel',
				'getCurrentClientVoiceChannelId',
			);
			lp = f({
				name: 'VcNarrator',
				description:
					'Announces when users join, leave, or move voice channels via narrator',
				authors: [c.Ven],
				start() {
					if (speechSynthesis.getVoices().length === 0) {
						new F('VcNarrator').warn(
							'No Narrator voices found. Thus, this plugin will not work. Check my Settings for more info',
						);
						return;
					}
					I.subscribe('VOICE_STATE_UPDATES', Dh),
						I.subscribe('AUDIO_TOGGLE_SELF_MUTE', _h),
						I.subscribe('AUDIO_TOGGLE_SELF_DEAF', Fh);
				},
				stop() {
					I.unsubscribe('VOICE_STATE_UPDATES', Dh),
						I.subscribe('AUDIO_TOGGLE_SELF_MUTE', _h),
						I.subscribe('AUDIO_TOGGLE_SELF_DEAF', Fh);
				},
				optionsCache: null,
				get options() {
					return (this.optionsCache ??= {
						voice: {
							type: 4,
							description: 'Narrator Voice',
							options: speechSynthesis
								.getVoices()
								.map((e) => ({
									label: e.name,
									value: e.voiceURI,
									default: e.default,
								})),
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
					let [t, n] = dn(() => {
							let a = speechSynthesis.getVoices();
							return [
								a.length !== 0,
								a.some((l) => l.lang.startsWith('en')),
							];
						}, []),
						i = dn(
							() =>
								Object.keys(
									Vencord.Plugins.plugins.VcNarrator.options,
								)
									.filter((a) => a.endsWith('Message'))
									.map((a) => a.slice(0, -7)),
							[],
						),
						r = null;
					if (t)
						n ||
							(r = o(
								Xt,
								null,
								"You don't have any English voices installed, so the narrator might sound weird",
							));
					else {
						let a = 'No narrator voices found. ';
						(a += navigator.platform
							?.toLowerCase()
							.includes('linux')
							? 'Install speech-dispatcher or espeak and run Discord with the --enable-speech-dispatcher flag'
							: 'Try installing some in the Narrator settings of your Operating System'),
							(r = o(Xt, null, a));
					}
					return o(
						g.FormSection,
						null,
						o(
							g.FormText,
							null,
							'You can customise the spoken messages below. You can disable specific messages by setting them to nothing',
						),
						o(
							g.FormText,
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
								p,
								null,
								o(
									g.FormTitle,
									{ className: O.top20, tag: 'h3' },
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
									i.map((a) =>
										o(
											L,
											{ key: a, onClick: () => K1(e, a) },
											Ho([a]),
										),
									),
								),
							),
						r,
					);
				},
			});
		});
	var Y1,
		Q1,
		X1,
		Bh,
		cp,
		Uh = d(() => {
			'use strict';
			s();
			T();
			B();
			Ze();
			v();
			D();
			P();
			(Y1 = Y(() => we('.MEDIA_MODAL_CLOSE,'))),
				(Q1 = Y(() =>
					he((e) => e.type?.toString().includes('MASKED_LINK)')),
				)),
				(X1 = C('getGuildBannerURL')),
				(Bh = 'Vencord.Plugins.plugins.ViewIcons.openImage('),
				(cp = f({
					name: 'ViewIcons',
					authors: [c.Ven],
					description:
						'Makes Avatars/Banners in user profiles clickable, and adds Guild Context Menu Entries to View Banner/Icon.',
					dependencies: ['MenuItemDeobfuscatorAPI'],
					openImage(e) {
						let t = new URL(e);
						t.searchParams.set('size', '512'),
							(e = t.toString()),
							De((n) =>
								o(
									Ee,
									{ size: 'dynamic', ...n },
									o(Y1, {
										shouldAnimate: !0,
										original: e,
										src: e,
										renderLinkComponent: Q1,
									}),
								),
							);
					},
					patches: [
						{
							find: 'onAddFriend:',
							replacement: {
								match: /\{src:(.{1,2}),avatarDecoration/g,
								replace: (e, t) =>
									`{src:${t},onClick:()=>${Bh}${t}),avatarDecoration`,
							},
						},
						{
							find: '.popoutNoBannerPremium',
							replacement: {
								match: /style:.{0,10}\{\},(.{1,2})\)/,
								replace: (e, t) =>
									`onClick:${t}.backgroundImage&&(${t}.cursor="pointer",()=>${Bh}${t}.backgroundImage.replace("url(", ""))),${e}`,
							},
						},
						{
							find: '"GuildContextMenu:',
							replacement: [
								{
									match: /\w=(\w)\.id/,
									replace: '_guild=$1,$&',
								},
								{
									match: /(id:"leave-guild".{0,200}),(\(0,.{1,3}\.jsxs?\).{0,200}function)/,
									replace:
										'$1,$self.buildGuildContextMenuEntries(_guild),$2',
								},
							],
						},
					],
					buildGuildContextMenuEntries(e) {
						return o(
							le.MenuGroup,
							null,
							e.banner &&
								o(le.MenuItem, {
									id: 'view-banner',
									key: 'view-banner',
									label: 'View Banner',
									action: () =>
										this.openImage(X1.getGuildBannerURL(e)),
								}),
							e.icon &&
								o(le.MenuItem, {
									id: 'view-icon',
									key: 'view-icon',
									label: 'View Icon',
									action: () =>
										this.openImage(e.getIconURL(0, !0)),
								}),
						);
					},
				}));
		});
	function Z1(e) {
		return Object.fromEntries(
			Object.entries(e).sort(([t], [n]) => t.localeCompare(n)),
		);
	}
	function V1(e) {
		let t = Z1(JSON.parse(JSON.stringify(e)));
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
	function Gh(e) {
		return o(
			'div',
			{ style: { userSelect: 'text' } },
			Ce.defaultRules.codeBlock.react(e, null, {}),
		);
	}
	function eT(e) {
		e = V1(e);
		let t = JSON.stringify(e, null, 4),
			n = De((i) =>
				o(
					N,
					null,
					o(
						Ee,
						{ ...i, size: 'large' },
						o(
							He,
							null,
							o(
								z,
								{
									variant: 'heading-lg/semibold',
									style: { flexGrow: 1 },
								},
								'View Raw',
							),
							o(hn, { onClick: () => yn(n) }),
						),
						o(
							je,
							null,
							o(
								'div',
								{ style: { padding: '16px 0' } },
								!!e.content &&
									o(
										p,
										null,
										o(
											g.FormTitle,
											{ tag: 'h5' },
											'Content',
										),
										o(Gh, { content: e.content, lang: '' }),
										o(g.FormDivider, {
											className: O.bottom20,
										}),
									),
								o(g.FormTitle, { tag: 'h5' }, 'Message Data'),
								o(Gh, { content: t, lang: 'json' }),
							),
						),
						o(
							ut,
							null,
							o(
								pe,
								{ cellSpacing: 10 },
								o(
									L,
									{
										onClick: () =>
											gn(
												t,
												'Message data copied to clipboard!',
											),
									},
									'Copy Message JSON',
								),
								o(
									L,
									{
										onClick: () =>
											gn(
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
	var J1,
		pp,
		Hh = d(() => {
			'use strict';
			s();
			Wn();
			J();
			ct();
			T();
			Be();
			B();
			Ze();
			v();
			P();
			J1 = () =>
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
			pp = f({
				name: 'ViewRaw',
				description:
					'Copy and view the raw content/data of any message.',
				authors: [c.KingFish, c.Ven],
				dependencies: ['MessagePopoverAPI'],
				start() {
					Bt('ViewRaw', (e) => ({
						label: 'View Raw (Left Click) / Copy Raw (Right Click)',
						icon: J1,
						message: e,
						channel: G.getChannel(e.channel_id),
						onClick: () => eT(e),
						onContextMenu: (t) => {
							t.preventDefault(),
								t.stopPropagation(),
								gn(e.content);
						},
					}));
				},
				stop() {
					Ut('CopyRawMessage');
				},
			});
		});
	var up,
		jh = d(() => {
			'use strict';
			s();
			T();
			v();
			up = f({
				name: 'WebContextMenus',
				description:
					'Re-adds some of context menu items missing on the web version of Discord, namely Copy/Open Link',
				authors: [c.Ven],
				enabledByDefault: !0,
				patches: [
					{
						find: 'open-native-link',
						replacement: [
							{
								match: /if\(!\w\..{1,3}\|\|null==/,
								replace: 'if(null==',
							},
							{
								match: /\w\.default\.copy/,
								replace:
									'Vencord.Webpack.Common.Clipboard.copy',
							},
						],
					},
				],
			});
		});
	var dp,
		zh = d(() => {
			'use strict';
			s();
			T();
			v();
			dp = f({
				name: 'Webhook Tags',
				description: 'Changes the bot tag to say webhook for webhooks',
				authors: [c.Cyn],
				patches: [
					{
						find: '.BOT=0]="BOT"',
						replacement: [
							{
								match: /(.)\[.\.BOT=0\]="BOT";/,
								replace: (e, t) =>
									`${t}[${t}.WEBHOOK=99]="WEBHOOK";${e}`,
							},
							{
								match: /case (.)\.BOT:default:(.)=/,
								replace: (e, t, n) =>
									`case ${t}.WEBHOOK:${n}="WEBHOOK";break;${e}`,
							},
						],
					},
					{
						find: '.Types.ORIGINAL_POSTER',
						replacement: {
							match: /return null==(.)\?null:\(0,.{1,3}\.jsxs?\)\((.{1,3}\.\i)/,
							replace: (e, t, n) =>
								`if(arguments[0].message.webhookId&&arguments[0].user.isNonUserBot()){${t}=${n}.Types.WEBHOOK}${e}`,
						},
					},
				],
			});
		});
	function rT(e, t, n) {
		let i = t.name + (t.id ? `:${t.id}` : '');
		return ao
			.get({
				url: `/channels/${e.channel_id}/messages/${e.id}/reactions/${i}`,
				query: { limit: 100, type: n },
				oldFormErrors: !0,
			})
			.then((r) =>
				I.dispatch({
					type: 'MESSAGE_REACTION_ADD_USERS',
					channelId: e.channel_id,
					messageId: e.id,
					users: r.body,
					emoji: t,
					reactionType: n,
				}),
			)
			.catch(console.error)
			.finally(() => co(250));
	}
	function sT(e, t, n) {
		let i = `${e.id}:${t.name}:${t.id ?? ''}:${n}`,
			r = (oT.__getLocalVars().reactions[i] ??= {
				fetched: !1,
				users: {},
			});
		return (
			r.fetched || (iT.unshift(() => rT(e, t, n)), (r.fetched = !0)),
			r.users
		);
	}
	function aT(e) {
		return function (n, i) {
			return o(
				Z,
				{
					text: e
						.slice(5)
						.map((r) => r.username)
						.join(', '),
				},
				({ onMouseEnter: r, onMouseLeave: a }) =>
					o(
						'div',
						{
							className: nT.moreUsers,
							onMouseEnter: r,
							onMouseLeave: a,
						},
						'+',
						e.length - 5,
					),
			);
		};
	}
	var tT,
		nT,
		oT,
		iT,
		mp,
		Wh = d(() => {
			'use strict';
			s();
			J();
			T();
			B();
			Un();
			v();
			D();
			P();
			(tT = Y(() =>
				we('defaultRenderUser', 'showDefaultAvatarsForNullUsers'),
			)),
				(nT = C(
					'moreUsers',
					'emptyUser',
					'avatarContainer',
					'clickableAvatar',
				)),
				(oT = C('getReactions')),
				(iT = new dt());
			mp = f({
				name: 'WhoReacted',
				description: 'Renders the Avatars of reactors',
				authors: [c.Ven],
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
						: o(N, { noop: !0 }, o(this._renderUsers, { ...e }));
				},
				_renderUsers({ message: e, emoji: t, type: n }) {
					let i = wt();
					w.useEffect(() => {
						let l = (u) => {
							u.messageId === e.id && i();
						};
						return (
							I.subscribe('MESSAGE_REACTION_ADD_USERS', l),
							() => I.unsubscribe('MESSAGE_REACTION_ADD_USERS', l)
						);
					}, [e.id]);
					let r = sT(e, t, n),
						a = Object.values(r).filter(Boolean);
					for (let l of a)
						I.dispatch({ type: 'USER_UPDATE', user: l });
					return o(
						'div',
						{
							style: {
								marginLeft: '0.5em',
								transform: 'scale(0.9)',
							},
						},
						o(tT, {
							users: a,
							guildId: G.getChannel(e.channel_id)?.guild_id,
							renderIcon: !1,
							max: 5,
							showDefaultAvatarsForNullUsers: !0,
							showUserPopout: !0,
							renderMoreUsers: aT(a),
						}),
					);
				},
			});
		});
	var fp,
		qh = d(() => {
			'use strict';
			s();
			Re();
			T();
			v();
			fp = f({
				name: 'Wikisearch',
				description:
					'Searches Wikipedia for your requested query. (/wikisearch)',
				authors: [c.Samu],
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
							let n = ue(e, 'search', '');
							if (!n)
								return H(t.channel.id, {
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
									.then((m) => m.json())
									.catch(
										(m) => (
											console.log(m),
											H(t.channel.id, {
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
									H(t.channel.id, {
										content: 'No results given',
									})
								);
							let a = await fetch(
								`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info%7Cdescription%7Cimages%7Cimageinfo%7Cpageimages&list=&meta=&indexpageids=1&pageids=${r.query.search[0].pageid}&formatversion=2&origin=*`,
							)
								.then((m) => m.json())
								.then((m) => m.query.pages[0])
								.catch(
									(m) => (
										console.log(m),
										H(t.channel.id, {
											content:
												'There was an error. Check the console for more info',
										}),
										null
									),
								);
							if (!a) return;
							let l = a.thumbnail,
								u = l && {
									url: l.source.replace(
										/(50px-)/gi,
										'1000px-',
									),
									height: l.height * 100,
									width: l.width * 100,
								};
							H(t.channel.id, {
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
										image: u,
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
	var se,
		Fn = d(() => {
			s();
			Xp();
			tu();
			ou();
			iu();
			su();
			au();
			cu();
			pu();
			uu();
			du();
			mu();
			fu();
			gu();
			Su();
			vu();
			Tu();
			xu();
			wu();
			Pu();
			ku();
			Cu();
			Au();
			Lu();
			Eu();
			Ou();
			Qu();
			ed();
			td();
			nd();
			cd();
			pd();
			ud();
			bd();
			Ad();
			Ld();
			Ed();
			Dd();
			_d();
			Fd();
			Bd();
			Ud();
			jd();
			Ri();
			Xd();
			Zd();
			em();
			nm();
			rm();
			cm();
			gm();
			ym();
			bm();
			Sm();
			vm();
			Tm();
			xm();
			wm();
			Pm();
			Im();
			km();
			Cm();
			Mm();
			Nm();
			Rm();
			Am();
			Dm();
			_m();
			$m();
			Ml();
			Km();
			of();
			rf();
			yf();
			bf();
			Tf();
			xf();
			kf();
			Rf();
			uc();
			Vg();
			Lc();
			lh();
			ch();
			ph();
			yh();
			bh();
			vh();
			wh();
			Ih();
			kh();
			Mh();
			Zc();
			Nh();
			Rh();
			Ah();
			Lh();
			$h();
			Uh();
			Hh();
			jh();
			zh();
			Wh();
			qh();
			se = {
				[Br.name]: Br,
				[Hr.name]: Hr,
				[Yr.name]: Yr,
				[Qr.name]: Qr,
				[Jr.name]: Jr,
				[Zr.name]: Zr,
				[Vr.name]: Vr,
				[es.name]: es,
				[ts.name]: ts,
				[ns.name]: ns,
				[os.name]: os,
				[is.name]: is,
				[rs.name]: rs,
				[ps.name]: ps,
				[us.name]: us,
				[ds.name]: ds,
				[ms.name]: ms,
				[fs.name]: fs,
				[gs.name]: gs,
				[hs.name]: hs,
				[ys.name]: ys,
				[Is.name]: Is,
				[ks.name]: ks,
				[Cs.name]: Cs,
				[Es.name]: Es,
				[Xs.name]: Xs,
				[Zs.name]: Zs,
				[Vs.name]: Vs,
				[ea.name]: ea,
				[ia.name]: ia,
				[aa.name]: aa,
				[la.name]: la,
				[da.name]: da,
				[ga.name]: ga,
				[ha.name]: ha,
				[ya.name]: ya,
				[ba.name]: ba,
				[Sa.name]: Sa,
				[va.name]: va,
				[xa.name]: xa,
				[wa.name]: wa,
				[Ia.name]: Ia,
				[Ma.name]: Ma,
				[Na.name]: Na,
				[La.name]: La,
				[Ea.name]: Ea,
				[_a.name]: _a,
				[Oa.name]: Oa,
				[ja.name]: ja,
				[Ka.name]: Ka,
				[Ya.name]: Ya,
				[Qa.name]: Qa,
				[Xa.name]: Xa,
				[Va.name]: Va,
				[el.name]: el,
				[tl.name]: tl,
				[nl.name]: nl,
				[ol.name]: ol,
				[il.name]: il,
				[rl.name]: rl,
				[sl.name]: sl,
				[al.name]: al,
				[ll.name]: ll,
				[cl.name]: cl,
				[pl.name]: pl,
				[ul.name]: ul,
				[dl.name]: dl,
				[wl.name]: wl,
				[Rl.name]: Rl,
				[Al.name]: Al,
				[Ll.name]: Ll,
				[_l.name]: _l,
				[zl.name]: zl,
				[Wl.name]: Wl,
				[Kl.name]: Kl,
				[Yl.name]: Yl,
				[Ql.name]: Ql,
				[Jl.name]: Jl,
				[Xn.name]: Xn,
				[Rc.name]: Rc,
				[Dc.name]: Dc,
				[_c.name]: _c,
				[Fc.name]: Fc,
				[Oc.name]: Oc,
				[Gc.name]: Gc,
				[jc.name]: jc,
				[qc.name]: qc,
				[Kc.name]: Kc,
				[Yc.name]: Yc,
				[Qc.name]: Qc,
				[ep.name]: ep,
				[Jc.name]: Jc,
				[tp.name]: tp,
				[op.name]: op,
				[ip.name]: ip,
				[sp.name]: sp,
				[lp.name]: lp,
				[cp.name]: cp,
				[pp.name]: pp,
				[up.name]: up,
				[dp.name]: dp,
				[mp.name]: mp,
				[fp.name]: fp,
			};
		});
	var hp = {};
	te(hp, {
		BadgePosition: () => mi,
		addBadge: () => Pl,
		inject: () => lT,
		removeBadge: () => Il,
	});
	function Pl(e) {
		(e.component &&= N.wrap(e.component, { noop: !0 })), gp.add(e);
	}
	function Il(e) {
		return gp.delete(e);
	}
	function lT(e, t) {
		for (let n of gp)
			(!n.shouldShow || n.shouldShow(t)) &&
				(n.position === 0
					? e.unshift({ ...n, ...t })
					: e.push({ ...n, ...t }));
		return se.BadgeAPI.addDonorBadge(e, t.user.id), e;
	}
	var mi,
		gp,
		fi = d(() => {
			'use strict';
			s();
			J();
			Fn();
			(mi = ((n) => (
				(n[(n.START = 0)] = 'START'), (n[(n.END = 1)] = 'END'), n
			))(mi || {})),
				(gp = new Set());
		});
	var yp = {};
	te(yp, {
		Badges: () => mT,
		Commands: () => pT,
		ContextMenu: () => ST,
		DataStore: () => Ht,
		MemberListDecorators: () => hT,
		MessageAccessories: () => uT,
		MessageDecorations: () => gT,
		MessageEvents: () => cT,
		MessagePopover: () => dT,
		Notices: () => qi,
		Notifications: () => bT,
		ServerList: () => fT,
		Styles: () => yT,
	});
	var cT,
		qi,
		pT,
		Ht,
		uT,
		dT,
		mT,
		fT,
		gT,
		hT,
		yT,
		bT,
		ST,
		Xi = d(() => {
			'use strict';
			s();
			fi();
			Re();
			zn();
			Lt();
			hl();
			Ua();
			vl();
			Ft();
			Wn();
			gi();
			vo();
			zi();
			It();
			(cT = Ps),
				(qi = cs),
				(pT = Ls),
				(Ht = At),
				(uT = Ba),
				(dT = Ta),
				(mT = hp),
				(fT = Dl),
				(gT = Sl),
				(hT = gl),
				(yT = Os),
				(bT = Us),
				(ST = ta);
		});
	function vT(e, t, n) {
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
	var Kh = d(() => {
		'use strict';
		s();
	});
	var bp = {};
	te(bp, {
		ChangeList: () => $o,
		Constants: () => $r,
		Discord: () => pa,
		IpcEvents: () => $,
		LazyComponent: () => Y,
		Logger: () => F,
		Margins: () => O,
		Modals: () => Kr,
		Queue: () => dt,
		checkIntersecting: () => Dr,
		classes: () => me,
		copyWithToast: () => gn,
		debounce: () => Nt,
		formatDuration: () => jo,
		humanFriendlyJoin: () => ky,
		identity: () => li,
		isObject: () => Cy,
		makeCodeblock: () => Dn,
		makeLazy: () => xt,
		mergeDefaults: () => fn,
		onceDefined: () => vT,
		parseUrl: () => Er,
		proxyLazy: () => Ue,
		sleep: () => co,
		useAwaiter: () => Me,
		useForceUpdater: () => wt,
		wordsFromCamel: () => Qv,
		wordsFromKebab: () => Jv,
		wordsFromPascal: () => Cc,
		wordsFromSnake: () => Xv,
		wordsFromTitle: () => Zv,
		wordsToCamel: () => Vv,
		wordsToKebab: () => t1,
		wordsToPascal: () => n1,
		wordsToSnake: () => e1,
		wordsToTitle: () => Ho,
	});
	var Yh = d(() => {
		'use strict';
		s();
		nc();
		T();
		Yn();
		Ii();
		Ke();
		ge();
		Be();
		B();
		Ze();
		Kh();
		ln();
		Un();
		zo();
	});
	var vp = {};
	te(vp, { toggle: () => Sp });
	async function Sp(e) {
		kn
			? (kn.disabled = !e)
			: e &&
			  ((kn = document.createElement('style')),
			  (kn.id = 'vencord-custom-css'),
			  document.head.appendChild(kn),
			  VencordNative.ipc.on(
					$.QUICK_CSS_UPDATE,
					(t, n) => (kn.textContent = n),
			  ),
			  (kn.textContent = await VencordNative.ipc.invoke(
					$.GET_QUICK_CSS,
			  )));
	}
	async function Qh() {
		Xo ||
			((Xo = document.createElement('style')),
			(Xo.id = 'vencord-themes'),
			document.head.appendChild(Xo));
		let { themeLinks: e } = k,
			t = e.map((n) => `@import url("${n.trim()}");`).join(`
`);
		Xo.textContent = t;
	}
	var kn,
		Xo,
		Tp = d(() => {
			'use strict';
			s();
			E();
			Ke();
			document.addEventListener('DOMContentLoaded', () => {
				Sp(k.useQuickCss),
					Gr('useQuickCss', Sp),
					Qh(),
					Gr('themeLinks', Qh);
			});
		});
	var xp = {};
	te(xp, {
		Common: () => Lr,
		_initWebpack: () => Pr,
		_resolveReady: () => ni,
		addListener: () => Ir,
		cache: () => Et,
		extract: () => kr,
		filters: () => R,
		find: () => he,
		findAll: () => Mn,
		findBulk: () => yy,
		findByCode: () => we,
		findByCodeLazy: () => oe,
		findByProps: () => cn,
		findByPropsLazy: () => C,
		findLazy: () => Se,
		findModuleId: () => Lp,
		findStore: () => by,
		findStoreLazy: () => bt,
		listeners: () => wr,
		mapMangledModule: () => oi,
		mapMangledModuleLazy: () => ye,
		onceReady: () => xr,
		removeListener: () => ii,
		search: () => io,
		subscriptions: () => Ap,
		waitFor: () => Pe,
		wreq: () => it,
	});
	var fr = d(() => {
		'use strict';
		s();
		P();
		D();
	});
	function TT() {
		function e(t) {
			try {
				let n = t[1],
					{ subscriptions: i, listeners: r } = Vencord.Webpack,
					{ patches: a } = Vencord.Plugins;
				for (let l in n) {
					let u = n[l],
						m = u.toString().replaceAll(
							`
`,
							'',
						);
					m.startsWith('function(') && (m = '0,' + m);
					let y = u,
						h = new Set(),
						b = (n[l] = function (x, S, A) {
							try {
								u(x, S, A);
							} catch (j) {
								if (u === y) throw j;
								return (
									Cn.error('Error in patched chunk', j),
									void y(x, S, A)
								);
							}
							if (x.exports === window) {
								Object.defineProperty(A.c, l, {
									value: A.c[l],
									enumerable: !1,
									configurable: !0,
									writable: !0,
								});
								return;
							}
							let M = Number(l);
							for (let j of r)
								try {
									j(S, M);
								} catch (X) {
									Cn.error('Error in webpack listener', X);
								}
							for (let [j, X] of i)
								try {
									if (j(S)) i.delete(j), X(S, M);
									else if (typeof S == 'object') {
										S.default &&
											j(S.default) &&
											(i.delete(j), X(S.default, M));
										for (let _ in S)
											_.length <= 3 &&
												S[_] &&
												j(S[_]) &&
												(i.delete(j), X(S[_], M));
									}
								} catch (_) {
									Cn.error(
										'Error while firing callback for webpack chunk',
										_,
									);
								}
						});
					try {
						(b.toString = () => u.toString()), (b.original = y);
					} catch {}
					for (let x = 0; x < a.length; x++) {
						let S = a[x],
							A = ot(`patch by ${S.plugin}`, (M, j) =>
								m.replace(M, j),
							);
						if (
							!(S.predicate && !S.predicate()) &&
							m.includes(S.find)
						) {
							h.add(S.plugin);
							for (let M of S.replacement) {
								if (M.predicate && !M.predicate()) continue;
								let j = u,
									X = m;
								Ef(M, S.plugin);
								try {
									let _ = A(M.match, M.replace);
									_ === m && !S.noWarn
										? Cn.warn(
												`Patch by ${S.plugin} had no effect (Module id is ${l}): ${M.match}`,
										  )
										: ((m = _),
										  (u = (0,
										  eval)(`// Webpack Module ${l} - Patched by ${[
												...h,
										  ].join(', ')}
${_}
//# sourceURL=WebpackModule${l}`)));
								} catch (_) {
									Cn.error(
										`Patch by ${S.plugin} errored (Module id is ${l}): ${M.match}
`,
										_,
									),
										(m = X),
										(u = j),
										h.delete(S.plugin);
								}
							}
							S.all || a.splice(x--, 1);
						}
					}
				}
			} catch (n) {
				Cn.error('Error in handlePush', n);
			}
			return e.original.call(window[_t], t);
		}
		(e.original = window[_t].push),
			Object.defineProperty(window[_t], 'push', {
				get: () => e,
				set: (t) => (e.original = t),
				configurable: !0,
			});
	}
	var Xh,
		Cn,
		Jh = d(() => {
			'use strict';
			s();
			T();
			ge();
			Zi();
			ti();
			fr();
			Cn = new F('WebpackInterceptor', '#8caaee');
			Object.defineProperty(window, _t, {
				get: () => Xh,
				set: (e) => {
					e?.push !== Array.prototype.push &&
						(Cn.info(`Patching ${_t}.push`),
						Pr(e),
						TT(),
						delete window[_t],
						(window[_t] = e)),
						(Xh = e);
				},
				configurable: !0,
			});
		});
	var Zh = {};
	te(Zh, {
		PatchHelper: () => Df,
		PluginSettings: () => ir,
		VencordSettings: () => cc,
	});
	var Vh = d(() => {
		'use strict';
		s();
		Zl();
		lc();
		pc();
	});
	async function xT() {
		if (
			(await xr,
			rc(),
			(ey = await Promise.resolve().then(() => (Vh(), Zh))),
			!1)
		)
			try {
			} catch (e) {}
	}
	var ey,
		$c = d(() => {
			'use strict';
			s();
			Xi();
			or();
			Yh();
			Tp();
			xn();
			fr();
			Tp();
			Jh();
			vo();
			E();
			or();
			xn();
			fr();
			P();
			xT();
		});
	var wT = {};
	te(wT, {
		Api: () => yp,
		Components: () => ey,
		PlainSettings: () => eu,
		Plugins: () => ac,
		QuickCss: () => vp,
		Settings: () => k,
		Updater: () => qs,
		Util: () => bp,
		Webpack: () => xp,
	});
	s();
	s();
	Lt();
	Ke();
	var { localStorage: Cp } = window,
		vr = {},
		gy = {
			[$.GET_REPO]: () => 'https://github.com/Vendicated/Vencord',
			[$.GET_SETTINGS_DIR]: () => 'LocalStorage',
			[$.GET_QUICK_CSS]: () => xe('VencordQuickCss').then((e) => e ?? ''),
			[$.SET_QUICK_CSS]: (e) => {
				be('VencordQuickCss', e),
					vr[$.QUICK_CSS_UPDATE]?.forEach((t) => t(null, e));
			},
			[$.GET_SETTINGS]: () => Cp.getItem('VencordSettings') || '{}',
			[$.SET_SETTINGS]: (e) => Cp.setItem('VencordSettings', e),
			[$.GET_UPDATES]: () => ({ ok: !0, value: [] }),
			[$.OPEN_EXTERNAL]: (e) => open(e, '_blank'),
		};
	function Sr(e, ...t) {
		let n = gy[e];
		if (!n) throw new Error(`Event ${e} not implemented.`);
		return n(...t);
	}
	window.VencordNative = {
		getVersions: () => ({}),
		ipc: {
			send: (e, ...t) => void Sr(e, ...t),
			sendSync: Sr,
			on(e, t) {
				(vr[e] ??= new Set()).add(t);
			},
			off(e, t) {
				return vr[e]?.delete(t);
			},
			invoke: (e, ...t) => Promise.resolve(Sr(e, ...t)),
		},
	};
	$c();
	return Zo(wT);
})();
//# sourceURL=VencordWeb
/*! For license information please see browser.js.LEGAL.txt */
