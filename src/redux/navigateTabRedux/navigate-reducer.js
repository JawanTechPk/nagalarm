import * as actionTypes from './navigate-types';

const INITIAL_STATE = {
isRecordingScreen:false,
isTabBar:false,
recordingStart:false,
recordingPause:false,
recordTimeR:'00:00:00',
recordSecsR:0
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

        case actionTypes.RECORDSTART:
             return {
             ...state,
             recordingStart:action.payload
                  };
        case actionTypes.RECORDSTARTCOUNT:
             return {
            ...state,
            recordTimeR:action.recordTimeR,
            recordSecsR:action.recordSecsR
                };
                case actionTypes.RECORDPAUSE:
                  return {
                 ...state,
                 recordingPause:action.payload,
                 recordingStart:action.recordingStart,
                     };
                     case actionTypes.RECORDPAUSECOUNT:
             return {
            ...state,
            recordTimeR:action.recordTimeR,
            recordSecsR:action.recordSecsR,
            // recordingPause:action.payload
                };
                case actionTypes.RECORDPAUSE2:
                  return {
                 ...state,
                 recordingPause:action.payload,
                 recordingStart:true
                     };
                case actionTypes.RECORDRESUMECOUNT:
                  return {
                 ...state,
                 recordTimeR:action.recordTimeR,
                 recordSecsR:action.recordSecsR
                     };           
                     case actionTypes.RECORDSTOPCOUNT:
                      return {
                     ...state,
                     recordTimeR:action.recordTimeR,
                     recordSecsR:action.recordSecsR,
                     recordingPause:false,
recordingStart:false
                         };  
                         case actionTypes.SAVEAUDIO:
                          return {
                         ...state,
                         recordTimeR:action.recordTimeR,
                         recordSecsR:action.recordSecsR,
                         recordingPause:false,
                         recordingStart:false
                             };  
                         

      default:
        return state;
    }
  };

  export default navigateReducer;