const { spawn } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const root = path.resolve(__dirname, '..');
const electron = require('electron');
const fixtures = [
    ['Settings storage', 'testSettingsStore.cjs', null, null, 30000],
    ['Settings window', 'testSettingsWindow.cjs', 'DBC_SETTINGS_TEST_PROFILE', 'dbc-settings-test-', 90000],
    ['Local server', 'testAppServer.cjs', 'DBC_SERVER_TEST_PROFILE', 'dbc-server-test-', 30000],
    ['Main window security', 'testMainWindowSecurity.cjs', 'DBC_SECURITY_TEST_PROFILE', 'dbc-security-test-', 90000],
    ['Message editor', 'testMessageEditor.cjs', 'DBC_EDITOR_TEST_PROFILE', 'dbc-editor-test-', 90000],
    ['Startup window', 'testStartupWindow.cjs', 'DBC_STARTUP_TEST_PROFILE', 'dbc-startup-test-', 80000],
];

for (const [name, file, profileKey, prefix, timeout] of fixtures) {
    test(name, { timeout: timeout + 5000 }, async () => {
        const profile = prefix && fs.mkdtempSync(path.join(os.tmpdir(), prefix));
        const env = { ...process.env };
        delete env.ELECTRON_RUN_AS_NODE;
        if (profile) env[profileKey] = profile;
        let output = '';
        try {
            await new Promise((resolve, reject) => {
                const child = spawn(electron, [path.join(__dirname, 'fixtures', file)], {
                    cwd: root, env, windowsHide: true, timeout,
                });
                for (const stream of [child.stdout, child.stderr]) {
                    stream.on('data', chunk => { output = (output + chunk).slice(-12000); });
                }
                child.once('error', reject);
                child.once('close', (code, signal) => {
                    if (code === 0) resolve();
                    else reject(new Error(`${name} exited with ${signal || code}\n${output}`));
                });
            });
        } finally {
            if (profile) {
                if (path.dirname(profile) !== os.tmpdir() || !path.basename(profile).startsWith(prefix)) {
                    throw new Error(`Unsafe test profile: ${profile}`);
                }
                fs.rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
            }
        }
    });
}
