/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { socket } from './app/store';
import {
  setAuth,
  setCreateNotify,
  setRemoveNotify,
  setUpdatePost,
} from './features';

const SocketClient = () => {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit('joinUser', auth.user._id);
  }, [socket]);

  // Likes
  useEffect(() => {
    socket.on('likeToClient', (newPost) => {
      dispatch(setUpdatePost({ ...newPost }));
    });

    return () => socket.off('likeToClient');
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on('unLikeToClient', (newPost) => {
      dispatch(setUpdatePost({ ...newPost }));
    });

    return () => socket.off('unLikeToClient');
  }, [socket, dispatch]);

  // Comments
  useEffect(() => {
    socket.on('createCommentToClient', (newPost) => {
      dispatch(setUpdatePost({ ...newPost }));
    });

    return () => socket.off('createCommentToClient');
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on('deleteCommentToClient', (newPost) => {
      dispatch(setUpdatePost({ ...newPost }));
    });

    return () => socket.off('deleteCommentToClient');
  }, [socket, dispatch]);

  // Follow
  useEffect(() => {
    socket.on('followToClient', (newUser) => {
      dispatch(setAuth({ ...auth, user: newUser }));
    });

    return () => socket.off('followToClient');
  }, [socket, dispatch, auth]);

  useEffect(() => {
    socket.on('unFollowToClient', (newUser) => {
      dispatch(setAuth({ ...auth, user: newUser }));
    });

    return () => socket.off('unFollowToClient');
  }, [socket, dispatch, auth]);

  // Notification
  useEffect(() => {
    socket.on('createNotifyToClient', (msg) => {
      dispatch(setCreateNotify(msg));
    });

    return () => socket.off('createNotifyToClient');
  }, [socket, dispatch]);

  useEffect(() => {
    socket.on('removeNotifyToClient', (msg) => {
      dispatch(setRemoveNotify(msg));
    });

    return () => socket.off('removeNotifyToClient');
  }, [socket, dispatch]);

  return <></>;
};

export default SocketClient;
