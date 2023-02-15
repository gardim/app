import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Text, RadioButton, Card, Avatar } from 'react-native-paper';

export default function Result({ navigation }) {
  const [value, setValue] = React.useState('');

  const onValueChange = (newValue) => {
    setValue(newValue);
    navigation.navigate('Código');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text variant="titleMedium" style={{ textAlign: 'center' }}>
        {' '}
        Selecione o resultado mais próximo da sua pesquisa
      </Text>
      <View style={styles.row}>
        <RadioButton.Group onValueChange={(newValue) => onValueChange(newValue)} value={value}>
          <RadioButton.Item mode="ios" label="First item" value="first" />
          <RadioButton.Item mode="ios" label="Second item" value="second" />
        </RadioButton.Group>
        <Card onPress={() => navigation.navigate('Adicione Imagens')}>
          <Card.Title
            title="Dificuldades?"
            subtitle="Tente a identificação por imagem!"
            left={(props) => <Avatar.Icon {...props} icon="camera" />}
          />
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
