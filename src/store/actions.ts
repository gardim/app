import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiError, handleApiError } from '../utils/error';
import { Device, Plant } from '../@types';
import { API } from '../services';

export const getAllPlants = createAsyncThunk<Plant[], void, { rejectValue: ApiError }>(
	'plants/getAll',
	async (_, thunkAPI) => {
		try {
			const response = await API.get('/plants');
			return response.data;
		} catch (error) {
			const handledError = handleApiError(error);
			return thunkAPI.rejectWithValue(handledError);
		}
	}
);

export const getAllDevices = createAsyncThunk<Device[], void, { rejectValue: ApiError }>(
	'devices/getAll',
	async (_, thunkAPI) => {
		try {
			const response = await API.get('/devices');
			console.log(response.data);
			return response.data;
		} catch (error) {
			const handledError = handleApiError(error);
			return thunkAPI.rejectWithValue(handledError);
		}
	}
);
