import React, { ReactNode } from 'react';

import { Dimensions, StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';

type NavProps = {
	title: string;
	style?: object;
	rightButton: ReactNode;
};

function Nav({ title, style, rightButton }: NavProps) {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.headerContainer}>
				<Title>{title}</Title>
			</View>
			{rightButton}
		</View>
	);
}

const styles = StyleSheet.create({
	headerContainer: {
		alignItems: 'flex-start',
		justifyContent: 'center',
		marginHorizontal: 20,
		marginTop: 10,
	},
	container: {
		height: 50,
		width: Dimensions.get('window').width,
	},
});

export default Nav;
