import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, FAB } from 'react-native-paper';
import { HomeProps } from '../types/index';

export function Home({ navigation }: HomeProps) {
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<FAB
					icon="plus"
					onPress={() => navigation.navigate('IdentificationMethod')}
					visible
					style={[styles.fabStyle]}
				/>
				<Text variant="titleSmall">Adicione sua primeira planta</Text>
			</View>
		</View>
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
