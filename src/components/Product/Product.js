import React, { useEffect, useState } from 'react';
import './Product.scss';
import { NavLink as Link } from 'react-router-dom';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase';
import { deleteProductFromDb } from '../../store/actions/productAction';
import {
  addLocalCart,
  deleteLocalCart,
} from '../../store/actions/localCartAction';
import { editImage } from '../../store/actions/productAction';

import { RiEdit2Fill } from 'react-icons/ri';
import PulseLoader from 'react-spinners/PulseLoader';

function Product() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const firebase = useFirebase();

  // get all products from firestore
  useFirestoreConnect({
    collection: 'products',
  });

  // get all products from firestore
  const allProducts = useSelector(
    (state) => state.firestore.ordered && state.firestore.ordered.products
  );

  // get current user role
  const userRole = useSelector(
    (state) => state.firebase.profile && state.firebase.profile.role
  );

  // get local storage
  const inLocalStorage = useSelector((state) => state.localCart.cart);

  // edit product image
  const onFileChange = async (e, id) => {
    setIsLoading(true);
    let file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    const setImg = await fileRef.getDownloadURL();
    dispatch(editImage(id, setImg));
    e.target.value = '';
    setIsLoading(false);
  };

  return (
    // loop throgh all products to find if specific product is in local storage
    <div className='products'>
      {allProducts &&
        allProducts.map((item) => {
          const findLocalItem = inLocalStorage.find(
            (local) => local.id === item.id
          );

          const { id, title, price, fileUrl } = item;
          const productObj = {
            id,
            title,
            price,
            fileUrl,
          };

          let checkForSaved = null;
          // if product is in local storage we can delete
          if (findLocalItem) {
            checkForSaved = (
              <div>
                <abbr title='Remove from watchlist'>
                  <AiTwotoneHeart
                    className='product__icon'
                    onClick={() => dispatch(deleteLocalCart(id))}
                  />
                </abbr>
              </div>
            );
            // if is not , add in local storage
          } else {
            checkForSaved = (
              <div>
                <abbr title='Add to watchlist'>
                  <AiOutlineHeart
                    className='product__icon'
                    onClick={() => dispatch(addLocalCart(productObj))}
                  />
                </abbr>
              </div>
            );
          }

          return (
            <div className='product' key={id}>
              <div className='product__img'>
                {userRole === 'admin' ? (
                  //if role is admin
                  <>
                    <img src={fileUrl} alt='' />
                    {isLoading ? (
                      <div className='product__imgloading'>
                        <PulseLoader size={4} />
                      </div>
                    ) : (
                      <label htmlFor='fileUrl' className='product__imageicon'>
                        <input
                          type='file'
                          name='fileUrl'
                          style={{
                            width: '100%',
                            height: '100%',
                            opacity: 0,
                            zIndex: 2,
                            cursor: 'pointer',
                            fontSize: 0,
                          }}
                          onChange={(e) => onFileChange(e, id)}
                        />
                        <RiEdit2Fill style={{ cursor: 'pointer' }} />
                      </label>
                    )}
                  </>
                ) : (
                  <img src={fileUrl} alt='' />
                )}
              </div>
              <div className='product__content'>
                <div className='product__title'>
                  {title.slice(0, 50) + '...'}
                </div>
                <div className='product__price'>{price}$</div>
                <div className='product__info'>
                  <Link className='link' to={'/product/detail/' + id}>
                    <button className='product__btn'>Details</button>
                  </Link>
                  {!userRole || userRole === 'user' ? (
                    // if role is not admin put heart icon
                    checkForSaved
                  ) : userRole === 'admin' ? (
                    // if user is admin put delete icon
                    <div>
                      <abbr title='Delete'>
                        <MdDeleteForever
                          className='product__icon product__icon--delete'
                          onClick={() => dispatch(deleteProductFromDb(id))}
                        />
                      </abbr>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Product;
