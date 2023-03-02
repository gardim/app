import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, FAB, List, Avatar, Snackbar } from 'react-native-paper';
import { HomeProps, Plant } from '../types/index';
import { getAllKeys } from '../storage';
import { getMultiple } from '../storage/index';

export function Home({ navigation, route }: HomeProps) {
	const [visibleAlert, setVisiblAlert] = React.useState(route.params?.success ? true : false);
	const [visible, setVisible] = React.useState<boolean>(false);
	const [buttonOnHold, setButtonOnHold] = React.useState<boolean>(false);

	const onDismissSnackBar = () => setVisiblAlert(false);

	const [plants, setPlants] = useState([]);

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
										onPress={() => console.log('click')}
										left={(props) => (
											<Avatar.Text style={props.style} label={plant.name[0]} size={40} />
										)}
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
							disabled={buttonOnHold}
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
