import * as actionTypes from './alarm-types';
import {onStopPlays} from '../../components/musicFunc'
import AsyncStorage from '@react-native-async-storage/async-storage';

// export const modalOpen=()=>async(dispatch)=>{
//   dispatch({
//         type:"modal_open",
//         payload:true
//       })
// }

// export const modalClose=()=>async(dispatch)=>{
//   onStopPlays()
//   dispatch({
//         type:"modal_close",
//         payload:false
//       })
// }

export const fetchData=()=>async(dispatch)=>{

const data = await AsyncStorage.getItem("alarmsTest");
dispatch({
            type:"FetchData",
            payload:JSON.parse(data)
          })

}

export const updateData=(newArr)=>async(dispatch)=>{
console.log(newArr,'newArr')
    dispatch({
            type:"updateData",
            payload:newArr
          })
}