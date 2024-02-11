import React, { useContext, useState, useMemo, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MarkedDates, DateData } from 'react-native-calendars/src/types';
import { Positions } from 'react-native-calendars/src/expandableCalendar';
import { PreferencesContext } from '../components/PreferencesContext';
import { Dialog, Portal, Text, Button, HelperText, Card, Chip, Avatar } from 'react-native-paper';
import { PlantContext } from '../context';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../utils/theme';
import { statusToColor } from '../utils/status';
import { History, ProbableDiseases } from '../types';
import { useTheme } from 'react-native-paper';

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
				textColor: 'red',
				marked: false,
				customStyles: {
					container: {
						backgroundColor: statusToColor(item.status),
					},
					text: {
						color: 'black',
					},
				},
			};
		});
		return markers;
	}, [plantContext.plant.history]);

	const showOverviewDialog = (date: DateData) => {
		const history = plantContext.plant.history;
		const matchingHistory = history?.find((history) => history.date === date.dateString);
		console.log(history);
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
							{currentHistory?.assessment_results?.probable_diseases && (
								<HealthCard
									diseases={currentHistory.assessment_results?.probable_diseases}
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
						todayTextColor: 'black',
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

const HealthCard = ({ diseases }: { diseases: ProbableDiseases[] }) => {
	return (
		<Card style={{ marginVertical: 10, marginHorizontal: 5, paddingVertical: 5 }}>
			<Card.Title
				title="Possíveis doenças"
				titleNumberOfLines={2}
				subtitleNumberOfLines={50}
				subtitle={<DiseasesList diseases={diseases} />}
			/>
		</Card>
	);
};

const DiseasesList = ({ diseases }: { diseases: ProbableDiseases[] }) => {
	if (!diseases || diseases.length === 0 || !Array.isArray(diseases)) {
		return null;
	}

	return (
		<>
			<View style={styles.chipsContainer}>
				{diseases.map((disease) => {
					if (disease.probability > 0.7) {
						return (
							<Chip
								key={disease.name}
								style={styles.chip}
								textStyle={{ fontSize: 10 }}
								avatar={<Avatar.Text size={20} label={disease.probability.toFixed(2)} />}>
								{disease.name}
							</Chip>
						);
					}
				})}
			</View>
		</>
	);
};

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
	chipsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 8,
		justifyContent: 'flex-start',
		marginHorizontal: 10,
	},
	chip: {
		margin: 2,
	},
});

interface OverviewCardProps {
	title: string;
	unit: string;
	value: number | string;
	min: number;
	max: number;
}
