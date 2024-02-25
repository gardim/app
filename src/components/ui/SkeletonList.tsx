import * as React from 'react';

import SkeletonItem from '@components/elements/SkeletonItem';
import { FlatList } from 'react-native';

const SkeletonList = () => {
	return (
		<FlatList
			data={[...Array(5)]}
			keyExtractor={(item, index) => index.toString()}
			renderItem={({ index }) => <SkeletonItem key={index} />}
		/>
	);
};

export default SkeletonList;
