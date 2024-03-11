import { createSlice } from '@reduxjs/toolkit';
import { Plant } from '../../@types';
import { getAllPlants, getOnePlant } from '../actions';
import { ApiError } from '../../utils/error';

interface PlantState {
	loading: boolean;
	plants: Plant[];
	currentPlant: Plant | undefined;
	error?: ApiError;
}

const initialState: PlantState = {
	plants: [],
	currentPlant: undefined,
	error: undefined,
	loading: false,
};

export const plantSlice = createSlice({
	name: 'plant',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllPlants.pending, (state) => {
			state.loading = true;
			state.error = undefined;
		});
		builder.addCase(getAllPlants.fulfilled, (state, action) => {
			state.loading = false;
			state.plants = action.payload;
			state.error = undefined;
		});
		builder.addCase(getAllPlants.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});

		builder.addCase(getOnePlant.pending, (state) => {
			state.loading = true;
			state.error = undefined;
		});
		builder.addCase(getOnePlant.fulfilled, (state, action) => {
			state.loading = false;
			state.currentPlant = action.payload;
			state.error = undefined;
		});
		builder.addCase(getOnePlant.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export default plantSlice.reducer;
