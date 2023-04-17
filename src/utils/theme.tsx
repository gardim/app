import 'react-native-gesture-handler';

import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme } from 'react-native-paper';

import { darkGreenColors, lightGreenColors } from './colors';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationDefaultTheme,
	reactNavigationDark: NavigationDarkTheme,
});

export const CombinedDefaultTheme = {
	...MD3LightTheme,
	...LightTheme,
	...lightGreenColors,
};

export const CombinedDarkTheme = {
	...MD3DarkTheme,
	...DarkTheme,
	...darkGreenColors,
};

export const StatusColorTheme = {
	bad: '#E84258',
	average: '#FEE191',
	good: '#B0D8A4',
};
