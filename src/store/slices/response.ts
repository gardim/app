import { createSlice } from '@reduxjs/toolkit';
import { Response } from '../../@types';
import { queryImage, queryText } from '../actions';
import { ApiError } from '../../utils/error';

interface ResponseState {
	loading: boolean;
	response: Response[];
	error?: ApiError;
}

const initialState: ResponseState = {
	response: [],
	error: undefined,
	loading: false,
};

export const responseSlice = createSlice({
	name: 'response',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(queryImage.pending, (state) => {
			state.loading = true;
			state.error = undefined;
		});
		builder.addCase(queryText.pending, (state) => {
			state.loading = true;
			state.error = undefined;
		});

		builder.addCase(queryImage.fulfilled, (state, action) => {
			state.loading = false;
			state.response = action.payload;
			state.error = undefined;
		});
		builder.addCase(queryText.fulfilled, (state, action) => {
			state.loading = false;
			state.response = action.payload;
			state.error = undefined;
		});

		builder.addCase(queryImage.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(queryText.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export default responseSlice.reducer;
