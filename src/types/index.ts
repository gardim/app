export type Plant = {
	id: string;
	name: string;
	code: string | null;
	common_name: string;
	scientific_name: string;
	edible_parts: string[] | null;
	ph_maximum: number | null;
	ph_minimum: number | null;
	light_minimum: number | null;
	light_maximum: number | null;
	atmospheric_humidity_minimum: number | null;
	atmospheric_humidity_maximum: number | null;
	temperature_minimum: number | null;
	temperature_maximum: number | null;
	soil_humidity_minimum: number | null;
	soil_humidity_maximum: number | null;
};

export interface PlantContextType {
	plant: Plant;
	updatePlant: (plant: Plant) => void;
	updatePlantName: (name: string) => void;
	updatePlantCode: (code: string) => void;
	resetPlant: () => void;
}

export type ImageType = {
	id: string;
	uri: string;
};

export type Range = {
	min: number;
	max: number;
};

export type User = {
	name: string;
	picture: string;
	email: string;
	verifiedEmail: boolean;
};
