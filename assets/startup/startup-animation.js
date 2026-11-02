"use strict";

// DBC lifecycle adapter; drawing, geometry and timings live in the ported source modules.
window.createStartupAnimation = (_canvas, avatar, artwork, onComplete, onReveal) => {
    const timeline = window.createStartupTimeline(() => { if (ready && !stopped) onReveal(); });
    const root = document.querySelector('.window');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, origin = 0, loaded = false, ready = false, stopped = false, completed = false;

    function complete(skipped = false) {
        if (completed || stopped) return;
        completed = true;
        cancelAnimationFrame(frame);
        timeline.render(skipped ? 10000 : 12000);
        root.dataset.completed = 'true';
        document.body.dataset.animationComplete = 'true';
        timeline.dispose();
        onComplete();
    }

    function tick(now) {
        if (stopped || completed) return;
        const elapsed = Math.min(12000, now - origin);
        // Keep the portrait visible while navigation is still pending.
        if (elapsed >= 11000 && !ready) { timeline.render(10999); frame = 0; return; }
        timeline.render(elapsed);
        if (elapsed >= 12000) { complete(); return; }
        frame = requestAnimationFrame(tick);
    }

    const motionChanged = () => { if (reduced.matches) complete(true); };
    reduced.addEventListener('change', motionChanged);
    Promise.all([avatar.decode(), artwork.decode(), document.fonts.load('700 30px "Playpen Sans"')]).then(() => {
        loaded = true;
        if (stopped || completed) return;
        if (reduced.matches) { complete(true); return; }
        timeline.warm();
        origin = performance.now();
        frame = requestAnimationFrame(tick);
    }).catch(error => {
        console.error('Startup animation assets could not be prepared:', error);
        complete(true);
    });

    return {
        skip: () => complete(true),
        ready() {
            ready = true;
            if (loaded && !frame && !completed && !stopped) {
                origin = performance.now() - 11000;
                frame = requestAnimationFrame(tick);
            }
        },
        stop() {
            stopped = true;
            cancelAnimationFrame(frame);
            timeline.render(10000);
            timeline.dispose();
            reduced.removeEventListener('change', motionChanged);
        },
    };
};
