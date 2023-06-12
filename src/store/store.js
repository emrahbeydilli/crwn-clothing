import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root-reducer';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(
  Boolean
);

const persistConfig = {
  key: 'root', //persist allthing
  storage, //local storage
  whitelist:['cart'],
  // blacklist:['user'], //reducers that you dont wannna use
}

const persistedReducer =  persistReducer(persistConfig,rootReducer);

export const store = configureStore({
  reducer:persistedReducer,
  middleware:middleWares,
});

export const persistor = persistStore(store);