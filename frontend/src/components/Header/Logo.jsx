import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link className="flex justify-between align-center" to="/">
      <img
        className="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
    </Link>
  );
};

export default Logo;
