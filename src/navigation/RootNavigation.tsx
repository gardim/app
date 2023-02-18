import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import RootStackNavigator from './RootStackNavigator';

const Drawer = createDrawerNavigator();

export default function RootNavigation() {
	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="Home">
				<Drawer.Screen name="Root" component={RootStackNavigator} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
