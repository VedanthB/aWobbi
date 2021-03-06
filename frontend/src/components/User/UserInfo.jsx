import React, { useState, useEffect } from 'react';

import Avatar from '../Avatar';
import Button from '../Button';
import FollowButton from '../FollowButton';
import SearchUserCard from '../Header/SearchUserCard';
import Modal from '../Modal';
import EditProfileModal from './EditProfileModal';

const UserInfo = ({ id, auth, profile }) => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user?._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, profile.users, auth.user]);

  return (
    <div className="w-full max-w-4xl px-5 py-3 mx-auto pt-8">
      {userData.map((user) => (
        <div className="flex justify-around flex-wrap" key={user._id}>
          <Avatar
            className="w-40 h-40 rounded-full"
            src={user.avatar}
            alt={user.userName}
          />

          <div className="min-w-[250px] max-w-[550px] w-full flex-1 opacity-70 my-0 mx-4">
            <div className="flex items-center flex-wrap">
              <h2 className="flex-[3_1_0%] text-4xl font-normal translate-y-[4px] mb-4 text-gray-900 dark:text-gray-100 ">
                {user.userName}
              </h2>

              {user._id === auth.user._id ? (
                <Button onClick={() => setOnEdit(true)} type="normal">
                  Edit Profile
                </Button>
              ) : (
                <FollowButton user={user} />
              )}
            </div>

            <div className="cursor-pointer text-purple-500 mb-4">
              <span
                className="mr-4 hover:underline"
                onClick={() => setShowFollowers(true)}
              >
                {user.followers.length} Followers
              </span>
              <span
                className="ml-4 hover:underline"
                onClick={() => setShowFollowing(true)}
              >
                {user.following.length} Following
              </span>
            </div>

            <h6 className="mb-4  text-gray-900 dark:text-gray-100">
              {user.fullName}
              <span className="text-red-500 ml-3">{user.mobile}</span>
            </h6>
            <p className="mb-4  text-gray-900 dark:text-gray-100">
              {user.address}
            </p>
            <h6 className="mb-4  text-gray-900 dark:text-gray-100">
              {user.email}
            </h6>
            <a
              href={user.website}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {user.website}
            </a>
            <p className="mt-4  text-gray-900 dark:text-gray-100">
              {user.story}
            </p>
          </div>

          {onEdit && <EditProfileModal onEdit={onEdit} setOnEdit={setOnEdit} />}

          {showFollowers && (
            <Modal
              title="Followers"
              body={user.followers.map((user) => (
                <SearchUserCard
                  key={user._id}
                  user={user}
                  setShowFollowers={setShowFollowers}
                >
                  {auth.user._id !== user._id && <FollowButton user={user} />}
                </SearchUserCard>
              ))}
              // users={user.followers}
              isOpen={showFollowers}
              setIsOpen={setShowFollowers}
            />
          )}
          {showFollowing && (
            <Modal
              title="Following"
              body={user.following.map((user) => (
                <SearchUserCard
                  key={user._id}
                  user={user}
                  setShowFollowers={setShowFollowing}
                >
                  {auth.user._id !== user._id && <FollowButton user={user} />}
                </SearchUserCard>
              ))}
              isOpen={showFollowing}
              setIsOpen={setShowFollowing}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default UserInfo;
