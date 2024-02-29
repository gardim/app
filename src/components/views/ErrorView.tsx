import * as React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

import { Text, useTheme } from 'react-native-paper';
import LeafBug from '@svgs/LeafBug';

export type ErrorViewProps = {
	message: string;
	loading: boolean;
	refresh: () => void;
};

const ErrorView = ({ message, loading, refresh }: ErrorViewProps) => {
	const { colors } = useTheme();

	return (
		<ScrollView
			refreshControl={<RefreshControl enabled refreshing={loading} onRefresh={refresh} />}
			contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
			<View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
				<LeafBug height={64} color={colors.primary} />
				<Text variant="titleSmall" style={{ margin: 20, textAlign: 'center' }}>
					{message}
				</Text>
			</View>
		</ScrollView>
	);
};

export default ErrorView;
