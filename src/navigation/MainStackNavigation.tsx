import React from 'react';

import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { createStackNavigator } from '@react-navigation/stack';

import PlantListScreen from '../screens/PlantListScreen';
import HandPlant from '../svgs/HandPlant';
import NotificationsScreen from '../screens/NotificationsScreen';
import PlantProfileScreen from '../screens/PlantProfileScreen';
import { NavigatorScreenParams } from '@react-navigation/native';

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
	return (
		<>
			<Tab.Navigator>
				<Tab.Screen
					name="Plants"
					component={PlantListScreen}
					options={{
						tabBarIcon: () => <HandPlant height={24} />,
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
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={BottomBarNavigation} />
				<Stack.Screen
					name="Notifications"
					component={NotificationsScreen}
					options={{
						presentation: 'modal',
					}}
				/>
				<Stack.Screen
					name="Plant Profile"
					component={PlantProfileScreen}
					options={{
						presentation: 'modal',
					}}
				/>
			</Stack.Navigator>
		</>
	);
};

export default MainStackNavigation;
