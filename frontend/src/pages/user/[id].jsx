import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { UserInfo, UserPosts } from '../../components';
import { getUser } from '../../features';
import { useToast } from '../../hooks';

const Profile = () => {
  const { profile, auth } = useSelector((state) => state);

  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { id } = useParams();

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getUser({ id, auth, showToast }));
    }
  }, [id, auth, dispatch, profile.ids]);

  console.log(profile.ids.every((item) => item !== id));

  return (
    <div className="min-h-screen w-full">
      <UserInfo id={id} auth={auth} profile={profile} />
      <UserPosts />
    </div>
  );
};

export default Profile;
