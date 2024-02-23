import Close from '@/src/components/elements/Close';
import { i18n } from '@/src/translations';
import * as React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


const Notifications = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Close position="right" />
			<View style={{ marginBottom: 10 }}>
				<View style={styles.headerContainer}>
					<Title>{i18n.t('Notifications')}</Title>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop:StatusBar.currentHeight
	},
	headerContainer: {
		alignItems: 'flex-start',
		justifyContent: 'center',
		marginHorizontal: 20,
		marginTop: 10,
	},
});

export default Notifications;
