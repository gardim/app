import React, { createContext, useState, useMemo, ReactNode } from 'react';
import { Plant, PlantContextType } from '../types';

export const PlantContext = createContext<PlantContextType | null>(null);

interface PlantProviderProps {
	children: ReactNode;
}

export const PlantProvider = ({ children }: PlantProviderProps) => {
	const [plant, setPlant] = useState<Plant>(null);

	const updatePlant = (plant: Plant) => {
		setPlant(plant);
	};

	const updatePlantName = (name: string) => {
		setPlant({
			...plant,
			name: name,
		});
	};

	const updatePlantCodeAndCreatedAt = (code: string) => {
		setPlant({
			...plant,
			code: code,
			created_at: new Date(),
		});
	};

	const resetPlant = () => {
		setPlant(null);
	};

	const contextValue = useMemo(() => {
		return {
			plant,
			updatePlant,
			updatePlantName,
			updatePlantCodeAndCreatedAt,
			resetPlant,
		};
	}, [plant, updatePlant, updatePlantName, updatePlantCodeAndCreatedAt, resetPlant]);

	return <PlantContext.Provider value={contextValue}>{children}</PlantContext.Provider>;
};
