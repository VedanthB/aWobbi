import React from 'react';
import { useTheme } from '../context';

const Notfound = () => {
  const { theme } = useTheme();
  return (
    <div className="flex max-w-5xl items-center justify-center mx-auto">
      <img
        src={
          theme === 'light'
            ? 'https://res.cloudinary.com/supertramp69420/image/upload/v1653658149/404_Error_cgbaqt.gif'
            : 'https://res.cloudinary.com/supertramp69420/image/upload/v1653658410/404_Error_1_e1afma.gif'
        }
        alt="404 "
      />
    </div>
  );
};

export default Notfound;
