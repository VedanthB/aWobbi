/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { socket } from './app/store';
import {
  setAddMessage,
  setAddUser,
  setAuth,
  setCreateNotify,
  setOffOnline,
  setOnline,
  setRemoveNotify,
  setUpdatePost,
} from './features';

const SocketClient = () => {
  const { auth, online } = useSelector((state) => state);

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

  // Message
  useEffect(() => {
    socket.on('addMessageToClient', (msg) => {
      dispatch(setAddMessage(msg));

      dispatch(
        setAddUser({
          ...msg.user,
          text: msg.text,
          media: msg.media,
        })
      );
    });

    return () => socket.off('addMessageToClient');
  }, [socket, dispatch]);

  // Check User Online / Offline
  useEffect(() => {
    socket.emit('checkUserOnline', auth.user);
  }, [socket, auth.user]);

  useEffect(() => {
    socket.on('checkUserOnlineToMe', (data) => {
      data.forEach((item) => {
        if (!online.includes(item.id)) {
          dispatch(setOnline(item.id));
        }
      });
    });

    return () => socket.off('checkUserOnlineToMe');
  }, [socket, dispatch, online]);

  useEffect(() => {
    socket.on('checkUserOnlineToClient', (id) => {
      if (!online.includes(id)) {
        dispatch(setOnline(id));
      }
    });

    return () => socket.off('checkUserOnlineToClient');
  }, [socket, dispatch, online]);

  // Check User Offline
  useEffect(() => {
    socket.on('CheckUserOffline', (id) => {
      dispatch(setOffOnline(id));
    });

    return () => socket.off('CheckUserOffline');
  }, [socket, dispatch]);

  return <></>;
};

export default SocketClient;
