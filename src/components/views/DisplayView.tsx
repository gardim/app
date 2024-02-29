import * as React from 'react';
import { RefreshControl, View, FlatList } from 'react-native';

import { Button, Text, useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';
import SkeletonList from '@components/elements/SkeletonItem';
import AddFAB from '@components/elements/AddFAB';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GridItem from '@components/elements/GridItem';
import ListItem from '@components/elements/ListItem';
import { Item } from 'src/@types';
import { sortItemsByTitle } from '@utils/index';

export type DisplayViewProps = {
	items: Item[];
	loading: boolean;
	refresh: () => void;
	handleOnAddItem: () => void;
	handleOnPressItem: (id: string) => void;
	addMessage: string;
	fallbackIcon: string;
};

const DisplayView = ({
	items,
	loading,
	refresh,
	handleOnAddItem: handleOnAddItem,
	handleOnPressItem,
	addMessage,
	fallbackIcon,
}: DisplayViewProps) => {
	const { colors } = useTheme();
	const [key, setKey] = useState<'grid' | 'list'>('list');
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
							flexDirection: 'row',
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
							items.length == 0 && { flexGrow: 1, justifyContent: 'center' }
						}
						numColumns={key == 'grid' ? 2 : 1}
						data={sortItemsByTitle(items, sort)}
						keyExtractor={(item) => item.id ?? item.title}
						key={key}
						renderItem={({ item }) =>
							key == 'grid' ? (
								<GridItem
									item={item}
									handleOnPress={() => handleOnPressItem(item.id ?? item.title)}
									fallbackIcon={fallbackIcon}
								/>
							) : (
								<ListItem
									item={item}
									handleOnPress={() => handleOnPressItem(item.id ?? item.title)}
									fallbackIcon={fallbackIcon}
								/>
							)
						}
						refreshControl={
							<RefreshControl enabled refreshing={loading} onRefresh={refresh} />
						}
						ListEmptyComponent={() => (
							<View style={{ alignItems: 'center' }}>
								<AddFAB callback={handleOnAddItem} />
								<Text variant="titleSmall" style={{ margin: 20 }}>
									{addMessage}
								</Text>
							</View>
						)}
					/>
					{items.length > 0 && <AddFAB callback={handleOnAddItem} absolute />}
				</>
			)}
		</View>
	);
};

export default DisplayView;
