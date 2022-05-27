import { configureStore } from '@reduxjs/toolkit';

import createSocketIoMiddleware from 'redux-socket.io';

import io from 'socket.io-client';

import authReducer from '../features/slices/authSlice';
import alertReducer from '../features/slices/alertSlice';
import profileReducer from '../features/slices/profileSlice';
import postModalReducer from '../features/slices/postModalSlice';
import postsReducer from '../features/slices/postSlice';

import notifyReducer from '../features/slices/notifySlice';
import messageReducer from '../features/slices/messageSlice';

import onlineReducer from '../features/slices/onlineSlice';

const reducer = {
  auth: authReducer,
  alert: alertReducer,
  profile: profileReducer,
  postModal: postModalReducer,
  posts: postsReducer,
  notify: notifyReducer,
  message: messageReducer,
  online: onlineReducer,
};

export const socket = io();

let socketIoMiddleware = createSocketIoMiddleware(socket, 'socket/');

export const store = configureStore({
  reducer: reducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketIoMiddleware),
});
