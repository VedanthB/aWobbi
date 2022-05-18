import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getDataAPI,
  patchDataAPI,
  postDataAPI,
  uploadImage,
} from '../../utils';
import { setAlertLoading } from '../slices/alertSlice';
import { setPostsLoading } from '../slices/postSlice';

export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ content, images, auth, showToast }, thunkAPI) => {
    let media = [];

    try {
      thunkAPI.dispatch(setAlertLoading({ loading: true }));

      if (images.length > 0) media = await uploadImage(images);

      const res = await postDataAPI(
        'posts',
        { content, images: media },
        auth.token
      );

      thunkAPI.dispatch(setAlertLoading({ loading: false }));

      showToast('Created Post', 'success');

      return { ...res.data.newPost, user: auth.user };
    } catch (error) {
      showToast(error.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async ({ token, showToast }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setPostsLoading({ loading: true }));

      const res = await getDataAPI('posts', token);

      thunkAPI.dispatch(setPostsLoading({ loading: false }));

      return { ...res.data, page: 2 };
    } catch (error) {
      thunkAPI.dispatch(setPostsLoading({ loading: false }));

      showToast(error.response.data.msg, 'error');
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
