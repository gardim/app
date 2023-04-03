import { Slider } from '@miblanchard/react-native-slider';
import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Range } from '../types';
import { scaleRange } from '../utils';

type LinearGaugeChartProps = {
	min: number;
	max: number;
	value: number;
	range: Range;
	conversor?: (value: number) => number | null;
};

export const LinearGaugeChart = ({ min, max, value, range, conversor }: LinearGaugeChartProps) => {
	const [sliderValue, setSliderValue] = useState(value);

	useEffect(() => {
		setSliderValue(value);
	}, [value]);

	const scaledRange = scaleRange(range);

	let scaledMin = min;
	let scaledMax = max;

	if (conversor) {
		scaledMin = conversor(min);
		scaledMax = conversor(max);
	}

	const sectionColors = Array.from({ length: scaledRange.max }, (_, i) => {
		const value = i + 1;
		if (value >= scaledMin && value <= scaledMax) {
			return '#B0D8A4';
		} else if ((value === scaledMin - 1 && value !== 0) || value === scaledMax + 1) {
			return '#FEE191';
		} else {
			return '#E84258';
		}
	});

	const sliderRef = useRef(null);

	return (
		<View style={{ position: 'relative' }}>
			<View style={[styles.line]}>
				{sectionColors.map((color, i) => (
					<View key={i} style={[styles.section, { backgroundColor: color }]} />
				))}
			</View>
			<Slider
				ref={sliderRef}
				minimumValue={range.min}
				maximumValue={range.max}
				step={1}
				value={sliderValue}
				minimumTrackTintColor="transparent"
				maximumTrackTintColor="transparent"
				thumbTintColor="white"
				thumbStyle={styles.thumbStyle}
				disabled={true}
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
