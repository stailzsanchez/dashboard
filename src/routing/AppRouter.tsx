import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../pages/SignIn/SignIn';
import Dashboard from '../pages/Dashboard/Dashboard';
import { ROUTES } from './index';
import { useTokenContext } from '../context';

const AppRouter = () => {
  const { token } = useTokenContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(ROUTES.DASHBOARD);
    } else {
      navigate(ROUTES.LOGIN);
    }
  }, [token]);

  return (
    <div className="App">
      {token ? (
        <Routes>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route
            path="*"
            element={<Navigate to={ROUTES.DASHBOARD} replace />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRouter;
