import {
  ADD_TO_CART,
  ADD_TO_CART_ERROR,
  DELETE_FROM_CART,
} from '../actionTypes';

const add_to_cart = () => {
  return {
    type: ADD_TO_CART,
  };
};

const add_to_cart_error = (err) => {
  return {
    type: ADD_TO_CART_ERROR,
    payload: err,
  };
};

const delete_from_cart = () => {
  return {
    type: DELETE_FROM_CART,
  };
};

export const addProductCart = (productId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    const profile = getState().firebase.profile;

    return firestore
      .collection('cart')
      .doc()
      .set({
        userId,
        productId,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        amount: 1,
      })
      .then(() => {
        dispatch(add_to_cart());
      })
      .catch((err) => {
        dispatch(add_to_cart_error(err));
      });
  };
};

export const increaseAmount = (id, amount) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    return firestore
      .collection('cart')
      .doc(id)
      .update({
        amount: parseInt(amount) + 1,
      });
  };
};

export const decreaseAmount = (id, amount) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    return firestore
      .collection('cart')
      .doc(id)
      .update({
        amount: parseInt(amount) - 1,
      });
  };
};

export const deleteProductFromCart = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    return firestore
      .collection('cart')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Product deleted from cart');
        dispatch(delete_from_cart());
      })
      .catch((err) => console.log(err));
  };
};
