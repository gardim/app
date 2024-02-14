import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import PlatformUtils from '../utils/platform';

function Close({ position }) {
	const navigation = useNavigation();
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
			onPress={() => navigation.goBack()}
			style={[styles.container, innerPosition]}
			name="close"
			color={colors.onSurface}
			size={24}
		/>
	);
}

Close.propTypes = {
	style: PropTypes.object,
	position: PropTypes.oneOf(['left', 'right']),
};

Close.defaultProps = {
	position: 'left',
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 20,
		opacity: 0.5,
		zIndex: 10,
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
