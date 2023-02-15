import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Text, Searchbar } from 'react-native-paper';

export default function Manual({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Text variant="titleMedium" style={{ textAlign: 'center' }}>
          {' '}
          Busque o tipo de sua plantinha!
        </Text>
        <Searchbar
          placeholder="Search"
          value={searchQuery}
          onChangeText={onChangeSearch}
          style={styles.fabVariant}
          onSubmitEditing={() => navigation.navigate('Seleção')}
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
