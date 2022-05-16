import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BsMessenger } from 'react-icons/bs';
import { MdNotificationsActive } from 'react-icons/md';
import NavLinkDropdown from './NavLinkDropdown';

let activeStyle = {
  color: '#6366F1',
  transition: 'all 0.2s ease-in',
};

const NavLinks = () => {
  return (
    <ul className="flex gap-6 justify-center items-center">
      <li>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <AiFillHome className="w-6 h-6" />
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/chat"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <BsMessenger className="w-6 h-6" />
        </NavLink>
      </li>
      <li>
        <MdNotificationsActive className="w-6 h-6" />
      </li>
      <li>
        <NavLinkDropdown />
      </li>
    </ul>
  );
};

export default NavLinks;
