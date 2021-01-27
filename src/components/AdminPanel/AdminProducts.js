import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { NavLink as Link } from 'react-router-dom';
import { RiEdit2Fill } from 'react-icons/ri';

function AdminProducts() {
  useFirestoreConnect({
    collection: 'products',
  });

  const allProducts = useSelector(
    (state) => state.firestore.ordered && state.firestore.ordered.products
  );

  return (
    <div className='products'>
      {allProducts &&
        allProducts.map((item) => {
          return (
            <div className='product' key={item.id}>
              <div className='product__img'>
                <img src={item.fileUrl} alt='' />
                <RiEdit2Fill className='product__imageicon' />
              </div>
              <div className='product__content'>
                <div className='product__title'>
                  {item.title.slice(0, 50) + '...'}
                </div>
                <div className='product__price'>{item.price}$</div>
                <div className='product__info'>
                  <Link className='link' to={'/product/detail/' + item.id}>
                    <button className='product__btn'>Details</button>
                  </Link>
                  <div>
                    <MdDeleteForever className='product__icon' />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default AdminProducts;
