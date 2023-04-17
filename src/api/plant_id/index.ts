import { PlantIDIdentificationResponse, PlantIDHealthResponse } from './types';
import Constants from 'expo-constants';

interface RequestBodyIdentification {
	images: string[];
	latitude?: string;
	longitude?: string;
	plant_details: string[];
	plant_language: string;
}

interface RequestBodyHealth {
	images: string[];
	latitude?: string;
	longitude?: string;
	disease_details: string[];
	plant_language: string;
}

export async function identifyPlant(
	base64Images: string[],
	latitude?: string,
	longitude?: string
): Promise<PlantIDIdentificationResponse> {
	const { plantIdApiKey, plantIdApiUrl } = Constants.manifest.extra;

	const requestBody: RequestBodyIdentification = {
		images: base64Images,
		plant_details: [
			'common_names',
			'wiki_description',
			'edible_parts',
			'propagation_methods',
			'name_authority',
			'taxonomy',
			'watering',
		],
		plant_language: 'pt',
	};

	if (latitude !== undefined && longitude !== undefined) {
		requestBody.latitude = latitude;
		requestBody.longitude = longitude;
	}

	const response = await fetch(`${plantIdApiUrl}/identify`, {
		method: 'POST',
		headers: {
			'Api-Key': plantIdApiKey,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody),
	});

	const result = await response.json();
	return result;
}

export async function plantHealth(
	base64Images: string[],
	latitude?: string,
	longitude?: string
): Promise<PlantIDHealthResponse> {
	const { plantIdApiKey, plantIdApiUrl } = Constants.manifest.extra;

	const requestBody: RequestBodyHealth = {
		images: base64Images,
		disease_details: [
			'cause',
			'common_names',
			'classification',
			'description',
			'local_name',
			'treatment',
			'watering',
		],
		plant_language: 'pt',
	};

	if (latitude !== undefined && longitude !== undefined) {
		requestBody.latitude = latitude;
		requestBody.longitude = longitude;
	}

	const response = await fetch(`${plantIdApiUrl}/health_assessment`, {
		method: 'POST',
		headers: {
			'Api-Key': plantIdApiKey,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestBody),
	});

	const result = await response.json();
	return result;
}
