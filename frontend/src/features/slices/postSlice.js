import { createSlice } from '@reduxjs/toolkit';
import { DeleteData, EditData } from '../../utils';
import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  getPosts,
  likeComment,
  likePost,
  savePost,
  unLikeComment,
  unlikePost,
  unSavePost,
  updateComment,
  updatePost,
} from '../actions/postActions';

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
      state.loading = payload.loading;
    },
    setPosts: (state, { payload }) => {
      state.posts = payload.posts;
      state.postsLength = payload.postsLength;
      state.page = payload.page;
    },
    setUpdatePost: (state, { payload }) => {
      const index = state.posts.findIndex((el) => el._id === payload._id);

      state.posts[index] = payload;
    },
  },

  extraReducers: {
    [createPost.fulfilled]: (state, { payload }) => {
      console.log(payload);
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
      const index = state.posts.findIndex((el) => el._id === payload._id);

      state.posts[index] = payload;
    },
    [updatePost.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [deletePost.fulfilled]: (state, { payload }) => {
      state.posts = DeleteData(state.posts, payload._id);
    },
    [deletePost.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [likePost.fulfilled]: (state, { payload }) => {
      const index = state.posts.findIndex((el) => el._id === payload._id);

      state.posts[index] = payload;
    },
    [likePost.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [unlikePost.fulfilled]: (state, { payload }) => {
      const index = state.posts.findIndex((el) => el._id === payload._id);

      state.posts[index] = payload;
    },
    [unlikePost.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [savePost.fulfilled]: (state, { payload }) => {
      // state.posts = EditData(state.posts, payload._id, payload);
    },
    [savePost.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [unSavePost.fulfilled]: (state, { payload }) => {
      // state.posts = EditData(state.posts, payload._id, payload);
    },
    [unSavePost.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [createComment.fulfilled]: (state, { payload }) => {
      const index = state.posts.findIndex((el) => el._id === payload._id);

      state.posts[index] = payload;
    },
    [createComment.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [updateComment.fulfilled]: (state, { payload }) => {
      const index = state.posts.findIndex((el) => el._id === payload._id);

      state.posts[index] = payload;
    },
    [updateComment.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [likeComment.fulfilled]: (state, { payload }) => {
      const index = state.posts.findIndex((el) => el._id === payload._id);

      state.posts[index] = payload;
    },
    [likeComment.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [unLikeComment.fulfilled]: (state, { payload }) => {
      state.posts = EditData(state.posts, payload._id, payload);
    },
    [unLikeComment.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [deleteComment.fulfilled]: (state, { payload }) => {
      const index = state.posts.findIndex((el) => el._id === payload._id);

      state.posts[index] = payload;
    },
    [deleteComment.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

const { reducer, actions } = postSlice;
export const { setPostsLoading, setPosts, setUpdatePost } = actions;
export default reducer;
