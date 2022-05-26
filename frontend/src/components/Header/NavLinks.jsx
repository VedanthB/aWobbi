import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BsMessenger } from 'react-icons/bs';
import NavLinkDropdown from './NavLinkDropdown';
import NotifyModal from './NotifyModal';

import lottie from 'lottie-web';
import { defineLordIconElement } from 'lord-icon-element';

defineLordIconElement(lottie.loadAnimation);

const NavLinks = () => {
  return (
    <ul className="flex gap-6 justify-center items-center">
      <li>
        <NavLink to="/">
          {({ isActive }) => (
            // <AiFillHome
            //   className={
            //     isActive
            //       ? 'w-6 h-6 text-purple-500'
            //       : 'w-6 h-6 dark:text-gray-100'
            //   }
            // />

            <lord-icon
              src="https://cdn.lordicon.com/gmzxduhd.json"
              trigger="click"
              stroke="70"
              colors={'primary:#121331 ,secondary:#a855f7'}
              style={{ width: '2.5rem', height: '2.5rem' }}
            ></lord-icon>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink to="/chat">
          {({ isActive }) => (
            // <BsMessenger
            //   className={
            //     isActive
            //       ? 'w-6 h-6 text-purple-500'
            //       : 'w-6 h-6 dark:text-gray-100'
            //   }
            // />

            <lord-icon
              src="https://cdn.lordicon.com/rhvddzym.json"
              trigger="click"
              stroke="70"
              colors={'primary:#121331,secondary:#a855f7'}
              style={{ width: '3rem', height: '3rem' }}
            ></lord-icon>
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
