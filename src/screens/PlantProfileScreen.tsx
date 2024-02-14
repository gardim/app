import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import Close from '../components/Close';
import { MainStackParamList } from '../navigation/MainStackNavigation';
import { StackScreenProps } from '@react-navigation/stack';

type PlantProfileScreenProps = StackScreenProps<MainStackParamList, 'Plant Profile'>;

const PlantProfileScreen = ({ route }: PlantProfileScreenProps) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Close position="right" />
			<View style={{ marginBottom: 10 }}>
				<View style={styles.headerContainer}>
					{/* <Title>{plant.name}</Title> */}
					<Title>{route.params?.id}</Title>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		alignItems: 'flex-start',
		justifyContent: 'center',
		marginHorizontal: 20,
		marginTop: 10,
	},
});

export default PlantProfileScreen;
