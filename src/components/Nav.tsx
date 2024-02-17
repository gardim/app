import React from 'react';

import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { Title } from 'react-native-paper';
import {} from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLinkTo, useTheme } from '@react-navigation/native';

type NavProps = {
	title: string;
};

function Nav({ title }: NavProps) {
	const linkTo = useLinkTo();
	const { colors } = useTheme();

	return (
		<SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
			<View style={styles.headerContainer}>
				<Title>{title}</Title>
				<MaterialCommunityIcons
					onPress={() => linkTo('/notifications')}
					name="bell-outline"
					color={colors.primary}
					size={24}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		alignItems: 'center',
		justifyContent: 'space-between',
		marginHorizontal: 20,
		flexDirection: 'row',
		marginTop: 10,
	},
});

export default Nav;
