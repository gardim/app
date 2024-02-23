import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Searchbar, Chip, FAB, HelperText } from 'react-native-paper';


export function TextMethod() {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [chips, setChips] = React.useState([]);
	const [visible, setVisible] = React.useState<boolean>(false);
	const [buttonOnHold, setButtonOnHold] = React.useState<boolean>(false);

	const addChip = () => {



		setSearchQuery('');
	};


	const removeChip = (chipToDelete: never) => {
		setChips((prevChips) => prevChips.filter((currentChip) => currentChip !== chipToDelete));
	};


	const onSubmit = () => {
		addChip();
	};

	const searchPlants = async () => {
		if (!buttonOnHold) {
			setButtonOnHold(true);
			try {
				console.log('');
			} catch (error) {
				console.log('');
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
						style={styles.fabVariant}
						onSubmitEditing={onSubmit}
					/>
					<HelperText type="info" visible>
						Pressione enter ou espaço para dividir as palavras!
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
							testID="Method Continue"
						/>
					)}
				</View>
			</View>
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
