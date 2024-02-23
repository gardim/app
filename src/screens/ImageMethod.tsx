import { useState } from 'react';
import * as React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { DeletableImage } from '../components/elements/DeletableImage';
import { FAB, Text } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import { ImageType } from '../types';

export function ImageMethod() {
	const [images, setImages] = useState<ImageType[]>([]);
	const [visible, setVisible] = React.useState<boolean>(false);
	const [buttonOnHold, setButtonOnHold] = React.useState<boolean>(false);

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
			console.log('');
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
						visible
						style={[styles.fabStyle]}
						variant="secondary"
						testID="Tirar foto"
					/>
					<FAB
						icon="image"
						label="Adicionar da galeria"
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
