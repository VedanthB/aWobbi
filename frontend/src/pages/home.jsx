import React from 'react';
import { CreatePost } from '../components';

const Home = () => {
  return (
    <div className="flex flex-wrap min-h-screen  max-w-screen-lg mx-auto pt-8 relative top-24">
      <div className="w-8/12 flex-[0_0_66.666667%]">
        <CreatePost />

        {/* {homePosts.loading ? (
          <img src={LoadIcon} alt="loading" className="block mx-auto" />
        ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
          <h2 className="text-center">No Posts</h2>
        ) : (
          <HomePosts />
        )} */}
      </div>
    </div>
  );
};

export default Home;
