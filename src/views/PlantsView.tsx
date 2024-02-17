import * as React from 'react';
import { Plant } from '../types';
import { RefreshControl, SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native';

import PlantItem from '../components/elements/PlantItem';
import { FAB, Text } from 'react-native-paper';
import { useEffect } from 'react';
import SkeletonList from '../components/ui/SkeletonList';

type CustomFABProps = {
	absolute?: boolean;
};

const CustomFAB = ({ absolute }: CustomFABProps) => {
	const [visible, setVisible] = React.useState<boolean>(false);
	return (
		<FAB
			icon="plus"
			label={visible ? 'Continuar' : ''}
			onPress={() => console.log('clicked')}
			variant="primary"
			style={
				absolute && {
					position: 'absolute',
					margin: 16,
					right: 0,
					bottom: 0,
				}
			}
			onLongPress={() => setVisible(!visible)}
			testID="Add Plant"
		/>
	);
};
export type PlantProps = {
	plants: Plant[];
	loading: boolean;
	refresh: () => void;
};

const PlantsView = ({ plants, loading, refresh }: PlantProps) => {
	useEffect(() => {}, [loading]);

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: 'flex-start', paddingHorizontal: 20 }}>
			{loading || !plants ? (
				<SkeletonList />
			) : (
				<>
					<ScrollView
						contentContainerStyle={
							plants.length == 0 && { flexGrow: 1, justifyContent: 'center' }
						}
						refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}>
						{plants.length ? (
							<>
								{plants.map((plant) => (
									<PlantItem plant={plant} key={plant.id} />
								))}
							</>
						) : (
							<View style={{ alignItems: 'center' }}>
								<CustomFAB />
								<Text variant="titleSmall" style={{ margin: 20 }}>
									Adicione sua primeira planta
								</Text>
							</View>
						)}
					</ScrollView>

					{plants.length > 0 && <CustomFAB absolute />}
				</>
			)}
		</SafeAreaView>
	);
};

export default PlantsView;
