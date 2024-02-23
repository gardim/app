import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { useAuth } from '@clerk/clerk-expo';
import HandPlant from '@/assets/svgs/HandPlant';
import Nav from '@/src/components/ui/Nav';
import { i18n } from '@/src/translations';


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
					tabBarLabel: i18n.t('My Plants'),
					tabBarIcon: ({ size, color }) => <HandPlant height={size} color={color} />,
				}}
				redirect={!isSignedIn}
			/>
		</Tabs>
	);
};

export default TabsLayout;
