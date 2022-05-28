import React from 'react';
import { LeftSide } from '../../components';

const Chat = () => {
  return (
    <div className="w-full max-w-5xl m-auto h-[calc(100vh_-_150px)]  relative  border border-solid  border-gray-300 dark:border-gray-600 dark:bg-gray-700   mt-4 rounded bg-gray-100 flex px-6 md:px-0">
      <div className="w-full md:flex-[0_0_33.333333%] md:max-w-[33.333333%] border-r px-0 dark:border-gray-600">
        <LeftSide />
      </div>

      <div className="md:flex-[0_0_66.666667%] md:max-w-[66.666667%] px-0 hidden ">
        <div
          className="flex justify-center 
                items-center flex-col h-full"
        >
          <h4 className="dark:text-white">Messenger</h4>
        </div>
      </div>
    </div>
  );
};

export default Chat;
