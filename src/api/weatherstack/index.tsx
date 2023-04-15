import React, { createContext, useEffect, useState, ReactNode, useMemo, useContext } from 'react';
import Constants from 'expo-constants';
import { WeatherstackResponse } from './types';
import { LocationContext } from '../location';
import { getAllKeys, getMultiple, storeData } from '../../storage';
import { Plant } from '../../types';
import { convertDate } from '../../utils';

async function getWeather(latitude: string, longitude: string): Promise<WeatherstackResponse> {
	const { gardimApiUrl } = Constants.manifest.extra;
	const response = await fetch(`${gardimApiUrl}/.netlify/functions/api/weather`, {
		method: 'POST',
		headers: {
			'Content-Type': 'text/plain',
		},
		body: `${latitude},${longitude}`,
	});

	const result = await response.json();
	console.log(result);
	return result;
}

type WeatherContextType = {
	weather: WeatherstackResponse | null;
	isLoading: boolean;
	error: Error | null;
};

export const WeahterContext = createContext<WeatherContextType>({
	weather: null,
	isLoading: null,
	error: null,
});

interface WeatherProviderProps {
	children: ReactNode;
}

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
	const [weather, setWeather] = useState<WeatherstackResponse | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const { latitude, longitude, granted } = useContext(LocationContext);

	useEffect(() => {
		async function fetchWeather() {
			try {
				if (latitude != undefined && longitude != undefined) {
					const result = await getWeather(latitude, longitude);
					console.log(result);
					setWeather(result);

					const keys = await getAllKeys();
					const plants = await getMultiple(keys);

					plants.forEach((it: [string, string]) => {
						const plant = JSON.parse(it[1]) as Plant;

						const today = convertDate(new Date());

						console.log(today);

						if (!plant?.current) {
							plant.current = {
								light: null,
								soil_humidity: null,
								atmospheric_humidity: null,
								atmospheric_temperature: null,
								temperature: null,
							};
						}

						console.log(plant);

						const history = plant?.history?.filter((h) => h.date == today);

						if (history.length < 1) {
							plant.history.push({
								date: today,
								status: null,
								image: null,
								light: null,
								soil_humidity: null,
								atmospheric_humidity: result?.current.humidity,
								atmospheric_temperature: result?.current.temperature,
								temperature: null,
							});

							plant.current.atmospheric_humidity = result?.current?.humidity;
							plant.current.atmospheric_temperature = result?.current?.temperature;

							storeData(plant);
							return;
						}

						const index = plant.history.findIndex((x) => x.date == history[0].date);

						plant.history[index] = {
							date: today,
							status: history[index].status,
							image: history[index].image,
							light: history[index].light,
							soil_humidity: history[index].soil_humidity,
							atmospheric_humidity: result.current.humidity,
							atmospheric_temperature: result.current.temperature,
							temperature: history[index].temperature,
						};

						plant.current.atmospheric_humidity = result?.current.humidity;
						plant.current.atmospheric_temperature = result?.current.temperature;

						storeData(plant);
					});
				}
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		}

		if (granted) {
			setIsLoading(true);
			fetchWeather();
		}
	}, [latitude, longitude, granted]);

	const contextValue = useMemo(() => {
		return { weather, isLoading, error };
	}, [weather, isLoading, error]);

	return <WeahterContext.Provider value={contextValue}>{children}</WeahterContext.Provider>;
};
