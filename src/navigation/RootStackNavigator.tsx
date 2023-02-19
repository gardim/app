import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React from 'react';
import { Home } from '../screens/Home';
import { Header } from '../components/Header';

const Stack = createStackNavigator();

export default function RootStackNavigator() {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				header: Header,
			}}>
			<Stack.Screen name="Home" component={Home} />
		</Stack.Navigator>
	);
}
