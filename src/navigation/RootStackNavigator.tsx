import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React from 'react';
import { Home } from '../screens/Home';
import { Header } from '../components/Header';
import IdentificationMethod from '../screens/IdentificationMethod';
import { ImageMethod } from '../screens/ImageMethod';

const Stack = createStackNavigator();

export default function RootStackNavigator() {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				header: Header,
			}}>
			<Stack.Screen name="Home" component={Home} options={{ title: 'Suas Plantas' }} />
			<Stack.Screen
				name="IdentificationMethod"
				component={IdentificationMethod}
				options={{ title: 'Método de Identificação' }}
			/>
			<Stack.Screen
				name="ImageMethod"
				component={ImageMethod}
				options={{ title: 'Identificação por imagem' }}
			/>
		</Stack.Navigator>
	);
}
