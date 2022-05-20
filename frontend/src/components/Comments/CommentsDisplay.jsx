import React, { useState, useEffect } from 'react';
import CommentCard from './CommentCard';

const CommentDisplay = ({ comment, post, replyComment }) => {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowRep(replyComment?.slice(replyComment?.length - next));
  }, [replyComment, next]);

  return (
    <div className="py-3 px-6">
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        {/* <div className="pl-4">
          {showRep?.map(
            (item, index) =>
              item?.reply && (
                <CommentCard
                  key={index}
                  comment={item}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}

          {replyComment.length - next > 0 ? (
            <div
              className="p-2 text-purple-500 cursor-pointer"
              onClick={() => setNext(next + 10)}
            >
              See more comments...
            </div>
          ) : (
            replyComment.length > 1 && (
              <div
                className="p-2 text-purple-500 cursor-pointer"
                onClick={() => setNext(1)}
              >
                Hide comments...
              </div>
            )
          )}
        </div> */}
      </CommentCard>
    </div>
  );
};

export default CommentDisplay;
