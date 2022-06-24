import React from 'react';

import { Link } from 'react-router-dom';

import { BsImages } from 'react-icons/bs';
import Avatar from '../Avatar';

const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  msg,
  to,
}) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };

  const showMsg = (user) => {
    return (
      <>
        <div>{user.text}</div>
        {user.media.length > 0 && (
          <div>
            {user.media.length} <BsImages />
          </div>
        )}

        {user.call && (
          <span className="material-icons">
            {user.call.times === 0
              ? user.call.video
                ? 'videocam_off'
                : 'phone_disabled'
              : user.call.video
              ? 'video_camera_front'
              : 'call'}
          </span>
        )}
      </>
    );
  };

  return (
    <div
      className={`flex p-2 items-center justify-between dark:text-white w-full ${border}`}
    >
      <Link
        to={to ? `/user/${user._id}` : `/chat/${user._id}`}
        onClick={handleCloseAll}
        className="flex items-center w-full"
      >
        <Avatar src={user.avatar} className="w-14 h-14 rounded-[50%]" />

        <div className="ml-4" style={{ transform: 'translateY(-2px)' }}>
          <span className="block dark:text-white hover:underline w-28 text-ellipsis overflow-hidden">
            {user.userName}
          </span>

          <small className="dark:text-white" style={{ opacity: 0.7 }}>
            {msg ? showMsg(user) : user.fullName}
          </small>
        </div>
      </Link>

      {children}
    </div>
  );
};

export default UserCard;
