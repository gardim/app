import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Icon, withBadge } from '@rneui/themed';
import { useTheme } from 'react-native-paper';
import { ImageType } from '@/src/types';

type DeletableImageType = {
	image: ImageType;
	remove: (id: string) => void;
};

const BadgedIcon = withBadge(15)(Icon);

export function DeletableImage({ image, remove }: DeletableImageType) {
	const theme = useTheme();

	return (
		<View style={styles(theme).container}>
			<Image source={{ uri: image.uri }} style={styles(theme).image} />
			<View style={{ position: 'absolute', top: 0, right: 0 }}>
				<BadgedIcon
					type="ionicon"
					name="ios-chatbubbles"
					containerStyle={styles(theme).badgeContainer}
					badgeStyle={styles(theme).badge}
					onPress={() => remove(image.id)}
				/>
			</View>
		</View>
	);
}

const styles = (theme) =>
	StyleSheet.create({
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
			backgroundColor: 'transparent',
		},
		badge: {
			height: 30,
			width: 30,
			backgroundColor: theme.colors.error,
		},
	});
