import { createContext, useEffect, useState, ReactNode, useMemo, useContext } from 'react';
import * as React from 'react';
import io from 'socket.io-client';
import Constants from 'expo-constants';
import { SocketPayload } from './types';
import { PlantContext } from '../../context';

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
	const { socketUrl, enableSocket } = Constants;
	const plantContext = useContext(PlantContext);

	const userId = '1';

	const socket =
		enableSocket != 'false'
			? io(socketUrl, { transports: ['websocket'], query: { userId: userId } })
			: null;

	useEffect(() => {
		console.log(enableSocket);
		console.log(enableSocket != 'false');
		if (enableSocket != 'false') {
			socket.on('connect', () => {
				console.log('Connected to server');
			});

			socket.on('disconnect', () => {
				console.log('Disconnected from server');
			});

			if (plantContext.plant?.code) {
				console.log(plantContext.plant.code);
				setCode(plantContext.plant.code);
				socket.on(`gardim/esp32/${plantContext.plant.code}/soil`, (data: SocketPayload) => {
					console.log(data);
					const parsedData = data;
					setSoilValue(Number(parsedData.parsed.toFixed(2)));
				});

				socket.on(`gardim/esp32/${plantContext.plant.code}/lux`, (data: SocketPayload) => {
					console.log(data);
					const parsedData = data;
					setLuxValue(parsedData.parsed);
				});
			}

			socket.on('error', (error: unknown) => {
				console.log('Socket error:', error);
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
