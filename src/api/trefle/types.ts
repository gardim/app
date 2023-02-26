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

export interface TrefleResponse {
	data: Plant[];
	links: PlantLinks;
	meta: {
		total: number;
	};
}
