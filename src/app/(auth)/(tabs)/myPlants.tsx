import * as React from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/index';
import { getAllPlants } from 'src/store/actions';
import { getMessageFromStatusCode } from '@utils/error';
import ErrorView from '@components/views/ErrorView';
import DisplayView from '@components/views/DisplayView';
import { mapPlantToItem } from '@utils/index';
import { useRouter } from 'expo-router';
import { i18n } from '@lang/index';

const MyPlants = () => {
	const router = useRouter();

	const dispatch: AppDispatch = useDispatch();
	const { plants, loading, error } = useSelector((state: RootState) => state.plants);

	useEffect(() => {
		dispatch(getAllPlants());
	}, []);

	const items = plants.map(mapPlantToItem);

	if (error) {
		return <ErrorView message={getMessageFromStatusCode(error?.status || 500)} />;
	}

	return (
		<DisplayView
			items={items}
			loading={loading}
			refresh={() => dispatch(getAllPlants())}
			handleOnAddItem={() => router.push('/(auth)/(register_plants)/identificationMethod')}
			handleOnPressItem={(id: string) => router.push(`/plant/${id}`)}
			addMessage={i18n.t('Add your first plant')}
			fallbackIcon="mushroom-outline"
		/>
	);
};

export default MyPlants;
