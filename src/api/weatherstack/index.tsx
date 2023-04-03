import React, { createContext, useEffect, useState, ReactNode, useMemo } from 'react';
import Constants from 'expo-constants';
import { WeatherstackResponse } from './types';

async function getWeather(): Promise<WeatherstackResponse> {
	const { gardimApiUrl } = Constants.manifest.extra;
	const response = await fetch(`${gardimApiUrl}/.netlify/functions/api/weather`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const result = await response.json();
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

	useEffect(() => {
		async function fetchWeather() {
			setIsLoading(true);
			try {
				const result = await getWeather();
				console.log(result);
				setWeather(result);
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		}
		fetchWeather();
	}, []);

	const contextValue = useMemo(() => {
		return { weather, isLoading, error };
	}, [weather, isLoading, error]);

	return <WeahterContext.Provider value={contextValue}>{children}</WeahterContext.Provider>;
};
