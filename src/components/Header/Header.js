import React from 'react';
import './Header.scss';
import { FaShoppingBasket, FaClipboardList } from 'react-icons/fa';
import { NavLink as Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import { useFirestoreConnect } from 'react-redux-firebase';
// import { useFirestoreConnect } from 'react-redux-firebase';

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = useSelector((state) => state.firebase.auth.uid);

  // get current user
  useFirestoreConnect([
    {
      collection: 'users',
      doc: userId,
    },
  ]);

  // get current user from firestore
  const userRole = useSelector(
    ({ firestore: { data } }) => data.users && data.users[userId]
  );

  // signout
  const handleSignout = () => {
    dispatch(signOut());
    history.push('/login');
  };

  return (
    <div className='nav'>
      <div className='container'>
        <div className='nav__content'>
          <div className='nav__logo'>FireDux</div>
          <ul className='nav__links mobile'>
            <Link
              exact
              activeStyle={{ color: '#ffff66' }}
              className='link'
              to='/'
            >
              <li className='nav__list'>Home</li>
            </Link>
            <Link
              activeStyle={{ color: '#ffff66' }}
              className='link'
              to='/products'
            >
              <li className='nav__list'>Products</li>
            </Link>
          </ul>
          {/* <div className='nav__right nav__links'> */}
          <div className='nav__links'>
            {userRole && userRole.role === 'admin' ? (
              <Link
                activeStyle={{ color: '#ffff66' }}
                className='link'
                to='/admin'
              >
                <div className='nav__list'>Admin</div>
              </Link>
            ) : userRole && userRole.role === 'user' ? (
              <>
                <Link
                  activeStyle={{ color: '#ffff66' }}
                  className='link'
                  to='/cart'
                >
                  <div className='nav__list'>
                    <abbr title='Cart'>
                      <FaShoppingBasket />
                    </abbr>
                  </div>
                </Link>

                <Link
                  activeStyle={{ color: '#ffff66' }}
                  className='link'
                  to='/watchlist'
                >
                  <div className='nav__list'>
                    <abbr title='Wish list'>
                      <FaClipboardList />
                    </abbr>
                  </div>
                </Link>
              </>
            ) : (
              <Link
                activeStyle={{ color: '#ffff66' }}
                className='link'
                to='/watchlist'
              >
                <div className='nav__list'>
                  <FaClipboardList />
                </div>
              </Link>
            )}

            {!userId ? (
              <>
                <Link
                  activeStyle={{ color: '#ffff66' }}
                  className='link'
                  to='/signup'
                >
                  <div className='nav__list'>Signup</div>
                </Link>
                <Link
                  activeStyle={{ color: '#ffff66' }}
                  className='link'
                  to='/login'
                >
                  <div className='nav__list'>Login</div>
                </Link>
              </>
            ) : (
              <div className='nav__list' onClick={handleSignout}>
                Signout
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
