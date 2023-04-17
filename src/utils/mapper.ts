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
		created_at: null,
		history: [],
		current: null,
	};

	if (isTrefle) {
		const trefleData = (info as TrefleSpeciesResponse).data;
		plantDetails.id = uuid.v4().toString();
		plantDetails.common_name = trefleData.common_name ?? plantDetails.common_name;
		plantDetails.scientific_name = trefleData.scientific_name ?? plantDetails.scientific_name;
		plantDetails.edible_parts = trefleData.edible_part ?? plantDetails.edible_parts;
		plantDetails.ph_maximum = trefleData.growth?.ph_maximum ?? plantDetails.ph_maximum;
		plantDetails.ph_minimum = trefleData.growth?.ph_minimum ?? plantDetails.ph_minimum;

		const trefleLight = trefleData.growth?.light;

		if (trefleLight) {
			const min = trefleLight * 100000 - 20000;
			const max = trefleLight * 100000 + 20000;

			plantDetails.light_minimum = min < 0 ? 0 : min;
			plantDetails.light_maximum = max > 100000 ? 100000 : max;
		}

		const trefleAtmosphericHumidity = trefleData.growth?.atmospheric_humidity;

		if (trefleAtmosphericHumidity) {
			const min = trefleAtmosphericHumidity * 100 - 20;
			const max = trefleAtmosphericHumidity * 100 + 20;

			plantDetails.atmospheric_humidity_minimum = min < 0 ? 0 : min;
			plantDetails.atmospheric_humidity_maximum = max > 100 ? 100 : max;
		}

		plantDetails.temperature_minimum =
			trefleData.growth?.minimum_temperature?.deg_c ?? plantDetails.temperature_minimum;

		plantDetails.temperature_maximum =
			trefleData.growth?.maximum_temperature?.deg_c ?? plantDetails.temperature_maximum;

		const trefleSoilHumidity = trefleData.growth?.soil_humidity;

		if (trefleSoilHumidity) {
			plantDetails.soil_humidity_minimum = trefleSoilHumidity * 100 - 20;
			plantDetails.soil_humidity_maximum = trefleSoilHumidity * 100 + 20;
		}
	} else {
		const plantIdData = info as Suggestion;
		plantDetails.common_name = plantIdData.plant_name ?? plantDetails.common_name;
		plantDetails.scientific_name =
			plantIdData.plant_details?.scientific_name ?? plantDetails.scientific_name;
		plantDetails.edible_parts =
			plantIdData.plant_details?.edible_parts ?? plantDetails.edible_parts;

		if (plantIdData.plant_details?.watering?.min && plantIdData.plant_details?.watering?.max) {
			plantDetails.soil_humidity_minimum = convertScale(
				plantIdData.plant_details?.watering?.min
			);
			plantDetails.soil_humidity_maximum = convertScale(
				plantIdData.plant_details?.watering?.max
			);
		}
	}

	return plantDetails;
};
