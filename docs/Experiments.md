## [User Experiment Structure](https://docs.discord.food/topics/experiments#user-experiment-structure)

This object is represented as an array of the following fields:

| Field                | Type     | Description                                                                                                                         |
| -------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| hash                 | integer  | 32-bit unsigned Murmur3 hash of the experiment's name                                                                               |
| revision             | integer  | Current version of the rollout                                                                                                      |
| bucket               | integer  | The requesting user or fingerprint's assigned experiment bucket                                                                     |
| override             | integer  | Whether the user or fingerprint has an override for the experiment (-1 for false, 0 for true)                                       |
| population           | integer  | The internal population group the requesting user or fingerprint is in                                                              |
| hash_result          | integer  | The calculated rollout position to use, prioritized over local calculations                                                         |
| aa_mode[^1]          | integer  | The experiment's A/A testing mode, represented as an integer-casted boolean (0 for false, 1 for true)                               |
| trigger_debugging    | integer  | Whether the experiment's analytics trigger debugging is enabled, represented as an integer-casted boolean (0 for false, 1 for true) |
| holdout_name[^2]     | ?string  | A human-readable experiment name (formatted as year-month_name) that disables the experiment                                        |
| holdout_revision[^2] | ?integer | The revision of the holdout experiment                                                                                              |
| holdout_bucket[^2]   | ?integer | The requesting user or fingerprint's assigned bucket for the holdout experiment                                                     |

[^1]: The bucket for A/A tested experiments should always be None (-1) unless an override is present for the resource.

[^2]:
    Holdout information is only present if the user or fingerprint has an assigned bucket for the holdout experiment. Therefore, if holdout experiment information
    is present and the population bucket is set to None (-1), the experiment has been disabled by the holdout. As user experiments are opaque, no client handling is
    required for this field. Just follow the population field as usual.

## Dump user experiments

Run in the DevTools console of a logged-in **real user account** after READY.
Save the copied JSON as `assets/snapshot/user_experiments.json`.
The output is the original READY tuple array, including hashes unknown to the
currently loaded client, rollout positions and holdout fields. Local experiment
overrides are deliberately excluded. An empty array is a valid empty assignment.

```js
(() => {
    let findByProps = window.Vencord?.Webpack.findByProps;
    if (!findByProps) {
        const modules = webpackChunkdiscord_app.push([[Symbol()], {}, r => r.c]);
        webpackChunkdiscord_app.pop();
        findByProps = (...props) => {
            for (const module of Object.values(modules)) {
                try {
                    const exports = module.exports;
                    if (!exports || exports === window) continue;
                    for (const value of [exports, ...Object.values(exports)]) {
                        if (value && props.every(prop => typeof value[prop] === "function")) return value;
                    }
                } catch {}
            }
            throw new Error(`Discord module not found: ${props.join(", ")}`);
        };
    }
    const store = findByProps("takeSnapshot", "getAllUserExperimentDescriptors");
    const snapshot = store.takeSnapshot().data;
    if (snapshot.source !== "ready_payload" || !Array.isArray(snapshot.rawUserExperiments)) {
        throw new Error("Wait for the logged-in account's READY before dumping experiments");
    }
    copy(JSON.stringify(snapshot.rawUserExperiments));
})();
```

## [Apex Experiment Object](https://docs.discord.food/topics/experiments#apex-experiments-object)

Similarly to user experiments, this object is represented as an array of the following fields:

| Field       | Type     | Description                                                    |
| ----------- | -------- | -------------------------------------------------------------- |
| hashed_name | integer  | 32-bit unsigned Murmur3 hash of the experiment's name          |
| variant_id  | integer  | The ID of the assigned experiment variant for target ~(bucket) |
| flags       | ?integer | The experiment's flags                                         |
| revision    | integer  | Current version of the rollout                                 |

### Apex Experiment Flags

| Bit | Meaning |
| --- | --- |
| 1 | Override |
| 2 | Exposure tracking enabled |
| 4 | Dependent experiment |
| 8 | Use as eligibility |

The current client also accepts optional `tracked_variant_id` and `config` at
indices 4 and 5 of an assignment tuple. Preserve the entire tuple, including any
future trailing fields. Rebuilding tuples from `getState()` loses flag bit 4.

## Dump Apex user experiments

Run on the real user account. **This snippet reconnects the Gateway once** to
capture a fresh READY; leave the console/page open until it copies the result.
It does not send messages. Save the copied JSON as
`assets/snapshot/apex_experiments.json`.

The script selects the user from that READY, preserves the original evaluation
ID, flags and optional fields, and removes its event listener after success or
a 30-second timeout. It exports user assignments only; guild/installation
assignments belong to their own targets and are not copied to the bot's user ID.

```js
(async () => {
    let findByProps = window.Vencord?.Webpack.findByProps;
    if (!findByProps) {
        const modules = webpackChunkdiscord_app.push([[Symbol()], {}, r => r.c]);
        webpackChunkdiscord_app.pop();
        findByProps = (...props) => {
            for (const module of Object.values(modules)) {
                try {
                    const exports = module.exports;
                    if (!exports || exports === window) continue;
                    for (const value of [exports, ...Object.values(exports)]) {
                        if (value && props.every(prop => typeof value[prop] === "function")) return value;
                    }
                } catch {}
            }
            throw new Error(`Discord module not found: ${props.join(", ")}`);
        };
    }
    const dispatcher = window.Vencord?.Webpack.Common.FluxDispatcher
        ?? findByProps("dispatch", "subscribe", "unsubscribe", "wait");
    const socket = findByProps("getSocket").getSocket();
    const capture = new Promise((resolve, reject) => {
        const finish = (error, value) => {
            clearTimeout(timeout);
            dispatcher.unsubscribe("CONNECTION_OPEN", onReady);
            if (error) reject(error);
            else resolve(value);
        };
        const onReady = ready => {
            const assignment = ready.apexExperiments?.assignments?.["1"]?.[ready.user?.id];
            if (!assignment || !Array.isArray(assignment.assignments)) {
                finish(new Error("READY has no Apex user assignments; existing file was not replaced"));
            } else {
                finish(null, JSON.parse(JSON.stringify(assignment)));
            }
        };
        const timeout = setTimeout(() => finish(new Error("Timed out waiting for READY; existing file was not replaced")), 30000);
        dispatcher.subscribe("CONNECTION_OPEN", onReady);
        try {
            socket.close();
            setTimeout(() => {
                try { socket.connect(); } catch (error) { finish(error); }
            }, 100);
        } catch (error) { finish(error); }
    });
    copy(JSON.stringify(await capture));
})();
```

DBC injects the user tuples unchanged into `READY.experiments` and wraps the Apex
snapshot as `READY.apex_experiments.assignments["1"][botId]`. It keeps the legacy
name-to-descriptor user snapshot format compatible, but only a new raw dump can
preserve all original assignments. These snapshots control client behavior;
they do not grant server-side features or permissions to a bot.

Check the snippets and injection with `npm run build:ts && node --test --test-name-pattern="Experiment snapshots" tests/electron.test.cjs`.
The regression fixture contains only experiment fields extracted from the real
`dump_ready.json`, without its account/session data.
