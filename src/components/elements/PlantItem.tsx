import * as React from 'react';
import { Plant } from '../../types';
import { Avatar, List } from 'react-native-paper';
import { useLinkTo } from '@react-navigation/native';

export type PlantItemProps = {
	plant: Plant;
};

const PlantItem = ({ plant }: PlantItemProps) => {
	const linkTo = useLinkTo();

	const handleOnPress = (id: string) => {
		linkTo(`/plants/${id}`);
	};

	return (
		<List.Item
			key={plant.id}
			title={plant.name}
			titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
			description={plant.scientific_name}
			onPress={() => handleOnPress(plant.id)}
			left={() => <Avatar.Text label={plant.name[0]} size={40} />}
		/>
	);
};
export default PlantItem;
