import {ADD_EDDYSTONE} from '../constants';

export const addEddystone = eddystone => ({
  type: ADD_EDDYSTONE,
  payload: eddystone,
});
