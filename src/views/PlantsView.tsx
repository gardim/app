import * as React from 'react';
import { Plant } from '../types';
import { RefreshControl, View } from 'react-native';

import PlantItem from '../components/elements/PlantItem';
import { Text } from 'react-native-paper';
import { useEffect } from 'react';
import SkeletonList from '../components/ui/SkeletonList';
import { FlatList } from 'react-native';
import AddFAB from '../components/elements/AddFAB';

export type PlantViewProps = {
	plants: Plant[];
	loading: boolean;
	refresh: () => void;
};

const PlantsView = ({ plants, loading, refresh }: PlantViewProps) => {
	useEffect(() => {}, [loading]);

	return (
		<View style={{ flex: 1, paddingHorizontal: 20 }}>
			{loading ? (
				<SkeletonList />
			) : (
				<>
					<FlatList
						contentContainerStyle={
							plants.length == 0 && { flexGrow: 1, justifyContent: 'center' }
						}
						data={plants}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <PlantItem plant={item} />}
						refreshControl={
							<RefreshControl enabled refreshing={loading} onRefresh={refresh} />
						}
						ListEmptyComponent={() => (
							<View style={{ alignItems: 'center' }}>
								<AddFAB callback={() => console.log('clicked')} />
								<Text variant="titleSmall" style={{ margin: 20 }}>
									Adicione sua primeira planta
								</Text>
							</View>
						)}
					/>
					{plants.length > 0 && <AddFAB callback={() => console.log('clicked')} absolute />}
				</>
			)}
		</View>
	);
};

export default PlantsView;
