// LOADING: "LOADING_PROFILE",
// GET_USER: "GET_PROFILE_USER",
// FOLLOW: "FOLLOW",
// UNFOLLOW: "UNFOLLOW",
// GET_ID: "GET_PROFILE_ID",
// GET_POSTS: "GET_PROFILE_POSTS",
// UPDATE_POST: "UPDATE_PROFILE_POST",

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDataAPI, patchDataAPI, uploadImage } from '../../utils';
import { setAlertLoading } from '../slices/alertSlice';
import { setAuth } from '../slices/authSlice';
import { setId, setLoadingProfile } from '../slices/profileSlice';

export const getUser = createAsyncThunk(
  'profile/getUser',
  async ({ id, auth, showToast }, thunkAPI) => {
    thunkAPI.dispatch(setId({ id: id }));

    try {
      thunkAPI.dispatch(setLoadingProfile({ loading: true }));

      const res = getDataAPI(`/user/${id}`, auth.token);

      const users = await res;

      console.log(users);

      thunkAPI.dispatch(setLoadingProfile({ loading: false }));

      return users.data;
    } catch (e) {
      thunkAPI.dispatch(setLoadingProfile({ loading: false }));

      showToast(e.response.data.msg, 'error');

      console.log(e.response.data.msg);

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const updateUserProfileInfo = createAsyncThunk(
  'profile/updateUserProfileInfo',
  async ({ userData, auth, avatar, showToast }, thunkAPI) => {
    if (!userData.fullName)
      return showToast('Please add your full name.', 'error');

    if (userData.fullName.length > 25)
      return showToast('Your full name is too long.', 'error');

    if (userData.story.length > 200)
      return showToast('Your story is too long.', 'error');

    try {
      let media;

      thunkAPI.dispatch(setAlertLoading({ loading: true }));

      if (avatar) media = await uploadImage([avatar]);

      const res = await patchDataAPI(
        'user',
        {
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
        auth.token
      );

      thunkAPI.dispatch(
        setAuth({
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar,
          },
        })
      );

      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      showToast(res.data.msg, 'success');

      return { media, auth, avatar, userData };
    } catch (e) {
      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      showToast(e.response.data.msg, 'error');

      console.log(e.response.data.msg);

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);
