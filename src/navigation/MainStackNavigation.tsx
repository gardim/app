import React from 'react';

import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import PlantListScreen from '../screens/PlantListScreen';
import HandPlant from '../svgs/HandPlant';
import NotificationsScreen from '../screens/NotificationsScreen';
import PlantProfileScreen from '../screens/PlantProfileScreen';

export type RootStackParamList = {
	home: undefined;
	notifications: undefined;
	'plant-profile': undefined;
};

export interface PageProps<T extends keyof RootStackParamList> {
	navigation: StackNavigationProp<RootStackParamList, T>;
}

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createMaterialBottomTabNavigator();

const BottomBarNavigation = () => {
	return (
		<>
			<Tab.Navigator>
				<Tab.Screen
					name="plants"
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
				<Stack.Screen name="home" component={BottomBarNavigation} />
				<Stack.Screen
					name="notifications"
					component={NotificationsScreen}
					options={{
						presentation: 'modal',
					}}
				/>
				<Stack.Screen
					name="plant-profile"
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
