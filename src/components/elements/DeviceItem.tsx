import * as React from 'react';
import { Avatar, List } from 'react-native-paper';
import { Device } from 'src/@types';

export type DeviceItemProps = {
	device: Device;
};

const DeviceItem = ({ device }: DeviceItemProps) => {
	const handleOnPress = () => {
		console.log('');
	};

	return (
		<List.Item
			key={device.id}
			title={device.code}
			titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
			description={device.id}
			onPress={() => handleOnPress()}
			left={() => <Avatar.Text label={device.id} size={40} />}
		/>
	);
};
export default DeviceItem;
