import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        roles.includes(user.role) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/authpage', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
