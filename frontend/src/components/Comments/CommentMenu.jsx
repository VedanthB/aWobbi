import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Menu, Transition } from '@headlessui/react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { deleteComment } from '../../features';
import { useToast } from '../../hooks';

const CommentMenu = ({ post, comment, setOnEdit }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { showToast } = useToast();

  const handleRemove = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
      dispatch(deleteComment({ post, auth, comment, showToast }));
    }
  };

  const MenuItem = () => {
    return (
      <>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={() => setOnEdit(true)}
              className={`${
                active ? 'bg-violet-500 text-white' : 'text-gray-900'
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              Edit
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={handleRemove}
              className={`${
                active ? 'bg-violet-500 text-white' : 'text-gray-900'
              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
            >
              Remove
            </button>
          )}
        </Menu.Item>
      </>
    );
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center rounded-md px-4 py-2  text-sm font-medium text-black  focus:outline-purple-400 focus:outline focus:outline-offset-2">
          <BiDotsVerticalRounded className="text-3xl" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 dark:bg-slate-600">
          <div className="px-1 py-1 ">
            {post.user._id === auth.user._id ? (
              comment.user._id === auth.user._id ? (
                //   if the comment is by the user , user can delete comment
                MenuItem()
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleRemove}
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Remove
                    </button>
                  )}
                </Menu.Item>
              )
            ) : (
              // check if the comment on the post is the user's comment
              comment.user._id === auth.user._id && MenuItem()
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CommentMenu;
