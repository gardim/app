import { useEffect } from 'react';
import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, FAB, List, Avatar, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../api';
import { AppDispatch, RootState } from '../store';
import Nav from '../components/Nav';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MainStackParamList } from '../navigation/MainStackNavigation';
import { useLinkTo } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

type PlantListScreenProps = StackScreenProps<MainStackParamList, 'Home'>;

const PlantListScreen = ({ navigation }: PlantListScreenProps) => {
	const dispatch: AppDispatch = useDispatch();
	const linkTo = useLinkTo();
	const { colors } = useTheme();
	const plants = useSelector((state: RootState) => state.plants.plants);

	useEffect(() => {
		dispatch(fetchData());
	}, []);

	const [visible, setVisible] = React.useState<boolean>(false);

	const handleOnPress = (id: number) => {
		linkTo(`/plants/${id}`);
	};

	const renderFAB = (styles) => (
		<FAB
			icon="plus"
			label={visible ? 'Continuar' : ''}
			onPress={() => console.log('clicked')}
			style={styles}
			variant="primary"
			onLongPress={() => setVisible(!visible)}
			testID="Add Plant"
		/>
	);

	const addPlantButton = (quantity: number) => {
		return quantity > 0 ? (
			renderFAB(styles.compressedFabStyle)
		) : (
			<View style={styles.row}>
				{renderFAB(styles.fabStyle)}
				<Text variant="titleSmall">Adicione sua primeira planta</Text>
			</View>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ marginBottom: 10 }}>
				<Nav
					title="Minhas Plantas"
					rightButton={
						<MaterialCommunityIcons
							onPress={() => navigation.navigate('Notifications')}
							style={[styles.container, { right: 20 }]}
							name="bell-outline"
							color={colors.primary}
							size={24}
						/>
					}
				/>
			</View>
			<ScrollView style={{ paddingHorizontal: 20 }}>
				{plants.map((plant) => {
					return (
						<List.Item
							key={plant.id}
							title={plant.name}
							titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
							description={plant.scientific_name}
							onPress={() => handleOnPress(plant.id)}
							left={() => <Avatar.Text label={plant.name[0]} size={40} />}
						/>
					);
				})}
			</ScrollView>
			{addPlantButton(plants.length)}
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
	container: {
		position: 'absolute',
		top: 20,
		zIndex: 10,
	},
	row: {
		height: '54%',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	fabStyle: {
		margin: 20,
	},
	compressedFabStyle: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		margin: 40,
	},
});

export default PlantListScreen;
