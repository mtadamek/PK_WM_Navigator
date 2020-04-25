import {ADD_EDDYSTONE, UPDATE_EDDYSTONES} from '../constants';

export const addEddystone = eddystone => ({
  type: ADD_EDDYSTONE,
  payload: eddystone,
});

export const updateEddystones = eddystones => ({
  type: UPDATE_EDDYSTONES,
  payload: eddystones,
});
