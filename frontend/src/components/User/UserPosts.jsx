import React, { useState, useEffect } from 'react';
import { setUpdateProfilePost } from '../../features';
import { getDataAPI } from '../../utils';
import LoadMoreBtn from '../LoadMore';
import PostThumb from '../PostThumb';

const UserPosts = ({ auth, id, dispatch, profile }) => {
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);

  console.log(posts);

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts);
        setResult(data.postsLength);
        setPage(data.page);
      }
    });
  }, [profile.posts, id]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `user_posts/${id}?limit=${page * 9}`,
      auth.token
    );
    const newData = { ...res.data, page: page + 1, _id: id };

    dispatch(setUpdateProfilePost({ ...newData }));
    // dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData });
    setLoad(false);
  };

  return (
    <div>
      <PostThumb posts={posts} result={result} />

      {load && <span className="loader block mx-auto"></span>}

      <LoadMoreBtn
        result={result}
        page={page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default UserPosts;
