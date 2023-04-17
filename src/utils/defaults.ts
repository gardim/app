import { Range } from '../types';

export const PH_MINIMUM = 4;
export const PH_MAXIMUM = 5;

export const LIGHT_MINIMUM = 1000;
export const LIGHT_MAXIMUM = 10000;

export const ATMOSPHERIC_HUMIDITY_MINIMUM = 40;
export const ATMOSPHERIC_HUMIDITY_MAXIMUM = 70;

export const TEMPERATURE_MINIMUM = 15;
export const TEMPERATURE_MAXIMUM = 27;

export const SOIL_HUMIDITY_MINIMUM = 40;
export const SOIL_HUMIDITY_MAXIMUM = 60;

export const CELL_COUNT = 6;

export const PERCENTAGE: Range = {
	min: 0,
	max: 100,
};

export const LUX: Range = {
	min: 0,
	max: 100000,
};

export const TEMPERATURE: Range = {
	min: -60,
	max: 60,
};
