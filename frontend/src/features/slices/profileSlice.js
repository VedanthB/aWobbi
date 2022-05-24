import { createSlice } from '@reduxjs/toolkit';

import {
  followUser,
  getSuggestions,
  getUser,
  unFollowUser,
  updateUserProfileInfo,
} from '../actions/profileActions';

const initialState = {
  loading: false,
  ids: [],
  users: [],
  posts: [],
  suggestionLoading: false,
  suggestionsUsers: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLoadingProfile: (state, { payload }) => {
      state.loading = payload.loading;
    },
    setId: (state, { payload }) => {
      state.ids.push(payload.id);
    },
    setFollowUser: (state, { payload }) => {
      const index = state.users.findIndex((el) => el._id === payload._id);

      state.users[index] = payload;
    },
    setUnFollowUser: (state, { payload }) => {
      const index = state.users.findIndex((el) => el._id === payload._id);

      state.users[index] = payload;
    },
    setSuggestionLoading: (state, { payload }) => {
      state.suggestionLoading = payload;
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, { payload }) => {
      state.users.push(payload.user);
    },
    [getUser.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [updateUserProfileInfo.fulfilled]: (state, { payload }) => {},
    [updateUserProfileInfo.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [followUser.fulfilled]: (state, { payload }) => {},
    [followUser.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [unFollowUser.fulfilled]: (state, { payload }) => {},
    [unFollowUser.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    [getSuggestions.fulfilled]: (state, { payload }) => {
      state.suggestionsUsers = payload.users;
    },
    [getSuggestions.rejected]: (state, { payload }) => {
      state.suggestionLoading = false;
    },
  },
});

const { reducer, actions } = profileSlice;
export const {
  setLoadingProfile,
  setId,
  setFollowUser,
  setUnFollowUser,
  setSuggestionLoading,
} = actions;
export default reducer;
