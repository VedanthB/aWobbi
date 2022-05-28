import React, { useState, useEffect } from 'react';
import { useToast } from '../hooks';
import { getDataAPI } from '../utils';
import LoadMoreBtn from './LoadMore';
import PostThumb from './PostThumb';

const Saved = ({ auth, dispatch }) => {
  const [savePosts, setSavePosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(2);
  const [load, setLoad] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    setLoad(true);

    getDataAPI('getSavePosts', auth.token)
      .then((res) => {
        setSavePosts(res.data.savePosts);
        setResult(res.data.postsLength);
        setLoad(false);
      })
      .catch((err) => {
        showToast(err.response.data.msg, 'error');
      });

    return () => setSavePosts([]);
  }, [auth.token, dispatch]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`getSavePosts?limit=${page * 9}`, auth.token);
    setSavePosts(res.data.savePosts);
    setResult(res.data.result);
    setPage(page + 1);
    setLoad(false);
  };

  return (
    <div>
      <PostThumb posts={savePosts} result={result} />

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

export default Saved;
