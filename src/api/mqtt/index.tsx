import React, { createContext, useEffect, useState, ReactNode, useMemo } from 'react';
import { Client, Message } from 'react-native-paho-mqtt';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

type MQTTResponse = {
	soilValue: number;
	luxValue: number;
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

export const MQTTProvider = ({ children }: MQTTProviderProps) => {
	const [soilValue, setSoilValue] = useState<string | null>(null);
	const [luxValue, setLuxValue] = useState<string | null>(null);
	const { mqttUrl } = Constants.manifest.extra;

	let { mqttPort } = Constants.manifest.extra;

	let isSSL = false;

	const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

	if (Platform.OS === 'web') {
		mqttPort = 8081;
		isSSL = true;
	}

	useEffect(() => {
		const client = new Client({
			uri: `${mqttUrl}:${mqttPort}/mqtt`,
			clientId: clientId,
			storage: myStorage,
		});

		client
			.connect({ useSSL: isSSL })
			.then(() => {
				console.log('connected');
				client.subscribe('gardim/esp32/000000/soil');
				client.subscribe('gardim/esp32/000000/lux');
			})
			.catch((responseObject) => {
				if (responseObject.errorCode !== 0) {
					console.log('onConnectionLost:' + responseObject);
				}
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

		return () => {
			console.log('disconnect');
			client.disconnect();
		};
	}, []);

	const contextValue = useMemo(() => {
		return {
			soilValue: parseInt(soilValue),
			luxValue: parseInt(luxValue),
		};
	}, [soilValue, luxValue]);

	return <MQTTContext.Provider value={contextValue}>{children}</MQTTContext.Provider>;
};
