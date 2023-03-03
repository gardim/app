import { Fontisto } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { useLayoutEffect, useContext } from 'react';
import { useTheme } from 'react-native-paper';
import { Status } from '../screens/Status';
import { PlantContext } from '../context';
import { RootTabNavigationProps } from '../types/stack';

const Tab = createMaterialBottomTabNavigator();

export function RootTabNavigation({ navigation, route }: RootTabNavigationProps) {
	const theme = useTheme();

	const plantContext = useContext(PlantContext);
	const plant = plantContext.plant;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: plant.name,
		});
	}, [navigation, route]);

	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Status"
				component={Status}
				options={{
					tabBarLabel: 'Status',
					tabBarIcon: () => (
						<Fontisto name="heartbeat-alt" size={24} color={theme.colors.primary} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}
