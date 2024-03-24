import React, { Children } from 'react';
import { useAuth } from '../hooks/useAuth';
import {NotFound} from '../pages/notFound';
import AuthRoute from './authRoute';

function AdminRoute({ children }) {
  const { user } = useAuth();
  return user.isAdmin ? (
    children
  ) : (
  <h1>404 Not Found Account</h1>
  );
}

const AdminRouteExport = ({ children }) => (
  <AuthRoute>
    <AdminRoute>{children}</AdminRoute>
  </AuthRoute>
);

export default AdminRouteExport;