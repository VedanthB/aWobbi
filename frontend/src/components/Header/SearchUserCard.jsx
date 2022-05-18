import React from 'react';
import { Link } from 'react-router-dom';

const SearchUserCard = ({ user }) => {
  return (
    <Link
      to={`/user/${user._id}`}
      className="flex items-center bg-white p-2 mb-3 w-full rounded cursor-pointer hover:shadow-md"
    >
      <img
        src={user.avatar}
        alt={user.userName}
        className="h-12 w-12 rounded-full mr-5"
      />

      <div className="flex flex-col">
        <h4 className="underline text-2xl">{user.userName}</h4>
        <p className="text-xl text-gray-500">{user.fullName}</p>
      </div>
    </Link>
  );
};

export default SearchUserCard;
