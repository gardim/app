import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';

export default function Code({ navigation }) {
  const [text, setText] = React.useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Text variant="titleMedium" style={{ textAlign: 'center' }}>
          {' '}
          Dê um nome à sua planta!
        </Text>
        <TextInput
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
          style={{ width: '100%' }}
          onSubmitEditing={() => navigation.navigate('Suas Plantas')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0.5,
    padding: 32,
    justifyContent: 'center',
  },
  row: {
    flex: 0.5,
    marginBottom: 8,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  fabVariant: {
    marginTop: 40,
  },
});
