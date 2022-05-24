// LOADING: "LOADING_PROFILE",
// GET_USER: "GET_PROFILE_USER",
// FOLLOW: "FOLLOW",
// UNFOLLOW: "UNFOLLOW",
// GET_ID: "GET_PROFILE_ID",
// GET_POSTS: "GET_PROFILE_POSTS",
// UPDATE_POST: "UPDATE_PROFILE_POST",

import { createAsyncThunk } from '@reduxjs/toolkit';
import { socket } from '../../app/store';
import { DeleteData, getDataAPI, patchDataAPI, uploadImage } from '../../utils';
import { setAlertLoading } from '../slices/alertSlice';
import { setAuth } from '../slices/authSlice';
import {
  setFollowUser,
  setId,
  setLoadingProfile,
  setUnFollowUser,
} from '../slices/profileSlice';

export const getUser = createAsyncThunk(
  'profile/getUser',
  async ({ id, auth, showToast }, thunkAPI) => {
    thunkAPI.dispatch(setId({ id: id }));

    try {
      thunkAPI.dispatch(setLoadingProfile({ loading: true }));

      const res = getDataAPI(`user/${id}`, auth.token);

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

export const followUser = createAsyncThunk(
  'profile/followUser',
  async ({ users, user, auth, showToast }, thunkAPI) => {
    let newUser;

    if (users.every((item) => item._id !== user._id)) {
      // if user is not there in profile.users
      newUser = { ...user, followers: [...user.followers, auth.user] };
    } else {
      // if user is  there in profile.users
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = { ...item, followers: [...item.followers, auth.user] };
        }
      });
    }

    thunkAPI.dispatch(setFollowUser({ ...newUser }));

    thunkAPI.dispatch(
      setAuth({
        ...auth,
        user: { ...auth.user, following: [...auth.user.following, newUser] },
      })
    );
    try {
      const res = await patchDataAPI(
        `user/${user._id}/follow`,
        null,
        auth.token
      );

      socket.emit('follow', res.data.newUser);

      showToast('Followed User', 'success');

      return res;
    } catch (e) {
      showToast(e.response.data.msg, 'error');

      console.log(e.response.data.msg);

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const unFollowUser = createAsyncThunk(
  'profile/unFollowUser',
  async ({ users, user, auth, showToast }, thunkAPI) => {
    let newUser;

    if (users.every((item) => item._id !== user._id)) {
      // if user is not there in profile.users
      newUser = {
        ...user,
        followers: DeleteData(user.followers, auth.user._id),
      };
    } else {
      // if user is  there in profile.users
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = {
            ...item,
            followers: DeleteData(item.followers, auth.user._id),
          };
        }
      });
    }

    thunkAPI.dispatch(setUnFollowUser({ ...newUser }));

    thunkAPI.dispatch(
      setAuth({
        ...auth,
        user: {
          ...auth.user,
          following: DeleteData(auth.user.following, newUser._id),
        },
      })
    );

    try {
      const res = await patchDataAPI(
        `user/${user._id}/unfollow`,
        null,
        auth.token
      );

      socket.emit('unFollow', res.data.newUser);

      showToast('UnFollowed User', 'success');

      return res;
    } catch (e) {
      showToast(e.response.data.msg, 'error');

      console.log(e.response.data.msg);

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);
