import {
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  // FIRESTORE_ERROR,
} from '../actionTypes';

const initialState = {
  authError: null,
  isAuth: false,
};

console.log(initialState.authError);

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      console.log('signup success');
      return {
        ...state,
        authError: null,
        isAuth: true,
      };
    case CREATE_USER_ERROR:
      console.log('signup error', action.payload);
      return {
        ...state,
        authError: action.payload,
        isAuth: true,
      };
    case LOGIN_SUCCESS:
      console.log('login success');
      return {
        ...state,
        authError: null,
        isAuth: true,
      };
    case LOGIN_ERROR:
      console.log('login error', action.payload);
      return {
        ...state,
        authError: action.payload,
        isAuth: true,
      };
    case LOGOUT_SUCCESS:
      console.log('logut success');
      return {
        ...state,
        authError: null,
        isAuth: false,
      };
    case LOGOUT_ERROR:
      console.log('logut error', action.payload);
      return {
        ...state,
        authError: action.payload,
        isAuth: false,
      };

    default:
      return state;
  }
};
