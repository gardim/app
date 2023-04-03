import React, { createContext, useEffect, useState, ReactNode, useMemo } from 'react';
import io from 'socket.io-client';
import Constants from 'expo-constants';
import { SocketPayload } from './types';
import uuid from 'react-native-uuid';

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

	const userId = uuid.v4();

	const socket = io(socketUrl, {
		transports: ['websocket'],
		query: {
			userId: userId,
		},
	});

	useEffect(() => {
		socket.on('connect', () => {
			console.log('Connected to server');
		});

		socket.on('disconnect', () => {
			console.log('Disconnected from server');
		});

		socket.on('gardim/esp32/000000/soil', (data: string) => {
			console.log(data);
			const parsedData: SocketPayload = JSON.parse(data);
			setSoilValue(Number(parsedData.parsed.toFixed(2)));
		});

		socket.on('gardim/esp32/000000/lux', (data: string) => {
			console.log(data);
			const parsedData: SocketPayload = JSON.parse(data);
			setLuxValue(parsedData.parsed);
		});

		socket.on('error', (error: unknown) => {
			console.log('Socket error:', error);
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
