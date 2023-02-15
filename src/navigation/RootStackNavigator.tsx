import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React from 'react';

import { Header } from './Header';
import Code from './screens/Code';
import Configuration from './screens/Configuration';
import Home from './screens/Home';
import HomeFilled from './screens/HomeFilled';
import ImagePicker from './screens/ImageIdentification';
import Manual from './screens/Manual';
import IdentificationMethod from './screens/Method';
import Name from './screens/Name';
import Result from './screens/Result';
import Plant from './screens/plant';

const Stack = createStackNavigator();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Suas Plantas"
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}>
      <Stack.Screen name="Suas Plantas" component={Home} />
      <Stack.Screen name="TODAS as suas Plantas" component={HomeFilled} />
      <Stack.Screen name="Configuration" component={Configuration} />
      <Stack.Screen name="Identifique sua planta" component={IdentificationMethod} />
      <Stack.Screen name="Identificação Manual" component={Manual} />
      <Stack.Screen name="Adicione Imagens" component={ImagePicker} />
      <Stack.Screen name="Seleção" component={Result} />
      <Stack.Screen name="Código" component={Code} />
      <Stack.Screen name="Nome" component={Name} />
      <Stack.Screen name="Plant" component={Plant} />
    </Stack.Navigator>
  );
}
