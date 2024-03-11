import Return from '@components/ui/Return';
import { i18n } from '@lang/index';
import { useRouter } from 'expo-router';
import * as React from 'react';

import { View, StyleSheet } from 'react-native';
import { Text, FAB } from 'react-native-paper';

export default function IdentificationMethod() {
	const router = useRouter();

	const handleReturn = () => {
		router.push('/(auth)/(tabs)/myPlants');
	};

	return (
		<View style={styles.container}>
			<Return
				title={i18n.t('register_plants')}
				subTitle={i18n.t('identificationMethod.subtitle')}
				handleReturn={handleReturn}
				confirmation={true}
			/>
			<View
				style={{
					flexGrow: 0.6,
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-around',
					paddingHorizontal: 40,
				}}>
				<Text variant="titleMedium" style={{ textAlign: 'center' }}>
					{i18n.t('identificationMethod.explanation')}
				</Text>
				<FAB
					icon="camera"
					label={i18n.t('identificationMethod.image')}
					size="medium"
					visible
					onPress={() => router.push('/(auth)/(register_plants)/imageMethod')}
				/>
				<Text variant="titleMedium"> {i18n.t('or')} </Text>
				<FAB
					icon="clipboard-edit-outline"
					label={i18n.t('identificationMethod.text')}
					visible
					size="medium"
					onPress={() => router.push('/(auth)/(register_plants)/textMethod')}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	row: {
		flex: 0.5,
		marginBottom: 8,
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	fabVariant: {},
});
