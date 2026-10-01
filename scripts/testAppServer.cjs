/* Run after npm run build:ts: node scripts/testAppServer.cjs */
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const net = require('node:net');
const os = require('node:os');
const path = require('node:path');
const root = path.resolve(__dirname, '..');

if (!process.versions.electron) {
    const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'dbc-server-test-'));
    const env = { ...process.env, DBC_SERVER_TEST_PROFILE: profile };
    delete env.ELECTRON_RUN_AS_NODE;
    const child = spawn(require('electron'), [__filename], { cwd: root, env, windowsHide: true, stdio: 'inherit' });
    child.on('error', error => { console.error(error); process.exitCode = 1; });
    child.on('close', code => {
        assert.equal(path.dirname(profile), os.tmpdir());
        assert.match(path.basename(profile), /^dbc-server-test-/);
        fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
        process.exitCode = code ?? 1;
    });
} else {
    const { app, net: electronNet } = require('electron');
    const profile = process.env.DBC_SERVER_TEST_PROFILE;
    assert.ok(profile && path.basename(profile).startsWith('dbc-server-test-'));
    app.setPath('userData', profile);
    app.setAppPath(root);
    const startAppServer = require('../build/AppCore/APIServer.js').default;
    const connect = (host, port) => new Promise((resolve, reject) => {
        const socket = net.connect({ host, port });
        socket.once('connect', () => { socket.destroy(); resolve(); });
        socket.once('error', reject);
        socket.setTimeout(3000, () => socket.destroy(new Error('Connection timed out')));
    });
    const watchdog = setTimeout(() => app.exit(2), 15000);
    startAppServer().then(async port => {
        assert.equal(app.isReady(), false, 'Host rules must be set before Electron is ready');
        app.commandLine.appendSwitch('host-rules', `MAP discord.com 127.0.0.1:${port}`);
        app.commandLine.appendSwitch('ignore-certificate-errors');
        app.commandLine.appendSwitch('no-proxy-server');
        await app.whenReady();
        app.configureHostResolver({ enableBuiltInResolver: false, secureDnsMode: 'off' });
        await connect('127.0.0.1', port);
        await assert.rejects(connect('::1', port));
        const response = await electronNet.fetch('https://discord.com/app');
        assert.equal(response.status, 200);
        assert.equal(await response.text(), fs.readFileSync(path.join(root, 'assets/snapshot/index.html'), 'utf8'));
        clearTimeout(watchdog);
        console.log('PASS: IPv4-only server and offline-DNS host rule serve the bundled app page');
        app.exit(0);
    }).catch(error => { clearTimeout(watchdog); console.error(error); app.exit(1); });
}
