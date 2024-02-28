import Return from '@components/ui/Return';
import { i18n } from '@lang/index';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Searchbar, Chip, FAB, HelperText } from 'react-native-paper';

const TextMethod = () => {
	const router = useRouter();

	const [searchQuery, setSearchQuery] = useState('');
	const [chips, setChips] = useState<Array<string>>([]);
	const [visible, setVisible] = useState<boolean>(false);
	const [allowContinue, setAllowContinue] = useState<boolean>(false);

	useEffect(() => {
		if (chips.length) {
			setAllowContinue(true);
		} else {
			setAllowContinue(false);
		}
	}, [chips]);

	const handleReturn = () => {
		router.push('/(auth)/(tabs)/myPlants');
	};

	const removeChip = (chipToDelete: string) => {
		setChips((prevChips) => prevChips.filter((currentChip) => currentChip !== chipToDelete));
	};

	const onChangeSearch = (query: string) => {
		setSearchQuery(query);
		if (query.endsWith(' ')) {
			addChip();
		}
	};

	const addChip = () => {
		const queryString = searchQuery.trim();

		if (!chips.includes(queryString) && queryString) {
			setChips((prevChips) => [...new Set([...prevChips, queryString])]);
		}
		setSearchQuery('');
	};

	return (
		<View style={styles.container}>
			<Return
				title={i18n.t('textMethod.title')}
				subTitle={i18n.t('textMethod.subtitle')}
				handleReturn={handleReturn}
				confirmation
			/>
			<View
				style={{
					flexGrow: 0.6,
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-around',
					paddingHorizontal: 40,
				}}>
				<View style={styles.row}>
					<Text variant="titleMedium" style={{ textAlign: 'center' }}>
						{i18n.t('textMethod.explanation')}
					</Text>

					<Searchbar
						placeholder="Search"
						value={searchQuery}
						onChangeText={onChangeSearch}
						style={styles.fabVariant}
						onSubmitEditing={() => router.push('/result')}
					/>
					<HelperText type="info" visible>
						{i18n.t('textMethod.tip')}
					</HelperText>
					<View style={styles.chipsContainer}>
						{chips.map((chip) => (
							<Chip key={chip} onClose={() => removeChip(chip)} style={styles.chip}>
								{chip}
							</Chip>
						))}
					</View>
				</View>
			</View>
			<FAB
				icon="arrow-right"
				label={visible ? i18n.t('Continue') : ''}
				onPress={() => router.push('/result')}
				style={[styles.compressedFabStyle]}
				variant="primary"
				onLongPress={() => setVisible(!visible)}
				visible={allowContinue}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
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
		right: 40,
		bottom: 40,
	},
});

export default TextMethod;
