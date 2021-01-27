import {
  ADD_TO_CART,
  ADD_TO_CART_ERROR,
  DELETE_FROM_CART,
} from '../actionTypes';

const initialState = {
  cartError: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      console.log('Added to cart');
      return {
        cartError: null,
      };
    case ADD_TO_CART_ERROR:
      console.log('Add to cart error', action.payload);
      return {
        cartError: action.payload,
      };
    case DELETE_FROM_CART:
      console.log('Deleted from cart');
      return {
        cartError: null,
      };
    default:
      return state;
  }
};
