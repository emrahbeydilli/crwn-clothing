import { rootReducer } from './root-reducer';
import { configureStore } from '@reduxjs/toolkit';

import logger from 'redux-logger';

export const store = configureStore({
  reducer:rootReducer,
  middleware:[logger]
});