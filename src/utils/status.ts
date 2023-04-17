import { Plant, CurrentMetrics } from '../types';
import { StatusColorTheme } from './theme';

export enum Status {
	Good,
	Average,
	Bad,
}

export default function calculateStatus(plant: Plant): Status {
	const total = {
		good: 0,
		average: 0,
		bad: 0,
	};

	if (!plant?.current) {
		console.warn('No current status: BAD');
		return Status.Bad;
	}

	for (const [key, value] of Object.entries(plant.current)) {
		if (value !== null) {
			const { min, max } = getFeatureMinMax(key as keyof CurrentMetrics, plant);
			const status = getFeatureStatus(value, min, max);
			total[status]++;
		}
	}

	if (total.bad > 0 && total.bad > total.average && total.bad > total.good) {
		console.log(`Bad: ${total.bad}, Average: ${total.average}, Good: ${total.good}; Result: BAD`);
		return Status.Bad;
	}

	if (total.average > 0 && total.average > total.good) {
		console.log(
			`Bad: ${total.bad}, Average: ${total.average}, Good: ${total.good}; Result: AVERAGE`
		);
		return Status.Average;
	}

	console.log(`Bad: ${total.bad}, Average: ${total.average}, Good: ${total.good}; Result: GOOD`);
	return Status.Good;
}

function getFeatureMinMax(
	feature: keyof CurrentMetrics,
	plant: Plant
): { min: number; max: number } {
	const featureString = `${feature}`;

	const sanitizedFeatureString =
		featureString == 'atmospheric_temperature' ? 'temperature' : featureString;

	const min_name = `${sanitizedFeatureString}_minimum`;
	const max_name = `${sanitizedFeatureString}_maximum`;
	const min = plant[min_name] ?? 0;
	const max = plant[max_name] ?? 100;

	return { min, max };
}

function getFeatureStatus(value: number, min: number, max: number): 'good' | 'average' | 'bad' {
	const range = max - min;
	const midPoint = min + range / 2;
	const threshold = range * 0.3;

	if (value >= min && value <= max) {
		console.log(`${value} is greater than ${min}, and lower than ${max}, so it is GOOD`);
		return 'good';
	}

	if (value >= min - threshold && value <= max + threshold) {
		console.log(
			`${value} is greater than ${min - threshold}, and lower than ${
				max + threshold
			}, so it is AVERAGE`
		);
		return 'average';
	}

	console.log(
		`${value} outside the good and average bounds, MIN: ${min}, MAX: ${max}, midPoint: ${midPoint}, threshold: ${threshold}`
	);

	return 'bad';
}

export function statusToColor(status: Status) {
	if (status === Status.Average) {
		return StatusColorTheme.average;
	} else if (status === Status.Bad) {
		return StatusColorTheme.bad;
	}
	return StatusColorTheme.good;
}
