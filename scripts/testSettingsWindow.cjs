/* Run after npm run build:ts: node scripts/testSettingsWindow.cjs */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { once } = require('node:events');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'plans', '261001-settings');

if (!process.versions.electron) {
    const { spawn } = require('node:child_process');
    const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'dbc-settings-test-'));
    const env = { ...process.env, DBC_SETTINGS_TEST_PROFILE: profile };
    delete env.ELECTRON_RUN_AS_NODE;
    const child = spawn(require('electron'), [__filename], { cwd: root, env, windowsHide: true, stdio: 'inherit' });
    child.on('error', error => { console.error(error); process.exitCode = 1; });
    child.on('close', code => {
        fs.rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
        process.exitCode = code ?? 1;
    });
} else {
    const { app, BrowserWindow, session } = require('electron');
    const profile = process.env.DBC_SETTINGS_TEST_PROFILE;
    assert.ok(profile && path.basename(profile).startsWith('dbc-settings-test-'), 'Use Node launcher for isolated profile');
    app.setPath('userData', profile);
    app.setAppPath(root);
    app.on('window-all-closed', () => {});
    const checks = [];
    const errors = [];
    const securityMessages = [];
    const requests = [];
    let current;
    const watchdog = setTimeout(() => finish(new Error('Settings integration timed out')), 60000);
    function finish(error) {
        clearTimeout(watchdog);
        for (const window of BrowserWindow.getAllWindows()) window.destroy();
        fs.mkdirSync(output, { recursive: true });
        fs.writeFileSync(path.join(output, 'electron-test-results.json'), JSON.stringify({ passed: !error, checks, errors, securityMessages, requests, failure: error?.stack }, null, 2));
        console[error ? 'error' : 'log'](error?.stack || `PASS: ${checks.length} real Electron Settings checks`);
        app.exit(error ? 1 : 0);
    }
    const evaluate = expression => current.webContents.executeJavaScript(expression);
    async function waitFor(predicate, label) {
        const deadline = Date.now() + 5000;
        while (!(await predicate())) {
            assert.ok(Date.now() < deadline, `Timed out: ${label}`);
            await new Promise(resolve => setTimeout(resolve, 30));
        }
    }
    const check = label => { checks.push(label); console.log(`PASS: ${label}`); };
    async function open(config) {
        const { SettingsWindow } = require('../build/AppCore/SettingsWindow.js');
        current = new SettingsWindow(config).window;
        current.webContents.on('console-message', event => {
            if (event.level !== 'error') return;
            if (event.message.includes('https://example.invalid/') && /Content Security Policy|security policy/.test(event.message)) securityMessages.push(event.message);
            else errors.push(event.message);
        });
        current.webContents.on('render-process-gone', (_event, details) => errors.push(`Renderer gone: ${details.reason}`));
        await once(current.webContents, 'did-finish-load');
        await waitFor(() => evaluate('!!document.querySelector("button") && !document.body.innerText.includes("Loading settings")'), 'renderer mounted');
    }
    async function type(selector, value) {
        await evaluate(`(() => { const input = document.querySelector(${JSON.stringify(selector)}); input.focus(); input.select(); })()`);
        await current.webContents.insertText(value);
    }
    const click = text => evaluate(`(() => { const b = [...document.querySelectorAll('button')].find(b => b.textContent.includes(${JSON.stringify(text)})); if (!b) throw Error('Missing button: ' + ${JSON.stringify(text)}); b.click(); })()`);
    app.whenReady().then(async () => {
        session.fromPartition('settings').webRequest.onBeforeRequest((details, callback) => {
            requests.push(details.url);
            callback({ cancel: /^https?:/i.test(details.url) });
        });
        const { GlobalConfig } = require('../build/AppCore/Config.js');
        const config = new GlobalConfig(profile);
        await open(config);
        const preferences = current.webContents.getLastWebPreferences();
        assert.equal(preferences.sandbox, true);
        assert.equal(preferences.contextIsolation, true);
        assert.equal(preferences.nodeIntegration, false);
        assert.equal(await evaluate('typeof require'), 'undefined');
        check('Local renderer runs sandboxed without Node access');
        const snapshot = await evaluate('window.settingsAPI.get()');
        assert.deepEqual(snapshot, config.snapshot());
        const saved = { ...snapshot.settings, guilds_per_shard: 42, settings_theme: 'dark' };
        assert.deepEqual((await evaluate(`window.settingsAPI.save(${JSON.stringify(saved)})`)).settings, saved);
        assert.deepEqual(new GlobalConfig(profile).config, saved);
        check('Typed IPC get/save persists real JSON');
        const disk = fs.readFileSync(config.jsonPath, 'utf8');
        for (const value of [null, [], {}, { ...saved, guilds_per_shard: 0 }, { ...saved, guilds_per_shard: 1.5 }, { ...saved, cache_assets: 'false' }, { ...saved, settings_theme: 'invalid' }, { ...saved, extra: true }]) {
            assert.equal(await evaluate(`window.settingsAPI.save(${JSON.stringify(value)}).then(() => false, () => true)`), true);
            assert.equal(fs.readFileSync(config.jsonPath, 'utf8'), disk);
        }
        check('Malformed IPC payloads reject without changing disk');
        current.reload();
        await once(current.webContents, 'did-finish-load');
        await waitFor(() => evaluate('!!document.querySelector("button")'), 'reload');
        assert.deepEqual((await evaluate('window.settingsAPI.get()')).settings, saved);
        check('Reload retains persisted settings');
        const attacker = new BrowserWindow({ show: false, webPreferences: { preload: path.join(root, 'build/AppCore/SettingsPreload.js'), sandbox: true, contextIsolation: true, nodeIntegration: false, partition: 'settings' } });
        await attacker.loadFile(path.join(root, 'build/renderer/settings/index.html'));
        assert.equal(await attacker.webContents.executeJavaScript('window.settingsAPI.get().then(() => false, () => true)'), true);
        assert.equal(await attacker.webContents.executeJavaScript(`window.settingsAPI.save(${JSON.stringify(saved)}).then(() => false, () => true)`), true);
        attacker.destroy();
        check('Another webContents with identical preload cannot access scoped IPC');
        const pageURL = current.webContents.getURL();
        await evaluate('location.href = "https://example.invalid/settings-test"');
        await new Promise(resolve => setTimeout(resolve, 150));
        assert.equal(current.webContents.getURL(), pageURL);
        await evaluate('window.open("https://example.invalid/settings-test")');
        assert.equal(BrowserWindow.getAllWindows().length, 1);
        const failedFrame = once(current.webContents, 'did-fail-load');
        await evaluate('(() => { const frame = document.createElement("iframe"); frame.src = "https://example.invalid/frame-test"; document.body.append(frame); })()');
        await new Promise(resolve => setTimeout(resolve, 150));
        const [, errorCode, errorDescription, failedURL, isMainFrame] = await failedFrame;
        assert.equal(errorDescription, 'ERR_BLOCKED_BY_CSP');
        assert.equal(isMainFrame, false);
        assert.equal(failedURL, 'https://example.invalid/frame-test');
        await evaluate('document.querySelector("iframe").remove()');
        check('Renderer navigation, remote iframe and popup are blocked');
        await uiChecks(config, type, click, evaluate, waitFor, check, () => current);
        assert.equal(requests.filter(url => /^https?:/i.test(url)).length, 0, 'No remote requests leave Settings');
        assert.deepEqual(errors, [], 'No renderer console errors');
        check('Offline UI uses local assets without console errors');
        current.close();
        await waitFor(() => current.isDestroyed(), 'clean window close');
        await open(new GlobalConfig(profile));
        assert.equal((await evaluate('window.settingsAPI.get()')).settings.guilds_per_shard, 77);
        check('Clean close/reopen restores saved values');
        await current.loadURL('data:text/html,<h1>Different document</h1>');
        assert.equal(await evaluate('window.settingsAPI.get().then(() => false, () => true)'), true);
        check('Same webContents cannot invoke IPC after document origin changes');
        current.destroy();
        const corruptDirectory = path.join(profile, 'corrupt');
        fs.mkdirSync(corruptDirectory);
        fs.writeFileSync(path.join(corruptDirectory, 'config.json'), '{broken');
        await open(new GlobalConfig(corruptDirectory));
        await waitFor(() => evaluate('document.body.innerText.includes("read-only")'), 'read-only warning');
        assert.equal(await evaluate('(() => { const controls = [...document.querySelectorAll(".setting-row input, .setting-row select")]; return controls.length === 4 && controls.every(input => input.disabled); })()'), true);
        assert.equal(await evaluate('document.querySelector("input[type=search]").disabled'), false);
        assert.equal(await evaluate('[...document.querySelectorAll("button")].find(b => b.textContent === "Save changes").disabled'), true);
        assert.equal(fs.readFileSync(path.join(corruptDirectory, 'config.json'), 'utf8'), '{broken');
        assert.deepEqual(errors, []);
        check('Corrupt configuration displays read-only warning and preserves original');
        finish();
    }).catch(finish);
}

