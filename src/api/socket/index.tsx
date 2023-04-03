import React, { createContext, useEffect, useState, ReactNode, useMemo, useContext } from 'react';
import io from 'socket.io-client';
import Constants from 'expo-constants';
import { SocketPayload } from './types';
import uuid from 'react-native-uuid';
import { PlantContext } from '../../context';
import { Platform } from 'react-native';

type SocketResponse = {
	soilValue: number;
	luxValue: number;
	code: string;
};

export const SocketContext = createContext<SocketResponse>({
	soilValue: null,
	luxValue: null,
	code: null,
});

interface SocketProviderProps {
	children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
	const [soilValue, setSoilValue] = useState<number>(null);
	const [luxValue, setLuxValue] = useState<number>(null);
	const [code, setCode] = useState<string>(null);
	const { socketUrl } = Constants.manifest.extra;
	const plantContext = useContext(PlantContext);

	const userId = uuid.v4();

	const socket = io(socketUrl, {
		transports: ['websocket'],
		query: {
			userId: userId,
		},
		secure: Platform.OS === 'web',
	});

	useEffect(() => {
		socket.on('connect', () => {
			console.log('Connected to server');
		});

		socket.on('disconnect', () => {
			console.log('Disconnected from server');
		});

		if (plantContext.plant?.code) {
			console.log(plantContext.plant.code);
			setCode(plantContext.plant.code);
			socket.on(`gardim/esp32/${plantContext.plant.code}/soil`, (data: string) => {
				console.log(data);
				const parsedData: SocketPayload = JSON.parse(data);
				setSoilValue(Number(parsedData.parsed.toFixed(2)));
			});

			socket.on(`gardim/esp32/${plantContext.plant.code}/lux`, (data: string) => {
				console.log(data);
				const parsedData: SocketPayload = JSON.parse(data);
				setLuxValue(parsedData.parsed);
			});
		}

		socket.on('error', (error: unknown) => {
			console.log('Socket error:', error);
		});

		return () => {
			socket.disconnect();
		};
	}, [plantContext.plant?.code]);

	const contextValue = useMemo(() => {
		return {
			soilValue,
			luxValue,
			code,
		};
	}, [soilValue, luxValue]);

	return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
};
