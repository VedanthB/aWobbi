import { createSlice } from '@reduxjs/toolkit';
import {
  createNotify,
  deleteAllNotifies,
  getNotifies,
  isReadNotify,
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
    },
    setRemoveNotify: (state, { payload }) => {
      state.data = state.data.filter(
        (item) => item.id !== payload.id || item.url !== payload.url
      );
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
    [isReadNotify.fulfilled]: (state, { payload }) => {},
    [isReadNotify.rejected]: (state, { payload }) => {},
    [deleteAllNotifies.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
    },
    [deleteAllNotifies.rejected]: (state, { payload }) => {},
  },
});

const { reducer, actions } = notifySlice;
export const { setCreateNotify, setRemoveNotify } = actions;
export default reducer;
