import * as SecureStore from 'expo-secure-store';

export const tokenCache = {
	async getToken(key: string) {
		try {
			return SecureStore.getItemAsync(key);
		} catch (err) {
			return null;
		}
	},
	async saveToken(key: string, value: string) {
		try {
			return SecureStore.setItemAsync(key, value);
		} catch (err) {
			return;
		}
	},
};

export const themeCache = {
	getTheme: (systemTheme: 'light' | 'dark' | undefined | null) => {
		let cachedTheme = systemTheme ?? 'light';
		SecureStore.getItemAsync('theme')
			.then((theme) => {
				if (!theme) {
					SecureStore.setItemAsync('theme', cachedTheme).catch((error) =>
						console.error('Error setting theme:', error)
					);
				} else {
					cachedTheme = theme == 'dark' ? 'dark' : 'light';
				}
			})
			.catch((error) => {
				console.error('Error getting theme:', error);
			});

		return cachedTheme;
	},
	saveTheme(value: 'light' | 'dark') {
		SecureStore.setItemAsync('theme', value).catch();
	},
};
