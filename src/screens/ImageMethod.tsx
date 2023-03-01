import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ImageMethodProps, ImageType } from '../types/index';
import { DeletableImage } from '../components/DeletableImage';
import { FAB, Text } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import { identifyPlant } from '../api/plant_id';

export function ImageMethod({ navigation }: ImageMethodProps) {
	const [images, setImages] = useState<ImageType[]>([]);
	const [visible, setVisible] = React.useState<boolean>(false);
	const [buttonOnHold, setButtonOnHold] = React.useState<boolean>(false);

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
				id: result.assets[0].assetId ? result.assets[0].assetId : images.length.toString(),
				uri: result.assets[0].uri,
			};
			if (!images.some((image) => image.id === newImage.id)) {
				setImages([...images, newImage]);
			}
		} else {
			alert('Você não adicionou nenhuma imagem.');
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

	const searchPlants = async () => {
		if (!buttonOnHold) {
			setButtonOnHold(true);
			try {
				const result = await identifyPlant(images);
				if (result.is_plant) {
					navigation.navigate('Result', result);
				} else {
					throw new Error('No plants were found');
				}
			} catch (error) {
				console.error(error);
				alert('Oops! Algo deu errado');
			} finally {
				setButtonOnHold(false);
			}
		}
	};

	const width = Dimensions.get('window').width;

	return (
		<View style={styles.container}>
			<Text variant="titleMedium" style={{ textAlign: 'center' }}>
				Adicione algumas fotos para podermos identificar sua planta!
			</Text>
			<View style={styles.row}>
				<FAB
					icon="camera"
					label="Tirar foto"
					onPress={() => pickImage('camera')}
					visible
					style={[styles.fabStyle]}
					variant="secondary"
					testID="Tirar foto"
				/>
				<FAB
					icon="image"
					label="Adicionar da galeria"
					onPress={() => pickImage('gallery')}
					visible
					style={[styles.fabStyle]}
					variant="secondary"
					testID="Adicionar da galeria"
				/>
			</View>
			{images.length > 0 && (
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						flexDirection: 'column',
						alignContent: 'center',
						alignItems: 'center',
					}}>
					<Carousel
						pagingEnabled={true}
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
					<FAB
						icon="arrow-right"
						label={visible ? 'Continuar' : ''}
						onPress={() => searchPlants()}
						style={[styles.compressedFabStyle]}
						variant="primary"
						onLongPress={() => setVisible(!visible)}
						disabled={buttonOnHold}
						testID="Continuar"
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 40,
		justifyContent: 'center',
	},
	row: {
		flex: 0.5,
		flexDirection: 'column',
		justifyContent: 'space-evenly',
	},
	fabStyle: {},
	compressedFabStyle: {
		position: 'absolute',
		right: 0,
		bottom: 0,
	},
});
