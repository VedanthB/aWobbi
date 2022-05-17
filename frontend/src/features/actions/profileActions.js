// LOADING: "LOADING_PROFILE",
// GET_USER: "GET_PROFILE_USER",
// FOLLOW: "FOLLOW",
// UNFOLLOW: "UNFOLLOW",
// GET_ID: "GET_PROFILE_ID",
// GET_POSTS: "GET_PROFILE_POSTS",
// UPDATE_POST: "UPDATE_PROFILE_POST",

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDataAPI } from '../../utils';
import { setId, setLoadingProfile } from '../slices/profileSlice';

export const getUser = createAsyncThunk(
  'profile/getUser',
  async ({ id, auth, showToast }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setId({ id: id }));

      thunkAPI.dispatch(setLoadingProfile({ loading: true }));

      const res = await getDataAPI(`/user/${id}`, auth.token);

      thunkAPI.dispatch(setLoadingProfile({ loading: false }));

      return res.data;
    } catch (e) {
      thunkAPI.dispatch(setLoadingProfile({ loading: false }));

      showToast(e.response.data.msg, 'error');

      console.log(e.response.data.msg);

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);
