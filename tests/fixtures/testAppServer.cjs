const assert = require('node:assert/strict');
const fs = require('node:fs');
const net = require('node:net');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');

{
    const { app, net: electronNet } = require('electron');
    const profile = process.env.DBC_SERVER_TEST_PROFILE;
    const useSystemProxy = process.env.DBC_TEST_SYSTEM_PROXY === '1';
    assert.ok(profile && path.basename(profile).startsWith('dbc-server-test-'));
    app.setPath('userData', profile);
    app.setAppPath(root);
    const { default: startAppServer, isLocalServerCertificate } = require('../../build/AppCore/APIServer.js');
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

        if (!useSystemProxy) app.commandLine.appendSwitch('no-proxy-server');
        assert.equal(app.commandLine.hasSwitch('no-proxy-server'), !useSystemProxy);
        await app.whenReady();
        const { session } = require('electron');
        session.defaultSession.setCertificateVerifyProc(({ hostname, certificate }, callback) => {
            callback(hostname === 'discord.com' ? (isLocalServerCertificate(certificate.data) ? 0 : -2) : -3);
        });
        app.configureHostResolver({ enableBuiltInResolver: false, secureDnsMode: 'off' });
        await connect('127.0.0.1', port);
        await assert.rejects(connect('::1', port));
        await assert.rejects(electronNet.fetch(`https://127.0.0.1:${port}/app`), /CERT|certificate/i);
        const response = await electronNet.fetch('https://discord.com/app');
        assert.equal(response.status, 200);
        assert.equal(await response.text(), fs.readFileSync(path.join(root, 'assets/snapshot/index.html'), 'utf8'));
        clearTimeout(watchdog);
        console.log(`PASS: ${useSystemProxy ? "system proxy enabled" : "direct connections"} and host rule serve the bundled app page`);
        app.exit(0);
    }).catch(error => { clearTimeout(watchdog); console.error(error); app.exit(1); });
}
