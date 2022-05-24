import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../features';
import { getDataAPI } from '../../utils';
import PostCard from '../PostCard';

const HomePosts = () => {
  const { posts, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);

    const res = await getDataAPI(`posts?limit=${posts.page * 9}`, auth.token);

    dispatch(setPosts({ ...res.data, page: posts.page + 1 }));

    setLoad(false);
  };

  return (
    <div>
      {posts.posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {load && <span className="loader block mx-auto"></span>}

      {/* <LoadMoreBtn
        postsLength={posts.postsLength}
        page={posts.page}
        load={load}
        handleLoadMore={handleLoadMore}
      /> */}
    </div>
  );
};

export default HomePosts;
