import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, Platform } from 'react-native';
import { Text, Card, Avatar } from 'react-native-paper';
import { LinearGaugeChart } from '../components/LinearGaugeChart';
import { PlantContext } from '../context';
import { SocketContext } from '../api/socket';
import { getWeather } from '../api/weatherstack';
import { humidityToValue, temperatureToValue } from '../utils/index';

export function Status() {
	const plantContext = useContext(PlantContext);
	const plant = plantContext.plant;
	const { soilValue, luxValue } = useContext(SocketContext);

	const [weatherData, setWeatherData] = useState(null);

	let height = Dimensions.get('window').height;

	if (Platform.OS === 'web') {
		height -= 200;
	}

	useEffect(() => {
		console.log(plant);
		getWeather().then((data) => {
			setWeatherData(data);
		});
	}, []);

	return (
		<View>
			<ScrollView style={{ maxHeight: height }}>
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
				{weatherData && (
					<>
						<Card style={{ marginVertical: 10, marginHorizontal: 20 }}>
							<Card.Title
								title="Umidade do Ambiente"
								left={(props) => <Avatar.Icon {...props} icon="weather-rainy" />}
							/>
							<Card.Content>
								<LinearGaugeChart
									min={humidityToValue(plant.atmospheric_humidity_minimum)}
									max={humidityToValue(plant.atmospheric_humidity_maximum)}
									value={humidityToValue(weatherData.current.humidity)}
								/>
							</Card.Content>
							<Card.Actions>
								<Text>{weatherData.current.humidity}%</Text>
							</Card.Actions>
						</Card>
						<Card style={{ marginVertical: 10, marginHorizontal: 20 }}>
							<Card.Title
								title="Temperatura do Ambiente"
								left={(props) => <Avatar.Icon {...props} icon="sun-thermometer-outline" />}
							/>
							<Card.Content>
								<LinearGaugeChart
									min={temperatureToValue(plant.temperature_minimum)}
									max={temperatureToValue(plant.temperature_maximum)}
									value={temperatureToValue(weatherData.current.temperature)}
								/>
							</Card.Content>
							<Card.Actions>
								<Text>{weatherData.current.temperature}°C</Text>
							</Card.Actions>
						</Card>
					</>
				)}
			</ScrollView>
		</View>
	);
}
