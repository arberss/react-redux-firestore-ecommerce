import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteLocalCart } from '../../store/actions/localCartAction';

function Watchlist() {
  const dispatch = useDispatch();

  const watchList = useSelector((state) => state.localCart.cart);

  return (
    <div className={watchList.length > 0 ? 'products' : 'products-empty'}>
      {watchList && watchList.length > 0 ? (
        watchList.map((item) => {
          const { id, fileUrl, title, price } = item;

          return (
            <div className='product' key={id}>
              <div className='product__img'>
                <img src={fileUrl} alt='' />
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
                  <div>
                    <abbr title='Delete'>
                      <MdDeleteForever
                        className='product__icon product__icon--delete'
                        onClick={() => dispatch(deleteLocalCart(id))}
                      />
                    </abbr>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1>You don't have any product in watchlist.</h1>
      )}
    </div>
  );
}

export default Watchlist;
