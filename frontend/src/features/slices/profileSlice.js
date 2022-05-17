import { createSlice } from '@reduxjs/toolkit';
import { getUser, updateUserProfileInfo } from '../actions/profileActions';

const initialState = {
  loading: false,
  ids: [],
  users: [],
  posts: [],
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
  },
});

const { reducer, actions } = profileSlice;
export const { setLoadingProfile, setId } = actions;
export default reducer;
