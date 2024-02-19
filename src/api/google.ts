import axios from 'axios';
import { User } from '@react-native-google-signin/google-signin';

const API = (token: string) =>
	axios.create({
		baseURL: process.env.EXPO_PUBLIC_GOOGLE_URL,
		headers: { Authorization: 'Bearer ' + token },
	});

export const getUserInfo = async (token: string): Promise<User> => {
	if (!token) return;
	const response = await API(token).get('/userinfo/v2/me');
	return response.data;
};
