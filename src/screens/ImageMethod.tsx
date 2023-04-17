import React, { useState, useContext } from 'react';
import { ImageMethodProps, ImageType } from '../types/stack';
import { identifyPlant } from '../api/plant_id';
import { LocationContext } from '../api/location';
import { convertImageToBase64 } from '../utils';
import { CameraOrGallery } from '../components/CameraOrGallery';

export function ImageMethod({ navigation }: ImageMethodProps) {
	const [images, setImages] = useState<ImageType[]>([]);
	const [buttonOnHold, setButtonOnHold] = React.useState<boolean>(false);
	const [visibleAlert, setVisibleAlert] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');
	const locationContext = useContext(LocationContext);

	const searchPlants = async () => {
		if (!buttonOnHold) {
			setButtonOnHold(true);
			try {
				const base64Images = await convertImageToBase64(images);
				const result = await identifyPlant(
					base64Images,
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
				setVisibleAlert(true);
				setImages([]);
			} finally {
				setButtonOnHold(false);
			}
		}
	};

	return (
		<>
			<CameraOrGallery
				description="Adicione algumas fotos para podermos identificar sua planta!"
				searchPlants={searchPlants}
				images={images}
				setImages={setImages}
				loading={buttonOnHold}
				errorMessage={errorMessage}
				setErrorMessage={setErrorMessage}
				visibleAlert={visibleAlert}
				setVisibleAlert={setVisibleAlert}
			/>
		</>
	);
}
