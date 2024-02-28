import * as React from 'react';
import { Image, View } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Plant } from 'src/@types';

export type PlantItemProps = {
	plant: Plant;
};

const PlantItem = ({ plant }: PlantItemProps) => {
	const router = useRouter();

	const handleOnPress = (id: string) => {
		router.push(`/plant/${id}`);
	};

	return (
		<List.Item
			key={plant.id}
			title={plant.name}
			titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
			description={plant.scientific_name}
			onPress={() => handleOnPress(plant.id)}
			left={() =>
				plant.image ? (
					<View style={{ overflow: 'hidden', width: 40, height: 40, borderRadius: 40 }}>
						<Image
							source={{ uri: plant.image }}
							style={{ width: 100, height: 100, bottom: 20, right: 20 }}
						/>
					</View>
				) : (
					<Avatar.Text label={plant.name[0]} size={40} />
				)
			}
		/>
	);
};
export default PlantItem;
