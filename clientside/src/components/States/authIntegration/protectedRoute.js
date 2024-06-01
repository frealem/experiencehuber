import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles }) => {
  const accessToken=localStorage.getItem("accessToken")
  const type=localStorage.getItem("type")
  const location = useLocation();

  // Check if the user is authenticated
  const isAuthenticated = Boolean(accessToken);

  // Check if the user has the required role
  // const hasRequiredRole = allowedRoles?.includes(type);
  const hasRequiredRole =Boolean(type);

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/authpage" state={{ from: location.pathname }} replace />;
  }

  // If the user doesn't have the required role, redirect them to the unauthorized page
  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />;
  }

  // If the user is authenticated and has the required role, render the child components
  return <Outlet />;
};

export default ProtectedRoute;
