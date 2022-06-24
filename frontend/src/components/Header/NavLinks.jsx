import React from 'react';
import { NavLink } from 'react-router-dom';
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
                src="https://cdn.lordicon.com/igpbsrza.json"
                trigger="morph"
                stroke="70"
                colors={'primary:#545454'}
                style={{ width: '2.5rem', height: '2.5rem' }}
              ></lord-icon>
            ) : (
              <lord-icon
                src="https://cdn.lordicon.com/igpbsrza.json"
                trigger="morph"
                stroke="70"
                colors={'primary:#a855f7 '}
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
                src="https://cdn.lordicon.com/uvextprq.json"
                trigger="morph"
                stroke="70"
                colors={'primary:#545454'}
                style={{ width: '2.5rem', height: '2.5rem' }}
              ></lord-icon>
            ) : (
              <lord-icon
                src="https://cdn.lordicon.com/uvextprq.json"
                trigger="morph"
                stroke="70"
                colors={'primary:#a855f7 '}
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
