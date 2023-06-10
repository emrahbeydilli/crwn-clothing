import USER_ACTION_TYPES from './user.types';
import { createAction } from '../../utils/reducer/reducer.utils';
// import { createAction } from '@reduxjs/toolkit';

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);