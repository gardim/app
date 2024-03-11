import { configureStore } from '@reduxjs/toolkit';
import { plantSlice } from './slices/plant';
import { deviceSlice } from './slices/device';
import { responseSlice } from './slices/response';

const store = configureStore({
	reducer: {
		plants: plantSlice.reducer,
		devices: deviceSlice.reducer,
		response: responseSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
