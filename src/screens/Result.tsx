import * as React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import { PlantOptionsList } from '../components/PlantOptionsList';
import { Text } from 'react-native-paper';

export function Result() {
	let height = Dimensions.get('window').height;

	if (Platform.OS === 'web') {
		height -= 100;
	}

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Text variant="titleMedium" style={{ textAlign: 'center' }}>
					Selecione o resultado da busca
				</Text>
				<ScrollView style={{ maxHeight: height }}>
					<PlantOptionsList
						info={[].map(() => ({
							id: 1,
							name: 'a',
							probability: 8,
						}))}
						onOptionSelect={() => console.log('')}
					/>
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: 'flex-start',
	},
	row: {
		flexDirection: 'column',
		justifyContent: 'space-evenly',
	},
	fabStyle: {},
	compressedFabStyle: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		margin: 40,
	},
});
