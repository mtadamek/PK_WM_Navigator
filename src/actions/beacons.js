import {
  SET_NAMESPACE,
  ADD_EDDYSTONE,
  UPDATE_EDDYSTONE,
  UPDATE_EDDYSTONES,
  DELETE_EDDYSTONE,
} from '../constants/Actions';

export const setNamespace = namespace => ({
  type: SET_NAMESPACE,
  payload: namespace,
});

export const addEddystone = eddystone => ({
  type: ADD_EDDYSTONE,
  payload: eddystone,
});

export const deleteEddystones = eddystone => ({
  type: DELETE_EDDYSTONE,
  payload: eddystone,
});

export const updateEddystone = eddystone => ({
  type: UPDATE_EDDYSTONE,
  payload: eddystone,
});

export const updateEddystones = eddystones => ({
  type: UPDATE_EDDYSTONES,
  payload: eddystones,
});
