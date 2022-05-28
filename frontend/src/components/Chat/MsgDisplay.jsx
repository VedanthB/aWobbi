import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { deleteMessages } from '../../features';
import { imageShow, videoShow } from '../../utils';
import Avatar from '../Avatar';
import Times from './Times';

const MsgDisplay = ({ user, msg, theme, data }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeleteMessages = () => {
    if (!data) return;

    if (window.confirm('Do you want to delete?')) {
      dispatch(deleteMessages({ msg, data, auth }));
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center">
        <Avatar src={user.avatar} className="w-8 h-8 rounded-[50%] mr-3" />
        <span className="underline">{user.userName}</span>
      </div>
      <div className="relative">
        <div className="flex items-center">
          {user._id === auth.user._id && (
            <lord-icon
              src="https://cdn.lordicon.com/gsqxdxog.json"
              trigger="hover"
              stroke="90"
              colors="primary:#121331,secondary:#a855f7"
              onClick={handleDeleteMessages}
              style={{ width: '1.5rem', height: '1.5rem' }}
            ></lord-icon>
          )}

          {msg.text && (
            <div className="px-[14px] py-[9px] ml-2 mb-2 chat_text">
              {msg.text}
            </div>
          )}

          {msg.media.map((item, index) => (
            <div key={index}>
              {item.url?.match(/video/i)
                ? videoShow(item.url)
                : imageShow(item.url)}
            </div>
          ))}
        </div>

        {/* {msg.call && (
          <button
            className="btn d-flex align-items-center py-3"
            style={{ background: '#eee', borderRadius: '10px' }}
          >
            <span
              className="material-icons font-weight-bold mr-1"
              style={{
                fontSize: '2.5rem',
                color: msg.call.times === 0 ? 'crimson' : 'green',
              }}
            >
              {msg.call.times === 0
                ? msg.call.video
                  ? 'videocam_off'
                  : 'phone_disabled'
                : msg.call.video
                ? 'video_camera_front'
                : 'call'}
            </span>

            <div className="text-left">
              <h6>{msg.call.video ? 'Video Call' : 'Audio Call'}</h6>
              <small>
                {msg.call.times > 0 ? (
                  <Times total={msg.call.times} />
                ) : (
                  new Date(msg.createdAt).toLocaleTimeString()
                )}
              </small>
            </div>
          </button>
        )} */}
      </div>

      <div className="text-sm text-gray-400">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  );
};

export default MsgDisplay;
