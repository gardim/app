import { Range } from '../types';
import { TEMPERATURE } from './defaults';

export function convertScale(num: number): number {
	num -= 1;
	return Math.round(num * 3.33) + 1;
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
