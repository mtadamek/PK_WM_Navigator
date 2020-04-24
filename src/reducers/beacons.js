import {
  SET_SCANNING_STATE,
  ADD_EDDYSTONE,
  REMOVE_EDDYSTONE,
} from '../constants';

const initialState = {
  scanning: false,
  eddystones: [],
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_SCANNING_STATE:
      return {...state, scanning: payload};
    case ADD_EDDYSTONE:
      return {...state, eddystones: state.eddystones.concat(payload)};
    case REMOVE_EDDYSTONE:
      return {
        ...state,
        eddystones: state.eddystones.filter(
          eddystone => eddystone.instanceId !== payload,
        ),
      };

    default:
      return state;
  }
};
