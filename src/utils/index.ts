export function convertScale(num: number): number {
	num -= 1;
	return Math.round(num * 3.33) + 1;
}

export function temperatureToValue(temperature: number): number {
	const minTemp = -10;
	const maxTemp = 40;

	if (temperature < minTemp || temperature > maxTemp) {
		throw new Error(`Temperature value ${temperature} is out of range.`);
	}

	const t = (temperature - minTemp) / (maxTemp - minTemp);

	const value = 1 + t * 9;

	return Math.round(value);
}

export function humidityToValue(humidity: number): number {
	const base10 = Math.round(humidity / 10);
	return Math.max(base10, 1);
}
