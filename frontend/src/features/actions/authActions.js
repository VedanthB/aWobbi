import { createAsyncThunk } from '@reduxjs/toolkit';
import { postDataAPI } from '../../utils';
import { setAlertLoading } from '../slices/alertSlice';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, showToast }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAlertLoading({ loading: true }));

      const res = await postDataAPI('login', { email, password });

      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      showToast(res.data.msg, 'success');

      localStorage.setItem('firstLogin', true);

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
