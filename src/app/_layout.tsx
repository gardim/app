import React, { useEffect } from 'react';

import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import { useFonts } from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import themes from '../constants/themes';
import store from '../redux/store';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

SplashScreen.preventAutoHideAsync();

const tokenCache = {
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

const RootLayout = () => {
	const [isFontLoaded, fontError] = useFonts({
		Baloo2: require('../../assets/fonts/Baloo2.ttf'),
	});

	useEffect(() => {
		if (fontError) throw fontError;
	}, [fontError]);

	useEffect(() => {
		if (isFontLoaded) {
			SplashScreen.hideAsync();
		}
	}, [isFontLoaded]);

	if (!isFontLoaded) {
		return null;
	}

	const theme = 'light';
	const _theme = themes[theme];

	return (
		<ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
			<Provider store={store}>
				<PaperProvider theme={_theme}>
					<InitialLayout />
				</PaperProvider>
			</Provider>
		</ClerkProvider>
	);
};

const InitialLayout = () => {
	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		if (!isLoaded) return;

		const inTabsGroup = segments[0] === '(auth)';

		console.log('User changed: ', isSignedIn);

		if (isSignedIn && !inTabsGroup) {
			router.replace('/myPlants');
		} else if (!isSignedIn) {
			router.replace('/login');
		}
	}, [isSignedIn]);

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="(modals)/notifications"
				options={{
					presentation: 'modal',
				}}
			/>
			<Stack.Screen
				name="(modals)/plant/[id]"
				options={{
					presentation: 'modal',
				}}
			/>
		</Stack>
	);
};

export default RootLayout;
