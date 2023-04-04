import * as ImagePicker from 'expo-image-picker';
import React, { useState, useContext } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ImageMethodProps, ImageType } from '../types/stack';
import { DeletableImage } from '../components/DeletableImage';
import { FAB, Text, Snackbar } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import { identifyPlant } from '../api/plant_id';
import { LocationContext } from '../api/location';

export function ImageMethod({ navigation }: ImageMethodProps) {
	const [images, setImages] = useState<ImageType[]>([]);
	const [visible, setVisible] = React.useState<boolean>(false);
	const [buttonOnHold, setButtonOnHold] = React.useState<boolean>(false);
	const [visibleAlert, setVisiblAlert] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');
	const locationContext = useContext(LocationContext);

	const onDismissSnackBar = () => setVisiblAlert(false);

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
			setErrorMessage('Você não adicionou nenhuma imagem.');
			setVisiblAlert(true);
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
				const result = await identifyPlant(
					images,
					locationContext.latitude,
					locationContext.longitude
				);
				if (result.is_plant) {
					navigation.navigate('Result', result);
				} else {
					throw new Error('Nenhuma planta foi encontrada');
				}
			} catch (error) {
				setErrorMessage(error.message);
				setVisiblAlert(true);
			} finally {
				setButtonOnHold(false);
			}
		}
	};

	const width = Dimensions.get('window').width;

	return (
		<>
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
							testID="Method Continue"
						/>
					</View>
				)}
			</View>
			<Snackbar
				visible={visibleAlert}
				action={{
					label: 'OK',
				}}
				onDismiss={onDismissSnackBar}
				style={{
					marginBottom: 30,
				}}>
				{errorMessage}
			</Snackbar>
		</>
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
