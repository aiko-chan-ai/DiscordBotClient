/* Copyright Elysia © 2026. All rights reserved */

import {
    Button,
    FluentProvider,
    Input,
    MessageBar,
    MessageBarBody,
    Spinner,
    webDarkTheme,
    webLightTheme,
} from "@fluentui/react-components";
import { useEffect, useState } from "react";

import { type SettingDefinition, type Settings, settingsDefinitions } from "../../shared/Settings";
import { SettingsField } from "./SettingsField";
import { useSettings } from "./useSettings";

const definitions: readonly (SettingDefinition & { key: keyof Settings })[] = settingsDefinitions;

export function SettingsApp () {
    const state = useSettings();
    const [query, setQuery] = useState("");
    const [systemDark, setSystemDark] = useState(() => matchMedia("(prefers-color-scheme: dark)").matches);
    useEffect(() => {
        const media = matchMedia("(prefers-color-scheme: dark)");
        const change = () => setSystemDark(media.matches);
        media.addEventListener("change", change);
        change();
        return () => media.removeEventListener("change", change);
    }, []);
    const dark = state.draft.settings_theme === "dark" || (state.draft.settings_theme === "system" && systemDark);
    const disabled = state.loading || state.saving || !!state.snapshot?.readOnly;
    const search = query.trim().toLowerCase();
    const visible = definitions.filter(
        item => !item.hidden && `${item.displayName} ${item.description} ${item.key}`.toLowerCase().includes(search),
    );
    const status = state.saving
        ? "Saving…"
        : !state.valid
            ? "Check the highlighted settings."
            : state.dirty
                ? "Unsaved changes"
                : state.notice;

    return (
        <FluentProvider
            theme={dark ? webDarkTheme : webLightTheme}
            className="settings-provider"
            data-theme={dark ? "dark" : "light"}
        >
            <div className="settings-shell">
                <header className="settings-header">
                    <h1>Settings</h1>
                    <Input
                        aria-label="Search all settings"
                        placeholder="Search settings"
                        value={query}
                        onChange={(_, data) => setQuery(data.value)}
                        type="search"
                    />
                </header>
                <main className="settings-content" aria-busy={state.loading}>
                    {state.loading && <Spinner label="Loading settings…" />}
                    {state.error && (
                        <MessageBar intent="error">
                            <MessageBarBody>
                                {state.error}{" "}
                                {!state.snapshot && (
                                    <Button onClick={() => void state.load()} disabled={state.loading}>
                                        Try again
                                    </Button>
                                )}
                            </MessageBarBody>
                        </MessageBar>
                    )}
                    {state.snapshot?.warning && (
                        <MessageBar intent="warning">
                            <MessageBarBody>{state.snapshot.warning} Settings are read-only.</MessageBarBody>
                        </MessageBar>
                    )}
                    {!state.valid && search && (
                        <MessageBar intent="error">
                            <MessageBarBody>
                                Some settings need attention.{" "}
                                <Button onClick={() => setQuery("")}>Show all settings</Button>
                            </MessageBarBody>
                        </MessageBar>
                    )}
                    {!state.loading && state.snapshot && (
                        <>
                            <ul className="setting-list">
                                {visible.map(definition => (
                                    <SettingsField
                                        key={definition.key}
                                        definition={definition}
                                        value={state.draft[definition.key]}
                                        error={state.errors[definition.key]}
                                        disabled={disabled || !!definition.disabled}
                                        onChange={value => state.edit(definition.key, value)}
                                    />
                                ))}
                            </ul>
                            {visible.length === 0 && (
                                <div className="empty-state">
                                    <p>No matching settings.</p>
                                    <Button onClick={() => setQuery("")}>Clear search</Button>
                                </div>
                            )}
                        </>
                    )}
                </main>
                <footer className="save-bar">
                    <Button appearance="subtle" disabled={disabled || !state.snapshot} onClick={state.reset}>
                        Reset to defaults
                    </Button>
                    <span className="save-status" role="status" aria-live="polite">
                        {status}
                    </span>
                    <Button disabled={!state.dirty || disabled} onClick={state.discard}>
                        Discard
                    </Button>
                    <Button
                        appearance="primary"
                        disabled={!state.dirty || !state.valid || disabled}
                        onClick={() => void state.save()}
                    >
                        {state.saving ? "Saving…" : "Save changes"}
                    </Button>
                </footer>
            </div>
        </FluentProvider>
    );
}
