import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { Client, Message } from 'react-native-paho-mqtt';

type MQTTResponse = {
	soilValue: string;
	luxValue: string;
};

const myStorage = {
	setItem: (key, item) => {
		myStorage[key] = item;
	},
	getItem: (key) => myStorage[key],
	removeItem: (key) => {
		delete myStorage[key];
	},
};

export const MQTTContext = createContext<MQTTResponse>(null);

interface MQTTProviderProps {
	children: ReactNode;
}

const MQTTProvider = ({ children }: MQTTProviderProps) => {
	const [soilValue, setSoilValue] = useState<string | null>(null);
	const [luxValue, setLuxValue] = useState<string | null>(null);

	const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

	useEffect(() => {
		const client = new Client({
			uri: 'ws://broker.hivemq.com:8000/mqtt',
			clientId: clientId,
			storage: myStorage,
		});

		client.on('messageReceived', (message: Message) => {
			const value = message.payloadString;
			if (message.destinationName === 'gardim/esp32/000000/soil') {
				setSoilValue(value);
			} else if (message.destinationName === 'gardim/esp32/000000/lux') {
				setLuxValue(value);
			}

			console.log(value);
		});

		client.connect({ useSSL: false }).then(() => {
			console.log('connected');
			client.subscribe('gardim/esp32/000000/soil');
			client.subscribe('gardim/esp32/000000/lux');
		});

		return () => {
			console.log('disconnect');
			client.disconnect();
		};
	}, []);

	const contextValue = {
		soilValue: soilValue,
		luxValue: luxValue,
	};

	return <MQTTContext.Provider value={contextValue}>{children}</MQTTContext.Provider>;
};

export default MQTTProvider;
