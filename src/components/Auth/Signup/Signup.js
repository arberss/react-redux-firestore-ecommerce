import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { NavLink as Link, useHistory } from 'react-router-dom';
import { signUp } from '../../../store/actions/authActions';

import PulseLoader from 'react-spinners/PulseLoader';

function Signup() {
  const [checkClick, setCheckClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const { register, handleSubmit, errors, getValues } = useForm();

  firestoreConnect({
    collection: 'users',
  });

  const checkEmail = useSelector(
    ({ firestore: { ordered } }) => ordered && ordered.users
  );

  const onSubmit = async (data) => {
    const { firstName, lastName, email, password, confPassword } = data;

    const creds = {
      firstName,
      lastName,
      email,
      password,
      confPassword,
    };

    try {
      setIsLoading(true);
      await dispatch(signUp(creds));

      history.push('/products');
    } catch {}

    setIsLoading(false);
  };

  return (
    <div className='container' onSubmit={handleSubmit(onSubmit)}>
      <form className='auth-form'>
        <div className='form-title'>Signup</div>
        <div className='form-group'>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            name='name'
            ref={register({
              required: 'This field is required!',
              validate: {
                checkLength: (value) =>
                  value.trim() !== '' || 'Cannot be blank!',
              },
            })}
          />
          {errors.name && <p className='error'>{errors.name.message}</p>}
        </div>
        <div className='form-group'>
          <label htmlFor='surname'>Last Name</label>
          <input
            type='text'
            name='surname'
            ref={register({
              required: 'This field is required!',
              validate: {
                checkLength: (value) =>
                  value.trim() !== '' || 'Cannot be blank!',
              },
            })}
          />
          {errors.surname && <p className='error'>{errors.surname.message}</p>}
        </div>
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

                  if (checkClick && checkUserEmail) {
                    setCheckClick(false);
                    return `This email exist!`;
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
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
          />
          {errors.password && (
            <p className='error'>{errors.password.message}</p>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='confPassword'>Confirm Password</label>
          <input
            type='password'
            name='confPassword'
            ref={register({
              required: 'This field is required!',
              validate: {
                checkConfirmPassword: (value) => {
                  const getPassword = getValues('password');
                  return value === getPassword || `Passwords don't match!`;
                },
              },
            })}
          />
          {errors.confPassword && (
            <p className='error'>{errors.confPassword.message}</p>
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
          <button
            onClick={() => setCheckClick(true)}
            className='btn'
            type='submit'
          >
            Signup
          </button>
        )}

        <div className='form-link'>
          Already have an account?
          <Link className='link auth-link' to='/login'>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
