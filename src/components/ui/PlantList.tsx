import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import { Plant } from '../../types';
import PlantItem from '../elements/PlantItem';

export type PlantListProps = {
	plants: Plant[];
};

const PlantList = ({ plants }: PlantListProps) => {
	const [visible, setVisible] = React.useState<boolean>(false);
	const isEmpty = plants.length == 0;

	return (
		<>
			{!isEmpty ? (
				<>
					{plants.map((plant) => (
						<PlantItem plant={plant} key={plant.id} />
					))}
				</>
			) : (
				<Text
					variant="titleSmall"
					style={{
						alignSelf: 'center',
						margin: 20,
					}}>
					Adicione sua primeira planta
				</Text>
			)}
			<FAB
				icon="plus"
				label={visible ? 'Continuar' : ''}
				onPress={() => console.log('clicked')}
				variant="primary"
				style={!isEmpty ? styles.fabBottom : styles.fabCenter}
				onLongPress={() => setVisible(!visible)}
				testID="Add Plant"
			/>
		</>
	);
};

const styles = StyleSheet.create({
	fabBottom: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
	},
	fabCenter: {
		alignSelf: 'center',
	},
});

export default PlantList;
