import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Searchbar, Chip, FAB } from 'react-native-paper';
import { TextMethodProps } from '../types/index';
import { identifyPlant } from '../api/trefle';
import Constants from 'expo-constants';

export function TextMethod({ navigation }: TextMethodProps) {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [chips, setChips] = React.useState([]);
	const [visible, setVisible] = React.useState<boolean>(false);

	const addChip = () => {
		const queryString = searchQuery.trim();

		if (!chips.includes(queryString) && queryString) {
			setChips((prevChips) => [...new Set([...prevChips, queryString])]);
		}
		setSearchQuery('');
	};

	const removeChip = (chipToDelete) => {
		setChips((prevChips) => prevChips.filter((currentChip) => currentChip !== chipToDelete));
	};

	const onChangeSearch = (query) => {
		setSearchQuery(query);
		if (query.endsWith(' ')) {
			addChip();
		}
	};

	const searchPlants = () => {
		identifyPlant(chips)
			.then((result) => {
				alert(result.data.length ? result.data[0].common_name : 'Não é uma planta');
				console.log(result.data[0].common_name);
			})
			.catch((error) => {
				console.error(error);
				alert(
					`Oops! Algo deu errado.\n URL: ${Constants.manifest.extra.gardimApiUrl} \n${error}`
				);
			});
	};

	return (
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
				<View style={styles.chipsContainer}>
					{chips.map((chip) => (
						<Chip key={chip} onClose={() => removeChip(chip)} style={styles.chip}>
							{chip}
						</Chip>
					))}
				</View>
			</View>
			<View style={styles.row}>
				{chips.length > 0 ? (
					<FAB
						icon="arrow-right"
						label={visible ? 'Continuar' : ''}
						onPress={() => searchPlants()}
						style={[styles.compressedFabStyle]}
						variant="primary"
						onLongPress={() => setVisible(!visible)}
					/>
				) : (
					<></>
				)}
			</View>
		</View>
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
