import { createAsyncThunk } from '@reduxjs/toolkit';
import { postDataAPI } from '../../utils';
import {
  setAlertError,
  setAlertLoading,
  setAlertSuccess,
} from '../slices/alertSlice';

// import { GLOBAL_TYPES } from './globalTypes';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setAlertLoading({ loading: true }));

      const res = await postDataAPI('login', { email, password });

      thunkAPI.dispatch(setAlertSuccess({ successMessage: res.data.msg }));

      localStorage.setItem('firstLogin', true);

      return res.data;
    } catch (e) {
      console.log('Error', e.response.data.msg);

      thunkAPI.dispatch(setAlertError({ errorMessage: e.response.data.msg }));

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);
