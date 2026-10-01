/* Run after npm run build:ts and npm run discohook: node scripts/testMessageEditor.cjs */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { once } = require('node:events');
const root = path.resolve(__dirname, '..');
if (!process.versions.electron) {
    const { spawn } = require('node:child_process');
    const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'dbc-editor-test-'));
    const env = { ...process.env, DBC_EDITOR_TEST_PROFILE: profile };
    delete env.ELECTRON_RUN_AS_NODE;
    const child = spawn(require('electron'), [__filename], { cwd: root, env, windowsHide: true, stdio: 'inherit' });
    child.on('error', error => { console.error(error); process.exitCode = 1; });
    child.on('close', code => {
        assert.ok(path.dirname(profile) === os.tmpdir() && path.basename(profile).startsWith('dbc-editor-test-'));
        fs.rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
        process.exitCode = code ?? 1;
    });
} else {
    const { app, BrowserWindow, ipcMain } = require('electron');
    const profile = process.env.DBC_EDITOR_TEST_PROFILE;
    app.setPath('userData', profile);
    app.setAppPath(root);
    const { MessageEditorWindow } = require('../build/AppCore/MessageEditorWindow.js');
    require('../build/AppCore/index.js'); // Load the same boot modules as the production entry.
    app.on('window-all-closed', () => {});
    const errors = [];
    const requests = [];
    let editor, host;
    const watchdog = setTimeout(() => finish(new Error('Editor test exceeded 60 seconds')), 60000);
    function finish(error) {
        clearTimeout(watchdog);
        if (editor && !editor.isDestroyed()) editor.destroy();
        if (host && !host.isDestroyed()) host.destroy();
        console[error ? 'error' : 'log'](error?.stack || 'PASS: editor protocol, local assets, isolation, init/submit MessagePort and cleanup');
        if (errors.length) console.log('Renderer errors:', errors);
        app.exit(error ? 1 : 0);
    }
    async function waitFor(predicate) {
        const deadline = Date.now() + 15000;
        while (!await predicate()) {
            assert.ok(Date.now() < deadline, 'Timed out waiting for editor state');
            await new Promise(resolve => setTimeout(resolve, 40));
        }
    }
    app.whenReady().then(async () => {
        const preload = path.join(profile, 'host.cjs');
        fs.writeFileSync(preload, `const {ipcRenderer}=require('electron');
            ipcRenderer.on('app:main_receive_editor_port',event=>{
                const port=event.ports[0];
                port.onmessage=event=>ipcRenderer.send('test:submitted',event.data);
                port.start();
                port.postMessage({type:'init',profile:{username:'Editor test',avatar_url:'/logos/discohook.svg'},mode:{type:'create'},messages:[{data:{content:'Protocol smoke test'}}]});
            });`);
        host = new BrowserWindow({ show: false, webPreferences: { preload } });
        await host.loadURL('data:text/html,<title>Editor test host</title>');
        const submitted = once(ipcMain, 'test:submitted');
        editor = new MessageEditorWindow(host, host.webContents).window;
        const contents = editor.webContents;
        const editorSession = contents.session;
        contents.on('console-message', event => { if (event.level === 'error') errors.push(event.message); });
        editorSession.webRequest.onBeforeRequest((details, callback) => {
            requests.push(details.url);
            callback({ cancel: /^https?:/.test(details.url) });
        });
        const evaluate = code => contents.executeJavaScript(code);
        await once(contents, 'did-finish-load');
        await waitFor(() => evaluate('window.DiscohookEditor?.getProfile()?.username === "Editor test"'));
        assert.equal(contents.getURL(), 'dbc-editor://app/');
        assert.equal(await evaluate('location.origin'), 'dbc-editor://app');
        assert.equal(await evaluate('typeof require'), 'undefined');
        assert.equal(contents.getLastWebPreferences().sandbox, true);
        assert.equal(contents.getLastWebPreferences().webSecurity, true);
        assert.equal((await evaluate('window.DiscohookEditor.getData()')).messages[0].data.content, 'Protocol smoke test');
        await evaluate('window.DiscohookEditor.setData({messages:[{data:{content:"Protocol smoke test",embeds:[{title:"Local editor"}]}}]})');
        await waitFor(() => evaluate('[...document.querySelectorAll("button")].some(b=>b.textContent.trim()==="Add URL")'));
        await evaluate('[...document.querySelectorAll("button")].find(b=>b.textContent.trim()==="Add URL" && b.closest("details").querySelector("summary").textContent.includes("Body")).click()');
        await waitFor(() => evaluate('window.DiscohookEditor.getData().messages[0].data.embeds[0].url?.startsWith("https://discohook.app#default-")'));
        const resources = await evaluate(`Promise.all(['/emoji.json'].map(async p=>{
            const response=await fetch(p);const value=await response.json();return response.ok&&typeof value==='object';
        }))`);
        assert.deepEqual(resources, [true]);
        assert.equal(requests.some(url=>url.includes('/i18n/')),false,'Translation must be bundled, not fetched');
        for (const [url, status, method] of [
            ['dbc-editor://other/index.html',403,'GET'],
            ['dbc-editor://app/%2e%2e%2f%2e%2e%2fpackage.json',403,'GET'],
            ['dbc-editor://app/index.html:secret',403,'GET'],
            ['dbc-editor://app/missing-file',404,'GET'],
            ['dbc-editor://app/',405,'POST'],
        ]) assert.equal((await editorSession.fetch(url,{method})).status,status,url);
        assert.equal(await host.webContents.session.protocol.isProtocolHandled('dbc-editor'), false);
        await evaluate('location.href="https://example.invalid/"');
        await new Promise(resolve => setTimeout(resolve,100));
        assert.equal(contents.getURL(),'dbc-editor://app/');
        assert.equal(requests.some(url=>/localhost|127\.0\.0\.1/.test(url)),false);
        const output=path.join(root,'plans','261001-message-editor');
        fs.mkdirSync(output,{recursive:true});
        fs.writeFileSync(path.join(output,'editor.png'),(await contents.capturePage()).toPNG());
        assert.deepEqual(errors,[]);
        await evaluate(`(() => {
            const button=[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='Send Message');
            if(!button) throw Error('Send button not found: '+[...document.querySelectorAll('button')].map(b=>b.textContent).join('|'));
            button.click();
        })()`);
        const [, payload]=await submitted;
        assert.equal(payload.type,'submit');
        assert.equal(payload.action,'send');
        assert.equal(payload.messages[0].data.content,'Protocol smoke test');
        assert.match(payload.messages[0].data.embeds[0].url,/^https:\/\/discohook\.app#default-/);
        await waitFor(()=>editor.isDestroyed());
        assert.equal(await editorSession.protocol.isProtocolHandled('dbc-editor'),false);
        fs.writeFileSync(path.join(output,'results.json'),JSON.stringify({passed:true,requests,errors},null,2));
        finish();
    }).catch(finish);
}
