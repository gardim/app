import * as React from 'react';
import { List } from 'react-native-paper';
import { Skeleton } from '@rneui/themed';

const SkeletonItem = () => {
	return (
		<List.Item
			title={<Skeleton animation="wave" width={90} height={16} />}
			description={<Skeleton animation="wave" width={200} height={12} />}
			titleStyle={{ marginBottom: 5 }}
			left={() => <Skeleton animation="wave" circle width={40} />}
		/>
	);
};

export default SkeletonItem;
