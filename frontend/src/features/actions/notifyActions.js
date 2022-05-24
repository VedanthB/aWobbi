import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteDataAPI, getDataAPI, postDataAPI } from '../../utils';

export const createNotify = createAsyncThunk(
  'notify/createNotify',
  async ({ msg, auth, socket, showToast }, thunkAPI) => {
    try {
      const res = await postDataAPI('notify', msg, auth.token);

      socket.emit('createNotify', {
        ...res.data.notify,
        user: {
          username: auth.user.username,
          avatar: auth.user.avatar,
        },
      });
    } catch (e) {
      showToast(e.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const removeNotify = createAsyncThunk(
  'notify/removeNotify',
  async ({ msg, auth, socket, showToast }, thunkAPI) => {
    try {
      await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token);

      socket.emit('removeNotify', msg);
    } catch (e) {
      showToast(e.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const getNotifies = createAsyncThunk(
  'notify/getNotifies',
  async ({ token, showToast }, thunkAPI) => {
    try {
      const res = await getDataAPI('notifies', token);

      return res.data.notifies;
    } catch (e) {
      showToast(e.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);
