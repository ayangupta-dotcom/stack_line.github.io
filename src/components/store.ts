// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import productLoaderReducer from './productLoaderSlice';

export const store = configureStore({
  reducer: {
    productLoader: productLoaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


