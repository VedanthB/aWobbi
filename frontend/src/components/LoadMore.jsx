import React from 'react';

const LoadMoreBtn = ({ result, page, load, handleLoadMore }) => {
  return (
    <>
      {result < 9 * (page - 1)
        ? ''
        : !load && (
            <button
              className="bg-gray-800 text-white px2 py-4 mx-auto block"
              onClick={handleLoadMore}
            >
              Load more
            </button>
          )}
    </>
  );
};

export default LoadMoreBtn;
