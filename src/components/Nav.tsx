import React from 'react';

import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';

function Nav({ title, style, rightButton }) {
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

Nav.propTypes = {
	title: PropTypes.string,
	style: PropTypes.object,
	rightButton: PropTypes.element,
};

Nav.defaultProps = {
	rightButton: <View style={{ width: 1 }} />,
};

export default Nav;
