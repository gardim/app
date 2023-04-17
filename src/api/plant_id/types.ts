/* eslint-disable no-mixed-spaces-and-tabs */
interface Image {
	file_name: string;
	url: string;
}

interface Taxonomy {
	kingdom: string;
	phylum: string;
	class: string;
	order: string;
	family: string;
	genus: string;
}

interface WikiDescription {
	value: string;
	citation: string;
	license_name: string;
	license_url: string;
}

interface WikiImage {
	value: string;
	citation: string;
	license_name: string;
	license_url: string;
}

interface Watering {
	min: number;
	max: number;
}

interface PlantDetails {
	common_names: string[];
	name_authority: string;
	wiki_description: WikiDescription;
	taxonomy: Taxonomy;
	edible_parts:
		| (
				| 'bulb'
				| 'flowers'
				| 'frond'
				| 'fruit'
				| 'gum'
				| 'leaves'
				| 'lichen'
				| 'mushroom'
				| 'nectar'
				| 'nuts'
				| 'seaweed'
				| 'seeds'
				| 'shoots'
				| 'stems'
				| 'tubers'
		  )[]
		| null;
	gbif_id: string | null;
	propagation_methods:
		| ('cuttings' | 'division' | 'grafting' | 'seeds' | 'spores' | 'suckers')[]
		| null;
	watering: Watering;
	language: string;
	scientific_name: string;
	synonyms: string[] | null;
	url: string | null;
	wiki_image: WikiImage | null;
	structured_name: {
		genus: string;
		species: string;
	} | null;
}

interface SimilarImage {
	id: string;
	similarity: number;
	url: string;
	url_small: string;
	citation: string | null;
	license_name: string | null;
	license_url: string | null;
}

export interface Suggestion {
	id: number;
	plant_name: string;
	plant_details: PlantDetails;
	probability: number;
	confirmed: boolean;
	similar_images: SimilarImage[];
}

interface MetaData {
	latitude: null | number;
	longitude: null | number;
	date: string;
	datetime: string;
}

export interface PlantIDIdentificationResponse {
	id: number;
	custom_id: null | string;
	meta_data: MetaData;
	uploaded_datetime: number;
	finished_datetime: number;
	images: Image[] | null;
	suggestions: Suggestion[];
	modifiers: string[];
	secret: string;
	fail_cause: string | null;
	countable: boolean;
	feedback: string | null;
	is_plant_probability: number;
	is_plant: boolean;
}

export interface Disease {
	entity_id: number;
	name: string;
	probability: number;
	redundant: boolean | null;
	similar_images: SimilarImage[] | null;
	disease_details: DiseaseDetails;
}

export interface Treatment {
	biological: string[] | null;
	prevention: string[] | null;
	chemical: string[] | null;
}

export interface DiseaseDetails {
	local_name: string | null;
	description: string;
	treatment: Treatment | null;
	classification: string[];
	common_names: string[];
	cause: string | null;
	language: string | null;
	url: string | null;
}

export interface HealthAssessment {
	is_healthy_probability: number;
	is_healthy: boolean;
	diseases: Disease[];
}

export interface PlantIDHealthResponse {
	id: number;
	custom_id: null | string;
	meta_data: MetaData;
	uploaded_datetime: number;
	finished_datetime: number;
	images: Image[] | null;
	modifiers: string[];
	secret: string;
	fail_cause: string | null;
	countable: boolean;
	feedback: string | null;
	is_plant_probability: number;
	is_plant: boolean;
	health_assessment: HealthAssessment;
}
