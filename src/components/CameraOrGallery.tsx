import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ImageType } from '../types';
import { DeletableImage } from '../components/DeletableImage';
import { FAB, Text, Snackbar } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import { getImages } from '../api/camera';

type CameraOrGalleryType = {
	description: string;
	images: ImageType[];
	setImages: (images: ImageType[]) => void;
	searchPlants: () => void;
	loading: boolean;
	errorMessage: string;
	setErrorMessage: (message: string) => void;
	visibleAlert: boolean;
	setVisibleAlert: (visibility: boolean) => void;
};

export function CameraOrGallery({
	description,
	images,
	setImages,
	searchPlants,
	loading,
	errorMessage,
	setErrorMessage,
	visibleAlert,
	setVisibleAlert,
}: CameraOrGalleryType) {
	const [visible, setVisible] = React.useState<boolean>(false);

	const onDismissSnackBar = () => setVisibleAlert(false);

	const pickImage = async (method: 'camera' | 'gallery') => {
		try {
			const newImage = await getImages(method);
			if (!images.some((image) => image.id === newImage.id)) {
				setImages([...images, newImage]);
			}
		} catch (error) {
			setErrorMessage('Você não adicionou nenhuma imagem.');
			setVisibleAlert(true);
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
		<>
			<View style={styles.container}>
				<Text variant="titleMedium" style={{ textAlign: 'center' }}>
					{description}
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
							flex: 0.5,
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
							disabled={loading}
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
