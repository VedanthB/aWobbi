import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BsMessenger } from 'react-icons/bs';
import NavLinkDropdown from './NavLinkDropdown';
import NotifyModal from './NotifyModal';

import lottie from 'lottie-web';
import { defineLordIconElement } from 'lord-icon-element';
import { useTheme } from '../../context';

defineLordIconElement(lottie.loadAnimation);

const NavLinks = () => {
  const { theme } = useTheme();
  return (
    <ul className="flex gap-6 justify-center items-center">
      <li>
        <NavLink to="/">
          {({ isActive }) =>
            theme === 'light' ? (
              <lord-icon
                src="https://cdn.lordicon.com/gmzxduhd.json"
                trigger="click"
                stroke="70"
                colors={'primary:#121331 ,secondary:#a855f7'}
                style={{ width: '2.5rem', height: '2.5rem' }}
              ></lord-icon>
            ) : (
              <lord-icon
                src="https://cdn.lordicon.com/gmzxduhd.json"
                trigger="click"
                stroke="70"
                colors={'primary:#ffffff ,secondary:#a855f7'}
                style={{ width: '2.5rem', height: '2.5rem' }}
              ></lord-icon>
            )
          }
        </NavLink>
      </li>
      <li>
        <NavLink to="/chat">
          {({ isActive }) =>
            theme === 'light' ? (
              <lord-icon
                src="https://cdn.lordicon.com/rhvddzym.json"
                trigger="click"
                stroke="70"
                colors={'primary:#121331 ,secondary:#a855f7'}
                style={{ width: '2.5rem', height: '2.5rem' }}
              ></lord-icon>
            ) : (
              <lord-icon
                src="https://cdn.lordicon.com/rhvddzym.json"
                trigger="click"
                stroke="70"
                colors={'primary:#ffffff ,secondary:#a855f7'}
                style={{ width: '2.5rem', height: '2.5rem' }}
              ></lord-icon>
            )
          }
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
