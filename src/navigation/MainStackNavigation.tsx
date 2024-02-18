import React from 'react';

import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { StackHeaderProps, createStackNavigator } from '@react-navigation/stack';

import MyPlantsScreen from '../screens/MyPlantsScreen';
import HandPlant from '../items/svgs/HandPlant';
import NotificationsScreen from '../screens/NotificationsScreen';
import PlantProfileScreen from '../screens/PlantProfileScreen';
import { NavigatorScreenParams, useTheme } from '@react-navigation/native';
import Nav from '../components/Nav';

export type BottomTabParamList = {
	Plants: undefined;
};

export type MainStackParamList = {
	Home: NavigatorScreenParams<BottomTabParamList>;
	Notifications: undefined;
	'Plant Profile': { id: number };
};

const Stack = createStackNavigator<MainStackParamList>();
const Tab = createMaterialBottomTabNavigator<BottomTabParamList>();

const BottomBarNavigation = () => {
	const { colors } = useTheme();
	return (
		<>
			<Tab.Navigator>
				<Tab.Screen
					name="Plants"
					component={MyPlantsScreen}
					options={{
						tabBarIcon: () => <HandPlant height={24} color={colors.text} />,
						tabBarLabel: 'Plants',
					}}
				/>
			</Tab.Navigator>
		</>
	);
};

const MainStackNavigation = () => {
	return (
		<>
			<Stack.Navigator
				screenOptions={{
					header: (props: StackHeaderProps) => <Nav title={props.route.name} />,
				}}>
				<Stack.Screen name="Home" component={BottomBarNavigation} />
				<Stack.Screen
					name="Notifications"
					component={NotificationsScreen}
					options={{
						presentation: 'modal',
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Plant Profile"
					component={PlantProfileScreen}
					options={{
						presentation: 'modal',
						headerShown: false,
					}}
				/>
			</Stack.Navigator>
		</>
	);
};

export default MainStackNavigation;
