import { ImageType } from '../../types';
import { PlantIDResponse } from './types';
import Constants from 'expo-constants';

export async function identifyPlant(images: ImageType[]): Promise<PlantIDResponse> {
	const { plantIdApiKey, plantIdApiUrl } = Constants.manifest.extra;

	const base64Images = await Promise.all(
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

	const response = await fetch(`${plantIdApiUrl}/identify`, {
		method: 'POST',
		headers: {
			'Api-Key': plantIdApiKey,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
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
		}),
	});

	const result = await response.json();
	return result;
}
