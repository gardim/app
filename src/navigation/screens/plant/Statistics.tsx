import filter from 'lodash/filter';
import find from 'lodash/find';
import groupBy from 'lodash/groupBy';
import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, Alert } from 'react-native';
import {
  ExpandableCalendar,
  TimelineEventProps,
  TimelineList,
  CalendarProvider,
  TimelineProps,
  CalendarUtils,
  Calendar,
  CalendarList,
} from 'react-native-calendars';
import { useTheme, Text, FAB } from 'react-native-paper';

export default function Statistics({ navigation }) {
  const theme = useTheme();

  React.useEffect(() => {}, [theme.colors.background]);

  return (
    <SafeAreaView style={styles.container}>
      <CalendarList
        firstDay={1}
        pastScrollRange={1}
        futureScrollRange={1}
        scrollEnabled
        showScrollIndicator={false}
        theme={{
          backgroundColor: theme.colors.background, // Not change nothing
          calendarBackground: theme.colors.background, // If change it, change all calendar bg
          textSectionTitleColor: theme.colors.onBackground,
          selectedDayBackgroundColor: 'transparent',
          selectedDayTextColor: theme.colors.onBackground,
          todayTextColor: theme.colors.onBackground,
          todayBackgroundColor: theme.colors.primary,
          dayTextColor: 'gray', //Disabled days
          dotColor: theme.colors.primary,
          selectedDotColor: theme.colors.onBackground,
          monthTextColor: theme.colors.onBackground,
        }}
      />
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
