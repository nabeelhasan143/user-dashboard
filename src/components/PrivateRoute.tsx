import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  return token ? (
    element
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;
