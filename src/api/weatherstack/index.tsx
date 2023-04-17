import React, { createContext, useEffect, useState, ReactNode, useMemo, useContext } from 'react';
import Constants from 'expo-constants';
import { WeatherstackResponse } from './types';
import { LocationContext } from '../location';
import { updatePlantsCurrentMetricsFromWheather } from '../../utils/currentMetrics';

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
				if (latitude == undefined || longitude == undefined) return;

				const result = await getWeather(latitude, longitude);
				setWeather(result);
				await updatePlantsCurrentMetricsFromWheather(result);
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
