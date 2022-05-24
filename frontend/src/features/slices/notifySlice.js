import { createSlice } from '@reduxjs/toolkit';
import {
  createNotify,
  getNotifies,
  removeNotify,
} from '../actions/notifyActions';

const initialState = {
  loading: false,
  data: [],
  sound: false,
};

const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    setCreateNotify: (state, { payload }) => {
      state.data.push(payload);
      console.log(payload);
    },
  },
  extraReducers: {
    [createNotify.fulfilled]: (state, { payload }) => {},
    [createNotify.rejected]: (state, { payload }) => {},
    [removeNotify.fulfilled]: (state, { payload }) => {},
    [removeNotify.rejected]: (state, { payload }) => {},
    [getNotifies.fulfilled]: (state, { payload }) => {
      state.data = [...payload];
    },
    [getNotifies.rejected]: (state, { payload }) => {},
  },
});

const { reducer, actions } = notifySlice;
export const { setCreateNotify } = actions;
export default reducer;
