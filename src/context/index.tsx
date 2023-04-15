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

	const updatePlantCode = (code: string) => {
		setPlant({
			...plant,
			code: code,
		});
	};

	const updatePlantCreatedAt = () => {
		setPlant({
			...plant,
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
			updatePlantCode,
			resetPlant,
			updatePlantCreatedAt,
		};
	}, [plant, updatePlant, updatePlantName, updatePlantCode, resetPlant]);

	return <PlantContext.Provider value={contextValue}>{children}</PlantContext.Provider>;
};
