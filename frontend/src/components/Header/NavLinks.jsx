import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BsMessenger } from 'react-icons/bs';
import NavLinkDropdown from './NavLinkDropdown';
import NotifyModal from './NotifyModal';

const NavLinks = () => {
  return (
    <ul className="flex gap-6 justify-center items-center">
      <li>
        <NavLink to="/">
          {({ isActive }) => (
            <AiFillHome
              className={
                isActive
                  ? 'w-6 h-6 text-purple-500'
                  : 'w-6 h-6 dark:text-gray-100'
              }
            />
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/chat">
          {({ isActive }) => (
            <BsMessenger
              className={
                isActive
                  ? 'w-6 h-6 text-purple-500'
                  : 'w-6 h-6 dark:text-gray-100'
              }
            />
          )}
        </NavLink>
      </li>
      <li>
        <NotifyModal />
      </li>
      <li>
        <NavLinkDropdown />
      </li>
    </ul>
  );
};

export default NavLinks;
