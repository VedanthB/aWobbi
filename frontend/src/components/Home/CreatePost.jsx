import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPostModal } from '../../features';
import Avatar from '../Avatar';

const CreatePost = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="bg-slate-100 dark:bg-transparent shadow-md p-5 rounded-sm my-3 flex dark:border dark:border-gray-700">
      <Avatar
        src={auth.user.avatar}
        alt={auth.user.userName}
        className="w-12 h-12 rounded-[50%]"
      />
      <button
        className="bg-slate-300 dark:bg-slate-500 text-white border-none outline-none rounded-[30px] w-full text-2xl py-0 px-3 text-left my-0 mx-2 hover:bg-slate-400 dark:hover:bg-slate-600"
        onClick={() => dispatch(setPostModal({ isModalOpen: true }))}
      >
        {auth.user.userName}, what are you thinking?
      </button>
    </div>
  );
};

export default CreatePost;
