import React from 'react';
import { LinkingOptions, NavigationContainer, Theme } from '@react-navigation/native';
import MainStackNavigation, { MainStackParamList } from './MainStackNavigation';

const linking: LinkingOptions<MainStackParamList> = {
	prefixes: [],
	config: {
		screens: {
			Home: {
				path: '',
				screens: {
					Plants: 'plants',
				},
			},
			Notifications: 'notifications',
			'Plant Profile': {
				path: 'plants/:id',
			},
		},
	},
};

type NavigationProps = {
	theme: Theme;
	session: boolean;
};

const Navigation = ({ theme, session }: NavigationProps) => {
	return (
		<NavigationContainer linking={linking} theme={theme}>
			{session ? <MainStackNavigation /> : <></>}
		</NavigationContainer>
	);
};

export default Navigation;
