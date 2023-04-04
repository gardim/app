import React, { createContext, useState, useEffect, ReactNode, useMemo } from 'react';
import * as Location from 'expo-location';

type Location = {
	latitude: string;
	longitude: string;
	granted: boolean;
};

export const LocationContext = createContext<Location>({
	latitude: null,
	longitude: null,
	granted: false,
});

interface LocationProviderProps {
	children: ReactNode;
}

const LocationProvider = ({ children }: LocationProviderProps) => {
	const [location, setLocation] = useState(null);
	const [granted, setGranted] = useState(null);

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				console.log('Permission to access location was denied');
				return;
			}
			setGranted(true);
			const location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	const latitude = location?.coords?.latitude;
	const longitude = location?.coords?.longitude;

	const contextValue = useMemo(() => {
		return { latitude: latitude, longitude: longitude, granted: granted };
	}, [location]);

	return <LocationContext.Provider value={contextValue}>{children}</LocationContext.Provider>;
};

export default LocationProvider;
