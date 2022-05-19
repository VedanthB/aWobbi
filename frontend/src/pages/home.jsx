import React from 'react';
import { useSelector } from 'react-redux';
import { CreatePost, HomePosts } from '../components';

const Home = () => {
  const { posts } = useSelector((state) => state);

  return (
    <div className="flex flex-wrap min-h-screen  max-w-screen-lg mx-auto pt-8 relative top-24">
      <div className="w-8/12 flex-[0_0_66.666667%]">
        <CreatePost />

        {posts.loading ? (
          <span className="loader block mx-auto"></span>
        ) : posts.postsLength === 0 && posts.posts.length === 0 ? (
          <h2 className="text-center text-white">No Posts</h2>
        ) : (
          <HomePosts />
        )}
      </div>
    </div>
  );
};

export default Home;
