import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useTheme } from 'react-native-paper';
import Plants from '../screens/MyPlantsScreen';

const Tab = createBottomTabNavigator();

const Navigation = () => {
	const theme = useTheme();

	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen
					name="Plants"
					component={Plants}
					options={{
						tabBarLabel: 'Plants',
						tabBarIcon: () => (
							<Feather name="settings" size={24} color={theme.colors.primary} />
						),
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

export default Navigation;
