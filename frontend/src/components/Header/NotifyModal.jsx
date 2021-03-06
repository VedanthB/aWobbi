import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';

import { Link } from 'react-router-dom';
import lottie from 'lottie-web';
import { defineLordIconElement } from 'lord-icon-element';
import moment from 'moment';
import Avatar from '../Avatar';
import { deleteAllNotifies, isReadNotify } from '../../features';
import { useToast } from '../../hooks';
import { useTheme } from '../../context';

defineLordIconElement(lottie.loadAnimation);

const NotifyModal = () => {
  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const showToast = useToast();

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }));
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
        <Menu.Button>
          {theme === 'light' ? (
            <lord-icon
              src="https://cdn.lordicon.com/ndydpcaq.json"
              trigger="morph"
              stroke="70"
              colors={'primary:#545454'}
              style={{ width: '2.5rem', height: '2.5rem' }}
            ></lord-icon>
          ) : (
            <lord-icon
              src="https://cdn.lordicon.com/ndydpcaq.json"
              trigger="morph"
              stroke="70"
              colors={'primary:#a855f7 '}
              style={{ width: '2.5rem', height: '2.5rem' }}
            ></lord-icon>
          )}
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
          <Menu.Items className="absolute z-50 bottom-10 md:top-10 right-[-6rem]  md:right-0 mt-2 origin-bottom-left">
            <div className="px-1 py-1  min-w-[300px] w-full  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 dark:text-white">
              <div className="flex justify-between items-center px-3 mb-3">
                <h3>Notification</h3>
              </div>

              {notify.data.length === 0 && (
                <h4 className="text-center"> No Notifications </h4>
              )}

              <div
                style={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}
              >
                {notify.data.map((msg, index) => (
                  <div key={index} className="px-2 mb-3 mt-3 dark:text-white">
                    <Link
                      to={`${msg.url}`}
                      className="flex text-gray-900 items-center dark:text-white"
                      onClick={() => handleIsRead(msg)}
                    >
                      <Avatar
                        src={msg.user.avatar}
                        alt={msg.user.userName}
                        className="w-12 h-12 rounded-[50%]"
                      />

                      <div className="mx-1 flex-1 dark:text-white">
                        <div>
                          <strong className="mr-1 dark:text-white">
                            {msg.user.userName}
                          </strong>
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
                    <small className="text-gray-400 flex justify-between px-2 ">
                      {moment(msg.createdAt).fromNow()}
                      {!msg.isRead && (
                        <i className="fas fa-circle text-primary" />
                      )}
                    </small>
                  </div>
                ))}
              </div>

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
