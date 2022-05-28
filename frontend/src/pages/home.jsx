import React from 'react';
import { useSelector } from 'react-redux';
import { CreatePost, HomePosts, RightSideBar } from '../components';

const Home = () => {
  const { posts } = useSelector((state) => state);

  return (
    <div className="flex flex-col md:flex-row flex-wrap min-h-screen  max-w-screen-lg mx-auto pt-8 relative ">
      <div className="w-full px-6 md:px-0 md:w-8/12 md:flex-[0_0_66.666667%]">
        <CreatePost />

        {posts.loading ? (
          <span className="loader block mx-auto"></span>
        ) : posts.postsLength === 0 && posts.posts.length === 0 ? (
          <h2 className="text-center text-white">No Posts</h2>
        ) : (
          <HomePosts />
        )}
      </div>

      <div className="w-full  md:flex-[0_0_33.333333%] md:max-w-[33.333333%]">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
