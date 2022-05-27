import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, { payload }) => {
      state = { ...payload.socket };
    },
  },
});

const { reducer, actions } = socketSlice;
export const { setSocket } = actions;
export default reducer;
