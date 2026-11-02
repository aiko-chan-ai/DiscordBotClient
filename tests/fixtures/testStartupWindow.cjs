const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { once } = require('node:events');
const { app, session, shell } = require('electron');
const { StartupWindow } = require('../../build/AppCore/Windows/StartupWindow.js');

const root = path.resolve(__dirname, '../..');
const profile = process.env.DBC_STARTUP_TEST_PROFILE;
assert.ok(profile && path.basename(profile).startsWith('dbc-startup-test-'));
app.setPath('userData', profile);
app.setAppPath(root);
app.on('window-all-closed', () => {});
let startup;
let motionPreference = 'no-preference';
const originalOpenExternal = shell.openExternal;
let openedArtwork;
shell.openExternal = async url => { openedArtwork = url; };
const watchdog = setTimeout(() => finish(new Error('Startup smoke test exceeded 90 seconds')), 90000);

function finish(error) {
    clearTimeout(watchdog);
    shell.openExternal = originalOpenExternal;
    startup?.finish();
    console[error ? 'error' : 'log'](error?.stack || 'PASS: real Electron startup window smoke test');
    // Exit releases Chromium file handles before the parent removes this isolated profile.
    app.exit(error ? 1 : 0);
}

async function waitFor(predicate, timeout = 3000, description = 'startup state') {
    const deadline = Date.now() + timeout;
    while (!(await predicate())) {
        assert.ok(Date.now() < deadline, `Timed out waiting for ${description}`);
        await new Promise(resolve => setTimeout(resolve, 25));
    }
}

