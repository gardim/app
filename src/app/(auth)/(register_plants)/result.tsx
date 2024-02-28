import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import Return from '@components/ui/Return';
import { i18n } from '@lang/index';
import { useRouter } from 'expo-router';

const Result = () => {
	const router = useRouter();

	const handleReturn = () => {
		router.push('/(auth)/(tabs)/myPlants');
	};

	return (
		<View style={styles.container}>
			<Return
				title={i18n.t('textMethod.title')}
				subTitle={i18n.t('textMethod.subtitle')}
				handleReturn={handleReturn}
				confirmation
			/>
			<View style={styles.row}>
				<Text variant="titleMedium" style={{ textAlign: 'center' }}>
					Selecione o resultado da busca
				</Text>
				<ScrollView>
					{/* <PlantOptionsList
						info={[].map(() => ({
							id: 1,
							name: 'a',
							probability: 8,
						}))}
						onOptionSelect={() => console.log('')}
					/> */}
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
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

export default Result;
