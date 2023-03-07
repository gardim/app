import 'dotenv/config';

export default {
	expo: {
		name: 'gardim',
		slug: 'gardim',
		version: '1.0.0',
		entryPoint: './src/App.tsx',
		orientation: 'portrait',
		icon: './assets/icon.png',
		userInterfaceStyle: 'light',
		splash: {
			image: './assets/splash.png',
			resizeMode: 'contain',
			backgroundColor: '#ffffff'
		},
		updates: {
			fallbackToCacheTimeout: 0
		},
		assetBundlePatterns: [
			'**/*'
		],
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
			mqttUrl: process.env.MQTT_URL ?? 'ws://test.mosquitto.org',
			mqttPort: process.env.MQTT_PORT ?? 8080,
			weatherUrl: process.env.WEATHER_URL,
			weatherApiKey: process.env.WEATHER_API_KEY,
			eas: {
				projectId: '8d0a02e6-116c-4f13-bc9b-b72a6b07fc14'
			}
		}
	}
};
