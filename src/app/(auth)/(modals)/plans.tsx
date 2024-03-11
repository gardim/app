import Close from '@components/ui/Close';
import EmptyBanner from '@components/ui/EmptyBanner';
import { i18n } from '@lang/index';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Plans = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Close position="right" />
			<View style={{ marginBottom: 10 }}>
				<View style={styles.headerContainer}>
					<Title>{i18n.t('Plans')}</Title>
				</View>
			</View>
			<EmptyBanner message={i18n.t('nothing to show')} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		alignItems: 'flex-start',
		justifyContent: 'center',
		marginHorizontal: 20,
		marginTop: 10,
	},
});

export default Plans;
