import React, { useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';
import { checkOnlineOffline, getConversations } from '../../features';
import { useToast } from '../../hooks';
import { getDataAPI } from '../../utils';
import UserCard from './UserCard';

const LeftSide = () => {
  const { auth, message, online } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [searchUsers, setSearchUsers] = useState([]);

  const { id } = useParams();

  const pageEnd = useRef();
  const [page, setPage] = useState(0);

  const { showToast } = useToast();

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return setSearchUsers([]);

    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setSearchUsers(res.data.users);
    } catch (err) {
      showToast(err.response.data.msg, 'error');
    }
  };

  const handleAddUser = (user) => {
    setSearch('');
    setSearchUsers([]);

    dispatch(checkOnlineOffline(online));

    return navigate(`/chat/${user._id}`, { replace: true });
  };

  const isActive = (user) => {
    if (id === user._id) return 'bg-gray-50 dark:bg-gray-500';
    return '';
  };

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth, showToast }));
  }, [dispatch, auth, message.firstLoad]);

  // Load More
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      dispatch(getConversations({ auth, page, showToast }));
    }
  }, [message.resultUsers, page, auth, dispatch]);

  // Check User Online - Offline
  useEffect(() => {
    if (message.firstLoad) {
      dispatch(checkOnlineOffline(online));
    }
  }, [online, message.firstLoad, dispatch]);

  return (
    <>
      <form
        className="w-100 h-[60px] border-b border-solid border-gray-300  dark:border-gray-600   "
        onSubmit={handleSearch}
      >
        <input
          type="text"
          value={search}
          placeholder="Enter to Search..."
          className="flex-1 h-full border-none outline-none bg-gray-100 py-0 px-4 dark:bg-gray-700 "
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit" style={{ display: 'none' }}>
          Search
        </button>
      </form>

      <div className="w-full h-[calc(100vh_-_220px)] overflow-y-scroll">
        {searchUsers.length !== 0 ? (
          <div className="w-full h-52  overflow-y-auto">
            {searchUsers.map((user) => (
              <div
                key={user._id}
                className={`flex justify-between items-center py-2 px-4 border border-solid border-gray-300 text-gray-600  dark:border-gray-600    cursor-pointer ${isActive(
                  user
                )}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} />
              </div>
            ))}
          </div>
        ) : (
          <>
            {message.users.map((user) => (
              <div
                key={user._id}
                className={`flex justify-between items-center py-2 px-4 border border-solid border-gray-300 text-gray-600  dark:border-gray-600   cursor-pointer ${isActive(
                  user
                )}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} msg={true}>
                  {user.online ? (
                    <i className="fas fa-circle text-green-600" />
                  ) : (
                    auth.user.following.find(
                      (item) => item._id === user._id
                    ) && <i className="fas fa-circle" />
                  )}
                </UserCard>
              </div>
            ))}
          </>
        )}

        <button ref={pageEnd} style={{ opacity: 0 }}>
          Load More
        </button>
      </div>
    </>
  );
};

export default LeftSide;
