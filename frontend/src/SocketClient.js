import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { socket } from './app/store';

const SocketClient = () => {
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    socket.emit('joinUser', auth.user._id);
  }, [socket]);

  return <></>;
};

export default SocketClient;
