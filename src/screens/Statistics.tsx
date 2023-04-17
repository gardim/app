import React, { useContext, useState, useMemo, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MarkedDates, DateData } from 'react-native-calendars/src/types';
import { Positions } from 'react-native-calendars/src/expandableCalendar';
import { PreferencesContext } from '../components/PreferencesContext';
import { Dialog, Portal, Text, Button, HelperText, Card } from 'react-native-paper';
import { PlantContext } from '../context';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../utils/theme';
import { statusToColor } from '../utils/status';
import { History } from '../types';

export default function Statistics() {
	const [overviewVisible, setOverviewVisible] = useState(false);
	const { isThemeDark } = useContext(PreferencesContext);
	const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
	const [themeId, setThemeId] = useState(isThemeDark ? 'dark' : 'light');
	const [currentHistory, setCurrentHistory] = useState<History>(null);

	useEffect(() => {
		setThemeId(isThemeDark ? 'dark' : 'light');
	}, [isThemeDark]);

	const calendarKey = isThemeDark ? 'dark' : 'light';

	const plantContext = useContext(PlantContext);

	const marked = useMemo(() => {
		const markers: MarkedDates = {};
		const history = plantContext.plant.history;
		history?.forEach((item) => {
			markers[item.date] = {
				selected: true,
				marked: false,
				customStyles: {
					container: {
						backgroundColor: statusToColor(item.status),
					},
				},
			};
		});
		return markers;
	}, [plantContext.plant.history]);

	const showOverviewDialog = (date: DateData) => {
		const history = plantContext.plant.history;
		const matchingHistory = history.find((history) => history.date === date.dateString);
		if (matchingHistory) {
			setCurrentHistory(matchingHistory);
			setOverviewVisible(true);
		}
	};
	const hideOverviewDialog = () => setOverviewVisible(false);

	const handleOnFinish = async () => hideOverviewDialog();

	return (
		<SafeAreaView style={styles.container}>
			<Portal>
				<Dialog visible={overviewVisible} onDismiss={hideOverviewDialog}>
					<Dialog.Title style={styles.title}>Resumo</Dialog.Title>
					<Text style={styles.subtitle}>{currentHistory?.date}</Text>
					<Dialog.ScrollArea>
						<ScrollView>
							{currentHistory?.atmospheric_humidity && (
								<OverviewCard
									title="Umidade do Ambiente"
									unit="%"
									value={currentHistory.atmospheric_humidity}
									min={plantContext.plant.atmospheric_humidity_minimum}
									max={plantContext.plant.atmospheric_humidity_maximum}
								/>
							)}
							{currentHistory?.light && (
								<OverviewCard
									title="Luminosidade"
									unit="lux"
									value={currentHistory.light}
									min={plantContext.plant.light_minimum}
									max={plantContext.plant.light_maximum}
								/>
							)}
							{currentHistory?.soil_humidity && (
								<OverviewCard
									title="Umidade do Solo"
									unit="%"
									value={currentHistory.soil_humidity.toFixed(2)}
									min={plantContext.plant.soil_humidity_minimum}
									max={plantContext.plant.soil_humidity_maximum}
								/>
							)}
							{currentHistory?.atmospheric_temperature && (
								<OverviewCard
									title="Temperatura do Ambiente"
									unit="°C"
									value={currentHistory.atmospheric_temperature}
									min={plantContext.plant.temperature_minimum}
									max={plantContext.plant.temperature_maximum}
								/>
							)}
						</ScrollView>
					</Dialog.ScrollArea>
					<Dialog.Actions style={{ justifyContent: 'center' }}>
						<Button onPress={handleOnFinish}>Ok</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>

			<HelperText type="info" visible style={{ textAlign: 'center' }}>
				Pressione nas datas para obter um resumo do que aconteceu no dia indicado!
			</HelperText>

			<View key={calendarKey} style={{ backgroundColor: theme.colors.background, flex: 1 }}>
				<Calendar
					theme={{
						backgroundColor: theme.colors.background,
						calendarBackground: theme.colors.background,
						textSectionTitleColor: theme.colors.onBackground,
						selectedDayBackgroundColor: 'transparent',
						selectedDayTextColor: theme.colors.onBackground,
						todayTextColor: theme.colors.onBackground,
						todayBackgroundColor: theme.colors.primary,
						dayTextColor: 'gray',
						dotColor: theme.colors.primary,
						selectedDotColor: theme.colors.onBackground,
						monthTextColor: theme.colors.onBackground,
					}}
					firstDay={1}
					disablePan
					markedDates={marked}
					markingType={'custom'}
					initialPosition={Positions.CLOSED}
					onDayPress={(date) => showOverviewDialog(date)}
					style={{ margin: 20 }}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 8,
		justifyContent: 'center',
	},
	row: {
		flex: 0.5,
		marginBottom: 8,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
	},
	title: {
		textAlign: 'center',
	},
	subtitle: {
		textAlign: 'center',
		marginBottom: 20,
	},
});

interface OverviewCardProps {
	title: string;
	unit: string;
	value: number | string;
	min: number;
	max: number;
}

const OverviewCard = ({ title, unit, value, min, max }: OverviewCardProps) => {
	return (
		<Card style={{ marginVertical: 10, marginHorizontal: 5 }}>
			<Card.Title
				title={title}
				titleNumberOfLines={2}
				subtitleNumberOfLines={2}
				right={() => (
					<Text>
						{value}
						{unit}
					</Text>
				)}
				subtitle={`Referência: entre ${min}${unit} e ${max}${unit}`}
				subtitleVariant="labelSmall"
				rightStyle={{ margin: 0, padding: 0, paddingBottom: 25, marginRight: 10 }}
			/>
		</Card>
	);
};
