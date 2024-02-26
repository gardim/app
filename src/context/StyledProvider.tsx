import React, { ReactNode, useMemo, useState, useContext, useEffect, createContext } from 'react';
import { ThemeProvider } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import themes from '@constants/themes';

import { themeCache } from '@storage/index';
import { StatusBar } from 'expo-status-bar';

const StyledContext = createContext({
	isThemeDark: false,
	toggleTheme: () => {},
	isLoading: false,
});

interface Props {
	children: ReactNode;
}

export const StyledProvider = ({ children }: Props) => {
	const [theme, setTheme] = useState<'light' | 'dark'>('light');
	const [isThemeDark, setIsThemeDark] = useState(theme === 'dark');
	const [isLoading, setIsLoading] = useState(false);
	const color = useColorScheme();

	const toggleTheme = () => {
		const saveTheme = async (newTheme: 'light' | 'dark') => {
			themeCache.saveTheme(newTheme);
		};
		const newTheme = theme === 'dark' ? 'light' : 'dark';
		saveTheme(newTheme);
		setTheme(newTheme);
		setIsThemeDark(newTheme == 'dark');
	};

	useEffect(() => {
		setIsLoading(true);
		const fetchTheme = async () => {
			console.log(color);
			await themeCache
				.getTheme(color)
				.then((storedTheme) => {
					setIsThemeDark(storedTheme === 'dark');
					setTheme(storedTheme);
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					setIsLoading(false);
				});
		};

		fetchTheme();
	}, []);

	const contextValue = useMemo(
		() => ({
			isThemeDark,
			toggleTheme,
			isLoading,
		}),
		[toggleTheme, isThemeDark]
	);

	if (isLoading) {
		return null;
	}

	return (
		<StyledContext.Provider value={contextValue}>
			<PaperProvider theme={themes[theme]}>
				<StatusBar style={isThemeDark ? 'light' : 'dark'} />
				<ThemeProvider value={themes[theme]}>{children}</ThemeProvider>
			</PaperProvider>
		</StyledContext.Provider>
	);
};
export const useStyledContext = () => useContext(StyledContext);
