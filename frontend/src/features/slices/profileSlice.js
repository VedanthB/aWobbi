import { createSlice } from '@reduxjs/toolkit';
import { getUser } from '../actions/profileActions';

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
      state.id.push(payload.id);
      console.log(payload.id);
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, { payload }) => {
      state.users.push(payload.user);
      console.log(payload);
    },
    [getUser.rejected]: (state, { payload }) => {
      state.loading = false;
      console.log(payload);
    },
  },
});

const { reducer, actions } = profileSlice;
export const { setLoadingProfile, setId } = actions;
export default reducer;
