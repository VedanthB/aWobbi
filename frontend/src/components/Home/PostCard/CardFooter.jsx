import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LikeButton from '../../LikeButton';
import { BsBookmark } from 'react-icons/bs';
import { likePost, savePost, unlikePost, unSavePost } from '../../../features';
import { useToast } from '../../../hooks';

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [isShare, setIsShare] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  const { showToast } = useToast();

  // Likes
  useEffect(() => {
    // check if the user has already liked the post
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  const handleLike = () => {
    if (loadLike) return;

    setLoadLike(true);

    dispatch(likePost({ post, auth, showToast }));

    setLoadLike(false);
  };

  const handleUnLike = () => {
    if (loadLike) return;

    setLoadLike(true);

    dispatch(unlikePost({ post, auth, showToast }));

    setLoadLike(false);
  };

  // Saved
  useEffect(() => {
    // check if the post is already saved
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleSavePost = () => {
    if (saveLoad) return;
    setSaveLoad(true);
    dispatch(savePost({ post, auth, showToast }));
    setSaveLoad(false);
  };

  const handleUnSavePost = () => {
    if (saveLoad) return;

    setSaveLoad(true);
    dispatch(unSavePost({ post, auth, showToast }));
    setSaveLoad(false);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center cursor-pointer py-0 px-6">
        <LikeButton
          isLike={isLike}
          handleLike={handleLike}
          handleUnLike={handleUnLike}
        />

        {saved ? (
          <BsBookmark
            className="text-purple-500 text-3xl ml-8"
            onClick={handleUnSavePost}
          />
        ) : (
          <BsBookmark className="text-3xl  ml-8" onClick={handleSavePost} />
        )}
      </div>

      <div className="flex justify-between">
        <h6 className="p-2 cursor-pointer mx-4 font-medium hover:underline">
          {post.likes.length} likes
        </h6>

        <h6 className="p-2 cursor-pointer mx-4 font-medium  hover:underline">
          {post.comments.length} comments
        </h6>
      </div>
    </div>
  );
};

export default CardFooter;
