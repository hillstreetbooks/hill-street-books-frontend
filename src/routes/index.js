import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer, Header } from '../components';
import {
  Author,
  AuthorEdit,
  Dashboard,
  Error,
  ForgotPassword,
  Login,
  Profile,
  Registration,
  ResetPassword
} from '../views';
import { ROUTES } from '../constants/Strings';
import { RequireAuth } from './middleware/auth';

const routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} exact element={<Login />} />
        <Route path={ROUTES.LOGIN} exact element={<Login />} />
        <Route path={ROUTES.REGISTRATION} element={<Registration />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.PASSWORD_RESET} element={<ResetPassword />} />
        <Route
          path={ROUTES.PROFILE}
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path={ROUTES.AUTHOR_PAGE} element={<Author />} />
        <Route
          path={ROUTES.AUTHOR_EDIT_PAGE}
          element={
            <RequireAuth>
              <AuthorEdit />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.ADMIN_DASHBOARD}
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.ADMIN_AUTHOR_PAGE}
          element={<Author isAdmin={true} />}
        />
        <Route path={ROUTES.ALL} element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default routes;
