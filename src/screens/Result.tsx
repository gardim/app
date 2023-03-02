import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import { PlantOptionsList } from '../components/PlantOptionsList';
import { ResultProps } from '../types/index';
import { Text, FAB } from 'react-native-paper';
import { PlantIDResponse } from '../api/plant_id/types';
import { TreflePlantSearchResponse } from '../api/trefle/types';
import { getPlant } from '../api/trefle';
import { PlantContext } from '../context';
import { mapToPlant } from '../utils/mapper';

export function Result({ navigation, route }: ResultProps) {
	const [selectedOption, setSelectedOption] = useState(null);
	const [visible, setVisible] = React.useState<boolean>(false);
	const [buttonOnHold, setButtonOnHold] = React.useState<boolean>(false);

	const plantResult = route.params;
	const isTrefle = (plantResult as PlantIDResponse).suggestions ? false : true;
	let height = Dimensions.get('window').height;

	const plantContext = useContext(PlantContext);

	if (Platform.OS === 'web') {
		height -= 100;
	}

	const handleSelect = (optionId) => {
		if (selectedOption == optionId) {
			setSelectedOption(null);
		} else {
			setSelectedOption(optionId);
		}
	};

	const handleContinue = async () => {
		let plant = null;
		if (isTrefle) {
			if (!buttonOnHold) {
				setButtonOnHold(true);
				try {
					const result = await getPlant(selectedOption);
					if (result.data) {
						plant = mapToPlant(result);
					} else {
						throw new Error('Trefle Species not found');
					}
				} catch (error) {
					console.error(error);
					alert('Oops! Algo deu errado');
				} finally {
					setButtonOnHold(false);
				}
			}
		} else {
			const plantSelected = (plantResult as PlantIDResponse).suggestions.find(
				(it) => it.id === selectedOption
			);

			console.log(JSON.stringify(plantSelected));

			plant = mapToPlant(plantSelected);
		}

		plantContext.updatePlant(plant);
		navigation.navigate('Name');
	};

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Text variant="titleMedium" style={{ textAlign: 'center' }}>
					Selecione o resultado da busca
				</Text>
				<ScrollView style={{ maxHeight: height }}>
					{(plantResult as PlantIDResponse).suggestions ? (
						<PlantOptionsList
							info={(plantResult as PlantIDResponse).suggestions.map((it) => ({
								id: it.id,
								name: it.plant_name,
								probability: it.probability,
							}))}
							onOptionSelect={handleSelect}
						/>
					) : (
						<PlantOptionsList
							info={(plantResult as TreflePlantSearchResponse).data
								.filter((it) => it.common_name != null)
								.map((it) => ({
									id: it.id,
									name: it.common_name,
									probability: null,
								}))}
							onOptionSelect={handleSelect}
						/>
					)}
				</ScrollView>
			</View>
			{selectedOption && (
				<FAB
					icon="arrow-right"
					label={visible ? 'Continuar' : ''}
					onPress={() => handleContinue()}
					style={[styles.compressedFabStyle]}
					variant="primary"
					onLongPress={() => setVisible(!visible)}
					disabled={buttonOnHold}
					testID="Result Continue"
				/>
			)}
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
