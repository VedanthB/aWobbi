import React, { useState } from 'react';

const Carousel = ({ images, id }) => {
  const [currIndex, setCurrIndex] = useState(0);

  return (
    <div id="default-carousel" className="relative" data-carousel="static">
      {/* <!-- Carousel wrapper --> */}
      <div className="overflow-hidden relative h-56  sm:h-64 xl:h-80 2xl:h-96">
        {images.map((img, index) => (
          <div
            key={index}
            className={`block ${
              index === currIndex ? 'block' : 'hidden'
            } transition duration-700 ease-in-out`}
          >
            {img?.url?.match(/video/i) ? (
              <video
                controls
                src={img?.url}
                className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                alt={img?.url}
              />
            ) : (
              <img
                src={img?.url}
                className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                alt={img?.url}
              />
            )}
          </div>
        ))}
      </div>
      {/* <!-- Slider indicators --> */}
      <div className="flex absolute bottom-5 left-1/2 z-10 space-x-3 -translate-x-1/2">
        {images.map((img, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currIndex ? 'bg-purple-500' : 'bg-purple-200'
            }  z-20`}
            aria-label={`Slide ${index}`}
            onClick={() => setCurrIndex(index)}
          ></button>
        ))}
      </div>
      {/* <!-- Slider controls --> */}
      {images.length > 1 && (
        <>
          {' '}
          <button
            type="button"
            className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
            onClick={() =>
              currIndex === 0
                ? setCurrIndex(images.length - 1)
                : setCurrIndex((i) => i - 1)
            }
          >
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-5 h-5 text-black dark:text-white sm:w-6 sm:h-6 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              <span className="hidden">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
            onClick={() =>
              currIndex === images.length - 1
                ? setCurrIndex(0)
                : setCurrIndex((i) => i + 1)
            }
          >
            <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-5 h-5 text-black dark:text-white sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span className="hidden">Next</span>
            </span>
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
