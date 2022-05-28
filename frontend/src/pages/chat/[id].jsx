import React from 'react';
import { LeftSide } from '../../components';
import RightSide from '../../components/Chat/RightSide';

const Conversation = () => {
  return (
    <div className="w-full max-w-5xl m-auto h-[calc(100vh_-_150px)]  relative top-24  border border-solid  border-gray-300 mt-4 rounded bg-gray-100 flex">
      <div className="flex-[0_0_33.333333%] max-w-[33.333333%] border-r px-0">
        <LeftSide />
      </div>

      <div className="flex-[0_0_66.666667%] max-w-[66.666667%] px-0">
        <RightSide />
      </div>
    </div>
  );
};

export default Conversation;
