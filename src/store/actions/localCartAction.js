import {
  ADD_LOCAL_CART_SUCCESS,
  DELETE_LOCAL_CART_SUCCESS,
} from '../actionTypes';

export const addLocalCart = (product) => {
  return {
    type: ADD_LOCAL_CART_SUCCESS,
    payload: product,
  };
};

export const deleteLocalCart = (id) => {
  return {
    type: DELETE_LOCAL_CART_SUCCESS,
    payload: id,
  };
};
