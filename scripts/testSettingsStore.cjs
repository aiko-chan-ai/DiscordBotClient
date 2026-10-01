/* Copyright Elysia © 2025. All rights reserved */

// Run with: node_modules/.bin/electron scripts/testSettingsStore.cjs
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { app } = require("electron");
const root = fs.mkdtempSync(path.join(os.tmpdir(), "dbc-settings-test-"));
app.setPath("userData", root);
require("tsx/cjs");
const { GlobalConfig } = require("../src/AppCore/Config.ts");
const { defaultSettings, settingsDefinitions, validateSetting, validateSettings } = require("../src/shared/Settings.ts");
let count = 0;
let exitCode = 0;
function test(name, run) {
    run();
    count++;
    console.log(`PASS ${name}`);
}
function profile(name, file, content) {
    const directory = path.join(root, name);
    fs.mkdirSync(directory);
    if (file) fs.writeFileSync(path.join(directory, file), content);
    return directory;
}
try {
    test("definitions supply defaults and valid unique keys", () => {
        assert.equal(new Set(settingsDefinitions.map(definition => definition.key)).size, settingsDefinitions.length);
        assert.deepEqual(Object.keys(defaultSettings), settingsDefinitions.map(definition => definition.key));
        for (const definition of settingsDefinitions) {
            assert.equal(defaultSettings[definition.key], definition.defaultValue);
            assert.equal(validateSetting(definition, definition.defaultValue), undefined);
            if (definition.type === "select") {
                assert.equal(new Set(definition.options.map(option => option.value)).size, definition.options.length);
            }
        }
        assert.equal(settingsDefinitions.find(definition => definition.key === "cache_assets").hidden, true);
    });
    test("field validation handles each supported type and numeric bounds", () => {
        const base = { key: "example", displayName: "Example", description: "Example field" };
        const text = { ...base, type: "string", defaultValue: "" };
        assert.equal(validateSetting(text, ""), undefined);
        assert.equal(validateSetting(text, "hello"), undefined);
        assert.ok(validateSetting(text, 42));
        const number = { ...base, type: "number", defaultValue: 1, min: 0, max: 2 };
        for (const value of [0, 0.5, 2]) assert.equal(validateSetting(number, value), undefined);
        for (const value of [-1, 3, NaN, Infinity, "1", null]) assert.ok(validateSetting(number, value));
        assert.ok(validateSetting({ ...number, integer: true }, 0.5));
        for (const definition of settingsDefinitions) {
            if (definition.type === "boolean") {
                assert.equal(validateSetting(definition, !definition.defaultValue), undefined);
                assert.ok(validateSetting(definition, "true"));
            }
            if (definition.type === "select") {
                for (const option of definition.options) assert.equal(validateSetting(definition, option.value), undefined);
                for (const value of ["blue", 0, null, true]) assert.ok(validateSetting(definition, value));
            }
        }
    });
    test("strict validation and detached returned value", () => {
        assert.deepEqual(validateSettings(defaultSettings), defaultSettings);
        assert.notEqual(validateSettings(defaultSettings), defaultSettings);
        for (const value of [0, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1, "100"]) {
            assert.throws(() => validateSettings({ ...defaultSettings, guilds_per_shard: value }));
        }
        for (const key of ["cache_assets", "suppress_intent_warning", "generate_fake_profile", "auto_check_updates", "use_system_proxy"]) {
            assert.throws(() => validateSettings({ ...defaultSettings, [key]: "true" }));
        }
        for (const value of [null, [], {}, { ...defaultSettings, extra: true }, { ...defaultSettings, settings_theme: "blue" }, { ...defaultSettings, doh_provider: "custom" }]) {
            assert.throws(() => validateSettings(value));
        }
        for (const key of ["__proto__", "constructor", "prototype"]) {
            assert.throws(() => validateSettings(JSON.parse(JSON.stringify(defaultSettings).replace(/}$/, `,"${key}":{}}`))));
        }
        assert.equal(validateSettings({ ...defaultSettings, guilds_per_shard: Number.MAX_SAFE_INTEGER }).guilds_per_shard, Number.MAX_SAFE_INTEGER);
    });
    test("first launch persists defaults and save survives reopen", () => {
        const directory = profile("fresh");
        const store = new GlobalConfig(directory);
        assert.deepEqual(store.snapshot(), { settings: defaultSettings, readOnly: false });
        const changed = { ...defaultSettings, cache_assets: true, settings_theme: "light" };
        store.save(changed);
        assert.deepEqual(new GlobalConfig(directory).config, changed);
        const snapshot = store.snapshot();
        snapshot.settings.cache_assets = false;
        assert.equal(store.config.cache_assets, true);
    });
    test("legacy INI coercion, defaults, and original preservation", () => {
        const original = '; comment\ncache_assets="TRUE"\nguilds_per_shard="250"\n';
        const directory = profile("legacy", "config.ini", original);
        const store = new GlobalConfig(directory);
        assert.deepEqual(store.config, { ...defaultSettings, cache_assets: true, guilds_per_shard: 250 });
        assert.equal(fs.readFileSync(store.iniPath, "utf8"), original);
        assert.equal(JSON.parse(fs.readFileSync(store.jsonPath, "utf8")).version, 1);
    });
    test("JSON wins over legacy and fills missing settings", () => {
        const directory = profile("priority", "config.json", JSON.stringify({ version: 1, settings: { cache_assets: true } }));
        fs.writeFileSync(path.join(directory, "config.ini"), "invalid legacy");
        assert.deepEqual(new GlobalConfig(directory).config, { ...defaultSettings, cache_assets: true });
    });
    test("malformed and unsupported files preserved and read-only", () => {
        const cases = [
            ["config.json", "{"],
            ["config.json", JSON.stringify({ version: 2, settings: defaultSettings })],
            ["config.json", JSON.stringify({ version: 1, settings: { guilds_per_shard: "100" } })],
            ["config.json", '{"version":1,"settings":{"__proto__":{}}}'],
            ["config.ini", "not an assignment"],
            ["config.ini", "guilds_per_shard=0"],
            ["config.ini", "__proto__=true"],
        ];
        cases.forEach(([file, original], index) => {
            const directory = profile(`invalid-${index}`, file, original);
            const store = new GlobalConfig(directory);
            assert.deepEqual(store.config, defaultSettings);
            assert.equal(store.snapshot().readOnly, true);
            assert.ok(store.snapshot().warning);
            assert.throws(() => store.save(defaultSettings));
            assert.equal(fs.readFileSync(path.join(directory, file), "utf8"), original);
        });
    });
    test("failed atomic replacement keeps runtime settings and cleans temporary file", () => {
        const directory = profile("failure");
        const store = new GlobalConfig(directory);
        fs.unlinkSync(store.jsonPath);
        fs.mkdirSync(store.jsonPath);
        assert.throws(() => store.save({ ...defaultSettings, cache_assets: true }));
        assert.deepEqual(store.config, defaultSettings);
        assert.deepEqual(fs.readdirSync(directory), ["config.json"]);
    });
    console.log(`${count} settings storage tests passed.`);

} catch (error) {
    console.error(error);
    exitCode = 1;
} finally {
    const resolvedRoot = path.resolve(root);
    assert.equal(path.dirname(resolvedRoot), path.resolve(os.tmpdir()));
    assert.match(path.basename(resolvedRoot), /^dbc-settings-test-[A-Za-z0-9]+$/);
    fs.rmSync(resolvedRoot, { recursive: true, force: true });
    assert.equal(fs.existsSync(resolvedRoot), false);
}

app.exit(exitCode);

