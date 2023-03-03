import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, FAB, List, Avatar, Snackbar } from 'react-native-paper';
import { Plant } from '../types';
import { HomeProps } from '../types/stack';
import { getAllKeys } from '../storage';
import { getMultiple } from '../storage/index';
import { PlantContext } from '../context';

export function Home({ navigation, route }: HomeProps) {
	const [visibleAlert, setVisiblAlert] = React.useState(route.params?.success ? true : false);
	const [visible, setVisible] = React.useState<boolean>(false);

	const onDismissSnackBar = () => setVisiblAlert(false);

	const [plants, setPlants] = useState([]);

	const plantContext = useContext(PlantContext);

	useEffect(() => {
		setVisiblAlert(route.params?.success ? true : false);
	}, [route.params?.success]);

	useEffect(() => {
		const loadPlants = async () => {
			const keys = await getAllKeys();
			const result = await getMultiple(keys);
			setPlants(result);
		};

		loadPlants();
	}, [visibleAlert]);

	const handleOnPress = (plant: Plant) => {
		plantContext.updatePlant(plant);
		navigation.navigate('RootTabNavigation');
	};

	return (
		<>
			<View style={styles.container}>
				{plants.length > 0 ? (
					<>
						<View style={{ flex: 1, justifyContent: 'flex-start' }}>
							{plants.map((it: [string, string]) => {
								const plant = JSON.parse(it[1]) as Plant;
								return (
									<List.Item
										key={plant.id}
										title={plant.name}
										titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
										description={plant.scientific_name}
										onPress={() => handleOnPress(plant)}
										left={() => <Avatar.Text label={plant.name[0]} size={40} />}
									/>
								);
							})}
						</View>
						<FAB
							icon="plus"
							label={visible ? 'Continuar' : ''}
							onPress={() => navigation.navigate('IdentificationMethod')}
							style={[styles.compressedFabStyle]}
							variant="primary"
							onLongPress={() => setVisible(!visible)}
							testID="Add Plant"
						/>
					</>
				) : (
					<View style={styles.row}>
						<FAB
							icon="plus"
							onPress={() => navigation.navigate('IdentificationMethod')}
							visible
							style={[styles.fabStyle]}
							testID="Add Plant"
						/>
						<Text variant="titleSmall">Adicione sua primeira planta</Text>
					</View>
				)}
			</View>
			<Snackbar
				visible={visibleAlert}
				action={{
					label: 'OK',
				}}
				onDismiss={onDismissSnackBar}
				style={{
					marginBottom: 30,
				}}>
				Sua planta foi salva com sucesso!
			</Snackbar>
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
	compressedFabStyle: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		margin: 40,
	},
});
