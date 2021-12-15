import * as actionTypes from './navigate-types';

const INITIAL_STATE = {
isRecordingScreen:false,
isTabBar:false,
recordingStart:false,
recordingPause:false
};

const navigateReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case actionTypes.TAB_SHOW:
        return {
          ...state,
          isRecordingScreen:action.payload
        };
        case actionTypes.TAB_HIDE:
            return {
              ...state,
              isRecordingScreen:action.payload
            };
            case actionTypes.TAB_SHOWS:
              return {
                ...state,
                isTabBar:action.payload
              };
              case actionTypes.TAB_HIDES:
                  return {
                    ...state,
                    isTabBar:action.payload
                  };

      default:
        return state;
    }
  };

  export default navigateReducer;