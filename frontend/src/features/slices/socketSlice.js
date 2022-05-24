import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, { payload }) => {
      console.log(payload.socket);
      state = { ...payload.socket };
      console.log(state);
    },
  },
});

const { reducer, actions } = socketSlice;
export const { setSocket } = actions;
export default reducer;
