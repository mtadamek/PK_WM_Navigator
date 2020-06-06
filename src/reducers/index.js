import {combineReducers} from 'redux';
import beacons from './beacons';
import search from './search';

const rootReducer = combineReducers({beacons, search});

export default rootReducer;
