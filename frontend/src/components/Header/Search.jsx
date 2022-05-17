import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { SiReactos } from 'react-icons/si';

import { getDataAPI } from '../../utils';
import { useToast } from '../../hooks';
import SearchUserCard from './SearchUserCard';

const Search = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const { showToast } = useToast();

  const { auth } = useSelector((state) => state);

  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    setSearch(e.target.value.toLowerCase().replace(/ /g, ''));

    try {
      setLoading(true);

      const res = await getDataAPI(`search?username=${search}`, auth.token);

      setUsers(res.data.users);

      setLoading(false);
    } catch (error) {
      showToast(error.response.data.msg, 'error');
    }
  };

  return (
    <div className="">
      <div className="flex justify-center  items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e)}
          className="shadow-md px-8 py-2 w-96 rounded focus:outline-purple-400 focus:outline focus:outline-offset-2"
          placeholder="Search User"
        />
        <FaSearch className="relative right-[378px] text-gray-500" />
        {!loading && search.length > 0 && (
          <AiFillCloseCircle
            onClick={() => {
              setSearch('');
              setUsers([]);
            }}
            className="relative right-10 text-red-500 hover:text-red-600"
          />
        )}

        {loading && (
          <SiReactos className="relative right-10 text-purple-500 animate-spin" />
        )}
      </div>

      {users && search.length > 0 && (
        <div className="absolute shadow w-96 mt-2 p-6 bg-purple-100 rounded-md overflow-x-scroll h-[200px]">
          {users &&
            users.map((user) => <SearchUserCard user={user} key={user} />)}
        </div>
      )}
    </div>
  );
};

export default Search;
