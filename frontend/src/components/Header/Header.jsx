import React from 'react';

import Logo from './Logo';
import NavLinks from './NavLinks';
import Search from './Search';

const Header = () => {
  return (
    <div className="shadow-sm">
      <nav className="flex justify-between px-8 py-4 mx-auto items-center">
        <Logo />

        <Search />

        <NavLinks />
      </nav>
    </div>
  );
};

export default Header;
