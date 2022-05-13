import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
  const firstLogin = localStorage.getItem('firstLogin');

  let location = useLocation();

  const { auth } = useSelector((state) => state);

  return firstLogin ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRouter;
