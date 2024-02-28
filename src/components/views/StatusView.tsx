import * as React from 'react';

import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import { LinearGaugeChart } from '@components/elements/LinearGaugeChart';
import { i18n } from '@lang/index';
import { StatsRange } from 'src/@types';

const StatusView = () => {
	const router = useRouter();

	return (
		<View style={{ justifyContent: 'space-around', marginHorizontal: 20, alignItems: 'center' }}>
			<StatusCard
				title={i18n.t('stats.humidity.soil')}
				icon={'water-alert-outline'}
				stats={{
					min: 2,
					max: 4,
					tolerance: 1,
				}}
				value={3}
			/>
			<StatusCard
				title={i18n.t('stats.luminosity')}
				icon={'lightbulb-on-outline'}
				stats={{
					min: 2,
					max: 4,
					tolerance: 1,
				}}
				value={3}
			/>
			<StatusCard
				title={i18n.t('stats.temperature')}
				icon={'sun-thermometer-outline'}
				stats={{
					min: 2,
					max: 4,
					tolerance: 1,
				}}
				value={3}
			/>
		</View>
	);
};

type StatusCardProps = {
	title: string;
	icon: string;
	stats: StatsRange;
	value: number;
};

const StatusCard = ({ title, icon, stats, value }: StatusCardProps) => {
	return (
		<Card style={{ marginVertical: 10 }}>
			<Card.Title title={title} left={(props) => <Avatar.Icon {...props} icon={icon} />} />
			<Card.Content
				style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
				<LinearGaugeChart
					min={stats.min}
					max={stats.max}
					tolerance={stats.tolerance}
					value={value}
				/>
				<Text>{value * 10}%</Text>
			</Card.Content>
		</Card>
	);
};

export default StatusView;
