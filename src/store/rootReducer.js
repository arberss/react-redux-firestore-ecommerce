import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { authReducer } from './reducers/authReducer';
import { productReducer } from './reducers/productReducer';
import { localCartReducer } from './reducers/localCartReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['localCart'],
};

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  product: productReducer,
  localCart: localCartReducer,
});

export default persistReducer(persistConfig, rootReducer);
