import { Slider } from '@miblanchard/react-native-slider';
import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

type LinearGaugeChartProps = {
	min: number;
	max: number;
	value: number;
};

export const LinearGaugeChart = ({ min, max, value }: LinearGaugeChartProps) => {
	const [sliderValue, setSliderValue] = useState(value);
	const [lineHeight, setLineHeight] = useState(0);

	const sectionColors = Array.from({ length: 10 }, (_, i) => {
		const value = i + 1;
		if (value >= min && value <= max) {
			return '#B0D8A4'; // Green
		} else if ((value === min - 1 && value !== 0) || value === max + 1) {
			return '#FEE191'; // Yellow
		} else {
			return '#E84258'; // Red
		}
	});

	const sliderRef = useRef(null);

	return (
		<View style={{ position: 'relative' }}>
			<View
				style={[
					styles.line,
					{
						height: lineHeight,
						borderRadius: 100,
					},
				]}>
				{sectionColors.map((color, i) => (
					<View key={i} style={[styles.section, { backgroundColor: color }]} />
				))}
			</View>
			<Slider
				ref={sliderRef}
				minimumValue={1}
				maximumValue={10}
				step={1}
				value={sliderValue}
				minimumTrackTintColor="transparent"
				maximumTrackTintColor="transparent"
				thumbTintColor="white"
				thumbStyle={styles.thumbStyle}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	line: {
		flexDirection: 'row',
		position: 'absolute',
		top: 16,
		left: 0,
		right: 0,
	},
	section: {
		flex: 1,
		height: 10,
	},
	thumbStyle: {
		backgroundColor: 'white',
		elevation: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	gradientContainer: {
		position: 'absolute',
		top: '50%',
		left: 0,
		right: 0,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 5,
		overflow: 'hidden',
	},
});
