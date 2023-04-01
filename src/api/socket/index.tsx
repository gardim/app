import React, { createContext, useEffect, useState, ReactNode, useMemo } from 'react';
import io from 'socket.io-client';
import Constants from 'expo-constants';

type SocketResponse = {
	soilValue: number;
	luxValue: number;
};

export const SocketContext = createContext<SocketResponse>({ soilValue: null, luxValue: null });

interface SocketProviderProps {
	children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
	const [soilValue, setSoilValue] = useState<number>(null);
	const [luxValue, setLuxValue] = useState<number>(null);
	const { socketUrl } = Constants.manifest.extra;

	const clientId = `${Math.random().toString(16).slice(3)}`;

	const socket = io(socketUrl, {
		transports: ['websocket'],
		query: {
			userId: clientId,
		},
	});

	useEffect(() => {
		socket.on('connect', () => {
			console.log('Connected to server');
		});

		socket.on('disconnect', () => {
			console.log('Disconnected from server');
		});

		socket.on('gardim/esp32/000000/soil', (data: number) => {
			setSoilValue(data);
		});

		socket.on('gardim/esp32/000000/lux', (data: number) => {
			setLuxValue(data);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	const contextValue = useMemo(() => {
		return {
			soilValue,
			luxValue,
		};
	}, [soilValue, luxValue]);

	return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
};
