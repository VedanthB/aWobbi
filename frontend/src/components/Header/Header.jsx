import React from 'react';

import Logo from './Logo';
import MobileNavLinks from './MobileNavLinks';

import NavLinks from './NavLinks';
import Search from './Search';

const Header = () => {
  return (
    <div className="shadow-sm">
      <nav className="justify-between px-8 py-4 mx-auto items-center  hidden md:flex">
        <Logo />

        <Search />

        <NavLinks />
      </nav>

      <nav className="fixed md:hidden bottom-0 left-0 right-0 p-10 flex gap-8 justify-center items-center shadow">
        <MobileNavLinks />
      </nav>
    </div>
  );
};

export default Header;
