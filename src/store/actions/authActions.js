import {
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,

  // FIRESTORE_ERROR,
} from '../actionTypes';

const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  };
};

const loginError = (err) => {
  return {
    type: LOGIN_ERROR,
    payload: err,
  };
};

const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

const logoutError = (err) => {
  return {
    type: LOGOUT_ERROR,
    payload: err,
  };
};

const createUserSuccess = () => {
  return {
    type: CREATE_USER_SUCCESS,
  };
};

const createUserError = (err) => {
  return {
    type: CREATE_USER_ERROR,
    payload: err,
  };
};

// const firestoreError = (err) => {
//   return {
//     type: FIRESTORE_ERROR,
//     payload: err,
//   };
// };

export const signIn = (email, password) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // const firebase = useFirebase();
    const firebase = getFirebase();
    const firestore = getFirestore();

    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(loginSuccess());
      })
      .catch((err) => {
        console.log('login error', err.message);
        dispatch(loginError(err.message));
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();

    return firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(logoutSuccess());
      })
      .catch((err) => {
        console.log('signout error', err.message);
        dispatch(logoutError(err.message));
      });
  };
};

export const signUp = (creds) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // const firebase = useFirebase();
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(creds.email, creds.password)
      .then((user) => {
        return firestore
          .collection('users')
          .doc(user.user.uid)
          .set({
            firstName: creds.firstName,
            lastName: creds.lastName,
            email: creds.email,
            initials: creds.firstName[0] + creds.lastName[0],
            role: 'user',
          })
          .then(() => {
            firebase.dispatch(createUserSuccess());
          });
      })
      .catch((err) => {
        console.log('error', err.message);
        dispatch(createUserError(err.message));
      });
  };
};
