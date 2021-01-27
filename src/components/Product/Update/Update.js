import React, { useEffect, useState } from 'react';
import './Update.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { updateProduct } from '../../../store/actions/productAction';

import PulseLoader from 'react-spinners/PulseLoader';

function Update() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const firebase = useFirebase();
  const history = useHistory();
  const paramsId = useParams().id;

  useFirestoreConnect({
    collection: 'products',
    doc: paramsId,
  });

  const getData = useSelector(
    ({ firestore: { data } }) => data.products && data.products[paramsId]
  );

  const { register, handleSubmit, errors, setValue } = useForm();
  const onSubmit = (data) => {
    setIsLoading(true);
    const { title, category, price, description } = data;

    const creds = {
      title,
      category,
      price,
      description,
    };

    dispatch(updateProduct(paramsId, creds));
    setIsLoading(false);
    history.push('/admin');
  };

  useEffect(() => {
    if (getData) {
      setValue('title', getData.title);
      setValue('category', getData.category);
      setValue('price', getData.price);
      setValue('description', getData.description);
    }
  }, [getData]);

  return (
    <div className='container'>
      <div className='add'>
        <h1 style={{ textAlign: 'center' }}>Update Product</h1>
        <form className='add__content' onSubmit={handleSubmit(onSubmit)}>
          <div className='add__group'>
            <label htmlFor='title'>Title</label>

            <input
              className='add__input'
              type='text'
              name='title'
              placeholder='Product Title'
              ref={register({
                required: 'This field is required!',
                validate: {
                  hasValue: (value) => {
                    return value.trim() !== '' || 'Cannot be blank!';
                  },
                },
              })}
            />
            {errors.title && <p className='error'>{errors.title.message}</p>}
          </div>

          <div className='add__group'>
            <label htmlFor='category'>Category</label>
            <select
              className='add__input'
              name='category'
              placeholder='Product Category'
              ref={register({
                required: 'This field is required!',
              })}
            >
              <option value='Women'>Women</option>
              <option value='Men'>Men</option>
            </select>
            {errors.category && (
              <p className='error'>{errors.category.message}</p>
            )}
          </div>

          <div className='add__group'>
            <label htmlFor='price'>Price</label>

            <input
              className='add__input'
              type='text'
              name='price'
              placeholder='Product Price'
              ref={register({
                required: 'This field is required!',
                pattern: {
                  value: /^\d{1,}(\.\d{0,2})?$/,
                  message: 'Must be a number and optionally up to 2 decimals!',
                },
              })}
            />

            {errors.price && <p className='error'>{errors.price.message}</p>}
          </div>

          <div className='add__group'>
            <label htmlFor='description'>Description</label>
            <textarea
              className='add__area'
              name='description'
              placeholder='Product Description'
              ref={register({
                required: 'This field is required!',
                validate: {
                  checkValue: (value) => {
                    return (
                      value.trim().length > 50 || 'Must be up to 50 characters'
                    );
                  },
                },
              })}
            />
            {errors.description && (
              <p className='error'>{errors.description.message}</p>
            )}
          </div>

          {isLoading ? (
            <div
              style={{
                textAlign: 'center',
                marginTop: '20px',
              }}
            >
              <PulseLoader size={8} />
            </div>
          ) : (
            <div className='update'>
              <button className='update__btn' onClick={() => history.goBack()}>
                Cancel
              </button>
              <button className='update__btn'>Update</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Update;
