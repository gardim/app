import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';
import { darkGreenColors, lightGreenColors } from '@constants/colors';

import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationDefaultTheme,
	reactNavigationDark: NavigationDarkTheme,
});

export const CombinedDefaultTheme = {
	...LightTheme,
	...MD3LightTheme,
	colors: { ...LightTheme.colors, ...MD3LightTheme.colors, ...lightGreenColors.colors },
};

const CombinedDarkTheme = {
	...DarkTheme,
	...MD3DarkTheme,
	colors: { ...DarkTheme.colors, ...MD3DarkTheme.colors, ...darkGreenColors.colors },
};

const themes = {
	light: CombinedDefaultTheme,
	dark: CombinedDarkTheme,
};

export default themes;
