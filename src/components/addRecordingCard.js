
import React,{useEffect} from 'react';
import {
  Text,
  Image ,
  View,
} from 'react-native';
import menu from '../assets/icons/menu.png'
import play from '../assets/icons/play-button.png'
import plays from '../assets/icons/play.svg'
import CheckBox from '@react-native-community/checkbox';

const AddRecordingCard = ({txt,indx,select,onchange}) => {
return(
<View style={{marginTop:10,flexDirection:'row',borderBottomColor:'gray',borderBottomWidth:0.5,justifyContent:'space-between',}}>
<View style={{flexDirection:'row',marginBottom:10,}}>
<Image source={play} style={{width:40,height:40}}/>
<Text style={{fontSize:16,color:'#707070',textAlign:'center',marginTop:10,marginLeft:10}}>{txt}</Text>
</View>  
<CheckBox
                  disabled={false}
                  value={select}
                  onValueChange={()=>{onchange(indx,!select)}}
                  // onValueChange={(newValue)=>{
                  //   onchange(!select,indx)
                  // }}
                //   onValueChange={(newValue) => {
                //     addFitem(newValue, 'car');
                //     setToggleCheckBox({ ...toggleCheckBox, car: newValue })
                //   }}
                  tintColors={{ true: '#1e99fe', false: 'gray' }}
                />
</View>

);
};

export default AddRecordingCard;
