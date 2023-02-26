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
// eslint-disable-next-line no-mixed-spaces-and-tabs
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

interface Suggestion {
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

export interface PlantIDResponse {
	id: number;
	custom_id: null | string;
	meta_data: MetaData;
	uploaded_datetime: number;
	finished_datetime: number;
	images: Image[];
	suggestions: Suggestion[];
	modifiers: string[];
	secret: string;
	fail_cause: string | null;
	countable: boolean,
	feedback: string | null;
	is_plant_probability: number;
	is_plant: boolean
}
