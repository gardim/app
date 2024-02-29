import { Device, Item, Plant } from 'src/@types';

export const sortItemsByTitle = (items: Item[], sort: 'asc' | 'desc'): Item[] => {
	const sorted = [...items].sort((a, b) => {
		if (sort === 'asc') {
			return a.title.localeCompare(b.title);
		} else {
			return b.title.localeCompare(a.title);
		}
	});

	return sorted;
};

export const mapPlantToItem = (plant: Plant): Item => {
	return {
		id: plant.id,
		image: plant.image || '',
		title: plant.name,
		subtitle: plant.scientific_name,
	};
};

export const mapDeviceToItem = (device: Device): Item => {
	return {
		id: device.id.toString(),
		image: '',
		title: device.code.toString(),
		subtitle: device.id.toString(),
	};
};
