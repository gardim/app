import { HealthAssessment } from '../api/plant_id/types';
import { Status } from '../utils/status';

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
	current: CurrentMetrics | null;
};

export interface CurrentMetrics {
	light?: number | null;
	soil_humidity?: number | null;
	atmospheric_humidity?: number | null;
	atmospheric_temperature?: number | null;
	temperature?: number | null;
	health_assessment?: HealthAssessment;
	health_assessment_date?: Date | null;
}

export interface ProbableDiseases {
	name: string;
	probability: number;
}

export interface AssessmentResults {
	is_healthy: boolean;
	probable_diseases?: ProbableDiseases[] | null;
}

export interface History {
	light?: number | null;
	soil_humidity?: number | null;
	atmospheric_humidity?: number | null;
	atmospheric_temperature?: number | null;
	temperature?: number | null;
	date: string | null;
	status?: Status;
	assessment_results?: AssessmentResults;
}

export interface PlantContextType {
	plant: Plant;
	updatePlant: (plant: Plant) => void;
	updatePlantName: (name: string) => void;
	updatePlantCodeAndCreatedAt: (code: string) => void;
	resetPlant: () => void;
}

export type ImageType = {
	id?: string;
	uri?: string;
	base64: string;
};

export type Range = {
	min: number;
	max: number;
};
