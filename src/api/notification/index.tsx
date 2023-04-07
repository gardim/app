import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as Notifications from 'expo-notifications';
import { NotificationContentInput, TimeIntervalTriggerInput } from 'expo-notifications';
import { getAllKeys, getMultiple } from '../../storage';
import { Plant } from '../../types';
import { rangeToSeconds } from '../../utils';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

type NotificationResponse = {
	scheduleWateringNotifications: () => void;
	cancelNotifications: () => void;
	notificationStatus: boolean;
	hasScheduledNotifications: boolean;
	toggleNotifications;
};

export const NotificationsContext = createContext<NotificationResponse>({
	scheduleWateringNotifications: null,
	cancelNotifications: null,
	notificationStatus: null,
	hasScheduledNotifications: null,
	toggleNotifications: null,
});

interface NotificationProviderProps {
	children: ReactNode;
}

export function NotificationsProvider({ children }: NotificationProviderProps) {
	const [notificationStatus, setNotificationStatus] = useState(false);
	const [hasScheduledNotifications, setHasScheduledNotifications] = useState(false);
	const [plants, setPlants] = useState([]);

	useEffect(() => {
		const loadPlants = async () => {
			const keys = await getAllKeys();
			const result = await getMultiple(keys);
			setPlants(result);
		};

		loadPlants();
		getNotificationPermissions();
		checkScheduledNotifications();
	}, []);

	async function getNotificationPermissions() {
		if (Device.isDevice) {
			const { status: existingStatus } = await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				console.log('Failed to get push token for push notification!');
				return;
			}
			setNotificationStatus(true);
		} else {
			console.log('Must use physical device for Push Notifications');
		}

		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		}
	}

	async function checkScheduledNotifications() {
		if (notificationStatus) {
			const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
			setHasScheduledNotifications(scheduledNotifications.length > 0);
		}
	}

	const scheduleWateringNotifications = async () => {
		if (notificationStatus) {
			plants.map((it: [string, string]) => {
				const plant = JSON.parse(it[1]) as Plant;
				const content: NotificationContentInput = {
					title: `${plant.name} está precisando de sua atenção!`,
					body: 'Dê água à sua plantinha!',
					sound: true,
				};

				const trigger: TimeIntervalTriggerInput = {
					seconds: rangeToSeconds(plant.soil_humidity_minimum),
					repeats: true,
				};
				Notifications.scheduleNotificationAsync({ content, trigger });
			});
			setHasScheduledNotifications(true);
		}
	};

	const toggleNotifications = async () => {
		if (!hasScheduledNotifications) {
			scheduleWateringNotifications();
		} else {
			cancelNotifications();
		}
	};

	const cancelNotifications = () => {
		if (notificationStatus) {
			Notifications.cancelAllScheduledNotificationsAsync();
			setHasScheduledNotifications(false);
		}
	};

	return (
		<NotificationsContext.Provider
			value={{
				scheduleWateringNotifications,
				cancelNotifications,
				notificationStatus,
				hasScheduledNotifications,
				toggleNotifications,
			}}>
			{children}
		</NotificationsContext.Provider>
	);
}

export function useNotifications() {
	const context = useContext(NotificationsContext);
	if (!context) {
		throw new Error('useNotifications must be used within a NotificationsProvider');
	}
	return context;
}
