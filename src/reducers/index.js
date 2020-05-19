import {combineReducers} from 'redux';
import beacons from './beacons';
import map from './map';

const rootReducer = combineReducers({beacons, map});

export default rootReducer;
