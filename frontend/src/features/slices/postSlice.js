import { createSlice } from '@reduxjs/toolkit';
import { EditData } from '../../utils';
import { createPost, getPosts, updatePost } from '../actions/postActions';

const initialState = {
  loading: false,
  posts: [],
  postsLength: 0,
  page: 2,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },

  extraReducers: {
    [createPost.fulfilled]: (state, { payload }) => {
      state.posts = [payload, ...state.posts];
    },
    [createPost.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.posts = payload.posts;
      state.postsLength = payload.postsLength;
      state.page = payload.page;
    },
    [getPosts.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [updatePost.fulfilled]: (state, { payload }) => {
      state.posts = EditData(state.posts, payload._id, payload);
    },
    [updatePost.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

const { reducer, actions } = postSlice;
export const { setPostsLoading } = actions;
export default reducer;
