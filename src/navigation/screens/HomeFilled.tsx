import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Text, FAB, List, Avatar, Divider } from 'react-native-paper';

import ScreenWrapper from '../../components/ScreenWrapper';

export default function Home({ navigation }) {
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <>
      <ScreenWrapper>
        <List.Item
          title="Headline"
          onPress={() => navigation.navigate('Plant')}
          left={(props) => <Avatar.Text style={props.style} label="A" size={40} />}
        />
        <List.Item
          title="Headline"
          description="Supporting text"
          left={(props) => <Avatar.Text style={props.style} label="A" size={40} />}
        />
        <List.Item
          title="Headline"
          description="Supporting text"
          left={(props) => <Avatar.Text style={props.style} label="A" size={40} />}
        />
        <List.Item
          title="Headline"
          description="Supporting text"
          left={(props) => <Avatar.Text style={props.style} label="A" size={40} />}
        />
        <List.Item
          title="Headline"
          description="Supporting text"
          left={(props) => <Avatar.Text style={props.style} label="A" size={40} />}
        />
        <List.Item
          title="Headline"
          description="Supporting text"
          left={(props) => <Avatar.Text style={props.style} label="A" size={40} />}
        />
        <List.Item
          title="Headline"
          description="Supporting text"
          left={(props) => <Avatar.Text style={props.style} label="A" size={40} />}
        />
        <List.Item
          title="Headline"
          description="Supporting text"
          left={(props) => <Avatar.Text style={props.style} label="A" size={40} />}
        />
        <List.Item
          title="Headline"
          description="Supporting text"
          left={(props) => <Avatar.Text style={props.style} label="A" size={40} />}
        />
        <List.Item
          title="Headline"
          description="Supporting text"
          left={(props) => <Avatar.Text style={props.style} label="A" size={40} />}
        />

        <List.Item
          title="Headline"
          description="Supporting text that is long enough to fill up multiple lines in the item"
          left={(props) => <Avatar.Text style={props.style} label="A" size={40} />}
        />
        <Divider />
        <List.Item
          title="Headline"
          left={(props) => <Avatar.Text style={props.style} label="A" size={40} />}
        />
        <List.Item
          title="Headline"
          description="Supporting text"
          left={(props) => <Avatar.Text style={props.style} label="A" size={40} />}
        />
        <List.Item
          title="Headline"
          description="Supporting text that is long enough to fill up multiple lines in the item"
          left={(props) => <Avatar.Text style={props.style} label="A" size={40} />}
        />
        <Divider />
      </ScreenWrapper>
      <FAB
        icon="plus"
        label={visible ? 'Adicione uma planta' : ''}
        style={styles.fab}
        onPress={() => navigation.navigate('Identifique sua planta')}
        onLongPress={() => setVisible(!visible)}
      />
    </>
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
