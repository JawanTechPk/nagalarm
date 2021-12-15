import * as actionTypes from './alarm-types';

const INITIAL_STATE = {
alarms:[]
};

const modalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "FetchData":
        return {
          ...state,
          alarms:action.payload
        };
        case "updateData":
          return {
            ...state,
            alarms:action.payload
          }
        //   case "modal_close":
        //     return {
        //       ...state,
        //       modalToggle:action.payload
        //     }
      default:
        return state;
    }
  };
export default modalReducer;
