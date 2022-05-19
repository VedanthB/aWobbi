import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Menu, Transition } from '@headlessui/react';
import Avatar from '../../Avatar';
import moment from 'moment';
import { setEditPostModal } from '../../../features/slices/postModalSlice';
import { useToast } from '../../../hooks';
import { deletePost } from '../../../features';

const CardHeader = ({ post }) => {
  const dispatch = useDispatch();

  const { showToast } = useToast();

  const { auth } = useSelector((state) => state);

  return (
    <div className="flex justify-between items-center cursor-pointer py-4 px-6">
      <div className="flex flex-wrap">
        <Avatar
          src={post.user.avatar}
          alt={post.user.userName}
          className="border-[50%] w-12 h-12"
        />

        <div className="translate-y-[-3px] ml-3">
          <h6 className="m-0">
            <Link to={`/profile/${post.user._id}`} className="text-gray-900">
              {post.user.userName}
            </Link>
          </h6>
          <small className="text-gray-400">
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
      </div>

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
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() =>
                      dispatch(
                        setEditPostModal({
                          editPost: { ...post },
                          onEdit: true,
                          isModalOpen: true,
                        })
                      )
                    }
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Edit Post
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() =>
                      dispatch(
                        deletePost({
                          post,
                          auth,
                          showToast,
                        })
                      )
                    }
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Delete Post
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default CardHeader;
