import { configureStore } from '@reduxjs/toolkit';
import { plantSlice } from './slices/plant';

const store = configureStore({
	reducer: {
		plants: plantSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
