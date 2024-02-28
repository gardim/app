import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ImageType } from 'src/@types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type DeletableImageType = {
	image: ImageType;
	remove: (id: string) => void;
};

const DeletableImage = ({ image, remove }: DeletableImageType) => {
	const { colors } = useTheme();

	return (
		<View style={styles.container}>
			<Image source={{ uri: image.uri }} style={styles.image} />
			<View style={{ position: 'absolute', top: 0, right: 0 }}>
				<MaterialCommunityIcons
					onPress={() => remove(image.id)}
					style={[styles.badgeContainer]}
					name="close-box"
					color={colors.error}
					size={24}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		width: '70%',
		alignSelf: 'center',
		height: 200,
		margin: 20,
	},
	image: {
		width: '100%',
		height: 200,
		borderRadius: 10,
	},
	badgeContainer: {
		position: 'relative',
		top: -10,
		right: -10,
		backgroundColor: 'white',
	},
});

export default DeletableImage;
