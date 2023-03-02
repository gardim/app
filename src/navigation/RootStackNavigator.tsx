import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React from 'react';
import { Home } from '../screens/Home';
import { Header } from '../components/Header';
import IdentificationMethod from '../screens/IdentificationMethod';
import { ImageMethod } from '../screens/ImageMethod';
import { TextMethod } from '../screens/TextMethod';
import { Result } from '../screens/Result';
import { Name } from '../screens/Name';
import { Code } from '../screens/Code';

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
			<Stack.Screen
				name="TextMethod"
				component={TextMethod}
				options={{ title: 'Identificação por texto' }}
			/>
			<Stack.Screen name="Result" component={Result} options={{ title: 'Resultado' }} />
			<Stack.Screen name="Name" component={Name} options={{ title: 'Nome' }} />
			<Stack.Screen name="Code" component={Code} options={{ title: 'Código' }} />
		</Stack.Navigator>
	);
}
