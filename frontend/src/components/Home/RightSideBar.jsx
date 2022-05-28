import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSuggestions } from '../../features';
import { useToast } from '../../hooks';

import UserCard from '../Chat/UserCard';
import FollowButton from '../FollowButton';

const RightSideBar = () => {
  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { showToast } = useToast();

  return (
    <div className="mt-3 px-6">
      <UserCard user={auth.user} />
      <div className="flex justify-between items-center my-2">
        <h5 className="dark:text-white">Suggestions for you</h5>
        {!profile.suggestionLoading && (
          <i
            className="fas fa-redo dark:text-white"
            style={{ cursor: 'pointer' }}
            onClick={() =>
              dispatch(getSuggestions({ token: auth.token, showToast }))
            }
          />
        )}
      </div>

      {profile.suggestionLoading ? (
        <span className="loader block mx-auto"></span>
      ) : (
        <div className="suggestions">
          {profile.suggestionsUsers.map((user) => (
            <UserCard key={user._id} user={user}>
              <FollowButton user={user} />
            </UserCard>
          ))}
          {profile.suggestionsUsers.length === 0 && (
            <h4 className="text-center dark:text-white"> No Suggestions </h4>
          )}
        </div>
      )}
      <div style={{ opacity: 0.5 }} className="my-2">
        <small className="block text-center dark:text-white">
          welcome to the aWoobi 🔥❤️
        </small>

        <small className="block text-center dark:text-white">
          {' '}
          &copy; 2022{' '}
        </small>
      </div>
    </div>
  );
};

export default RightSideBar;
