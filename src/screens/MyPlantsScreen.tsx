import * as React from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getAllPlants } from '../redux/slices/actions';
import PlantsView from '../views/PlantsView';
import { Text } from 'react-native-paper';

const MyPlantsScreen = () => {
	const dispatch: AppDispatch = useDispatch();
	const { plants, loading, error } = useSelector((state: RootState) => state.plants);

	useEffect(() => {
		dispatch(getAllPlants());
	}, []);

	if (error && error?.status === 404) {
		return <Text>erro</Text>;
	} else if (error) {
		return <Text>erro</Text>;
	}

	return <PlantsView plants={plants} loading={loading} refresh={() => dispatch(getAllPlants())} />;
};

export default MyPlantsScreen;
