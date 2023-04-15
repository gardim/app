import React, { useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Card, Avatar } from 'react-native-paper';
import { LinearGaugeChart } from '../components/LinearGaugeChart';
import { PlantContext } from '../context';
import { SocketContext } from '../api/socket';
import { temperatureToValue } from '../utils/index';
import { LUX, PERCENTAGE, TEMPERATURE } from '../utils/defaults';
import { AntDesign } from '@expo/vector-icons';
import { Plant } from '../types';

export function Status() {
	const { plant } = useContext(PlantContext);
	const { soilValue, luxValue, code } = useContext(SocketContext);

	const renderSoil = !!(soilValue && code == plant.code);
	const renderLux = !!(luxValue && code == plant.code);

	const noData =
		!renderLux &&
		!renderSoil &&
		!plant?.current?.atmospheric_humidity &&
		!plant?.current?.atmospheric_temperature;

	return (
		<View style={{ flex: 1 }}>
			{noData ? (
				<NoData />
			) : (
				<ScrollView>
					{renderSoil && <SoilCard plant={plant} soilValue={soilValue} />}
					{renderLux && <LuxCard plant={plant} luxValue={luxValue} />}
					{!!plant?.current?.atmospheric_humidity && <UmidityCard plant={plant} />}
					{!!plant?.current?.atmospheric_temperature && <TemperatureCard plant={plant} />}
				</ScrollView>
			)}
		</View>
	);
}

interface SoilCardProps {
	soilValue: number;
	plant: Plant;
}

interface LuxCardProps {
	luxValue: number;
	plant: Plant;
}

interface WeatherCardProps {
	plant: Plant;
}

const NoData = () => {
	return (
		<View
			style={{
				justifyContent: 'center',
				alignContent: 'center',
				display: 'flex',
				flex: 1,
				flexDirection: 'column',
			}}>
			<AntDesign name="frowno" size={24} color="black" style={{ alignSelf: 'center' }} />
			<Text variant="titleLarge" style={{ alignSelf: 'center', textAlign: 'center' }}>
				Oops! Parece que você não tem nada habilitado para essa planta
			</Text>
		</View>
	);
};

const SoilCard = ({ soilValue, plant }: SoilCardProps) => {
	return (
		<Card style={{ marginVertical: 10, marginHorizontal: 20 }}>
			<Card.Title
				title="Umidade do Solo"
				left={(props) => <Avatar.Icon {...props} icon="water-alert-outline" />}
			/>
			<Card.Content>
				<LinearGaugeChart
					min={plant.soil_humidity_minimum}
					max={plant.soil_humidity_maximum}
					value={soilValue}
					range={PERCENTAGE}
				/>
			</Card.Content>
			<Card.Actions>
				<Text>{soilValue}%</Text>
			</Card.Actions>
		</Card>
	);
};

const LuxCard = ({ luxValue, plant }: LuxCardProps) => {
	return (
		<Card style={{ marginVertical: 10, marginHorizontal: 20 }}>
			<Card.Title
				title="Luminosidade"
				left={(props) => <Avatar.Icon {...props} icon="lightbulb-on-outline" />}
			/>
			<Card.Content>
				<LinearGaugeChart
					min={plant.light_minimum}
					max={plant.light_maximum}
					value={luxValue}
					range={LUX}
				/>
			</Card.Content>
			<Card.Actions>
				<Text>{luxValue} LUX</Text>
			</Card.Actions>
		</Card>
	);
};

const UmidityCard = ({ plant }: WeatherCardProps) => {
	return (
		<Card style={{ marginVertical: 10, marginHorizontal: 20 }}>
			<Card.Title
				title="Umidade do Ambiente"
				left={(props) => <Avatar.Icon {...props} icon="weather-rainy" />}
			/>
			<Card.Content>
				<LinearGaugeChart
					min={plant?.atmospheric_humidity_minimum}
					max={plant?.atmospheric_humidity_maximum}
					value={plant?.current?.atmospheric_humidity || 0}
					range={PERCENTAGE}
				/>
			</Card.Content>
			<Card.Actions>
				<Text>{plant?.current?.atmospheric_humidity}%</Text>
			</Card.Actions>
		</Card>
	);
};

const TemperatureCard = ({ plant }: WeatherCardProps) => {
	return (
		<Card style={{ marginVertical: 10, marginHorizontal: 20 }}>
			<Card.Title
				title="Temperatura do Ambiente"
				left={(props) => <Avatar.Icon {...props} icon="sun-thermometer-outline" />}
			/>
			<Card.Content>
				<LinearGaugeChart
					min={plant.temperature_minimum}
					max={plant.temperature_maximum}
					value={plant?.current?.atmospheric_temperature}
					range={TEMPERATURE}
					conversor={temperatureToValue}
				/>
			</Card.Content>
			<Card.Actions>
				<Text>{plant?.current?.atmospheric_temperature}°C</Text>
			</Card.Actions>
		</Card>
	);
};
