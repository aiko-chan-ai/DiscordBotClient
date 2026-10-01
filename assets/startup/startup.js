"use strict";

const api = window.startupAPI;
const status = document.getElementById("status");
const actions = document.getElementById("actions");

function render(state) {
    status.textContent = state.message || (state.phase === "error" ? "Unable to start." : "Starting...");
    actions.hidden = state.phase !== "error";
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
    if (!receivedUpdate) render({ phase: "error", message: "Unable to read startup status. Please retry." });
});

document.getElementById("retry").addEventListener("click", () => api.retry());
document.getElementById("quit").addEventListener("click", () => api.quit());
document.getElementById("close").addEventListener("click", () => api.quit());
window.addEventListener("unload", unsubscribe, { once: true });
