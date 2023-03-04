import React, { useContext } from 'react';
import { View } from 'react-native';
import { Text, Card, Avatar } from 'react-native-paper';
import { LinearGaugeChart } from '../components/LinearGaugeChart';
import { PlantContext } from '../context';
import { MQTTContext } from '../api/mqtt';

export function Status() {
	const plantContext = useContext(PlantContext);
	const plant = plantContext.plant;
	const { soilValue, luxValue } = useContext(MQTTContext);

	return (
		<View>
			<Card style={{ marginVertical: 10, marginHorizontal: 20 }}>
				<Card.Title
					title="Umidade do Solo"
					left={(props) => <Avatar.Icon {...props} icon="water-alert-outline" />}
				/>
				<Card.Content>
					<LinearGaugeChart
						min={plant.soil_humidity_minimum}
						max={plant.soil_humidity_maximum}
						value={soilValue || 1}
					/>
				</Card.Content>
				<Card.Actions>
					<Text>{soilValue || 1}</Text>
				</Card.Actions>
			</Card>
			<Card style={{ marginVertical: 10, marginHorizontal: 20 }}>
				<Card.Title
					title="Luminosidade"
					left={(props) => <Avatar.Icon {...props} icon="lightbulb-on-outline" />}
				/>
				<Card.Content>
					<LinearGaugeChart
						min={plant.light_minimum}
						max={plant.light_maximum}
						value={luxValue || 1}
					/>
				</Card.Content>
				<Card.Actions>
					<Text>{luxValue || 1}</Text>
				</Card.Actions>
			</Card>
		</View>
	);
}
