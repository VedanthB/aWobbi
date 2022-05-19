import React from 'react';
import CardBody from './Home/PostCard/CardBody';
import CardFooter from './Home/PostCard/CardFooter';
import CardHeader from './Home/PostCard/CardHeader';

const PostCard = ({ post }) => {
  return (
    <div className="shadow-lg my-6 border border-gray-200 ">
      <CardHeader post={post} />
      <CardBody post={post} />
      <CardFooter post={post} />

      {/* <Comments post={post} />
      <InputComment post={post} /> */}
    </div>
  );
};

export default PostCard;
