import React, { useState } from 'react';
import Carousel from '../../Carousel';

const CardBody = ({ post }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div>
      <div className="py-0 px-6 mt-[-10px] mb-[10px]">
        <span>
          {post.content.length < 60
            ? post.content
            : readMore
            ? post.content + ' '
            : post.content.slice(0, 60) + '.....'}
        </span>
        {post.content.length > 60 && (
          <span className="readMore" onClick={() => setReadMore(!readMore)}>
            {readMore ? 'Hide content' : 'Read more'}
          </span>
        )}
      </div>

      {post.images.length > 0 && (
        <Carousel images={post.images} id={post._id} />
      )}
    </div>
  );
};

export default CardBody;
