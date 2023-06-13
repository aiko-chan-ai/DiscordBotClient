module.exports = {
	data1: {
		versions: { clientVersion: 0, serverVersion: 0, dataVersion: 18 },
		inbox: { currentTab: 4, viewedTutorial: false },
		textAndImages: {
			emojiPickerCollapsedSections: [],
			stickerPickerCollapsedSections: [],
			explicitContentFilter: { value: 0 },
			viewNsfwGuilds: { value: true },
			viewNsfwCommands: { value: true },
		},
		privacy: {
			restrictedGuildIds: [],
			defaultGuildsRestricted: false,
			allowAccessibilityDetection: false,
			activityRestrictedGuildIds: [],
			defaultGuildsActivityRestricted: 0,
			activityJoiningRestrictedGuildIds: [],
			messageRequestRestrictedGuildIds: [],
			friendSourceFlags: { value: 0 },
			dropsOptedOut: { value: true },
		},
		status: { status: { value: 'online' } },
		localization: {
			locale: { value: 'en-US' },
			timezoneOffset: { value: -420 },
		},
		appearance: {
			theme: 0,
			developerMode: true,
			mobileRedesignDisabled: false,
		},
	},
	data2: {}, // freq proto
	data3: {}, // test proto
};
