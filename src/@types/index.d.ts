export type Plant = {
	id: string;
	name: string;
	scientific_name: string;
	common_name: string;
	image: string | null;
	light: StatsRange;
	humidity: {
		atmospheric: StatsRange;
		soil: StatsRange;
	};
	temperature: {
		atmospheric: StatsRange;
		local: StatsRange;
	};
};

export type Item = {
	id?: string;
	image: string | null;
	title: string;
	subtitle: string;
};

export type StatsRange = {
	max: number | null;
	min: number | null;
	tolerance: number | null;
};
export type PlantStats = {
	humidity: {
		soil: number | null;
		atmospheric: number | null;
	};
	luminosity: Double?;
	temperature: Double?;
};

export type Device = {
	id: string;
	code: string;
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
