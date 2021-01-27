import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './AddProduct.scss';

import { createProduct } from '../../store/actions/productAction';
import { useDispatch } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import PulseLoader from 'react-spinners/PulseLoader';

function AddProduct() {
  const [isLoading, setIsLoading] = useState(false);
  // const [title, setTitle] = useState('');
  // const [fileUrl, setFileUrl] = useState(null);
  // const [category, setCategory] = useState('Women');
  // const [price, setPrice] = useState('');
  // const [description, setDescription] = useState('');

  const firebase = useFirebase();
  const history = useHistory();

  // const onFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   console.log(file);
  //   const storageRef = firebase.storage().ref();
  //   const fileRef = storageRef.child(file.name);
  //   await fileRef.put(file);
  //   setFileUrl(await fileRef.getDownloadURL());
  // };

  const dispatch = useDispatch();

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const creds = {
  //     title,
  //     fileUrl,
  //     category,
  //     price,
  //     description,
  //   };

  //   dispatch(createProduct(creds));
  //   history.push('/admin');
  // };

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setIsLoading(true);
    const file = data.fileUrl[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef
      .put(file)
      .then(() => {
        return fileRef.getDownloadURL();
      })
      .then((fileUrl) => {
        const { title, category, price, description } = data;
        console.log(fileUrl);

        const creds = {
          title,
          category,
          price,
          description,
          fileUrl,
          fileName: data.fileUrl[0].name,
        };
        setIsLoading(true);
        dispatch(createProduct(creds));
      })
      .then(() => {
        setIsLoading(false);
        history.push('/admin');
      });
  };

  return (
    <div className='container' style={{ padding: 0 }}>
      <div className='grid'>
        <Sidebar />
        <div className='container'>
          <div className='add'>
            <h1 style={{ textAlign: 'center' }}>Add Product</h1>
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
                {errors.title && (
                  <p className='error'>{errors.title.message}</p>
                )}
              </div>

              <div className='add__group'>
                <label htmlFor='image'>Image</label>

                <input
                  className='add__input'
                  type='file'
                  name='fileUrl'
                  ref={register({
                    required: 'This field is required!',
                    pattern: {
                      value: /.(jpg|jpeg|png)$/i,
                      message: 'Not an image!',
                    },
                  })}
                />
                {errors.fileUrl && (
                  <p className='error'>{errors.fileUrl.message}</p>
                )}
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
                      message:
                        'Must be a number and optionally up to 2 decimals!',
                    },
                  })}
                />

                {errors.price && (
                  <p className='error'>{errors.price.message}</p>
                )}
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
                          value.trim().length > 50 ||
                          'Must be up to 50 characters'
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
                <button className='add__btn'>Add</button>
              )}

              {/* <button disabled={isLoading} className='add__btn'>
                Add
              </button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className='container' style={{ padding: 0 }}>
  //     <div className='grid'>
  //       <Sidebar />
  //       <div className='container'>
  //         <div className='add'>
  //           <h1 style={{ textAlign: 'center' }}>Add Product</h1>
  //           <form className='add__content' onSubmit={handleSubmit}>
  //             <div className='add__group'>
  //               <label htmlFor='title'>Title</label>

  //               <input
  //                 className='add__input'
  //                 type='text'
  //                 name='title'
  //                 value={title}
  //                 placeholder='Product Title'
  //                 onChange={(e) => setTitle(e.target.value)}
  //               />
  //             </div>

  //             <div className='add__group'>
  //               <label htmlFor='image'>Image</label>

  //               <input
  //                 className='add__input'
  //                 type='file'
  //                 onChange={onFileChange}
  //               />
  //             </div>

  //             <div className='add__group'>
  //               <label htmlFor='category'>Category</label>
  //               <select
  //                 className='add__input'
  //                 name='category'
  //                 placeholder='Product Category'
  //                 value={category}
  //                 onChange={(e) => setCategory(e.target.value)}
  //               >
  //                 <option value='Women'>Women</option>
  //                 <option value='Men'>Men</option>
  //               </select>
  //             </div>

  //             <div className='add__group'>
  //               <label htmlFor='price'>Price</label>

  //               <input
  //                 className='add__input'
  //                 type='text'
  //                 name='price'
  //                 placeholder='Product Price'
  //                 value={price}
  //                 onChange={(e) => setPrice(e.target.value)}
  //               />
  //             </div>

  //             <div className='add__group'>
  //               <label htmlFor='description'>Description</label>
  //               <textarea
  //                 className='add__area'
  //                 name='description'
  //                 placeholder='Product Description'
  //                 value={description}
  //                 onChange={(e) => setDescription(e.target.value)}
  //               />
  //             </div>

  //             <button className='add__btn'>Add</button>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default AddProduct;
