import React, { useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { imageShow, uploadImage, videoShow } from '../../utils';
import {
  addMessage,
  deleteConversation,
  getMessages,
  loadMoreMessages,
} from '../../features';
import { useToast } from '../../hooks';
import Icons from '../Icons';
import MsgDisplay from './MsgDisplay';
import UserCard from './UserCard';
import { socket } from '../../app/store';
import { BsImages } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';

const RightSide = () => {
  const { auth, message } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [text, setText] = useState('');
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);

  const refDisplay = useRef();
  const pageEnd = useRef();

  const [data, setData] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(0);

  const { showToast } = useToast();

  useEffect(() => {
    const newData = message.data.find((item) => item._id === id);

    if (newData) {
      setData(newData.messages);
      setResult(newData.result);
      setPage(newData.page);
    }
  }, [message.data, id]);

  useEffect(() => {
    if (id && message.users.length > 0) {
      setTimeout(() => {
        refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 50);

      const newUser = message.users.find((user) => user._id === id);

      if (newUser) setUser(newUser);
    }
  }, [message.users, id]);

  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = '';
    let newMedia = [];

    files.forEach((file) => {
      if (!file) return (err = 'File does not exist.');

      if (file.size > 1024 * 1024 * 5) {
        return (err = 'The image/video largest is 5mb.');
      }

      return newMedia.push(file);
    });

    // if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setMedia([...media, ...newMedia]);
  };

  const handleDeleteMedia = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && media.length === 0) return;
    setText('');
    setMedia([]);
    setLoadMedia(true);

    let newArr = [];
    if (media.length > 0) newArr = await uploadImage(media);

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    };

    setLoadMedia(false);
    await dispatch(addMessage({ msg, auth, socket, showToast }));
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  useEffect(() => {
    const getMessagesData = async () => {
      if (message.data.every((item) => item._id !== id)) {
        await dispatch(getMessages({ auth, id, showToast }));
        setTimeout(() => {
          refDisplay.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        }, 50);
      }
    };
    getMessagesData();
  }, [id, dispatch, auth, message.data]);

  // Load More
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoadMore((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, [setIsLoadMore]);

  useEffect(() => {
    if (isLoadMore > 1) {
      if (result >= page * 9) {
        dispatch(loadMoreMessages({ auth, id, page: page + 1, showToast }));
        setIsLoadMore(1);
      }
    }
    // eslint-disable-next-line
  }, [isLoadMore]);

  const handleDeleteConversation = () => {
    if (window.confirm('Do you want to delete?')) {
      dispatch(deleteConversation({ auth, id, showToast }));
      //   return history.push('/chat');
    }
  };

  // Call
  const caller = ({ video }) => {
    const { _id, avatar, username, fullname } = user;

    const msg = {
      sender: auth.user._id,
      recipient: _id,
      avatar,
      username,
      fullname,
      video,
    };
    // dispatch({ type: GLOBALTYPES.CALL, payload: msg });
  };

  const callUser = ({ video }) => {
    const { _id, avatar, username, fullname } = auth.user;

    const msg = {
      sender: _id,
      recipient: user._id,
      avatar,
      username,
      fullname,
      video,
    };

    // if (peer.open) msg.peerId = peer._id;

    socket.emit('callUser', msg);
  };

  const handleAudioCall = () => {
    caller({ video: false });
    callUser({ video: false });
  };

  const handleVideoCall = () => {
    caller({ video: true });
    callUser({ video: true });
  };

  return (
    <>
      <div
        className="w-full h-[60x] border-b border-solid border-gray-300 flex justify-between items-center bg-gray-100"
        style={{ cursor: 'pointer' }}
      >
        {user.length !== 0 && (
          <UserCard user={user}>
            <div className="flex gap-3">
              <i className="fas fa-phone-alt" onClick={handleAudioCall} />

              <i className="fas fa-video mx-3" onClick={handleVideoCall} />

              <i
                className="fas fa-trash text-danger"
                onClick={handleDeleteConversation}
              />
            </div>
          </UserCard>
        )}
      </div>

      <div
        className="w-full mt-3 h-[calc(100%_-_210px)] overflow-y-auto py-0 px-4"
        style={{ height: media.length > 0 ? 'calc(100% - 120px)' : '' }}
      >
        <div
          className="w-full min-h-full flex flex-col justify-end chat_display"
          ref={refDisplay}
        >
          <button style={{ marginTop: '-25px', opacity: 0 }} ref={pageEnd}>
            Load more
          </button>

          {data.map((msg, index) => (
            <div key={index}>
              {msg.sender !== auth.user._id && (
                <div className="grid mb-4 grid-cols-[70%] justify-start justify-items-start other_message">
                  <MsgDisplay user={user} msg={msg} />
                </div>
              )}

              {msg.sender === auth.user._id && (
                <div className="grid mb-4 grid-cols-[70%] justify-end justify-items-end  you_message">
                  <MsgDisplay user={auth.user} msg={msg} data={data} />
                </div>
              )}
            </div>
          ))}

          {loadMedia && (
            <div className="grid mb-4 grid-cols-[70%]  justify-end justify-items-end  you_message">
              <span className="loader block mx-auto"></span>
            </div>
          )}
        </div>
      </div>

      <div
        className="w-full h-[70px] overflow-hidden grid place-items-center gap-3 bg-gray-100 rounded py-0 px-4"
        style={{
          //   display: media.length > 0 ? 'grid' : 'none',
          gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
        }}
      >
        {media.map((item, index) => (
          <div
            key={index}
            id="file_media"
            className="relative w-full h-full max-w-[70px] max-h-[70px]"
          >
            {item.type.match(/video/i)
              ? videoShow(URL.createObjectURL(item))
              : imageShow(URL.createObjectURL(item))}
            <span
              className="absolute top-0 right-0 z-40 bg-white border border-solid border-red-500 py-2 px-4 text-red-500 rounded-[50%] cursor-pointer"
              onClick={() => handleDeleteMedia(index)}
            >
              &times;
            </span>
          </div>
        ))}
      </div>

      <form
        className="flex items-center justify-between border-top border-solid border-gray-100 py-0 px-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter you message..."
          value={text}
          className="w-full h-[49px] border-non outline-none"
          onChange={(e) => setText(e.target.value)}
        />

        <Icons setContent={setText} content={text} />

        <div className="relative overflow-hidden my-0 mx-3">
          <BsImages className="text-red-500 cursor-pointer" />
          <input
            type="file"
            name="file"
            id="file"
            className="absolute top-0 left-0 opacity-0 cursor-pointer"
            multiple
            accept="image/*,video/*"
            onChange={handleChangeMedia}
          />
        </div>

        <button
          type="submit"
          disabled={text || media.length > 0 ? false : true}
        >
          <FiSend />
        </button>
      </form>
    </>
  );
};

export default RightSide;
