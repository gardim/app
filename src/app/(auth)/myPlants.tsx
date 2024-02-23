import * as React from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getAllPlants } from '../../redux/actions';
import { getMessageFromStatusCode } from '../../utils/error';
import PlantsView from '../../components/views/PlantsView';
import ErrorBanner from '@/src/components/ui/ErrorBanner';

const MyPlants = () => {
	const dispatch: AppDispatch = useDispatch();
	const { plants, loading, error } = useSelector((state: RootState) => state.plants);

	useEffect(() => {
		dispatch(getAllPlants());
	}, []);

	if (error) {
		return <ErrorBanner message={getMessageFromStatusCode(error?.status || 500)} />;
	}

	return <PlantsView plants={plants} loading={loading} refresh={() => dispatch(getAllPlants())} />;
};

export default MyPlants;
