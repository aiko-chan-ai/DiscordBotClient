/* Copyright Elysia © 2025. All rights reserved */

export const enum IPCEvent {
    Close = "app:window:close",
    Minimize = "app:window:minimize",
    Maximize = "app:window:maximize",
    Focus = "app:window:focus",
    FlashFrame = "app:window:flash_frame",
    RequestCloseWindow = "app:request_close_window",
    // Preload IPC Events
    GetBotInfo = "app:preload:get_bot_info",
    GetVersion = "app:preload:get_version",
    GetName = "app:preload:get_name",
    GetExperiment = "app:preload:get_experiment",
    GetDefaultUserPatch = "app:preload:get_default_user_patch",
    // Logging from Main Process
    LogFromMainProcess = "app:main:log",
    // Main > Renderer Events
    GetPreloadedUserSettings = "app:preload:get_preloaded_user_settings",
    GetPreloadedUserSettingsResponse = "app:preload:get_preloaded_user_settings_response",
    SetPreloadedUserSettings = "app:preload:set_preloaded_user_settings",

    GetFrecencyUserSettings = "app:preload:get_frecency_user_settings",
    GetFrecencyUserSettingsResponse = "app:preload:get_frecency_user_settings_response",
    SetFrecencyUserSettings = "app:preload:set_frecency_user_settings",
    // Beta Features
    RequestOpenMessageEditorWindow = "app:request_open_message_editor_window",
    MessageEditorReactReady = "app:message_editor_ready",
    MessageEditorClose = "app:message_editor_close",
    MessageEditorReceivePort = "app:message_editor_receive_port",
    MainAppReceiveEditorPort = "app:main_receive_editor_port",
}
