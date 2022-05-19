import React from 'react';

import Logo from './Logo';
import MobileNavLinks from './MobileNavLinks';

import NavLinks from './NavLinks';
import Search from './Search';

const Header = () => {
  return (
    <div className="shadow-lg fixed h-24 bg-white top-0 left-0 right-0 dark:bg-slate-800 transition-colors  ease-in delay-300 z-50">
      <nav className="justify-between px-8 py-4 max-w-screen-lg  mx-auto items-center  hidden md:flex h-full">
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
