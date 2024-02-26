import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import PlatformUtils from '@utils/platform';
import { useRouter } from 'expo-router';

type CloseProps = {
	position: 'left' | 'right';
};

function Close({ position }: CloseProps) {
	const router = useRouter();
	const { colors } = useTheme();
	const innerPosition = position === 'left' ? { left: 20 } : { right: 20 };
	return PlatformUtils.isIos ? (
		<View style={styles.iosBarContainer}>
			<View
				style={[
					styles.iosBarContent,
					{
						backgroundColor: colors.onSurface + '3D',
					},
				]}
			/>
		</View>
	) : (
		<MaterialCommunityIcons
			onPress={() => router.back()}
			style={[styles.container, innerPosition]}
			name="close"
			color={colors.onSurface}
			size={24}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 20,
		opacity: 0.5,
		zIndex: 10,
		marginTop: StatusBar.currentHeight,
	},
	iosBarContainer: {
		height: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	iosBarContent: {
		height: 5,
		width: 75,
		borderRadius: 25,
		marginTop: 20,
	},
});

export default Close;
