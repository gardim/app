import React, { useContext } from 'react';

import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { StackHeaderProps, createStackNavigator } from '@react-navigation/stack';

import MyPlantsScreen from '../screens/MyPlantsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PlantProfileScreen from '../screens/PlantProfileScreen';
import { NavigatorScreenParams, useTheme } from '@react-navigation/native';
import Nav from '../components/ui/Nav';
import HandPlant from '../components/resources/svgs/HandPlant';
import { i18n } from '../translations';
import LoginScreen from '../screens/LoginScreen';
import { AuthContext } from '../contexts/auth';

export type BottomTabParamList = {
	Plants: undefined;
};

export type MainStackParamList = {
	Home: NavigatorScreenParams<BottomTabParamList>;
	Notifications: undefined;
	'Plant Profile': { id: number };
	Login: StackHeaderProps;
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
						tabBarLabel: i18n.t('My Plants'),
						tabBarIcon: () => <HandPlant height={24} color={colors.text} />,
					}}
				/>
			</Tab.Navigator>
		</>
	);
};

const MainStackNavigation = () => {
	const { isLoggedIn } = useContext(AuthContext);

	return (
		<>
			<Stack.Navigator
				screenOptions={{
					header: (props: StackHeaderProps) => <Nav title={props.route.name} />,
				}}>
				{isLoggedIn ? (
					<>
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
					</>
				) : (
					<Stack.Screen
						name="Login"
						component={LoginScreen}
						options={{
							headerShown: false,
						}}
					/>
				)}
			</Stack.Navigator>
		</>
	);
};

export default MainStackNavigation;
