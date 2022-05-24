import { configureStore } from '@reduxjs/toolkit';

import createSocketIoMiddleware from 'redux-socket.io';

import io from 'socket.io-client';

import authReducer from '../features/slices/authSlice';
import alertReducer from '../features/slices/alertSlice';
import profileReducer from '../features/slices/profileSlice';
import postModalReducer from '../features/slices/postModalSlice';
import postsReducer from '../features/slices/postSlice';
import socketReducer from '../features/slices/socketSlice';
import notifyReducer from '../features/slices/notifySlice';
import messageReducer from '../features/slices/messageSlice';

const reducer = {
  auth: authReducer,
  socket: socketReducer,
  alert: alertReducer,
  profile: profileReducer,
  postModal: postModalReducer,
  posts: postsReducer,
  notify: notifyReducer,
  message: messageReducer,
};

export const socket = io();

console.log(socket);

let socketIoMiddleware = createSocketIoMiddleware(socket, 'socket/');

export const store = configureStore({
  reducer: reducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketIoMiddleware),
});

console.log(store.getState());
