import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostCard from '../../components/PostCard';
import { getPost } from '../../features';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  const { auth, posts } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost({ detailPost: posts.detailPost, id, auth }));

    if (posts.detailPost.length > 0) {
      const newArr = posts?.detailPost?.filter((post) => post?._id === id);
      setPost(newArr);
    }
  }, [posts?.detailPost, dispatch, id, auth]);

  return (
    <div className="max-w-5xl mx-auto">
      {post.length === 0 && <span className="loader block mx-auto"></span>}

      {post.map((item) => (
        <PostCard key={item._id} post={item} />
      ))}
    </div>
  );
};

export default Post;
