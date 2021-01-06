import { fromPairs } from 'lodash';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import doctorReducer from './doctor/doctor.reducer';
import chemistReducer from './chemist/chemist.reducer';
import mrReducer from './mr/mr.reducer';
import seniorReducer from './senior/senior.reducer';
import cityReducer from './city/city.reducer';
import workPlaceReducer from './workplace/workplace.reducer';
import holidayReducer from './holiday/holiday.reducer';
import workTypeReducer from './worktype/worktype.reducer';
 
export default combineReducers({
    doctor:doctorReducer,
    chemist:chemistReducer,
    mr:mrReducer,
    senior:seniorReducer,
    city:cityReducer,
    workplace:workPlaceReducer,
    holiday:holidayReducer,
    worktype:workTypeReducer,

});


