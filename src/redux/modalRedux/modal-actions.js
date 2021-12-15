import * as actionTypes from './modal-types';
import {onStopPlays} from '../../components/musicFunc'
export const modalOpen=()=>async(dispatch)=>{
  dispatch({
        type:"modal_open",
        payload:true
      })
}
export const modalClose=()=>async(dispatch)=>{
  onStopPlays()
  dispatch({
        type:"modal_close",
        payload:false
      })
}
// export const getBookData =  (isbn) => async(dispatch) => {
//   const url = `https://www.googleapis.com/books/v1/volumes?q=${isbn}`;
//   const req = await fetch(url);
//   const data = await req.json();
//   // console.log('Author=============>', data.items[0].volumeInfo.authors[0]);
//   // console.log('Title=========>', data.items[0].volumeInfo.title);
//   // console.log('Description========>', data.items[0].volumeInfo.description);
//   // console.log('Img========>', data.items[0].volumeInfo.imageLinks.thumbnail);
//   dispatch({
//     type: actionTypes.GET_BOOK_DATA,
//     payload: data.items[0]});
// };

// export const saveBookData = (bookData)=> async (dispatch) => {
//   console.log(bookData,'action')
//   dispatch({
//     type:actionTypes.SAVE_BOOK_DATA,
//     payload:bookData
//   })
// }

// export const saveImage=(imgLink)=>async(dispatch)=>{
//   console.log(imgLink)
//   dispatch({
//     type:'SAVE_IMAGE',
//     payload:imgLink
//   })
// }

// export const getIsbn = e => dispatch => {
//   // console.log(e);
//   // console.log('scanData in ac', e.data);
// };
