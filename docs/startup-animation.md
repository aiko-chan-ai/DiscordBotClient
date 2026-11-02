# Startup animation

Startup animation logic is adapted from
[panding999/codex-startup-animation](https://github.com/panding999/codex-startup-animation).

The port preserves its contour vectorizer (Sobel, non-maximum suppression and
connected-path tracing), equal-length fragments, avatar texture fragments,
left-to-right contour assembly, color reveal and 12-second shutter timeline.
Geometry and the timeline are separate local scripts; no animation package is added.
Fragment density uses minimum span 9 and target 3500. The actual count depends on
the image's contour paths and sampling resolution.

The progress bar follows the animation's fixed 12-second timeline and easing
milestones. It does not measure or estimate application download, resource loading,
gateway connection or login progress. Navigation readiness is a separate signal
from the main window's successful `loadURL` promise.

The existing sandboxed startup preload exposes owner-scoped reveal/completion signals.
DBC loads concurrently. Once navigation succeeds, shutter start reveals the main
window behind the transparent startup window; completion removes startup and focuses
the application. Slow navigation holds the portrait. Skip/Escape and reduced motion
bypass the animation only. A 15-second fallback after successful navigation prevents
a failed animation renderer from blocking access; loading failures retain Retry/Quit.

`default-contours.js` must be generated from the same centered 16:9 artwork frame used
by the image element. `scripts/startup-image-contours.cjs` contains the upstream
vectorizer; contours use 1536x864 coordinates to match the full banner.

To regenerate contours from `assets/startup/banner.png`, run:

```sh
node scripts/startup-generate-contours.cjs
node scripts/startup-generate-contours.cjs --check
```

The generator uses the installed Electron image decoder, crops to a centered 16:9
frame and samples at 910x512 (512 pixels high, width rounded from 16:9). It feeds RGBA pixels to the vectorizer and writes
`assets/startup/default-contours.js`. No temporary raw image or files in `plans`
are required. The checked-in contours are used at runtime; generation is only
needed when changing the banner or vectorizer.

Optional upstream source comparison accepts a separate checkout:
`node tests/startup-source-parity.cjs /path/to/codex-startup-animation`.

The banner retains the full supplied 2560x1440 image, credited to **Mihoyo**.
The opening avatar retains DBC's existing app icon.
The credit button opens [Mihoyo](https://www.mihoyo.com/) through owner-scoped IPC and the
system browser; the renderer cannot supply an arbitrary external URL.
Normal startup shows only the app name and Skip/Escape and artwork-credit controls.
Status text and Retry/Quit appear only when loading fails.

Artwork and Skip share the same typography, border, padding and hover style.
Artwork opens the fixed credit link; Skip/Escape only skips animation.

The modern startup title and controls use **Playpen Sans**, bundled locally as
`assets/startup/fonts/playpen-sans-variable.ttf` (weights 100–800) with its OFL license.
The font comes from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/playpensans).
Animation preparation waits for the font before rasterizing title fragments;
no font download is needed at runtime.

## Startup mode

App Settings → **Startup animation** selects **Modern (default)** or
**Discord Style** (the original 300x350 GIF window). The `startup_animation`
setting is persisted in `config.json` and applies on the next application launch,
including the startup-error window. Existing configurations missing this key
default to `modern`. Classic uses `classic.html`, `classic.css` and `waiting.gif`
with the shared sandboxed preload and status/Retry/Quit controller; it does not
wait for the cinematic animation.

Validated with real Electron stage captures and the seven integration tests.
