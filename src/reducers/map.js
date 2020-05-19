import {SET_SCALE} from '../constants';
import {Animated} from 'react-native';

const initialState = {
  scale: new Animated.Value(1),
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_SCALE:
      return {...state, scale: payload};
    default:
      return state;
  }
};
