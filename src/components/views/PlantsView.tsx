import * as React from 'react';
import { RefreshControl, View } from 'react-native';

import { Text } from 'react-native-paper';
import { useEffect } from 'react';
import { FlatList } from 'react-native';
import SkeletonList from '@/src/components/elements/SkeletonItem';
import PlantItem from '@/src/components/elements/PlantItem';
import AddFAB from '../elements/AddFAB';
import { Plant } from '@/src/types';
import { i18n } from '@/src/translations';


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
									{i18n.t('Add your first plant')}
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
