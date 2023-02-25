import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { ImageMethodProps, ImageType } from '../types/index';
import { DeletableImage } from '../components/DeletableImage';
import { FAB } from 'react-native-paper';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

export function ImageMethod({ navigation }: ImageMethodProps) {
	const [images, setImages] = useState<ImageType[]>([]);

	const pickImage = async (method) => {
		const options = {
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: false,
		};

		let result: ImagePicker.ImagePickerResult = null;

		if (method == 'camera') {
			result = await ImagePicker.launchCameraAsync(options);
		} else {
			result = await ImagePicker.launchImageLibraryAsync(options);
		}

		if (!result.canceled) {
			const newImage = {
				id: result.assets[0].assetId,
				uri: result.assets[0].uri,
			};
			if (!images.some((image) => image.id === newImage.id)) {
				setImages([...images, newImage]);
			}
			console.log(images);
		} else {
			alert('You did not select any image.');
		}
	};
	const removeImage = (id: string) => {
		const newImages = [...images];
		const index = newImages.findIndex((image) => image.id === id);
		if (index !== -1) {
			newImages.splice(index, 1);
			setImages(newImages);
		}
	};

	const width = Dimensions.get('window').width;

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.row}>
				<FAB
					icon="camera"
					label="Tirar foto"
					onPress={() => pickImage('camera')}
					visible
					style={[styles.fabStyle]}
				/>
				<FAB
					icon="image"
					label="Adicionar da galeria"
					onPress={() => pickImage('gallery')}
					visible
					style={[styles.fabStyle]}
				/>
			</View>
			{images.length > 0 ? (
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						flexDirection: 'row',
						alignContent: 'center',
					}}>
					<Carousel
						pagingEnabled={true}
						style={{ marginLeft: '20%' }}
						snapEnabled={true}
						mode={'horizontal-stack'}
						modeConfig={{
							snapDirection: 'left',
						}}
						loop={true}
						width={width}
						data={images}
						renderItem={({ item }) => <DeletableImage image={item} remove={removeImage} />}
					/>
				</View>
			) : (
				<></>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 8,
		justifyContent: 'center',
	},
	row: {
		flexDirection: 'column',
	},
	fabStyle: {
		margin: 10,
	},
});
