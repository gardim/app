import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, FAB, List, Avatar, Snackbar } from 'react-native-paper';
import { Plant } from '../../@types';

export function Home() {
	const [visible, setVisible] = React.useState<boolean>(false);

	return (
		<>
			<View style={styles.container}>
				{[].length > 0 ? (
					<>
						<View style={{ flex: 1, justifyContent: 'flex-start' }}>
							{[].map((it: [string, string]) => {
								const plant = JSON.parse(it[1]) as Plant;
								return (
									<List.Item
										key={plant.id}
										title={plant.name}
										titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
										description={plant.scientific_name}
										left={() => <Avatar.Text label={plant.name[0]} size={40} />}
									/>
								);
							})}
						</View>
						<FAB
							icon="plus"
							label={visible ? 'Continuar' : ''}
							style={[styles.compressedFabStyle]}
							variant="primary"
							onLongPress={() => setVisible(!visible)}
							testID="Add Plant"
						/>
					</>
				) : (
					<View style={styles.row}>
						<FAB icon="plus" visible style={[styles.fabStyle]} testID="Add Plant" />
						<Text variant="titleSmall">Adicione sua primeira planta</Text>
					</View>
				)}
			</View>
			<Snackbar
				visible={false}
				action={{
					label: 'OK',
				}}
				onDismiss={() => console.log('false')}
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
