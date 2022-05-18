import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Alert, Header } from './components';
import { PageRenderer, PrivateRouter } from './customRouter';
import { Home, Login, Register } from './pages';

import { ToastContainer } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from './features';

const App = () => {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <div className="h-full min-h-screen dark:bg-slate-900  transition-colors ease-in delay-300">
      <ToastContainer
        theme="light"
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />

      <Alert />

      {auth.token && <Header />}

      <Routes>
        <Route path="/" element={auth.token ? <Home /> : <Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/:page"
          element={
            <PrivateRouter>
              <PageRenderer />
            </PrivateRouter>
          }
        />

        <Route
          path="/:page/:id"
          element={
            <PrivateRouter>
              <PageRenderer />
            </PrivateRouter>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
