import React, { useEffect } from 'react';
import io from 'socket.io-client';

import { Route, Routes } from 'react-router-dom';
import { Alert, CreatePostModal, Header } from './components';
import { PageRenderer, PrivateRouter } from './customRouter';
import { Home, Login, Register } from './pages';

import { ToastContainer } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { getPosts, refreshToken } from './features';
import { useToast } from './hooks';

// socket

const App = () => {
  const { auth, postModal } = useSelector((state) => state);

  const dispatch = useDispatch();

  const { showToast } = useToast();

  useEffect(() => {
    dispatch(refreshToken());

    const socket = io();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts({ token: auth.token, showToast }));
    }
  }, [dispatch, auth.token]);

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
      {postModal.isModalOpen && <CreatePostModal />}

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
