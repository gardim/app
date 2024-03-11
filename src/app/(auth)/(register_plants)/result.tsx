import * as React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import Return from '@components/ui/Return';
import { i18n } from '@lang/index';
import { useRouter } from 'expo-router';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';
import EmptyBanner from '@components/ui/EmptyBanner';
import { useEffect, useState } from 'react';

const Result = () => {
	const router = useRouter();
	const [selectedOption, setSelectedOption] = useState(null);
	const { response, loading, error } = useSelector((state: RootState) => state.response);


	const handleSelect = (optionId) => {
		if (selectedOption == optionId) {
			setSelectedOption(null);
		} else {
			setSelectedOption(optionId);
		}
	};

	useEffect(() => {

	}, [selectedOption]);
	

	const handleReturn = () => {
		router.push('/(auth)/(tabs)/myPlants');
	};

	return (
		<View style={styles.container}>
			<Return
				title={i18n.t('register_plants')}
				subTitle={i18n.t('result.subtitle')}
				handleReturn={handleReturn}
				confirmation
			/>
			<View
				style={{
					flexGrow: 0.6,
					flexDirection: 'column',
					paddingHorizontal: 40,
				}}>
				{response.length > 0 && (
					<Text variant="titleMedium" style={{ textAlign: 'center', marginVertical: 20 }}>
						{i18n.t('result.explanation')}
					</Text>
				)}

				<FlatList
					contentContainerStyle={
						response.length == 0 && { flexGrow: 1, justifyContent: 'center' }
					}
					data={response}
					keyExtractor={(item) => item.name}
					renderItem={({ item }) => (
						<Card
							onPress={() => handleSelect(item)}
							style={{ marginVertical: 10 }}
							key={item.name}
							mode={selectedOption === item.name ? 'contained' : 'elevated'}>
							<Card.Content>
								<Text variant="titleMedium">{item.name}</Text>
								{item.probability && (
									<Text style={styles.probability}>
										{i18n.t('result.probability')}: {(item.probability * 100).toFixed(2)}{' '}
										%
									</Text>
								) }
							</Card.Content>
						</Card>
					)}
					ListEmptyComponent={() => (
						<View style={{ alignItems: 'center', justifyContent: 'center' }}>
							<EmptyBanner message={i18n.t('result.empty')} />
							<Button icon={'autorenew'} mode={'contained'} onPress={() => router.back()}>
								{i18n.t('Try Again')}
							</Button>
						</View>
					)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	fabStyle: {
		marginVertical: 20,
	},
	compressedFabStyle: {
		position: 'absolute',
		right: 40,
		bottom: 40,
	},
	probability: {
		marginTop: 4,
		fontSize: 12,
		color: '#666',
	},
});

export default Result;
