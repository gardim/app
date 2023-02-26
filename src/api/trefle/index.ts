import Constants from 'expo-constants';
import { TrefleResponse } from './types';

export async function identifyPlant(query: string[]): Promise<TrefleResponse> {
	const { gardimApiUrl } = Constants.manifest.extra;
	const response = await fetch(`${gardimApiUrl}/.netlify/functions/api/trefle`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(query),
	});

	const result = await response.json();
	return result;
}
