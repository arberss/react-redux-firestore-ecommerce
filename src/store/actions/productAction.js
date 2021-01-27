import { useParams } from 'react-router-dom';
import {
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
} from '../actionTypes';

const createProductSuccess = () => {
  return {
    type: CREATE_PRODUCT_SUCCESS,
  };
};

const createProductError = (err) => {
  return {
    type: CREATE_PRODUCT_ERROR,
    payload: err,
  };
};

const deleteProductSuccess = () => {
  return {
    type: DELETE_PRODUCT_SUCCESS,
  };
};

const deleteProductError = (err) => {
  return {
    type: DELETE_PRODUCT_ERROR,
    payload: err,
  };
};

export const createProduct = (creds) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const profile = getState().firebase.profile;
    const adminId = getState().firebase.auth.uid;

    return firestore
      .collection('products')
      .doc()
      .set({
        ...creds,
        adminFirstName: profile.firstName,
        adminLastName: profile.lastName,
        adminId: adminId,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch(createProductSuccess());
      })
      .catch((err) => {
        dispatch(createProductError(err));
      });
  };
};

export const updateProduct = (id, creds) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    return firestore
      .collection('products')
      .doc(id)
      .update({ ...creds });
  };
};

export const editImage = (id, img) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    return firestore.collection('products').doc(id).update({
      fileUrl: img,
    });
  };
};

export const deleteProductFromDb = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    if (window.confirm('Are you sure ?')) {
      return firestore
        .collection('products')
        .doc(id)
        .delete()
        .then(() => {
          dispatch(deleteProductSuccess());
        })
        .catch((err) => {
          dispatch(deleteProductError(err));
        });
    }
  };
};
