import Constants from 'expo-constants';
import { WeatherstackResponse } from './types';

export async function getWeather(): Promise<WeatherstackResponse> {
	const { weatherUrl, weatherApiKey } = Constants.manifest.extra;
	const response = await fetch(`${weatherUrl}?access_key=${weatherApiKey}&query=São Paulo`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const result = await response.json();
	return result;
}
