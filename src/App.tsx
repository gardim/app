import 'react-native-gesture-handler';
import React from 'react';

import { registerRootComponent } from 'expo';
import RootNavigation from './navigation/RootNavigation';

function App() {
	return <RootNavigation />;
}

export default registerRootComponent(App);
