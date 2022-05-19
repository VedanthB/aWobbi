import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

const reactions = [
  '❤️',
  '😆',
  '😯',
  '😢',
  '😡',
  '👍',
  '👎',
  '😄',
  '😂',
  '😘',
  '😗',
  '😚',
  '😳',
  '😭',
  '😓',
  '😤',
  '🤤',
  '👻',
  '💀',
  '🤐',
  '😴',
  '😷',
  '😵',
];

const Icons = ({ setContent, content }) => {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center items-center rounded-md px-4 py-2  text-sm font-medium text-black  focus:outline-purple-400 focus:outline focus:outline-offset-2">
            <span>😄</span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute bottom-10 right-10 mt-2 w-56 origin-bottom-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 ">
            <div className="px-1 py-1 ">
              {reactions.map((icon) => (
                <span key={icon} onClick={() => setContent(content + icon)}>
                  {icon}
                </span>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Icons;
