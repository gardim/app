import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Image } from 'react-native';
import { FAB } from 'react-native-paper';

export default function ImageIdentification({ navigation }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      selectionLimit: 5,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <FAB
          icon="plus"
          label="Adicione uma foto"
          onPress={pickImage}
          visible
          style={[styles.fabStyle]}
        />
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