async function uiChecks(config, type, click, evaluate, waitFor, check, getWindow) {
    await waitFor(() => evaluate('document.querySelector("main").getAttribute("aria-busy") === "false"'), 'settings loaded');
    await waitFor(() => evaluate('!!document.querySelector("input[inputmode=numeric]")'), 'settings controls');
    const beforeEdit = fs.readFileSync(config.jsonPath, 'utf8');
    await type('input[inputmode=numeric]', '0');
    await waitFor(() => evaluate('document.querySelector("input[inputmode=numeric]").getAttribute("aria-invalid") === "true"'), 'validation error');
    assert.equal(await evaluate('[...document.querySelectorAll("button")].find(b => b.textContent === "Save changes").disabled'), true);
    assert.equal(fs.readFileSync(config.jsonPath, 'utf8'), beforeEdit);
    await click('Discard');
    await waitFor(() => evaluate('document.querySelector("input[inputmode=numeric]").value === "42"'), 'discard');
    check('Invalid input disables Save; Discard restores persisted value');
    await type('input[inputmode=numeric]', '77');
    fs.renameSync(config.jsonPath, `${config.jsonPath}.backup`);
    fs.mkdirSync(config.jsonPath);
    try {
        await click('Save changes');
        await waitFor(() => evaluate('/EPERM|EISDIR|EACCES/.test(document.body.innerText) && ![...document.querySelectorAll("button")].find(b => b.textContent === "Save changes").disabled'), 'save error shown');
        assert.equal(await evaluate('document.querySelector("input[inputmode=numeric]").value'), '77');
        assert.equal(config.snapshot().settings.guilds_per_shard, 42);
    } finally {
        fs.rmdirSync(config.jsonPath);
        fs.renameSync(`${config.jsonPath}.backup`, config.jsonPath);
    }
    assert.equal(fs.readFileSync(config.jsonPath, 'utf8'), beforeEdit);
    check('Real disk write failure preserves draft and stored settings for retry');
    await click('Save changes');
    await waitFor(() => evaluate('document.body.innerText.includes("Settings saved.")'), 'UI save');
    assert.equal(JSON.parse(fs.readFileSync(config.jsonPath, 'utf8')).settings.guilds_per_shard, 77);
    check('Actual renderer form saves edited value through preload to disk');
    getWindow().setContentSize(1040, 760);
    await new Promise(resolve => setTimeout(resolve, 120));
    fs.writeFileSync(path.join(output, 'settings-connection.png'), (await getWindow().webContents.capturePage()).toPNG());
    await type('input[aria-label="Search all settings"]', 'profile');
    await waitFor(() => evaluate('!!document.querySelector("[data-setting=generate_fake_profile]")'), 'cross-category search');
    assert.equal(await evaluate('document.querySelectorAll(".setting-row").length'), 1);
    await type('input[aria-label="Search all settings"]', 'zz-no-match');
    await waitFor(() => evaluate('document.body.innerText.includes("No matching settings")'), 'empty search');
    await click('Clear search');
    await waitFor(() => evaluate('!!document.querySelector("select[aria-labelledby=settings_theme-label]")'), 'theme choices');
    await evaluate('(() => { const select = document.querySelector("select[aria-labelledby=settings_theme-label]"); select.value = "light"; select.dispatchEvent(new Event("change", { bubbles: true })); })()');
    await waitFor(() => evaluate('document.querySelector("[data-theme]").dataset.theme === "light"'), 'light preview');
    await click('Discard');
    await waitFor(() => evaluate('document.querySelector("[data-theme]").dataset.theme === "dark"'), 'theme discard');
    check('Single-page search and dropdown theme preview/discard work');
    const beforeReset = fs.readFileSync(config.jsonPath, 'utf8');
    await click('Reset to defaults');
    await waitFor(() => evaluate('document.querySelector("input[inputmode=numeric]").value === "100"'), 'reset draft');
    assert.equal(fs.readFileSync(config.jsonPath, 'utf8'), beforeReset);
    await click('Discard');
    await waitFor(() => evaluate('document.querySelector("input[inputmode=numeric]").value === "77"'), 'discard reset');
    assert.equal(await evaluate('document.querySelectorAll("[data-setting=cache_assets]").length'), 0);
    check('Reset changes draft only; discard restores saved values; hidden cache setting absent');
    for (const [width, height] of [[840, 620], [720, 480]]) {
        const window = getWindow();
        window.setContentSize(width, height);
        await new Promise(resolve => setTimeout(resolve, 120));
        assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true, 'No horizontal overflow');
        assert.equal(await evaluate('(() => { const main = document.querySelector("main"); return main.scrollWidth <= main.clientWidth; })()'), true, 'No nested content horizontal overflow');
        assert.equal(await evaluate('(() => { const main = document.querySelector("main").getBoundingClientRect(); const controls = [...document.querySelectorAll(".setting-control input, .setting-control select, .setting-control .fui-Input, .setting-control .fui-Select, .setting-control .fui-Switch")]; return controls.length >= 4 && controls.every(control => { const rect = control.getBoundingClientRect(); return rect.left >= main.left && rect.right <= main.right; }); })()'), true, 'All controls stay within content horizontal bounds');
        assert.equal(await evaluate('(() => { const r = document.querySelector(".save-bar").getBoundingClientRect(); return r.bottom <= innerHeight && r.left >= 0; })()'), true);
        fs.mkdirSync(output, { recursive: true });
        const image = await window.webContents.capturePage();
        assert.deepEqual(image.getSize(), { width, height });
        fs.writeFileSync(path.join(output, `settings-revised-${width}x${height}.png`), image.toPNG());
    }
    fs.copyFileSync(path.join(output, 'settings-revised-840x620.png'), path.join(output, 'settings-revised.png'));
    check('840x620 and 720x480 screenshots; save bar fits both sizes');
}




