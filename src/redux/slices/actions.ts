import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiError, handleApiError } from '../../utils/error';
import { Plant } from '../../types';

export const getAllPlants = createAsyncThunk<Plant[], void, { rejectValue: ApiError }>(
	'plants/getAll',
	async (_, thunkAPI) => {
		try {
			const response = await axios.get('https://65cc2c8fdd519126b83e1843.mockapi.io/plants');

			return response.data;
		} catch (error) {
			const handledError = handleApiError(error);
			return thunkAPI.rejectWithValue(handledError);
		}
	}
);
