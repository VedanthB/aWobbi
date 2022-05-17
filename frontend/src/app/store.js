import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/slices/authSlice';
import alertReducer from '../features/slices/alertSlice';

const reducer = {
  auth: authReducer,
  alert: alertReducer,
};
export const store = configureStore({
  reducer: reducer,
});

console.log(store.getState());
