import React from 'react';
import { Text, Card } from 'react-native-paper';

import ScreenWrapper from '../../../components/ScreenWrapper';

export default function Details({ navigation }) {
  return (
    <ScreenWrapper>
      <Card
        onPress={() => console.log('Adicione Imagens')}
        style={{ marginVertical: 10, marginHorizontal: 20 }}>
        <Card.Title title="Umidade do Solo" />
        <Card.Content>
          <Text>Algo</Text>
        </Card.Content>
        <Card.Actions>
          <Text>40%</Text>
        </Card.Actions>
      </Card>
      <Card
        onPress={() => console.log('Adicione Imagens')}
        style={{ marginVertical: 10, marginHorizontal: 20 }}>
        <Card.Title title="Umidade do Ambiente" />
        <Card.Content>
          <Text>Algo</Text>
        </Card.Content>
        <Card.Actions>
          <Text>40%</Text>
        </Card.Actions>
      </Card>
      <Card
        onPress={() => console.log('Adicione Imagens')}
        style={{ marginVertical: 10, marginHorizontal: 20 }}>
        <Card.Title title="Temperatura do Solo" />
        <Card.Content>
          <Text>Algo</Text>
        </Card.Content>
        <Card.Actions>
          <Text>40%</Text>
        </Card.Actions>
      </Card>
      <Card
        onPress={() => console.log('Adicione Imagens')}
        style={{ marginVertical: 10, marginHorizontal: 20 }}>
        <Card.Title title="Temperatura do Ambiente" />
        <Card.Content>
          <Text>Algo</Text>
        </Card.Content>
        <Card.Actions>
          <Text>40%</Text>
        </Card.Actions>
      </Card>
      <Card
        onPress={() => console.log('Adicione Imagens')}
        style={{ marginVertical: 10, marginHorizontal: 20 }}>
        <Card.Title title="Luminosidade" />
        <Card.Content>
          <Text>Algo</Text>
        </Card.Content>
        <Card.Actions>
          <Text>40%</Text>
        </Card.Actions>
      </Card>
    </ScreenWrapper>
  );
}
