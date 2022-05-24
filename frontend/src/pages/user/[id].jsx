import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { UserInfo, UserPosts } from '../../components';
import Saved from '../../components/Saved';
import { getUser } from '../../features';
import { useToast } from '../../hooks';

const Profile = () => {
  const { profile, auth } = useSelector((state) => state);

  const [saveTab, setSaveTab] = useState(false);

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
    <div className="min-h-screen w-full bg-white dark:bg-slate-900  transition-colors ease-in delay-300 relative top-24">
      <UserInfo id={id} auth={auth} profile={profile} />

      {auth.user?._id === id && (
        <div className="profile_tab">
          <button
            className={saveTab ? '' : 'active'}
            onClick={() => setSaveTab(false)}
          >
            Posts
          </button>
          <button
            className={saveTab ? 'active' : ''}
            onClick={() => setSaveTab(true)}
          >
            Saved
          </button>
        </div>
      )}

      {profile.loading ? (
        <span className="loader block mx-auto"></span>
      ) : (
        <>
          {saveTab ? (
            <Saved auth={auth} dispatch={dispatch} />
          ) : (
            <UserPosts
              auth={auth}
              profile={profile}
              dispatch={dispatch}
              id={id}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
