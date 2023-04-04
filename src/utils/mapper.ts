import { TrefleSpeciesResponse } from '../api/trefle/types';
import { Suggestion } from '../api/plant_id/types';
import uuid from 'react-native-uuid';

import { Plant } from '../types';
import {
	PH_MINIMUM,
	PH_MAXIMUM,
	LIGHT_MINIMUM,
	LIGHT_MAXIMUM,
	ATMOSPHERIC_HUMIDITY_MINIMUM,
	ATMOSPHERIC_HUMIDITY_MAXIMUM,
	TEMPERATURE_MINIMUM,
	TEMPERATURE_MAXIMUM,
	SOIL_HUMIDITY_MINIMUM,
	SOIL_HUMIDITY_MAXIMUM,
} from './defaults';
import { convertScale } from '.';

export const mapToPlant = (info: TrefleSpeciesResponse | Suggestion): Plant => {
	const isTrefle = (info as TrefleSpeciesResponse)?.data !== undefined;
	const plantDetails: Plant = {
		id: uuid.v4().toString(),
		name: null,
		code: null,
		common_name: null,
		scientific_name: null,
		edible_parts: null,
		ph_maximum: PH_MAXIMUM,
		ph_minimum: PH_MINIMUM,
		light_minimum: LIGHT_MINIMUM,
		light_maximum: LIGHT_MAXIMUM,
		atmospheric_humidity_minimum: ATMOSPHERIC_HUMIDITY_MINIMUM,
		atmospheric_humidity_maximum: ATMOSPHERIC_HUMIDITY_MAXIMUM,
		temperature_minimum: TEMPERATURE_MINIMUM,
		temperature_maximum: TEMPERATURE_MAXIMUM,
		soil_humidity_minimum: SOIL_HUMIDITY_MINIMUM,
		soil_humidity_maximum: SOIL_HUMIDITY_MAXIMUM,
	};

	if (isTrefle) {
		const trefleData = (info as TrefleSpeciesResponse).data;
		plantDetails.id = uuid.v4().toString();
		plantDetails.common_name = trefleData.common_name ?? plantDetails.common_name;
		plantDetails.scientific_name = trefleData.scientific_name ?? plantDetails.scientific_name;
		plantDetails.edible_parts = trefleData.edible_part ?? plantDetails.edible_parts;
		plantDetails.ph_maximum = trefleData.growth?.ph_maximum ?? plantDetails.ph_maximum;
		plantDetails.ph_minimum = trefleData.growth?.ph_minimum ?? plantDetails.ph_minimum;
		plantDetails.light_minimum = trefleData.growth?.light - 2 ?? plantDetails.light_minimum;
		plantDetails.light_maximum = trefleData.growth?.light + 2 ?? plantDetails.light_maximum;

		plantDetails.atmospheric_humidity_minimum =
			trefleData.growth?.atmospheric_humidity - 2 ?? plantDetails.atmospheric_humidity_minimum;

		plantDetails.atmospheric_humidity_maximum =
			trefleData.growth?.atmospheric_humidity + 2 ?? plantDetails.atmospheric_humidity_maximum;

		plantDetails.temperature_minimum =
			trefleData.growth?.minimum_temperature?.deg_c ?? plantDetails.temperature_minimum;

		plantDetails.temperature_maximum =
			trefleData.growth?.maximum_temperature?.deg_c ?? plantDetails.temperature_maximum;

		plantDetails.soil_humidity_minimum = trefleData.growth?.soil_humidity
			? trefleData.growth.soil_humidity - 2
			: plantDetails.soil_humidity_minimum;

		plantDetails.soil_humidity_maximum = trefleData.growth?.soil_humidity
			? trefleData.growth.soil_humidity + 2
			: plantDetails.soil_humidity_maximum;
	} else {
		const plantIdData = info as Suggestion;
		plantDetails.id = plantIdData.plant_name;
		plantDetails.common_name = plantIdData.plant_name ?? plantDetails.common_name;
		plantDetails.scientific_name =
			plantIdData.plant_details?.scientific_name ?? plantDetails.scientific_name;
		plantDetails.edible_parts =
			plantIdData.plant_details?.edible_parts ?? plantDetails.edible_parts;
		plantDetails.soil_humidity_minimum =
			convertScale(plantIdData.plant_details?.watering?.min) ??
			plantDetails.soil_humidity_minimum;
		plantDetails.soil_humidity_maximum =
			convertScale(plantIdData.plant_details?.watering?.max) ??
			plantDetails.soil_humidity_maximum;
	}

	return plantDetails;
};
