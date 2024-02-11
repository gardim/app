import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useTheme } from 'react-native-paper';
import testSvg from '../../resources/abiotic.svg';

export const SVGIcon = ({ width = 30, height = 30 }: { width?: number; height?: number }) => {
	const theme = useTheme();
	return (
		<View style={{ backgroundColor: theme.colors.primary, padding: 10, borderRadius: 50 }}>
			<SvgXml width={width} height={height} fill={theme.colors.background} xml={testSvg} />
		</View>
	);
};

export default SVGIcon;
