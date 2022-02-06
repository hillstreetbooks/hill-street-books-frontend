import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer } from '../components';
import { Login, Registration } from '../views';
import { ROUTES } from '../constants/Strings';

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTRATION} element={<Registration />} />
        <Route
          path={ROUTES.ALL}
          element={<div>Custom Error page coming soon</div>}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default routes;
