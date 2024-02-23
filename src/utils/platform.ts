import { Platform } from 'react-native';

interface PlatformUtils {
	isIos: boolean;
	isAndroid: boolean;
	isWeb: boolean;
}

const PlatformUtils: PlatformUtils = {
	isIos: Platform.OS === 'ios',
	isAndroid: Platform.OS === 'android',
	isWeb: Platform.OS !== 'ios' && Platform.OS !== 'android',
};

export default PlatformUtils;
