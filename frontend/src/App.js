import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Alert } from './components';
import { PageRenderer } from './customRouter';
import { Home, Register } from './pages';

import { ToastContainer } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { refreshToken } from './features';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <div className="h-full">
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
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />
        <Route path="/:page" element={<PageRenderer />} />

        {/* <PrivateRouter path="/:page" element={PageRenderer} />
          <PrivateRouter path="/:page/:id" element={PageRenderer} /> */}
      </Routes>
    </div>
  );
};

export default App;
