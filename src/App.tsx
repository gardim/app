import 'react-native-gesture-handler';

import { registerRootComponent } from 'expo';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { PreferencesContext } from './components/PreferencesContext';
import RootNavigation from './navigation/RootNavigation';
import { CombinedDarkTheme, CombinedDefaultTheme } from './utils/theme';
import { StatusBar } from 'react-native';
import { PlantProvider } from './context';
import { SocketProvider } from './api/socket';
import { WeatherProvider } from './api/weatherstack';

function App() {
	const [isThemeDark, setIsThemeDark] = React.useState(false);

	const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

	const toggleTheme = React.useCallback(() => {
		return setIsThemeDark(!isThemeDark);
	}, [isThemeDark]);

	const preferences = React.useMemo(
		() => ({
			toggleTheme,
			isThemeDark,
		}),
		[toggleTheme, isThemeDark]
	);

	return (
		<PaperProvider theme={theme}>
			<PreferencesContext.Provider value={preferences}>
				<>
					<PlantProvider>
						<SocketProvider>
							<WeatherProvider>
								<StatusBar barStyle={isThemeDark ? 'light-content' : 'dark-content'} />
								<RootNavigation theme={theme} />
							</WeatherProvider>
						</SocketProvider>
					</PlantProvider>
				</>
			</PreferencesContext.Provider>
		</PaperProvider>
	);
}

export default registerRootComponent(App);
