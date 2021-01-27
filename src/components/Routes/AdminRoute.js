import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

function AdminRoute({ component: Component, ...rest }) {
  const checkUser = useSelector((state) => state.firebase.auth.uid);

  useFirestoreConnect({
    collection: 'users',
    doc: checkUser,
  });

  const userRole = useSelector(
    ({ firestore: { data } }) => data.users && data.users[checkUser]
  );

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoaded(userRole) && userRole.role === 'admin') {
          return <Component {...props} />;
        } else if (
          (isLoaded(userRole) && userRole.role !== 'admin') ||
          !checkUser
        ) {
          return (
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
        }
      }}
    />
  );
}

export default AdminRoute;
