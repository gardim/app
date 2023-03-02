import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plant } from '../types/index';

export const storeData = async (value: Plant) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(`@${value.id}`, jsonValue);
	} catch (e) {
		throw new Error('Ocorreu um erro ao salvar o objeto');
	}
};

export const getAllKeys = async () => {
	try {
		return await AsyncStorage.getAllKeys();
	} catch (e) {
		throw new Error('Ocorreu um erro ao pegar as chaves dos objetos');
	}
};

export const getMultiple = async (keys: string[]) => {
	let values;
	try {
		values = await AsyncStorage.multiGet(keys);
	} catch (e) {
		throw new Error('Ocorreu um erro ao pegar os objetos');
	}

	return values.map((it) => it as Plant);
};

export const getOne = async (key: string) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		return jsonValue != null ? (JSON.parse(jsonValue) as Plant) : null;
	} catch (e) {
		throw new Error('Ocorreu um erro ao pegar o objeto');
	}
};

export const removeValue = async (key: string) => {
	try {
		await AsyncStorage.removeItem(key);
	} catch (e) {
		throw new Error('Ocorreu um erro ao remover o objeto');
	}
};
