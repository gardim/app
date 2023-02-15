import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import DrawerContent from './DrawerContent';
import RootStackNavigator from './RootStackNavigator';

const Drawer = createDrawerNavigator();

export default function RootNavigation({ theme }) {
  return (
    <NavigationContainer theme={theme}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          drawerPosition: 'right',
        }}
        drawerContent={({ navigation }) => <DrawerContent navigation={navigation} />}>
        <Drawer.Screen name="Root" component={RootStackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
