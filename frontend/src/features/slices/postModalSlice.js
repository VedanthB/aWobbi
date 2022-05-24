import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  onEdit: false,
  editPost: {},
};

const postModalSlice = createSlice({
  name: 'postModal',
  initialState,
  reducers: {
    setPostModal: (state, { payload }) => {
      state.isModalOpen = payload.isModalOpen;
    },
    setEditPostModal: (state, { payload }) => {
      console.log();
      state.isModalOpen = payload.isModalOpen;
      state.onEdit = payload.onEdit;
      state.editPost = { ...payload.editPost };
    },
  },
});

const { reducer, actions } = postModalSlice;
export const { setPostModal, setEditPostModal } = actions;
export default reducer;
