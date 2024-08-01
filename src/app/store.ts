// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import filesReducer from '../files/filesSlice';

export const store = configureStore({
  reducer: {
    files: filesReducer,  // This key should match the one used in your selector
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

