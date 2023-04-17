/* eslint-disable indent */
import { HealthAssessment } from '../api/plant_id/types';
import { AssessmentResults, ImageType, ProbableDiseases, Range } from '../types';
import { TEMPERATURE } from './defaults';

export function convertScale(num: number): number {
	switch (num) {
		case 1:
			return 0;
		case 2:
			return 5;
		case 3:
			return 10;
		case undefined:
			return 0;
		default:
			throw new Error('Out of range for scale');
	}
}

export function temperatureToValue(temperature: number): number {
	const minTemp = TEMPERATURE.min;
	const maxTemp = TEMPERATURE.max;

	if (temperature < minTemp || temperature > maxTemp) {
		throw new Error(`Temperature value ${temperature} is out of range.`);
	}

	const t = (temperature - minTemp) / (maxTemp - minTemp);

	const value = 1 + t * 9;

	return Math.round(value);
}

export function percentageToValue(value: number): number {
	const base10 = Math.round(value / 10);
	return Math.max(base10, 1);
}

export function scaleRange(range: Range): Range {
	const rangeSize = range.max - range.min;
	const scaleFactor = 10 / rangeSize;
	return {
		min: 0,
		max: Math.ceil((range.max - range.min) * scaleFactor),
	};
}

export function luxToValue(value: number): number {
	let scaleValue = value / 10000;
	if (scaleValue > 10) {
		scaleValue = 10;
	}
	return scaleValue;
}

export function rangeToSeconds(value: number): number {
	const secondsInDay = 24 * 60 * 60;
	return value * secondsInDay;
}

export function convertDate(date: Date): string {
	const newDate = new Date(date);
	return newDate.toISOString().slice(0, 10);
}

export function convertImageToBase64(images: ImageType[]): Promise<string[]> {
	return Promise.all(
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
}

export function convertHealthAssessmentToAssessmentResults(
	healthAssessment: HealthAssessment
): AssessmentResults {
	const probable_diseases: ProbableDiseases[] = healthAssessment.diseases.map((disease) => ({
		name: disease.name,
		probability: disease.probability,
	}));

	const result: AssessmentResults = {
		is_healthy: healthAssessment.is_healthy,
		probable_diseases: probable_diseases,
	};

	return result;
}
