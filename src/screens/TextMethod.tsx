import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Text, Searchbar, Chip, FAB } from 'react-native-paper';
import { TextMethodProps } from '../types/index';

export function TextMethod({ navigation }: TextMethodProps) {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [chips, setChips] = React.useState([]);
	const [visible, setVisible] = React.useState<boolean>(false);

	const addChip = () => {
		if (searchQuery.trim()) {
			setChips((prevChips) => [...prevChips, searchQuery.trim()]);
			setSearchQuery('');
		}
	};

	const removeChip = (chipIndex) => {
		setChips((prevChips) => prevChips.filter((_, index) => index !== chipIndex));
	};

	const onChangeSearch = (query) => {
		setSearchQuery(query);
		if (query.endsWith(' ')) {
			addChip();
		}
	};
	return (
		<SafeAreaView style={styles.container}>
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
					{chips.map((chip, index) => (
						<Chip key={index} onClose={() => removeChip(index)} style={styles.chip}>
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
						onPress={() => console.log('click')}
						style={[styles.compressedFabStyle]}
						variant="primary"
						onLongPress={() => setVisible(!visible)}
					/>
				) : (
					<></>
				)}
			</View>
		</SafeAreaView>
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
