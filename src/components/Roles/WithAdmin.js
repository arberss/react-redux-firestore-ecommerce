import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import { useHistory } from 'react-router-dom';

function WithAdmin({ children }) {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const userId = useSelector(
    (state) => state.firebase.auth && state.firebase.auth.uid
  );

  useFirestoreConnect({
    collection: 'users',
    doc: userId,
  });

  const userRole = useSelector(
    ({ firestore: { data } }) => data.users && data.users[userId]
  );

  useEffect(() => {
    setLoading(true);

    if (!userId) {
      history.push('/login');
    }

    console.log(loading);
    if (loading) {
      console.log(userRole);
      if (userRole === null || (userRole && userRole.role !== 'admin')) {
        history.push('/');
      }
    }
  }, [userRole]);

  console.log(userRole);
  console.log(loading);
  return children;
}

export default WithAdmin;
