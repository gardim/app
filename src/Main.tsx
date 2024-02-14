import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import themes from './constants/themes';
import MainStackNavigation from './navigation/MainStackNavigation';
import { Provider } from 'react-redux';
import store from './store';

const Main = () => {
	const theme = 'dark';
	const _theme = themes[theme];
	const session = true;

	return (
		<PaperProvider theme={_theme}>
			<Provider store={store}>
				<NavigationContainer linking={{ prefixes: [] }} theme={_theme}>
					{session ? <MainStackNavigation /> : <></>}
				</NavigationContainer>
			</Provider>
		</PaperProvider>
	);
};

export default Main;
