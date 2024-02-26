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
	getTheme: async (
		systemTheme: 'light' | 'dark' | undefined | null
	): Promise<'light' | 'dark'> => {
		const cachedTheme = systemTheme ?? 'light';
		try {
			const theme = await SecureStore.getItemAsync('theme');
			if (!theme) {
				await SecureStore.setItemAsync('theme', cachedTheme);
				return cachedTheme;
			}
			return theme === 'dark' ? 'dark' : 'light';
		} catch (error) {
			console.error('Error getting theme:', error);
			return cachedTheme;
		}
	},
	saveTheme: async (value: 'light' | 'dark') => {
		try {
			await SecureStore.setItemAsync('theme', value);
			return value;
		} catch (error) {
			console.error('Error saving theme:', error);
		}
	},
};
