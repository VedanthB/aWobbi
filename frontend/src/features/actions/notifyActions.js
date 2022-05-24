import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from '../../utils';

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

export const isReadNotify = createAsyncThunk(
  'notify/isReadNotify',
  async ({ msg, auth, showToast }, thunkAPI) => {
    try {
      await patchDataAPI(`isReadNotify/${msg._id}`, null, auth.token);
    } catch (e) {
      showToast(e.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const deleteAllNotifies = createAsyncThunk(
  'notify/deleteAllNotifies',
  async ({ token, showToast }, thunkAPI) => {
    // dispatch({ type: NOTIFY_TYPES.DELETE_ALL_NOTIFIES, payload: [] });

    try {
      await deleteDataAPI('deleteAllNotify', token);

      return { data: [] };
    } catch (e) {
      showToast(e.response.data.msg, 'error');

      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);
