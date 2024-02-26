import * as React from 'react';
import { RefreshControl, View } from 'react-native';

import { Text } from 'react-native-paper';
import { useEffect } from 'react';
import { FlatList } from 'react-native';
import SkeletonList from '@components/elements/SkeletonItem';
import AddFAB from '@components/elements/AddFAB';
import { i18n } from '@lang/index';
import { Device } from 'src/@types';
import DeviceItem from '@components/elements/DeviceItem';

export type DeviceViewProps = {
	devices: Device[];
	loading: boolean;
	refresh: () => void;
};

const DevicesView = ({ devices, loading, refresh }: DeviceViewProps) => {
	useEffect(() => {}, [loading]);

	return (
		<View style={{ flex: 1, paddingHorizontal: 20 }}>
			{loading ? (
				<SkeletonList />
			) : (
				<>
					<FlatList
						contentContainerStyle={
							devices.length == 0 && { flexGrow: 1, justifyContent: 'center' }
						}
						data={devices}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <DeviceItem device={item} />}
						refreshControl={
							<RefreshControl enabled refreshing={loading} onRefresh={refresh} />
						}
						ListEmptyComponent={() => (
							<View style={{ alignItems: 'center' }}>
								<AddFAB callback={() => console.log('clicked')} />
								<Text variant="titleSmall" style={{ margin: 20 }}>
									{i18n.t('Add your first device')}
								</Text>
							</View>
						)}
					/>
					{devices.length > 0 && <AddFAB callback={() => console.log('clicked')} absolute />}
				</>
			)}
		</View>
	);
};

export default DevicesView;
