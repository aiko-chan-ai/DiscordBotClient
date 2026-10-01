/* Run after npm run build:ts: electron scripts/testStartupWindow.cjs */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { once } = require('node:events');
const { app } = require('electron');
const { StartupWindow } = require('../build/AppCore/StartupWindow.js');

const root = path.resolve(__dirname, '..');
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'dbc-startup-test-'));
app.setPath('userData', profile);
app.setAppPath(root);
app.on('window-all-closed', () => {});
let startup;
const watchdog = setTimeout(() => finish(new Error('Startup smoke test exceeded 65 seconds')), 65000);

function finish(error) {
    clearTimeout(watchdog);
    startup?.finish();
    console[error ? 'error' : 'log'](error?.stack || 'PASS: real Electron startup window smoke test');
    // Exit releases Chromium file handles before the parent removes this isolated profile.
    console.log(`TEST_PROFILE=${profile}`);
    app.exit(error ? 1 : 0);
}

async function waitFor(predicate, timeout = 3000) {
    const deadline = Date.now() + timeout;
    while (!(await predicate())) {
        assert.ok(Date.now() < deadline, 'Timed out waiting for startup state');
        await new Promise(resolve => setTimeout(resolve, 25));
    }
}

app.whenReady().then(async () => {
    let earlyQuits = 0;
    startup = new StartupWindow(() => {}, () => earlyQuits++);
    startup.finish();
    await new Promise(resolve => setTimeout(resolve, 250));
    assert.equal(startup.window.isDestroyed(), true);
    assert.equal(earlyQuits, 0, 'Immediate finish must not report load failure or quit');
    let retries = 0;
    let quits = 0;
    startup = new StartupWindow(() => retries++, () => quits++);
    assert.equal(startup.window.isVisible(), false, 'Initially hidden');
    const loaded = once(startup.window.webContents, 'did-finish-load');
    await once(startup.window, 'ready-to-show');
    await loaded;
    await waitFor(() => startup.window.isVisible());
    const evaluate = expression => startup.window.webContents.executeJavaScript(expression);
    assert.deepEqual(await evaluate('window.startupAPI.getState()'), { phase: 'starting', message: 'Starting...' });
    assert.equal(await evaluate('typeof require'), 'undefined', 'Renderer has no Node integration');
    await evaluate('window.startupAPI.retry(); window.startupAPI.getState()');
    assert.equal(retries, 0, 'Retry ignored outside error state');
    startup.loading();
    await waitFor(() => evaluate('document.getElementById("status").textContent === "Loading DBC..."'));
    assert.equal(await evaluate('document.getElementById("actions").hidden'), true);
    const loadingOutput = path.join(root, 'plans', '261001-startup-window', 'startup-loading-preview.png');
    fs.mkdirSync(path.dirname(loadingOutput), { recursive: true });
    fs.writeFileSync(loadingOutput, (await startup.window.webContents.capturePage()).toPNG());
    await waitFor(async () => (await evaluate('window.startupAPI.getState()')).phase === 'error', 48000);
    await waitFor(() => evaluate('!document.getElementById("actions").hidden'));
    assert.match(await evaluate('document.getElementById("status").textContent'), /taking too long/);
    assert.deepEqual(await evaluate('[...document.querySelectorAll("#actions button")].map(button => button.textContent)'), ['Retry', 'Quit']);
    const output = path.join(root, 'plans', '261001-startup-window', 'startup-preview.png');
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, (await startup.window.webContents.capturePage()).toPNG());
    await evaluate('document.getElementById("retry").click()');
    await waitFor(() => retries === 1);
    await evaluate('document.getElementById("quit").click()');
    await waitFor(() => quits === 1);
    startup.loading();
    startup.finish();
    assert.equal(startup.window.isDestroyed(), true);
    assert.equal(quits, 1, 'finish must not invoke quit callback');
    startup.finish();
    console.log(`Screenshot: ${output}`);
    finish();
}).catch(finish);



