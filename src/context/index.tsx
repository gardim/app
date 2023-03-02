import React, { createContext, useState } from 'react';
import { Plant, PlantContextType } from '../types/index';

export const PlantContext = createContext<PlantContextType | null>(null);

// eslint-disable-next-line react/prop-types
export const PlantProvider = ({ children }) => {
	const [plant, setPlant] = useState(null);

	const updatePlant = (plant: Plant) => {
		setPlant(plant);
	};

	const updatePlantName = (name: string) => {
		setPlant({
			...plant,
			name: name,
		});
	};

	const contextValue: PlantContextType = { plant, updatePlant, updatePlantName };

	return <PlantContext.Provider value={contextValue}>{children}</PlantContext.Provider>;
};
