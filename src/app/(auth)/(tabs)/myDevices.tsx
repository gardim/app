import * as React from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/index';
import { getAllDevices } from 'src/store/actions';
import { getMessageFromStatusCode } from '@utils/error';
import ErrorView from '@components/views/ErrorView';
import DisplayView from '@components/views/DisplayView';
import { mapDeviceToItem } from '@utils/index';
import { i18n } from '@lang/index';
import { useRouter } from 'expo-router';

const MyDevices = () => {
	const router = useRouter();
	const dispatch: AppDispatch = useDispatch();
	const { devices, loading, error } = useSelector((state: RootState) => state.devices);

	useEffect(() => {
		dispatch(getAllDevices());
	}, []);

	if (error) {
		return (
			<ErrorView
				loading={loading}
				message={getMessageFromStatusCode(error?.status || 500)}
				refresh={() => dispatch(getAllDevices())}
			/>
		);
	}

	const items = devices.map(mapDeviceToItem);

	return (
		<DisplayView
			items={items}
			loading={loading}
			refresh={() => dispatch(getAllDevices())}
			handleOnAddItem={() => router.push('/(auth)/(register_devices)/reset')}
			handleOnPressItem={(id: string) => console.log(id)}
			addMessage={i18n.t('Add your first device')}
			fallbackIcon="usb-port"
		/>
	);
};

export default MyDevices;
