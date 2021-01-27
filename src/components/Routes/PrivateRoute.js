import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  const checkUser = useSelector((state) => state.firebase.auth.uid);
  return (
    <Route
      {...rest}
      render={(props) => {
        return !checkUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              // pathname: '/',
              pathname: '/products',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
}

export default PrivateRoute;
