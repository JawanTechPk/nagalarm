import * as actionTypes from './navigate-types';


export const tabOpen=()=>async(dispatch)=>{

  dispatch({
        type:actionTypes.TAB_SHOW,
        payload:true
      })

}

export const tabClosed=()=>async(dispatch)=>{

    dispatch({
          type:actionTypes.TAB_HIDE,
          payload:false
        })
  
  }

  export const bottomTabOpens=()=>async(dispatch)=>{

      dispatch({
            type:actionTypes.TAB_SHOWS,
            payload:true
          })
    
    }
    
    export const bottomTabCloseds=()=>async(dispatch)=>{
    
        dispatch({
              type:actionTypes.TAB_HIDES,
              payload:false
            })
      
      }