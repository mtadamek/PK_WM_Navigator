import {
  SET_NAMESPACE,
  ADD_EDDYSTONE,
  DELETE_EDDYSTONE,
  UPDATE_EDDYSTONE,
  UPDATE_EDDYSTONES,
} from '../constants/Actions';

const initialState = {
  namespace: null,
  eddystones: [],
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_NAMESPACE:
      return {...state, namespace: payload};
    case ADD_EDDYSTONE:
      return {...state, eddystones: state.eddystones.concat(payload)};
    case DELETE_EDDYSTONE:
      return {
        ...state,
        eddystones: state.eddystones.filter(
          eddystone =>
            eddystone.instanceId !== payload.instanceId &&
            eddystone.namespace !== payload.namespace,
        ),
      };
    case UPDATE_EDDYSTONE:
      const temp = state.eddystones;
      temp.forEach(eddy => {
        if (
          eddy.instanceId === payload.instanceId &&
          eddy.namespace === payload.namespace
        )
          eddy = payload;
      });
      return {...state, eddystones: temp};
    case UPDATE_EDDYSTONES:
      return {...state, eddystones: payload};
    default:
      return state;
  }
};
