import axios from 'axios';

export const API = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
});
