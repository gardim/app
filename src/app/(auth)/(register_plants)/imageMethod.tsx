import { useEffect, useState } from 'react';
import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import { ImageType } from 'src/@types';
import * as ImagePicker from 'expo-image-picker';
import DeletableImage from '@components/ui/DeletableImage';
import Return from '@components/ui/Return';
import { i18n } from '@lang/index';
import { useRouter } from 'expo-router';

const ImageMethod = () => {
	const router = useRouter();

	const [images, setImages] = useState<ImageType[]>([]);
	const [visible, setVisible] = useState<boolean>(false);
	const [allowContinue, setAllowContinue] = useState<boolean>(false);

	useEffect(() => {
		if (images.length) {
			setAllowContinue(true);
		} else {
			setAllowContinue(false);
		}
	}, [images]);

	const pickImage = async (method: 'camera' | 'image') => {
		const options = {
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: false,
		};

		let result: ImagePicker.ImagePickerResult;

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

	const handleReturn = () => {
		router.push('/(auth)/(tabs)/myPlants');
	};

	const width = Dimensions.get('window').width;

	return (
		<View style={styles.container}>
			<Return
				title={i18n.t('imageMethod.title')}
				subTitle={i18n.t('imageMethod.subtitle')}
				handleReturn={handleReturn}
				confirmation
			/>
			<View
				style={{
					flexGrow: 0.6,
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-around',
					paddingHorizontal: 40,
				}}>
				<Text variant="titleMedium" style={{ textAlign: 'center' }}>
					{i18n.t('imageMethod.explanation')}
				</Text>

				<View>
					<FAB
						icon="camera"
						label={i18n.t('imageMethod.camera')}
						visible
						onPress={() => pickImage('camera')}
						style={[styles.fabStyle]}
						variant="secondary"
						testID="Tirar foto"
					/>
					<FAB
						icon="image"
						label={i18n.t('imageMethod.gallery')}
						visible
						onPress={() => pickImage('image')}
						style={[styles.fabStyle]}
						variant="secondary"
						testID="Adicionar da galeria"
					/>
				</View>
			</View>
			{images.length > 0 && (
				<View
					style={{
						flex: 2,
						justifyContent: 'center',
						flexDirection: 'column',
						alignContent: 'center',
						alignItems: 'center',
					}}>
					<Carousel
						pagingEnabled={false}
						snapEnabled={false}
						autoPlay={false}
						mode={'vertical-stack'}
						modeConfig={{}}
						loop={true}
						width={width}
						data={images}
						renderItem={({ item }) => <DeletableImage image={item} remove={removeImage} />}
					/>
				</View>
			)}
			<FAB
				icon="arrow-right"
				label={visible ? i18n.t('Continue') : ''}
				onPress={() => router.push('/result')}
				style={[styles.compressedFabStyle]}
				variant="primary"
				onLongPress={() => setVisible(!visible)}
				visible={allowContinue}
				testID="Method Continue"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	fabStyle: {
		marginVertical: 20,
	},
	compressedFabStyle: {
		position: 'absolute',
		right: 40,
		bottom: 40,
	},
});

export default ImageMethod;
