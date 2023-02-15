import { Fontisto, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { useTheme } from 'react-native-paper';

import Details from './Details';
import Info from './Info';
import Settings from './Settings';
import Statistics from './Statistics';

const Tab = createMaterialBottomTabNavigator();

export default function RootNavigation() {
  const theme = useTheme();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Details"
        component={Details}
        options={{
          tabBarLabel: 'Detalhes',
          tabBarIcon: () => (
            <Fontisto name="heartbeat-alt" size={24} color={theme.colors.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarLabel: 'Estatísticas',
          tabBarIcon: () => (
            <Ionicons name="ios-stats-chart" size={24} color={theme.colors.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Info"
        component={Info}
        options={{
          tabBarLabel: 'Info',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="information" size={24} color={theme.colors.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Configurações',
          tabBarIcon: () => (
            <Ionicons name="settings-sharp" size={24} color={theme.colors.primary} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
