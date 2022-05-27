import React from 'react';
import Button from './Button';

const LoadMoreBtn = ({ result, page, load, handleLoadMore }) => {
  return (
    <>
      {result < 9 * (page - 1)
        ? ''
        : !load && (
            <div className="flex justify-center items-center">
              <Button type="normal" onClick={handleLoadMore}>
                Load More
              </Button>
            </div>
          )}
    </>
  );
};

export default LoadMoreBtn;
