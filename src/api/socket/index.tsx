import React, { createContext, useEffect, useState, ReactNode, useMemo, useContext } from 'react';
import io from 'socket.io-client';
import Constants from 'expo-constants';
import { SocketPayload } from './types';
import uuid from 'react-native-uuid';
import { PlantContext } from '../../context';
import {
	updateLuxCurrentMetricsFromSocket,
	updateSoilCurrentMetricsFromSocket,
} from '../../utils/currentMetrics';

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
	const { socketUrl, enableSocket } = Constants.manifest.extra;
	const plantContext = useContext(PlantContext);
	let soilTicker = 0;
	let luxTicker = 0;

	const userId = uuid.v4();

	const socket =
		enableSocket != 'false'
			? io(socketUrl, { transports: ['websocket'], query: { userId: userId } })
			: null;

	useEffect(() => {
		if (enableSocket != 'false') {
			socket.on('connect', () => {
				console.log('Connected to server');
			});

			socket.on('disconnect', () => {
				console.log('Disconnected from server');
			});

			socket.on('error', (error: unknown) => {
				console.log('Socket error:', error);
			});

			const codeExists = plantContext.plant?.code !== undefined;

			if (!codeExists)
				return () => {
					socket.disconnect();
				};

			console.log(plantContext.plant.code);

			setCode(plantContext.plant.code);

			socket.on(`gardim/esp32/${plantContext.plant.code}/soil`, async (data: SocketPayload) => {
				const parsedData = data;
				setSoilValue(Number(parsedData.parsed.toFixed(2)));

				if (soilTicker >= 60) {
					soilTicker = 0;
					await updateSoilCurrentMetricsFromSocket(plantContext.plant.id, data.parsed);
				} else {
					console.log('SOIL update skipped...');
				}

				soilTicker++;
			});

			socket.on(`gardim/esp32/${plantContext.plant.code}/lux`, async (data: SocketPayload) => {
				const parsedData = data;
				setLuxValue(parsedData.parsed);

				if (luxTicker >= 1) {
					luxTicker = 0;
					await updateLuxCurrentMetricsFromSocket(plantContext.plant.id, data.parsed);
				} else {
					console.log('LUX update skipped...');
				}

				luxTicker++;
			});

			return () => {
				socket.disconnect();
			};
		}
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
