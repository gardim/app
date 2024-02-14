import { configureStore } from '@reduxjs/toolkit';
import { plantsSlice } from '../reducers/plantsSlice';

const store = configureStore({
	reducer: {
		plants: plantsSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
