import * as React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalSearchParams } from 'expo-router';
import Close from '@components/ui/Close';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/index';
import { getOnePlant } from 'src/store/actions';
import { LinearGradient } from 'expo-linear-gradient';
import StatusView from '@components/views/StatusView';
import ScrollTab from '@components/elements/ScrollTab';

const Plant = () => {
	const { id } = useGlobalSearchParams();

	const dispatch: AppDispatch = useDispatch();
	const { currentPlant } = useSelector((state: RootState) => state.plants);

	useEffect(() => {
		dispatch(getOnePlant(id));
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<Close position="right" color={'black'} />

			<View style={{ marginBottom: 10 }}>
				<View style={styles.headerContainer}>
					<ImageBackground source={{ uri: currentPlant?.image }} style={styles.image} />
					<LinearGradient
						colors={['#00000000', '#000000']}
						style={{ height: 200, width: '100%' }}>
						<View style={{ bottom: 0, position: 'absolute', margin: 20 }}>
							<Text variant="titleLarge" style={{ color: 'white' }}>
								{currentPlant?.name}
							</Text>
							<Text variant="titleMedium" style={{ color: 'white' }}>
								{currentPlant?.scientific_name}
							</Text>
						</View>
					</LinearGradient>
					<ScrollTab />
					<StatusView />
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
	},
	image: {
		width: '100%',
		height: 200,
		position: 'absolute',
		top: 0,
		left: 0,
	},
});

export default Plant;
