import * as React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useRef, useState } from 'react';

const categories = [
	{
		name: 'Status',
	},
];

interface ScrollTabProps {
	onCategoryChanged: (category: string) => void;
}

const ScrollTab = ({ onCategoryChanged }: ScrollTabProps) => {
	const scrollRef = useRef<ScrollView>(null);
	const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
	const [activeIndex, setActiveIndex] = useState(0);

	const selectCategory = (index: number) => {
		const selected = itemsRef.current[index];
		setActiveIndex(index);
		selected?.measure((x) => {
			scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
		});
		onCategoryChanged(categories[index].name);
	};

	return (
		<View style={{ justifyContent: 'flex-start', flexDirection: 'row'}}>
			<ScrollView
				horizontal
				ref={scrollRef}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					alignItems: 'center',
					gap: 20,
					paddingHorizontal: 16,
				}}
				style={{ marginVertical: 10 }}>
				{categories.map((item, index) => (
					<TouchableOpacity
						ref={(el) => (itemsRef.current[index] = el)}
						key={index}
						style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
						onPress={() => selectCategory(index)}>
						<Text
							variant={'titleMedium'}>
							{item.name}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({

	categoriesBtn: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 8,
	},
	categoriesBtnActive: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		borderBottomWidth: 2,
		paddingBottom: 8,
	},
});

export default ScrollTab;
