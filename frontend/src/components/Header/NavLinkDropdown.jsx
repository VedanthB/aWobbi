import React, { Fragment } from 'react';

import { HiChevronDown } from 'react-icons/hi';
import { BsFillMoonStarsFill } from 'react-icons/bs';
import { BiLogOutCircle } from 'react-icons/bi';

import { Menu, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';

const NavLinkDropdown = () => {
  const { auth } = useSelector((state) => state);

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center items-center rounded-md px-4 py-2  text-sm font-medium text-black  focus:outline-indigo-400 focus:outline focus:outline-offset-2">
            <img
              src={auth.user.avatar}
              alt={auth.user.userName}
              className="h-6 w-6 rounded-full"
            />
            <HiChevronDown
              className="ml-2 -mr-1 h-5 w-5 text-slate-300 hover:text-slate-600"
              aria-hidden="true"
            />
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-indigo-400 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <img
                      src={auth.user.avatar}
                      alt={auth.user.userName}
                      className="h-4 w-4 rounded-full mr-3"
                    />
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-indigo-400 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <BsFillMoonStarsFill className="h-4 w-4 rounded-full mr-3" />
                    Dark Mode
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-indigo-400 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <BiLogOutCircle className="h-4 w-4 rounded-full mr-3" />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default NavLinkDropdown;
