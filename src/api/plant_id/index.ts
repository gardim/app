import { ImageType } from '../../types';
import { PlantIDResponse } from './types';
import Constants from 'expo-constants';

interface RequestBody {
	images: string[];
	latitude?: string;
	longitude?: string;
	modifiers: string[];
	plant_details: string[];
	plant_language: string;
}

export async function identifyPlant(
	images: ImageType[],
	latitude?: string,
	longitude?: string
): Promise<PlantIDResponse> {
	const { plantIdApiKey, plantIdApiUrl } = Constants.manifest.extra;

	const base64Images: string[] = await Promise.all(
		images.map(async (image: ImageType) => {
			const response = await fetch(image.uri);
			const blob = await response.blob();
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onerror = () => reject('Failed to convert image to base64');
				reader.onload = () => resolve(reader.result as string);
				reader.readAsDataURL(blob);
			});
		})
	);

	const requestBody: RequestBody = {
		images: base64Images,
		modifiers: ['similar_images'],
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
