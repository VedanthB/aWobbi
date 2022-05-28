import React from 'react';
import { NavLink } from 'react-router-dom';

import { MdNotificationsActive } from 'react-icons/md';
import MobileNavDropdown from './MobileNavDropdown';
import { useTheme } from '../../context';
import NotifyModal from './NotifyModal';

let activeStyle = {
  color: '#6366F1',
  transition: 'all 0.2s ease-in',
};

const MobileNavLinks = () => {
  const { theme } = useTheme();

  return (
    <ul className="flex z-50 bg-white dark:bg-slate-800 gap-16 justify-around items-center w-full">
      <li>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          {theme === 'light' ? (
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
          )}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/chat"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          {theme === 'light' ? (
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
          )}
        </NavLink>
      </li>
      <li>
        <NotifyModal />
      </li>
      <li>
        <MobileNavDropdown />
      </li>
    </ul>
  );
};

export default MobileNavLinks;
