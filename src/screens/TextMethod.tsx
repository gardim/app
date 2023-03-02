import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Searchbar, Chip, FAB, HelperText, Snackbar } from 'react-native-paper';
import { TextMethodProps } from '../types/index';
import { identifyPlant } from '../api/trefle';

export function TextMethod({ navigation }: TextMethodProps) {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [chips, setChips] = React.useState([]);
	const [visible, setVisible] = React.useState<boolean>(false);
	const [buttonOnHold, setButtonOnHold] = React.useState<boolean>(false);
	const [visibleAlert, setVisiblAlert] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');

	const addChip = () => {
		const queryString = searchQuery.trim();

		if (!chips.includes(queryString) && queryString) {
			setChips((prevChips) => [...new Set([...prevChips, queryString])]);
		}
		setSearchQuery('');
	};

	const onDismissSnackBar = () => setVisiblAlert(false);

	const removeChip = (chipToDelete) => {
		setChips((prevChips) => prevChips.filter((currentChip) => currentChip !== chipToDelete));
	};

	const onChangeSearch = (query) => {
		setSearchQuery(query);
		if (query.endsWith(' ')) {
			addChip();
		}
	};

	const searchPlants = async () => {
		if (!buttonOnHold) {
			setButtonOnHold(true);
			try {
				const result = await identifyPlant(chips);
				if (result.data.length) {
					navigation.navigate('Result', result);
				} else {
					throw new Error('Nenhuma planta foi encontrada');
				}
			} catch (error) {
				setErrorMessage(error.message);
				setVisiblAlert(true);
			} finally {
				setButtonOnHold(false);
			}
		}
	};

	return (
		<>
			<View style={styles.container}>
				<View style={styles.row}>
					<Text variant="titleMedium" style={{ textAlign: 'center' }}>
						Digite algumas palavras-chave que nos ajude a identificar sua planta!
					</Text>

					<Searchbar
						placeholder="Search"
						value={searchQuery}
						onChangeText={onChangeSearch}
						style={styles.fabVariant}
					/>
					<HelperText type="info" visible>
						Pressione espaço para dividir as palavras!
					</HelperText>
					<View style={styles.chipsContainer}>
						{chips.map((chip) => (
							<Chip key={chip} onClose={() => removeChip(chip)} style={styles.chip}>
								{chip}
							</Chip>
						))}
					</View>
				</View>
				<View style={styles.row}>
					{chips.length > 0 && (
						<FAB
							icon="arrow-right"
							label={visible ? 'Continuar' : ''}
							onPress={() => searchPlants()}
							style={[styles.compressedFabStyle]}
							variant="primary"
							onLongPress={() => setVisible(!visible)}
							disabled={buttonOnHold}
							testID="Continuar"
						/>
					)}
				</View>
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
				{errorMessage}
			</Snackbar>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 40,
		justifyContent: 'space-around',
	},
	row: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	fabVariant: {
		marginVertical: 20,
	},
	chipsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 8,
		justifyContent: 'flex-start',
	},
	chip: {
		margin: 4,
	},
	compressedFabStyle: {
		position: 'absolute',
		right: 0,
		bottom: 0,
	},
});
