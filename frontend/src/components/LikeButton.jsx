import React from 'react';
import { BsHeart } from 'react-icons/bs';

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  return (
    <>
      {isLike ? (
        <BsHeart className="text-3xl text-red-500" onClick={handleUnLike} />
      ) : (
        <BsHeart className="text-3xl" onClick={handleLike} />
      )}
    </>
  );
};

export default LikeButton;
