export type Plant = {
	id: string;
	name: string | null;
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
	created_at: Date | null;
	history: History[] | null;
	current: Current | null;
};

export interface Current {
	light: number | null;
	soil_humidity: number | null;
	atmospheric_humidity: number | null;
	atmospheric_temperature: number | null;
	temperature: number | null;
}

export interface History extends Current {
	date: string | null;
	status: 'average' | 'good' | 'bad' | null;
	image: string | null;
}

export interface PlantContextType {
	plant: Plant;
	updatePlant: (plant: Plant) => void;
	updatePlantName: (name: string) => void;
	updatePlantCode: (code: string) => void;
	updatePlantCreatedAt: () => void;
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
