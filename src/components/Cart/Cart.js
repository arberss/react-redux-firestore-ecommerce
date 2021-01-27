import React, { useEffect, useState } from 'react';
import './Cart.scss';
import { BsArrowDown } from 'react-icons/bs';
import { BsArrowUp } from 'react-icons/bs';
import { TiDelete } from 'react-icons/ti';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useDispatch, useSelector } from 'react-redux';
import {
  increaseAmount,
  decreaseAmount,
  deleteProductFromCart,
} from '../../store/actions/cartAction';

function Cart() {
  const [userCart, setUserCart] = useState([]);
  const [didMount, setDidMount] = useState(false);
  const [productTotal, setProductTotal] = useState([]);

  const dispatch = useDispatch();

  // get current user id
  const userId = useSelector(
    (state) => state.firebase.auth && state.firebase.auth.uid
  );

  // get all products from firestore
  useFirestoreConnect({
    collection: 'products',
  });

  // get all prodcuts from firestore
  const getProducts = useSelector(
    (state) => state.firestore.ordered && state.firestore.ordered.products
  );

  // get cart where cart.userid is === to current user id
  useFirestoreConnect({
    collection: 'cart',
    where: ['userId', '==', userId],
  });

  // get cart from firestore
  const getCart = useSelector(
    (state) => state.firestore.ordered && state.firestore.ordered.cart
  );

  // loop through all carts and products to find specific product
  useEffect(() => {
    setDidMount(true);
    let productArr = [];
    let productPrice = [];
    getCart &&
      getCart.forEach((item) => {
        getProducts &&
          getProducts.map((product) => {
            const { productId, id, amount } = item;
            if (productId === product.id) {
              productArr.push({ ...product, cartId: id, amount });
              productPrice.push(product.price * amount);
            }
          });
      });
    setUserCart([...productArr]);
    setProductTotal(productPrice);
    return () => setDidMount(false);
  }, [getCart]);

  if (!didMount) {
    return null;
  }

  console.log(productTotal);

  const findTotal = () => {
    let sum = 0;
    productTotal.reduce((a, b) => (sum = a + b), 0);
    return sum;
  };

  return (
    <div className='container'>
      {getProducts ? (
        <table className='table'>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userCart
              ? userCart.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td className='table__img'>
                        <img
                          className='table__img--in'
                          src={item.fileUrl}
                          alt=''
                        />
                      </td>
                      <td className='table__title'>{item.title}</td>
                      <td className='table__price'>{item.price}$</td>
                      <td className='table__amount'>
                        <BsArrowDown
                          className='table__amount--btn'
                          onClick={(e) =>
                            dispatch(decreaseAmount(item.cartId, item.amount))
                          }
                        />
                        <input
                          className='table__count'
                          type='number'
                          disabled
                          name='amount'
                          value={item.amount}
                        />
                        <BsArrowUp
                          className='table__amount--btn'
                          onClick={(e) =>
                            dispatch(increaseAmount(item.cartId, item.amount))
                          }
                        />
                      </td>
                      <td className='table__total'>
                        {item.price * item.amount}$
                      </td>
                      <td className='table__delete'>
                        <TiDelete
                          className='table__del'
                          onClick={() =>
                            dispatch(deleteProductFromCart(item.cartId))
                          }
                        />
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      ) : // <h1>Total: {findTotal()}$</h1>
      null}
    </div>
  );

  // return (
  //   <div className='container'>
  //     <table className='table'>
  //       <thead>
  //         <tr>
  //           <th></th>
  //           <th>Title</th>
  //           <th>Price</th>
  //           <th>Amount</th>
  //           <th>Total</th>
  //           <th></th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {userCart && userId
  //           ? userCart.map((item) => {
  //               return (
  //                 <tr key={item.id}>
  //                   <td className='table__img'>
  //                     <img className='table__img--in' src={tshirt} alt='' />
  //                   </td>
  //                   <td className='table__title'>{item.title}</td>
  //                   <td className='table__price'>25$</td>
  //                   <td className='table__amount'>
  //                     <BsArrowDown className='table__amount--btn' /> 2{' '}
  //                     <BsArrowUp className='table__amount--btn' />
  //                   </td>
  //                   <td className='table__total'>50$</td>
  //                   <td className='table__delete'>
  //                     <TiDelete className='table__del' />
  //                   </td>
  //                 </tr>
  //               );
  //             })
  //           : null}
  //       </tbody>
  //     </table>
  //   </div>
  // );

  // return (
  //   <div className='container'>
  //     <table className='table'>
  //       <tr>
  //         <th></th>
  //         <th>Title</th>
  //         <th>Price</th>
  //         <th>Amount</th>
  //         <th>Total</th>
  //         <th></th>
  //       </tr>
  //       <tr>
  //         <td className='table__img'>
  //           <img className='table__img--in' src={tshirt} alt='' />
  //         </td>
  //         <td className='table__title'>Tshirt for men</td>
  //         <td className='table__price'>25$</td>
  //         <td className='table__amount'>
  //           <BsArrowDown className='table__amount--btn' /> 2{' '}
  //           <BsArrowUp className='table__amount--btn' />
  //         </td>
  //         <td className='table__total'>50$</td>
  //         <td className='table__delete'>
  //           <TiDelete className='table__del' />
  //         </td>
  //       </tr>
  //     </table>
  //   </div>
  // );
}

export default Cart;
