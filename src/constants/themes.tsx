import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { darkGreenColors, lightGreenColors } from '@constants/colors';

export const CombinedDefaultTheme = {
	...MD3LightTheme,
	...lightGreenColors,
};

export const CombinedDarkTheme = {
	...MD3DarkTheme,
	...darkGreenColors,
};

const themes = {
	light: CombinedDefaultTheme,
	dark: CombinedDarkTheme,
};

export default themes;
