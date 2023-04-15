import React, { useContext, useState, useEffect, useMemo } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ExpandableCalendar, CalendarProvider } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import { Positions } from 'react-native-calendars/src/expandableCalendar';
import { PreferencesContext } from '../components/PreferencesContext';
import { Dialog, Portal, Text, Button, TextInput } from 'react-native-paper';
import { PlantContext } from '../context';
import { CombinedDarkTheme, CombinedDefaultTheme } from '../utils/theme';
import { convertDate } from '../utils';

export default function Statistics() {
	const { isThemeDark } = useContext(PreferencesContext);
	const [theme, setTheme] = useState(isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme);
	const [editVisible, setEditVisible] = React.useState(false);
	const plantContext = useContext(PlantContext);
	const initialDate = plantContext?.plant?.created_at
		? convertDate(plantContext.plant.created_at)
		: convertDate(new Date());

	useEffect(() => {
		setTheme(isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme);
	}, [isThemeDark]);

	const marked = useMemo(() => {
		const markers: MarkedDates = {};
		const history = plantContext.plant.history;
		history?.forEach((item) => {
			const date = item.date;
			markers[date] = {
				selected: true,
				marked: true,
				customStyles: {
					container: {
						backgroundColor: '#5E60CE',
					},
				},
			};
		});
		return markers;
	}, [plantContext.plant.history]);

	const showEditDialog = (date) => {
		console.log(date);
		setEditVisible(true);
	};
	const hideEditDialog = () => setEditVisible(false);

	const handleOnEdit = async () => hideEditDialog();

	return (
		<SafeAreaView style={styles.container}>
			<Portal>
				<Dialog visible={editVisible} onDismiss={hideEditDialog}>
					<Dialog.Title>Editar</Dialog.Title>
					<Dialog.Content>
						<Text variant="titleMedium" style={{ textAlign: 'center', margin: 20 }}>
							Dê um nome à sua planta!
						</Text>
						<TextInput mode="flat" testID="input-nome" />
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={handleOnEdit}>Done</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
			<View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
				<CalendarProvider date={initialDate}>
					<ExpandableCalendar
						theme={{
							backgroundColor: theme.colors.background,
							calendarBackground: theme.colors.background,
							textSectionTitleColor: theme.colors.onBackground,
							selectedDayTextColor: theme.colors.onBackground,
							todayTextColor: theme.colors.onBackground,
							todayBackgroundColor: theme.colors.primary,
							dayTextColor: 'black',
						}}
						firstDay={1}
						disablePan
						markedDates={marked}
						markingType={'custom'}
						initialPosition={Positions.CLOSED}
						onDayPress={(date) => showEditDialog(date)}
					/>
				</CalendarProvider>
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
	fabStyle: {
		margin: 20,
	},
});
