"use strict";

const api = window.startupAPI;
const status = document.getElementById("status");
const actions = document.getElementById("actions");
const feedback = document.querySelector(".feedback");
const skip = document.getElementById("skip");
const animation = skip && window.createStartupAnimation(
    document.querySelector("canvas"), document.getElementById("avatar"), document.getElementById("artwork"),
    () => { skip.hidden = true; api.animationFinished(); },
    () => api.revealApplication(),
);

function render(state) {
    feedback.hidden = !!animation && state.phase !== "error";
    status.textContent = state.phase === "error" ? state.message || "Unable to start."
        : animation ? "" : state.phase === "loading" ? "Loading DBC..." : "Starting...";
    actions.hidden = state.phase !== "error";
    document.body.classList.toggle("failed", state.phase === "error");
    if (state.phase === "ready") animation?.ready();
    if (state.phase === "error") { animation?.stop(); if (skip) skip.hidden = true; }
}

// Subscribe first so an in-flight snapshot cannot overwrite a newer update.
let receivedUpdate = false;
const unsubscribe = api.onStateChanged(state => {
    receivedUpdate = true;
    render(state);
});
api.getState().then(state => {
    if (!receivedUpdate) render(state);
}).catch(() => {
    if (!receivedUpdate) render({ phase: "error" });
});

document.getElementById("retry").addEventListener("click", () => api.retry());
document.getElementById("quit").addEventListener("click", () => api.quit());
document.getElementById("close").addEventListener("click", () => api.quit());
document.getElementById("artwork-credit")?.addEventListener("click", () => {
    api.openArtworkCredit().catch(console.error);
});
skip?.addEventListener("click", () => animation.skip());
window.addEventListener("keydown", event => {
    if (event.key === "Escape" && skip && !skip.hidden) { event.preventDefault(); animation.skip(); }
});
window.addEventListener("unload", () => animation?.stop(), { once: true });
window.addEventListener("unload", unsubscribe, { once: true });
