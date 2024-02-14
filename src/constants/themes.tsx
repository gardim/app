import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
	Theme,
} from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { darkGreenColors, lightGreenColors } from '../utils/colors';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationDefaultTheme,
	reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme: Theme = {
	...MD3LightTheme,
	...LightTheme,
	colors: {
		...LightTheme.colors,
		...lightGreenColors.colors,
	},
};

const CombinedDarkTheme: Theme = {
	...MD3DarkTheme,
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		...darkGreenColors.colors,
	},
};

const themes = {
	light: CombinedDefaultTheme,
	dark: CombinedDarkTheme,
};

export default themes;
