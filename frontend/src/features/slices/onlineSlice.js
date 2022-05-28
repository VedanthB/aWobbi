import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const onlineSlice = createSlice({
  name: 'online',
  initialState,
  reducers: {
    setOnline: (state, { payload }) => {
      state.push(payload);
    },
    setOffOnline: (state, { payload }) => {
      state.filter((item) => item !== payload);
    },
  },
});

const { reducer, actions } = onlineSlice;
export const { setOffOnline, setOnline } = actions;
export default reducer;
