import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
};

const postModalSlice = createSlice({
  name: 'postModal',
  initialState,
  reducers: {
    setPostModal: (state, { payload }) => {
      console.log(payload);
      state.isModalOpen = payload.isModalOpen;
    },
  },
});

const { reducer, actions } = postModalSlice;
export const { setPostModal } = actions;
export default reducer;
