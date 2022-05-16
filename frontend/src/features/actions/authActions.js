import { createAsyncThunk } from '@reduxjs/toolkit';
import { postDataAPI } from '../../utils';
import { setAlertLoading } from '../slices/alertSlice';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, showToast, navigateTo }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAlertLoading({ loading: true }));

      const res = await postDataAPI('login', { email, password });

      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      showToast(res.data.msg, 'success');

      localStorage.setItem('firstLogin', true);

      navigateTo();

      return res.data;
    } catch (e) {
      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      showToast(e.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (showToast, thunkAPI) => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      thunkAPI.dispatch(setAlertLoading({ loading: true }));

      try {
        const res = await postDataAPI('refresh_token');

        thunkAPI.dispatch(setAlertLoading({ loading: false }));

        return res.data;
      } catch (e) {
        thunkAPI.dispatch(setAlertLoading({ loading: false }));

        showToast(e.response.data.msg, 'error');

        return thunkAPI.rejectWithValue(e.response.data.msg);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    { fullName, email, password, userName, gender, showToast, navigateTo },
    thunkAPI
  ) => {
    try {
      thunkAPI.dispatch(setAlertLoading({ loading: true }));

      const res = await postDataAPI('register', {
        fullName,
        email,
        password,
        userName,
        gender,
      });

      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      showToast(res.data.msg, 'success');

      localStorage.setItem('firstLogin', true);

      navigateTo();

      return res.data;
    } catch (e) {
      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      showToast(e.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async ({ showToast, navigateTo }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAlertLoading({ loading: true }));

      localStorage.removeItem('firstLogin');

      await postDataAPI('logout');

      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      navigateTo();
    } catch (e) {
      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      showToast(e.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);
