import * as React from 'react';

import SkeletonItem from '../elements/SkeletonItem';

const SkeletonList = () => {
	return (
		<>
			{[...Array(5)].map((_, index) => (
				<SkeletonItem key={index} />
			))}
		</>
	);
};

export default SkeletonList;
