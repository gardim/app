import 'react-native-gesture-handler';

import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Main from './src/Main';
import { View } from 'react-native';

const App = () => {
	const [fontsLoaded, fontError] = useFonts({
		Baloo2: require('./assets/Baloo2.ttf'),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded || fontError) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<View style={{ flex: 1 }} onLayout={onLayoutRootView}>
			<Main />
		</View>
	);
};

export default App;
