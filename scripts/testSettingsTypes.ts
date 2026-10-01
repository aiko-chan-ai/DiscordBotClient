/* Copyright Elysia © 2025. All rights reserved */

import { defaultSettings, Settings } from "../src/shared/Settings";

const settings: Settings = { ...defaultSettings };
settings.cache_assets = true;
settings.generate_fake_profile = false;
settings.guilds_per_shard = 250;
settings.settings_theme = "dark";
settings.settings_theme = "light";
settings.doh_provider = "google";
settings.auto_check_updates = false;
// @ts-expect-error Provider must be a supported option.
settings.doh_provider = "custom";
// @ts-expect-error Definitions determine supported setting keys.
settings.nonexistent = true;
// @ts-expect-error Boolean defaults widen to boolean, not string.
settings.cache_assets = "true";
// @ts-expect-error Numeric defaults widen to number, not string.
settings.guilds_per_shard = "250";
// @ts-expect-error Select values come from the options, not any string.
settings.settings_theme = "blue";
