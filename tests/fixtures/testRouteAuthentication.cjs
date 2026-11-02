const assert = require('node:assert/strict');
const { app, net } = require('electron');
const express = require('express');
app.setAppPath(require('node:path').resolve(__dirname, '../..'));
app.setPath('userData', process.env.DBC_AUTH_TEST_PROFILE);

// Control only the external upstream; exercise the real routers over HTTP.
app.whenReady().then(async () => {
    const api = express();
    const settings = require('../../build/AppCore/routes/users/@me/settings-proto').default;
    const emojis = require('../../build/AppCore/routes/users/@me/emojis').default;
    const threads = require('../../build/AppCore/routes/channels/#id/threads/search').default;
    const prefixes = ['/api/v10', '/api/v9', '/api', ''];
    for (const prefix of prefixes) {
        api.use(`${prefix}/users/@me/settings-proto`, settings);
        api.use(`${prefix}/users/@me/emojis`, emojis);
        api.use(`${prefix}/channels/:id/threads/search`, threads);
    }
    let checks = 0;
    let emojiReads = 0;
    let mode = 'valid';
    const upstreamId = '123456789012345678';
    const token = `Bot ${Buffer.from(upstreamId).toString('base64')}.valid`;
    const rotated = token + '-rotated';
    const misleading = `Bot ${Buffer.from('999999999999999999').toString('base64')}.valid`;
    const other = `Bot ${Buffer.from('888888888888888888').toString('base64')}.valid`;
    const ipcToken = token + '-ipc';
    const forged = `Bot ${Buffer.from(upstreamId).toString('base64')}.x`;
    const originalFetch = net.fetch;
    const originalNow = Date.now;
    let now = originalNow();
    Date.now = () => now;
    net.fetch = async (url, options) => {
        if (url.endsWith('/users/@me')) {
            checks++;
            assert.ok(options.signal);
            assert.equal(options.redirect, 'error');
            if (mode === 'offline') throw new Error('offline');
            if (mode === 'limited') return new Response('{}', { status: 429, headers: { 'Retry-After': '7' } });
            if (mode === 'server') return new Response('{}', { status: 503 });
            const authorization = options.headers.authorization;
            if (![token, rotated, misleading, other].includes(authorization) || (mode === 'rotated' && authorization === token)) {
                return new Response('{}', { status: 401 });
            }
            return Response.json(mode === 'malformed' ? {} : {
                id: authorization === other ? '888888888888888888' : upstreamId, bot: mode !== 'human',
            });
        }
        if (url.includes('/threads/archived/public')) {
            if (url.includes('/666666666666666666/')) return new Response('{}', { status: 403 });
            return Response.json({ threads: [{ id: '777777777777777778', thread_metadata: { archive_timestamp: '2026-01-01T00:00:00Z' } }], members: [] });
        }
        if (url.endsWith('/messages/777777777777777778')) {
            return Response.json({ code: 10008 }, { status: 404 });
        }
        assert.equal(url, `https://canary.discord.com/api/v9/applications/${upstreamId}/emojis`);
        emojiReads++;
        return Response.json({ items: [{ id: '42', name: 'example' }] });
    };
    // A valid settings request must reach IPC with the upstream identity.
    let ipcReads = 0;
    globalThis.botClient = {
        ipcMain: { on() { throw new Error('Unexpected IPC read before validation'); } },
        discordWebContents: { send() { throw new Error('Unexpected IPC write'); } },
    };
    const server = api.listen(0, '127.0.0.1');
    await new Promise(resolve => server.once('listening', resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    const request = (path, authorization, method = 'GET') => fetch(base + path, {
        method, headers: authorization ? { authorization } : {},
    });
    try {
        for (const prefix of prefixes) {
            for (const suffix of ['/settings-proto/1', '/settings-proto/2', '/emojis']) {
                for (const authorization of [undefined, forged]) {
                    assert.equal((await request(`${prefix}/users/@me${suffix}`, authorization)).status, 401);
                }
            }
            for (const slot of [1, 2]) {
                assert.equal((await request(`${prefix}/users/@me/settings-proto/${slot}`, forged, 'POST')).status, 401);
            }
        }
        const path = '/api/v10/users/@me/emojis';
        assert.deepEqual(await (await request(path, token)).json(), [{ id: '42', name: 'example' }]);
        const previousChecks = checks;
        now += 4 * 60 * 1000;
        assert.equal((await request(path, token)).status, 200);
        assert.equal(checks, previousChecks, 'A matching token uses cached authentication');
        assert.equal(emojiReads, 1);
        assert.equal((await request(path, forged)).status, 401, 'A forged ID cannot read a warm cache');
        now += 60 * 1000;
        const expiredChecks = checks;
        assert.equal((await request(path, token)).status, 200);
        assert.equal(checks, expiredChecks + 1, 'Cache hits do not extend the five-minute TTL');
        assert.equal((await request(path, token)).status, 200);
        assert.equal(checks, expiredChecks + 1, 'Successful revalidation refreshes the cache');
        mode = 'rotated';
        assert.equal((await request(path, rotated)).status, 200);
        assert.equal((await request(path, token)).status, 401, 'A newly validated token replaces the old hash');
        assert.equal((await request(path, forged)).status, 401);
        const rotationChecks = checks;
        assert.equal((await request(path, rotated)).status, 200);
        assert.equal(checks, rotationChecks, 'Failed validation cannot overwrite a valid cache entry');
        for (const [state, status] of [['offline', 502], ['limited', 429], ['server', 503], ['human', 403], ['malformed', 403]]) {
            mode = state;
            now += 5 * 60 * 1000;
            for (const suffix of ['/emojis', '/settings-proto/1', '/settings-proto/2']) {
                const response = await request('/api/v10/users/@me' + suffix, token);
                assert.equal(response.status, status);
                if (state === 'limited') assert.equal(response.headers.get('retry-after'), '7');
            }
        }
        mode = 'valid';
        assert.equal((await request(path, misleading)).status, 200, 'Use the upstream identity, not the decoded token ID');

        // Exercise the real IPC handler with only its Discord session and sender supplied by the fixture.
        const { setupIPCEvents } = require('../../build/AppCore/IPCManager');
        const handlers = new Map();
        const contents = { mainFrame: { url: 'https://discord.com/app' } };
        let ipcStatus = 401;
        setupIPCEvents({
            ipcMain: { on() { return this; }, handle(name, handler) { handlers.set(name, handler); } },
            discordWebContents: contents,
            discordSession: { fetch: async () => ipcStatus === 200
                ? Response.json({ id: upstreamId, bot: { id: upstreamId }, flags: 0 })
                : new Response('{}', { status: ipcStatus }) },
            config: { config: { suppress_intent_warning: true, guilds_per_shard: 1000 } },
        });
        const getBotInfo = handlers.get('app:preload:get_bot_info');
        const event = { sender: contents, senderFrame: contents.mainFrame };
        assert.equal((await getBotInfo(event, ipcToken)).success, false);
        assert.equal((await request(path, ipcToken)).status, 401, 'Failed IPC validation cannot seed the cache');
        ipcStatus = 200;
        assert.throws(() => getBotInfo({ sender: {}, senderFrame: contents.mainFrame }, ipcToken));
        assert.equal((await request(path, ipcToken)).status, 401, 'Untrusted IPC cannot seed the cache');
        assert.equal((await getBotInfo(event, ipcToken)).success, true);
        const ipcChecks = checks;
        assert.equal((await request(path, ipcToken)).status, 200);
        assert.equal(checks, ipcChecks, 'Successful IPC validation seeds the HTTP authentication cache');

        const threadPath = '/channels/777777777777777777/threads/search';
        assert.equal((await (await request('/api/v10' + threadPath + '?archived=true', ipcToken)).json()).total_results, 1);
        for (const prefix of prefixes) {
            for (const authorization of [undefined, forged]) {
                assert.equal((await request(prefix + threadPath, authorization)).status, 401);
            }
        }
        assert.equal((await (await request('/api/v10' + threadPath, other)).json()).total_results, 0,
            'Another authenticated bot cannot read cached thread counts');
        const deniedThread = '/api/v10/channels/666666666666666666/threads/search?archived=true';
        assert.equal((await request(deniedThread, forged)).status, 401);
        assert.equal((await request(deniedThread, ipcToken)).status, 403, 'Preserve upstream channel authorization failures');
        const { EventEmitter } = require('node:events');
        globalThis.botClient.ipcMain = new EventEmitter();
        globalThis.botClient.discordWebContents.send = (event, id) => {
            assert.equal(id, upstreamId);
            ipcReads++;
            throw new Error('Stop before accessing a real settings database');
        };
        for (const slot of [1, 2]) assert.equal((await request(`/api/v10/users/@me/settings-proto/${slot}`, token)).status, 500);
        assert.equal(ipcReads, 2);
        console.log('PASS: route authentication, TTL/rotation, IPC cache, aliases, forged tokens and thread isolation');
    } finally {
        net.fetch = originalFetch;
        Date.now = originalNow;
        server.close();
    }
    app.exit(0);
}).catch(error => { console.error(error); app.exit(1); });
