import React from 'react';
import './Detail.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Link, useHistory } from 'react-router-dom';
import { deleteProductFromDb } from '../../../store/actions/productAction';
import { addLocalCart } from '../../../store/actions/localCartAction';
import { addProductCart } from '../../../store/actions/cartAction';
import { addProductCartII } from '../../../store/actions/cartAction';

function Detail(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  useFirestoreConnect({
    collection: 'products',
    doc: props.match.params.id,
  });
  const singleData = useSelector(
    ({ firestore: { data } }) =>
      data.products && data.products[props.match.params.id]
  );

  const userRole = useSelector(
    (state) => state.firebase.profile && state.firebase.profile.role
  );

  const getLocalCart = useSelector((state) => state.localCart.cart);
  const checkItem = getLocalCart.find(
    (item) => item.id === props.match.params.id
  );

  let localData = null;
  if (singleData) {
    const { title, category, price, fileUrl, description } = singleData;

    localData = {
      id: props.match.params.id,
      title,
      price,
      fileUrl,
      category,
      description,
    };
  }

  let userItem = null;
  if (checkItem) {
    userItem = (
      <button className='detail__btn detail__btn--later' disabled>
        Saved for Later
      </button>
    );
  } else {
    userItem = (
      <button
        className='detail__btn detail__btn--tocart'
        onClick={() => dispatch(addLocalCart(localData))}
      >
        Save for Later
      </button>
    );
  }

  const handleDelete = (id) => {
    dispatch(deleteProductFromDb(id));
    history.push('/products');
  };

  return singleData ? (
    <div className='container'>
      <div className='detail'>
        <div className='detail__image'>
          <img className='detail__img' src={singleData.fileUrl} alt='' />
        </div>
        <div className='detail__content'>
          <h2 className='detail__title'>{singleData.title}</h2>
          <span className='detail__category'>
            <b>Category:</b> {singleData.category}
          </span>
          <span className='detail__price'>
            <b>Price:</b> {singleData.price}$
          </span>
          <div className='detail__description'>
            <b>Description:</b> {singleData.description}
          </div>

          <button
            className='detail__btn detail__btn--back '
            onClick={() => history.goBack()}
          >
            Back
          </button>
          {userRole === 'admin' ? (
            <>
              <button
                className='detail__btn detail__btn--remove'
                onClick={() => handleDelete(props.match.params.id)}
              >
                Delete Product
              </button>
              <Link to={'/product/update/' + props.match.params.id}>
                <button className='detail__btn detail__btn--update'>
                  Update Product
                </button>
              </Link>
            </>
          ) : userRole === 'user' ? (
            // <button
            //   className='detail__btn detail__btn--tocart'
            //   onClick={() => dispatch(addProductCart(props.match.params.id))}
            // >
            //   Add to Cart
            // </button>
            <button
              className='detail__btn detail__btn--tocart'
              onClick={() => dispatch(addProductCartII(localData))}
            >
              Add to Cart
            </button>
          ) : (
            userItem
          )}
        </div>
      </div>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}

export default Detail;