app.whenReady().then(async () => {
    const startupSession = session.fromPartition('startup');
    startupSession.enableNetworkEmulation({ offline: true });
    let earlyQuits = 0;
    startup = new StartupWindow(() => {}, () => earlyQuits++);
    startup.finish();
    await new Promise(resolve => setTimeout(resolve, 250));
    assert.equal(startup.window.isDestroyed(), true);
    assert.equal(earlyQuits, 0, 'Immediate finish must not report load failure or quit');
    // Windows CI can default to reduced motion. Set each rendered case before navigation.
    app.on('web-contents-created', (_event, contents) => {
        if (contents.session !== startupSession) return;
        contents.debugger.attach('1.3');
        contents.debugger.sendCommand('Emulation.setEmulatedMedia', {
            features: [{ name: 'prefers-reduced-motion', value: motionPreference }],
        }).catch(finish);
    });
    let retries = 0;
    let quits = 0;
    startup = new StartupWindow(() => retries++, () => quits++);
    startup.window.webContents.on('console-message', event => {
        if (event.level === 'error') console.error('Startup renderer:', event.message);
    });
    assert.equal(startup.window.isVisible(), false, 'Initially hidden');
    let showCalled = false;
    const originalShow = startup.show.bind(startup);
    startup.show = () => { showCalled = true; originalShow(); };
    const loaded = once(startup.window.webContents, 'did-finish-load');
    await once(startup.window, 'ready-to-show');
    await loaded;
    await waitFor(() => showCalled);
    const evaluate = expression => startup.window.webContents.executeJavaScript(expression);
    assert.equal(await evaluate('matchMedia("(prefers-reduced-motion: reduce)").matches'), false, 'Animation case explicitly enables full motion');
    assert.deepEqual(await evaluate('window.startupAPI.getState()'), { phase: 'starting' });
    assert.equal(await evaluate('typeof require'), 'undefined', 'Renderer has no Node integration');
    assert.equal(await evaluate('typeof window.startupAPI.animationFinished'), 'function');
    assert.equal(await evaluate('!!document.querySelector("canvas")'), true);
    assert.equal(await evaluate(`document.fonts.load('700 30px "Playpen Sans"').then(fonts =>
        fonts.length > 0 && fonts.every(font => font.status === 'loaded'))`), true, 'Bundled Playpen Sans loads offline');
    assert.match(await evaluate('getComputedStyle(document.querySelector(".boot-title")).fontFamily'), /Playpen Sans/);
    assert.deepEqual(await evaluate('({width:document.getElementById("artwork").naturalWidth,height:document.getElementById("artwork").naturalHeight})'), { width: 2560, height: 1440 });
    assert.equal(await evaluate('(() => { const image = document.getElementById("artwork"), canvas = document.querySelector("canvas"); return image.naturalWidth / image.naturalHeight === canvas.width / canvas.height; })()'), true, 'Artwork and contours use the same aspect ratio');
    assert.match(await evaluate('document.getElementById("artwork-credit").textContent'), /Mihoyo/);
    assert.equal(await evaluate('document.getElementById("skip").hidden'), false, 'Compare controls while both are visible');
    const [creditStyle, skipStyle] = await evaluate(`(() => {
        const properties = ['fontFamily', 'fontSize', 'fontWeight', 'letterSpacing', 'lineHeight', 'padding', 'border', 'borderRadius', 'backgroundColor', 'color', 'opacity', 'height'];
        return ['artwork-credit', 'skip'].map(id => {
            const style = getComputedStyle(document.getElementById(id));
            return properties.map(property => style[property]);
        });
    })()`);
    assert.deepEqual(creditStyle, skipStyle, 'Artwork and Skip share the same control style');
    assert.match(creditStyle[0], /Playpen Sans/);
    await evaluate('document.getElementById("artwork-credit").click()');
    await waitFor(() => openedArtwork === 'https://www.mihoyo.com/');
    await evaluate('window.startupAPI.retry(); window.startupAPI.getState()');
    assert.equal(retries, 0, 'Retry ignored outside error state');
    startup.loading();
    await waitFor(async () => (await evaluate('window.startupAPI.getState()')).phase === 'loading');
    assert.equal(await evaluate('document.querySelector(".feedback").hidden'), true);
    assert.doesNotMatch(await evaluate('document.body.innerText'), /SYNC RATIO|TYPE-0|MAGI SYSTEM|DBC is ready|Your bot\. Your client\./);
    assert.equal(await evaluate('document.getElementById("actions").hidden'), true);
    const loadingOutput = path.join(root, 'plans', '261001-startup-window', 'startup-loading-preview.png');
    fs.mkdirSync(path.dirname(loadingOutput), { recursive: true });
    fs.writeFileSync(loadingOutput, (await startup.window.webContents.capturePage()).toPNG());
    let revealed = false;
    let reveals = 0;
    const ready = startup.waitForAnimation(() => reveals++).then(result => { revealed = result; });
    await new Promise(resolve => setTimeout(resolve, 100));
    assert.equal(revealed, false, 'Ready application waits for the opening sequence');
    for (const stage of ['identity', 'dispersing', 'drawing', 'portrait', 'shutter']) {
        await waitFor(() => evaluate(`document.body.dataset.stage === '${stage}'`), 5000, `animation stage ${stage}`);
        await new Promise(resolve => setTimeout(resolve, stage === 'identity' ? 650 : stage === 'drawing' ? 900 : 180));
        const capture = await startup.window.webContents.capturePage();
        fs.writeFileSync(path.join(path.dirname(loadingOutput), `startup-${stage}.png`), capture.toPNG());
        if (stage === 'drawing') {
            assert.ok(await evaluate('Number(document.querySelector("canvas").dataset.fragments) > 0'), 'Contour paths become fragments');
            console.log('Startup contour fragments:', await evaluate('Number(document.querySelector("canvas").dataset.fragments)'));
            assert.ok(await evaluate('Number(document.querySelector("canvas").dataset.identityPieces) > 0'), 'Avatar texture participates in the fragment transition');
        }
    }
    await ready;
    assert.equal(revealed, true, 'Natural animation completion releases the ready application');
    assert.equal(reveals, 1, 'The loaded application is revealed once during the shutter');
    startup.loading();
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
    for (const method of ['click', 'escape', 'reduced-motion']) {
        motionPreference = method === 'reduced-motion' ? 'reduce' : 'no-preference';
        startup = new StartupWindow(() => {}, () => {});
        await once(startup.window.webContents, 'did-finish-load');
        if (method === 'reduced-motion') {
            assert.equal(await startup.window.webContents.executeJavaScript('matchMedia("(prefers-reduced-motion: reduce)").matches'), true);
            await waitFor(() => startup.window.webContents.executeJavaScript('document.body.dataset.animationComplete === "true" && document.getElementById("skip").hidden'));
        }
        await waitFor(() => startup.window.webContents.executeJavaScript('!!document.getElementById("skip")'));
        if (method === 'click') await startup.window.webContents.executeJavaScript('document.getElementById("skip").click()');
        if (method === 'escape') await startup.window.webContents.executeJavaScript('window.dispatchEvent(new KeyboardEvent("keydown", {key:"Escape"}))');
        assert.equal(await startup.waitForAnimation(), true, `${method} releases animation without skipping application loading`);
        startup.finish();
    }
    startup = new StartupWindow(() => {}, () => {}, 'classic');
    await once(startup.window.webContents, 'did-finish-load');
    assert.deepEqual(startup.window.getSize(), [300, 350]);
    assert.equal(startup.window.getBackgroundColor().toLowerCase(), '#282b30');
    assert.equal(await startup.window.webContents.executeJavaScript('document.querySelector("img").getAttribute("src") === "waiting.gif" && !document.querySelector("canvas")'), true);
    startup.loading();
    await waitFor(() => startup.window.webContents.executeJavaScript('document.getElementById("status").textContent === "Loading DBC..."'));
    fs.writeFileSync(path.join(path.dirname(loadingOutput), 'startup-classic.png'), (await startup.window.webContents.capturePage()).toPNG());
    assert.equal(await startup.waitForAnimation(), true, 'Classic GIF does not wait for the cinematic sequence');
    startup.fail('Classic startup failed');
    await waitFor(() => startup.window.webContents.executeJavaScript('!document.getElementById("actions").hidden'));
    startup.finish();
    finish();
}).catch(finish);



