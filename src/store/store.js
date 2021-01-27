import { getFirebase } from 'react-redux-firebase';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import fbConfig from '../config/fbConfig';
import {
  createFirestoreInstance,
  reduxFirestore,
  getFirestore,
} from 'redux-firestore';
import firebase from 'firebase/app';
import { persistStore } from 'redux-persist';

export const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase, fbConfig), // <- needed if using firestore
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

const persistor = persistStore(store);

export const rrfProps = {
  firebase,
  config: fbConfig && rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

export { store, persistor };
