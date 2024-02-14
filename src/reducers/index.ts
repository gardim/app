import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Plant } from '../types';

interface DataState {
	data: Plant[];
	error: string | null;
}

const initialState: DataState = {
	data: [],
	error: null,
};

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setData: (state, action: PayloadAction<Plant[]>) => {
			state.data = action.payload;
			state.error = null;
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
});

export const { setData, setError } = dataSlice.actions;
export default dataSlice.reducer;
