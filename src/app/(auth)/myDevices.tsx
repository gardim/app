import * as React from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/index';
import { getAllDevices } from 'src/store/actions';
import { getMessageFromStatusCode } from '@utils/error';
import ErrorBanner from '@components/ui/ErrorBanner';
import DevicesView from '@components/views/DevicesView';

const MyDevices = () => {
	const dispatch: AppDispatch = useDispatch();
	const { devices, loading, error } = useSelector((state: RootState) => state.devices);

	useEffect(() => {
		dispatch(getAllDevices());
	}, []);

	if (error) {
		return <ErrorBanner message={getMessageFromStatusCode(error?.status || 500)} />;
	}

	return (
		<DevicesView devices={devices} loading={loading} refresh={() => dispatch(getAllDevices())} />
	);
};

export default MyDevices;
