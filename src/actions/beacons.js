import {ADD_EDDYSTONE, UPDATE_EDDYSTONES, DELETE_EDDYSTONE} from '../constants';

export const addEddystone = (eddystone) => ({
  type: ADD_EDDYSTONE,
  payload: eddystone,
});

export const deleteEddystones = (id) => ({
  type: DELETE_EDDYSTONE,
  payload: id,
});

export const updateEddystones = (eddystones) => ({
  type: UPDATE_EDDYSTONES,
  payload: eddystones,
});
