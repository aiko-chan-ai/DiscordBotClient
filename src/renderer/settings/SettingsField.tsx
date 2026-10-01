/* Copyright Elysia © 2026. All rights reserved */

import { Field, Input, Select, Switch } from "@fluentui/react-components";

import type { SettingDefinition } from "../../shared/Settings";

type Props = {
    definition: SettingDefinition;
    value: string | boolean;
    error?: string;
    disabled: boolean;
    onChange: (value: string | boolean) => void;
};

export function SettingsField ({ definition, value, error, disabled, onChange }: Props) {
    const { key, displayName, description, type } = definition;
    const labelId = `${key}-label`;
    const descriptionId = `${key}-description`;
    const accessibility = { "aria-labelledby": labelId, "aria-describedby": descriptionId };
    let control;
    switch (type) {
        case "boolean":
            control = (
                <Switch
                    {...accessibility}
                    checked={value === true}
                    disabled={disabled}
                    onChange={(_, data) => onChange(data.checked)}
                />
            );
            break;
        case "select":
            control = (
                <Select
                    {...accessibility}
                    value={String(value)}
                    disabled={disabled}
                    onChange={event => onChange(event.target.value)}
                >
                    {definition.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
            );
            break;
        default:
            control = (
                <Input
                    {...accessibility}
                    value={String(value)}
                    disabled={disabled}
                    inputMode={type === "number" ? "numeric" : undefined}
                    onChange={(_, data) => onChange(data.value)}
                />
            );
    }
    return (
        <li className="setting-row" data-setting={key}>
            <div className="setting-copy">
                <label id={labelId}>{displayName}</label>
                <p id={descriptionId}>{description}</p>
            </div>
            <Field
                className={`setting-control setting-control-${type}`}
                validationState={error ? "error" : "none"}
                validationMessage={error}
            >
                {control}
            </Field>
        </li>
    );
}
