import Constants from 'expo-constants';
import { TreflePlantSearchResponse, TrefleSpeciesResponse } from './types';

export async function identifyPlant(query: string[]): Promise<TreflePlantSearchResponse> {
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

export async function getPlant(id: number): Promise<TrefleSpeciesResponse> {
	const { gardimApiUrl } = Constants.manifest.extra;
	const response = await fetch(`${gardimApiUrl}/.netlify/functions/api/trefle?id=${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const result = await response.json();
	console.log(result);
	return result;
}
