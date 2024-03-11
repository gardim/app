import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError, RequestError, handleApiError } from '../utils/error';
import { Device, Plant, Response } from '../@types';
import { API } from '../services';

export const getAllPlants = createAsyncThunk<Plant[], void, { rejectValue: ApiError }>(
	'plants/getAll',
	async (_, thunkAPI) => {
		try {
			const response = await API.get('/plants');
			return response.data;
		} catch (error) {
			const requestError = error as RequestError;
			const handledError = handleApiError(requestError);
			return thunkAPI.rejectWithValue(handledError);
		}
	}
);

export const getOnePlant = createAsyncThunk<Plant, string, { rejectValue: ApiError }>(
	'plants/getOne',
	async (id, thunkAPI) => {
		try {
			const response = await API.get(`/plants/${id}`);
			return response.data;
		} catch (error) {
			const requestError = error as RequestError;
			const handledError = handleApiError(requestError);
			return thunkAPI.rejectWithValue(handledError);
		}
	}
);

export const getAllDevices = createAsyncThunk<Device[], void, { rejectValue: ApiError }>(
	'devices/getAll',
	async (_, thunkAPI) => {
		try {
			const response = await API.get('/devices');
			return response.data;
		} catch (error) {
			const requestError = error as RequestError;
			const handledError = handleApiError(requestError);
			return thunkAPI.rejectWithValue(handledError);
		}
	}
);

export const queryImage = createAsyncThunk<Response[], void, { rejectValue: ApiError }>(
	'query/image',
	async (_, thunkAPI) => {
		try {
			const response = await API.post('/plants/query/image');
			return response.data;
		} catch (error) {
			const requestError = error as RequestError;
			const handledError = handleApiError(requestError);
			return thunkAPI.rejectWithValue(handledError);
		}
	}
);

export const queryText = createAsyncThunk<Response[], void, { rejectValue: ApiError }>(
	'query/text',
	async (_, thunkAPI) => {
		try {
			const response = await API.post('/plants/query/text');
			return response.data;
		} catch (error) {
			const requestError = error as RequestError;
			const handledError = handleApiError(requestError);
			return thunkAPI.rejectWithValue(handledError);
		}
	}
);
