import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import { useHistory } from 'react-router-dom';

function WithLogin({ children }) {
  const history = useHistory();
  const userId = useSelector(
    (state) => state.firebase.auth && state.firebase.auth.uid
  );

  const userIdd = useSelector(
    (state) => state.firebase.auth && state.firebase.auth
  );
  console.log(userIdd);

  // useFirestoreConnect({
  //   collection: 'users',
  //   doc: userId,
  // });

  // const userRole = useSelector(
  //   ({ firestore: { data } }) => data.users && data.users[userId]
  // );

  useEffect(() => {
    console.log(userId);
    if (userId) {
      history.push('/products/?category=All');
    }

    // return userId;
  }, [userId]);

  return children;
}

export default WithLogin;
