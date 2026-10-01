/* Copyright Elysia © 2026. All rights reserved */

import { useEffect, useRef, useState } from "react";

import {
    defaultSettings,
    type Settings,
    type SettingsAPI,
    settingsDefinitions,
    type SettingsSnapshot,
    validateSetting,
    validateSettings,
} from "../../shared/Settings";

declare global {
    interface Window {
        settingsAPI: SettingsAPI;
    }
}

type Draft = { [Key in keyof Settings]: Settings[Key] extends number ? string : Settings[Key] };
function toDraft (settings: Settings): Draft {
    return Object.fromEntries(
        settingsDefinitions.map(definition => [
            definition.key,
            definition.type === "number" ? String(settings[definition.key]) : settings[definition.key],
        ]),
    ) as Draft;
}

export function useSettings () {
    const [snapshot, setSnapshot] = useState<SettingsSnapshot>();
    const [draft, setDraft] = useState(() => toDraft(defaultSettings));
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const busy = useRef(false);
    const alive = useRef(true);
    const candidate = Object.fromEntries(
        settingsDefinitions.map(definition => {
            const value = draft[definition.key];
            return [
                definition.key,
                definition.type === "number" ? (String(value).trim() === "" ? NaN : Number(value)) : value,
            ];
        }),
    );
    const errors = Object.fromEntries(
        settingsDefinitions.map(definition => [definition.key, validateSetting(definition, candidate[definition.key])]),
    );
    const valid = !Object.values(errors).some(Boolean);
    const dirty = !!snapshot && JSON.stringify(draft) !== JSON.stringify(toDraft(snapshot.settings));

    async function load () {
        if (busy.current) return;
        busy.current = true;
        setLoading(true);
        setError("");
        try {
            const result = await window.settingsAPI.get();
            if (alive.current) {
                setSnapshot(result);
                setDraft(toDraft(result.settings));
            }
        } catch (cause) {
            if (alive.current) setError(cause instanceof Error ? cause.message : "Could not load settings.");
        } finally {
            busy.current = false;
            if (alive.current) setLoading(false);
        }
    }
    useEffect(() => {
        alive.current = true;
        void load();
        return () => {
            alive.current = false;
        };
    }, []);
    useEffect(() => {
        if (!dirty && !saving) return;
        const guard = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = "";
        };
        window.addEventListener("beforeunload", guard);
        return () => window.removeEventListener("beforeunload", guard);
    }, [dirty, saving]);

    function edit (key: keyof Settings, value: string | boolean) {
        setDraft(current => ({ ...current, [key]: value }));
        setNotice("");
    }
    async function save () {
        if (busy.current || !snapshot || !dirty || !valid || snapshot.readOnly) return;
        busy.current = true;
        setSaving(true);
        setError("");
        setNotice("");
        try {
            const result = await window.settingsAPI.save(validateSettings(candidate));
            if (alive.current) {
                setSnapshot(result);
                setDraft(toDraft(result.settings));
                setNotice("Settings saved.");
            }
        } catch (cause) {
            if (alive.current) {
                setError(cause instanceof Error ? cause.message : "Could not save. Your changes are still here.");
            }
        } finally {
            busy.current = false;
            if (alive.current) setSaving(false);
        }
    }
    function discard () {
        if (snapshot) setDraft(toDraft(snapshot.settings));
        setError("");
        setNotice("");
    }
    function reset () {
        setDraft(toDraft(defaultSettings));
        setError("");
        setNotice("");
    }
    return { snapshot, draft, loading, saving, error, notice, errors, valid, dirty, edit, save, discard, reset, load };
}
