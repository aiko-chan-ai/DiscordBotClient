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
			dismissedContents: Buffer.from([
				255, 219, 255, 191, 250, 215, 183, 131, 206, 163, 119, 242, 255,
				80, 249, 250, 116, 63, 140, 39, 254, 238, 255, 247, 62, 96, 255,
				255, 251, 125, 248, 252, 131, 199, 253, 127, 247, 66, 110, 51,
				96, 193, 151, 126, 76, 251, 255, 255, 255, 255, 255, 223, 243,
				251, 255, 255, 15,
			]),
		},
	},
	data2: {
		versions: {
			clientVersion: 10,
			serverVersion: 0,
			dataVersion: 2059,
		},
		favoriteGifs: {
			gifs: {},
			hideTooltip: true,
		},
		stickerFrecency: {
			stickers: {},
		},
		favoriteEmojis: { emojis: ['sparkles'] }, // Sparkle => Hanabi (Honkai Star Rail Character) ~\(≧▽≦)/~
		emojiFrecency: {
			emojis: {},
		},
		applicationCommandFrecency: {
			applicationCommands: {},
		},
		favoriteSoundboardSounds: {
			soundIds: [],
		},
	},
	data3: {}, // test proto
};
