! function () {
    "use strict";

    function e() {
        let e = window.webpackChunkdiscord_app.push([
            [Symbol()], {},
            e => e
        ]);
        return window.webpackChunkdiscord_app.pop(), e
    }

    function t() {
        let t = [];
        for (let n of Object.values(e().c)) n.exports && n.exports !== window && t.push(n.exports);
        return t
    }

    function n(e) {
        return t().find(e)
    }

    function r(e) {
        return t().filter(e)
    }

    function o(e, t = !1) {
        var o = t ? [] : null;
        let i = (t ? r : n)(function (n) {
            let r = e(n);
            return r && (t ? o.push(r) : o = r), r
        });
        return t ? o.map((e, t) => "string" == typeof e ? i[t][e] : i[t]) : "string" == typeof o ? i[o] : i
    }

    function i(e, t) {
        if (e?.displayName === t) return !0;
        for (let n of Object.getOwnPropertyNames(e))
            if (e[n]?.displayName === t) return n
    }

    function s(e, t) {
        var n = null;
        for (let r of t) {
            if (e && "object" == typeof e && r in e) continue;
            let o = null;
            for (let i of Object.getOwnPropertyNames(e)) {
                if ("default" !== i && i.length > 3) continue;
                let s = e[i];
                if (s && "object" == typeof s && r in s) {
                    o = i;
                    break
                }
            }
            if (!o) return;
            n = o
        }
        return n || !0
    }

    function l(t, n = !1) {
        if ("string" == typeof t) {
            let r = t;
            t = {
                test: e => !!e.includes && e.includes(r)
            }
        }
        let {
            m: o,
            c: i
        } = e(), s = Object.entries(o).filter(([, e]) => t.test(e.toString()));
        if (!n) return i[s.find(([e]) => i[e]?.exports)?.[0] || null]?.exports; {
            let l = [];
            for (let [a] of s) {
                let u = i[a]?.exports;
                u && l.push(u)
            }
            return l
        }
    }
    var a = {
        get modules() {
            return t()
        },
        find: n,
        findAll: r,
        findByID: t => e().c[t = parseInt(t)]?.exports,
        findByDisplayName: e => o(t => i(t, e)),
        findByDisplayNameAll: e => o(t => i(t, e), !0),
        findByProps: (...e) => o(t => s(t, e)),
        findByPropsAll: (...e) => o(t => s(t, e), !0),
        findByCode: e => l(e),
        findByCodeAll: e => l(e, !0),
        _getModule(e, t = !1) {
            if (e.length > 1) return this.findByProps(...e);
            if (e[0] instanceof RegExp) return l(e[0], t);
            if (Array.isArray(e[0])) return (t ? this.findByPropsAll : this.findByProps)(...e[0]); {
                let a = e[0];
                switch (typeof a) {
                    case "function":
                        return (t ? r : n)(a);
                    case "number":
                        return this.findByID(a);
                    default:
                        return o(e => i(e, a) || s(e, [a]), t)
                }
            }
        },
        getModule(...e) {
            return this._getModule(e)
        },
        getModules(...e) {
            return this._getModule(e, !0)
        }
    };

    function u(e) {
        let t;
        return () => t ?? (t = e())
    }
    let d = function (e) {
        let t = u(e);
        return new Proxy(function () { }, {
            get: (e, n) => t()[n],
            set: (e, n, r) => t()[n] = r,
            has: (e, n) => n in t(),
            apply: (e, n, r) => t().apply(n, r),
            ownKeys: () => Reflect.ownKeys(t()),
            construct: (e, n) => Reflect.construct(t(), n),
            deleteProperty: (e, n) => delete t()[n],
            defineProperty: (e, n, r) => !!Object.defineProperty(t(), n, r),
            getPrototypeOf: () => Object.getPrototypeOf(t())
        })
    };
    var c = Object.freeze({
        __proto__: null,
        makeLazy: u,
        lazy: d
    }),
        p = d(() => ({
            datetime: a.findByProps("parseZone"),
            hljs: a.findByProps("highlight"),
            markdown: a.findByProps("parseBlock"),
            string: a.findByProps("toASCII"),
            timestamp: a.findByProps("fromTimestamp"),
            URL: a.findByProps("Url"),
            app: a.findByProps("os"),
            constants: a.findByProps("ACTIVITY_PLATFORM_TYPES"),
            React: a.findByProps("createElement"),
            ReactDOM: a.findByProps("render"),
            strings: a.findByProps("DISCORD_DESC_SHORT"),
            analytics: a.findByProps("AnalyticEventConfigs"),
            dispatcher: a.findByProps("getUsers")._dispatcher,
            http: a.findByProps("getAPIBaseURL"),
            socket: a.findByProps("getSocket").getSocket(),
            transitionTo: a.findByCode("transitionTo - ")
        }));
    let {
        datetime: g,
        hljs: f,
        markdown: h,
        string: y,
        timestamp: m,
        URL: M
    } = p, w = e => new Promise(t => setTimeout(t, e)), _ = d(() => new (a.findByProps("logger")).logger.constructor("DiscordBotClient"));

    function b() {
        let e = document.createElement("iframe");
        return document.body.appendChild(e), window.localStorage ??= e.contentWindow?.localStorage, e.remove(), window.localStorage
    }
    let v = (e, t, n) => a.findByProps("createBotMessage").createBotMessage(e, t, n),
        P = (e, t) => a.findByProps("receiveMessage").receiveMessage(e, t),
        T = e => a.findByProps("setDeveloperOptionSettings").setDeveloperOptionSettings(e),
        B = e => a.findByProps("toggleGuildFolderExpand").toggleGuildFolderExpand(e);
    var C = Object.freeze({
        __proto__: null,
        datetime: g,
        hljs: f,
        markdown: h,
        string: y,
        timestamp: m,
        URL: M,
        random: function (e, t) {
            return t < e && ([e, t] = [t, e]), Math.floor(Math.random() * (t - e)) + e
        },
        sleep: w,
        logger: _,
        loadLocalStorage: b,
        createCommand: function (e, t, n, r, o, i = 0) {
            _.log(`Registering command ${e}...`);
            let s = a.findByProps("BUILT_IN_COMMANDS").BUILT_IN_COMMANDS;
            n.forEach(e => {
                e.displayName = e.name, e.displayDescription = e.description, e.choices && e.choices.forEach(e => {
                    e.displayName = e.name
                })
            });
            let l = function (e) {
                e.forEach(e => {
                    delete e.focused
                }), o(e)
            };
            s.push({
                applicationId: "-1",
                description: t,
                displayDescription: t,
                displayName: e,
                id: `-${s.length + 1}`,
                execute: l,
                name: e,
                inputType: i,
                options: n,
                type: r
            })
        },
        createMessage: v,
        sendLocalMessage: P,
        editDeveloperOptions: T,
        toggleGuildFolder: B,
        lazy: c
    });
    let k = new Map,
        G = [];
    var S = {
        _patchModule(e, t, n, r, o) {
            if (!t) throw TypeError("Must specify the module to patch");
            if (!n) throw TypeError("Must specify what function to patch");
            if ("function" != typeof t[n]) throw TypeError("Function to patch not found");
            if (!r) throw TypeError("Must specify a callback");
            o = o || Symbol();
            let i = t[n];
            k[n] || (k[n] = t[n]);
            let s = G.find(e => e.signature === o);
            s || G.push({
                signature: o,
                patchType: e,
                patchOn: n,
                callback: r
            });
            let l = () => this.unpatch(t, n, o);
            switch (e) {
                case "before":
                    return i = t[n], t[n] = function () {
                        let e = r.apply(this, arguments);

                        function t(e, t, n) {
                            return e?.result ? e.result : e?.arguments ? i.apply(t, e.arguments) : i.apply(t, n)
                        }
                        return e instanceof Promise ? e.then(e => t(e, this, arguments)) : t(e, this, arguments)
                    }, l;
                case "after":
                    return i = t[n], t[n] = function () {
                        let e = i.apply(this, arguments);
                        return e instanceof Promise ? e.then(e => r.apply(this, [arguments, e])) : r.apply(this, [arguments, e])
                    }, l;
                case "instead":
                    return i = t[n], t[n] = r, l;
                default:
                    throw TypeError("Invalid patch type, must be one of: [before, after, instead]")
            }
        },
        before(e, t, n, r) {
            this._patchModule("before", e, t, n, r)
        },
        instead(e, t, n, r) {
            this._patchModule("instead", e, t, n, r)
        },
        after(e, t, n, r) {
            this._patchModule("after", e, t, n, r)
        },
        unpatch(e, t, n) {
            if (!e) throw TypeError("You must specify a module to unpatch");
            if (!t) throw TypeError("You must specify a function to unpatch");
            if (void 0 === n) {
                e[t] = k[t];
                for (var r = 0; r < G.length; r += 1) G[r].patchOn == t && G.splice(r, 1)
            } else
                for (let o of (this.unpatchAll(e, t), ! function (e) {
                    for (var t = 0; t < G.length; t += 1) G[t].signature == e && G.splice(t, 1)
                }(n), G)) this._patchModule(o.patchType, e, o.patchOn, o.callback, o.signature)
        },
        unpatchAll(e, t) {
            if (!e) throw TypeError("You must specify a module to unpatch");
            if (!t) throw TypeError("You must specify a function to unpatch");
            e[t] = k[t]
        }
    };
    let I = e => a.findByProps("loginToken").loginToken(e),
        O = e => a.findByProps("hideToken").getToken(e),
        E = () => a.getModule("getLastSelectedGuildId").getGuildId(),
        D = () => a.getModule("getLastSelectedChannelId").getChannelId(),
        {
            transitionTo: A
        } = p;

    function j(e) {
        let t = [];
        for (let n of Object.getOwnPropertyNames(A)) {
            let r = A[n];
            "function" == typeof r && r.toString().includes(e) && t.push(r)
        }
        return t.length > 1 ? t : t?.[0]
    }
    var N = {
        get history() {
            let R = j("(){return");
            for (let U of R) {
                let x = U();
                if (x) return x
            }
        },
        route: e => j("transitionTo - Transitioning to ")(e),
        replace: e => j("Replacing route with ")(e),
        back: () => j(".goBack()")(),
        forward: () => j(".goForward()")(),
        guild: e => j("transitionToGuild")(e),
        channel(e) {
            return this.message(e)
        },
        message(e, t) {
            let n = a.findByProps("getChannel").getChannel(e)?.guild_id;
            return j("transitionToGuild")(n, e, t)
        }
    };
    let {
        React: F,
        ReactDOM: L
    } = p;
    var z = Object.freeze({
        __proto__: null,
        React: F,
        ReactDOM: L,
        showToast: function (e, t) {
            a.findByProps("showToast").showToast({
                message: e,
                type: t || 0
            })
        },
        showNotification: function (e, t, n = "https://cdn.discordapp.com/embed/avatars/0.png", {
            sound: r = "message1",
            volume: o = .4
        }) {
            a.findByProps("showNotification").showNotification(n, e, t, null, {
                sound: r,
                volume: o
            })
        },
        playSound: function (e = "message1", t = .4) {
            a.findByProps("playSound").playSound(e, t)
        }
    });
    let {
        socket: q,
        dispatcher: Y,
        http: $,
        strings: K,
        constants: W,
        app: Q,
        analytics: H
    } = p, {
        currentGuild: V,
        currentChannel: Z
    } = {
            get currentGuild() {
                a.getModule("getGuild", "getGuilds").getGuild(E())
            },
            get currentChannel() {
                a.getModule("hasChannel").getChannel(D())
            }
        };
    var J = Object.freeze({
        __proto__: null,
        __version__: {
            version: "5.0",
            nightly: !0
        },
        socket: q,
        dispatcher: Y,
        http: $,
        strings: K,
        constants: W,
        app: Q,
        analytics: H,
        currentGuild: V,
        currentChannel: Z,
        utils: C,
        transitionTo: N,
        ui: z,
        webpack: a,
        patcher: S,
        dispatch: function (e, t) {
            _.verbose(`DirtyDispatching ${e.toUpperCase()}...`), t.type = e.toUpperCase();
            let {
                dispatcher: n
            } = p;
            n.isDispatching() ? setTimeout(n.dispatch.bind(n, t), 0) : n.dispatch(t)
        },
        loginToken: I,
        getToken: O
    });
    window.DiscordBotClient = J, window.Client = class {
        constructor() {
            this.events = {}, this._connected = !1
        }
        get connected() {
            return this._connected
        }
        connect() {
            S.after(p.socket, "_handleDispatchWithoutQueueing", (async function (e, t) {
                await this.emit(e[1].toLowerCase(), e[0])
            }).bind(this), "__DiscordBotClient_internal_client_hook"), this._connected = !0, _.info("Successfully hooked into the client!")
        }
        disconnect() {
            S.unpatch(p.socket, "_handleDispatchWithoutQueueing", "__DiscordBotClient_internal_client_hook"), this._connected = !1, _.info("Successfully unhooked from the client!")
        }
        on(e, t, n = !1) {
            if (n) return void 0 === this.events[e] && (this.events[e] = []), this.events[e].push(t), () => this.events[e].splice(this.events[e].indexOf(t), 1); {
                let r = (async function (e) {
                    this._connected && await t(e)
                }).bind(this);
                return p.dispatcher.subscribe(e.toUpperCase(), r), () => p.dispatcher.unsubscribe(e.toUpperCase(), r)
            }
        }
        async emit(e, t) {
            if (void 0 !== this.events[e])
                for (let n of this.events[e]) try {
                    await n(t)
                } catch (r) {
                    _.error(`Error in '${e}', callback: '${r}'`)
                }
        }
        get sessionID() {
            return a.getModule("getSessionId").getSessionId()
        }
        get fingerprint() {
            return a.getModule("getFingerprint").getFingerprint()
        }
        get requiredAction() {
            return a.getModule("getAction").getAction()
        }
        get user() {
            return a.getModule("getCurrentUser").getCurrentUser()
        }
        get guilds() {
            return a.getModule("getGuild", "getGuilds").getGuilds()
        }
        get guildFolders() {
            return a.getModule("getSortedGuilds").getSortedGuilds()
        }
        get privateChannels() {
            return a.getModule("getMutablePrivateChannels").getSortedPrivateChannels()
        }
        getGuild(e) {
            return a.getModule("getGuild", "getGuilds").getGuild(e)
        }
        joinGuild(e, t = !1) {
            return a.getModule("joinGuild").joinGuild(e, {
                lurker: t
            })
        }
        getGuildChannels(e) {
            return Object.values(a.getModule("getMutableGuildChannelsForGuild").getMutableGuildChannelsForGuild(e))
        }
        getChannel(e) {
            return a.getModule("hasChannel").getChannel(e)
        }
        getChannelThreads(e) {
            return a.getModule("getAllThreadsForParent").getAllThreadsForParent(e)
        }
        createDM(...e) {
            return a.getModule("openPrivateChannel").openPrivateChannel(e).then(e => this.getChannel(e))
        }
        getUser(e) {
            return a.getModule("getUser").getUser(e)
        }
        getGuildMember(e, t) {
            return a.getModule("getMember").getMember(e, t)
        }
        getGuildMembers(e) {
            return a.getModule("getMembers").getMembers(e)
        }
        requestGuildMembers(e, {
            query: t = "",
            limit: n = 10,
            presences: r = !0,
            userIDs: o = []
        }) {
            return o ? a.getModule("requestMembers").requestMembersById(e, o, r) : a.getModule("requestMembers").requestMembers(e, t, n, r)
        }
        startTyping(e) {
            return a.getModule("startTyping").startTyping(e)
        }
        stopTyping(e) {
            return a.getModule("stopTyping").stopTyping(e)
        }
        getChannelMessages(e) {
            return a.getModule("getMessages").getMessages(e)
        }
        sendMessage(e, t = "", {
            tts: n = !1,
            messageReference: r = null,
            allowedMentions: o = null,
            stickerIDs: i = null
        }) {
            if (!t && !i) throw TypeError("Must provide either content or stickerIDs");
            if (!e) throw TypeError("Must provide a channel ID");
            let s = {};
            return null != r && (s.messageReference = r), null != o && (s.allowedMentions = o), null != i && (s.stickerIds = i), a.getModule("sendMessage").sendMessage(e, {
                content: t,
                tts: n,
                invalidEmojis: [],
                validNonShortcutEmojis: []
            }, null, s)
        }
        sendEphemeralMessage(e, t = "", n, {
            author: r,
            type: o = 0,
            tts: i = !1,
            stickerIDs: s = [],
            messageReference: l,
            allowedMentions: a
        }) {
            let u = v(e, t, n);
            return u.author = r || this.user, u.type = o, u.tts = i, u.sticker_ids = s, u.message_reference = l, u.allowed_mentions = a, P(u.channel_id, u)
        }
        sendClydeMessage(e, t, n) {
            return a.getModule("sendBotMessage").sendBotMessage(e, t, n)
        }
        sendClydeError(e) {
            return a.getModule("sendBotMessage").sendClydeError(e)
        }
        acceptInvite(e, t = !0) {
            e = e.replace(/(https?:\/\/)?(www\.)?(discord\.gg|discordapp\.com\/invite|discord\.com\/invite)\/?/, "");
            let n = a.getModule("acceptInvite");
            return (t ? n.acceptInviteAndTransitionToInviteChannel : n.acceptInvite)({
                inviteKey: e
            })
        }
    }, b(), console.log("%c[DiscordBotClient] %cLoaded successfully!", "color: purple", "")
}();