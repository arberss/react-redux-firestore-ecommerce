import {
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
} from '../actionTypes';

const initialState = {
  productError: null,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_SUCCESS:
      console.log('product created');
      return {
        ...state,
        productError: null,
      };
    case CREATE_PRODUCT_ERROR:
      console.log('product error', action.payload);
      return {
        ...state,
        productError: action.payload,
      };
    case DELETE_PRODUCT_SUCCESS:
      console.log('product deleted');
      return {
        ...state,
        productError: null,
      };
    case DELETE_PRODUCT_ERROR:
      console.log('product delete error', action.payload);
      return {
        ...state,
        productError: action.payload,
      };
    default:
      return state;
  }
};
