import React from 'react';
import { BsHeart } from 'react-icons/bs';

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  return (
    <>
      {isLike ? (
        <lord-icon
          src="https://cdn.lordicon.com/rjzlnunf.json"
          trigger="click"
          stroke="90"
          colors="primary:#e83a30,secondary:#f4a09c"
          style={{ width: '2.5rem', height: '2.5rem' }}
          onClick={handleUnLike}
        ></lord-icon>
      ) : (
        // <BsHeart className="text-3xl text-red-500" onClick={handleUnLike} />
        <lord-icon
          src="https://cdn.lordicon.com/rjzlnunf.json"
          trigger="click"
          stroke="90"
          colors="primary:#a855f7,secondary:#a855f7"
          style={{ width: '2.5rem', height: '2.5rem' }}
          onClick={handleLike}
        ></lord-icon>
        // <BsHeart className="text-3xl" onClick={handleLike} />
      )}
    </>
  );
};

export default LikeButton;
