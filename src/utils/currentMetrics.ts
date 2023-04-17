import { HealthAssessment } from '../api/plant_id/types';
import { WeatherstackResponse } from '../api/weatherstack/types';
import { getAllKeys, getMultiple, getOne, storeData } from '../storage';
import { Plant, History, CurrentMetrics, AssessmentResults } from '../types';
import { convertDate, convertHealthAssessmentToAssessmentResults } from '../utils';
import calculateStatus, { Status } from '../utils/status';

export async function updatePlantsCurrentMetricsFromWheather(result: WeatherstackResponse) {
	const keys = await getAllKeys();
	const plants = await getMultiple(keys);

	plants.forEach((it: [string, string]) => {
		const plant = JSON.parse(it[1]) as Plant;

		const setWeather = (plant: Plant, today: string, status: Status): Plant => {
			const current: CurrentMetrics = {
				...plant.current,
				atmospheric_humidity: result?.current?.humidity,
				atmospheric_temperature: result?.current?.temperature,
			};

			return {
				...plant,
				history: updateHistoryArray(plant.history, { ...current, date: today, status: status }),
				current: current,
			};
		};

		updatePlant(plant.id, setWeather);
	});
}

async function updatePlant(
	id: string,
	callback: (plant: Plant, today: string, status: Status) => Plant
) {
	const a = `@${id}`;
	const plant = await getOne(a);
	if (!plant) {
		console.warn(`Plant is null! With id: ${id}, ${plant}`);
		return;
	}

	if (!plant.current) {
		plant.current = {};
	}

	const today = convertDate(new Date());
	const status = calculateStatus(plant);

	const newPlant = callback(plant, today, status);

	console.log(`New Plant to SAVE: ${JSON.stringify(newPlant)}`);
	await storeData(newPlant);
}

function updateHistoryArray(history: History[], item: History): History[] {
	const hasItem = (h: History): boolean => h.date == item.date;

	if (!history?.some(hasItem)) {
		console.log('Item does not exist in history, adding...');
		return [...history, item];
	}

	const shallowClone = [...history];

	const index = shallowClone.findIndex((h: History) => h.date == item.date);

	shallowClone[index] = {
		...item,
	};

	console.log(`Original: ${JSON.stringify(history)}`);
	console.log(`New: ${JSON.stringify(shallowClone)}`);
	return shallowClone;
}

export async function updateLuxCurrentMetricsFromSocket(id: string, value: number | null) {
	if (!value) {
		console.warn(`Null lux value! ${value}`);
		return;
	}

	const setLux = (plant: Plant, today: string, status: Status): Plant => {
		const current: CurrentMetrics = {
			...plant.current,
			light: value,
		};

		return {
			...plant,
			history: updateHistoryArray(plant.history, { ...current, date: today, status: status }),
			current: current,
		};
	};

	await updatePlant(id, setLux);
}

export async function updateSoilCurrentMetricsFromSocket(id: string, value: number | null) {
	if (!value) {
		console.warn(`Null soil value! ${value}`);
		return;
	}
	const setSoil = (plant: Plant, today: string, status: Status): Plant => {
		const current: CurrentMetrics = {
			...plant.current,
			soil_humidity: value,
		};

		return {
			...plant,
			history: updateHistoryArray(plant.history, { ...current, date: today, status: status }),
			current: current,
		};
	};

	await updatePlant(id, setSoil);
}

export async function updateDiseaseCurrentMetricsFromAnalysis(
	id: string,
	value: HealthAssessment | null
) {
	if (!value) {
		console.warn(`Null assessment value! ${value}`);
		return;
	}
	const assessmentResults: AssessmentResults = convertHealthAssessmentToAssessmentResults(value);

	const setAssessment = (plant: Plant, today: string, status: Status): Plant => {
		const current: CurrentMetrics = {
			...plant.current,
			health_assessment: value,
		};

		return {
			...plant,
			history: updateHistoryArray(plant.history, {
				...current,
				date: today,
				status: status,
				assessment_results: assessmentResults,
				health_assessment: null,
			}),
			current: current,
		};
	};

	await updatePlant(id, setAssessment);
}
