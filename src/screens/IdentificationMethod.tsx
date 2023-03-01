import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, FAB } from 'react-native-paper';
import { IdentificationMethodProps } from '../types/index';

export default function IdentificationMethod({ navigation }: IdentificationMethodProps) {
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Text variant="titleMedium" style={{ textAlign: 'center' }}>
					{' '}
					Selecione o método que deseja seguir para identificar sua plantinha!
				</Text>
				<FAB
					icon="camera"
					label="Identificar por imagem"
					onPress={() => navigation.navigate('ImageMethod')}
					size="medium"
					visible
					testID="Identiricar por imagem"
				/>
				<Text variant="titleMedium"> ou </Text>
				<FAB
					icon="clipboard-edit-outline"
					label="Identificar por texto"
					onPress={() => navigation.navigate('TextMethod')}
					visible
					size="medium"
					testID="Identificar por texto"
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 0.9,
		paddingHorizontal: 8,
		justifyContent: 'center',
	},
	row: {
		flex: 0.5,
		marginBottom: 8,
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	fabVariant: {},
});
