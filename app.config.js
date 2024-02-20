export default {
	expo: {
		name: 'Gardim',
		slug: 'gardim',
		version: '1.0.0',
		orientation: 'portrait',
		icon: './assets/icon.png',
		userInterfaceStyle: 'light',
		scheme: "app.gardim",
		splash: {
			image: './assets/splash.png',
			resizeMode: 'contain',
			backgroundColor: '#191C1B'
		},
		plugins: [
			'expo-localization',
			'expo-router'
		],
		updates: {
			fallbackToCacheTimeout: 0,
			url: 'https://u.expo.dev/8d0a02e6-116c-4f13-bc9b-b72a6b07fc14'
		},
		assetBundlePatterns: [
			'**/*'
		],
		runtimeVersion: {
			policy: 'appVersion'
		},
		ios: {
			supportsTablet: true,
			bundleIdentifier: 'app.gardim'
		},
		android: {
			adaptiveIcon: {
				foregroundImage: './assets/adaptive-icon.png',
				backgroundColor: '#FFFFFF'
			},
			package: 'app.gardim'
		},
		web: {
			bundler: 'metro',
			favicon: './assets/favicon.png'
		},
		extra: {
			eas: {
				projectId: '8d0a02e6-116c-4f13-bc9b-b72a6b07fc14'
			}
		}
	}
};
