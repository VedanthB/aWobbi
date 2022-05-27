import React from 'react';
import { LeftSide } from '../../components';
import RightSide from '../../components/Chat/RightSide';

const Conversation = () => {
  return (
    <div className="w-full max-w-5xl m-auto h-[calc(100vh_-_150px)]  relative  border border-solid  border-gray-300 mt-4 rounded bg-gray-100 flex  dark:border-gray-600 dark:bg-gray-700 px-6 md:px-0">
      <div className="md:flex-[0_0_33.333333%] md:max-w-[33.333333%] border-r px-0 dark:border-gray-600 hidden md:block">
        <LeftSide />
      </div>

      <div className="md:flex-[0_0_66.666667%] md:max-w-[66.666667%] px-0 w-full">
        <RightSide />
      </div>
    </div>
  );
};

export default Conversation;
