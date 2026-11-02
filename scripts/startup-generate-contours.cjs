const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const electron = require('electron');
const { vectorize } = require('./startup-image-contours.cjs');
const root = path.resolve(__dirname, '..');
const sampleWidth = 1024, sampleHeight = 576;

if (!process.versions.electron) {
    const env = { ...process.env };
    delete env.ELECTRON_RUN_AS_NODE;
    const child = spawnSync(electron, [__filename, ...process.argv.slice(2)], { env, stdio: 'inherit', windowsHide: true });
    if (child.error) throw child.error;
    process.exit(child.status ?? 1);
}

try {
    const source = electron.nativeImage.createFromPath(path.join(root, 'assets/startup/banner.png'));
    assert.ok(!source.isEmpty(), 'Cannot decode assets/startup/banner.png');
    const size = source.getSize();
    const width = Math.min(size.width, Math.floor(size.height * 16 / 9));
    const height = Math.min(size.height, Math.floor(size.width * 9 / 16));
    const pixels = source.crop({ x: Math.floor((size.width - width) / 2), y: Math.floor((size.height - height) / 2), width, height })
        .resize({ width: sampleWidth, height: sampleHeight, quality: 'best' }).toBitmap();
    // Electron bitmaps are BGRA; the upstream vectorizer expects RGBA.
    for (let index = 0; index < pixels.length; index += 4) {
        const blue = pixels[index]; pixels[index] = pixels[index + 2]; pixels[index + 2] = blue;
    }
    assert.equal(pixels.length, sampleWidth * sampleHeight * 4);
    const contours = vectorize(pixels, sampleWidth, sampleHeight);
    if (!contours.length) throw new Error('No contours found in the default artwork');
    const output = path.join(root, 'assets/startup/default-contours.js');
    const generated = '// Generated from the same centered 16:9 frame as the startup artwork.\nwindow.CONTOUR_PATHS=' + JSON.stringify(contours) + ';\n';
    if (process.argv.includes('--check')) {
        assert.ok(fs.readFileSync(output, 'utf8').replaceAll('\r\n', '\n') === generated, 'Run node scripts/startup-generate-contours.cjs to update contours');
    } else {
        fs.writeFileSync(output, generated);
    }
    console.log(`${sampleWidth}x${sampleHeight}: ${contours.length} contour paths, ${contours.reduce((sum, points) => sum + points.length, 0)} points`);
    electron.app.exit(0);
} catch (error) {
    console.error(error.message);
    electron.app.exit(1);
}
