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
	links: {
		genus: string;
		self: string;
		species: string;
	};
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

type Data = {
	id: number;
	common_name: string;
	slug: string;
	scientific_name: string;
	year: number;
	bibliography: string;
	author: string;
	status: string;
	rank: string;
	family_common_name: string;
	genus_id: number;
	observations: string;
	vegetable: boolean;
	image_url: string;
	genus: string;
	family: string;
	duration: null | string;
	edible_part: null | string;
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
};

export type TrefleSpeciesResponse = {
	data: Data;
};
