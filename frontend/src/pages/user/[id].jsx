import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { UserInfo, UserPosts } from '../../components';
import Saved from '../../components/Saved';
import { getUser } from '../../features';
import { useToast } from '../../hooks';

const Profile = () => {
  const { profile, auth } = useSelector((state) => state);

  const [tab, setTab] = useState('Posts');

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
        <div className="w-full flex justify-center">
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              <li className="mr-2">
                <div
                  onClick={() => setTab('Posts')}
                  className={`inline-block p-4 rounded-t-lg border-b-2 ${
                    tab === 'Posts'
                      ? 'text-purple-600 border-purple-600  dark:text-purple-500 dark:border-purple-500'
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                  }  `}
                >
                  Posts
                </div>
              </li>
              <li className="mr-2">
                <div
                  onClick={() => setTab('Saved')}
                  className={`inline-block p-4 rounded-t-lg border-b-2 ${
                    tab === 'Saved'
                      ? 'text-purple-600 border-purple-600  dark:text-purple-500 dark:border-purple-500'
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                  }  `}
                >
                  Saved
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}

      {profile.loading ? (
        <span className="loader block mx-auto"></span>
      ) : (
        <>
          {tab === 'Saved' && <Saved auth={auth} dispatch={dispatch} />}
          {tab === 'Posts' && (
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
