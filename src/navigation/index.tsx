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
			Login: {
				path: 'login',
			},
		},
	},
};

type NavigationProps = {
	theme: Theme;
};

const Navigation = ({ theme }: NavigationProps) => {
	return (
		<NavigationContainer linking={linking} theme={theme}>
			<MainStackNavigation />
		</NavigationContainer>
	);
};

export default Navigation;
