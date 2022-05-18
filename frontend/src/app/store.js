import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/slices/authSlice';
import alertReducer from '../features/slices/alertSlice';
import profileReducer from '../features/slices/profileSlice';
import postModalReducer from '../features/slices/postModalSlice';

const reducer = {
  auth: authReducer,
  alert: alertReducer,
  profile: profileReducer,
  postModal: postModalReducer,
};
export const store = configureStore({
  reducer: reducer,
});

console.log(store.getState());
