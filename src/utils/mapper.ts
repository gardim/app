import { TrefleSpeciesResponse } from '../api/trefle/types';
import { Suggestion } from '../api/plant_id/types';
import { Plant } from '../types/index';

export const mapToPlant = (info: TrefleSpeciesResponse | Suggestion): Plant => {
	const isTrefle = (info as Suggestion).plant_name ? false : true;

	if (isTrefle) {
		const trefleData = (info as TrefleSpeciesResponse).data;
		return {
			name: null,
			code: null,
			common_name: trefleData.common_name,
			scientific_name: trefleData.scientific_name,
			edible_parts: trefleData.edible_part,
			ph_maximum: trefleData.growth.ph_maximum ? trefleData.growth.ph_maximum : 5,
			ph_minimum: trefleData.growth.ph_minimum ? trefleData.growth.ph_minimum : 4,
			light: trefleData.growth.light ? trefleData.growth.light : 6,
			atmospheric_humidity: trefleData.growth.atmospheric_humidity
				? trefleData.growth.atmospheric_humidity
				: 5,
			minimum_temperature: trefleData.growth.minimum_temperature.deg_c
				? trefleData.growth.minimum_temperature.deg_c
				: 15,
			maximum_temperature: trefleData.growth.maximum_temperature.deg_c
				? trefleData.growth.maximum_temperature.deg_c
				: 27,
			minimum_humidity: trefleData.growth.soil_humidity
				? trefleData.growth.soil_humidity - 2
				: 5,
			maximum_humidity: trefleData.growth.soil_humidity
				? trefleData.growth.soil_humidity + 2
				: 8,
		};
	}

	const plantIdData = info as Suggestion;
	return {
		name: null,
		code: null,
		common_name: plantIdData.plant_name,
		scientific_name: plantIdData.plant_details.scientific_name,
		edible_parts: plantIdData.plant_details.edible_parts,
		ph_maximum: 5,
		ph_minimum: 4,
		light: 6,
		atmospheric_humidity: 5,
		minimum_temperature: 15,
		maximum_temperature: 27,
		minimum_humidity: plantIdData.plant_details.watering.min,
		maximum_humidity: plantIdData.plant_details.watering.max,
	};
};
