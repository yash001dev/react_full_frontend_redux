import { fromPairs } from 'lodash';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import doctorReducer from './doctor/doctor.reducer';
import chemistReducer from './chemist/chemist.reducer';
import mrReducer from './mr/mr.reducer';
import seniorReducer from './senior/senior.reducer';
export default combineReducers({
    doctor:doctorReducer,
    chemist:chemistReducer,
    mr:mrReducer,
    senior:seniorReducer,
});


