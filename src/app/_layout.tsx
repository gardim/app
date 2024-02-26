import React, { useEffect } from 'react';

import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Stack, useRouter, useSegments } from 'expo-router';
import { Provider } from 'react-redux';
import store from '@store/index';
import { tokenCache } from '@storage/index';
import { StyledProvider } from 'src/context/StyledProvider';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const RootLayout = () => {
	return (
		<StyledProvider>
			<ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
				<Provider store={store}>
					<InitialLayout />
				</Provider>
			</ClerkProvider>
		</StyledProvider>
	);
};

const InitialLayout = () => {
	const { isLoaded, isSignedIn } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		if (!isLoaded) return;

		const inTabsGroup = segments[0] === '(auth)';

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
			<Stack.Screen
				name="(modals)/plans"
				options={{
					presentation: 'modal',
				}}
			/>
		</Stack>
	);
};

export default RootLayout;
