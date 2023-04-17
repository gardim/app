import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { ImageType } from '../../types';

export const getImages = async (method: 'camera' | 'gallery'): Promise<ImageType> => {
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
		return {
			id: result.assets[0].assetId ? result.assets[0].assetId : uuid.v4().toString(),
			uri: result.assets[0].uri,
		};
	} else {
		throw Error();
	}
};
