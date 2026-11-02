const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { app } = require('electron');
const reference = require('./experiment-assignments.json');
const root = path.resolve(__dirname, '../..');
app.setAppPath(root);

const snippets = [...fs.readFileSync(path.join(root, 'docs/Experiments.md'), 'utf8').matchAll(/```js\r?\n([\s\S]*?)```/g)].map(match => match[1]);
assert.equal(snippets.length, 2);

async function runSnippet(index, { fallback = false, apex = reference.apex_user, fail = false, timeout = false } = {}) {
    let output, closed = 0, connected = 0;
    const listeners = new Set();
    const dispatcher = {
        dispatch() {}, wait() {},
        subscribe(event, listener) { assert.equal(event, 'CONNECTION_OPEN'); listeners.add(listener); },
        unsubscribe(event, listener) { assert.equal(event, 'CONNECTION_OPEN'); listeners.delete(listener); },
    };
    const socket = {
        close() { closed++; if (fail) throw new Error('socket unavailable'); },
        connect() {
            connected++;
            if (!timeout) for (const listener of [...listeners]) listener({
                user: { id: 'current' },
                apexExperiments: { assignments: { '1': { wrongCachedAccount: { assignments: [] }, current: apex } } },
            });
        },
    };
    const stores = [
        { takeSnapshot: () => ({ data: { source: 'ready_payload', rawUserExperiments: reference.experiments } }), getAllUserExperimentDescriptors() {} },
        { getSocket: () => socket }, dispatcher,
    ];
    const findByProps = (...props) => stores.find(store => props.every(prop => typeof store[prop] === 'function'));
    const context = {
        window: fallback ? {} : { Vencord: { Webpack: { findByProps, Common: { FluxDispatcher: dispatcher } } } },
        webpackChunkdiscord_app: { push: () => Object.fromEntries(stores.map((store, i) => [i, { exports: { nested: store } }])), pop() {} },
        setTimeout: (callback, delay) => setTimeout(callback, timeout ? delay === 30000 ? 10 : 1 : delay), clearTimeout,
        copy(value) { output = JSON.parse(value); },
    };
    try {
        await vm.runInNewContext(snippets[index], context);
    } finally {
        assert.equal(listeners.size, 0, 'Capture listener is always removed');
    }
    if (index === 0) assert.equal(closed, 0, 'User snapshot needs no reconnect');
    else assert.equal(connected, 1);
    return output;
}

function loadExperiments(user, apex = reference.apex_user) {
    const mod = { exports: {} };
    const source = fs.readFileSync(path.join(root, 'build/AppUtils/Experiments.js'), 'utf8');
    vm.runInNewContext(source, {
        module: mod, exports: mod.exports, structuredClone,
        require(name) {
            if (name === 'fs') return { readFileSync: file => JSON.stringify(file === 'user' ? user : apex) };
            if (/\/Constants(?:\.js)?$/.test(name)) return { __esModule: true, default: { DiscordUserExperimentsPath: 'user', DiscordApexExperimentsPath: 'apex' } };
            return require(name);
        },
    });
    return mod.exports;
}

app.whenReady().then(async () => {
    for (const fallback of [false, true]) {
        assert.deepEqual(await runSnippet(0, { fallback }), reference.experiments, 'Exact READY user tuples');
        assert.deepEqual(await runSnippet(1, { fallback }), reference.apex_user, 'Exact READY Apex evaluation and all flags');
    }
    const extended = { evaluation_id: 'original-id', assignments: [[123, 2, 15, 4, 1, { setting: true }, 'future-field']] };
    assert.deepEqual(await runSnippet(1, { apex: extended }), extended, 'Preserve all flag bits, optional config and future trailing data');
    assert.deepEqual(await runSnippet(1, { apex: { evaluation_id: 'empty', assignments: [] } }), { evaluation_id: 'empty', assignments: [] });
    await assert.rejects(runSnippet(1, { apex: undefined, timeout: true }), /Timed out/);
    await assert.rejects(runSnippet(1, { apex: null }), /no Apex user assignments/);
    await assert.rejects(runSnippet(1, { fail: true }), /socket unavailable/);
    const botId = '123456789012345678';
    const actual = require('../../build/AppUtils/Experiments');
    assert.deepEqual(actual.UserExperiment([], botId), reference.experiments, 'Unknown/unregistered experiments survive injection');
    assert.deepEqual(actual.ApexExperiment(botId), { assignments: { '1': { [botId]: reference.apex_user } } });
    const first = actual.UserExperiment([], botId);
    first[0][2] = 999;
    assert.deepEqual(actual.UserExperiment([], botId), reference.experiments, 'Callers cannot mutate the bundled snapshot');
    const raw = loadExperiments([[123, 0, -1, -1, 2, 0, 1, 1, 'holdout', 4, 0]]);
    assert.deepEqual(raw.UserExperiment([], botId), [[123, 0, -1, -1, 2, 0, 1, 1, 'holdout', 4, 0]]);
    const legacy = loadExperiments({ legacy: { revision: 4, population: 2, bucket: 1, override: false, hashResult: 0, aaMode: true, triggerDebuggingEnabled: false, holdoutName: null } });
    assert.deepEqual(JSON.parse(JSON.stringify(legacy.UserExperiment([{ id: 'legacy' }], botId)))[0].slice(1), [4, 1, -1, 2, 0, 1, 0, null, null, null]);
    console.log(`PASS: both dump snippets, real READY reference (${reference.experiments.length} user / ${reference.apex_user.assignments.length} Apex), reconnect cleanup and bot injection`);
    app.exit(0);
}).catch(error => { console.error(error); app.exit(1); });
