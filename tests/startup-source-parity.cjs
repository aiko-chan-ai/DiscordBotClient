const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
assert.ok(process.argv[2], 'Usage: node tests/startup-source-parity.cjs <codex-startup-animation checkout>');
const upstream = path.resolve(process.argv[2]);
const read = file => fs.readFileSync(path.join(root, file), 'utf8').replaceAll('\r\n', '\n');
const readUpstream = file => fs.readFileSync(path.join(upstream, file), 'utf8').replaceAll('\r\n', '\n');
const original = readUpstream('animation.js');
function between(text, start, end) {
    const begin = text.indexOf(start), finish = text.indexOf(end, begin);
    assert.ok(begin >= 0 && finish > begin, `Section exists: ${start}`);
    return text.slice(begin, finish).trim();
}
const vectorizer = between(readUpstream('image-settings.js'), '  function vectorize(', "  if(typeof module")
    .replace('Math.round(y*1024/height)', 'Math.round(y*864/height)');
assert.equal(between(read('scripts/startup-image-contours.cjs'), '  function vectorize(', 'module.exports'), vectorizer);
const geometry = between(original, '  function preparePaths', '\n  for(let i=0;i<60;i++){')
    .replace('window.CONTOUR_PATHS || []', 'contours')
    .replace('Math.max(18,', 'Math.max(9,').replace('/1400', '/3500')
    .replaceAll('1024', '864');
assert.equal(between(read('assets/startup/startup-fragments.js'), '  function preparePaths', '\n  return {'), geometry);
const render = between(original, '  function render(t)', '  function updateButton()');
const migratedRender = between(read('assets/startup/startup-timeline.js'), '  function render(t)', '\n  return {')
    .replace('geometry.trace(', 'trace(')
    .replace('if(s>=4.74&&geometry.hasTexture())geometry.releaseIdentityTexture();', 'if(s>=4.74&&identityTexture)releaseIdentityTexture();')
    .replace('      document.body.dataset.stage=root.dataset.stage;\n', '');
const withoutRemovedCopy = code => code.split('\n').filter(line => ![
    '.boot-logs', 'subtitle.style.opacity', "$('#ratio')",
    "$('.sync-phase')", "$('#timecode')", 'slider.value', "$('#elapsed')",
].some(marker => line.includes(marker))).join('\n');
assert.equal(migratedRender, withoutRemovedCopy(render));
console.log('PASS: source pipeline and motion timeline preserved; requested density, 16:9 frame and text changes accounted for');
