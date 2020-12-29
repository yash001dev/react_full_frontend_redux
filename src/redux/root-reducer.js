import { fromPairs } from 'lodash';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import doctorReducer from './doctor/doctor.reducer';

export default combineReducers({
    doctor:doctorReducer,
});


