import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link className="flex justify-between align-center" to="/">
      <img
        className="w-32 h-32"
        src="https://res.cloudinary.com/supertramp69420/image/upload/v1653449504/aWoobi_3_esz9ni.png"
        alt="Workflow"
      />
    </Link>
  );
};

export default Logo;
