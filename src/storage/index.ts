import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plant } from '../types';
import * as Crypto from 'expo-crypto';

export const storeData = async (value: Plant) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(`@${value.id}`, jsonValue);
	} catch (e) {
		console.log(e);
		throw new Error('Ocorreu um erro ao sallet o objeto');
	}
};

export const getAllKeys = async () => {
	try {
		return (await AsyncStorage.getAllKeys()).filter((it) => it.startsWith('@'));
	} catch (e) {
		throw new Error('Ocorreu um erro ao pegar as chaves dos objetos');
	}
};

export const getMultiple = async (keys: readonly string[]) => {
	let values;
	try {
		values = await AsyncStorage.multiGet(keys);
	} catch (e) {
		console.log(e);
		throw new Error('Ocorreu um erro ao pegar os objetos');
	}
	return values;
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
		console.log(e);
		throw new Error('Ocorreu um erro ao remover o objeto');
	}
};

export const storeImage = async (plantId: string, base64: string) => {
	console.log('hereee');
	try {
		console.log(plantId);

		const contentHash = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA256,
			base64
		);

		console.log(`Saving hash ${contentHash}, with plant id ${plantId}`);
		await AsyncStorage.setItem(`b64${plantId}${contentHash}`, base64);
	} catch (e) {
		console.log(JSON.stringify(e));
		throw new Error('Ocorreu um erro ao salvar o objeto');
	}
};

export const getImages = async (plantId: string) => {
	try {
		const all = await AsyncStorage.getAllKeys();
		console.log(JSON.stringify(all));
		const keys = all.filter((it) => it.startsWith(`b64${plantId}`));
		const result = await AsyncStorage.multiGet(keys);

		return result.map((kp) => kp[1]);
	} catch (e) {
		console.log(e);
		throw new Error('Ocorreu um erro ao pegar as chaves dos objetos');
	}
};

export const cleanImages = async (plantId: string) => {
	try {
		const all = await AsyncStorage.getAllKeys();

		console.log(JSON.stringify(all));

		const keys = all.filter((it) => it.startsWith(`b64${plantId}`));

		for (const key of keys) {
			await AsyncStorage.removeItem(key);
		}
	} catch (e) {
		console.log(e);
		throw new Error('Ocorreu um erro ao remover o objeto');
	}
};
