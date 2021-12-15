import {combineReducers} from 'redux';

import modalReducer from './modalRedux/modal-reducer';
import alarmReducer from './alarmData/alarm-reducer';
import navReducer from './navigateTabRedux/navigate-reducer';


const rootReducer = combineReducers({
  modalReducer,
  alarmReducer,
  navReducer
});

export default rootReducer;
