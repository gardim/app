import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Card, Avatar } from 'react-native-paper';
import { LinearGaugeChart } from '../components/LinearGaugeChart';

export function Status() {
	return (
		<View style={{ flex: 1 }}>
			<ScrollView>
				<SoilCard/>
				<SoilCard/>
				<SoilCard/>
				<SoilCard/>
			</ScrollView>
		</View>
	);
}

const SoilCard = () => {
	return (
		<Card style={{ marginVertical: 10, marginHorizontal: 20 }}>
			<Card.Title
				title="Umidade do Solo"
				left={(props) => <Avatar.Icon {...props} icon="water-alert-outline" />}
			/>
			<Card.Content>
				<LinearGaugeChart
					min={10}
					max={40}
					value={10}
					range={{
						min: 10,
						max: 20,
					}}
				/>
			</Card.Content>
			<Card.Actions>
				<Text>{10}%</Text>
			</Card.Actions>
		</Card>
	);
};
