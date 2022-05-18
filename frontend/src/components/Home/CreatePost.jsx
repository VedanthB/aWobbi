import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar';

const CreatePost = () => {
  const { auth } = useSelector((state) => state);

  return (
    <div className="bg-slate-200 dark:bg-slate-600 shadow-md p-5 rounded-sm my-3 flex">
      <Avatar
        src={auth.user.avatar}
        alt={auth.user.userName}
        className="w-12 h-12 rounded-[50%] animate-pulse"
      />
      <button
        className="bg-slate-300 border-none outline-none rounded-[30px] w-full text-gray-600 text-2xl py-0 px-3 text-left my-0 mx-2 hover:bg-slate-400"
        // onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
      >
        {auth.user.userName}, what are you thinking?
      </button>
    </div>
  );
};

export default CreatePost;
