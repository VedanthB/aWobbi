import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/slices/authSlice';
import alertReducer from '../features/slices/alertSlice';
import profileReducer from '../features/slices/profileSlice';

const reducer = {
  auth: authReducer,
  alert: alertReducer,
  profile: profileReducer,
};
export const store = configureStore({
  reducer: reducer,
});

console.log(store.getState());
