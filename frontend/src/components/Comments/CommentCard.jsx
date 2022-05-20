import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';

import CommentMenu from './CommentMenu';
import Avatar from '../Avatar';
import LikeButton from '../LikeButton';
import InputComment from '../Home/InputComment';

// import InputComment from '../InputComment';

const CommentCard = ({ children, comment, post, commentId }) => {
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [readMore, setReadMore] = useState(false);

  const [onEdit, setOnEdit] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [onReply, setOnReply] = useState(false);

  //   useEffect(() => {
  //     setContent(comment.content);
  //     setIsLike(false);
  //     setOnReply(false);
  //     if (comment.likes.find((like) => like._id === auth.user._id)) {
  //       setIsLike(true);
  //     }
  //   }, [comment, auth.user._id]);

  const handleUpdate = () => {
    // if (comment.content !== content) {
    //   dispatch(updateComment({ comment, post, content, auth }));
    //   setOnEdit(false);
    // } else {
    //   setOnEdit(false);
    // }
  };

  const handleLike = async () => {
    // if (loadLike) return;
    // setIsLike(true);
    // setLoadLike(true);
    // await dispatch(likeComment({ comment, post, auth }));
    // setLoadLike(false);
  };

  const handleUnLike = async () => {
    // if (loadLike) return;
    // setIsLike(false);
    // setLoadLike(true);
    // await dispatch(unLikeComment({ comment, post, auth }));
    // setLoadLike(false);
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? 'inherit' : 'none',
  };

  return (
    <div className="mt-2" style={styleCard}>
      <Link to={`/profile/${comment.user._id}`} className="flex text-gray-900">
        <Avatar src={comment.user.avatar} size="" />
        <h6 className="mx-1">{comment.user.userName}</h6>
      </Link>

      <div className="bg-gray-200 p-2 rounded-sm flex justify-between items-center">
        <div className="flex-auto">
          {onEdit ? (
            <textarea
              rows="5"
              className="w-full border-0 outline-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div>
              {comment.tag && comment.tag._id !== comment.user._id && (
                <Link to={`/profile/${comment.tag._id}`} className="mr-1">
                  @ {comment.tag.userName}
                </Link>
              )}
              <span>
                {content.length < 100
                  ? content
                  : readMore
                  ? content + ' '
                  : content.slice(0, 100) + '....'}
              </span>
              {content.length > 100 && (
                <span
                  className="cursor-pointer text-purple-500"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? 'Hide content' : 'Read more'}
                </span>
              )}
            </div>
          )}

          <div style={{ cursor: 'pointer' }}>
            <small className="text-gray-300 mr-3">
              {moment(comment.createdAt).fromNow()}
            </small>

            <small className="font-bold mr-3">
              {comment.likes.length} likes
            </small>

            {onEdit ? (
              <>
                <small className="font-bold mr-3" onClick={handleUpdate}>
                  update
                </small>
                <small
                  className="font-bold mr-3"
                  onClick={() => setOnEdit(false)}
                >
                  cancel
                </small>
              </>
            ) : (
              <small className="font-bold mr-3" onClick={handleReply}>
                {onReply ? 'cancel' : 'reply'}
              </small>
            )}
          </div>
        </div>

        <div className="flex items-center mx-2" style={{ cursor: 'pointer' }}>
          <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
        </div>
      </div>

      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link to={`/profile/${onReply.user._id}`} className="mr-1">
            @ {onReply.user.username}:
          </Link>
        </InputComment>
      )}

      {children}
    </div>
  );
};

export default CommentCard;