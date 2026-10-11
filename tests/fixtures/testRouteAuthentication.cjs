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
    const prefixes = ['/api/v10', '/api/v9', '/api', ''];
    for (const prefix of prefixes) {
        api.use(`${prefix}/users/@me/settings-proto`, settings);
        api.use(`${prefix}/users/@me/emojis`, emojis);
    }
    let checks = 0;
    let emojiReads = 0;
    let mode = 'valid';
    const upstreamId = '123456789012345678';
    const token = `Bot ${Buffer.from('999999999999999999').toString('base64')}.valid`;
    const forged = `Bot ${Buffer.from(upstreamId).toString('base64')}.x`;
    const originalFetch = net.fetch;
    net.fetch = async (url, options) => {
        if (url.endsWith('/users/@me')) {
            checks++;
            assert.ok(options.signal);
            assert.equal(options.redirect, 'error');
            if (mode === 'offline') throw new Error('offline');
            if (mode === 'limited') return new Response('{}', { status: 429, headers: { 'Retry-After': '7' } });
            if (mode === 'server') return new Response('{}', { status: 503 });
            if (options.headers.authorization !== token) return new Response('{}', { status: 401 });
            return Response.json(mode === 'malformed' ? {} : { id: upstreamId, bot: mode !== 'human' });
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
        assert.equal((await request(path, token)).status, 200);
        assert.equal(checks, previousChecks + 1, 'Cache hits still authenticate');
        assert.equal(emojiReads, 1);
        assert.equal((await request(path, forged)).status, 401, 'A forged ID cannot read a warm cache');
        for (const [state, status] of [['offline', 502], ['limited', 429], ['server', 503], ['human', 403], ['malformed', 403]]) {
            mode = state;
            for (const suffix of ['/emojis', '/settings-proto/1', '/settings-proto/2']) {
                const response = await request('/api/v10/users/@me' + suffix, token);
                assert.equal(response.status, status);
                if (state === 'limited') assert.equal(response.headers.get('retry-after'), '7');
            }
        }
        mode = 'valid';
        const { EventEmitter } = require('node:events');
        globalThis.botClient.ipcMain = new EventEmitter();
        globalThis.botClient.discordWebContents.send = (event, id) => {
            assert.equal(id, upstreamId);
            ipcReads++;
            throw new Error('Stop before accessing a real settings database');
        };
        for (const slot of [1, 2]) assert.equal((await request(`/api/v10/users/@me/settings-proto/${slot}`, token)).status, 500);
        assert.equal(ipcReads, 2);
        console.log('PASS: route authentication, aliases, forged tokens, cache isolation and upstream failures');
    } finally {
        net.fetch = originalFetch;
        server.close();
    }
    app.exit(0);
}).catch(error => { console.error(error); app.exit(1); });