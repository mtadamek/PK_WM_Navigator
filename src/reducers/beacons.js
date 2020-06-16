import {
  ADD_EDDYSTONE,
  DELETE_EDDYSTONE,
  UPDATE_EDDYSTONES,
} from '../constants/Actions';

const initialState = {
  scanning: false,
  eddystones: [],
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case ADD_EDDYSTONE:
      const tempArray = state.eddystones.filter(
        eddy => eddy.instanceId !== payload.instanceId,
      );
      return {...state, eddystones: tempArray.concat(payload)};
    case DELETE_EDDYSTONE:
      return {
        ...state,
        eddystones: state.eddystones.filter(
          eddystone => eddystone.instanceId !== payload,
        ),
      };
    case UPDATE_EDDYSTONES:
      return {...state, eddystones: payload};
    default:
      return state;
  }
};
