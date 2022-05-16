import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlertLoading: (state, { payload }) => {
      state.loading = payload.loading;
    },
    setAlertError: (state, { payload }) => {
      state.loading = false;
      state.errorMessage = payload.errorMessage;
    },
    setAlertSuccess: (state, { payload }) => {
      state.loading = false;
      state.successMessage = payload.successMessage;
    },
  },
});

const { reducer, actions } = alertSlice;
export const { setAlertLoading, setAlertError, setAlertSuccess } = actions;
export default reducer;
