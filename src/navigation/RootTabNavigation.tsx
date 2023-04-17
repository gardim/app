import { Feather, Fontisto, FontAwesome } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { useLayoutEffect, useContext } from 'react';
import { useTheme } from 'react-native-paper';
import { Status } from '../screens/Status';
import { PlantContext } from '../context';
import { RootTabNavigationProps } from '../types/stack';
import { Configurations } from '../screens/Configurations';
import Statistics from '../screens/Statistics';
import { Analysis } from '../screens/Analysis';

const Tab = createMaterialBottomTabNavigator();

export function RootTabNavigation({ navigation, route }: RootTabNavigationProps) {
	const theme = useTheme();

	const plantContext = useContext(PlantContext);
	const plant = plantContext.plant;

	useLayoutEffect(() => {
		if (plantContext.plant) {
			navigation.setOptions({
				title: plant.name,
			});
		}
	}, [navigation, route, plant]);

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
			<Tab.Screen
				name="Statistics"
				component={Statistics}
				options={{
					tabBarLabel: 'Monitoria',
					tabBarIcon: () => (
						<FontAwesome name="calendar-check-o" size={24} color={theme.colors.primary} />
					),
				}}
			/>
			<Tab.Screen
				name="Analysis"
				component={Analysis}
				options={{
					tabBarLabel: 'Análise',
					tabBarIcon: () => (
						<FontAwesome name="stethoscope" size={24} color={theme.colors.primary} />
					),
				}}
			/>
			<Tab.Screen
				name="Configurations"
				component={Configurations}
				options={{
					tabBarLabel: 'Ajustes',
					tabBarIcon: () => <Feather name="settings" size={24} color={theme.colors.primary} />,
				}}
			/>
		</Tab.Navigator>
	);
}
