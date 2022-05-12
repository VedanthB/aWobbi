import { Route, Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = (props) => {
  const firstLogin = localStorage.getItem('firstLogin');

  let location = useLocation();
  return firstLogin ? (
    <Route {...props} />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRouter;
