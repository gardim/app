import * as React from 'react';
import { View } from 'react-native';

type LinearGaugeChartProps = {
	min: number;
	max: number;
	value: number;
	tolerance: number;
	conversor?: (value: number) => number | null;
};

export const LinearGaugeChart = ({ min, max, value, tolerance }: LinearGaugeChartProps) => {
	const sectionColors = () => {
		const colorList = [];
		for (let index = 0; index < 10; index++) {
			if (index >= min && index <= max) {
				colorList.push('#B0D8A4');
			} else if (index >= min - tolerance && index <= max + tolerance) {
				colorList.push('#FEE191');
			} else {
				colorList.push('#E84258');
			}
		}

		return colorList;
	};

	const colorList: string[] = sectionColors();

	return (
		<View style={{ flexDirection: 'row' }}>
			{colorList.map((color, i) => (
				<View
					key={i}
					style={{
						backgroundColor: color,
						width: '8%',
						height: 10,
						borderRadius: 2,
						marginHorizontal: 2,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					{value == i - 1 && (
						<View
							style={{ backgroundColor: 'white', width: 30, height: 30, borderRadius: 30 }}
						/>
					)}
				</View>
			))}
		</View>
	);
};
