const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');

{
    const { app, BrowserWindow } = require('electron');
    const profile = process.env.DBC_SECURITY_TEST_PROFILE;
    assert.ok(profile && path.basename(profile).startsWith('dbc-security-test-'));
    app.setPath('userData', profile);
    app.setAppPath(root);
    app.commandLine.appendSwitch('use-fake-device-for-media-stream');
    require('../../build/AppCore/Constants.js').default.VerboseAPIServerLogging = false;
    const { DiscordBotClient } = require('../../build/AppCore/index.js');
    const client = new DiscordBotClient();
    globalThis.botClient = client;
    let attacker;
    const watchdog = setTimeout(() => finish(new Error('Main-window security test timed out')), 60000);
    function finish(error) {
        clearTimeout(watchdog);
        if (attacker && !attacker.isDestroyed()) attacker.destroy();
        for (const win of BrowserWindow.getAllWindows()) win.destroy();
        console[error ? 'error' : 'log'](error?.stack || 'PASS: secure main window, typed sandbox preload, extension and scoped IPC');
        app.exit(error ? 1 : 0);
    }
    async function waitFor(predicate, timeout = 35000) {
        const deadline = Date.now() + timeout;
        while (!(await predicate())) {
            assert.ok(Date.now() < deadline, 'Timed out waiting for main page');
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
    (async () => {
        await waitFor(() => client.appWindow && !client.appWindow.isDestroyed());
        const contents = client.discordWebContents;
        const preferences = contents.getLastWebPreferences();
        assert.equal(preferences.sandbox, true);
        assert.equal(preferences.webSecurity, true);
        assert.equal(preferences.contextIsolation, true);
        assert.equal(preferences.nodeIntegration, false);
        await waitFor(async () => {
            if (!contents.getURL().startsWith('https://discord.com/')) return false;
            try { return await contents.executeJavaScript('document.readyState !== "loading" && !!window.BotClientNative'); }
            catch { return false; }
        });
        const state = await contents.executeJavaScript('({origin:location.origin,node:typeof require,name:window.BotClientNative.getBotClientName()})');
        assert.equal(state.origin, 'https://discord.com');
        assert.equal(state.node, 'undefined');
        assert.equal(typeof state.name, 'string');
        const experiments = await contents.executeJavaScript('({user:window.BotClientNative.getUserExperiments([{id:"2023-09_iar_user_reporting"}],"123"),guild:window.BotClientNative.getGuildExperiments(),apex:window.BotClientNative.getApexExperiments("123")})');
        assert.ok(Array.isArray(experiments.user), 'User experiments must be an array');
        assert.ok(Array.isArray(experiments.guild), 'Guild experiments must be an array');
        assert.ok(experiments.apex && typeof experiments.apex === 'object', 'Apex experiments must be an object');
        assert.ok(client.discordSession.extensions.getAllExtensions().some(extension => extension.name === 'Vencord Web'));
        assert.equal(await contents.executeJavaScript('typeof Vencord'), 'object');
        const preloadSource = fs.readFileSync(path.join(root, 'build/AppCore/Preloads/ElectronPreload.js'), 'utf8');
        assert.doesNotMatch(preloadSource, /require\(["']\.\.\/IPCEvents/);
        assert.equal(await contents.executeJavaScript('navigator.mediaDevices.getUserMedia({audio:true}).then(stream => { stream.getTracks().forEach(track => track.stop()); return true; }, () => false)'), true);
        assert.equal(await contents.executeJavaScript('navigator.mediaDevices.getUserMedia({video:true}).then(stream => { stream.getTracks().forEach(track => track.stop()); return true; }, () => false)'), false);
        attacker = new BrowserWindow({ show: false, webPreferences: {
            preload: path.join(root, 'build/AppCore/Preloads/ElectronPreload.js'),
            sandbox: true, contextIsolation: true, nodeIntegration: false,
        } });
        await attacker.loadURL('data:text/html,<title>Untrusted</title>');
        assert.equal(await attacker.webContents.executeJavaScript('window.BotClientNative.getBotClientName()'), null);
        assert.equal(await attacker.webContents.executeJavaScript('window.BotClientNative.getUserExperiments([], "123")'), null);
        assert.equal(await attacker.webContents.executeJavaScript('window.BotClientNative.requestOpenMessageEditorWindow().then(() => false, () => true)'), true);
        await contents.executeJavaScript('location.href = "https://example.invalid/"');
        await new Promise(resolve => setTimeout(resolve, 200));
        assert.equal(new URL(contents.getURL()).origin, 'https://discord.com');
        finish();
    })().catch(finish);
}