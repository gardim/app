import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text, TextInput, FAB } from 'react-native-paper';
import { NameProps } from '../types/index';
import { PlantContext } from '../context';

export function Name({ navigation }: NameProps) {
	const [text, setText] = React.useState('');
	const [visible, setVisible] = React.useState<boolean>(false);

	const plantContext = useContext(PlantContext);

	const handleSubmit = () => {
		plantContext.updatePlantName(text);
	};
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.row}>
				<Text variant="titleMedium" style={{ textAlign: 'center' }}>
					{' '}
					Dê um nome à sua planta!
				</Text>
				<TextInput
					mode="flat"
					value={text}
					onChangeText={(text) => setText(text)}
					style={styles.fabVariant}
					onSubmitEditing={() => handleSubmit()}
					testID="input-nome"
				/>
			</View>
			{text.length > 0 && (
				<FAB
					icon="arrow-right"
					label={visible ? 'Continuar' : ''}
					onPress={() => console.log('click')}
					style={[styles.compressedFabStyle]}
					variant="primary"
					onLongPress={() => setVisible(!visible)}
					testID="Nome Continuar"
				/>
			)}
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	row: {
		flex: 0.5,
		flexDirection: 'column',
		justifyContent: 'center',
		padding: 40,
	},
	fabVariant: {
		marginVertical: 20,
	},
	compressedFabStyle: {
		position: 'absolute',
		margin: 40,
		right: 0,
		bottom: 0,
	},
});
