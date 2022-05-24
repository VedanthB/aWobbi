import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icons from '../Icons';

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState('');

  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!content.trim()) {
    //   if (setOnReply) return setOnReply(false);
    //   return;
    // }

    // setContent('');

    // const newComment = {
    //   content,
    //   likes: [],
    //   user: auth.user,
    //   createdAt: new Date().toISOString(),
    //   reply: onReply && onReply.commentId,
    //   tag: onReply && onReply.user,
    // };

    // dispatch(createComment({ post, newComment, auth, socket }));

    // if (setOnReply) return setOnReply(false);
  };

  return (
    <form className="flex items-center" onSubmit={handleSubmit}>
      {children}
      <input
        className="bg-gray-100 flex-1 border-none outline-none overflow-auto w-full p-4"
        type="text"
        placeholder="Add your comments..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Icons setContent={setContent} content={content} />

      <button
        type="submit"
        className="border-none opacity-none  text-blue-500 font-bold mr-4"
      >
        Post
      </button>
    </form>
  );
};

export default InputComment;
