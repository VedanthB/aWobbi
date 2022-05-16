import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  return (
    <div className="flex justify-center  items-center">
      <input
        type="text"
        className="shadow-md px-8 py-2 w-96 rounded focus:outline-indigo-400 focus:outline focus:outline-offset-2"
        placeholder="Search User"
      />
      <FaSearch className="relative right-[378px] text-gray-500" />
    </div>
  );
};

export default Search;
