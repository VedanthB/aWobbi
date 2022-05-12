import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageRenderer } from './customRouter';
import { Home, Register } from './pages';

const App = () => {
  return (
    <div className="App">
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
