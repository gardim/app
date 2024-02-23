import React from 'react';

import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { Title } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { i18n } from '@/src/translations';

type NavProps = {
	title: string;
};

function Nav({ title }: NavProps) {
	const router = useRouter();
	const { colors } = useTheme();

	return (
		<SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
			<View style={styles.headerContainer}>
				<Title>{i18n.t(title)}</Title>
				<MaterialCommunityIcons
					onPress={() => router.push('/notifications')}
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
