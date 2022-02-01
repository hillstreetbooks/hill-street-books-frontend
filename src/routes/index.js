import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../views';
import { ROUTES } from '../constants/Strings';

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route
          path={ROUTES.ALL}
          element={<div>Custom Error page coming soon</div>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
