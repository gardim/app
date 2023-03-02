import { TrefleSpeciesResponse } from '../api/trefle/types';
import { Suggestion } from '../api/plant_id/types';
import { Plant } from '../types/index';
import {
	PH_MAXIMUM,
	PH_MINIMUM,
	LIGHT,
	ATMOSPHERIC_HUMIDITY,
	TEMPERATURE_MINIMUM,
	TEMPERATURE_MAXIMUM,
	HUMIDITY_MINIMUM,
	HUMIDITY_MAXIMUM,
} from './defaults';

export const mapToPlant = (info: TrefleSpeciesResponse | Suggestion): Plant => {
	const isTrefle = (info as TrefleSpeciesResponse)?.data !== undefined;
	const plantDetails: Plant = {
		name: null,
		code: null,
		common_name: null,
		scientific_name: null,
		edible_parts: null,
		ph_maximum: PH_MAXIMUM,
		ph_minimum: PH_MINIMUM,
		light: LIGHT,
		atmospheric_humidity: ATMOSPHERIC_HUMIDITY,
		minimum_temperature: TEMPERATURE_MINIMUM,
		maximum_temperature: TEMPERATURE_MAXIMUM,
		minimum_humidity: HUMIDITY_MINIMUM,
		maximum_humidity: HUMIDITY_MAXIMUM,
	};

	if (isTrefle) {
		const trefleData = (info as TrefleSpeciesResponse).data;
		plantDetails.common_name = trefleData.common_name ?? plantDetails.common_name;
		plantDetails.scientific_name = trefleData.scientific_name ?? plantDetails.scientific_name;
		plantDetails.edible_parts = trefleData.edible_part ?? plantDetails.edible_parts;
		plantDetails.ph_maximum = trefleData.growth?.ph_maximum ?? plantDetails.ph_maximum;
		plantDetails.ph_minimum = trefleData.growth?.ph_minimum ?? plantDetails.ph_minimum;
		plantDetails.light = trefleData.growth?.light ?? plantDetails.light;
		plantDetails.atmospheric_humidity =
			trefleData.growth?.atmospheric_humidity ?? plantDetails.atmospheric_humidity;
		plantDetails.minimum_temperature =
			trefleData.growth?.minimum_temperature?.deg_c ?? plantDetails.minimum_temperature;
		plantDetails.maximum_temperature =
			trefleData.growth?.maximum_temperature?.deg_c ?? plantDetails.maximum_temperature;
		plantDetails.minimum_humidity = trefleData.growth?.soil_humidity
			? trefleData.growth.soil_humidity - 2
			: plantDetails.minimum_humidity;
		plantDetails.maximum_humidity = trefleData.growth?.soil_humidity
			? trefleData.growth.soil_humidity + 2
			: plantDetails.maximum_humidity;
	} else {
		const plantIdData = info as Suggestion;
		plantDetails.common_name = plantIdData.plant_name ?? plantDetails.common_name;
		plantDetails.scientific_name =
			plantIdData.plant_details?.scientific_name ?? plantDetails.scientific_name;
		plantDetails.edible_parts =
			plantIdData.plant_details?.edible_parts ?? plantDetails.edible_parts;
		plantDetails.minimum_humidity =
			plantIdData.plant_details?.watering?.min ?? plantDetails.minimum_humidity;
		plantDetails.maximum_humidity =
			plantIdData.plant_details?.watering?.max ?? plantDetails.maximum_humidity;
	}

	return plantDetails;
};
