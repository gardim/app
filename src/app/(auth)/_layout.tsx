import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { useAuth } from '@clerk/clerk-expo';
import HandPlant from '@svgs/HandPlant';
import Nav from '@components/ui/Nav';
import { Feather } from '@expo/vector-icons';
import { i18n } from '@lang/index';

const TabsLayout = () => {
	const { colors } = useTheme();
	const { isSignedIn } = useAuth();
	return (
		<Tabs
			screenOptions={{
				header: (props: BottomTabHeaderProps) => <Nav title={props.route.name} />,
				tabBarActiveTintColor: colors.primary,
			}}>
			<Tabs.Screen
				name="myPlants"
				options={{
					tabBarLabel: i18n.t('routes.myPlants'),
					tabBarIcon: ({ size, color }) => <HandPlant height={size} color={color} />,
				}}
				redirect={!isSignedIn}
			/>
			<Tabs.Screen
				name="configurations"
				options={{
					tabBarLabel: i18n.t('routes.configurations'),
					tabBarIcon: ({ size, color }) => (
						<Feather name="settings" size={size} color={color} />
					),
				}}
				redirect={!isSignedIn}
			/>
		</Tabs>
	);
};

export default TabsLayout;
