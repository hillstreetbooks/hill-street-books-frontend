import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Footer, Header } from '../components';
import {
  Error,
  ForgotPassword,
  Login,
  Registration,
  ResetPassword
} from '../views';
import { ROUTES } from '../constants/Strings';

const routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTRATION} element={<Registration />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.PASSWORD_RESET} element={<ResetPassword />} />
        <Route path={ROUTES.ALL} element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default routes;
