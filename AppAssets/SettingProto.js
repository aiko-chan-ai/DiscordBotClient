module.exports = {
	data1: {
		versions: { clientVersion: 20, serverVersion: 0, dataVersion: 56 },
		inbox: { currentTab: 0, viewedTutorial: false },
		voiceAndVideo: {
			presetOption: 0,
			afkTimeout: { value: 600 },
			streamNotificationsEnabled: { value: true },
			nativePhoneIntegrationEnabled: { value: true },
		},
		textAndImages: {
			emojiPickerCollapsedSections: [],
			stickerPickerCollapsedSections: [],
			soundboardPickerCollapsedSections: [],
			dmSpamFilterV2: 1,
			inlineAttachmentMedia: { value: true },
			inlineEmbedMedia: { value: true },
			gifAutoPlay: { value: true },
			renderEmbeds: { value: true },
			renderReactions: { value: true },
			animateEmoji: { value: true },
			animateStickers: { value: 0 },
			enableTtsCommand: { value: true },
			messageDisplayCompact: { value: false },
			explicitContentFilter: { value: 1 },
			viewNsfwGuilds: { value: true },
			convertEmoticons: { value: true },
			viewNsfwCommands: { value: true },
		},
		notifications: { notificationCenterAckedBeforeId: 0n },
		privacy: {
			restrictedGuildIds: [],
			defaultGuildsRestricted: false,
			allowAccessibilityDetection: false,
			activityRestrictedGuildIds: [],
			defaultGuildsActivityRestricted: 0,
			activityJoiningRestrictedGuildIds: [],
			messageRequestRestrictedGuildIds: [],
			detectPlatformAccounts: { value: true },
			passwordless: { value: true },
			contactSyncEnabled: { value: false },
			friendSourceFlags: { value: 14 },
			friendDiscoveryFlags: { value: 0 },
			hideLegacyUsername: { value: false },
		},
		debug: {},
		gameLibrary: { disableGamesTab: { value: false } },
		status: {
			status: { value: 'online' },
			showCurrentGame: { value: true },
		},
		localization: {
			locale: { value: 'en-US' },
			timezoneOffset: { value: -420 },
		},
		appearance: {
			theme: 1,
			developerMode: true,
			mobileRedesignDisabled: false,
		},
		guildFolders: { folders: [], guildPositions: [] },
		audioContextSettings: {
			user: {},
			stream: {},
		},
		userContent: {
			premiumTier0ModalDismissedAt: {
				seconds: 1668423189n,
				nanos: 761000000,
			},
			guildOnboardingUpsellDismissedAt: {
				seconds: 1680799930n,
				nanos: 719000000,
			},
			lastDismissedOutboundPromotionStartDate: {
				value: '2024-06-17T17:00:00.180000+00:00',
			},
			dismissedContents: Buffer.from(
				'ffdbffbffad7b783cea377f2ff50f9fa7c3f8c27feeefff73e60fffffb7df8fc83c7fd7ff7426e3360c3977e4cfbffffffffffff01',
				'hex',
			),
		},
	},
	data2: {}, // freq proto
	data3: {}, // test proto
};
