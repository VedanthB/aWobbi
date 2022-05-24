import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import { MdNotificationsActive } from 'react-icons/md';

import { Link } from 'react-router-dom';

import moment from 'moment';
import Avatar from '../Avatar';
import { deleteAllNotifies, isReadNotify } from '../../features';
import { useToast } from '../../hooks';

const NotifyModal = () => {
  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const showToast = useToast();

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }));
  };

  const handleSound = () => {
    // dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound });
  };

  const handleDeleteAll = () => {
    const newArr = notify.data.filter((item) => item.isRead === false);
    if (newArr.length === 0)
      return dispatch(deleteAllNotifies({ token: auth.token, showToast }));

    if (
      window.confirm(
        `You have ${newArr.length} unread notices. Are you sure you want to delete all?`
      )
    ) {
      return dispatch(deleteAllNotifies({ token: auth.token, showToast }));
    }
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="w-6 h-6">
          <MdNotificationsActive className="w-6 h-6 dark:text-gray-100" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1  min-w-[300px] w-full">
              <div className="flex justify-between items-center px-3">
                <h3>Notification</h3>
                {notify.sound ? (
                  <i
                    className="fas fa-bell text-danger"
                    style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                    onClick={handleSound}
                  />
                ) : (
                  <i
                    className="fas fa-bell-slash text-danger"
                    style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                    onClick={handleSound}
                  />
                )}
              </div>

              <hr className="mb-3" />

              {notify.data.length === 0 && (
                <h4 className="text-center"> No Notifications </h4>
              )}

              <div
                style={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}
              >
                {notify.data.map((msg, index) => (
                  <div key={index} className="px-2 mb-3 mt-3">
                    <Link
                      to={`${msg.url}`}
                      className="flex text-gray-900 items-center"
                      onClick={() => handleIsRead(msg)}
                    >
                      <Avatar
                        src={msg.user.avatar}
                        alt={msg.user.userName}
                        className="w-12 h-12 rounded-[50%]"
                      />

                      <div className="mx-1 flex-1">
                        <div>
                          <strong className="mr-1">{msg.user.userName}</strong>
                          <span>{msg.text}</span>
                        </div>
                        {msg.content && (
                          <small>{msg.content.slice(0, 20)}...</small>
                        )}
                      </div>

                      {msg.image && (
                        <div style={{ width: '30px' }}>
                          {msg.image.match(/video/i) ? (
                            <video src={msg.image} width="100%" />
                          ) : (
                            <Avatar
                              src={msg.image}
                              alt={msg.user.userName}
                              className="w-8 h-8 rounded-[50%]"
                            />
                          )}
                        </div>
                      )}
                    </Link>
                    <small className="text-gray-400 flex justify-between px-2">
                      {moment(msg.createdAt).fromNow()}
                      {!msg.isRead && (
                        <i className="fas fa-circle text-primary" />
                      )}
                    </small>
                  </div>
                ))}
              </div>

              <hr className="my-1" />
              <div
                className="text-right text-red-500 mr-2"
                style={{ cursor: 'pointer' }}
                onClick={handleDeleteAll}
              >
                Delete All
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default NotifyModal;
