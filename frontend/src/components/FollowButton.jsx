import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unFollowUser } from '../features';
import { useToast } from '../hooks';

import Button from './Button';

const FollowButton = ({ user }) => {
  const [followed, setFollowed] = useState(false);

  const { auth, profile } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    //check if we are already following the user
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
    return () => setFollowed(false);
  }, [auth.user.following, user._id]);

  const handleFollow = async () => {
    if (load) return;

    setFollowed(true);
    setLoad(true);
    await dispatch(followUser({ users: profile.users, user, auth, showToast }));
    setLoad(false);
  };

  const handleUnFollow = async () => {
    if (load) return;

    setFollowed(false);
    setLoad(true);
    await dispatch(
      unFollowUser({ users: profile.users, user, auth, showToast })
    );
    setLoad(false);
  };

  return (
    <>
      {followed ? (
        <Button type="danger" onClick={handleUnFollow}>
          UnFollow
        </Button>
      ) : (
        <Button type="normal" onClick={handleFollow}>
          Follow
        </Button>
      )}
    </>
  );
};

export default FollowButton;
