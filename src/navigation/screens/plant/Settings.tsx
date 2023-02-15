import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Text, FAB } from 'react-native-paper';

export default function Settings({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <FAB
          icon="plus"
          onPress={() => console.log('ta funcionando')}
          visible
          style={[styles.fabStyle]}
        />
        <Text variant="titleSmall">Settings</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 8,
    justifyContent: 'center',
  },
  row: {
    flex: 0.5,
    marginBottom: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  fabStyle: {
    margin: 20,
  },
});
