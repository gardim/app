import 'dotenv/config';

export default {
	expo: {
		name: 'gardim',
		slug: 'gardim',
		version: '1.0.0',
		orientation: 'portrait',
		icon: './assets/icon.png',
		userInterfaceStyle: 'light',
		splash: {
			image: './assets/splash.png',
			resizeMode: 'contain',
			backgroundColor: '#ffffff'
		},
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
			bundleIdentifier: 'com.gardim'
		},
		android: {
			adaptiveIcon: {
				foregroundImage: './assets/adaptive-icon.png',
				backgroundColor: '#FFFFFF'
			},
			package: 'com.gardim'
		},
		web: {
			favicon: './assets/favicon.png'
		},
		extra: {
			plantIdApiKey: process.env.PLANT_ID_API_KEY,
			plantIdApiUrl: process.env.PLANT_ID_API_URL,
			gardimApiUrl: process.env.GARDIM_API_URL,
			socketUrl: process.env.SOCKET_URL,
			enableSocket: process.env.ENABLE_SOCKET ?? true,
			eas: {
				projectId: '8d0a02e6-116c-4f13-bc9b-b72a6b07fc14'
			}
		}
	}
};
