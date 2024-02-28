import * as React from 'react';
import { RefreshControl, View, FlatList } from 'react-native';

import { Button, Text, useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';
import SkeletonList from '@components/elements/SkeletonItem';
import PlantItem from '@components/elements/PlantItem';
import AddFAB from '@components/elements/AddFAB';
import { i18n } from '@lang/index';
import { Plant } from 'src/@types';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PlantGridItem from '@components/elements/PlantGridItem';

export type PlantViewProps = {
	plants: Plant[];
	loading: boolean;
	refresh: () => void;
};

const sortPlantsByName = (plants: Plant[], sort: 'asc' | 'desc'): Plant[] => {
	const sortedPlants = [...plants].sort((a, b) => {
		if (sort === 'asc') {
			return a.name.localeCompare(b.name);
		} else {
			return b.name.localeCompare(a.name);
		}
	});

	return sortedPlants;
};

const PlantsView = ({ plants, loading, refresh }: PlantViewProps) => {
	const router = useRouter();
	const {colors} = useTheme();
	const [key, setKey] = useState<'grid' | 'list'>('grid');
	const [sort, setSort] = useState<'asc' | 'desc'>('asc');

	useEffect(() => {}, [loading]);

	return (
		<View style={{ flex: 1, paddingHorizontal: 20 }}>
			{loading ? (
				<SkeletonList />
			) : (
				<>
					<View
						style={{
							justifyContent: 'space-between',
							marginHorizontal: 12,
							marginVertical: 20,
							flexDirection: 'row'
						}}>
						<Button
							icon={
								sort == 'desc'
									? 'sort-alphabetical-ascending'
									: 'sort-alphabetical-descending'
							}
							mode="outlined"
							onPress={() => {
								setSort(sort === 'asc' ? 'desc' : 'asc');
							}}>
							{sort}
						</Button>
						<MaterialCommunityIcons
							name={key == 'list' ? 'view-grid' : 'format-list-bulleted'}
							onPress={() => {
								setKey(key === 'grid' ? 'list' : 'grid');
							}}
							size={24}
							color={colors.onSurface}
						/>
					</View>
					<FlatList
						contentContainerStyle={
							plants.length == 0 && { flexGrow: 1, justifyContent: 'center' }
						}
						numColumns={key == 'grid' ? 2 : 1}
						data={sortPlantsByName(plants, sort)}
						keyExtractor={(item) => item.id}
						key={key}
						renderItem={({ item }) =>
							key == 'grid' ? <PlantGridItem plant={item} /> : <PlantItem plant={item} />
						}
						refreshControl={
							<RefreshControl enabled refreshing={loading} onRefresh={refresh} />
						}
						ListEmptyComponent={() => (
							<View style={{ alignItems: 'center' }}>
								<AddFAB
									callback={() =>
										router.push('/(auth)/(register_plants)/identificationMethod')
									}
								/>
								<Text variant="titleSmall" style={{ margin: 20 }}>
									{i18n.t('Add your first plant')}
								</Text>
							</View>
						)}
					/>
					{plants.length > 0 && (
						<AddFAB
							callback={() => router.push('/(auth)/(register_plants)/identificationMethod')}
							absolute
						/>
					)}
				</>
			)}
		</View>
	);
};

export default PlantsView;
