/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { socket } from './app/store';
import { setUpdatePost } from './features';

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

  return <></>;
};

export default SocketClient;
