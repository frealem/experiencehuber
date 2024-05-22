import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles }) => {
  const { type, accessToken } = useSelector((state) => state.auth);

  // Check if the user is authenticated
  const isAuthenticated = Boolean(accessToken);

  // Check if the user has the required role
  const hasRequiredRole = allowedRoles.includes(type);

  if (!isAuthenticated) {
    return <Navigate to="/authpage" />;
  }

  // if (!hasRequiredRole) {
  //   return <Navigate to="/unauthorized" />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;
