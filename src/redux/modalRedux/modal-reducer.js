import * as actionTypes from './modal-types';

const INITIAL_STATE = {
modalToggle:false
};

const modalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case actionTypes.MODAL_UPDATE:
        return {
          ...state,
          modalToggle:!state.modalToggle
        };
        case "modal_open":
          return {
            ...state,
            modalToggle:action.payload
          }
          case "modal_close":
            return {
              ...state,
              modalToggle:action.payload
            }
      default:
        return state;
    }
  };

export default modalReducer;
