import * as React from 'react';
import { View } from 'react-native';

import { Text, useTheme } from 'react-native-paper';
import Dandelion from '@svgs/Dandelion';

export type EmptyBannerProps = {
	message: string;
};

const EmptyBanner = ({ message }: EmptyBannerProps) => {
	const { colors } = useTheme();

	return (
		<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
			<Dandelion height={64} color={colors.primary} />
			<Text variant="titleSmall" style={{ margin: 20, textAlign: 'center' }}>
				{message}
			</Text>
		</View>
	);
};

export default EmptyBanner;
