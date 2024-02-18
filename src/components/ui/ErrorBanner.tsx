import * as React from 'react';
import { View } from 'react-native';

import { Text, useTheme } from 'react-native-paper';
import LeafBug from '../../items/svgs/LeafBug';

export type ErrorBannerProps = {
	message: string;
};

const ErrorBanner = ({ message }: ErrorBannerProps) => {
	const { colors } = useTheme();

	return (
		<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
			<LeafBug height={64} color={colors.primary} />
			<Text variant="titleSmall" style={{ margin: 20, textAlign: 'center' }}>
				{message}
			</Text>
		</View>
	);
};

export default ErrorBanner;
