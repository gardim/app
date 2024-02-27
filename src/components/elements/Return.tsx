import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { Text, Title, useTheme } from 'react-native-paper';

type ReturnProps = {
	title: string;
	subTitle: string;
	handleReturn: () => void;
};

function Return({ handleReturn, title, subTitle }: ReturnProps) {
	const { colors } = useTheme();

	return (
		<SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
			<View style={styles.headerContainer}>
				<MaterialCommunityIcons
					onPress={() => handleReturn()}
					name="arrow-left-drop-circle"
					color={colors.onSurface}
					size={36}
				/>
				<View style={styles.icon}>
					<Title>{title}</Title>
					<Text variant="titleMedium">{subTitle}</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	icon: {
		marginLeft: 20,
	},
	headerContainer: {
		alignItems: 'center',
		marginHorizontal: 20,
		flexDirection: 'row',
		marginTop: 10,
	},
});

export default Return;
