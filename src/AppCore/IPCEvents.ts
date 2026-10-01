/* Copyright Elysia © 2025. All rights reserved */

export class IPCEvent extends null {
    static Close = "app:window:close";
    static Minimize = "app:window:minimize";
    static Maximize = "app:window:maximize";
    static Focus = "app:window:focus";
    static FlashFrame = "app:window:flash_frame";
    static RequestCloseWindow = "app:request_close_window";
    // Preload IPC Events
    static GetBotInfo = "app:preload:get_bot_info";
    static GetVersion = "app:preload:get_version";
    static GetName = "app:preload:get_name";
    static GetExperiment = "app:preload:get_experiment";
    static GetDefaultUserPatch = "app:preload:get_default_user_patch";
    // Logging from Main Process
    static LogFromMainProcess = "app:main:log";
    // Main > Renderer Events
    static GetPreloadedUserSettings = "app:preload:get_preloaded_user_settings";
    static GetPreloadedUserSettingsResponse = "app:preload:get_preloaded_user_settings_response";
    static SetPreloadedUserSettings = "app:preload:set_preloaded_user_settings";

    static GetFrecencyUserSettings = "app:preload:get_frecency_user_settings";
    static GetFrecencyUserSettingsResponse = "app:preload:get_frecency_user_settings_response";
    static SetFrecencyUserSettings = "app:preload:set_frecency_user_settings";
    // Beta Features
    static RequestOpenMessageEditorWindow = "app:request_open_message_editor_window";
    static MessageEditorReactReady = "app:message_editor_ready";
    static MessageEditorReceivePort = "app:message_editor_receive_port";
    static MainAppReceiveEditorPort = "app:main_receive_editor_port";
}
