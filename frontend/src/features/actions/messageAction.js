import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  DeleteData,
  deleteDataAPI,
  getDataAPI,
  postDataAPI,
} from '../../utils';
import { setAddMessage, setGetConversations } from '../slices/messageSlice';

export const addMessage = createAsyncThunk(
  'message/addMessage',
  async ({ msg, auth, socket, showToast }, thunkAPI) => {
    thunkAPI.dispatch(setAddMessage(msg));
    const { _id, avatar, fullName, userName } = auth.user;

    socket.emit('addMessage', {
      ...msg,
      user: { _id, avatar, fullName, userName },
    });

    try {
      await postDataAPI('message', msg, auth.token);
    } catch (e) {
      showToast(e.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const getConversations = createAsyncThunk(
  'message/getConversations',
  async ({ auth, page = 1, showToast }, thunkAPI) => {
    try {
      const res = await getDataAPI(
        `conversations?limit=${page * 9}`,
        auth.token
      );

      console.log(res);

      let newArr = [];

      res.data.conversations.forEach((item) => {
        item.recipients.forEach((cv) => {
          if (cv._id !== auth.user._id) {
            newArr.push({
              ...cv,
              text: item.text,
              media: item.media,
              call: item.call,
            });
          }
        });
      });

      thunkAPI.dispatch(
        setGetConversations({ newArr, result: res.data.result })
      );
    } catch (e) {
      showToast(e.res.data.msg, 'error');

      return thunkAPI.rejectWithValue(e.res.data.msg);
    }
  }
);

export const getMessages = createAsyncThunk(
  'message/getMessages',
  async ({ id, auth, page = 1, showToast }, thunkAPI) => {
    try {
      const res = await getDataAPI(
        `message/${id}?limit=${page * 9}`,
        auth.token
      );
      const newData = { ...res.data, messages: res.data.messages.reverse() };

      //   dispatch({
      //     type: MESS_TYPES.GET_MESSAGES,
      //     payload: { ...newData, _id: id, page },
      //   });
      return { ...newData, _id: id, page };
    } catch (e) {
      showToast(e.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const loadMoreMessages = createAsyncThunk(
  'message/loadMoreMessages',
  async ({ id, auth, page = 1, showToast }, thunkAPI) => {
    try {
      const res = await getDataAPI(
        `message/${id}?limit=${page * 9}`,
        auth.token
      );
      const newData = { ...res.data, messages: res.data.messages.reverse() };

      //   dispatch({
      //     type: MESS_TYPES.UPDATE_MESSAGES,
      //     payload: { ...newData, _id: id, page },
      //   });
      return { ...newData, _id: id, page };
    } catch (e) {
      showToast(e.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const deleteMessages = createAsyncThunk(
  'message/deleteMessages',
  async ({ msg, data, auth, showToast }, thunkAPI) => {
    const newData = DeleteData(data, msg._id);

    // dispatch({
    //   type: MESS_TYPES.DELETE_MESSAGES,
    //   payload: { newData, _id: msg.recipient },
    // });
    try {
      await deleteDataAPI(`message/${msg._id}`, auth.token);

      return { newData, _id: msg.recipient };
    } catch (e) {
      showToast(e.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const deleteConversation = createAsyncThunk(
  'message/deleteConversation',
  async ({ id, auth, showToast }, thunkAPI) => {
    // dispatch({ type: MESS_TYPES.DELETE_CONVERSATION, payload: id });

    try {
      await deleteDataAPI(`conversation/${id}`, auth.token);
      return id;
    } catch (e) {
      showToast(e.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);
