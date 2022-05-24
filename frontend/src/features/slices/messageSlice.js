import { createSlice } from '@reduxjs/toolkit';
import { DeleteData } from '../../utils';
import {
  addMessage,
  deleteConversation,
  deleteMessages,
  getConversations,
  getMessages,
  loadMoreMessages,
} from '../actions/messageAction';

const initialState = {
  users: [],
  resultUsers: 0,
  data: [],
  firstLoad: false,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setAddMessage: (state, { payload }) => {
      state.data = state.data.map((item) =>
        item._id === payload.recipient || item._id === payload.sender
          ? {
              ...item,
              messages: [...item.messages, payload],
              result: item.result + 1,
            }
          : item
      );
      state.users = state.users.map((user) =>
        user._id === payload.recipient || user._id === payload.sender
          ? {
              ...user,
              text: payload.text,
              media: payload.media,
              call: payload.call,
            }
          : user
      );
    },
    setGetConversations: (state, { payload }) => {
      state.users = payload.newArr;
      state.resultUsers = payload.result;
      state.firstLoad = true;
    },
  },
  extraReducers: {
    [addMessage.fulfilled]: (state, { payload }) => {},
    [addMessage.rejected]: (state, { payload }) => {},
    [getConversations.fulfilled]: (state, { payload }) => {},
    [getConversations.rejected]: (state, { payload }) => {},
    [getMessages.fulfilled]: (state, { payload }) => {
      state.data = [...state.data, payload];
    },
    [getMessages.rejected]: (state, { payload }) => {},
    [loadMoreMessages.fulfilled]: (state, { payload }) => {
      const index = state.data.findIndex((el) => el._id === payload._id);

      state.data[index] = payload;
    },
    [loadMoreMessages.rejected]: (state, { payload }) => {},
    [deleteMessages.fulfilled]: (state, { payload }) => {
      state.data = state.data.map((item) =>
        item._id === payload._id ? { ...item, messages: payload.newData } : item
      );
    },
    [deleteMessages.rejected]: (state, { payload }) => {},
    [deleteConversation.fulfilled]: (state, { payload }) => {
      state.users = DeleteData(state.users, payload);
      state.data = DeleteData(state.data, payload);
    },
    [deleteConversation.rejected]: (state, { payload }) => {},
  },
});

const { reducer, actions } = messageSlice;
export const { setAddMessage, setGetConversations } = actions;
export default reducer;
