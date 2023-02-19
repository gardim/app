/* eslint-disable react/prop-types */
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import RootStackNavigator from './RootStackNavigator';
import DrawerContent from '../components/DrawerContent';

const Drawer = createDrawerNavigator();

export default function RootNavigation({ theme }) {
	return (
		<NavigationContainer theme={theme}>
			<Drawer.Navigator initialRouteName="Home" drawerContent={() => <DrawerContent />}>
				<Drawer.Screen
					name="Root"
					component={RootStackNavigator}
					options={{
						headerTintColor: theme.colors.onBackground,
					}}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
