import * as React from 'react';
import { Card } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Plant } from 'src/@types';

export type PlantGridItemProps = {
	plant: Plant;
};

const PlantGridItem = ({ plant }: PlantGridItemProps) => {
	const router = useRouter();

	const handleOnPress = (id: string) => {
		router.push(`/plant/${id}`);
	};

	return (
		<Card style={{ margin: 10, flex: 1 }} key={plant.id} onPress={() => handleOnPress(plant.id)}>
			<Card.Cover source={{ uri: plant.image }} />
			<Card.Title title={plant.name} subtitle={plant.scientific_name} />
		</Card>
	);
};
export default PlantGridItem;
