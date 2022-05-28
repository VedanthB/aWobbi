import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegComments } from 'react-icons/fa';

const PostThumb = ({ posts, result }) => {
  if (result === 0)
    return <h2 className="text-center text-red-500">No Posts</h2>;

  return (
    <div
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
      className="w-full grid justify-center gap-3 overflow-hidden my-4 mx-0"
    >
      {posts.map((post) => (
        <Link key={post._id} to={`/post/${post._id}`}>
          <div className="min-w-[300px] h-[300px] w-full relative cursor-pointer overflow-hidden group rounded">
            {post?.images[0]?.url?.match(/video/i) ? (
              <video
                className="w-full h-full block object-cover"
                controls
                src={post?.images[0]?.url}
                alt={post?.images[0]?.url}
              />
            ) : (
              <img
                className="w-full h-full block object-cover"
                src={post?.images[0]?.url}
                alt={post?.images[0]?.url}
              />
            )}

            <div className="absolute gap-2 top-0 left-0 w-full h-full flex justify-center items-center opacity-0 group-hover:bg-black/80 group-hover:opacity-100 duration-300 transition-opacity">
              <div className="flex items-center justify-center text-white text-3xl">
                <AiOutlineHeart className="text-white text-3xl ml-2" />{' '}
                {post.likes.length}
              </div>
              <div className="flex  items-center justify-center text-white text-3xl">
                <FaRegComments className="text-white text-3xl ml-2" />{' '}
                {post.comments.length}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostThumb;
