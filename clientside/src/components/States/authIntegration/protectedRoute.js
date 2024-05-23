import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles }) => {
  const { type, accessToken } = useSelector((state) => state.auth);
const location=useLocation();
  // Check if the user is authenticated
  const isAuthenticated = Boolean(accessToken);

  // Check if the user has the required role
  const hasRequiredRole = allowedRoles?.includes(type)

  if (!isAuthenticated) {
    return <Navigate to="/authpage"  state={{from:location}} replace/>;
  }

  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" state={{from:location}} replace/>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
