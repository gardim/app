import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

type PlantOptionsListProps = {
	info: {
		id: number;
		name: string;
		probability: number | null;
	}[];
	onOptionSelect: (id: string) => void;
};

export const PlantOptionsList = ({ info, onOptionSelect }: PlantOptionsListProps) => {
	const [selectedId, setSelectedId] = useState(null);

	const handleOptionSelect = (optionId) => {
		onOptionSelect(optionId);
		if (selectedId == optionId) {
			setSelectedId(null);
		} else {
			setSelectedId(optionId);
		}
	};

	return (
		<View style={styles.container}>
			{info.map((option) => (
				<Card
					onPress={() => handleOptionSelect(option.id)}
					key={option.id}
					style={styles.card}
					mode={selectedId === option.id ? 'contained' : 'elevated'}
					testID="CardComponent">
					<Card.Content>
						<Text variant="titleMedium">{option.name}</Text>
						{option.probability ? (
							<Text style={styles.probability}>
								Probabilidade de acerto: {option.probability.toFixed(2)}
							</Text>
						) : null}
					</Card.Content>
				</Card>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	card: {
		marginBottom: 8,
	},
	probability: {
		marginTop: 4,
		fontSize: 12,
		color: '#666',
	},
});
