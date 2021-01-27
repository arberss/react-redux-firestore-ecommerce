import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store, persistor } from './store/store';
import { Provider, useSelector } from 'react-redux';
import { isLoaded, ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { rrfProps } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

import RotateLoader from 'react-spinners/RotateLoader';

function AuthIsRedy({ children }) {
  const auth = useSelector((state) => state.firebase.auth);

  if (isLoaded(auth)) {
    return children;
  } else {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <RotateLoader />
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <AuthIsRedy>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </AuthIsRedy>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
