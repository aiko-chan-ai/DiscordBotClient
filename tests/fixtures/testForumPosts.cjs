const assert = require('node:assert/strict');
const { app, net } = require('electron');
const express = require('express');

app.whenReady().then(async () => {
    const api = express();
    const { cacheValidatedBotToken } = require('../../build/AppUtils/ValidateBotToken');
    const posts = require('../../build/AppCore/routes/channels/#id/post-data').default;
    const search = require('../../build/AppCore/routes/channels/#id/threads/search').default;
    const botId = '123456789012345678';
    const token = `Bot ${Buffer.from(botId).toString('base64')}.forum-tests`;
    cacheValidatedBotToken(botId, token);
    for (const prefix of ['/api/v10', '/api/v9', '/api', '']) {
        api.use(`${prefix}/channels/:id/post-data`, posts);
        api.use(`${prefix}/channels/:id/threads/search`, search);
    }
    const ids = Array.from({ length: 8 }, (_, i) => String(123456789012345680n + BigInt(i)));
    const timestamp = '2026-01-01T00:00:00.000Z';
    const author = { id: botId, username: 'test', avatar: null, discriminator: '0' };
    let mode = 'valid', reads = 0, active = 0, maxActive = 0;
    const archiveUrls = [];
    const originalFetch = net.fetch;
    net.fetch = async (url, options) => {
        assert.equal(options.headers.authorization, token);
        assert.ok(options.signal);
        if (url.includes('/threads/archived/public')) {
            archiveUrls.push(url);
            const page = url.includes('before=') ? [ids[2]] : ids.slice(0, 2);
            return Response.json({ threads: page.map(id => ({ id, thread_metadata: { archive_timestamp: timestamp } })), members: [], has_more: !url.includes('before=') });
        }
        reads++;
        maxActive = Math.max(maxActive, ++active);
        await new Promise(resolve => setTimeout(resolve, 5));
        active--;
        const id = url.match(/channels\/(\d+)\/messages\/(\d+)$/)?.[1];
        assert.ok(ids.includes(id));
        if (mode === 'offline') throw new Error('offline');
        if (mode === 'limited') return Response.json({}, { status: 429, headers: { 'Retry-After': '5' } });
        if (mode === 'forbidden') return Response.json({}, { status: 403 });
        if (mode === 'missing-channel') return Response.json({ code: 10003 }, { status: 404 });
        if (mode === 'deleted') return Response.json({ code: 10008 }, { status: 404 });
        return Response.json({ id, channel_id: id, author, content: 'starter', attachments: [{ id: 'image', url: 'https://example.invalid/image.png' }] });
    };
    const server = api.listen(0, '127.0.0.1');
    await new Promise(resolve => server.once('listening', resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    const post = (prefix, body, auth = token) => fetch(`${base}${prefix}/channels/${botId}/post-data`, {
        method: 'POST', headers: { authorization: auth, 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(body),
    });
    try {
        for (const prefix of ['/api/v10', '/api/v9', '/api', '']) {
            const result = await (await post(prefix, { thread_ids: [ids[0]] })).json();
            assert.equal(result.threads[ids[0]].first_message.content, 'starter');
            assert.equal(result.threads[ids[0]].first_message.attachments.length, 1);
            assert.equal(result.threads[ids[0]].owner.avatar, null);
        }
        assert.deepEqual(await (await post('/api', { thread_ids: [] })).json(), { threads: {} });
        for (const thread_ids of [null, ['../users/@me'], Array(101).fill(ids[0]), [123]]) {
            assert.equal((await post('/api', { thread_ids })).status, 400);
        }
        assert.equal((await post('/api', { thread_ids: ids }, '')).status, 401);
        const before = reads;
        await post('/api', { thread_ids: [...ids, ids[0]] });
        assert.equal(reads - before, ids.length, 'Deduplicate starter requests');
        assert.ok(maxActive <= 4, 'Bound concurrency');
        for (const [state, status] of [['deleted', 200], ['missing-channel', 404], ['forbidden', 403], ['limited', 429], ['offline', 502]]) {
            mode = state;
            const response = await post('/api', { thread_ids: [ids[0]] });
            assert.equal(response.status, status);
            if (state === 'deleted') assert.deepEqual((await response.json()).threads[ids[0]], { first_message: null, owner: null });
            if (state === 'limited') assert.equal(response.headers.get('retry-after'), '5');
        }
        mode = 'valid';
        const archived = offset => fetch(`${base}/api/channels/${botId}/threads/search?archived=true&limit=2&offset=${offset}`, { headers: { authorization: token } });
        const first = await (await archived(0)).json();
        assert.equal(first.has_more, true);
        assert.equal(first.first_messages.length, 2);
        assert.equal(first.owners[0].avatar, null);
        const second = await (await archived(2)).json();
        assert.equal(second.has_more, false);
        assert.equal(second.total_results, 3, 'Equal archive timestamps do not collapse offsets');
        assert.ok(archiveUrls[1].includes(`before=${timestamp}`));
        await archived(0);
        assert.ok(!archiveUrls[2].includes('before='), 'Refreshing page zero never skips the first page');
        console.log('PASS: forum previews, deleted messages, avatars, permissions, limits, aliases and pagination');
    } finally {
        net.fetch = originalFetch;
        server.close();
    }
    app.exit(0);
}).catch(error => { console.error(error); app.exit(1); });
