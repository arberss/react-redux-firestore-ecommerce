import {
  ADD_LOCAL_CART_SUCCESS,
  DELETE_LOCAL_CART_SUCCESS,
} from '../actionTypes';

const initialState = {
  cart: [],
};

export const localCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LOCAL_CART_SUCCESS:
      console.log(state.cart);
      return {
        ...state,
        cart: state.cart ? [...state.cart, action.payload] : action.payload,
      };
    case DELETE_LOCAL_CART_SUCCESS:
      const newCart = state.cart.filter((item) => item.id !== action.payload);
      console.log(newCart);
      return {
        ...state,
        cart: newCart,
      };
    default:
      return state;
  }
};
