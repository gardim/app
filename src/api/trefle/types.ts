interface PlantLinks {
	first: string;
	last: string;
	self: string;
}

interface Plant {
	author: string;
	bibliography: string;
	common_name: string;
	complete_data: boolean;
	family_common_name: string;
	genus_id: number;
	id: number;
	image_url: string | null;
	links: Links;
	main_species_id: number;
	observations: string;
	scientific_name: string;
	slug: string;
	vegetable: boolean;
	year: number;
}

export interface TreflePlantSearchResponse {
	data: Plant[];
	links: PlantLinks;
	meta: {
		total: number;
	};
}

type Image = {
	id: number;
	image_url: string;
	copyright: string;
};

type CommonNames = {
	[key: string]: string[];
};

type Images = {
	[key: string]: Image[];
};

type Source = {
	last_update: string | null;
	id: string | null;
	name: string | null;
	url: string | null;
	citation: string | null;
};

type Synonym = {
	id: number | null;
	name: string | null;
	author: string | null;
	sources: Source[] | null;
};

type Links = {
	self: string | null;
	plant: string | null;
	genus: string | null;
};

type Cm = {
	cm: number | null;
};

type Mm = {
	mm: number | null;
};

type Temperature = {
	deg_f: number | null;
	deg_c: number | null;
};

type Growth = {
	description: string | null;
	sowing: string | null;
	days_to_harvest: number | null;
	row_spacing: Cm | null;
	spread: Cm | null;
	ph_maximum: number | null;
	ph_minimum: number | null;
	light: number | null;
	atmospheric_humidity: number | null; // 0 to 10
	growth_months: string[] | null;
	bloom_months: string[] | null;
	fruit_months: string[] | null;
	minimum_precipitation: Mm | null;
	maximum_precipitation: Mm | null;
	minimum_root_depth: Cm | null;
	minimum_temperature: Temperature | null;
	maximum_temperature: Temperature | null;
	soil_nutriments: number | null; // 0 to 10
	soil_salinity: number | null; // 0 to 10
	soil_texture: number | null; // 0 to 10
	soil_humidity: number | null; // 0 to 10
};

type Specifications = {
	ligneous_type: ('liana' | 'subshrub' | 'shrub' | 'tree' | 'parasite') | null;
	growth_form: string | null;
	growth_habit: string | null;
	growth_rate: string | null;
	average_height: Cm | null;
	maximum_height: Cm | null;
	nitrogen_fixation: string | null;
	shape_and_orientation: string | null;
	toxicity: ('none' | 'low' | 'medium' | 'high') | null;
};

type FruitOrSeed = {
	conspicuous: boolean | null;
	color: string[] | null;
	shape: string | null;
	seed_persistence: boolean | null;
};

type Foliage = {
	texture: ('fine' | 'medium' | 'coarse') | null;
	color: string[] | null;
	leaf_retention: boolean | null;
};

type Flower = {
	color: string[] | null;
	conspicuous: boolean | null;
};

type Distribution = {
	native: Native[] | null;
	introduced: [] | null;
};

type Native = {
	id: number | null;
	name: string | null;
	slug: string | null;
	tdwg_code: string | null;
	tdwg_level: number | null;
	species_count: number | null;
	links: Links | null;
};

type Distributions = {
	native: Native[] | null;
	introduced: [] | null;
	doubtful: [] | null;
	absent: [] | null;
	extinct: [] | null;
};

type Data = {
	id: number;
	common_name: string;
	slug: string;
	scientific_name: string;
	year: number;
	bibliography: string;
	author: string;
	status: string;
	rank: 'species' | 'ssp' | 'var' | 'form' | 'hybrid' | 'subvar';
	family_common_name: string;
	genus_id: number;
	observations: string;
	vegetable: boolean;
	image_url: string;
	genus: string;
	family: string;
	duration: null | string[];
	edible_part: null | string[];
	edible: boolean;
	images: {
		flower: Images['flower'];
		leaf: Images['leaf'];
		habit: Images['habit'];
		fruit: Images['fruit'];
		bark: Images['bark'];
		other: Images['other'];
	};
	common_names: CommonNames;
	distribution: Distribution;
	distributions: Distributions;
	flower: Flower;
	foliage: Foliage;
	fruit_or_seed: FruitOrSeed;
	specifications: Specifications;
	growth: Growth;
	links: Links;
	synonyms: Synonym[];
	sources: Source[];
};

type Meta = {
	images_count: number;
	sources_count: number;
	synonyms_count: number;
	last_modified: string;
};

export type TrefleSpeciesResponse = {
	data: Data;
	meta: Meta;
};
