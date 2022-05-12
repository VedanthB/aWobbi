import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../actions/authActions';

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.access_token;
    },

    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
