import Constants from 'expo-constants';
import { WeatherstackResponse } from './types';

export async function getWeather(): Promise<WeatherstackResponse> {
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
