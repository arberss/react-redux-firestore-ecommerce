import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink as Link, useHistory } from 'react-router-dom';
import { signIn } from '../../../store/actions/authActions';

import { useForm } from 'react-hook-form';
import { firestoreConnect } from 'react-redux-firebase';

import PulseLoader from 'react-spinners/PulseLoader';

function Login() {
  const [checkClick, setCheckClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  firestoreConnect({
    collection: 'users',
  });

  const checkEmail = useSelector(
    ({ firestore: { ordered } }) => ordered && ordered.users
  );

  const checkUid = useSelector((state) => state.firebase.auth.uid);
  const checkError = useSelector((state) => state.auth.authError);

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      setIsLoading(true);
      await dispatch(signIn(email, password));

      if (checkUid) {
        history.push('/products');
      }
    } catch {}

    setIsLoading(false);
  };

  return (
    <div className='container'>
      <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-title'>Login</div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            ref={register({
              required: 'This field is required!',
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid email address!',
              },
              validate: {
                checkUserExist: (value) => {
                  const checkUserEmail = checkEmail.find(
                    (user) => user.email === value
                  );

                  if (checkClick && !checkUserEmail) {
                    setCheckClick(false);
                    return `This email doesn't exist!`;
                  }
                },
              },
            })}
          />
          {errors.email && <p className='error'>{errors.email.message}</p>}
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            ref={register({
              required: 'This field is required!',
            })}
          />
          {errors.password && (
            <p className='error'>{errors.password.message}</p>
          )}
          {checkError && <p className='error'>{checkError}</p>}
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
          <button
            onClick={() => setCheckClick(true)}
            className='btn'
            type='submit'
            disabled={isLoading}
          >
            Login
          </button>
        )}

        <div className='form-link'>
          Need an account?
          <Link className='link auth-link' to='/signup'>
            Signup
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
