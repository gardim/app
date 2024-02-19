import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import themes from './constants/themes';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navigation from './navigation';
import AuthenticationProvider from './contexts/auth';

const Main = () => {
	const theme = 'light';
	const _theme = themes[theme];

	return (
		<PaperProvider theme={_theme}>
			<AuthenticationProvider>
				<Provider store={store}>
					<Navigation theme={_theme} />
				</Provider>
			</AuthenticationProvider>
		</PaperProvider>
	);
};

export default Main;
