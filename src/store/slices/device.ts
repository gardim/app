import { createSlice } from '@reduxjs/toolkit';
import { Device } from '../../@types';
import { getAllDevices } from '../actions';
import { ApiError } from '../../utils/error';

interface DeviceState {
	loading: boolean;
	devices: Device[];
	error?: ApiError;
}

const initialState: DeviceState = {
	devices: [],
	error: undefined,
	loading: false,
};

export const deviceSlice = createSlice({
	name: 'device',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllDevices.pending, (state) => {
			state.loading = true;
			state.error = undefined;
		});
		builder.addCase(getAllDevices.fulfilled, (state, action) => {
			state.loading = false;
			state.devices = action.payload;
			state.error = undefined;
		});
		builder.addCase(getAllDevices.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export default deviceSlice.reducer;
